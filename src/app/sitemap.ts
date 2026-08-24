import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tiem3d.com";
  const lastModified = "2025-01-11";

  const services = [
    "in-fdm",
    "in-resin",
    "in-kho-lon",
    "in-ky-thuat",
    "thiet-ke-3d",
    "hoan-thien",
    "in-hang-loat",
    "du-an-tron-goi",
  ];

  // Get blog post slugs
  const blogDir = path.join(process.cwd(), "content", "blog");
  let blogSlugs: string[] = [];
  try {
    blogSlugs = fs
      .readdirSync(blogDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""));
  } catch {
    // Blog directory may not exist
  }

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/bao-gia`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/dich-vu/${service}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
