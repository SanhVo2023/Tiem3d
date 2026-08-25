/**
 * Single source of truth for every piece of contact and business identity data.
 *
 * Before this existed the phone number was a hardcoded literal in 7 components
 * and 8 blog posts, and the street address lived in 3 places that had already
 * drifted apart. Anything that renders a phone number, a Zalo link, an address
 * or opening hours must read it from here.
 */

export interface Branch {
  id: string;
  /** Full label used in nav and headings, e.g. "Chi nhánh Thủ Đức". */
  name: string;
  /** Bare place name for tight spaces, e.g. "Thủ Đức". */
  shortName: string;
  /** Street line, without the city. */
  street: string;
  ward: string;
  locality: string;
  region: string;
  /** A nearby landmark — how people in Vietnam actually navigate. */
  landmark?: string;
  /**
   * The district name people actually say and search for, which is not always
   * the current administrative one. TP.HCM dissolved its quận on 1 July 2025
   * (Nghị quyết 1685/NQ-UBTVQH15) and folded them into wards, but nobody asks
   * for "phường Tây Thạnh" — they ask for Tân Phú.
   */
  district: string;
  /**
   * Other names for this location: the pre-2025 ward, the new ward(s), the
   * landmark. Kept so a search for either the old or the new name finds us.
   */
  aliases: string[];
  geo: { lat: number; lng: number };
  /** The first branch is treated as the primary for single-value SEO fields. */
  primary?: boolean;
}

const PHONE_DIGITS = "0384844730";

export const BUSINESS = {
  name: "Tiệm 3D",
  legalName: "Tiệm 3D — Dịch Vụ In 3D & Thiết Kế",
  tagline: "Từ bản vẽ đến sản phẩm thực",
  url: "https://tiem3d.com",

  /** Raw digits — use for tel: hrefs and Zalo deep links. */
  phone: PHONE_DIGITS,
  /** Grouped for display: 0384 844 730 */
  phoneDisplay: PHONE_DIGITS.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3"),
  /** E.164, required by schema.org `telephone`. */
  phoneE164: `+84${PHONE_DIGITS.slice(1)}`,
  tel: `tel:${PHONE_DIGITS}`,
  zalo: `https://zalo.me/${PHONE_DIGITS}`,

  email: "contact@tiem3d.com",

  hours: {
    /** schema.org openingHours format. */
    spec: "Mo-Su 08:00-22:00",
    opens: "08:00",
    closes: "22:00",
    display: "8:00 – 22:00",
    days: "Thứ 2 – Chủ nhật",
    note: "Mở cửa cả Chủ nhật",
  },

  branches: [
    {
      id: "thu-duc",
      name: "Chi nhánh Thủ Đức",
      shortName: "Thủ Đức",
      street: "61 Đường Số 1, Khu Phố 2",
      ward: "Phường Linh Tây",
      district: "Thủ Đức",
      locality: "Thủ Đức",
      region: "TP. Hồ Chí Minh",
      aliases: [
        "Thành phố Thủ Đức",
        "Quận Thủ Đức",
        "Phường Linh Tây",
        "Linh Tây",
      ],
      geo: { lat: 10.8589, lng: 106.7568 },
      primary: true,
    },
    {
      // Named Tân Phú, not Sơn Kỳ. Sơn Kỳ is the ward on the paperwork; Tân
      // Phú is the district everyone actually says, searches and navigates by.
      id: "tan-phu",
      name: "Chi nhánh Tân Phú",
      shortName: "Tân Phú",
      street: "36 Bờ Bao Tân Thắng",
      ward: "Phường Sơn Kỳ",
      district: "Tân Phú",
      locality: "TP. Hồ Chí Minh",
      region: "TP. Hồ Chí Minh",
      // Quận Tân Phú was dissolved on 1 July 2025 and old phường Sơn Kỳ was
      // split between Tây Thạnh, Tân Sơn Nhì and Phú Thọ Hòa. Which one No. 36
      // now sits in is not something to guess at, so all three are carried as
      // aliases rather than asserted as the address.
      // TODO(owner): confirm the new ward on the shop's papers and promote it.
      aliases: [
        "Quận Tân Phú",
        "Phường Sơn Kỳ",
        "Phường Tây Thạnh",
        "Phường Tân Sơn Nhì",
        "Phường Phú Thọ Hòa",
        "Aeon Mall Tân Phú",
        "Celadon City",
      ],
      landmark: "Cạnh Aeon Mall Tân Phú",
      // Anchored on the surveyed position of Aeon Mall Tân Phú Celadon, which
      // is No. 30 on this street, and stepped east along the same side to No.
      // 36. Accurate to roughly a shopfront; swap in the exact Google Maps pin
      // if the branch is ever verified on Google Business Profile.
      geo: { lat: 10.80141, lng: 106.61782 },
    },
  ] satisfies Branch[] as Branch[],

  /**
   * Areas the shop delivers to, used for local SEO and footer copy.
   *
   * These are the pre-July-2025 quận names. TP.HCM dissolved its districts into
   * wards on 1 July 2025 (Nghị quyết 1685/NQ-UBTVQH15), but customers still say
   * and search the old names, and will for years — so the old names lead here
   * and the new ward names ride along in each branch's `aliases`.
   */
  serviceAreas: [
    "Thủ Đức",
    "Tân Phú",
    "Tân Bình",
    "Bình Thạnh",
    "Gò Vấp",
    "Bình Tân",
    "TP. Hồ Chí Minh",
  ],
} as const;

/** The branch used wherever only one location can be expressed (geo meta tags). */
export const PRIMARY_BRANCH: Branch =
  BUSINESS.branches.find((b) => b.primary) ?? BUSINESS.branches[0];

/** "61 Đường Số 1, Khu Phố 2, Phường Linh Tây, Thủ Đức, TP. Hồ Chí Minh" */
export function formatAddress(branch: Branch): string {
  return [branch.street, branch.ward, branch.locality, branch.region]
    .filter((part, i, arr) => part && arr.indexOf(part) === i)
    .join(", ");
}

/** Short form for tight spaces: "61 Đường Số 1, P. Linh Tây" */
export function formatAddressShort(branch: Branch): string {
  return `${branch.street}, ${branch.ward.replace(/^Phường /, "P. ")}`;
}

/** Opens the branch on Google Maps by address search. */
export function mapsUrl(branch: Branch): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${formatAddress(branch)}, Việt Nam`
  )}`;
}
