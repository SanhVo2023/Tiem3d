import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsForPage, getTotalPages } from "@/lib/blog";
import { BUSINESS } from "@/lib/business";
import { Header, Footer } from "@/components/landing";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { ZaloWidget } from "@/components/ui";

interface Props {
  params: Promise<{ trang: string }>;
}

/** Page 1 lives at /blog/, so this route starts at 2. */
export async function generateStaticParams() {
  const total = getTotalPages();
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    trang: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trang } = await params;

  return {
    title: `Blog in 3D — Trang ${trang}`,
    description:
      "Kiến thức thực tế về in 3D từ Tiệm 3D: công nghệ, vật liệu, chuẩn bị file và bảng giá.",
    alternates: { canonical: `${BUSINESS.url}/blog/trang/${trang}/` },
    // Deeper pages carry no unique value for search. Keep them crawlable so the
    // posts on them stay discoverable, but out of the index.
    robots: { index: false, follow: true },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { trang } = await params;
  const pageNumber = Number(trang);
  const totalPages = getTotalPages();

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <BlogIndex
          title={`Blog in 3D — Trang ${pageNumber}`}
          description="Kiến thức thực tế về in 3D: chọn công nghệ và vật liệu, chuẩn bị file, cách tính giá."
          posts={getPostsForPage(pageNumber)}
          currentPage={pageNumber}
          totalPages={totalPages}
        />
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
