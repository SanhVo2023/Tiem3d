/**
 * Single source of truth for site navigation.
 *
 * This previously existed as three divergent copies — Header.tsx, Footer.tsx
 * and an inline array in page.tsx — with different labels for the same route
 * ("In kỹ thuật" vs "In chi tiết kỹ thuật"), and the footer copy was missing
 * two services entirely while pointing "In 3D màu (Multicolor)" at the batch
 * printing page.
 */

export interface ServiceLink {
  name: string;
  href: string;
  /** Short spec badge, shown in the homepage nav and the services hub. */
  tag: string;
  /** One-line description for the /dich-vu hub cards. */
  summary: string;
}

export const SERVICES: ServiceLink[] = [
  {
    name: "In FDM",
    href: "/dich-vu/in-fdm/",
    tag: "Bền",
    summary: "PLA, PETG, ABS, TPU — bền, tiết kiệm, phù hợp chi tiết chịu lực.",
  },
  {
    name: "In Resin 8K",
    href: "/dich-vu/in-resin/",
    tag: "Chi tiết",
    summary: "Độ phân giải 8K/14K/16K cho figure, trang sức và chi tiết siêu mịn.",
  },
  {
    name: "In khổ lớn",
    href: "/dich-vu/in-kho-lon/",
    tag: "500mm+",
    summary: "Mô hình kiến trúc, props cosplay và tượng trang trí kích thước thực.",
  },
  {
    name: "In chi tiết kỹ thuật",
    href: "/dich-vu/in-ky-thuat/",
    tag: "±0.1mm",
    summary: "Dung sai ±0.1mm cho chi tiết cơ khí, lắp ghép chính xác, kèm báo cáo QC.",
  },
  {
    name: "Thiết kế 3D",
    href: "/dich-vu/thiet-ke-3d/",
    tag: "CAD",
    summary: "Chưa có file cũng in được — chúng tôi dựng mẫu từ ảnh hoặc bản vẽ tay.",
  },
  {
    name: "Hoàn thiện & sơn",
    href: "/dich-vu/hoan-thien/",
    tag: "Sơn · Mạ",
    summary: "Chà nhám, sơn airbrush, mạ chrome/vàng/đồng và hiệu ứng weathering.",
  },
  {
    name: "In hàng loạt",
    href: "/dich-vu/in-hang-loat/",
    tag: "−40%",
    summary: "Print-on-Demand với dàn máy chạy liên tục, giảm tới 40% cho đơn lớn.",
  },
  {
    name: "Dự án trọn gói",
    href: "/dich-vu/du-an-tron-goi/",
    tag: "E2E",
    summary: "Từ ý tưởng tới thành phẩm: tư vấn, thiết kế, in, hoàn thiện, giao hàng.",
  },
];

export interface NavItem {
  name: string;
  href: string;
  /** Renders the services mega-menu. The href stays real so it is crawlable. */
  hasDropdown?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/dich-vu/", hasDropdown: true },
  { name: "Bảng giá", href: "/bang-gia/" },
  { name: "Portfolio", href: "/portfolio/" },
  { name: "Blog", href: "/blog/" },
  { name: "Liên hệ", href: "/lien-he/" },
];

/** Secondary links for the footer's "Liên kết" column. */
export const QUICK_LINKS: NavItem[] = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/dich-vu/" },
  { name: "Bảng giá", href: "/bang-gia/" },
  { name: "Portfolio", href: "/portfolio/" },
  { name: "Blog", href: "/blog/" },
  { name: "Báo giá", href: "/bao-gia/" },
  { name: "Liên hệ", href: "/lien-he/" },
];
