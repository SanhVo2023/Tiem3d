// Verifies that every image path referenced in src/ and content/ actually
// exists in public/. The audit that prompted this found 13 broken references —
// six of them rendering as empty grey tiles on the homepage and portfolio.
//
//   node scripts/check-assets.mjs          report broken references
//   node scripts/check-assets.mjs --orphans  also list unreferenced files
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["src", "content"];
const PUBLIC_DIR = "public";
const EXTS = /\.(tsx?|mdx?|css)$/;

// Matches "/assets/..." and "/images/..." inside quotes or backticks.
const REF = /["'`](\/(?:assets|images)\/[^"'`\s)]+)["'`]/g;

// Skip template literals like `/assets/.../${dir}/${file}.png` — those are
// resolved at runtime and can't be checked statically.
const isTemplate = (p) => p.includes("${");

function walk(dir, filter, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, filter, out);
    else if (filter(full)) out.push(full);
  }
  return out;
}

const sourceFiles = ROOTS.flatMap((r) => walk(r, (f) => EXTS.test(f)));

const referenced = new Map(); // asset path -> [source locations]
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, "utf-8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(REF)) {
      const asset = decodeURIComponent(m[1]);
      if (isTemplate(asset)) continue;
      if (!referenced.has(asset)) referenced.set(asset, []);
      referenced.get(asset).push(`${file}:${i + 1}`);
    }
  });
}

const broken = [];
for (const [asset, locations] of referenced) {
  const onDisk = path.join(PUBLIC_DIR, asset.replace(/^\//, ""));
  if (!fs.existsSync(onDisk)) broken.push({ asset, locations });
}

console.log(`Referenced assets: ${referenced.size}`);
console.log(`Source files scanned: ${sourceFiles.length}`);

if (broken.length === 0) {
  console.log("\n✅ No broken image references.");
} else {
  console.log(`\n❌ ${broken.length} broken reference(s):\n`);
  for (const { asset, locations } of broken) {
    console.log(`  ${asset}`);
    for (const loc of locations.slice(0, 4)) console.log(`      ${loc}`);
    if (locations.length > 4) console.log(`      ... +${locations.length - 4} more`);
  }
}

if (process.argv.includes("--orphans")) {
  const onDisk = walk(path.join(PUBLIC_DIR, "assets"), () => true)
    .concat(walk(path.join(PUBLIC_DIR, "images"), () => true))
    .map((f) => "/" + path.relative(PUBLIC_DIR, f).split(path.sep).join("/"));

  const orphans = onDisk.filter((f) => !referenced.has(f));
  const byDir = new Map();
  for (const o of orphans) {
    const dir = path.posix.dirname(o);
    byDir.set(dir, (byDir.get(dir) || 0) + 1);
  }

  console.log(`\nOrphans (on disk, referenced nowhere): ${orphans.length} of ${onDisk.length}`);
  for (const [dir, count] of [...byDir].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(3)}  ${dir}`);
  }
}

process.exit(broken.length > 0 ? 1 : 0);
