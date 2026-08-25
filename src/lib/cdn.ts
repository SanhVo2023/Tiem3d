/**
 * Routes /assets/* image paths at the R2 CDN when one is configured.
 *
 * Deliberately NOT next.config's `assetPrefix`. assetPrefix moves every
 * /_next/* file onto the CDN host — including the self-hosted font files, which
 * then fail CORS and leave the site rendering unstyled. That has already
 * happened once on this project. This helper only rewrites the paths that
 * scripts/upload-to-r2.mjs actually mirrors into the bucket, so the two can
 * never drift out of step.
 *
 * public/assets stays in the deploy as well, so clearing NEXT_PUBLIC_CDN_URL and
 * rebuilding is a complete, one-variable rollback to origin-served images.
 */
const CDN = (process.env.NEXT_PUBLIC_CDN_URL ?? "").replace(/\/+$/, "");

/** Prefixes a bucket-backed path with the CDN origin, e.g. `<cdn>/assets/hero.webp`. */
export function asset(src: string): string {
  if (!CDN || !src.startsWith("/assets/")) return src;
  return `${CDN}${src}`;
}

/** True when a CDN host is configured for this build. */
export const cdnEnabled = CDN.length > 0;

/** The CDN origin, for <link rel="preconnect">. Empty when serving from origin. */
export const cdnOrigin = CDN;
