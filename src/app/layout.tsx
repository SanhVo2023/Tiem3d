import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/effects/LenisProvider";

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
  title: "Cái tiệm in 3D | Dịch vụ thiết kế và in 3D chuyên nghiệp",
  description:
    "Dịch vụ thiết kế và in 3D chuyên nghiệp tại Việt Nam. Từ ý tưởng đến sản phẩm hoàn chỉnh. FDM, Resin 8K, POD, và hoàn thiện sản phẩm.",
  keywords: [
    "in 3D",
    "3D printing",
    "thiết kế 3D",
    "3D modeling",
    "FDM",
    "Resin",
    "prototype",
    "Vietnam",
    "Việt Nam",
  ],
  authors: [{ name: "Cái tiệm in 3D" }],
  openGraph: {
    title: "Cái tiệm in 3D | Dịch vụ thiết kế và in 3D chuyên nghiệp",
    description: "Dịch vụ thiết kế và in 3D chuyên nghiệp. Biến ý tưởng thành hiện thực.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
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
