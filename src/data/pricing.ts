/**
 * Single source of truth for every price shown on the site.
 *
 * WHY THIS EXISTS
 * Prices were previously written inline in each blog post and in service-page
 * metadata, and they had already diverged by 4x: /dich-vu/in-fdm advertised
 * "500đ - 2000đ/gram" while the pricing post quoted "2,000 - 5,000 VNĐ/gram"
 * for the same service.
 *
 * RESOLUTION: the figures below come from the owner's own pricing post
 * (content/blog/gia-in-3d-tinh-nhu-the-nao.mdx) and the per-material table in
 * the technical post, which agree with each other. Those are finished-part
 * prices — material plus machine time plus post-processing. The lone "từ
 * 500đ/gram" figure is carried separately as `MATERIAL_FLOOR` since it only
 * makes sense as a raw-filament reference.
 *
 * TODO(owner): confirm MATERIAL_FLOOR is right, and update LAST_UPDATED
 * whenever a number here changes.
 */

export const LAST_UPDATED = "08/2026";

/** Raw filament cost, before machine time and finishing. */
export const MATERIAL_FLOOR = "từ 500đ/gram";

export interface PriceRow {
  /** What is being priced. */
  name: string;
  /** Short qualifier — material grade, resolution, etc. */
  detail: string;
  /** Finished-part price, always a range. Never a point price. */
  price: string;
  /** Typical turnaround. */
  lead?: string;
  note?: string;
}

export interface PriceTable {
  id: string;
  title: string;
  /** Which service page this table belongs to. */
  service?: string;
  intro?: string;
  unit: string;
  rows: PriceRow[];
}

export const PRICE_TABLES: PriceTable[] = [
  {
    id: "fdm",
    title: "In FDM (nhựa sợi)",
    service: "/dich-vu/in-fdm/",
    unit: "VNĐ / gram thành phẩm",
    intro:
      "Giá tính theo khối lượng nhựa thực tế của sản phẩm, đã bao gồm thời gian máy chạy và xử lý cơ bản.",
    rows: [
      {
        name: "PLA",
        detail: "Phổ thông, dễ in, nhiều màu",
        price: "2.000 – 3.000",
        lead: "1 – 3 ngày",
        note: "Không dùng cho đồ để trong xe hoặc ngoài nắng",
      },
      {
        name: "PETG",
        detail: "Dai, chịu nhiệt và ẩm tốt hơn PLA",
        price: "2.500 – 3.500",
        lead: "1 – 3 ngày",
      },
      {
        name: "ABS / ASA",
        detail: "Chịu nhiệt cao, chịu va đập",
        price: "4.000 – 5.000",
        lead: "2 – 4 ngày",
        note: "ASA thêm khả năng chịu tia UV, hợp đồ ngoài trời",
      },
      {
        name: "TPU (dẻo)",
        detail: "Đàn hồi, làm gioăng và ốp chống sốc",
        price: "4.000 – 5.000",
        lead: "2 – 4 ngày",
      },
      {
        name: "Nylon / PA-CF",
        detail: "Kỹ thuật, chịu lực và mài mòn",
        price: "5.000 – 7.000",
        lead: "3 – 5 ngày",
      },
    ],
  },
  {
    id: "resin",
    title: "In Resin (độ phân giải cao)",
    service: "/dich-vu/in-resin/",
    unit: "VNĐ / gram thành phẩm",
    intro:
      "Resin cho chi tiết sắc nét hơn hẳn FDM. Sản phẩm resin thường được làm rỗng ruột nên khối lượng thực tế thấp hơn nhiều so với cảm nhận.",
    rows: [
      {
        name: "Resin 8K",
        detail: "Lớp 0,03mm — figure, mô hình trưng bày",
        price: "8.000 – 12.000",
        lead: "2 – 4 ngày",
      },
      {
        name: "Resin 14K / 16K",
        detail: "Lớp 0,02mm — trang sức, nha khoa, chi tiết siêu nhỏ",
        price: "12.000 – 18.000",
        lead: "3 – 5 ngày",
      },
    ],
  },
  {
    id: "dich-vu-them",
    title: "Dịch vụ đi kèm",
    unit: "VNĐ",
    rows: [
      {
        name: "Thiết kế / dựng mẫu 3D",
        detail: "Từ ảnh, bản vẽ tay hoặc mô tả",
        price: "từ 200.000",
        lead: "1 – 5 ngày",
        note: "Chi tiết cơ khí phức tạp báo giá riêng",
      },
      {
        name: "Sơn hoàn thiện",
        detail: "Chà nhám, phun nền, sơn màu",
        price: "100.000 – 500.000 / sản phẩm",
        lead: "2 – 5 ngày",
      },
      {
        name: "Ghép nhiều phần",
        detail: "Dán, bả matit và làm phẳng mối ghép",
        price: "+50.000 / mối ghép",
      },
    ],
  },
];

/** Multipliers that surprise customers most often — worth stating up front. */
export const PRICE_MODIFIERS: PriceRow[] = [
  {
    name: "Mô hình đơn giản",
    detail: "Ít support, khối cơ bản",
    price: "Giá cơ bản",
  },
  {
    name: "Cần nhiều support",
    detail: "Nhiều phần nhô ra, chân đế nhỏ",
    price: "+20 – 30%",
  },
  {
    name: "Chi tiết nhỏ, khó in",
    detail: "Thành mỏng, hoa văn dày đặc",
    price: "+30 – 50%",
  },
  {
    name: "Đơn số lượng lớn",
    detail: "Từ 20 bản trở lên",
    price: "giảm tới 40%",
    note: "Xem /dich-vu/in-hang-loat/",
  },
];

/** Worked examples — concrete jobs beat abstract per-gram rates. */
export const PRICE_EXAMPLES: {
  product: string;
  tech: string;
  size: string;
  price: string;
}[] = [
  {
    product: "Giá đỡ điện thoại",
    tech: "FDM",
    size: "10 cm",
    price: "80.000 – 150.000",
  },
  {
    product: "Figure anime",
    tech: "Resin 8K",
    size: "15 cm",
    price: "600.000 – 900.000",
  },
  {
    product: "Tượng trang trí có sơn",
    tech: "FDM + sơn",
    size: "30 cm",
    price: "800.000 – 1.200.000",
  },
  {
    product: "Mũ cosplay full size",
    tech: "FDM + sơn",
    size: "Đội vừa đầu",
    price: "2.000.000 – 3.500.000",
  },
];

/** Ways to bring a quote down — genuinely useful, and it converts. */
export const PRICE_SAVING_TIPS: { title: string; detail: string }[] = [
  {
    title: "Làm rỗng ruột",
    detail:
      "Với tượng và mô hình trưng bày, rỗng ruột giảm khối lượng nhựa 40–60% mà nhìn bên ngoài không khác gì.",
  },
  {
    title: "Giảm độ đặc (infill)",
    detail:
      "Đồ trang trí không chịu lực chỉ cần infill 10–15% thay vì 25% mặc định.",
  },
  {
    title: "In FDM rồi chà, thay vì Resin",
    detail:
      "Nếu sản phẩm sẽ được sơn phủ, FDM chà mịn cho kết quả gần bằng Resin với chi phí thấp hơn nhiều.",
  },
  {
    title: "Chia nhỏ và ghép",
    detail:
      "Chia khối để in nằm gọn trên bàn máy thường rẻ hơn in đứng cần nhiều support.",
  },
  {
    title: "Gộp đơn",
    detail: "In nhiều món cùng lúc chia sẻ thời gian máy và phí ship.",
  },
];

export const PRICE_DISCLAIMER = `Bảng giá tham khảo, cập nhật ${LAST_UPDATED}. Giá cuối phụ thuộc kích thước, độ phức tạp và số lượng — gửi file hoặc ảnh qua Zalo để có báo giá chính xác.`;

export function getPriceTable(id: string): PriceTable | undefined {
  return PRICE_TABLES.find((table) => table.id === id);
}
