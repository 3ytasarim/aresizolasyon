import "server-only";
import { categories, productsOf, catSlug, prodSlug, catName, prodName, sectors, FLAGSHIP_CATEGORY } from "@/lib/content";
import { href, routes, type Locale } from "@/lib/i18n";

export type MenuCategory = {
  key: string;
  name: string;
  href: string;
  flagship: boolean;
  products: { key: string; name: string; href: string }[];
};
export type Menu = {
  categories: MenuCategory[];
  sectors: { key: string; name: string; href: string }[];
};

export function buildMenu(locale: Locale): Menu {
  const r = routes[locale];
  const cats = [...categories].sort((a, b) => Number(b.key === FLAGSHIP_CATEGORY) - Number(a.key === FLAGSHIP_CATEGORY) || a.id - b.id);
  return {
    categories: cats.map((c) => ({
      key: c.key,
      name: catName(c, locale),
      href: href(locale, r.item(catSlug(c, locale))),
      flagship: c.key === FLAGSHIP_CATEGORY,
      products: productsOf(c.key).map((p) => ({ key: p.key, name: prodName(p, locale), href: href(locale, r.item(prodSlug(p, locale))) })),
    })),
    sectors: sectors.map((s) => ({
      key: s.key,
      name: locale === "tr" ? s.nameTr : s.nameEn,
      href: href(locale, r.sector(locale === "tr" ? s.key : s.enSlug)),
    })),
  };
}
