import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/effects/LenisProvider";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { BUSINESS, PRIMARY_BRANCH } from "@/lib/business";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Tiệm 3D | Dịch Vụ In 3D & Thiết Kế TP.HCM",
    template: "%s | Tiệm 3D",
  },
  description: `Tiệm 3D nhận in 3D và thiết kế mẫu tại TP.HCM — 2 chi nhánh Thủ Đức và Sơn Kỳ (Tân Phú). In FDM (PLA, PETG, ABS, TPU) và Resin 8K/14K/16K siêu sắc nét, thiết kế 3D theo yêu cầu, sơn hoàn thiện mô hình. Mở cửa ${BUSINESS.hours.display} cả Chủ nhật. Báo giá qua Zalo ${BUSINESS.phoneDisplay} trong 30 phút.`,
  keywords: [
    // Primary keywords
    "in 3D Thủ Đức",
    "in 3D TP HCM",
    "dịch vụ in 3D",
    "Tiệm 3D",
    // Services
    "in 3D FDM",
    "in 3D Resin",
    "in 3D Resin 8K",
    "in 3D Resin 14K",
    "in 3D Resin 16K",
    "thiết kế 3D",
    "thiết kế mẫu 3D",
    "sơn mô hình",
    "in 3D màu",
    "in 3D multicolor",
    // Location keywords - both branches
    "in 3D Tân Phú",
    "in 3D Sơn Kỳ",
    "in 3D Tân Bình",
    "in 3D Bình Thạnh",
    "in 3D Gò Vấp",
    "in 3D Sài Gòn",
    "in 3D gần đây",
    "xưởng in 3D TPHCM",
    // Competitive / long-tail
    "in 3D theo yêu cầu",
    "in 3D giá rẻ",
    "in 3D chất lượng cao",
    "in 3D nhanh",
    "in mô hình 3D",
    "làm mô hình 3D",
    "in 3D số lượng lớn",
    "in 3D tượng",
    "in 3D figure",
    "3D printing Vietnam",
    "prototype 3D",
    "mô hình 3D",
    "figure 3D",
    // Materials
    "in 3D PLA",
    "in 3D PETG",
    "in 3D nhựa",
    "in 3D TPU",
    "in 3D ABS",
  ],
  authors: [{ name: "Tiệm 3D" }],
  creator: "Tiệm 3D",
  publisher: BUSINESS.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Tiệm 3D | In 3D & Thiết Kế Chuyên Nghiệp TP.HCM",
    description:
      `In 3D FDM, Resin 8K/14K/16K siêu sắc nét tại TP.HCM. 2 chi nhánh: Thủ Đức và Sơn Kỳ (Tân Phú). Thiết kế 3D theo yêu cầu, sơn hoàn thiện mô hình. Zalo ${BUSINESS.phoneDisplay}.`,
    url: "https://tiem3d.com",
    siteName: "Tiệm 3D",
    images: [
      {
        url: "/assets/generated/hero/hero-main.png",
        width: 1200,
        height: 630,
        alt: "Tiệm 3D - Dịch vụ in 3D chuyên nghiệp tại TP.HCM",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiệm 3D | In 3D & Thiết Kế TP.HCM",
    description:
      `In 3D FDM, Resin 8K/14K/16K tại TP.HCM — Thủ Đức & Tân Phú. Thiết kế 3D, sơn mô hình. Zalo ${BUSINESS.phoneDisplay}`,
    images: ["/assets/generated/hero/hero-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tiem3d.com",
  },
  category: "3D Printing Service",
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
  },
  other: {
    "geo.region": "VN-SG",
    "geo.placename": `${PRIMARY_BRANCH.locality}, ${PRIMARY_BRANCH.region}`,
    "geo.position": `${PRIMARY_BRANCH.geo.lat};${PRIMARY_BRANCH.geo.lng}`,
    ICBM: `${PRIMARY_BRANCH.geo.lat}, ${PRIMARY_BRANCH.geo.lng}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Organization + WebSite + one LocalBusiness per branch */}
        <SiteJsonLd />
      </head>
      <body
        className={`${openSans.variable} ${jetbrainsMono.variable} antialiased bg-white text-zinc-950 font-sans`}
      >
        <LenisProvider>
          {/* Subtle noise overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
