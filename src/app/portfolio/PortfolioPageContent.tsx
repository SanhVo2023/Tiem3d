"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "@/components/ui/Img";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  CASE_STUDIES,
  CATEGORY_LABELS,
  coverImage,
  type CaseStudyCategory,
} from "@/lib/portfolio";
import { BUSINESS } from "@/lib/business";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";

type Filter = "all" | CaseStudyCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tất cả" },
  ...(Object.keys(CATEGORY_LABELS) as CaseStudyCategory[]).map((id) => ({
    id: id as Filter,
    label: CATEGORY_LABELS[id],
  })),
];

export default function PortfolioPageContent() {
  const [active, setActive] = useState<Filter>("all");

  // Only offer a filter chip if it actually matches something — the old page
  // rendered a "Trang trí" filter whose five cards were all broken images.
  const available = useMemo(
    () =>
      FILTERS.filter(
        (f) => f.id === "all" || CASE_STUDIES.some((s) => s.category === f.id)
      ),
    []
  );

  const visible = useMemo(
    () =>
      active === "all"
        ? CASE_STUDIES
        : CASE_STUDIES.filter((study) => study.category === active),
    [active]
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-16">
        <section className="border-b border-zinc-200 bg-zinc-50">
          <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-600">
              Portfolio
            </p>
            <h1 className="mt-4 max-w-3xl text-display text-4xl text-zinc-900 md:text-6xl">
              Những đơn hàng đã đi qua xưởng
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Mỗi dự án dưới đây kể lại đầy đủ quá trình: từ tin nhắn Zalo đầu
              tiên, dựng mẫu, in, sơn, tới lúc đóng gói giao đi.
            </p>
          </div>
        </section>

        {/* Filters */}
        <div className="sticky top-16 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
          <div className="container mx-auto max-w-6xl overflow-x-auto px-6 py-4">
            <div className="flex gap-2">
              {available.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActive(filter.id)}
                  aria-pressed={active === filter.id}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                    active === filter.id
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((study, index) => (
              <motion.article
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.24) }}
                className="group overflow-hidden rounded-2xl border border-zinc-200 transition-shadow hover:shadow-lg"
              >
                <Link href={`/portfolio/${study.slug}/`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <Image
                      src={coverImage(study)}
                      alt={study.shortTitle}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {study.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        Nổi bật
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-orange-600">
                      {CATEGORY_LABELS[study.category]}
                    </p>
                    <h2 className="mt-1.5 text-lg font-bold leading-snug text-zinc-900 transition-colors group-hover:text-orange-600">
                      {study.shortTitle}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                      {study.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-zinc-500">
                      {study.specs.slice(0, 2).map((spec) => (
                        <span key={spec.label}>
                          {spec.label}: {spec.value}
                        </span>
                      ))}
                    </div>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600">
                      Xem chi tiết
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-zinc-900 py-16 text-white md:py-20">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-display text-3xl md:text-4xl">
              Món của bạn sẽ trông thế nào?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Gửi ảnh tham khảo hoặc bản vẽ tay qua Zalo. Chúng tôi nói ngay in
              được hay không, bằng công nghệ nào và hết bao nhiêu.
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
      </main>

      <Footer />
      <ZaloWidget />
    </>
  );
}
