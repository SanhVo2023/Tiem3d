import type { NextConfig } from "next";

// R2 CDN URL - set via environment variable
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
};

export default nextConfig;
