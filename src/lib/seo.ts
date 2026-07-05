import { BRAND } from "./brand";

export const SITE_URL = BRAND.url;

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function pageTitle(page?: string) {
  return page ? `${page} — ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
}

export function defaultMeta(page?: { title?: string; description?: string; path?: string; noindex?: boolean }) {
  const title = page?.title ? pageTitle(page.title) : pageTitle();
  const description = page?.description ?? BRAND.description;
  const canonical = absoluteUrl(page?.path ?? "/");

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: BRAND.name },
      { name: "theme-color", content: "#0a0e1a" },
      ...(page?.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: BRAND.name },
      { property: "og:image", content: absoluteUrl("/og-image.svg") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${BRAND.name} — Premium Technology Consultancy` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteUrl("/og-image.svg") },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    logo: absoluteUrl("/logo-full.png"),
    description: BRAND.description,
    email: BRAND.email,
    telephone: BRAND.phone,
    foundingDate: BRAND.founded,
    sameAs: [],
    address: [
      { "@type": "PostalAddress", addressLocality: "Patna", addressCountry: "IN" },
      { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
      { "@type": "PostalAddress", addressLocality: "Bhubaneswar", addressCountry: "IN" },
      { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
      { "@type": "PostalAddress", addressLocality: "Jaipur", addressCountry: "IN" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BRAND.phone,
      contactType: "customer service",
      email: BRAND.email,
      areaServed: "IN"
    }
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: SITE_URL,
    description: BRAND.description,
    publisher: { "@type": "Organization", name: BRAND.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function personSchema(person: {
  name: string;
  role: string;
  bio: string;
  email: string;
  slug: string;
  photo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    email: person.email,
    url: absoluteUrl(`/team/${person.slug}`),
    worksFor: { "@type": "Organization", name: BRAND.name },
    ...(person.photo ? { image: person.photo } : {}),
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact — ${BRAND.name}`,
    url: absoluteUrl("/contact"),
    description: `Contact ${BRAND.name} for enterprise technology consulting.`,
    mainEntity: {
      "@type": "Organization",
      name: BRAND.name,
      email: BRAND.email,
      telephone: BRAND.phone,
    },
  };
}
