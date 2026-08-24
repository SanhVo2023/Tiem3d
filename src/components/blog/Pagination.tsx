import Link from "next/link";

/**
 * Link-based pagination. The previous version was a client component driving
 * `useState`, so page 2 had no URL — it was unreachable to a crawler and
 * impossible to share.
 */
export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) => (page === 1 ? "/blog/" : `/blog/trang/${page}/`);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const cell =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 font-mono text-sm transition-colors";

  return (
    <nav aria-label="Phân trang" className="mt-16 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={href(currentPage - 1)}
          rel="prev"
          className={`${cell} border border-zinc-200 text-zinc-700 hover:bg-zinc-100`}
        >
          ← Trước
        </Link>
      ) : (
        <span className={`${cell} border border-zinc-100 text-zinc-300`}>← Trước</span>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            className={`${cell} bg-zinc-900 text-white`}
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={href(page)}
            className={`${cell} border border-zinc-200 text-zinc-700 hover:bg-zinc-100`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={href(currentPage + 1)}
          rel="next"
          className={`${cell} border border-zinc-200 text-zinc-700 hover:bg-zinc-100`}
        >
          Sau →
        </Link>
      ) : (
        <span className={`${cell} border border-zinc-100 text-zinc-300`}>Sau →</span>
      )}
    </nav>
  );
}
