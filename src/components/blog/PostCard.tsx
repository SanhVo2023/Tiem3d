import Link from "next/link";
import Image from "next/image";
import { formatDate, slugifyTag, type BlogPostMeta } from "@/lib/blog";

/**
 * Server-rendered post card. The blog list was previously text-only even though
 * every post declares a cover image, and its tag chips were plain spans.
 */
export function PostCard({
  post,
  priority = false,
}: {
  post: BlogPostMeta;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={post.url} className="relative block aspect-[16/10] overflow-hidden bg-zinc-100">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
            <span className="text-display text-3xl text-zinc-300">Tiệm 3D</span>
          </div>
        )}
        {post.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            Nổi bật
          </span>
        )}
        {post.draft && (
          <span className="absolute right-3 top-3 rounded-full bg-yellow-400 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-yellow-950">
            Nháp
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3 font-mono text-xs text-zinc-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="mb-2 text-lg font-bold leading-snug text-zinc-900">
          <Link href={post.url} className="transition-colors hover:text-orange-600">
            {post.title}
          </Link>
        </h2>

        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${slugifyTag(tag)}/`}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 transition-colors hover:bg-orange-100 hover:text-orange-700"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export function PostGrid({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-zinc-500">
        Chưa có bài viết nào ở mục này.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard key={post.slug} post={post} priority={index < 3} />
      ))}
    </div>
  );
}
