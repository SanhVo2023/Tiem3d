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
  /** False keeps an unconfirmed current ward out of the public address. */
  currentWardConfirmed?: boolean;
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
  /** Familiar area names; these do not establish the current legal ward. */
  aliases: string[];
  geo?: { lat: number; lng: number };
  /** Whether visitors can receive service at this address. */
  customerVisits: boolean;
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
    note: "Tư vấn cả Chủ nhật",
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
      customerVisits: true,
      primary: true,
    },
    {
      // Keep the supplied street and ward until an exact updated ward is confirmed.
      id: "tan-phu",
      name: "Xưởng Tân Phú",
      shortName: "Tân Phú",
      street: "36 Bờ Bao Tân Thắng",
      ward: "Phường Sơn Kỳ",
      currentWardConfirmed: false,
      district: "Tân Phú",
      locality: "TP. Hồ Chí Minh",
      region: "TP. Hồ Chí Minh",
      aliases: [
        "Quận Tân Phú",
        "Phường Sơn Kỳ",
        "Aeon Mall Tân Phú",
        "Celadon City",
      ],
      landmark: "Cạnh Aeon Mall Tân Phú",
      // Owner confirmed: no customer visits; all deliveries use third-party couriers.
      // Do not present this workshop as a walk-in shop or publish an estimated pin.
      customerVisits: false,
    },
  ] satisfies Branch[] as Branch[],

  /**
   * Areas the shop delivers to, used for local SEO and footer copy.
   *
   * These are the pre-July-2025 quận names. TP.HCM dissolved its districts into
   * wards on 1 July 2025, but familiar area names remain useful for delivery.
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

/** The primary branch for contact components that show a single location. */
export const PRIMARY_BRANCH: Branch =
  BUSINESS.branches.find((b) => b.primary) ?? BUSINESS.branches[0];

/** "61 Đường Số 1, Khu Phố 2, Phường Linh Tây, Thủ Đức, TP. Hồ Chí Minh" */
export function formatAddress(branch: Branch): string {
  const area = branch.currentWardConfirmed === false ? `khu vực ${branch.district}` : branch.ward;
  return [branch.street, area, branch.locality, branch.region]
    .filter((part, i, arr) => part && arr.indexOf(part) === i)
    .join(", ");
}

/** Short form for tight spaces: "61 Đường Số 1, P. Linh Tây" */
export function formatAddressShort(branch: Branch): string {
  const area = branch.currentWardConfirmed === false ? `khu vực ${branch.district}` : branch.ward.replace(/^Phường /, "P. ");
  return `${branch.street}, ${area}`;
}

/** Opens the branch on Google Maps by address search. */
export function mapsUrl(branch: Branch): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${formatAddress(branch)}, Việt Nam`
  )}`;
}
