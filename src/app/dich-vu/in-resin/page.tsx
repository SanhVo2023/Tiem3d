import type { Metadata } from "next";
import ResinPageContent from "./ResinPageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "In 3D Resin 8K - Chi Tiết Hoàn Hảo",
  description: "Dịch vụ in 3D Resin độ phân giải 8K (28.5 micron) cho chi tiết siêu mịn. Hoàn hảo cho figure, trang sức, nha khoa, và mọi sản phẩm cần độ chính xác cao. Wash & cure chuyên nghiệp.",
  keywords: [
    "in 3D resin",
    "in resin 8K",
    "in resin độ phân giải cao",
    "in figure 3D",
    "in trang sức 3D",
    "in nha khoa 3D",
    "in miniature",
    "resin printing",
    "8K resin printer",
    "wash and cure",
    "in 3D chi tiết cao",
    "elegoo saturn",
    "phototec DLP",
    "in resin Thủ Đức",
    "in 3D resin TP HCM",
    "in figure theo yêu cầu",
    "in 3D siêu mịn",
  ],
  openGraph: {
    title: "In 3D Resin 8K - Chi Tiết Hoàn Hảo | Tiệm 3D",
    description: "Độ phân giải 8K (28.5 micron) cho chi tiết siêu mịn. Bề mặt láng không cần xử lý. Hoàn hảo cho figure, trang sức, nha khoa.",
    url: "https://tiem3d.com/dich-vu/in-resin",
    images: [
      {
        url: "/assets/generated/services/service-resin-hero.png",
        width: 1200,
        height: 630,
        alt: "In 3D Resin 8K",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "In 3D Resin 8K - Chi Tiết Hoàn Hảo | Tiệm 3D",
    description: "Độ phân giải 8K (28.5 micron) cho chi tiết siêu mịn. Hoàn hảo cho figure, trang sức, nha khoa.",
    images: ["/assets/generated/services/service-resin-hero.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/in-resin",
  },
};

export default function ResinPage() {
  return (
    <>
      <ServiceJsonLd
        name="In 3D Resin 8K"
        description="Dịch vụ in 3D Resin độ phân giải 8K (28.5 micron) cho chi tiết siêu mịn. Hoàn hảo cho figure, trang sức, nha khoa với quy trình wash & cure chuyên nghiệp."
        url="https://tiem3d.com/dich-vu/in-resin"
        image="https://tiem3d.com/assets/generated/services/service-resin-hero.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "In Resin 8K", url: "https://tiem3d.com/dich-vu/in-resin" },
        ]}
      />
      <ResinPageContent />
    </>
  );
}
