// Generates public/feed.xml at build time.
//
// This previously emitted https://in3dplus.com in every link, guid and the
// atom:self href — a different company's domain — so anyone subscribing got a
// feed of off-site URLs.
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://tiem3d.com";
const SITE_NAME = "Tiệm 3D";
const CONTACT_EMAIL = "contact@tiem3d.com";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_PATH = path.join(process.cwd(), "public", "feed.xml");

function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = matter(
        fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
      );

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        updated: data.updated || null,
        author: data.author || SITE_NAME,
        tags: data.tags || [],
        draft: data.draft || false,
        content,
        url: `/blog/${slug}/`,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * A readable excerpt for <content:encoded>. Subscribers previously got only the
 * one-sentence frontmatter description for a 6,000-word article, even though
 * the content namespace was declared.
 */
function excerptHtml(markdown, limit = 1200) {
  const plain = markdown
    .replace(/^---[\s\S]*?---/, "") // frontmatter, if any slipped through
    .replace(/```[\s\S]*?```/g, "") // fenced code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/[*_`>|]/g, "")
    .replace(/\n{2,}/g, "\n\n")
    .trim();

  const truncated =
    plain.length > limit ? `${plain.slice(0, limit).trimEnd()}…` : plain;

  return truncated
    .split("\n\n")
    .filter(Boolean)
    .map((para) => `<p>${escapeXml(para.replace(/\n/g, " "))}</p>`)
    .join("");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generateRSS() {
  const posts = getAllPosts();

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}${post.url}</link>
      <guid isPermaLink="true">${SITE_URL}${post.url}</guid>
      <description><![CDATA[${post.description}]]></description>
      <content:encoded><![CDATA[${excerptHtml(post.content)}<p><a href="${SITE_URL}${post.url}">Đọc tiếp trên tiem3d.com →</a></p>]]></content:encoded>
      <pubDate>${new Date(post.updated || post.date).toUTCString()}</pubDate>
      <author>${CONTACT_EMAIL} (${post.author})</author>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blog In 3D | ${SITE_NAME}</title>
    <link>${SITE_URL}/blog/</link>
    <description>Kiến thức, hướng dẫn và kinh nghiệm thực tế về in 3D từ ${SITE_NAME} — dịch vụ in 3D và thiết kế tại TP.HCM.</description>
    <language>vi-VN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    <webMaster>${CONTACT_EMAIL} (${SITE_NAME})</webMaster>
    <managingEditor>${CONTACT_EMAIL} (${SITE_NAME})</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</copyright>
    ${rssItems}
  </channel>
</rss>`;

  fs.writeFileSync(OUTPUT_PATH, rss, "utf-8");
  console.log(`RSS feed generated: ${OUTPUT_PATH}`);
  console.log(`Total posts: ${posts.length}`);
}

generateRSS();
