import type { NextConfig } from "next";

// R2 CDN URL - set via environment variable.
//
// WARNING: setting this points assetPrefix at the CDN, which means every
// /_next/* file (JS, CSS and the self-hosted font files) is requested from that
// host. scripts/upload-to-r2.mjs only uploads public/assets, so unless the
// build output is also pushed there with permissive CORS, the fonts fail with
// a CORS error and the site renders unstyled. Leave blank to serve from origin.
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || "";

const nextConfig: NextConfig = {
  // Static export for Netlify
  output: "export",
  trailingSlash: true,

  // Use CDN for assets if configured
  assetPrefix: cdnUrl || undefined,

  // Image optimization - use unoptimized for static export
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow images from R2 CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b9a1b607d72ba382cb6ff284024cfd47.r2.dev",
        pathname: "/**",
      },
    ],
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // Environment variables to expose
  env: {
    NEXT_PUBLIC_CDN_URL: cdnUrl,
  },

  // Turbopack config for Next.js 16+
  turbopack: {},
};

export default nextConfig;
