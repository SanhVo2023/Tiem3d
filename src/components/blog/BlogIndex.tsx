import Link from "next/link";
import { Rss } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { PostGrid } from "./PostCard";
import { TagBar } from "./TagBar";
import { Pagination } from "./Pagination";
import { BUSINESS } from "@/lib/business";

/**
 * Shared shell for /blog, /blog/page/[n] and /blog/tag/[tag].
 */
export function BlogIndex({
  title,
  description,
  posts,
  activeTagSlug,
  currentPage = 1,
  totalPages = 1,
}: {
  title: string;
  description: string;
  posts: BlogPostMeta[];
  activeTagSlug?: string;
  currentPage?: number;
  totalPages?: number;
}) {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-display text-4xl text-zinc-900 md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                {description}
              </p>
            </div>

            <a
              href="/feed.xml"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-600 transition-colors hover:border-orange-400 hover:text-orange-600"
            >
              <Rss className="h-4 w-4" />
              RSS
            </a>
          </div>

          <div className="mt-8">
            <TagBar activeSlug={activeTagSlug} />
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-16">
        <PostGrid posts={posts} />
        {!activeTagSlug && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </section>

      <section className="bg-zinc-900 py-16 text-white">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-display text-3xl md:text-4xl">Cần tư vấn về in 3D?</h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Gửi file hoặc ảnh mẫu qua Zalo, Tiệm 3D báo giá trong 30 phút. Mở cửa{" "}
            {BUSINESS.hours.display} tất cả các ngày.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={BUSINESS.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0068ff] px-7 py-3 text-sm font-bold transition-colors hover:bg-[#0057d4]"
            >
              Chat Zalo {BUSINESS.phoneDisplay}
            </a>
            <Link
              href="/bao-gia/"
              className="rounded-full border border-zinc-700 px-7 py-3 text-sm font-bold transition-colors hover:border-zinc-500"
            >
              Gửi yêu cầu báo giá
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
