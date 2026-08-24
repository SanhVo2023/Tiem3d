import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation } from "lucide-react";
import { BUSINESS, formatAddress, mapsUrl, type Branch } from "@/lib/business";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

const TITLE = "Liên hệ & địa chỉ";
const DESCRIPTION = `Tiệm 3D có 2 chi nhánh tại TP.HCM: Thủ Đức (61 Đường Số 1, P. Linh Tây) và Sơn Kỳ (36 Bờ Bao Tân Thắng, cạnh Aeon Mall Tân Phú). Zalo/gọi ${BUSINESS.phoneDisplay}, mở cửa ${BUSINESS.hours.display} tất cả các ngày.`;

const FAQS = [
  {
    question: "Tiệm 3D mở cửa mấy giờ?",
    answer: `Cả hai chi nhánh mở cửa ${BUSINESS.hours.display}, ${BUSINESS.hours.days} — kể cả Chủ nhật. Bạn nhắn Zalo ${BUSINESS.phoneDisplay} bất cứ lúc nào, chúng tôi trả lời trong giờ mở cửa.`,
  },
  {
    question: "Tôi có cần đến tận nơi không?",
    answer:
      "Không bắt buộc. Phần lớn khách gửi file hoặc ảnh qua Zalo, chốt mẫu rồi nhận hàng qua ship COD toàn quốc. Ghé trực tiếp phù hợp khi bạn muốn xem mẫu vật liệu thật hoặc mang món đồ cần đo đạc.",
  },
  {
    question: "Chi nhánh nào gần tôi hơn?",
    answer:
      "Chi nhánh Thủ Đức thuận tiện cho khu vực phía Đông: Thủ Đức, Bình Thạnh, Quận 1. Chi nhánh Sơn Kỳ nằm cạnh Aeon Mall Tân Phú, thuận tiện cho Tân Phú, Tân Bình, Bình Tân, Gò Vấp và Quận 11.",
  },
  {
    question: "Muốn ghé xem trực tiếp có cần hẹn trước không?",
    answer:
      "Nên nhắn Zalo trước một chút để chúng tôi chuẩn bị mẫu vật liệu và sắp xếp người tư vấn, nhất là khi bạn muốn xem một loại nhựa hoặc độ hoàn thiện cụ thể.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BUSINESS.url}/lien-he/` },
  openGraph: {
    type: "website",
    title: `${TITLE} | Tiệm 3D`,
    description: DESCRIPTION,
    url: `${BUSINESS.url}/lien-he/`,
    siteName: BUSINESS.name,
    locale: "vi_VN",
    images: [
      {
        url: "/assets/generated/workspace/workspace-overview.png",
        width: 1200,
        height: 630,
        alt: "Xưởng in 3D Tiệm 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Tiệm 3D`,
    description: DESCRIPTION,
    images: ["/assets/generated/workspace/workspace-overview.png"],
  },
};

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-7">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-zinc-900">{branch.name}</h2>
        {branch.primary && (
          <span className="rounded-full bg-orange-100 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-orange-700">
            Cơ sở chính
          </span>
        )}
      </div>

      <ul className="mt-5 flex-1 space-y-4 text-sm">
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
          <div>
            <p className="text-zinc-900">{formatAddress(branch)}</p>
            {branch.landmark && (
              <p className="mt-1 text-zinc-500">{branch.landmark}</p>
            )}
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
          <div>
            <p className="font-mono text-zinc-900">{BUSINESS.hours.display}</p>
            <p className="text-zinc-500">{BUSINESS.hours.days}</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
          <a
            href={BUSINESS.tel}
            className="font-mono text-zinc-900 transition-colors hover:text-orange-600"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </li>
      </ul>

      <a
        href={mapsUrl(branch)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900"
      >
        <Navigation className="h-4 w-4" />
        Chỉ đường trên Google Maps
      </a>
    </article>
  );
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Liên hệ", url: `${BUSINESS.url}/lien-he/` },
        ]}
      />
      <FAQJsonLd faqs={FAQS} />

      <Header />

      <main className="min-h-screen bg-white pt-16">
        <section className="border-b border-zinc-200 bg-zinc-50">
          <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-600">
              Liên hệ
            </p>
            <h1 className="mt-4 text-display text-4xl text-zinc-900 md:text-6xl">
              Hai chi nhánh tại TP.HCM
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Cách nhanh nhất là nhắn Zalo kèm ảnh hoặc file — chúng tôi báo giá
              trong 30 phút. Muốn xem mẫu vật liệu thật thì ghé chi nhánh gần bạn.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BUSINESS.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0068ff] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0057d4]"
              >
                <MessageCircle className="h-4 w-4" />
                Chat Zalo {BUSINESS.phoneDisplay}
              </a>
              <a
                href={BUSINESS.tel}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-7 py-3 text-sm font-bold text-zinc-900 transition-colors hover:border-zinc-900"
              >
                <Phone className="h-4 w-4" />
                Gọi ngay
              </a>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {BUSINESS.branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-7">
            <h2 className="text-lg font-bold text-zinc-900">Khu vực phục vụ</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Nhận đơn toàn quốc qua ship COD, giao tận nơi trong nội thành TP.HCM.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {BUSINESS.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-white px-3 py-1 text-sm text-zinc-600 ring-1 ring-zinc-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 rounded-2xl border border-zinc-200 p-7">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-orange-500" />
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  Email
                </p>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-zinc-900 transition-colors hover:text-orange-600"
                >
                  {BUSINESS.email}
                </a>
              </div>
            </div>
            <p className="max-w-md text-sm text-zinc-500">
              Email phù hợp cho đơn doanh nghiệp cần báo giá bằng văn bản. Đơn lẻ
              nên nhắn Zalo cho nhanh.
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-200 py-16">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              Câu hỏi thường gặp
            </h2>
            <div className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-zinc-900 marker:content-none">
                    {faq.question}
                    <span className="mt-1 text-orange-500 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-zinc-600">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/bao-gia/"
                className="inline-flex rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
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
