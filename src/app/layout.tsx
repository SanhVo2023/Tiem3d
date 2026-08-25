import type { Metadata } from "next";
import { Be_Vietnam_Pro, Open_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/effects/LenisProvider";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { cdnOrigin } from "@/lib/cdn";
import { BUSINESS, PRIMARY_BRANCH } from "@/lib/business";
import { socialCard } from "@/lib/social";

// Display face. Be Vietnam Pro is designed for Vietnamese, so the stacked
// diacritics in the shop's own name ("TIỆM") sit correctly at display size —
// Open Sans cramped the circumflex-plus-dot against the cap height.
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

// Body face, kept for long-form legibility.
const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// The machine voice: every measurement, spec and price on the site.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Tiệm 3D | Dịch Vụ In 3D & Thiết Kế TP.HCM",
    template: "%s | Tiệm 3D",
  },
  description: `Tiệm 3D nhận in 3D và thiết kế mẫu tại TP.HCM — 2 chi nhánh Thủ Đức và Tân Phú. In FDM (PLA, PETG, ABS, TPU) và Resin 8K/14K/16K siêu sắc nét, thiết kế 3D theo yêu cầu, sơn hoàn thiện mô hình. Mở cửa ${BUSINESS.hours.display} cả Chủ nhật. Báo giá qua Zalo ${BUSINESS.phoneDisplay} trong 30 phút.`,
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
    // Location keywords - both branches.
    // TP.HCM dissolved its quận on 1 July 2025 (NQ 1685/NQ-UBTVQH15) and folded
    // them into wards, but people still search the old district names — and will
    // for years. Both generations of name are carried so either query lands here.
    "in 3D Tân Phú",
    "in 3D quận Tân Phú",
    "in 3D Sơn Kỳ",
    "in 3D phường Sơn Kỳ",
    "in 3D Tây Thạnh",
    "in 3D Tân Sơn Nhì",
    "in 3D Phú Thọ Hòa",
    "in 3D Thủ Đức",
    "in 3D Linh Tây",
    "in 3D gần Aeon Tân Phú",
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
      `In 3D FDM, Resin 8K/14K/16K siêu sắc nét tại TP.HCM. 2 chi nhánh: Thủ Đức và Tân Phú. Thiết kế 3D theo yêu cầu, sơn hoàn thiện mô hình. Zalo ${BUSINESS.phoneDisplay}.`,
    url: `${BUSINESS.url}/`,
    siteName: "Tiệm 3D",
    images: [
      {
        url: socialCard("/assets/generated/hero/hero-main.webp"),
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
    images: [socialCard("/assets/generated/hero/hero-main.webp")],
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
    canonical: `${BUSINESS.url}/`,
    types: {
      "application/rss+xml": `${BUSINESS.url}/feed.xml`,
    },
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
        {/* Images are served from the R2 CDN, so the connection is opened
            before the first <img> is parsed rather than after. */}
        {cdnOrigin && (
          <>
            <link rel="preconnect" href={cdnOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={cdnOrigin} />
          </>
        )}
        {/* Organization + WebSite + one LocalBusiness per branch */}
        <SiteJsonLd />
      </head>
      <body
        className={`${beVietnamPro.variable} ${openSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
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
