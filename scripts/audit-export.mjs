import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { load } from "cheerio";

const root = resolve("out");
const origin = "https://tiem3d.com";
const failures = [];
const warnings = [];
const pages = [];
const documents = new Map();
const normalize = value => value.replace(/\s+/g, " ").trim();
const fail = (page, message) => failures.push(`${page}: ${message}`);

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (file.endsWith(".html")) pages.push(file);
  }
}

await walk(root);
if (!pages.length) throw new Error("No exported pages found. Run npm run build first.");

function pagePath(file) {
  return "/" + relative(root, file).replaceAll("\\", "/").replace(/index\.html$/, "");
}

async function exists(file) {
  try { return (await stat(file)).isFile(); } catch { return false; }
}

async function localFile(url) {
  const path = decodeURIComponent(url.pathname);
  // Exported links should never escape the output directory.
  const file = resolve(root, "." + path);
  if (!file.startsWith(root + "/") && !file.startsWith(root + "\\") && file !== root) return null;
  if (await exists(file)) return file;
  if (await exists(join(file, "index.html"))) return join(file, "index.html");
  return null;
}

function nodes(value) {
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(item => Array.isArray(item) ? item.flatMap(nodes) : nodes(item))];
}

for (const file of pages) {
  const path = pagePath(file);
  const html = await readFile(file, "utf8");
  const $ = load(html);
  documents.set(path, $);
  const robots = $('meta[name="robots"]').map((_, element) => $(element).attr("content")).get().join(",");
  const indexable = !robots.includes("noindex");
  const bodyText = normalize($("main").text());
  if ($("html").attr("lang") !== "vi") fail(path, "HTML language must be vi");
  if (!$('meta[name="viewport"]').length) fail(path, "Missing viewport");
  if ($("main").length !== 1) fail(path, "Expected one main landmark");
  if ($("h1").length !== 1 || !$("h1").text().trim()) fail(path, "Expected one non-empty H1");
  $("main p").each((_, element) => {
    if (/^\s*\|.+\|\s*\n\s*\|[\s:|-]+\|/m.test($(element).text())) {
      fail(path, "Markdown table rendered as raw text instead of an HTML table");
    }
  });
  const ids = new Set();
  $("[id]").each((_, element) => {
    const id = $(element).attr("id");
    if (ids.has(id)) fail(path, `Duplicate id: ${id}`);
    ids.add(id);
  });
  if (!$("title").text().trim()) fail(path, "Missing title");
  if (indexable) {
    const expected = origin + path;
    const canonical = $('link[rel="canonical"]');
    if (canonical.length !== 1 || canonical.attr("href") !== expected) fail(path, `Canonical must be ${expected}`);
    if ($('meta[property="og:url"]').attr("content") !== expected) fail(path, "Open Graph URL differs from the page URL");
    if (($('meta[name="description"]').attr("content") || "").length < 40) fail(path, "Missing or very short description");
    if (!$('meta[property="og:image"]').length) fail(path, "Missing social image");
  } else if (/404|_not-found/.test(path) && $('link[rel="canonical"]').attr("href") === origin + "/") {
    fail(path, "404 inherits homepage canonical");
  }

  for (const element of $("a[href], img[src], link[rel=icon], link[rel=apple-touch-icon], meta[property='og:image'], meta[name='twitter:image']").toArray()) {
    const node = $(element);
    const value = node.attr("href") || node.attr("src") || node.attr("content");
    if (element.tagName === "img" && node.attr("alt") === undefined) fail(path, "Image missing alt attribute");
    if (!value || /^(mailto:|tel:|data:)/.test(value)) continue;
    if (value.includes("undefined") || value.includes("null")) fail(path, `Invalid URL: ${value}`);
    let url;
    try { url = new URL(value, origin + path); } catch { fail(path, `Malformed URL: ${value}`); continue; }
    if (url.origin !== origin) continue;
    const target = await localFile(url);
    if (!target) fail(path, `Missing local target: ${url.pathname}`);
    if (url.hash && url.pathname === path && !ids.has(decodeURIComponent(url.hash.slice(1)))) fail(path, `Missing anchor: ${url.hash}`);
    if (element.tagName === "a" && target?.endsWith("index.html") && !url.pathname.endsWith("/")) warnings.push(`${path}: use trailing slash in ${value}`);
  }

  for (const element of $('script[type="application/ld+json"]').toArray()) {
    let data;
    try { data = JSON.parse($(element).text()); } catch { fail(path, "Invalid JSON-LD"); continue; }
    for (const node of nodes(data)) {
      if (node.aggregateRating) fail(path, "Unverified aggregate rating");
      const type = [].concat(node["@type"] || []);
      if (type.includes("LocalBusiness") && JSON.stringify(node).includes("tan-phu")) fail(path, "Courier-only Tân Phú must not be marked as a storefront");
      if (type.includes("Question")) {
        if (!bodyText.includes(normalize(node.name))) fail(path, `FAQ question missing from visible content: ${node.name}`);
        if (!bodyText.includes(normalize(node.acceptedAnswer.text))) fail(path, `FAQ answer differs from visible content: ${node.name}`);
      }
    }
  }
}

const sitemap = load(await readFile(join(root, "sitemap.xml"), "utf8"), { xmlMode: true });
const sitemapUrls = sitemap("url > loc").map((_, node) => sitemap(node).text()).get();
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("sitemap", "Duplicate URL");
for (const value of sitemapUrls) {
  const url = new URL(value);
  const $ = documents.get(url.pathname);
  if (!$) fail("sitemap", `No exported page: ${url.pathname}`);
  else if ($('meta[name="robots"]').toArray().some(node => ($(node).attr("content") || "").includes("noindex"))) fail("sitemap", `Noindex page listed: ${value}`);
}

const tanPhu = documents.get("/khu-vuc/tan-phu/");
if (!tanPhu || !/không đón khách/i.test(tanPhu("main").text())) fail("Tân Phú", "Missing no-visits notice");
for (const path of ["/", "/lien-he/", "/khu-vuc/tan-phu/"]) {
  const $ = documents.get(path);
  if ($ && $("a[href]").toArray().some(node => {
    const href = $(node).attr("href") || "";
    return href.includes("google.com/maps") && decodeURIComponent(href).includes("Bờ Bao Tân Thắng");
  })) fail(path, "Directions invite customers to the courier-only workshop");
}

await mkdir(".cache/audit", { recursive: true });
const report = { generatedAt: new Date().toISOString(), pages: pages.length, sitemapUrls: sitemapUrls.length, failures, warnings };
await writeFile(".cache/audit/export-report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
