import type { Metadata } from "next";
import NotFoundContent from "./NotFoundContent";

// A 404 must not be indexable. This page previously inherited the root layout's
// metadata, so out/404.html shipped the homepage title, index,follow, and a
// canonical pointing at "/".
export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  description: "Trang bạn tìm không tồn tại hoặc đã được chuyển sang địa chỉ khác.",
  robots: { index: false, follow: true },
  alternates: {},
};

export default function NotFound() {
  return <NotFoundContent />;
}
