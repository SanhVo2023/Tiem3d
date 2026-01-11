import type { Metadata } from "next";
import LargeFormatPageContent from "./LargeFormatPageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "In 3D Khổ Lớn 500mm+ - Mô Hình Kiến Trúc & Props",
  description: "Dịch vụ in 3D khổ lớn với build volume 500mm+. Hoàn hảo cho mô hình kiến trúc, props cosplay, tượng trang trí, và prototype kích thước thực. Máy in công nghiệp, lắp ráp chuyên nghiệp.",
  keywords: [
    "in 3D khổ lớn",
    "in 3D 500mm",
    "in 3D công nghiệp",
    "in mô hình kiến trúc",
    "in props cosplay",
    "in 3D kích thước lớn",
    "large format 3D printing",
    "in tượng trang trí",
    "in prototype lớn",
    "FDM khổ lớn",
    "chia nhỏ model",
    "lắp ráp 3D print",
    "in 3D khổ lớn Thủ Đức",
    "in 3D khổ lớn TP HCM",
    "in tượng 3D lớn",
    "in mô hình kích thước thực",
  ],
  openGraph: {
    title: "In 3D Khổ Lớn 500mm+ - Mô Hình Kiến Trúc & Props | Tiệm 3D",
    description: "Build volume 500mm+. Hoàn hảo cho mô hình kiến trúc, props cosplay lớn, và prototype kích thước thực. Máy in công nghiệp, lắp ráp chuyên nghiệp.",
    url: "https://tiem3d.com/dich-vu/in-kho-lon",
    images: [
      {
        url: "/assets/generated/workspace/workspace-fdm-farm.png",
        width: 1200,
        height: 630,
        alt: "In 3D Khổ Lớn",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "In 3D Khổ Lớn 500mm+ - Mô Hình Kiến Trúc & Props | Tiệm 3D",
    description: "Build volume 500mm+. Hoàn hảo cho mô hình kiến trúc, props cosplay lớn, và prototype kích thước thực.",
    images: ["/assets/generated/workspace/workspace-fdm-farm.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/in-kho-lon",
  },
};

export default function LargeFormatPage() {
  return (
    <>
      <ServiceJsonLd
        name="In 3D Khổ Lớn"
        description="Dịch vụ in 3D khổ lớn với build volume 500mm+. Hoàn hảo cho mô hình kiến trúc, props cosplay, tượng trang trí với máy in công nghiệp và lắp ráp chuyên nghiệp."
        url="https://tiem3d.com/dich-vu/in-kho-lon"
        image="https://tiem3d.com/assets/generated/workspace/workspace-fdm-farm.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "In Khổ Lớn", url: "https://tiem3d.com/dich-vu/in-kho-lon" },
        ]}
      />
      <LargeFormatPageContent />
    </>
  );
}
