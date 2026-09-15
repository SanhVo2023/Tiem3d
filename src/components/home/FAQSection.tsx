import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { BUSINESS } from "@/lib/business";

const faqs = [
  { question: "Chưa có file 3D thì đặt in được không?", answer: "Được. Gửi ảnh, bản vẽ tay hoặc mô tả qua Zalo, kèm kích thước và mục đích sử dụng. Tiệm sẽ tư vấn phương án dựng mẫu; chi phí thiết kế được trao đổi trước khi thực hiện." },
  { question: "Giá in 3D được tính như thế nào?", answer: "Giá phụ thuộc vật liệu, kích thước, độ đặc, thời gian máy chạy và mức hoàn thiện. Bảng giá trên website là giá tham khảo; báo giá cho từng yêu cầu được xác nhận sau khi xem file hoặc ảnh." },
  { question: "Nên chọn FDM hay Resin?", answer: "FDM phù hợp chi tiết sử dụng hằng ngày, đồ gá và mẫu lớn. Resin phù hợp figure hoặc mô hình có chi tiết nhỏ, cần bề mặt mịn. Hãy cho Tiệm biết sản phẩm có chịu lực, chịu nhiệt hay chỉ dùng để trưng bày." },
  { question: "Bao lâu thì nhận được sản phẩm?", answer: "Thời gian tùy kích thước, số lượng, thiết kế và công đoạn sơn. Tiệm sẽ xác nhận lịch sản xuất trước khi nhận đơn. Thời gian vận chuyển được tính riêng theo địa chỉ giao hàng." },
  { question: "Có thể đến xưởng Tân Phú xem mẫu không?", answer: "Xưởng Tân Phú hiện nhận yêu cầu online, không tiếp khách trực tiếp. Bạn trao đổi qua Zalo và nhận sản phẩm qua đơn vị vận chuyển." },
];

export function FAQSection() {
  return (
    <section className="bg-[#f4f6f7] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="home-faq-heading">
      <FAQJsonLd faqs={faqs} />
      <div className="mx-auto max-w-3xl">
        <h2 id="home-faq-heading" className="font-display text-3xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-4xl">Trước khi bắt đầu.</h2>
        <p className="mt-4 text-zinc-600">Một vài điều bạn có thể đang muốn hỏi.</p>
        <div className="mt-8 divide-y divide-zinc-300 border-y border-zinc-300">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                {faq.question}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-6 leading-relaxed text-zinc-600">{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link href="/bang-gia/" className="inline-flex min-h-11 items-center font-semibold text-zinc-900 underline underline-offset-4">Xem bảng giá tham khảo</Link>
          <a href={BUSINESS.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-[#a83e08] underline underline-offset-4">Trao đổi qua Zalo</a>
        </p>
      </div>
    </section>
  );
}
