import type { Metadata } from "next";
import TechnicalPageContent from "./TechnicalPageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "In 3D Kỹ Thuật ±0.1mm - Chi Tiết Cơ Khí Chính Xác",
  description: "Dịch vụ in 3D kỹ thuật với độ chính xác ±0.1mm. Phù hợp cho chi tiết cơ khí, lắp ghép chính xác, prototype kỹ thuật. Hỗ trợ file CAD, báo cáo QC đầy đủ.",
  keywords: [
    "in 3D kỹ thuật",
    "in 3D chính xác",
    "in chi tiết cơ khí",
    "in prototype kỹ thuật",
    "in 3D tolerance",
    "in lắp ghép 3D",
    "technical 3D printing",
    "in CAD 3D",
    "in Solidworks",
    "in Fusion 360",
    "QC report 3D print",
    "in nylon carbon fiber",
    "in PETG ABS",
    "in 3D kỹ thuật Thủ Đức",
    "in 3D kỹ thuật TP HCM",
    "in prototype chính xác",
    "in 3D công nghiệp",
  ],
  openGraph: {
    title: "In 3D Kỹ Thuật ±0.1mm - Chi Tiết Cơ Khí Chính Xác | Tiệm 3D",
    description: "Độ chính xác ±0.1mm. Phù hợp cho chi tiết cơ khí, lắp ghép chính xác, prototype kỹ thuật. Hỗ trợ file CAD, báo cáo QC đầy đủ.",
    url: "https://tiem3d.com/dich-vu/in-ky-thuat",
    images: [
      {
        url: "/assets/generated/products/product-gear.png",
        width: 1200,
        height: 630,
        alt: "In 3D Kỹ Thuật",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "In 3D Kỹ Thuật ±0.1mm - Chi Tiết Cơ Khí Chính Xác | Tiệm 3D",
    description: "Độ chính xác ±0.1mm. Phù hợp cho chi tiết cơ khí, lắp ghép chính xác, prototype kỹ thuật.",
    images: ["/assets/generated/products/product-gear.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/in-ky-thuat",
  },
};

export default function TechnicalPage() {
  return (
    <>
      <ServiceJsonLd
        name="In 3D Kỹ Thuật"
        description="Dịch vụ in 3D kỹ thuật với độ chính xác ±0.1mm. Phù hợp cho chi tiết cơ khí, lắp ghép chính xác, prototype kỹ thuật. Hỗ trợ file CAD, báo cáo QC đầy đủ."
        url="https://tiem3d.com/dich-vu/in-ky-thuat"
        image="https://tiem3d.com/assets/generated/products/product-gear.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "In Kỹ Thuật", url: "https://tiem3d.com/dich-vu/in-ky-thuat" },
        ]}
      />
      <TechnicalPageContent />
    </>
  );
}
