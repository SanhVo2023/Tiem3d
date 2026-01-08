import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Netlify
  output: "export",
  trailingSlash: true,

  // Image optimization - use unoptimized for static export
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
