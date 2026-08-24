import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/navigation";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/portfolio";

export const dynamic = "force-static";

const BASE = BUSINESS.url;

/**
 * next.config.ts sets `trailingSlash: true`, so every page canonicalises to a
 * URL ending in "/". The sitemap has to match exactly — it previously emitted
 * bare paths, so every non-root entry disagreed with its own page's canonical.
 */
function url(path: string): string {
  if (path === "/") return `${BASE}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Freshest post date drives the blog index; falls back to today.
  const newestPost = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/dich-vu"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/bang-gia"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/bao-gia"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/lien-he"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/portfolio"), changeFrequency: "weekly", priority: 0.8 },
    {
      url: url("/blog"),
      lastModified: newestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: url(service.href),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = getAllCaseStudies().map((study) => ({
    url: url(`/portfolio/${study.slug}`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // lastModified comes from each post's own frontmatter (updated ?? date)
  // instead of the single frozen "2025-01-11" this file used to ship.
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.7 : 0.6,
  }));

  // A tag page holding one post is a thin duplicate of that post, so it stays
  // out of the sitemap (and is noindex'd on the page itself).
  const tagPages: MetadataRoute.Sitemap = getAllTags()
    .filter((tag) => tag.count >= 2)
    .map((tag) => ({
      url: url(`/blog/tag/${tag.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.4,
    }));

  return [
    ...staticPages,
    ...servicePages,
    ...caseStudyPages,
    ...blogPages,
    ...tagPages,
  ];
}
