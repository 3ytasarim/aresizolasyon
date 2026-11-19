import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { CategoryCard } from "@/components/catalog/cards";
import { FinalCta } from "@/components/views/home";
import { FLAGSHIP_CATEGORY, categories, catName, catSlug, getCategory, prodDefinition, prodName, prodSlug, products, productsOf } from "@/lib/content";
import { dict, href, routes, type Locale } from "@/lib/i18n";
import { breadcrumbLd, collectionLd, graph } from "@/lib/seo";
import { capTr } from "@/lib/utils";

export function CatalogView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const r = routes[locale];
  const tr = locale === "tr";
  const sortedCats = [...categories].sort((a, b) => Number(b.key === FLAGSHIP_CATEGORY) - Number(a.key === FLAGSHIP_CATEGORY) || a.id - b.id);
  const order = new Map(sortedCats.map((c, i) => [c.key, i]));
  const items = [...products]
    .sort((a, b) => order.get(a.categoryKey)! - order.get(b.categoryKey)! || a.id - b.id)
    .map((p) => ({
      key: p.key,
      n: p.id,
      name: prodName(p, locale),
      alt: tr ? p.nameEn : p.nameTr,
      definition: capTr(prodDefinition(p, locale).replace(`${p.nameTr}, `, "")),
      href: href(locale, r.item(prodSlug(p, locale))),
      categoryKey: p.categoryKey,
      categoryName: catName(getCategory(p.categoryKey)!, locale),
      flagship: p.categoryKey === FLAGSHIP_CATEGORY,
    }));
  const cats = sortedCats.map((c) => ({ key: c.key, name: catName(c, locale), count: productsOf(c.key).length }));

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd(locale, [{ name: t.home, path: "/" }, { name: t.nav.products, path: r.products }]),
          collectionLd(locale, {
            name: t.nav.products,
            description: tr ? "Ares İzolasyon ürün kataloğu" : "Ares Refractory product catalogue",
            path: r.products,
            items: sortedCats.map((c) => ({ name: catName(c, locale), path: r.item(catSlug(c, locale)) })),
          }),
        )}
      />
      <section className="paper border-b border-line">
        <div className="container-x py-12 lg:py-16">
          <Breadcrumbs items={[{ name: t.home, href: href(locale, "/") }, { name: t.nav.products, href: href(locale, r.products) }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">{tr ? "Ürün kataloğu" : "Product catalogue"}</p>
            <h1 className="mt-4 text-h1 font-semibold text-ink">
              {tr ? "Refrakter ve yüksek sıcaklık izolasyon ürünleri" : "Refractory & high-temperature insulation products"}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">
              {tr
                ? `${categories.length} ana kategori ve ${products.length} ürün grubu. Ürünleri teklif listenize ekleyin; ölçü, miktar ve teknik şartnameyi tek formda iletin.`
                : `${categories.length} categories and ${products.length} product groups. Add products to your RFQ list and send dimensions, quantities and specifications in one form.`}
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="container-x">
          <CatalogExplorer
            items={items}
            categories={cats}
            locale={locale}
            labels={{
              all: tr ? "Tüm kategoriler" : "All categories",
              search: tr ? "Ürün ara (ör. battaniye, ankraj)" : "Search products (e.g. blanket, anchor)",
              add: t.addToQuote,
              added: t.addedToQuote,
              empty: tr ? "Aramanızla eşleşen ürün bulunamadı. Teklif formundan doğrudan talep iletebilirsiniz." : "No products match. You can still describe your need in the RFQ form.",
              results: tr ? "ürün grubu" : "product groups",
            }}
          />
        </div>
      </section>
      <section className="border-t border-line bg-elev py-16 lg:py-20">
        <div className="container-x">
          <h2 className="text-h2 font-semibold text-ink">{tr ? "Kategoriler" : "Categories"}</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCats.map((c) => <li key={c.key} className="flex"><CategoryCard c={c} locale={locale} className="w-full" /></li>)}
          </ul>
        </div>
      </section>
      <FinalCta
        locale={locale}
        title={tr ? "Aradığınız ürünü listede bulamadınız mı?" : "Can't find what you need?"}
        lead={tr ? "Mevcut ürün kodunu veya teknik föyü paylaşın; muadil değerlendirmesini teknik kontrolle yapalım." : "Send your current product code or datasheet and we will review equivalents technically."}
      />
    </>
  );
}
