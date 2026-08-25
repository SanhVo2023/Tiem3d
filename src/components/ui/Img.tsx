import NextImage, { type ImageProps } from "next/image";
import { asset } from "@/lib/cdn";

/**
 * next/image with every local /assets/ path routed through the CDN.
 *
 * Images are referenced four different ways across the site — string literals,
 * `item.image` from a data module, `post.image` from frontmatter, and paths
 * built in portfolio.ts — so rewriting call sites would have missed some and
 * gone stale on the next one added. Swapping the import catches all of them.
 */
export default function Img({ src, ...rest }: ImageProps) {
  return <NextImage src={typeof src === "string" ? asset(src) : src} {...rest} />;
}
