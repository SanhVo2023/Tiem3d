import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface RelatedPostsProps {
  posts: BlogPostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-zinc-200">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        Bài viết liên quan
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.url}
            className="group block p-4 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors"
          >
            <div className="text-sm text-zinc-500 mb-2">
              {formatDate(post.date)}
            </div>
            <h3 className="font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-zinc-600 line-clamp-2">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-zinc-200 text-zinc-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
