import type { Metadata } from "next";
import FinishingPageContent from "./FinishingPageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Hoàn Thiện & Sơn 3D Print - Mạ Chrome, Airbrush",
  description: "Dịch vụ hoàn thiện sản phẩm in 3D chuyên nghiệp. Xử lý bề mặt, sơn airbrush, mạ chrome/vàng/đồng, weathering effects. Biến sản phẩm thô thành tác phẩm hoàn chỉnh.",
  keywords: [
    "hoàn thiện 3D print",
    "sơn 3D print",
    "sơn airbrush 3D",
    "mạ chrome 3D",
    "xử lý bề mặt 3D",
    "sanding 3D print",
    "painting 3D prints",
    "chrome plating",
    "weathering effects",
    "post processing 3D",
    "finishing 3D prints",
    "sơn cosplay props",
    "sơn mô hình Thủ Đức",
    "sơn 3D print TP HCM",
    "hoàn thiện mô hình",
    "sơn figure 3D",
  ],
  openGraph: {
    title: "Hoàn Thiện & Sơn 3D Print - Mạ Chrome, Airbrush | Tiệm 3D",
    description: "Xử lý bề mặt, sơn airbrush chuyên nghiệp, mạ chrome/vàng/đồng. Biến sản phẩm in 3D thô thành tác phẩm hoàn chỉnh.",
    url: "https://tiem3d.com/dich-vu/hoan-thien",
    images: [
      {
        url: "/assets/generated/services/service-finish-hero.png",
        width: 1200,
        height: 630,
        alt: "Hoàn Thiện 3D Print",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoàn Thiện & Sơn 3D Print - Mạ Chrome, Airbrush | Tiệm 3D",
    description: "Xử lý bề mặt, sơn airbrush, mạ chrome/vàng/đồng. Biến sản phẩm in 3D thô thành tác phẩm hoàn chỉnh.",
    images: ["/assets/generated/services/service-finish-hero.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/hoan-thien",
  },
};

export default function FinishingPage() {
  return (
    <>
      <ServiceJsonLd
        name="Hoàn Thiện & Sơn 3D Print"
        description="Dịch vụ hoàn thiện sản phẩm in 3D chuyên nghiệp. Xử lý bề mặt, sơn airbrush, mạ chrome/vàng/đồng, weathering effects để biến sản phẩm thô thành tác phẩm hoàn chỉnh."
        url="https://tiem3d.com/dich-vu/hoan-thien"
        image="https://tiem3d.com/assets/generated/services/service-finish-hero.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "Hoàn Thiện", url: "https://tiem3d.com/dich-vu/hoan-thien" },
        ]}
      />
      <FinishingPageContent />
    </>
  );
}
