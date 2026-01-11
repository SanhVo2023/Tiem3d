import type { Metadata } from "next";
import BatchPageContent from "./BatchPageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "In 3D Hàng Loạt - Print-on-Demand - Giảm 40%",
  description: "Dịch vụ in 3D hàng loạt với 20+ máy in chạy 24/7. Print-on-Demand (POD) giảm giá lên đến 40% cho batch lớn. Phù hợp cho sản xuất số lượng lớn, merchandise, reseller.",
  keywords: [
    "in 3D hàng loạt",
    "in 3D số lượng lớn",
    "print on demand 3D",
    "POD 3D printing",
    "in 3D giá rẻ",
    "batch 3D printing",
    "bulk 3D printing",
    "in merchandise 3D",
    "reseller 3D print",
    "print farm Vietnam",
    "in 3D discount",
    "sản xuất hàng loạt",
    "in 3D hàng loạt Thủ Đức",
    "in 3D hàng loạt TP HCM",
    "in 3D giá sỉ",
    "in 3D số lượng",
  ],
  openGraph: {
    title: "In 3D Hàng Loạt - Print-on-Demand - Giảm 40% | Tiệm 3D",
    description: "20+ máy in chạy 24/7. Discount lên đến 40% cho batch lớn. Phù hợp cho sản xuất số lượng lớn, merchandise, reseller.",
    url: "https://tiem3d.com/dich-vu/in-hang-loat",
    images: [
      {
        url: "/assets/generated/services/service-batch-hero.png",
        width: 1200,
        height: 630,
        alt: "In 3D Hàng Loạt",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "In 3D Hàng Loạt - Print-on-Demand - Giảm 40% | Tiệm 3D",
    description: "20+ máy in chạy 24/7. Discount lên đến 40% cho batch lớn. Phù hợp sản xuất số lượng lớn.",
    images: ["/assets/generated/services/service-batch-hero.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/in-hang-loat",
  },
};

export default function BatchPage() {
  return (
    <>
      <ServiceJsonLd
        name="In 3D Hàng Loạt & Print-on-Demand"
        description="Dịch vụ in 3D hàng loạt với 20+ máy in chạy 24/7. Print-on-Demand giảm giá lên đến 40% cho batch lớn. Phù hợp cho sản xuất số lượng lớn, merchandise, reseller."
        url="https://tiem3d.com/dich-vu/in-hang-loat"
        image="https://tiem3d.com/assets/generated/services/service-batch-hero.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "In Hàng Loạt", url: "https://tiem3d.com/dich-vu/in-hang-loat" },
        ]}
      />
      <BatchPageContent />
    </>
  );
}
