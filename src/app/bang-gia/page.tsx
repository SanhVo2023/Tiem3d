import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import {
  PRICE_TABLES,
  PRICE_MODIFIERS,
  PRICE_EXAMPLES,
  PRICE_SAVING_TIPS,
  PRICE_DISCLAIMER,
  MATERIAL_FLOOR,
  LAST_UPDATED,
} from "@/data/pricing";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

const TITLE = "Bảng giá in 3D";
const DESCRIPTION =
  "Bảng giá in 3D tham khảo tại TP.HCM: FDM từ 2.000đ/gram, Resin 8K từ 8.000đ/gram, thiết kế 3D từ 200.000đ. Kèm cách tính giá, những yếu tố làm giá đội lên và 5 cách để rẻ hơn.";

const FAQS = [
  {
    question: "Giá in 3D được tính như thế nào?",
    answer:
      "Giá dựa trên khối lượng nhựa thực tế của sản phẩm, cộng thời gian máy chạy và công hoàn thiện. Vì vậy hai món cùng kích thước nhưng khác độ đặc hoặc khác vật liệu sẽ có giá khác nhau.",
  },
  {
    question: "Tại sao báo giá lại cao hơn tôi nghĩ?",
    answer:
      "Ba lý do phổ biến: mô hình cần nhiều support (+20–30%), có chi tiết nhỏ khó in (+30–50%), hoặc phải chia nhiều phần rồi ghép lại. Gửi file qua Zalo, chúng tôi chỉ ra chỗ nào đang làm giá đội lên và cách giảm.",
  },
  {
    question: "In số lượng lớn có rẻ hơn không?",
    answer:
      "Có. Từ khoảng 20 bản trở lên, giá mỗi bản giảm đáng kể vì chia sẻ được thời gian set-up và chạy máy — mức giảm có thể tới 40% tùy sản phẩm.",
  },
  {
    question: "Tôi chưa có file 3D thì tính giá sao?",
    answer:
      "Chúng tôi dựng mẫu từ ảnh, bản vẽ tay hoặc mô tả, phí thiết kế từ 200.000đ tùy độ phức tạp. Phí này tách riêng khỏi phí in và được báo trước khi bắt đầu.",
  },
  {
    question: "Giá đã bao gồm sơn hoàn thiện chưa?",
    answer:
      "Chưa. Giá theo gram là giá sản phẩm in ra, đã xử lý cơ bản. Sơn hoàn thiện tính riêng, khoảng 100.000–500.000đ mỗi sản phẩm tùy kích thước và độ chi tiết.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "bảng giá in 3D",
    "giá in 3D",
    "in 3D bao nhiêu tiền",
    "giá in 3D TPHCM",
    "in 3d 1 gram bao nhiêu tiền",
    "chi phí in 3D",
  ],
  alternates: { canonical: `${BUSINESS.url}/bang-gia/` },
  openGraph: {
    type: "website",
    title: `${TITLE} | Tiệm 3D`,
    description: DESCRIPTION,
    url: `${BUSINESS.url}/bang-gia/`,
    siteName: BUSINESS.name,
    locale: "vi_VN",
    images: [
      {
        url: "/assets/generated/services/service-fdm-materials.png",
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
    images: ["/assets/generated/services/service-fdm-materials.png"],
  },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Bảng giá", url: `${BUSINESS.url}/bang-gia/` },
        ]}
      />
      <FAQJsonLd faqs={FAQS} />

      <Header />

      <main className="min-h-screen bg-white pt-16">
        {/* Hero — answer first, with a number */}
        <section className="border-b border-zinc-200 bg-zinc-50">
          <div className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-600">
              Bảng giá · cập nhật {LAST_UPDATED}
            </p>
            <h1 className="mt-4 text-display text-4xl text-zinc-900 md:text-6xl">
              In 3D hết bao nhiêu tiền?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700">
              Giá in 3D tại TP.HCM dao động{" "}
              <strong className="font-mono text-zinc-900">2.000đ/gram</strong> với
              FDM đến{" "}
              <strong className="font-mono text-zinc-900">18.000đ/gram</strong> với
              Resin 16K, tính theo khối lượng nhựa cộng thời gian máy chạy. Một giá
              đỡ điện thoại rơi vào khoảng 80–150k, một figure 15cm khoảng 600–900k.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BUSINESS.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#0068ff] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0057d4]"
              >
                Gửi file, nhận giá trong 30 phút
              </a>
              <Link
                href="/bao-gia/"
                className="rounded-full border border-zinc-300 px-7 py-3 text-sm font-bold text-zinc-900 transition-colors hover:border-zinc-900"
              >
                Gửi yêu cầu báo giá
              </Link>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-4xl px-6 py-16">
          {/* How pricing works */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              Giá được tính thế nào
            </h2>
            <div className="mt-5 rounded-2xl bg-zinc-900 p-6 font-mono text-sm leading-relaxed text-zinc-100 md:text-base">
              khối lượng nhựa × đơn giá vật liệu
              <br />
              <span className="text-orange-400">+</span> thời gian máy chạy
              <br />
              <span className="text-orange-400">+</span> công hoàn thiện
              <br />
              <span className="text-zinc-500">
                ────────────────────────
              </span>
              <br />= giá thành phẩm
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Bảng dưới đây là <strong>giá thành phẩm</strong> — tức là giá bạn trả
              cho món đồ cầm trên tay. Nếu chỉ tính riêng nhựa thô thì rẻ hơn nhiều
              ({MATERIAL_FLOOR}), nhưng con số đó không phản ánh chi phí thật của
              một đơn hàng.
            </p>
          </section>

          {/* Price tables */}
          {PRICE_TABLES.map((table) => (
            <section key={table.id} className="mt-14">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-bold text-zinc-900">{table.title}</h2>
                <span className="font-mono text-xs text-zinc-500">{table.unit}</span>
              </div>

              {table.intro && (
                <p className="mb-4 text-sm leading-relaxed text-zinc-600">
                  {table.intro}
                </p>
              )}

              <div className="overflow-x-auto rounded-xl border border-zinc-200">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-50 text-left">
                      <th className="px-4 py-3 font-semibold text-zinc-900">Loại</th>
                      <th className="px-4 py-3 font-semibold text-zinc-900">
                        Đặc điểm
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-zinc-900">
                        Giá
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-zinc-900">
                        Thời gian
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row) => (
                      <tr key={row.name} className="border-t border-zinc-100 align-top">
                        <td className="px-4 py-3 font-medium text-zinc-900">
                          {row.name}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          {row.detail}
                          {row.note && (
                            <span className="mt-1 block text-xs text-zinc-500">
                              {row.note}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-mono font-medium text-zinc-900">
                          {row.price}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-zinc-500">
                          {row.lead || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {table.service && (
                <Link
                  href={table.service}
                  className="mt-3 inline-flex text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  Xem chi tiết dịch vụ →
                </Link>
              )}
            </section>
          ))}

          {/* CTA #1 — placed right after the tables, where intent peaks */}
          <aside className="mt-14 rounded-2xl bg-zinc-900 p-7 text-white md:p-9">
            <h2 className="text-xl font-bold md:text-2xl">
              Muốn con số chính xác cho món của bạn?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Copy đoạn dưới, dán vào Zalo kèm ảnh hoặc file — chúng tôi báo giá
              trong 30 phút.
            </p>
            <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl bg-zinc-800/80 p-4 font-mono text-[13px] leading-relaxed text-zinc-200">
{`Chào Tiệm 3D, em cần in 3D [tên món]
Kích thước mong muốn: ___ cm
Số lượng: ___
Cần trước ngày: ___`}
            </pre>
            <a
              href={BUSINESS.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[#0068ff] px-7 py-3 text-sm font-bold transition-colors hover:bg-[#0057d4]"
            >
              Chat Zalo {BUSINESS.phoneDisplay}
            </a>
          </aside>

          {/* What pushes the price up */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              Điều gì làm giá đội lên
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <tbody>
                  {PRICE_MODIFIERS.map((row) => (
                    <tr key={row.name} className="border-b border-zinc-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-zinc-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{row.detail}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-mono font-medium text-orange-600">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How to pay less */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              5 cách để rẻ hơn
            </h2>
            <ol className="mt-5 space-y-4">
              {PRICE_SAVING_TIPS.map((tip, index) => (
                <li key={tip.title} className="flex gap-4">
                  <span className="font-mono text-sm font-bold text-orange-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-zinc-900">{tip.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {tip.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Worked examples */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              Ví dụ thực tế
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-50 text-left">
                    <th className="px-4 py-3 font-semibold text-zinc-900">
                      Sản phẩm
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-900">
                      Công nghệ
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-900">
                      Kích thước
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-zinc-900">
                      Giá ước tính (VNĐ)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_EXAMPLES.map((row) => (
                    <tr key={row.product} className="border-t border-zinc-100">
                      <td className="px-4 py-3 font-medium text-zinc-900">
                        {row.product}
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{row.tech}</td>
                      <td className="px-4 py-3 font-mono text-zinc-600">
                        {row.size}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-mono font-medium text-zinc-900">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs italic leading-relaxed text-zinc-500">
              {PRICE_DISCLAIMER}
            </p>
            <Link
              href="/portfolio/"
              className="mt-3 inline-flex text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Xem các dự án đã làm →
            </Link>
          </section>

          {/* FAQ */}
          <section className="mt-14">
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
          </section>
        </div>

        {/* CTA #2 */}
        <section className="bg-zinc-900 py-16 text-white md:py-20">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-display text-3xl md:text-4xl">
              Gửi file, nhận giá trong 30 phút
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Chưa có file cũng không sao — một tấm ảnh chụp vội là đủ để bắt đầu.
              Mở cửa {BUSINESS.hours.display}, {BUSINESS.hours.note.toLowerCase()}.
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
                href="/dich-vu/"
                className="rounded-full border border-zinc-700 px-7 py-3 text-sm font-bold transition-colors hover:border-zinc-500"
              >
                Xem 8 dịch vụ
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
