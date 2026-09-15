import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation, ArrowUpRight } from "lucide-react";
import { BUSINESS, formatAddress, mapsUrl, type Branch } from "@/lib/business";
import { Header, Footer } from "@/components/landing";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

const TITLE = "Liên hệ Tiệm 3D tại TP.HCM";
const DESCRIPTION = "Đặt in 3D qua Zalo 0384 844 730. Tư vấn 8:00–22:00 mỗi ngày. Xưởng Tân Phú nhận đơn trực tuyến và giao qua đơn vị vận chuyển, không đón khách.";
const FAQS = [
  { question: "Tôi có thể liên hệ lúc nào?", answer: `Tiệm tư vấn từ ${BUSINESS.hours.display} mỗi ngày, kể cả Chủ nhật. Bạn có thể để lại tin nhắn Zalo ngoài giờ; tiệm sẽ phản hồi trong giờ làm việc.` },
  { question: "Tôi có thể ghé xưởng Tân Phú không?", answer: "Xưởng Tân Phú không đón khách hoặc giao hàng trực tiếp tại địa chỉ. Vui lòng gửi yêu cầu qua Zalo hoặc điện thoại; mọi đơn hàng được giao qua đơn vị vận chuyển bên thứ ba." },
  { question: "Nếu cần xem mẫu hoặc mang chi tiết đến đo thì sao?", answer: "Hãy gọi hoặc nhắn Zalo để trao đổi trước với cơ sở Thủ Đức. Tiệm sẽ xác nhận lịch và khả năng tiếp nhận mẫu trước khi bạn di chuyển." },
  { question: "Cần gửi gì để được báo giá?", answer: "Gửi file 3D hoặc ảnh tham khảo, kích thước, số lượng, mục đích sử dụng và ngày cần nhận hàng. Nếu chưa có file, tiệm sẽ trao đổi thêm về phần thiết kế. Phí giao hàng và thời gian dự kiến được xác nhận khi chốt đơn." },
];

export const metadata: Metadata = {
  title: TITLE, description: DESCRIPTION,
  alternates: { canonical: `${BUSINESS.url}/lien-he/` },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: `${BUSINESS.url}/lien-he/`, images: ["/og-image.jpg"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.jpg"] },
};

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
      <p className="text-sm font-semibold text-[#a83e08]">{branch.customerVisits ? "Trao đổi trước khi đến" : "Đặt hàng trực tuyến"}</p>
      <h2 className="mt-2 text-2xl font-bold text-zinc-900">{branch.name}</h2>
      <p className="mt-4 flex items-start gap-3 text-base leading-relaxed text-zinc-600">
        <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />{formatAddress(branch)}
      </p>
      <p className="mt-5 flex-1 text-base leading-relaxed text-zinc-700">
        {branch.customerVisits
          ? "Muốn xem vật liệu hoặc mang mẫu đến đo? Liên hệ trước để tiệm xác nhận lịch và chuẩn bị mẫu phù hợp."
          : "Xưởng không đón khách và không có điểm nhận hàng trực tiếp. Mọi đơn được giao qua đơn vị vận chuyển bên thứ ba."}
      </p>
      <Link href={`/khu-vuc/${branch.id}/`} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-900 underline decoration-zinc-300 underline-offset-4">
        Cách đặt hàng tại {branch.shortName}<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
      </Link>
      {branch.customerVisits && (
        <a href={mapsUrl(branch)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
          <Navigation aria-hidden="true" className="h-4 w-4" />Tìm địa chỉ Thủ Đức trên Maps
        </a>
      )}
    </article>
  );
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: `${BUSINESS.url}/` }, { name: "Liên hệ", url: `${BUSINESS.url}/lien-he/` }]} />
      <FAQJsonLd faqs={FAQS} />
      <Header />
      <main id="noi-dung" className="min-h-screen bg-[#f4f6f7] pt-[76px]">
        <section className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="font-semibold text-[#a83e08]">Liên hệ Tiệm 3D</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 md:text-5xl">Cùng trao đổi về mẫu bạn muốn in.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">Gửi file hoặc ảnh qua Zalo, kèm kích thước và số lượng. Tiệm sẽ tư vấn vật liệu, cách hoàn thiện và báo giá theo yêu cầu của bạn.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BUSINESS.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0068ff] px-6 py-3 font-semibold text-white hover:bg-[#0057d4]"><MessageCircle aria-hidden="true" className="h-5 w-5" />Nhắn Zalo cho tiệm</a>
              <a href={BUSINESS.tel} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 font-semibold text-zinc-900 hover:bg-zinc-50"><Phone aria-hidden="true" className="h-5 w-5" />{BUSINESS.phoneDisplay}</a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-zinc-600"><Clock aria-hidden="true" className="h-4 w-4" />Giờ tư vấn: {BUSINESS.hours.display}, mỗi ngày</p>
          </div>
        </section>
        <section aria-label="Thông tin cơ sở" className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 md:grid-cols-2">{BUSINESS.branches.map(branch => <BranchCard key={branch.id} branch={branch} />)}</div>
          <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div><h2 className="text-xl font-bold text-zinc-900">Gửi yêu cầu qua email</h2><p className="mt-2 max-w-xl leading-relaxed text-zinc-600">Phù hợp khi cần trao đổi bản vẽ và yêu cầu chi tiết. Tiệm xác nhận phí và thời gian vận chuyển trước khi chốt đơn.</p></div>
            <a href={`mailto:${BUSINESS.email}`} className="inline-flex min-h-12 items-center gap-2 break-all font-semibold text-zinc-900 underline underline-offset-4"><Mail aria-hidden="true" className="h-5 w-5 shrink-0" />{BUSINESS.email}</a>
          </div>
        </section>
        <section className="bg-white py-14">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">Trước khi liên hệ</h2>
            <div className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
              {FAQS.map(faq => <details key={faq.question} className="py-5"><summary className="cursor-pointer text-base font-semibold text-zinc-900">{faq.question}</summary><p className="mt-3 leading-relaxed text-zinc-600">{faq.answer}</p></details>)}
            </div>
            <Link href="/bao-gia/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-zinc-900 px-7 py-3 font-semibold text-white hover:bg-zinc-700">Soạn yêu cầu báo giá</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
