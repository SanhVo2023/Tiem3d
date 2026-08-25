import NextImage, { type ImageProps } from "next/image";
import { preload } from "react-dom";
import { asset } from "@/lib/cdn";

/**
 * next/image with every local /assets/ path routed through the CDN.
 *
 * Images are referenced four different ways across the site — string literals,
 * `item.image` from a data module, `post.image` from frontmatter, and paths
 * built in portfolio.ts — so rewriting call sites would have missed some and
 * gone stale on the next one added. Swapping the import catches all of them.
 *
 * The explicit preload is not redundant. Wrapping next/image loses the
 * `<link rel="preload" as="image">` that `priority` normally emits — measured:
 * one preload with a direct import, zero through the wrapper — which quietly
 * costs the homepage its LCP head start. Re-issuing it here keeps the wrapper
 * honest, and it points at the same rewritten URL the <img> will request.
 */
export default function Img({ src, ...rest }: ImageProps) {
  const resolved = typeof src === "string" ? asset(src) : src;

  if (rest.priority && typeof resolved === "string") {
    preload(resolved, { as: "image", fetchPriority: "high" });
  }

  return <NextImage src={resolved} {...rest} />;
}
