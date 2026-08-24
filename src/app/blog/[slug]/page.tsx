import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, formatDate, getRelatedPosts } from "@/lib/blog";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Khong tim thay bai viet" };
  }

  return {
    title: `${post.title} | Tiem 3D`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

// Custom MDX components
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl md:text-4xl font-bold text-zinc-900 mt-12 mb-6"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl md:text-3xl font-semibold text-zinc-900 mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl md:text-2xl font-semibold text-zinc-900 mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-zinc-700 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside space-y-2 mb-6 text-zinc-700"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside space-y-2 mb-6 text-zinc-700"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-zinc-900" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-orange-600 hover:text-orange-700 underline"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table
        className="min-w-full border border-zinc-200 rounded-lg"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-50" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 border-b border-zinc-200"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 text-sm text-zinc-700 border-b border-zinc-100"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-orange-500 pl-4 italic text-zinc-600 my-6"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto mb-6"
      {...props}
    />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Organization",
      name: "Tiem 3D",
      url: "https://in3dplus.com",
      logo: {
        "@type": "ImageObject",
        url: "https://in3dplus.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://in3dplus.com${post.url}`,
    },
    image: post.image || "https://in3dplus.com/og-image.jpg",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Article Header */}
        <article className="container mx-auto px-6 max-w-3xl py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-zinc-500">
              <li>
                <Link href="/" className="hover:text-zinc-900">
                  Trang chu
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-zinc-900">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-zinc-900 truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Draft Badge */}
          {post.draft && (
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              Ban nhap - Chua xuat ban
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&#8226;</span>
            <span>{post.readingTime}</span>
            <span>&#8226;</span>
            <span>{post.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-zinc-600 mb-8">{post.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full hover:bg-zinc-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-zinc max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Author & CTA */}
          <div className="mt-16 p-8 bg-zinc-50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-white text-xl font-bold">
                3D
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 mb-1">Tiem 3D</h3>
                <p className="text-zinc-600 text-sm mb-4">
                  Dich vu in 3D chuyen nghiep tai Thu Duc, TP.HCM. In FDM, Resin
                  8K/14K/16K. Thiet ke va son hoan thien mo hinh.
                </p>
                <a
                  href="https://zalo.me/0777863808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Lien he qua Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-zinc-100">
            <Link
              href="/blog"
              className="text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              &#8592; Xem tat ca bai viet
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
