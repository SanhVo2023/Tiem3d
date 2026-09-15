import type { Metadata } from "next";
import { Be_Vietnam_Pro, Open_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { cdnOrigin } from "@/lib/cdn";
import { BUSINESS } from "@/lib/business";
import { socialCard } from "@/lib/social";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  display: "swap",
});
const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const description = "In 3D FDM, Resin và thiết kế theo yêu cầu tại TP.HCM. Tư vấn từ ảnh hoặc file 3D, sơn hoàn thiện và giao hàng qua đơn vị vận chuyển. Nhận báo giá qua Zalo.";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "In 3D theo yêu cầu tại TP.HCM | Tiệm 3D",
    template: "%s | Tiệm 3D",
  },
  description,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "In 3D theo yêu cầu tại TP.HCM | Tiệm 3D",
    description,
    url: BUSINESS.url + "/",
    siteName: BUSINESS.name,
    images: [{
      url: socialCard("/assets/generated/hero/hero-main.webp"),
      width: 1200,
      height: 630,
      alt: "Mẫu sản phẩm và dịch vụ in 3D tại Tiệm 3D",
    }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "In 3D theo yêu cầu tại TP.HCM | Tiệm 3D",
    description,
    images: [socialCard("/assets/generated/hero/hero-main.webp")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: BUSINESS.url + "/",
    types: { "application/rss+xml": BUSINESS.url + "/feed.xml" },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        {cdnOrigin && <link rel="preconnect" href={cdnOrigin} />}
        <SiteJsonLd />
      </head>
      <body className={beVietnamPro.variable + " " + openSans.variable + " " + jetbrainsMono.variable + " antialiased bg-background text-foreground font-sans"}>
        {children}
      </body>
    </html>
  );
}
