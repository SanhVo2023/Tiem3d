/**
 * Maps a display image to its social-card JPEG.
 *
 * og:image and twitter:image cannot be WebP — Facebook, Zalo and X all decline
 * to render one, so a shared link shows no preview. The page images are WebP for
 * weight, and scripts/generate-social-cards.mjs writes a 1200x630 JPEG sibling
 * for every path that this helper is applied to. Both sides use this function,
 * so a card can never be looked up at a path the generator did not write.
 */
export const SOCIAL_DIR = "/assets/social";

export function socialCard(src: string): string {
  const name = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "og-image";
  return `${SOCIAL_DIR}/${name}.jpg`;
}
