import type { Metadata } from "next";
import FullServicePageContent from "./FullServicePageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dự Án Trọn Gói 3D - Từ Ý Tưởng Đến Sản Phẩm",
  description: "Dịch vụ dự án in 3D trọn gói end-to-end. Chỉ cần ý tưởng - chúng tôi lo phần còn lại: tư vấn, thiết kế 3D, in ấn, hoàn thiện, sơn màu. 1 điểm liên hệ duy nhất.",
  keywords: [
    "dự án 3D trọn gói",
    "end to end 3D service",
    "tư vấn dự án 3D",
    "full service 3D printing",
    "dịch vụ 3D toàn diện",
    "từ ý tưởng đến sản phẩm",
    "in 3D từ A-Z",
    "turnkey 3D project",
    "complete 3D solution",
    "dự án cosplay trọn gói",
    "dự án figure trọn gói",
    "product development 3D",
    "dự án 3D Thủ Đức",
    "dự án 3D TP HCM",
    "in 3D theo yêu cầu",
    "dịch vụ in 3D trọn gói",
  ],
  openGraph: {
    title: "Dự Án Trọn Gói 3D - Từ Ý Tưởng Đến Sản Phẩm | Tiệm 3D",
    description: "Chỉ cần ý tưởng - chúng tôi lo phần còn lại. Tư vấn, thiết kế 3D, in ấn, hoàn thiện. Dịch vụ end-to-end với 1 điểm liên hệ duy nhất.",
    url: "https://tiem3d.com/dich-vu/du-an-tron-goi",
    images: [
      {
        url: "/assets/generated/workspace/workspace-overview.png",
        width: 1200,
        height: 630,
        alt: "Dự Án Trọn Gói 3D",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự Án Trọn Gói 3D - Từ Ý Tưởng Đến Sản Phẩm | Tiệm 3D",
    description: "Chỉ cần ý tưởng - chúng tôi lo phần còn lại. Tư vấn, thiết kế, in ấn, hoàn thiện.",
    images: ["/assets/generated/workspace/workspace-overview.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/du-an-tron-goi",
  },
};

export default function FullServicePage() {
  return (
    <>
      <ServiceJsonLd
        name="Dự Án Trọn Gói 3D"
        description="Dịch vụ dự án in 3D trọn gói end-to-end. Chỉ cần ý tưởng - chúng tôi lo phần còn lại: tư vấn, thiết kế 3D, in ấn, hoàn thiện, sơn màu với 1 điểm liên hệ duy nhất."
        url="https://tiem3d.com/dich-vu/du-an-tron-goi"
        image="https://tiem3d.com/assets/generated/workspace/workspace-overview.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "Dự Án Trọn Gói", url: "https://tiem3d.com/dich-vu/du-an-tron-goi" },
        ]}
      />
      <FullServicePageContent />
    </>
  );
}
