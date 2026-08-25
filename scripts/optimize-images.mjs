// Compresses every shipped image and rewrites the references that point at them.
//
// The generated assets landed as 1024x1024 PNGs straight from the image model —
// 200 MB across 187 files, averaging just over 1 MB each. PNG is the wrong
// container for photographic content, and a 1.9 MB hero image makes a good LCP
// impossible no matter how the rest of the page is tuned.
//
// Two rules, because the destination decides the format:
//
//   In-page images  -> WebP. Universally supported, ~10x smaller than the PNG.
//   Social cards    -> stay JPEG. Facebook, Zalo and X all reject WebP og:image,
//                      so /assets/blog/* and /og-image.jpg are compressed in
//                      place rather than converted.
//
// The reference rewrite reads the truth off disk rather than from this run's
// results, so a half-finished run can simply be re-run.
//
//   node scripts/optimize-images.mjs          convert, then rewrite references
//   node scripts/optimize-images.mjs --dry    report only
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DRY = process.argv.includes("--dry");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Display images never need more than this; the largest render slot on the
// site is a full-bleed hero at 1440px CSS width.
const MAX_WIDTH = 1400;
const WEBP_QUALITY = 80;

// Social cards are read by scrapers at a fixed size and must stay JPEG.
const OG_WIDTH = 1200;
const JPEG_QUALITY = 78;

const KEEP_JPEG = [
  path.join(PUBLIC_DIR, "assets", "blog"),
  path.join(PUBLIC_DIR, "og-image.jpg"),
];

const isKeepJpeg = (file) =>
  KEEP_JPEG.some((p) => file === p || file.startsWith(p + path.sep));

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const RASTER = /\.(png|jpe?g)$/i;
const kb = (n) => (n / 1024).toFixed(0);
const mb = (n) => (n / 1048576).toFixed(1);

// sharp keeps a handle on a path input, and on Windows that collides with
// writing the same path back. Reading the bytes first sidesteps it.
const load = (file) => sharp(fs.readFileSync(file));

async function convert() {
  const files = walk(path.join(PUBLIC_DIR, "assets"))
    .concat([path.join(PUBLIC_DIR, "og-image.jpg"), path.join(PUBLIC_DIR, "logo.png")])
    .filter((f) => fs.existsSync(f) && RASTER.test(f));

  let before = 0;
  let after = 0;
  let converted = 0;
  let compressed = 0;

  for (const file of files) {
    const size = fs.statSync(file).size;
    before += size;

    // The logo is referenced by schema.org `logo`, the blog publisher block and
    // the RSS channel image. It shipped as JPEG bytes behind a .png extension,
    // so it is re-encoded as a real PNG with an alpha channel.
    if (file === path.join(PUBLIC_DIR, "logo.png")) {
      if (!DRY) {
        const buf = await load(file)
          .resize(512, 512, {
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .png({ compressionLevel: 9 })
          .toBuffer();
        fs.writeFileSync(file, buf);
      }
      const now = DRY ? size : fs.statSync(file).size;
      after += now;
      compressed++;
      console.log(`  logo    ${kb(size).padStart(5)} -> ${kb(now).padStart(5)} KB  (now a real PNG)`);
      continue;
    }

    if (isKeepJpeg(file)) {
      if (!DRY) {
        const buf = await load(file)
          .resize({ width: OG_WIDTH, withoutEnlargement: true })
          .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
          .toBuffer();
        // Only keep the re-encode if it actually helped.
        if (buf.length < size) fs.writeFileSync(file, buf);
      }
      const now = DRY ? size : fs.statSync(file).size;
      after += now;
      compressed++;
      continue;
    }

    const target = file.replace(RASTER, ".webp");
    if (!DRY) {
      const buf = await load(file)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 5 })
        .toBuffer();
      fs.writeFileSync(target, buf);
      fs.unlinkSync(file);
    }
    const now = DRY ? Math.round(size / 10) : fs.statSync(target).size;
    after += now;
    converted++;
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Converted to WebP : ${converted}`);
  console.log(`Recompressed JPEG : ${compressed}`);
  console.log(
    `Total  ${mb(before)} MB -> ${mb(after)} MB  (${(100 - (after / before) * 100).toFixed(1)}% smaller)`
  );
  console.log("=".repeat(60));
}

/**
 * Repoints references at the WebP files. A reference is only rewritten when the
 * original is gone from public/ and the .webp sibling is present, so this reads
 * the same whether it runs after a full convert, a partial one, or twice.
 */
function rewriteReferences() {
  const ROOTS = ["src", "content", "scripts"];
  const EXTS = /\.(tsx?|mdx?|mjs|css)$/;
  const REF = /(\/(?:assets|images)\/[^"'`\s)]+?)\.(png|jpe?g)\b/g;

  const sources = ROOTS.flatMap((r) => walk(path.join(process.cwd(), r))).filter(
    (f) => EXTS.test(f)
  );

  let touched = 0;
  let replacements = 0;
  const unresolved = new Set();

  for (const file of sources) {
    const original = fs.readFileSync(file, "utf-8");
    const text = original.replace(REF, (match, stem, ext) => {
      const local = (p) => path.join(PUBLIC_DIR, decodeURIComponent(p).split("/").join(path.sep));
      if (fs.existsSync(local(`${stem}.${ext}`))) return match; // still there, leave it
      if (fs.existsSync(local(`${stem}.webp`))) {
        replacements++;
        return `${stem}.webp`;
      }
      unresolved.add(match);
      return match;
    });
    if (text !== original) {
      fs.writeFileSync(file, text);
      touched++;
    }
  }

  console.log(`\nRewrote ${replacements} references across ${touched} files.`);
  if (unresolved.size) {
    console.log(`${unresolved.size} reference(s) point at nothing on disk:`);
    for (const u of [...unresolved].slice(0, 10)) console.log(`   ${u}`);
  }
}

await convert();
if (!DRY) rewriteReferences();
