// JSON-LD Structured Data Components for SEO
// Optimized for Google Business Profile: Tiệm 3D - Dịch Vụ In 3D & Thiết Kế Thủ Đức

interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

interface LocalBusinessProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  image?: string;
  areaServed?: string[];
  aggregateRating?: AggregateRating;
}

export function LocalBusinessJsonLd({
  name = "Tiệm 3D - Dịch Vụ In 3D & Thiết Kế Thủ Đức",
  description = "Tiệm 3D chuyên cung cấp giải pháp in 3D và thiết kế chuyên nghiệp tại Thủ Đức, TP.HCM. Chúng tôi sở hữu công nghệ in đa dạng: in FDM (PLA, PETG, nhựa chịu lực) và in Resin độ phân giải cực cao (8K, 14K, 16K) cho độ sắc nét tuyệt đối. Dịch vụ trọn gói bao gồm: Vẽ và thiết kế mẫu 3D theo yêu cầu, In 3D đơn sắc và in phối màu, Xử lý hậu kỳ, chà nhám và sơn mô hình chuyên nghiệp.",
  url = "https://tiem3d.com",
  telephone = "+84777863808",
  email = "contact@tiem3d.com",
  address = {
    streetAddress: "61 Đường Số 1, Khu Phố 2, Phường Linh Tây",
    addressLocality: "Thủ Đức",
    addressRegion: "Hồ Chí Minh",
    postalCode: "700000",
    addressCountry: "VN",
  },
  geo = {
    latitude: 10.8589,
    longitude: 106.7568,
  },
  openingHours = ["Mo-Su 08:00-22:00"],
  priceRange = "$$",
  image = "https://tiem3d.com/assets/generated/hero/hero-main.png",
  areaServed = ["Thủ Đức", "Quận 9", "Quận 2", "Bình Thạnh", "Thành phố Hồ Chí Minh"],
  aggregateRating = {
    ratingValue: 5.0,
    reviewCount: 15,
    bestRating: 5,
    worstRating: 1,
  },
}: LocalBusinessProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://tiem3d.com/#localbusiness",
    name,
    alternateName: "Tiệm 3D",
    description,
    url,
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: openingHours.map((hours) => {
      const [days, time] = hours.split(" ");
      const [opens, closes] = time.split("-");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days === "Mo-Su"
          ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          : days.split("-"),
        opens,
        closes,
      };
    }),
    priceRange,
    image,
    areaServed: areaServed.map(area => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [
      "https://zalo.me/0777863808",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating || 5,
      worstRating: aggregateRating.worstRating || 1,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dịch vụ In 3D",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Thiết kế 3D theo yêu cầu",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vẽ mẫu 3D kỹ thuật",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "In 3D Resin 8K/14K/16K siêu sắc nét",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "In 3D FDM chất liệu PLA, PETG",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "In 3D màu (Multicolor Printing)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sơn hoàn thiện mô hình",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Xử lý hậu kỳ sản phẩm in 3D",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "In 3D quà tặng và mô hình nhân vật",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  provider?: string;
  areaServed?: string[];
  priceRange?: string;
}

export function ServiceJsonLd({
  name,
  description,
  url,
  image,
  provider = "Tiệm 3D - Dịch Vụ In 3D & Thiết Kế Thủ Đức",
  areaServed = ["Thủ Đức", "Quận 9", "Quận 2", "Bình Thạnh", "Thành phố Hồ Chí Minh"],
  priceRange,
}: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    image,
    provider: {
      "@type": "LocalBusiness",
      name: provider,
      url: "https://tiem3d.com",
      telephone: "+84777863808",
      address: {
        "@type": "PostalAddress",
        streetAddress: "61 Đường Số 1, Khu Phố 2, Phường Linh Tây",
        addressLocality: "Thủ Đức",
        addressRegion: "Hồ Chí Minh",
        addressCountry: "VN",
      },
    },
    areaServed: areaServed.map(area => ({
      "@type": "City",
      name: area,
    })),
    ...(priceRange && { priceRange }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    ...(category && { category }),
    brand: {
      "@type": "Brand",
      name: "Tiệm 3D",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Organization Schema for site-wide SEO
export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://tiem3d.com/#organization",
    name: "Tiệm 3D",
    legalName: "Tiệm 3D - Dịch Vụ In 3D & Thiết Kế Thủ Đức",
    url: "https://tiem3d.com",
    logo: "https://tiem3d.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84777863808",
      contactType: "customer service",
      availableLanguage: "Vietnamese",
      areaServed: "VN",
    },
    sameAs: [
      "https://zalo.me/0777863808",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// WebSite Schema for sitelinks search box
export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://tiem3d.com/#website",
    name: "Tiệm 3D",
    url: "https://tiem3d.com",
    publisher: {
      "@id": "https://tiem3d.com/#organization",
    },
    inLanguage: "vi-VN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
