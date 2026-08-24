import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Draft posts render in dev and are excluded from production builds.
const isDev = process.env.NODE_ENV === "development";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Set on republish so `dateModified` and sitemap lastmod mean something. */
  updated?: string;
  author: string;
  image?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: string;
  url: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  faqs: FAQItem[];
}

/**
 * Turns a Vietnamese tag into a URL-safe slug:
 * "báo giá & chi phí" -> "bao-gia-chi-phi"
 */
export function slugifyTag(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip combining diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parsePost(file: string) {
  const slug = file.replace(/\.mdx$/, "");
  const filePath = path.join(BLOG_DIR, file);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const meta: BlogPostMeta = {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    updated: data.updated
      ? new Date(data.updated).toISOString().slice(0, 10)
      : undefined,
    author: data.author || "Tiệm 3D",
    image: data.image,
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    readingTime: readingTime(content).text.replace("min read", "phút đọc"),
    url: `/blog/${slug}/`,
  };

  return { meta, content, faqs: (data.faqs as FAQItem[]) || [] };
}

function readAll() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parsePost);
}

/** All published posts, newest first. Drafts are hidden outside development. */
export function getAllPosts(): BlogPostMeta[] {
  return readAll()
    .map((p) => p.meta)
    .filter((post) => isDev || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { meta, content, faqs } = parsePost(`${slug}.mdx`);
  if (!isDev && meta.draft) return null;

  return { ...meta, content, faqs };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

/**
 * Tags drive both the /blog/tag/[tag]/ routes and getRelatedPosts(). The
 * vocabulary is deliberately controlled — it was previously 41 free-text tags
 * across 8 posts, 36 of them used exactly once, which made related-posts return
 * nothing for most articles.
 */
export function getAllTags(): TagInfo[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: slugifyTag(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "vi"));
}

export function getAllTagSlugs(): string[] {
  return getAllTags().map((tag) => tag.slug);
}

export function getTagBySlug(slug: string): TagInfo | null {
  return getAllTags().find((tag) => tag.slug === slug) || null;
}

export function getPostsByTagSlug(slug: string): BlogPostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => slugifyTag(tag) === slug)
  );
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function searchPosts(query: string): BlogPostMeta[] {
  if (!query || query.trim().length < 2) return [];
  const terms = query.toLowerCase().trim().split(/\s+/);

  return getAllPosts().filter((post) => {
    const haystack = [post.title, post.description, post.tags.join(" ")]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

// 6 fills two rows of the 3-column grid, and keeps the paginated route
// buildable at the current post count (output: "export" rejects a dynamic
// route whose generateStaticParams returns nothing).
export const POSTS_PER_PAGE = 6;

export function getTotalPages(total = getAllPosts().length): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function getPostsForPage(page: number): BlogPostMeta[] {
  const all = getAllPosts();
  const start = (Math.max(1, page) - 1) * POSTS_PER_PAGE;
  return all.slice(start, start + POSTS_PER_PAGE);
}

/**
 * Related posts by shared-tag count. With the controlled vocabulary every post
 * shares at least two tags with several others, so this reliably returns
 * results — it used to fall through to an empty list on most posts.
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMeta[] {
  const current = getAllPosts().find((p) => p.slug === currentSlug);
  if (!current) return [];

  const currentTags = new Set(current.tags);

  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
