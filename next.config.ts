import type { NextConfig } from "next";

// The R2 CDN host, e.g. https://cdn.tiem3d.com.
//
// This is deliberately NOT wired to `assetPrefix`. assetPrefix routes every
// /_next/* file through the CDN, including the self-hosted font files — and
// since only public/assets is mirrored into the bucket, the fonts 404, fail
// CORS, and the site renders unstyled. That is exactly what happened the last
// time this was switched on.
//
// Images go through the CDN via src/lib/cdn.ts instead, which rewrites only the
// /assets/* paths that scripts/upload-to-r2.mjs actually uploads. JS, CSS and
// fonts stay on the origin.
const cdnUrl = (process.env.NEXT_PUBLIC_CDN_URL || "").replace(/\/+$/, "");
const cdnHost = cdnUrl ? new URL(cdnUrl).hostname : null;

const nextConfig: NextConfig = {
  // Static export for Netlify
  output: "export",
  trailingSlash: true,

  images: {
    // Required by output: "export" — there is no server to optimise on.
    // Source images are pre-compressed to WebP by scripts/optimize-images.mjs.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: cdnHost
      ? [{ protocol: "https", hostname: cdnHost, pathname: "/assets/**" }]
      : [],
  },

  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  env: {
    NEXT_PUBLIC_CDN_URL: cdnUrl,
  },

  turbopack: {},
};

export default nextConfig;
