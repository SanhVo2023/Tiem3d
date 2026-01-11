import type { Metadata } from "next";
import DesignPageContent from "./DesignPageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Thiết Kế 3D & Modeling - Từ Ý Tưởng Đến File In",
  description: "Dịch vụ thiết kế 3D chuyên nghiệp. Không có file? Không sao - chỉ cần ý tưởng. Hỗ trợ CAD mechanical, sculpting organic, industrial design. Chỉnh sửa không giới hạn.",
  keywords: [
    "thiết kế 3D",
    "modeling 3D",
    "thiết kế CAD",
    "sculpting 3D",
    "thiết kế sản phẩm 3D",
    "vẽ 3D theo yêu cầu",
    "3D design service",
    "CAD modeling",
    "organic sculpting",
    "industrial design",
    "Blender modeling",
    "ZBrush sculpting",
    "Fusion 360 CAD",
    "thiết kế 3D Thủ Đức",
    "thiết kế 3D TP HCM",
    "vẽ mẫu 3D theo yêu cầu",
    "tạo file 3D",
  ],
  openGraph: {
    title: "Thiết Kế 3D & Modeling - Từ Ý Tưởng Đến File In | Tiệm 3D",
    description: "Không có file 3D? Không vấn đề. Chỉ cần mô tả ý tưởng - chúng tôi sẽ biến nó thành model 3D chuyên nghiệp. Chỉnh sửa không giới hạn.",
    url: "https://tiem3d.com/dich-vu/thiet-ke-3d",
    images: [
      {
        url: "/assets/generated/services/service-design-hero.png",
        width: 1200,
        height: 630,
        alt: "Thiết Kế 3D",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiết Kế 3D & Modeling - Từ Ý Tưởng Đến File In | Tiệm 3D",
    description: "Không có file 3D? Chỉ cần mô tả ý tưởng - chúng tôi sẽ biến nó thành model 3D chuyên nghiệp.",
    images: ["/assets/generated/services/service-design-hero.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/thiet-ke-3d",
  },
};

export default function DesignPage() {
  return (
    <>
      <ServiceJsonLd
        name="Thiết Kế 3D & Modeling"
        description="Dịch vụ thiết kế 3D chuyên nghiệp. Không có file? Chỉ cần ý tưởng. Hỗ trợ CAD mechanical, sculpting organic, industrial design với chỉnh sửa không giới hạn."
        url="https://tiem3d.com/dich-vu/thiet-ke-3d"
        image="https://tiem3d.com/assets/generated/services/service-design-hero.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "Thiết Kế 3D", url: "https://tiem3d.com/dich-vu/thiet-ke-3d" },
        ]}
      />
      <DesignPageContent />
    </>
  );
}
