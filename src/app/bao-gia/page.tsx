import type { Metadata } from "next";
import QuotePageContent from "./QuotePageContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Báo giá in 3D - Nhận báo giá trong 30 phút",
  description:
    "Gửi file 3D và nhận báo giá chi tiết trong 30 phút. Hỗ trợ STL, OBJ, STEP, 3MF. Tư vấn vật liệu và công nghệ phù hợp miễn phí.",
  keywords: [
    "báo giá in 3D",
    "upload file 3D",
    "STL",
    "OBJ",
    "STEP",
    "3MF",
    "in 3D giá rẻ",
    "báo giá nhanh",
  ],
  openGraph: {
    title: "Báo giá in 3D - Nhận báo giá trong 30 phút | Cái Tiệm In 3D",
    description:
      "Gửi file 3D và nhận báo giá chi tiết trong 30 phút. Tư vấn vật liệu miễn phí.",
    url: "https://tiem3d.com/bao-gia",
    images: [
      {
        url: "/assets/generated/hero/hero-main.png",
        width: 1200,
        height: 630,
        alt: "Báo giá in 3D - Cái Tiệm In 3D",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Báo giá in 3D - Nhận báo giá trong 30 phút",
    description: "Gửi file 3D và nhận báo giá chi tiết trong 30 phút.",
    images: ["/assets/generated/hero/hero-main.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/bao-gia",
  },
};

export default function QuotePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Báo giá", url: "https://tiem3d.com/bao-gia" },
        ]}
      />
      <QuotePageContent />
    </>
  );
}
