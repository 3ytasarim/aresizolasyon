import "server-only";
import categoriesJson from "@/content/generated/categories.json";
import productsJson from "@/content/generated/products.json";
import guidesJson from "@/content/generated/guides.json";
import { EN_CATEGORY, EN_PRODUCT, TR_CATEGORY_INTRO } from "@/content/en";
import { SECTORS, type Sector } from "@/content/sectors";
import { PUBLISHED, isDraftVisible } from "@/content/publishing";
import type { Locale } from "@/lib/i18n";

export type Block =
  | { type: "heading"; level: number; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: string[][] };

export type Faq = { q: string; a: string };
export type Source = { title: string; url: string };

type BaseDoc = {
  id: number;
  key: string;
  slug: string;
  nameTr: string;
  nameEn: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  audience: string;
  definition: string;
  summary: string;
  blocks: Block[];
  faq: Faq[];
  closing: Block[];
  sources: Source[];
  status: string;
};

export type Category = BaseDoc & { kind: "category"; productKeys: string[]; childNames: string[] };
export type Product = BaseDoc & {
  kind: "product";
  categoryKey: string;
  relatedKeys: string[];
  facts: {
    useAreas: string;
    selectionParams: string[];
    quoteParams: string[];
    advantage: string;
    limitation: string;
    targetGroups: string[];
    alternatives: string;
  };
};
export type Guide = {
  code: string;
  kind: "technical" | "sector";
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intent: string;
  audience: string;
  categoryName: string;
  categoryKey: string;
  sectorKey: string | null;
  sectorName: string | null;
  summary: string;
  blocks: Block[];
  faq: Faq[];
  sources: Source[];
  wordCount: number;
  readingMinutes: number;
  productKeys: string[];
  status: string;
};

export const categories = categoriesJson as unknown as Category[];
export const products = productsJson as unknown as Product[];
const allGuides = guidesJson as unknown as Guide[];

/** The flagship family — always first in menus and on the home page (client brief §3). */
export const FLAGSHIP_CATEGORY = "seramik-elyaf-urunleri";

// ───────────────────────────── publishing state ─────────────────────────────

export type PubState = "published" | "draft";
export const pubState = (id: string): PubState => (PUBLISHED.has(id) ? "published" : "draft");
export const productId = (key: string, locale: Locale) => `${locale}:product:${key}`;
export const categoryId = (key: string, locale: Locale) => `${locale}:category:${key}`;
export const guideId = (code: string) => `tr:guide:${code}`;

/** Guides are only routed when published, unless drafts are visible (preview stage / dev). */
export const guides = allGuides.filter((g) => isDraftVisible() || PUBLISHED.has(guideId(g.code)));

// ───────────────────────────── lookups ─────────────────────────────

export const getCategory = (key: string) => categories.find((c) => c.key === key);
export const getProduct = (key: string) => products.find((p) => p.key === key);
export const productsOf = (categoryKey: string) => products.filter((p) => p.categoryKey === categoryKey);
export const getSector = (key: string) => SECTORS.find((s) => s.key === key);
export const sectors = SECTORS;
export type { Sector };

export function catSlug(c: Category, locale: Locale) {
  return locale === "tr" ? c.slug : EN_CATEGORY[c.key]!.slug;
}
export function prodSlug(p: Product, locale: Locale) {
  return locale === "tr" ? p.slug : EN_PRODUCT[p.key]!.slug;
}
export const catName = (c: Category, locale: Locale) => (locale === "tr" ? c.nameTr : c.nameEn);
export const prodName = (p: Product, locale: Locale) => (locale === "tr" ? p.nameTr : p.nameEn);
export const prodDefinition = (p: Product, locale: Locale) =>
  locale === "tr" ? `${p.nameTr}, ${p.definition}` : EN_PRODUCT[p.key]!.definition;
export const catIntro = (c: Category, locale: Locale) => (locale === "tr" ? TR_CATEGORY_INTRO[c.key]! : EN_CATEGORY[c.key]!.intro);

/** Resolve a root-level slug (/{slug}/) to a category or product. */
export function resolveCatalogSlug(slug: string, locale: Locale) {
  const c = categories.find((x) => catSlug(x, locale) === slug);
  if (c) return { type: "category" as const, item: c };
  const p = products.find((x) => prodSlug(x, locale) === slug);
  if (p) return { type: "product" as const, item: p };
  return null;
}

export const guidesOfCategory = (key: string) => guides.filter((g) => g.categoryKey === key);
export const guidesOfProduct = (key: string) => guides.filter((g) => g.productKeys.includes(key));
export const guidesOfSector = (key: string) => guides.filter((g) => g.sectorKey === key);
export const getGuide = (slug: string, sectorKey: string | null = null) =>
  guides.find((g) => g.slug === slug && g.sectorKey === sectorKey);

/** Guides to show on a product page: direct matches first, then same-category guides. */
export function guidesForProduct(p: Product, limit = 4) {
  const direct = guidesOfProduct(p.key);
  const rest = guidesOfCategory(p.categoryKey).filter((g) => !direct.includes(g) && g.kind === "technical");
  return [...direct, ...rest].slice(0, limit);
}

export const sectorsOfCategory = (key: string) => SECTORS.filter((s) => s.categoryKeys.includes(key));

export const stats = {
  categories: categories.length,
  products: products.length,
  guides: allGuides.length,
  technicalGuides: allGuides.filter((g) => g.kind === "technical").length,
  sectorGuides: allGuides.filter((g) => g.kind === "sector").length,
  sectors: SECTORS.length,
};
