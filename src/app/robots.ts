import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export const dynamic = "force-static";

/**
 * Crawlers that feed answer engines rather than a classic search index.
 *
 * They are listed explicitly rather than left to the `*` rule because several
 * of them treat an absent named group as a reason to be conservative, and
 * because being named is the only durable record that allowing them was a
 * decision rather than an oversight.
 *
 * For a local business that wants to be the shop an assistant names when
 * someone asks "in 3D ở đâu TP.HCM", every one of these is a distribution
 * channel. There is no paywalled content here to protect.
 */
const ANSWER_ENGINE_BOTS = [
  "GPTBot",          // OpenAI crawl
  "OAI-SearchBot",   // ChatGPT search results
  "ChatGPT-User",    // user-initiated fetch from ChatGPT
  "ClaudeBot",       // Anthropic crawl
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini grounding and AI Overviews
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
  "DuckAssistBot",
  "CCBot",           // Common Crawl, which seeds many models downstream
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
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
      ...ANSWER_ENGINE_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/_next/data/"],
      })),
    ],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
