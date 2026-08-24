import Link from "next/link";
import { getAllTags } from "@/lib/blog";

/**
 * Tag navigation. These are real links to static /blog/tag/<slug>/ routes —
 * they used to be client-side buttons, and post pages linked to /blog?tag=…
 * which nothing ever read, so every tag link silently did nothing.
 */
export function TagBar({ activeSlug }: { activeSlug?: string }) {
  const tags = getAllTags();
  if (tags.length === 0) return null;

  const base =
    "rounded-full px-4 py-2 text-sm transition-colors whitespace-nowrap";

  return (
    <nav aria-label="Chủ đề" className="flex flex-wrap gap-2">
      <Link
        href="/blog/"
        className={`${base} ${
          activeSlug
            ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            : "bg-zinc-900 text-white"
        }`}
      >
        Tất cả
      </Link>

      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/blog/tag/${tag.slug}/`}
          className={`${base} ${
            activeSlug === tag.slug
              ? "bg-zinc-900 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          {tag.name}
          <span className="ml-1.5 font-mono text-xs opacity-60">{tag.count}</span>
        </Link>
      ))}
    </nav>
  );
}
