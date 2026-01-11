import type { Metadata } from "next";
import PortfolioPageContent from "./PortfolioPageContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Portfolio - Dự án in 3D đã thực hiện",
  description:
    "Khám phá các dự án in 3D của Cái Tiệm In 3D. Từ figure chi tiết Resin 8K đến chi tiết cơ khí FDM. Cosplay props, prototype, và nghệ thuật 3D.",
  keywords: [
    "portfolio in 3D",
    "dự án in 3D",
    "figure 3D",
    "Resin 8K",
    "cosplay props",
    "prototype",
    "chi tiết cơ khí",
    "nghệ thuật 3D",
  ],
  openGraph: {
    title: "Portfolio - Dự án in 3D | Cái Tiệm In 3D",
    description:
      "Khám phá các dự án in 3D đã thực hiện. Figure, cơ khí, cosplay, prototype.",
    url: "https://tiem3d.com/portfolio",
    images: [
      {
        url: "/assets/generated/portfolio/portfolio-01.png",
        width: 1200,
        height: 630,
        alt: "Portfolio in 3D - Cái Tiệm In 3D",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Dự án in 3D đã thực hiện",
    description: "Khám phá các dự án in 3D của Cái Tiệm In 3D.",
    images: ["/assets/generated/portfolio/portfolio-01.png"],
  },
  alternates: {
    canonical: "https://tiem3d.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "https://tiem3d.com" },
          { name: "Portfolio", url: "https://tiem3d.com/portfolio" },
        ]}
      />
      <PortfolioPageContent />
    </>
  );
}
