import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/ui/Img";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  stepImage,
  coverImage,
  CATEGORY_LABELS,
} from "@/lib/portfolio";
import { socialCard } from "@/lib/social";
import { SERVICES } from "@/lib/navigation";
import { BUSINESS } from "@/lib/business";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Không tìm thấy dự án" };

  const url = `${BUSINESS.url}/portfolio/${slug}/`;
  // The cover is WebP for the page; scrapers need the JPEG card.
  const image = socialCard(coverImage(study));

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${study.title} | Tiệm 3D`,
      description: study.description,
      url,
      siteName: BUSINESS.name,
      locale: "vi_VN",
      images: [{ url: image, width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | Tiệm 3D`,
      description: study.description,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const url = `${BUSINESS.url}/portfolio/${slug}/`;
  const related = getRelatedCaseStudies(slug, 3);
  const usedServices = study.services
    .map((id) => SERVICES.find((s) => s.href === `/dich-vu/${id}/`))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Portfolio", url: `${BUSINESS.url}/portfolio/` },
          { name: study.shortTitle, url },
        ]}
      />
      <ArticleJsonLd
        headline={study.title}
        description={study.description}
        url={url}
        image={coverImage(study)}
        datePublished="2026-01-01"
      />

      <Header />

      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="border-b border-zinc-200 bg-zinc-50">
          <div className="container mx-auto max-w-5xl px-6 py-14 md:py-20">
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Tất cả dự án
            </Link>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-orange-600">
              {CATEGORY_LABELS[study.category]}
            </p>
            <h1 className="mt-4 max-w-3xl text-display text-3xl leading-tight text-zinc-900 md:text-5xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
              {study.description}
            </p>

            {/* Spec strip — the shop's real vernacular is measurements */}
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-zinc-200 pt-8 md:grid-cols-4">
              {study.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 font-mono text-lg font-medium text-zinc-900">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Brief / challenge / solution */}
        <section className="container mx-auto max-w-3xl px-6 py-16">
          <div className="space-y-10">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Khách cần gì
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-zinc-800">
                {study.brief}
              </p>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Chỗ khó
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-700">{study.challenge}</p>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Cách làm
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-700">{study.solution}</p>
            </div>
          </div>
        </section>

        {/* The build, step by step */}
        <section className="border-t border-zinc-200 bg-zinc-50 py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="text-display text-3xl text-zinc-900 md:text-4xl">
              Từng bước một
            </h2>
            <p className="mt-3 max-w-xl text-zinc-600">
              Đây là quy trình thật của một đơn hàng tại Tiệm 3D, từ tin nhắn Zalo
              đầu tiên đến lúc đóng gói.
            </p>

            <ol className="mt-12 space-y-14">
              {study.steps.map((step, index) => (
                <li
                  key={step.file}
                  className="grid items-center gap-8 md:grid-cols-2"
                >
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200 ${
                      index % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={stepImage(study, step)}
                      alt={`${study.shortTitle} — ${step.stage}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>

                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <span className="font-mono text-sm font-bold text-orange-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-zinc-900 md:text-2xl">
                      {step.stage}
                    </h3>
                    <p className="mt-3 leading-relaxed text-zinc-600">
                      {step.caption}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services used */}
        {usedServices.length > 0 && (
          <section className="container mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              Dịch vụ đã dùng trong dự án này
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {usedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-5 transition-colors hover:border-zinc-900"
                >
                  <div>
                    <p className="font-semibold text-zinc-900">{service.name}</p>
                    <p className="mt-1 text-sm text-zinc-600">{service.summary}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-900" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-zinc-900 py-16 text-white md:py-20">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-display text-3xl md:text-4xl">
              Bạn cũng có một ý tưởng như vậy?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Gửi ảnh hoặc bản vẽ tay qua Zalo — kể cả khi chưa có file 3D. Chúng
              tôi báo giá trong 30 phút.
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
                href="/bang-gia/"
                className="rounded-full border border-zinc-700 px-7 py-3 text-sm font-bold transition-colors hover:border-zinc-500"
              >
                Xem bảng giá
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="container mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              Dự án khác
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}/`}
                  className="group block overflow-hidden rounded-2xl border border-zinc-200 transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <Image
                      src={coverImage(item)}
                      alt={item.shortTitle}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-orange-600">
                      {CATEGORY_LABELS[item.category]}
                    </p>
                    <p className="mt-1 font-semibold leading-snug text-zinc-900">
                      {item.shortTitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <ZaloWidget />
    </>
  );
}
