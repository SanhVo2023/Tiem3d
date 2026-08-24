"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Rss } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { BlogSearch } from "./BlogSearch";
import { Pagination } from "./Pagination";

interface BlogContentProps {
  posts: BlogPostMeta[];
  tags: string[];
}

const POSTS_PER_PAGE = 6;

export function BlogContent({ posts, tags }: BlogContentProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts by tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  // Paginate
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset to page 1 when tag changes
  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                Blog In 3D
              </h1>
              <p className="text-xl text-zinc-600">
                Kien thuc, huong dan va chia se kinh nghiem ve in 3D tu Tiem 3D
              </p>
            </div>
            <div className="flex items-center gap-4">
              <BlogSearch posts={posts} />
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
                title="RSS Feed"
              >
                <Rss className="w-4 h-4" />
                <span className="hidden sm:inline">RSS</span>
              </a>
            </div>
          </div>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                onClick={() => handleTagChange(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedTag
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                }`}
              >
                Tat ca
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 mb-4">
                {selectedTag
                  ? `Khong tim thay bai viet nao voi tag "${selectedTag}"`
                  : "Chua co bai viet nao. Hay quay lai sau!"}
              </p>
              {selectedTag && (
                <button
                  onClick={() => handleTagChange(null)}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Xem tat ca bai viet
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {paginatedPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="border-b border-zinc-100 pb-8 last:border-0"
                  >
                    <Link href={post.url} className="group block">
                      <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>&#8226;</span>
                        <span>{post.readingTime}</span>
                        {post.featured && (
                          <>
                            <span>&#8226;</span>
                            <span className="text-orange-600 font-medium">
                              Noi bat
                            </span>
                          </>
                        )}
                        {post.draft && (
                          <>
                            <span>&#8226;</span>
                            <span className="text-yellow-600 font-medium bg-yellow-100 px-2 py-0.5 rounded">
                              Nhap
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-2xl font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors mb-3">
                        {post.title}
                      </h2>

                      <p className="text-zinc-600 mb-4 line-clamp-2">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <ClientPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Can Tu Van Ve In 3D?</h2>
          <p className="text-zinc-400 mb-8">
            Lien he Tiem 3D de duoc tu van mien phi va bao gia nhanh
          </p>
          <a
            href="https://zalo.me/0384844730"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-full font-medium hover:bg-zinc-100 transition-colors"
          >
            Lien He Zalo
          </a>
        </div>
      </section>
    </>
  );
}

// Client-side pagination component
function ClientPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          currentPage <= 1
            ? "text-zinc-300 cursor-not-allowed"
            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
        }`}
      >
        Truoc
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-2 text-zinc-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          currentPage >= totalPages
            ? "text-zinc-300 cursor-not-allowed"
            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
        }`}
      >
        Sau
      </button>
    </nav>
  );
}
