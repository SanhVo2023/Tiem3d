// Builds the JPEG social cards that og:image and twitter:image point at.
//
// The display images are WebP, which is right for the page and wrong for a
// social card: Facebook, Zalo and X all fail to render a WebP og:image, so a
// shared link would show no preview at all. Rather than keep the page images
// heavy for the sake of scrapers, every image used as a social card gets a
// 1200x630 JPEG sibling under /assets/social/.
//
// The list is derived from the source rather than maintained by hand — it reads
// the og/twitter image paths straight out of src/app and the case-study covers
// out of portfolio.ts, so adding a page cannot silently skip its card.
//
//   node scripts/generate-social-cards.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { socialCard, SOCIAL_DIR } from "../src/lib/social.ts";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUT_DIR = path.join(PUBLIC_DIR, ...SOCIAL_DIR.split("/").filter(Boolean));

// The size every major scraper crops to.
const WIDTH = 1200;
const HEIGHT = 630;
const QUALITY = 82;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** Every /assets/... path that appears inside an openGraph or twitter block. */
function referencedSocialImages() {
  const files = walk(path.join(process.cwd(), "src")).filter((f) => f.endsWith(".tsx"));
  const found = new Set();

  for (const file of files) {
    const text = fs.readFileSync(file, "utf-8");

    // Any path handed to socialCard() needs a card, including one held in a
    // module-level constant outside the metadata block. Missing this is how the
    // portfolio index kept a WebP og:image after everything else was converted.
    for (const m of text.matchAll(/socialCard\(\s*["'](\/assets\/[^"']+)["']\s*\)/g)) {
      found.add(m[1]);
    }
    // Narrow to the metadata blocks so ordinary in-page images are not swept in.
    for (const block of text.matchAll(
      /(openGraph|twitter)\s*:\s*\{[\s\S]*?\n  \}/g
    )) {
      for (const m of block[0].matchAll(/["'](\/assets\/(?!social\/)[^"']+\.(?:webp|jpe?g|png))["']/g)) {
        found.add(m[1]);
      }
    }
  }
  return [...found];
}

async function caseStudyCovers() {
  const { getAllCaseStudies, coverImage } = await import("../src/lib/portfolio.ts");
  return getAllCaseStudies().map((study) => coverImage(study));
}

async function main() {
  const sources = [...new Set([...referencedSocialImages(), ...(await caseStudyCovers())])];
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Cards are addressed by basename, so two different directories holding the
  // same filename would silently overwrite each other.
  const seen = new Map();
  for (const src of sources) {
    const name = path.basename(src).replace(/\.[^.]+$/, "");
    if (seen.has(name) && seen.get(name) !== src) {
      console.error(`Filename collision on social card "${name}":`);
      console.error(`  ${seen.get(name)}\n  ${src}`);
      process.exit(1);
    }
    seen.set(name, src);
  }

  let made = 0;
  let missing = 0;

  for (const src of sources) {
    const input = path.join(PUBLIC_DIR, src.split("/").join(path.sep));
    if (!fs.existsSync(input)) {
      console.error(`  ✗ source missing: ${src}`);
      missing++;
      continue;
    }
    const output = path.join(PUBLIC_DIR, socialCard(src).split("/").join(path.sep));
    const buf = await sharp(fs.readFileSync(input))
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(output, buf);
    made++;
  }

  // The site-wide default card, normalised to the same dimensions so the
  // width/height declared in layout.tsx is actually true.
  const root = path.join(PUBLIC_DIR, "og-image.jpg");
  if (fs.existsSync(root)) {
    const buf = await sharp(fs.readFileSync(root))
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(root, buf);
  }

  console.log(`Social cards: ${made} written to ${SOCIAL_DIR}, ${missing} missing sources.`);
  if (missing) process.exitCode = 1;
}

await main();
