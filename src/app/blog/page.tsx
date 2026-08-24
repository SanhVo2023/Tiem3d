import type { Metadata } from "next";
import { getPostsForPage, getTotalPages } from "@/lib/blog";
import { BUSINESS } from "@/lib/business";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { ZaloWidget } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const TITLE = "Blog in 3D — Kiến thức & hướng dẫn";
const DESCRIPTION =
  "Kiến thức thực tế về in 3D: chọn công nghệ và vật liệu, chuẩn bị file, cách tính giá, và những dự án Tiệm 3D đã làm tại TP.HCM.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // A child `alternates` object replaces the parent's entirely, so declaring
  // only `types` here previously dropped the canonical from this page.
  alternates: {
    canonical: `${BUSINESS.url}/blog/`,
    types: { "application/rss+xml": `${BUSINESS.url}/feed.xml` },
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${BUSINESS.url}/blog/`,
    siteName: BUSINESS.name,
    locale: "vi_VN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Blog", url: `${BUSINESS.url}/blog/` },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <BlogIndex
          title={TITLE}
          description={DESCRIPTION}
          posts={getPostsForPage(1)}
          currentPage={1}
          totalPages={getTotalPages()}
        />
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
