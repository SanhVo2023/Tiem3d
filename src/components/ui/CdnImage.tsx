"use client";

import Image, { ImageProps } from "next/image";

// R2 CDN Base URL - will be empty in development, set in production
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || "";

interface CdnImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

/**
 * CdnImage - Image component that automatically uses R2 CDN in production
 * Falls back to local path if CDN is not configured
 */
export function CdnImage({ src, alt, ...props }: CdnImageProps) {
  // Transform src to CDN URL if CDN is configured and src is a local asset path
  const imageSrc = getImageSrc(src);

  return <Image src={imageSrc} alt={alt} {...props} />;
}

/**
 * Get the full image URL, using CDN if configured
 */
export function getImageSrc(src: string): string {
  // Only transform local asset paths
  if (CDN_BASE_URL && src.startsWith("/assets/")) {
    const cleanPath = src.startsWith("/") ? src.slice(1) : src;
    return `${CDN_BASE_URL}/${cleanPath}`;
  }
  return src;
}

/**
 * Hook to get CDN-aware image URLs
 */
export function useCdnUrl(path: string): string {
  return getImageSrc(path);
}

export default CdnImage;
