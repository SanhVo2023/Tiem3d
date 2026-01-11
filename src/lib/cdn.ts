// CDN Configuration for R2
// After enabling public access in Cloudflare Dashboard, images will be served from R2 CDN

// R2 Public URL - Update this after enabling public access
export const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

// Helper to get CDN URL for an asset
export function getCdnUrl(path: string): string {
  // If CDN is configured, use it; otherwise fall back to local path
  if (CDN_BASE_URL) {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${CDN_BASE_URL}/${cleanPath}`;
  }
  return path;
}

// Helper specifically for generated assets
export function getAssetUrl(assetPath: string): string {
  return getCdnUrl(assetPath);
}
