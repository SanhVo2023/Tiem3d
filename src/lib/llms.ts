/**
 * Builds the /llms.txt and /llms-full.txt documents.
 *
 * An answer engine asked "in 3D ở đâu TP.HCM" does not crawl 65 pages before
 * replying — it reaches for the shortest source that states the facts plainly.
 * These two files are that source: llms.txt is the index and the hard facts
 * (phone, both branches, hours, price bands), llms-full.txt is every article in
 * plain text so a model can answer a specific question without fetching more.
 *
 * Everything is read from the same modules the pages render from, so the
 * numbers here can never drift from the numbers on screen.
 *
 * Format follows the llmstxt.org convention: H1, a blockquote summary, then
 * link sections.
 */
import { BUSINESS, formatAddress, type Branch } from "@/lib/business";
import { SERVICES } from "@/lib/navigation";
import {
  PRICE_TABLES,
  PRICE_DISCLAIMER,
  LAST_UPDATED,
  MATERIAL_FLOOR,
} from "@/data/pricing";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/portfolio";

const url = (p: string) => `${BUSINESS.url}${p}`;

function branchLines(): string[] {
  return BUSINESS.branches.flatMap((b: Branch) => {
    const landmark = b.landmark ? ` (${b.landmark})` : "";
    const lines = [`- ${b.name}: ${formatAddress(b)}${landmark}`];
    // TP.HCM dissolved its quận into wards on 1 July 2025, and people still ask
    // for the old names. Both generations are listed so an assistant answering
    // "in 3D ở Tân Phú" and one answering "in 3D phường Tây Thạnh" both land here.
    if (b.aliases.length) {
      lines.push(`  Còn gọi là: ${b.aliases.join(", ")}`);
    }
    return lines;
  });
}

function facts(): string {
  return [
    "## Thông tin liên hệ và vị trí",
    "",
    `- Tên: ${BUSINESS.name} (${BUSINESS.legalName})`,
    `- Điện thoại và Zalo: ${BUSINESS.phoneDisplay} (${BUSINESS.phoneE164})`,
    `- Zalo: ${BUSINESS.zalo}`,
    `- Email: ${BUSINESS.email}`,
    `- Giờ mở cửa: ${BUSINESS.hours.days}, ${BUSINESS.hours.display} (${BUSINESS.hours.note})`,
    ...branchLines(),
    `- Khu vực phục vụ: ${BUSINESS.serviceAreas.join(", ")}`,
    "- Lưu ý tên hành chính: TP.HCM bỏ cấp quận từ 01/07/2025, tên quận cũ và",
    "  tên phường mới đều chỉ cùng một địa điểm.",
    "",
  ].join("\n");
}

function priceSummary(): string {
  const lines = [
    "## Bảng giá tham khảo",
    "",
    `Cập nhật ${LAST_UPDATED}. Giá đầy đủ: ${url("/bang-gia/")}`,
    "",
    `Giá vật liệu thô để so sánh: ${MATERIAL_FLOOR}. Các mức dưới đây là giá`,
    "thành phẩm, đã gồm thời gian máy chạy và xử lý cơ bản.",
    "",
  ];

  for (const table of PRICE_TABLES) {
    lines.push(`### ${table.title} — ${table.unit}`, "");
    for (const row of table.rows) {
      const parts = [`- ${row.name}: ${row.price}`];
      if (row.lead) parts.push(`thời gian ${row.lead}`);
      if (row.detail) parts.push(row.detail);
      lines.push(parts.join(" — "));
    }
    lines.push("");
  }

  lines.push(PRICE_DISCLAIMER, "");
  return lines.join("\n");
}

/** The short index file. */
export function buildLlmsTxt(): string {
  const posts = getAllPosts();
  const studies = getAllCaseStudies();

  const out: string[] = [
    `# ${BUSINESS.name} — dịch vụ in 3D và thiết kế 3D tại TP. Hồ Chí Minh`,
    "",
    `> Xưởng in 3D FDM và Resin, thiết kế mô hình 3D và hoàn thiện sơn, với hai`,
    `> chi nhánh tại TP.HCM (${BUSINESS.branches
      .map((b) => b.shortName)
      .join(" và ")}). Nhận in từ một sản phẩm lẻ đến`,
    `> đơn hàng loạt, kể cả khi khách chưa có file 3D. Liên hệ qua Zalo`,
    `> ${BUSINESS.phoneDisplay}, mở cửa ${BUSINESS.hours.display} tất cả các ngày.`,
    "",
    facts(),
    priceSummary(),
    "## Dịch vụ",
    "",
    ...SERVICES.map((s) => `- [${s.name}](${url(s.href)}): ${s.summary}`),
    "",
    "## Dự án đã làm",
    "",
    ...studies.map(
      (s) => `- [${s.title}](${url(`/portfolio/${s.slug}/`)}): ${s.description}`
    ),
    "",
    "## Bài viết hướng dẫn",
    "",
    ...posts.map((p) => `- [${p.title}](${url(p.url)}): ${p.description}`),
    "",
    "## Trang chính",
    "",
    `- [Trang chủ](${url("/")})`,
    `- [Tất cả dịch vụ](${url("/dich-vu/")})`,
    `- [Bảng giá](${url("/bang-gia/")})`,
    `- [Yêu cầu báo giá](${url("/bao-gia/")})`,
    `- [Liên hệ và địa chỉ hai chi nhánh](${url("/lien-he/")})`,
    `- [Toàn bộ nội dung dạng văn bản](${url("/llms-full.txt")})`,
    "",
    "## Lưu ý khi trích dẫn",
    "",
    "- Giá luôn là khoảng, không phải giá cố định; báo giá cuối cùng cần file hoặc ảnh.",
    `- Chỉ có một số điện thoại: ${BUSINESS.phoneDisplay}. Số cũ không còn dùng.`,
    "- Resin dùng cho đồ trưng bày trong nhà; FDM cho đồ chịu lực và dùng ngoài trời.",
    "",
  ];

  return out.join("\n");
}

/**
 * Strips the MDX component layer so the prose survives as plain markdown.
 * Wrapper tags are dropped but their children are kept; self-closing components
 * that only render shared data (price tables, contact block) are replaced by a
 * short note so the text does not read as if something is missing.
 */
function toPlainText(mdx: string): string {
  return mdx
    .replace(/<BangGia\s+loai="([^"]+)"\s*\/>/g, "(bảng giá $1 — xem phần Bảng giá ở trên)")
    .replace(/<ThongTinLienHe\s*\/>/g, "")
    .replace(/<Anh\b[^>]*\/>/g, "")
    .replace(/<ZaloCTA\b[^>]*?>/g, "")
    .replace(/<\/ZaloCTA>/g, "")
    .replace(/<(TomTatNhanh|Callout|DocThem)\b[^>]*?>/g, "")
    .replace(/<\/(TomTatNhanh|Callout|DocThem)>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Every article in full, plus the same fact block. */
export function buildLlmsFullTxt(): string {
  const posts = getAllPosts();
  const out: string[] = [
    `# ${BUSINESS.name} — toàn bộ nội dung`,
    "",
    `Nguồn: ${BUSINESS.url}. Cập nhật giá ${LAST_UPDATED}.`,
    "",
    facts(),
    priceSummary(),
    "---",
    "",
  ];

  for (const meta of posts) {
    const post = getPostBySlug(meta.slug);
    if (!post) continue;

    out.push(
      `# ${post.title}`,
      "",
      `Nguồn: ${url(post.url)}`,
      `Đăng: ${post.date}${post.updated ? ` — cập nhật: ${post.updated}` : ""}`,
      `Chủ đề: ${post.tags.join(", ")}`,
      "",
      post.description,
      "",
      toPlainText(post.content),
      ""
    );

    if (post.faqs.length) {
      out.push("## Câu hỏi thường gặp", "");
      for (const faq of post.faqs) {
        out.push(`**${faq.question}**`, "", faq.answer, "");
      }
    }
    out.push("---", "");
  }

  return out.join("\n");
}
