import type { Metadata } from "next";
import { ORIGIN, absUrl, dict, type Locale } from "@/lib/i18n";
import { siteStage } from "@/content/publishing";

type MetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Counterpart paths for hreflang (only pass pages that exist on the other site). */
  alternates?: Partial<Record<Locale, string>>;
  /** Page-level publication state. Preview stage overrides to noindex everywhere. */
  published?: boolean;
  ogType?: "website" | "article";
};

export const isIndexable = (published = true) => siteStage() === "production" && published;

export function buildMetadata({ locale, path, title, description, alternates, published = true, ogType = "website" }: MetaInput): Metadata {
  const url = absUrl(locale, path);
  const languages: Record<string, string> = {};
  const alt = { ...alternates, [locale]: path };
  if (alt.tr) languages["tr-TR"] = absUrl("tr", alt.tr);
  if (alt.en) languages["en"] = absUrl("en", alt.en);
  if (alt.en) languages["x-default"] = absUrl("en", alt.en);
  const index = isIndexable(published);
  return {
    title,
    description,
    metadataBase: new URL(ORIGIN[locale]),
    alternates: { canonical: url, languages: Object.keys(languages).length > 1 ? languages : undefined },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: dict[locale].brand,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [{ url: "/brand/og-default.png", width: 1200, height: 630, alt: dict[locale].brand }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ───────────────────────────── JSON-LD ─────────────────────────────

export const orgId = (locale: Locale) => `${ORIGIN[locale]}/#organization`;

export function organizationLd(locale: Locale) {
  return {
    "@type": "Organization",
    "@id": orgId(locale),
    name: dict[locale].brand,
    alternateName: locale === "tr" ? ["Ares Refractory", "ARES Refractory & Insulation"] : ["Ares İzolasyon", "ARES Refractory & Insulation"],
    url: ORIGIN[locale],
    logo: `${ORIGIN[locale]}/brand/ares-logo.svg`,
    sameAs: [ORIGIN[locale === "tr" ? "en" : "tr"]],
    knowsAbout: ["ceramic fiber", "refractory", "high-temperature insulation", "seramik yünü", "refrakter"],
  };
}

export function websiteLd(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${ORIGIN[locale]}/#website`,
    url: ORIGIN[locale],
    name: dict[locale].brand,
    inLanguage: locale === "tr" ? "tr-TR" : "en",
    publisher: { "@id": orgId(locale) },
  };
}

export function breadcrumbLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(locale, it.path) })),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function articleLd(locale: Locale, a: { title: string; description: string; path: string; section: string }) {
  return {
    "@type": "Article",
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absUrl(locale, a.path),
    articleSection: a.section,
    inLanguage: locale === "tr" ? "tr-TR" : "en",
    author: { "@id": orgId(locale) },
    publisher: { "@id": orgId(locale) },
  };
}

/** Product without offers/ratings: only verifiable data (client rule: "yalnızca gerçek veriler"). */
export function productLd(locale: Locale, p: { name: string; description: string; path: string; category: string }) {
  return {
    "@type": "Product",
    name: p.name,
    description: p.description,
    url: absUrl(locale, p.path),
    category: p.category,
    brand: { "@id": orgId(locale) },
  };
}

export function collectionLd(locale: Locale, c: { name: string; description: string; path: string; items: { name: string; path: string }[] }) {
  return {
    "@type": "CollectionPage",
    name: c.name,
    description: c.description,
    url: absUrl(locale, c.path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: c.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absUrl(locale, it.path) })),
    },
  };
}

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
