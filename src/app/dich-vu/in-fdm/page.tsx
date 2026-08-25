import type { Metadata } from "next";
import FDMPageContent from "./FDMPageContent";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { socialCard } from "@/lib/social";

export const metadata: Metadata = {
  title: "In FDM - Dịch vụ in 3D sợi bền, tiết kiệm",
  description:
    "Dịch vụ in 3D FDM chuyên nghiệp với PLA, PETG, ABS, TPU. Giá thành phẩm từ 2.000đ/gram, layer 0.1mm. Phù hợp cho prototype, chi tiết cơ khí, sản phẩm chịu lực.",
  keywords: [
    "in FDM",
    "in 3D FDM",
    "in 3D sợi",
    "PLA",
    "PETG",
    "ABS",
    "TPU",
    "in 3D giá rẻ",
    "prototype",
    "in FDM Thủ Đức",
    "in 3D FDM TP HCM",
    "in 3D theo yêu cầu",
    "in 3D chịu lực",
    "in chi tiết cơ khí",
  ],
  openGraph: {
    title: "In FDM - Siêu bền, siêu tiết kiệm | Tiệm 3D",
    description:
      "Công nghệ in 3D FDM phổ biến nhất. Giá thành phẩm từ 2.000đ/gram, phù hợp cho prototype và chi tiết cơ khí.",
    url: "https://tiem3d.com/dich-vu/in-fdm",
    images: [
      {
        url: socialCard("/assets/generated/services/service-fdm-hero.webp"),
        width: 1200,
        height: 630,
        alt: "Dịch vụ in FDM - Tiệm 3D",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "In FDM - Dịch vụ in 3D sợi bền, tiết kiệm",
    description: "In 3D FDM với PLA, PETG, ABS, TPU. Giá thành phẩm từ 2.000đ/gram.",
    images: [socialCard("/assets/generated/services/service-fdm-hero.webp")],
  },
  alternates: {
    canonical: "https://tiem3d.com/dich-vu/in-fdm",
  },
};

export default function FDMServicePage() {
  return (
    <>
      <ServiceJsonLd
        name="Dịch vụ in 3D FDM"
        description="Dịch vụ in 3D FDM chuyên nghiệp với PLA, PETG, ABS, TPU. Giá thành phẩm từ 2.000đ/gram, layer 0.1mm, giao hàng toàn quốc."
        url="https://tiem3d.com/dich-vu/in-fdm"
        image="https://tiem3d.com/assets/generated/services/service-fdm-hero.webp"
        priceRange="2.000đ - 5.000đ/gram"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Dịch vụ", url: "https://tiem3d.com/dich-vu" },
          { name: "In FDM", url: "https://tiem3d.com/dich-vu/in-fdm" },
        ]}
      />
      <FDMPageContent />
    </>
  );
}
