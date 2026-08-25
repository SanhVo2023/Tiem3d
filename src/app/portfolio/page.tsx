import type { Metadata } from "next";
import PortfolioPageContent from "./PortfolioPageContent";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/JsonLd";
import { BUSINESS } from "@/lib/business";
import { getAllCaseStudies, coverImage } from "@/lib/portfolio";
import { socialCard } from "@/lib/social";

const TITLE = "Portfolio — dự án in 3D đã thực hiện";
const DESCRIPTION =
  "Các dự án in 3D Tiệm 3D đã làm tại TP.HCM: tượng trang trí, figure Resin 8K, mũ cosplay, chi tiết cơ khí và linh vật thương hiệu. Mỗi dự án kể lại đầy đủ quy trình từ Zalo tới lúc giao hàng.";
// Scrapers cannot render WebP; socialCard() resolves to the JPEG cut of the
// same image that scripts/generate-social-cards.mjs writes.
const OG_IMAGE = socialCard("/assets/generated/portfolio/portfolio-01.webp");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "portfolio in 3D",
    "dự án in 3D",
    "mẫu in 3D đẹp",
    "figure Resin 8K",
    "props cosplay in 3D",
    "tượng trang trí in 3D",
    "in 3D TPHCM",
  ],
  alternates: { canonical: `${BUSINESS.url}/portfolio/` },
  openGraph: {
    type: "website",
    title: `${TITLE} | Tiệm 3D`,
    description: DESCRIPTION,
    url: `${BUSINESS.url}/portfolio/`,
    siteName: BUSINESS.name,
    locale: "vi_VN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Tiệm 3D`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function PortfolioPage() {
  const studies = getAllCaseStudies();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: `${BUSINESS.url}/` },
          { name: "Portfolio", url: `${BUSINESS.url}/portfolio/` },
        ]}
      />
      <ItemListJsonLd
        name="Dự án in 3D đã thực hiện"
        items={studies.map((study) => ({
          name: study.shortTitle,
          url: `${BUSINESS.url}/portfolio/${study.slug}/`,
          image: coverImage(study),
        }))}
      />
      <PortfolioPageContent />
    </>
  );
}
