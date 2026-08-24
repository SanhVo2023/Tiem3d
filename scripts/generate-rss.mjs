// Script to generate RSS feed during build
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://in3dplus.com";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_PATH = path.join(process.cwd(), "public", "feed.xml");

function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Tiem 3D",
      tags: data.tags || [],
      draft: data.draft || false,
      url: `/blog/${slug}/`,
    };
  });

  // Filter out drafts and sort by date
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>contact@in3dplus.com (Tiem 3D)</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blog In 3D | Tiem 3D</title>
    <link>${SITE_URL}/blog/</link>
    <description>Kien thuc, huong dan va chia se kinh nghiem ve in 3D tu Tiem 3D - Dich vu in 3D chuyen nghiep tai Thu Duc, TP.HCM</description>
    <language>vi-VN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>Tiem 3D</title>
      <link>${SITE_URL}</link>
    </image>
    <webMaster>contact@in3dplus.com (Tiem 3D)</webMaster>
    <managingEditor>contact@in3dplus.com (Tiem 3D)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} Tiem 3D. All rights reserved.</copyright>
    ${rssItems}
  </channel>
</rss>`;

  fs.writeFileSync(OUTPUT_PATH, rss, "utf-8");
  console.log(`RSS feed generated: ${OUTPUT_PATH}`);
  console.log(`Total posts: ${posts.length}`);
}

generateRSS();
