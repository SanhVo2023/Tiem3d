import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Environment check for draft posts
const isDev = process.env.NODE_ENV === "development";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: string;
  content: string;
  url: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: string;
  url: string;
}

/**
 * Get all blog posts (metadata only, for listing)
 * Filters out drafts in production
 */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Tiem 3D",
      image: data.image,
      tags: data.tags || [],
      featured: data.featured || false,
      draft: data.draft || false,
      readingTime: readingTime(content).text.replace("min read", "phut doc"),
      url: `/blog/${slug}/`,
    };
  });

  // Filter out drafts in production and sort by date (newest first)
  return posts
    .filter((post) => isDev || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

/**
 * Get a single post by slug (with full content)
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const post = {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    author: data.author || "Tiem 3D",
    image: data.image,
    tags: data.tags || [],
    featured: data.featured || false,
    draft: data.draft || false,
    readingTime: readingTime(content).text.replace("min read", "phut doc"),
    content,
    url: `/blog/${slug}/`,
  };

  // Hide drafts in production
  if (!isDev && post.draft) {
    return null;
  }

  return post;
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

/**
 * Get all slugs (for generateStaticParams)
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  // In production, filter out drafts
  if (!isDev) {
    return files
      .map((file) => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);
        return { slug: file.replace(/\.mdx$/, ""), draft: data.draft || false };
      })
      .filter((item) => !item.draft)
      .map((item) => item.slug);
  }

  return files.map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Format date for display in Vietnamese
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogPostMeta[] {
  if (!query || query.trim().length < 2) return [];

  const searchTerms = query.toLowerCase().trim().split(/\s+/);

  return getAllPosts().filter((post) => {
    const searchableText = [
      post.title,
      post.description,
      post.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });
}

/**
 * Get paginated posts
 */
export function getPaginatedPosts(
  page: number = 1,
  perPage: number = 6
): {
  posts: BlogPostMeta[];
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const allPostsList = getAllPosts();
  const totalPosts = allPostsList.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    posts: allPostsList.slice(start, end),
    totalPages,
    currentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const currentTags = currentPost.tags || [];

  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => currentTags.includes(tag));
      return { post, score: commonTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
