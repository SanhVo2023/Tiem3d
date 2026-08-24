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
      locality: "Thủ Đức",
      region: "TP. Hồ Chí Minh",
      geo: { lat: 10.8589, lng: 106.7568 },
      primary: true,
    },
    {
      id: "son-ky",
      name: "Chi nhánh Sơn Kỳ",
      shortName: "Sơn Kỳ",
      street: "36 Bờ Bao Tân Thắng",
      ward: "Phường Sơn Kỳ",
      locality: "TP. Hồ Chí Minh",
      region: "TP. Hồ Chí Minh",
      landmark: "Cạnh Aeon Mall Tân Phú",
      // TODO(owner): approximate — derived from Aeon Tân Phú (No. 30, same
      // street). Replace with the exact pin from Google Maps.
      geo: { lat: 10.8014, lng: 106.6182 },
    },
  ] satisfies Branch[] as Branch[],

  /** Districts the shop delivers to, used for local SEO and footer copy. */
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
