import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, ClipboardCheck, Factory, FileText, Layers } from "lucide-react";
import { MaterialArt } from "@/components/brand/material-art";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { DraftBanner } from "@/components/ui/draft-banner";
import { FaqList } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { Prose, tocOf } from "@/components/ui/prose";
import { SectionHeading } from "@/components/ui/section-heading";
import { Toc } from "@/components/guides/toc";
import { AddToQuote } from "@/components/layout/client-bits";
import { QuoteNow } from "@/components/catalog/quote-now";
import { GuideCard, ProductCard } from "@/components/catalog/cards";
import { FinalCta } from "@/components/views/home";
import {
  catIntro, catName, catSlug, categoryId, getCategory, getProduct, guidesForProduct, guidesOfCategory, prodName, prodSlug,
  productId, productsOf, pubState, sectorsOfCategory, type Category, type Product,
} from "@/lib/content";
import { EN_PRODUCT } from "@/content/en";
import { dict, href, routes, type Locale } from "@/lib/i18n";
import { breadcrumbLd, collectionLd, faqLd, graph, productLd } from "@/lib/seo";
import { capTr } from "@/lib/utils";

// ───────────────────────────── Category ─────────────────────────────

export function CategoryView({ c, locale }: { c: Category; locale: Locale }) {
  const t = dict[locale];
  const r = routes[locale];
  const path = r.item(catSlug(c, locale));
  const items = productsOf(c.key);
  const guides = locale === "tr" ? guidesOfCategory(c.key) : [];
  const sectors = sectorsOfCategory(c.key);
  const draft = pubState(categoryId(c.key, locale)) === "draft";
  const crumbs = [
    { name: t.home, href: href(locale, "/") },
    { name: t.nav.products, href: href(locale, r.products) },
    { name: catName(c, locale), href: href(locale, path) },
  ];
  const toc = locale === "tr" ? tocOf(c.blocks) : [];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd(locale, [{ name: t.home, path: "/" }, { name: t.nav.products, path: r.products }, { name: catName(c, locale), path }]),
          collectionLd(locale, {
            name: catName(c, locale),
            description: catIntro(c, locale),
            path,
            items: items.map((p) => ({ name: prodName(p, locale), path: r.item(prodSlug(p, locale)) })),
          }),
          ...(locale === "tr" && c.faq.length ? [faqLd(c.faq)] : []),
        )}
      />
      <section className="relative overflow-hidden bg-graphite text-on-graphite">
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/2 opacity-60 lg:block [mask-image:linear-gradient(to_left,black_40%,transparent)]">
          <MaterialArt kind={c.key} seed={c.id} />
        </div>
        <div className="container-x relative py-14 lg:py-20">
          <Breadcrumbs items={crumbs} tone="on-dark" />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow text-bronze">{locale === "tr" ? c.nameEn : `${String(c.id).padStart(2, "0")} / 09`}</p>
            <h1 className="mt-4 text-h1 font-semibold display-wide">{catName(c, locale)}</h1>
            <p className="mt-6 text-lg leading-relaxed text-on-graphite-2">{catIntro(c, locale)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#urunler" size="lg">
                {items.length} {locale === "tr" ? "ürün grubunu incele" : "product groups"} <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href={href(locale, r.quote)} size="lg" variant="outline-dark">{t.requestQuote}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="urunler" className="paper scroll-mt-24 py-16 lg:py-20">
        <div className="container-x">
          {draft && <div className="mb-10"><DraftBanner text={t.draft} /></div>}
          <SectionHeading eyebrow={t.nav.products} title={locale === "tr" ? `${c.nameTr} ürün grupları` : `${c.nameEn} — product groups`} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => <li key={p.key} className="flex"><ProductCard p={p} locale={locale} showCategory={false} className="w-full" /></li>)}
          </ul>
        </div>
      </section>

      {locale === "tr" && (
        <section className="py-16 lg:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28"><Toc items={toc} label={t.onThisPage} /></div>
            </aside>
            <article className="lg:col-span-7">
              <Prose blocks={c.blocks} />
              {c.faq.length > 0 && (
                <div className="mt-16">
                  <h2 id="sss" className="mb-6 text-h3 font-semibold text-ink">{t.faq}</h2>
                  <FaqList items={c.faq} />
                </div>
              )}
              {c.closing.length > 0 && <div className="mt-14"><Prose blocks={c.closing} /></div>}
            </article>
          </div>
        </section>
      )}

      {sectors.length > 0 && (
        <section className="border-t border-line bg-elev py-16">
          <div className="container-x">
            <h2 className="text-h3 font-semibold text-ink">{locale === "tr" ? "Bu ürünleri kullanan sektörler" : "Industries using these products"}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s.key}>
                  <Link href={href(locale, r.sector(locale === "tr" ? s.key : s.enSlug))} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink-2 hover:border-accent hover:text-accent">
                    <Factory aria-hidden className="size-4" /> {locale === "tr" ? s.nameTr : s.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow={t.nav.guides}
              title={`${c.nameTr} teknik rehberleri`}
              action={<ButtonLink href={`${routes.tr.guides}?kategori=${c.key}`} variant="ghost">{guides.length} rehberin tümü <ArrowRight aria-hidden className="size-4" /></ButtonLink>}
            />
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {guides.filter((g) => g.kind === "technical").slice(0, 6).map((g) => <li key={g.code} className="flex"><GuideCard g={g} className="w-full" /></li>)}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        locale={locale}
        title={locale === "tr" ? `${c.nameTr} için teklif alın` : `Request a quotation for ${c.nameEn.toLowerCase()}`}
        lead={locale === "tr" ? "Ürün, ölçü, miktar ve teslim yerini paylaşın; teknik dosyanızı ekleyin." : "Share product, dimensions, quantity and destination and attach your technical file."}
      />
    </>
  );
}

// ───────────────────────────── Product ─────────────────────────────

const EN_PARAMS = ["Fiber / material chemistry", "Classification & operating temperature", "Dimensions and thickness", "Density or grade", "Quantity and packaging", "Destination and Incoterms"];

export function ProductView({ p, locale }: { p: Product; locale: Locale }) {
  const t = dict[locale];
  const r = routes[locale];
  const c = getCategory(p.categoryKey)!;
  const name = prodName(p, locale);
  const path = r.item(prodSlug(p, locale));
  const url = href(locale, path);
  const draft = pubState(productId(p.key, locale)) === "draft";
  const tr = locale === "tr";
  const definition = tr ? `${p.nameTr}, ${p.definition}` : EN_PRODUCT[p.key]!.definition;
  const useAreas = tr ? capTr(p.facts.useAreas) : EN_PRODUCT[p.key]!.useAreas;
  const selection = tr ? p.facts.selectionParams.map(capTr) : EN_PARAMS.slice(0, 4);
  const quoteParams = tr ? p.facts.quoteParams.map(capTr) : EN_PARAMS;
  const guides = tr ? guidesForProduct(p, 3) : [];
  const related = [...p.relatedKeys.map(getProduct), ...productsOf(p.categoryKey)]
    .filter((x): x is Product => !!x && x.key !== p.key)
    .filter((x, i, a) => a.findIndex((y) => y.key === x.key) === i)
    .slice(0, 4);
  const sectors = sectorsOfCategory(p.categoryKey);
  const item = { key: p.key, name, category: catName(c, locale), href: url };
  const crumbs = [
    { name: t.home, href: href(locale, "/") },
    { name: t.nav.products, href: href(locale, r.products) },
    { name: catName(c, locale), href: href(locale, r.item(catSlug(c, locale))) },
    { name, href: url },
  ];
  const toc = tr ? tocOf(p.blocks) : [];

  const facts: { icon: typeof Layers; label: string; value: React.ReactNode }[] = [
    { icon: Layers, label: tr ? "Ürün tanımı" : "Definition", value: definition },
    { icon: Factory, label: tr ? "Tipik kullanım alanları" : "Typical applications", value: useAreas },
    ...(tr && p.facts.advantage ? [{ icon: CheckCircle2, label: "Öne çıkan özellik", value: capTr(p.facts.advantage) }] : []),
    ...(tr && p.facts.limitation ? [{ icon: CircleAlert, label: "Dikkat edilmesi gereken", value: capTr(p.facts.limitation) }] : []),
    ...(tr && p.facts.targetGroups.length ? [{ icon: Factory, label: "Kimler araştırır?", value: p.facts.targetGroups.map(capTr).join(" · ") }] : []),
  ];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd(locale, [
            { name: t.home, path: "/" },
            { name: t.nav.products, path: r.products },
            { name: catName(c, locale), path: r.item(catSlug(c, locale)) },
            { name, path },
          ]),
          productLd(locale, { name, description: definition, path, category: catName(c, locale) }),
          ...(tr && p.faq.length ? [faqLd(p.faq)] : []),
        )}
      />

      {/* Hero */}
      <section className="paper border-b border-line">
        <div className="container-x py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Link href={href(locale, r.item(catSlug(c, locale)))} className="eyebrow hover:underline">{catName(c, locale)}</Link>
              <h1 className="mt-4 text-h1 font-semibold text-ink">{name}</h1>
              {tr && <p className="mt-2 text-sm text-ink-3" lang="en">{p.nameEn}</p>}
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{capTr(definition)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <AddToQuote locale={locale} location="product_hero" size="lg" item={item} labels={{ add: t.addToQuote, added: t.addedToQuote }} />
                <QuoteNow locale={locale} item={item} quoteHref={href(locale, r.quote)} label={tr ? "Hemen teklif iste" : "Request quote now"} variant="ghost" className="h-14 px-7" location="product_hero" />
              </div>
              {draft && <div className="mt-8 max-w-2xl"><DraftBanner text={t.draft} code={tr ? `#${String(p.id).padStart(2, "0")}` : undefined} /></div>}
            </div>
            <div className="lg:col-span-5">
              <div className="card overflow-hidden">
                <div className="aspect-[16/10]"><MaterialArt kind={p.categoryKey} seed={p.id + 11} /></div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink"><ClipboardCheck aria-hidden className="size-4 text-accent" />{tr ? "Teknik seçim parametreleri" : "Selection parameters"}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {selection.map((s) => <li key={s} className="rounded-full border border-line bg-sunken px-3 py-1.5 text-sm text-ink-2">{s}</li>)}
                  </ul>
                  <p className="mt-5 text-xs leading-relaxed text-ink-3">
                    {tr
                      ? "Değerler üretici teknik föyüne (TDS) ve uygulama koşuluna göre teyit edilir; sayfada genel değer beyan edilmez."
                      : "Values are confirmed against the manufacturer's datasheet (TDS) and your operating conditions."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical summary + variants */}
      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-h3 font-semibold text-ink">{tr ? "Teknik özet" : "Technical summary"}</h2>
            <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-elev">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="grid gap-2 p-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="flex items-start gap-2.5 text-sm font-medium text-ink"><Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />{label}</dt>
                  <dd className="leading-relaxed text-ink-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <h2 className="text-h3 font-semibold text-ink">{tr ? "Varyantlar ve teklif bilgisi" : "Variants & RFQ details"}</h2>
            <div className="mt-6 rounded-2xl bg-graphite p-6 text-on-graphite">
              <p className="text-sm leading-relaxed text-on-graphite-2">
                {tr
                  ? "Ürün varyantı; form, ölçü, yoğunluk/kalınlık ve kimyasal sınıfa göre tanımlanır. Teklifte aşağıdaki bilgileri belirtmeniz yeterli:"
                  : "Variants are defined by form, dimensions, density/thickness and chemistry. To quote, tell us:"}
              </p>
              <ol className="mt-5 space-y-3">
                {quoteParams.map((q, i) => (
                  <li key={q} className="flex items-start gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-[11px] text-bronze">{i + 1}</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
              <QuoteNow locale={locale} item={item} quoteHref={href(locale, r.quote)} label={tr ? "Bu bilgilerle teklif iste" : "Request a quote"} variant="on-dark" className="mt-7 w-full" location="product_variants" />
            </div>
          </div>
        </div>
      </section>

      {/* Long-form */}
      {tr && (
        <section className="border-t border-line py-16 lg:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 space-y-10">
                <Toc items={toc} label={t.onThisPage} />
              </div>
            </aside>
            <article className="lg:col-span-6">
              <Prose blocks={p.blocks} />
              {p.faq.length > 0 && (
                <div className="mt-16">
                  <h2 id="sss" className="mb-6 text-h3 font-semibold text-ink">{t.faq}</h2>
                  <FaqList items={p.faq} />
                </div>
              )}
              {p.closing.length > 0 && <div className="mt-14"><Prose blocks={p.closing} /></div>}
            </article>
            <aside className="lg:col-span-3">
              <div className="sticky top-28 rounded-2xl border border-line bg-elev p-6">
                <p className="font-semibold text-ink">{name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">Teknik şartnamenizi ve miktarı paylaşın, yazılı teklif hazırlayalım.</p>
                <AddToQuote locale={locale} location="product_sidebar" item={item} labels={{ add: t.addToQuote, added: t.addedToQuote }} className="mt-5 w-full" />
                {guides.length > 0 && (
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="eyebrow mb-3">{t.relatedGuides}</p>
                    <ul className="space-y-3">
                      {guides.map((g) => (
                        <li key={g.code}>
                          <Link href={g.sectorKey ? r.sectorGuide(g.sectorKey, g.slug) : r.guide(g.slug)} className="group flex gap-2 text-sm leading-snug text-ink-2 hover:text-accent">
                            <FileText aria-hidden className="mt-0.5 size-4 shrink-0 text-ink-3 group-hover:text-accent" />
                            {g.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
      )}

      {!tr && (
        <section className="border-t border-line py-14">
          <div className="container-x max-w-3xl">
            <p className="leading-relaxed text-ink-2">
              A detailed English technical page for {name.toLowerCase()} is being prepared for international buyers. In the meantime, our team answers specification questions directly — send your datasheet or drawing with your RFQ.
            </p>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="paper border-t border-line py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading eyebrow={catName(c, locale)} title={t.related} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((x) => <li key={x.key} className="flex"><ProductCard p={x} locale={locale} className="w-full" /></li>)}
          </ul>
          {sectors.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm text-ink-3">{tr ? "Sektörel uygulamalar:" : "Industries:"}</span>
              {sectors.map((s) => (
                <Link key={s.key} href={href(locale, r.sector(tr ? s.key : s.enSlug))} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm text-ink-2 hover:border-accent hover:text-accent">
                  {tr ? s.nameTr : s.nameEn}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
