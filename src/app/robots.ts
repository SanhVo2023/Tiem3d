import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // `/assets/generated/` used to be disallowed here. Every OG image, every
      // ServiceJsonLd image and the LocalBusiness image lives under that path,
      // so Google could not fetch a single one of them.
      allow: "/",
      disallow: [
        "/api/",
        // Block the build manifest chunks but keep static assets crawlable —
        // Google needs the CSS and JS to render the page for mobile-friendliness.
        "/_next/data/",
      ],
    },
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
