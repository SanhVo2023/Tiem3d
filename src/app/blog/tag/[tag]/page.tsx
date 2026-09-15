import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllTagSlugs,
  getTagBySlug,
  getPostsByTagSlug,
} from "@/lib/blog";
import { BUSINESS } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { ZaloWidget } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) return { title: "Không tìm thấy chủ đề" };

  const title = `${tag.name} — Bài viết về in 3D`;
  const description = `${tag.count} bài viết về ${tag.name.toLowerCase()} từ Tiệm 3D — kinh nghiệm thực tế từ xưởng in 3D tại TP.HCM.`;

  return {
    ...pageMetadata(title, description, `/blog/tag/${tagSlug}/`),
    // One post behind a tag makes the tag page a thin duplicate of it.
    ...(tag.count < 2 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) notFound();

  const posts = getPostsByTagSlug(tagSlug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Blog", url: `${BUSINESS.url}/blog/` },
          { name: tag.name, url: `${BUSINESS.url}/blog/tag/${tagSlug}/` },
        ]}
      />
      <Header />
      <main id="noi-dung" className="min-h-screen bg-white pt-[76px]">
        <BlogIndex
          title={tag.name}
          description={`${tag.count} bài viết về ${tag.name.toLowerCase()}.`}
          posts={posts}
          activeTagSlug={tagSlug}
        />
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
