// Pushes public/assets to the Cloudflare R2 bucket that backs the image CDN.
//
// This used to drive the S3-compatible API, which meant four long-lived R2
// credentials sat in .env.local. It now shells out to Wrangler and reuses the
// OAuth session from `wrangler login`, so there is no static key to leak — the
// failure mode this repository has already hit once.
//
//   node scripts/upload-to-r2.mjs            upload anything that changed
//   node scripts/upload-to-r2.mjs --all      re-upload everything
//   node scripts/upload-to-r2.mjs --dry      list what would be uploaded
//
// Keys mirror the public path exactly: public/assets/x/y.webp -> assets/x/y.webp,
// so https://cdn.tiem3d.com/assets/x/y.webp lines up with the local /assets/x/y.webp.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";

const BUCKET = process.env.R2_BUCKET_NAME || "tiem3d-assets";
const SOURCE = path.join(process.cwd(), "public", "assets");
const MANIFEST = path.join(process.cwd(), ".cache", "r2-manifest.json");
const WRANGLER = path.join(process.cwd(), "node_modules", "wrangler", "bin", "wrangler.js");

const ALL = process.argv.includes("--all");
const DRY = process.argv.includes("--dry");

// Eight at a time: each upload is a separate Wrangler process, and the wall
// clock is dominated by process start-up rather than by the transfer.
const CONCURRENCY = 8;

// Filenames are stable rather than content-hashed, so a regenerated image keeps
// its name. A year of immutable caching is still right for a marketing site —
// just purge the Cloudflare cache for that path if an asset is ever replaced.
const CACHE_CONTROL = "public, max-age=31536000, immutable";

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".md": "text/markdown; charset=utf-8",
};

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const hash = (file) =>
  crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex").slice(0, 16);

const readManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf-8"));
  } catch {
    return {};
  }
};

function upload(key, file) {
  const type = CONTENT_TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [
        WRANGLER, "r2", "object", "put", `${BUCKET}/${key}`,
        "--file", file,
        "--content-type", type,
        "--cache-control", CACHE_CONTROL,
        "--remote",
      ],
      { stdio: ["ignore", "ignore", "pipe"] }
    );
    let err = "";
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) => resolve({ key, ok: code === 0, err: err.trim() }));
  });
}

async function main() {
  if (!fs.existsSync(WRANGLER)) {
    console.error("Wrangler not installed. Run: npm install");
    process.exit(1);
  }

  const manifest = ALL ? {} : readManifest();
  const files = walk(SOURCE);

  const pending = [];
  let unchanged = 0;
  for (const file of files) {
    const key = path.relative(path.join(process.cwd(), "public"), file).split(path.sep).join("/");
    const sha = hash(file);
    if (manifest[key] === sha) {
      unchanged++;
      continue;
    }
    pending.push({ key, file, sha });
  }

  console.log(`Bucket        ${BUCKET}`);
  console.log(`Local files   ${files.length}`);
  console.log(`Unchanged     ${unchanged}`);
  console.log(`To upload     ${pending.length}\n`);

  if (DRY) {
    pending.slice(0, 20).forEach((p) => console.log(`  ${p.key}`));
    if (pending.length > 20) console.log(`  ... and ${pending.length - 20} more`);
    return;
  }
  if (pending.length === 0) return;

  const next = readManifest();
  let done = 0;
  let failed = 0;
  const queue = [...pending];

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      while (queue.length) {
        const item = queue.shift();
        const res = await upload(item.key, item.file);
        done++;
        if (res.ok) {
          next[item.key] = item.sha;
        } else {
          failed++;
          console.error(`  ✗ ${item.key}\n    ${res.err.split("\n").slice(-2).join(" ")}`);
        }
        if (done % 20 === 0 || done === pending.length) {
          console.log(`  ${done}/${pending.length} uploaded`);
        }
      }
    })
  );

  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(next, null, 2));

  console.log(`\nUploaded ${pending.length - failed}, failed ${failed}.`);
  if (failed) process.exitCode = 1;
}

await main();
