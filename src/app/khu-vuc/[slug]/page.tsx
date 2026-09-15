import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { BUSINESS, formatAddress } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";
import { Header, Footer } from "@/components/landing";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BUSINESS.branches.map(branch => ({ slug: branch.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = BUSINESS.branches.find(item => item.id === slug);
  if (!branch) return { title: "Không tìm thấy cơ sở", robots: { index: false } };
  return pageMetadata(
    `In 3D tại ${branch.shortName}, TP.HCM`,
    branch.customerVisits
      ? `Đặt in 3D tại Thủ Đức. Tư vấn FDM, Resin và thiết kế qua Zalo ${BUSINESS.phoneDisplay}. Vui lòng liên hệ trước khi đến cơ sở.`
      : `Xưởng in 3D Tân Phú nhận đơn trực tuyến, giao qua đơn vị vận chuyển. Không đón khách tại xưởng. Nhắn Zalo ${BUSINESS.phoneDisplay} để được tư vấn.`,
    `/khu-vuc/${slug}/`,
  );
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const branch = BUSINESS.branches.find(item => item.id === slug);
  if (!branch) notFound();
  const shippingOnly = !branch.customerVisits;
  const faqs = shippingOnly ? [
    { question: "Có thể đến Tân Phú xem mẫu hoặc nhận hàng không?", answer: "Không. Xưởng Tân Phú không đón khách và không có quầy nhận hàng. Tiệm trao đổi đơn qua Zalo hoặc điện thoại; tất cả đơn được giao bằng đơn vị vận chuyển bên thứ ba." },
    { question: "Tôi chưa có file 3D thì đặt thế nào?", answer: "Gửi ảnh tham khảo từ các góc, kích thước và mục đích sử dụng qua Zalo. Tiệm sẽ kiểm tra khả năng dựng mẫu và báo riêng phần thiết kế trước khi in." },
    { question: "Giao đến Tân Phú mất bao lâu?", answer: "Thời gian phụ thuộc việc thiết kế, số lượng, công nghệ in, công đoạn sơn và lịch vận chuyển. Gửi ngày cần nhận khi hỏi giá; tiệm xác nhận thời gian dự kiến và phí giao trước khi chốt đơn." },
  ] : [
    { question: "Tôi muốn mang chi tiết đến đo thì cần làm gì?", answer: "Nhắn Zalo ảnh chi tiết, số đo hiện có và vấn đề cần xử lý. Tiệm xác nhận khả năng đo, tư vấn và lịch hẹn tại Thủ Đức trước khi bạn đến." },
    { question: "Tôi ở xa có đặt hàng được không?", answer: "Có. Bạn có thể gửi file hoặc ảnh qua Zalo, trao đổi mẫu trực tuyến và nhận hàng qua đơn vị vận chuyển. Tiệm xác nhận phí giao và thời gian dự kiến khi chốt đơn." },
    { question: "Cần file gì cho chi tiết lắp ghép?", answer: "Có thể gửi STL, OBJ, 3MF để kiểm tra in hoặc STEP và bản vẽ có kích thước để trao đổi thiết kế. Ghi rõ vị trí lắp, tải trọng, môi trường sử dụng và dung sai cần đạt." },
  ];
  return (
    <>
      <Header />
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: `${BUSINESS.url}/` }, { name: "Liên hệ", url: `${BUSINESS.url}/lien-he/` }, { name: branch.name, url: `${BUSINESS.url}/khu-vuc/${slug}/` }]} />
      <FAQJsonLd faqs={faqs} />
      <main id="noi-dung" className="bg-white pt-[76px]">
        <section className="border-b border-zinc-200 bg-[#f4f6f7]">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <Link href="/lien-he/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Thông tin liên hệ</Link>
            <div className="mt-7 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
              <div>
                <p className="font-semibold text-[#a83e08]">{branch.name}</p>
                <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-zinc-900 md:text-5xl">In 3D theo yêu cầu tại {branch.shortName}.</h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">{shippingOnly ? "Đặt hàng ngay từ nhà: gửi file hoặc ảnh, trao đổi vật liệu và nhận sản phẩm qua đơn vị vận chuyển." : "Từ chi tiết thay thế đến mô hình trưng bày. Gửi yêu cầu để tiệm kiểm tra file, tư vấn vật liệu và cách hoàn thiện."}</p>
                <a href={BUSINESS.zalo} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0068ff] px-6 py-3 font-semibold text-white hover:bg-[#0057d4]"><MessageCircle aria-hidden="true" className="h-5 w-5" />Trao đổi qua Zalo</a>
              </div>
              <aside className="self-start rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-zinc-900">{shippingOnly ? "Xưởng không đón khách" : "Liên hệ trước khi đến"}</h2>
                <p className="mt-4 leading-relaxed text-zinc-600">{formatAddress(branch)}</p>
                <p className="mt-4 leading-relaxed text-zinc-700">{shippingOnly ? "Địa chỉ xưởng phục vụ sản xuất. Tiệm không tiếp khách hoặc bàn giao đơn trực tiếp tại đây." : "Vui lòng nhắn trước để tiệm xác nhận lịch, người tư vấn và mẫu vật liệu phù hợp."}</p>
                <p className="mt-5 text-sm text-zinc-600">Giờ tư vấn: {BUSINESS.hours.display} mỗi ngày</p>
                <a href={BUSINESS.tel} className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-900"><Phone aria-hidden="true" className="h-4 w-4" />{BUSINESS.phoneDisplay}</a>
              </aside>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900">{shippingOnly ? "Một yêu cầu rõ ràng, một báo giá phù hợp." : "Chuẩn bị đúng thông tin trước khi làm mẫu."}</h2>
          <ol className="mt-9 grid gap-7 md:grid-cols-3">
            {[
              ["Gửi mẫu và kích thước", shippingOnly ? "File STL, OBJ, STEP, 3MF hoặc ảnh tham khảo đều giúp bắt đầu trao đổi. Ghi rõ số lượng, kích thước và ngày cần nhận." : "Chụp chi tiết từ nhiều góc, đánh dấu vị trí lắp ghép và kích thước quan trọng. Nếu cần mang mẫu thật, hãy trao đổi lịch trước."],
              ["Chọn vật liệu và duyệt mẫu", "Tiệm tư vấn FDM hoặc Resin theo mục đích sử dụng. Xác nhận thiết kế, bề mặt, chi phí và thời gian dự kiến trước khi sản xuất."],
              ["Kiểm tra và giao hàng", "Sản phẩm được kiểm tra, đóng gói rồi chuyển qua đơn vị vận chuyển. Cung cấp địa chỉ nhận và số liên hệ để tiệm tính phí giao."],
            ].map(([title, text], index) => <li key={title} className="border-t border-zinc-300 pt-5"><span className="font-mono text-sm text-[#a83e08]">0{index + 1}</span><h3 className="mt-3 text-lg font-bold text-zinc-900">{title}</h3><p className="mt-3 leading-relaxed text-zinc-600">{text}</p></li>)}
          </ol>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2">{[["In FDM", "/dich-vu/in-fdm/"], ["In Resin", "/dich-vu/in-resin/"], ["Thiết kế 3D", "/dich-vu/thiet-ke-3d/"], ["Bảng giá tham khảo", "/bang-gia/"]].map(([name, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-900 underline underline-offset-4">{name}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>)}</div>
        </section>
        <section className="border-t border-zinc-200 bg-[#f4f6f7] py-14">
          <div className="mx-auto max-w-3xl px-6"><h2 className="text-2xl font-bold text-zinc-900">Câu hỏi khi đặt in tại {branch.shortName}</h2><div className="mt-6 divide-y divide-zinc-300">{faqs.map(faq => <details key={faq.question} className="py-5"><summary className="cursor-pointer font-semibold text-zinc-900">{faq.question}</summary><p className="mt-3 leading-relaxed text-zinc-600">{faq.answer}</p></details>)}</div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
