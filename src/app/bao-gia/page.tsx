import QuotePageContent from "./QuotePageContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BUSINESS } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Yêu cầu báo giá in 3D",
  "Soạn yêu cầu in 3D, thiết kế hoặc sơn mô hình. Xem lại nội dung, sao chép và gửi qua Zalo để Tiệm 3D tư vấn và báo giá theo mẫu.",
  "/bao-gia/",
);

export default function QuotePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: `${BUSINESS.url}/` }, { name: "Báo giá", url: `${BUSINESS.url}/bao-gia/` }]} />
      <QuotePageContent />
    </>
  );
}
