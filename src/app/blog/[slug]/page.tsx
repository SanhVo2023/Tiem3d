import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/ui/Img";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getAllSlugs,
  getPostBySlug,
  formatDate,
  getRelatedPosts,
  slugifyTag,
} from "@/lib/blog";
import { BUSINESS } from "@/lib/business";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ZaloWidget } from "@/components/ui";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FAQJsonLd,
} from "@/components/seo/JsonLd";
import {
  TomTatNhanh,
  Callout,
  BangGia,
  ZaloCTA,
  ThongTinLienHe,
  DocThem,
  Anh,
} from "@/components/blog/MdxComponents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  const url = `${BUSINESS.url}/blog/${slug}/`;
  const image = post.image || "/og-image.jpg";

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    // Without this every post inherited the root layout's canonical and told
    // Google the entire blog was a duplicate of the homepage.
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: BUSINESS.name,
      locale: "vi_VN",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

const mdxComponents = {
  // Custom blocks
  TomTatNhanh,
  Callout,
  BangGia,
  ZaloCTA,
  ThongTinLienHe,
  DocThem,
  Anh,

  // Base elements. Headings get scroll-margin so the anchor links that
  // rehype-slug now generates don't land under the fixed header.
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 scroll-mt-24 text-2xl font-bold text-zinc-900 md:text-3xl"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 scroll-mt-24 text-xl font-semibold text-zinc-900 md:text-2xl"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-6 scroll-mt-24 text-lg font-semibold text-zinc-900" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-zinc-700" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 list-disc space-y-2 pl-5 text-zinc-700" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-6 list-decimal space-y-2 pl-5 text-zinc-700" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-zinc-900" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-orange-600 underline hover:text-orange-700" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-200">
      <table className="min-w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-50" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-zinc-200 px-4 py-3 text-left text-sm font-semibold text-zinc-900"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-b border-zinc-100 px-4 py-3 text-sm text-zinc-700"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-orange-500 pl-4 italic text-zinc-600"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-zinc-100"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-zinc-200" />,
};

// rehype-slug and rehype-autolink-headings are installed but were only wired
// into the dormant contentlayer config, so no post had heading IDs.
const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ] as never,
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const url = `${BUSINESS.url}/blog/${slug}/`;

  return (
    <>
      <ArticleJsonLd
        headline={post.title}
        description={post.description}
        url={url}
        image={post.image}
        datePublished={post.date}
        dateModified={post.updated}
        authorName={post.author}
        keywords={post.tags}
        wordCount={post.content.trim().split(/\s+/).length}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Blog", url: `${BUSINESS.url}/blog/` },
          { name: post.title, url },
        ]}
      />
      {post.faqs.length > 0 && <FAQJsonLd faqs={post.faqs} />}

      <Header />

      <main className="min-h-screen bg-white pt-24">
        <article className="container mx-auto max-w-3xl px-6 py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-zinc-500">
              <li>
                <Link href="/" className="hover:text-zinc-900">
                  Trang chủ
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blog/" className="hover:text-zinc-900">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="max-w-[220px] truncate text-zinc-900">{post.title}</li>
            </ol>
          </nav>

          {post.draft && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
              Bản nháp — chưa xuất bản
            </p>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm text-zinc-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
            <span aria-hidden>·</span>
            <span>{post.author}</span>
            {post.updated && (
              <>
                <span aria-hidden>·</span>
                <span>Cập nhật {formatDate(post.updated)}</span>
              </>
            )}
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-zinc-900 md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-zinc-600">
            {post.description}
          </p>

          <div className="mb-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${slugifyTag(tag)}/`}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600 transition-colors hover:bg-zinc-200"
              >
                {tag}
              </Link>
            ))}
          </div>

          {post.image && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-zinc max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={mdxOptions}
            />
          </div>

          {/* FAQ, rendered from frontmatter so the markup and the schema
              can never drift apart. */}
          {post.faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-zinc-900">
                Câu hỏi thường gặp
              </h2>
              <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                {post.faqs.map((faq) => (
                  <details key={faq.question} className="group py-4">
                    <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:content-none">
                      <span className="flex items-start justify-between gap-4">
                        {faq.question}
                        <span className="mt-1 text-orange-500 transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-zinc-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <ThongTinLienHe />

          <RelatedPosts posts={relatedPosts} />

          <div className="mt-12 border-t border-zinc-100 pt-8">
            <Link href="/blog/" className="text-zinc-600 transition-colors hover:text-zinc-900">
              ← Xem tất cả bài viết
            </Link>
          </div>
        </article>
      </main>

      <Footer />
      <ZaloWidget />
    </>
  );
}
