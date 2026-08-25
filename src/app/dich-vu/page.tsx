import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/ui/Img";
import { ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/navigation";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/JsonLd";
import { socialCard } from "@/lib/social";

const TITLE = "Dịch vụ in 3D & thiết kế";
const DESCRIPTION =
  "8 dịch vụ của Tiệm 3D: in FDM, in Resin 8K/14K/16K, in khổ lớn, in chi tiết kỹ thuật ±0.1mm, thiết kế 3D theo yêu cầu, sơn hoàn thiện, in hàng loạt và dự án trọn gói. Hai chi nhánh tại Thủ Đức và Sơn Kỳ, TP.HCM.";

// Hero images already on disk, matched to the right service.
const SERVICE_IMAGES: Record<string, string> = {
  "/dich-vu/in-fdm/": "/assets/generated/services/service-fdm-hero.webp",
  "/dich-vu/in-resin/": "/assets/generated/services/service-resin-hero.webp",
  "/dich-vu/in-kho-lon/": "/assets/generated/workspace/workspace-fdm-farm.webp",
  "/dich-vu/in-ky-thuat/": "/assets/generated/products/product-gear.webp",
  "/dich-vu/thiet-ke-3d/": "/assets/generated/services/service-design-hero.webp",
  "/dich-vu/hoan-thien/": "/assets/generated/services/service-finish-hero.webp",
  "/dich-vu/in-hang-loat/": "/assets/generated/services/service-batch-hero.webp",
  "/dich-vu/du-an-tron-goi/": "/assets/generated/workspace/workspace-overview.webp",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BUSINESS.url}/dich-vu/` },
  openGraph: {
    type: "website",
    title: `${TITLE} | Tiệm 3D`,
    description: DESCRIPTION,
    url: `${BUSINESS.url}/dich-vu/`,
    siteName: BUSINESS.name,
    locale: "vi_VN",
    images: [
      {
        url: socialCard("/assets/generated/workspace/workspace-overview.webp"),
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Tiệm 3D`,
    description: DESCRIPTION,
    images: [socialCard("/assets/generated/workspace/workspace-overview.webp")],
  },
};

export default function ServicesHubPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Dịch vụ", url: `${BUSINESS.url}/dich-vu/` },
        ]}
      />
      <ItemListJsonLd
        name="Dịch vụ in 3D tại Tiệm 3D"
        items={SERVICES.map((service) => ({
          name: service.name,
          url: `${BUSINESS.url}${service.href}`,
          image: SERVICE_IMAGES[service.href],
        }))}
      />

      <Header />

      <main className="min-h-screen bg-white pt-16">
        <section className="border-b border-zinc-200 bg-zinc-50">
          <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-600">
              Dịch vụ
            </p>
            <h1 className="mt-4 max-w-3xl text-display text-4xl text-zinc-900 md:text-6xl">
              Từ bản vẽ đến sản phẩm thực
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Tám dịch vụ, một đầu mối liên hệ. Chưa biết chọn công nghệ nào thì
              cứ gửi ảnh hoặc file qua Zalo — chúng tôi tư vấn trước khi báo giá.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bao-gia/"
                className="rounded-full bg-zinc-900 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
              >
                Gửi yêu cầu báo giá
              </Link>
              <Link
                href="/bang-gia/"
                className="rounded-full border border-zinc-300 px-7 py-3 text-sm font-bold text-zinc-900 transition-colors hover:border-zinc-900"
              >
                Xem bảng giá
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <Image
                    src={SERVICE_IMAGES[service.href]}
                    alt={service.name}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] font-bold text-zinc-900 backdrop-blur">
                    {service.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold text-zinc-900 transition-colors group-hover:text-orange-600">
                    {service.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                    {service.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600">
                    Tìm hiểu thêm
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900 py-16 text-white md:py-24">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-display text-3xl md:text-4xl">
              Không chắc nên chọn dịch vụ nào?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Gửi ảnh món đồ bạn muốn làm — kể cả ảnh chụp vội hay bản vẽ tay.
              Chúng tôi sẽ nói cho bạn biết in được hay không, bằng công nghệ nào
              và hết bao nhiêu.
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
                href="/lien-he/"
                className="rounded-full border border-zinc-700 px-7 py-3 text-sm font-bold transition-colors hover:border-zinc-500"
              >
                Xem địa chỉ 2 chi nhánh
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
