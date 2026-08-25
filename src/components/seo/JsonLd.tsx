// JSON-LD structured data.
//
// All identity data comes from src/lib/business.ts — nothing here hardcodes a
// phone number or address. The site has two physical branches, so the site-wide
// graph emits one LocalBusiness node per branch with a distinct @id, linked to
// a single Organization via `department` / `parentOrganization`.

import {
  BUSINESS,
  PRIMARY_BRANCH,
  formatAddress,
  mapsUrl,
  type Branch,
} from "@/lib/business";
import { SERVICES } from "@/lib/navigation";

const ORG_ID = `${BUSINESS.url}/#organization`;
const SITE_ID = `${BUSINESS.url}/#website`;
const branchId = (branch: Branch) => `${BUSINESS.url}/#branch-${branch.id}`;

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ALL_DAYS,
  opens: BUSINESS.hours.opens,
  closes: BUSINESS.hours.closes,
};

const AREA_SERVED = BUSINESS.serviceAreas.map((area) => ({
  "@type": "City",
  name: area,
}));

// Derived from navigation.ts rather than retyped. The hardcoded copy this
// replaces had drifted: it advertised a "Multicolor Printing" service that does
// not exist as a page, and omitted two that do.
const SERVICE_CATALOG = SERVICES.map((service) => ({
  name: service.name,
  description: service.summary,
  url: `${BUSINESS.url}${service.href}`,
}));

// What the business is an authority on. Answer engines lean on this to decide
// whether a source is relevant to a question, and it costs nothing to state.
const KNOWS_ABOUT = [
  "In 3D",
  "In 3D FDM",
  "In 3D Resin",
  "Thiết kế mô hình 3D",
  "Dựng hình 3D từ ảnh",
  "Vật liệu in 3D (PLA, PETG, ABS, ASA, TPU, Nylon)",
  "Hoàn thiện và sơn mô hình in 3D",
  "In mẫu prototype",
  "Mô hình kiến trúc",
  "Phụ kiện cosplay in 3D",
];

function postalAddress(branch: Branch) {
  return {
    "@type": "PostalAddress",
    streetAddress: `${branch.street}, ${branch.ward}`,
    addressLocality: branch.locality,
    addressRegion: branch.region,
    addressCountry: "VN",
  };
}

function localBusinessNode(branch: Branch) {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": branchId(branch),
    name: `${BUSINESS.name} — ${branch.name}`,
    alternateName: BUSINESS.name,
    parentOrganization: { "@id": ORG_ID },
    url: `${BUSINESS.url}/lien-he/`,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    address: postalAddress(branch),
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.geo.lat,
      longitude: branch.geo.lng,
    },
    openingHoursSpecification: [OPENING_HOURS],
    hasMap: mapsUrl(branch),
    priceRange: "$$",
    currenciesAccepted: "VND",
    paymentAccepted: "Tiền mặt, Chuyển khoản, Momo, ZaloPay",
    knowsAbout: KNOWS_ABOUT,
    image: `${BUSINESS.url}/assets/generated/hero/hero-main.webp`,
    areaServed: AREA_SERVED,
    sameAs: [BUSINESS.zalo],
  };
}

function jsonLdScript(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * The site-wide identity graph: Organization + WebSite + one LocalBusiness per
 * branch, emitted as a single @graph so the cross-references resolve.
 *
 * Note: no `aggregateRating`. It previously shipped a hardcoded 5.0/15 reviews
 * with no reviews anywhere on the site, which violates Google's structured data
 * policy. Add it back only alongside real, visible Review markup.
 */
export function SiteJsonLd() {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: BUSINESS.url,
        logo: {
          "@type": "ImageObject",
          url: `${BUSINESS.url}/logo.png`,
        },
        description:
          "Tiệm 3D cung cấp giải pháp in 3D và thiết kế chuyên nghiệp tại TP.HCM: in FDM (PLA, PETG, ABS, TPU), in Resin 8K/14K/16K, thiết kế mẫu 3D theo yêu cầu, sơn và hoàn thiện mô hình.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BUSINESS.phoneE164,
          email: BUSINESS.email,
          contactType: "customer service",
          availableLanguage: "Vietnamese",
          areaServed: "VN",
        },
        department: BUSINESS.branches.map((b) => ({ "@id": branchId(b) })),
        areaServed: AREA_SERVED,
        knowsAbout: KNOWS_ABOUT,
        sameAs: [BUSINESS.zalo],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dịch vụ In 3D",
          itemListElement: SERVICE_CATALOG.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              url: service.url,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        name: BUSINESS.name,
        url: BUSINESS.url,
        publisher: { "@id": ORG_ID },
        inLanguage: "vi-VN",
      },
      ...BUSINESS.branches.map(localBusinessNode),
    ],
  });
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  priceRange?: string;
}

export function ServiceJsonLd({
  name,
  description,
  url,
  image,
  priceRange,
}: ServiceJsonLdProps) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    image,
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BUSINESS.url}/bao-gia/`,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: BUSINESS.phoneE164,
      },
    },
    ...(priceRange && { priceRange }),
  });
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  /** Post tags. Emitted as `keywords` and as `about` entities. */
  keywords?: string[];
  /** Body length, so length-based quality signals have something to read. */
  wordCount?: number;
}

/**
 * BlogPosting markup. Replaces an inline version that hardcoded a competitor's
 * domain in `publisher.url`, `publisher.logo` and `mainEntityOfPage.@id`.
 */
export function ArticleJsonLd({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = BUSINESS.name,
  keywords = [],
  wordCount,
}: ArticleJsonLdProps) {
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${BUSINESS.url}${image}`
    : `${BUSINESS.url}/og-image.jpg`;

  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteImage,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: authorName, "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    // Ties the article back into the site-wide graph emitted by SiteJsonLd,
    // so a crawler reading one article page can still resolve the publisher,
    // both branches and the service catalogue.
    isPartOf: { "@id": SITE_ID },
    ...(keywords.length
      ? {
          keywords: keywords.join(", "),
          about: keywords.map((name) => ({ "@type": "Thing", name })),
        }
      : {}),
    ...(wordCount ? { wordCount } : {}),
    inLanguage: "vi-VN",
  });
}

interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
}

/** Collection markup for the portfolio index. */
export function ItemListJsonLd({
  items,
  name,
}: {
  items: ItemListEntry[];
  name: string;
}) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.image && { image: `${BUSINESS.url}${item.image}` }),
    })),
  });
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  category?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  category,
}: ProductJsonLdProps) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    ...(category && { category }),
    brand: { "@type": "Brand", name: BUSINESS.name },
  });
}

/** The primary branch's full address — handy for page copy. */
export const PRIMARY_ADDRESS = formatAddress(PRIMARY_BRANCH);
