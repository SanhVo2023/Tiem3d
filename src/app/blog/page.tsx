import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog In 3D | Kien Thuc & Huong Dan",
  description:
    "Blog chia se kien thuc ve in 3D, so sanh FDM vs Resin, huong dan chuan bi file, bang gia va nhieu thong tin huu ich ve dich vu in 3D.",
  openGraph: {
    title: "Blog In 3D | Tiem 3D",
    description: "Kien thuc va huong dan ve in 3D tu Tiem 3D",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function BlogPage() {
  // Get all posts at build time
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        <BlogContent posts={allPosts} tags={allTags} />
      </main>
      <Footer />
    </>
  );
}
