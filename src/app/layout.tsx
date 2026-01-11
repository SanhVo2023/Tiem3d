import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/effects/LenisProvider";
import { LocalBusinessJsonLd, OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

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
  metadataBase: new URL("https://tiem3d.com"),
  title: {
    default: "Tiệm 3D | Dịch Vụ In 3D & Thiết Kế Thủ Đức, TP.HCM",
    template: "%s | Tiệm 3D - In 3D Thủ Đức",
  },
  description:
    "Tiệm 3D chuyên cung cấp giải pháp in 3D và thiết kế chuyên nghiệp tại Thủ Đức, TP.HCM. In FDM (PLA, PETG) và Resin 8K/14K/16K siêu sắc nét. Thiết kế 3D, sơn hoàn thiện mô hình. Báo giá nhanh qua Zalo: 0777 863 808.",
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
    // Location keywords
    "in 3D Quận 9",
    "in 3D Quận 2",
    "in 3D Bình Thạnh",
    "in 3D Sài Gòn",
    // Competitive keywords (from in3dplus analysis)
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
  publisher: "Tiệm 3D - Dịch Vụ In 3D & Thiết Kế Thủ Đức",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Tiệm 3D | Dịch Vụ In 3D & Thiết Kế Chuyên Nghiệp Thủ Đức",
    description:
      "In 3D FDM, Resin 8K/14K/16K siêu sắc nét tại Thủ Đức, TP.HCM. Thiết kế 3D theo yêu cầu, sơn hoàn thiện mô hình. Liên hệ Zalo: 0777 863 808.",
    url: "https://tiem3d.com",
    siteName: "Tiệm 3D",
    images: [
      {
        url: "/assets/generated/hero/hero-main.png",
        width: 1200,
        height: 630,
        alt: "Tiệm 3D - Dịch vụ in 3D chuyên nghiệp Thủ Đức, TP.HCM",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiệm 3D | In 3D & Thiết Kế Thủ Đức",
    description:
      "In 3D FDM, Resin 8K/14K/16K tại Thủ Đức. Thiết kế 3D, sơn mô hình. Zalo: 0777 863 808",
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
    "geo.placename": "Thủ Đức, Hồ Chí Minh",
    "geo.position": "10.8589;106.7568",
    "ICBM": "10.8589, 106.7568",
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
        {/* Structured Data for SEO */}
        <LocalBusinessJsonLd />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
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
