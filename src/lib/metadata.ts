import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";

/** Page-specific social metadata prevents inner pages inheriting the home URL. */
export function pageMetadata(title: string, description: string, path: string, image = "/og-image.jpg"): Metadata {
  const url = `${BUSINESS.url}${path.endsWith("/") ? path : path + "/"}`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: `${title} | ${BUSINESS.name}`, description, url, siteName: BUSINESS.name, locale: "vi_VN", images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title: `${title} | ${BUSINESS.name}`, description, images: [image] },
  };
}
