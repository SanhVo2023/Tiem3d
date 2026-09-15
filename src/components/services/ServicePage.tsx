import Link from "next/link";
import Image from "@/components/ui/Img";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { BreadcrumbJsonLd, FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { SERVICE_DETAILS } from "@/data/services";
import { getPriceTable, PRICE_DISCLAIMER } from "@/data/pricing";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/navigation";
import { getAllCaseStudies, coverImage } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/metadata";
import { socialCard } from "@/lib/social";

function detail(slug: string) {
  const service = SERVICE_DETAILS.find(item => item.slug === slug);
  if (!service) throw new Error(`Missing service content: ${slug}`);
  return service;
}

export function serviceMetadata(slug: string) {
  const service = detail(slug);
  const sample = getAllCaseStudies().find(study => study.services.includes(slug));
  const image = sample ? socialCard(coverImage(sample)) : "/og-image.jpg";
  return pageMetadata(service.title, service.intro, `/dich-vu/${slug}/`, image);
}

export function ServicePage({ slug }: { slug: string }) {
  const service = detail(slug);
  const price = service.priceTable ? getPriceTable(service.priceTable) : undefined;
  const examples = getAllCaseStudies().filter(study => study.services.includes(slug)).slice(0, 3);
  const related = SERVICES.filter(item => service.related.includes(item.href.split("/")[2]));
  const url = `${BUSINESS.url}/dich-vu/${slug}/`;
  return (
    <>
      <Header />
      <ServiceJsonLd name={service.title} description={service.intro} url={url} image={`${BUSINESS.url}${service.image}`} />
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: `${BUSINESS.url}/` }, { name: "Dịch vụ", url: `${BUSINESS.url}/dich-vu/` }, { name: SERVICES.find(item => item.href === `/dich-vu/${slug}/`)?.name || service.title, url }]} />
      <FAQJsonLd faqs={service.faq} />
      <main id="noi-dung" className="bg-white pt-[76px]">
        <section className="border-b border-zinc-200 bg-[#f4f6f7]">
          <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
            <Link href="/dich-vu/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Tất cả dịch vụ</Link>
            <div className="mt-6 grid items-center gap-9 md:grid-cols-2 md:gap-12">
              <div>
                <p className="font-semibold text-[#a83e08]">Tiệm 3D · TP.HCM</p>
                <h1 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.2] tracking-tight text-zinc-900">{service.title}</h1>
                <p className="mt-5 text-lg leading-relaxed text-zinc-600">{service.intro}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/bao-gia/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-zinc-950 hover:bg-orange-400">Yêu cầu báo giá<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                  <Link href="/bang-gia/" className="inline-flex min-h-12 items-center rounded-full border border-zinc-300 px-6 py-3 font-semibold text-zinc-900 hover:bg-white">Bảng giá tham khảo</Link>
                </div>
              </div>
              <figure>
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-zinc-200">
                  <Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 767px) calc(100vw - 48px), 520px" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-sm text-zinc-600">Hình minh họa ứng dụng và quy trình.</figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-zinc-900">{service.heading}</h2>
          <div className="mt-9 grid gap-7 md:grid-cols-3">{service.applications.map(item => <div key={item.title} className="border-t border-zinc-300 pt-5"><h3 className="text-lg font-bold text-zinc-900">{item.title}</h3><p className="mt-3 leading-relaxed text-zinc-600">{item.text}</p></div>)}</div>
        </section>
        <section className="border-y border-zinc-200 bg-[#f4f6f7]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:gap-16">
            <div><h2 className="text-2xl font-bold text-zinc-900">Bạn cần chuẩn bị gì?</h2><ul className="mt-5 list-disc space-y-4 pl-5 leading-relaxed text-zinc-700">{service.preparation.map(item => <li key={item}>{item}</li>)}</ul><p className="mt-6 text-sm leading-relaxed text-zinc-600">Gửi file và ảnh trực tiếp trong Zalo. Trang báo giá giúp bạn soạn nội dung yêu cầu trước khi gửi.</p></div>
            <div><h2 className="text-2xl font-bold text-zinc-900">Tiệm xử lý yêu cầu thế nào?</h2><ol className="mt-5 space-y-5">{service.process.map((step, index) => <li key={step} className="flex gap-4"><span className="pt-1 font-mono text-sm text-[#a83e08]">0{index + 1}</span><p className="leading-relaxed text-zinc-700">{step}</p></li>)}</ol></div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div><h2 className="text-3xl font-bold text-zinc-900">Chi phí dự kiến</h2><p className="mt-4 leading-relaxed text-zinc-600">Giá phụ thuộc kích thước, số lượng, vật liệu và công hoàn thiện. Các yêu cầu thiết kế, lắp ghép hoặc sơn cần được tính riêng.</p><Link href="/bang-gia/" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-[#a83e08] underline underline-offset-4">Xem bảng giá đầy đủ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
            <div>
              {price ? <><p className="mb-3 text-sm font-semibold text-zinc-600">{price.unit}</p><dl className="divide-y divide-zinc-200 border-y border-zinc-200">{price.rows.map(row => <div key={row.name} className="grid grid-cols-[1fr_auto] gap-4 py-4"><dt className="font-semibold text-zinc-900">{row.name}</dt><dd className="text-right font-mono text-sm text-zinc-700">{row.price}</dd></div>)}</dl></> : <p className="rounded-2xl border border-zinc-200 p-6 text-lg leading-relaxed text-zinc-700">Gửi mẫu và yêu cầu để nhận báo giá theo phạm vi công việc. Tiệm xác nhận chi phí và thời gian dự kiến trước khi thực hiện.</p>}
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">{PRICE_DISCLAIMER}</p>
            </div>
          </div>
        </section>
        {examples.length > 0 && <section className="bg-[#f4f6f7] py-14"><div className="mx-auto max-w-6xl px-6"><div className="flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl font-bold text-zinc-900">Mẫu ứng dụng minh họa</h2><Link href="/portfolio/" className="inline-flex min-h-11 items-center font-semibold text-zinc-700 underline underline-offset-4">Xem bộ mẫu</Link></div><div className="mt-7 grid gap-7 sm:grid-cols-3">{examples.map(study => <Link key={study.slug} href={`/portfolio/${study.slug}/`} className="group"><div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-200"><Image src={coverImage(study)} alt={`${study.shortTitle} — mẫu minh họa`} fill sizes="(max-width: 639px) calc(100vw - 48px), 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /></div><h3 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:underline">{study.shortTitle}</h3></Link>)}</div></div></section>}
        <section className="mx-auto max-w-3xl px-6 py-14"><h2 className="text-2xl font-bold text-zinc-900">Câu hỏi thường gặp</h2><div className="mt-5 divide-y divide-zinc-200">{service.faq.map(item => <details key={item.question} className="py-5"><summary className="cursor-pointer font-semibold text-zinc-900">{item.question}</summary><p className="mt-3 leading-relaxed text-zinc-600">{item.answer}</p></details>)}</div></section>
        <section className="border-t border-zinc-200 py-12"><div className="mx-auto max-w-6xl px-6"><h2 className="text-xl font-bold text-zinc-900">Dịch vụ liên quan</h2><div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">{related.map(item => <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-700 underline underline-offset-4">{item.name}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>)}</div></div></section>
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
