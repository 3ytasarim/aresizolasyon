import Link from "next/link";
import { ArrowRight, BookOpenText, Factory, FileText, ListChecks } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { DraftBanner } from "@/components/ui/draft-banner";
import { FaqList } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { Prose, tocOf } from "@/components/ui/prose";
import { Toc } from "@/components/guides/toc";
import { GuideExplorer } from "@/components/guides/guide-explorer";
import { AddToQuote } from "@/components/layout/client-bits";
import { CategoryCard } from "@/components/catalog/cards";
import { FinalCta } from "@/components/views/home";
import {
  FLAGSHIP_CATEGORY, categories, getCategory, getProduct, getSector, guideId, guides, guidesOfCategory, guidesOfSector,
  prodSlug, productsOf, pubState, sectors, stats, type Guide, type Product,
} from "@/lib/content";
import { dict, href, routes } from "@/lib/i18n";
import { articleLd, breadcrumbLd, faqLd, graph } from "@/lib/seo";
import { truncate } from "@/lib/utils";

export const guidePath = (g: Guide) => (g.sectorKey ? routes.tr.sectorGuide(g.sectorKey, g.slug) : routes.tr.guide(g.slug));

// ───────────────────────────── Hub (TR) ─────────────────────────────

export function GuidesHubView() {
  const t = dict.tr;
  const cats = [...categories].sort((a, b) => Number(b.key === FLAGSHIP_CATEGORY) - Number(a.key === FLAGSHIP_CATEGORY) || a.id - b.id);
  const items = guides.map((g) => ({
    code: g.code,
    title: g.title,
    summary: truncate(g.summary, 170),
    href: guidePath(g),
    kind: g.kind,
    categoryKey: g.categoryKey,
    categoryName: getCategory(g.categoryKey)!.nameTr,
    sectorKey: g.sectorKey,
    sectorName: g.sectorKey ? getSector(g.sectorKey)?.nameTr ?? g.sectorName : null,
    minutes: g.readingMinutes,
  }));
  const sectorList = sectors.map((s) => ({ key: s.key, name: s.nameTr, count: guidesOfSector(s.key).length })).filter((s) => s.count > 0);

  return (
    <>
      <JsonLd data={graph(breadcrumbLd("tr", [{ name: t.home, path: "/" }, { name: t.nav.guides, path: routes.tr.guides }]))} />
      <section className="relative overflow-hidden bg-graphite text-on-graphite">
        <div aria-hidden className="heat-glow absolute inset-0 opacity-70" />
        <div className="container-x relative py-14 lg:py-20">
          <Breadcrumbs tone="on-dark" items={[{ name: t.home, href: "/" }, { name: t.nav.guides, href: routes.tr.guides }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow inline-flex items-center gap-2 text-bronze"><BookOpenText aria-hidden className="size-4" /> Teknik Bilgi Merkezi</p>
              <h1 className="mt-4 text-h1 font-semibold display-wide">Refrakter ve yüksek sıcaklık izolasyonu için teknik rehber</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-graphite-2">
                Ürün seçimi, teknik şartname, TDS/SDS karşılaştırması ve satın alma kontrolü. Rehberler kategori, ürün ve sektöre göre düzenlenir; her biri ilgili ürün sayfasına ve teklif formuna bağlanır.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-4 lg:col-span-4">
              {[[stats.guides, "rehber"], [stats.technicalGuides, "ürün"], [stats.sectorGuides, "sektör"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-[family-name:var(--font-display)] text-3xl font-semibold">{n}</dd>
                  <dd className="text-sm text-on-graphite-2">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-x">
          {guides.length < stats.guides && (
            <p className="mb-8 text-sm text-ink-3">Rehberler teknik doğrulama ve yayın onayı tamamlandıkça yayına alınır.</p>
          )}
          <GuideExplorer
            items={items}
            categories={cats.map((c) => ({ key: c.key, name: c.nameTr, count: guidesOfCategory(c.key).length }))}
            sectors={sectorList}
          />
        </div>
      </section>

      <section className="border-t border-line bg-elev py-16 lg:py-20" aria-labelledby="sector-groups">
        <div className="container-x">
          <h2 id="sector-groups" className="text-h2 font-semibold text-ink">Sektörel rehber grupları</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectorList.map((s) => (
              <li key={s.key}>
                <Link href={routes.tr.sector(s.key)} className="card card-hover group flex items-center justify-between gap-4 p-6">
                  <span className="flex items-center gap-3">
                    <Factory aria-hidden className="size-5 text-accent" />
                    <span className="font-semibold text-ink">{s.name}</span>
                  </span>
                  <span className="text-sm text-ink-3">{s.count} rehber</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Crawlable index of every guide (also a quick scan for buyers) */}
      <section className="py-16 lg:py-20" aria-labelledby="guide-index">
        <div className="container-x">
          <h2 id="guide-index" className="text-h3 font-semibold text-ink">Kategoriye göre tüm rehberler</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {cats.map((c) => {
              const list = guidesOfCategory(c.key);
              if (!list.length) return null;
              return (
                <details key={c.key} className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between py-3 font-medium text-ink">
                    {c.nameTr} <span className="text-sm font-normal text-ink-3">{list.length}</span>
                  </summary>
                  <ul className="grid gap-x-8 gap-y-2 pb-6 md:grid-cols-2">
                    {list.map((g) => (
                      <li key={g.code}><Link href={guidePath(g)} className="text-sm text-ink-2 hover:text-accent">{g.title}</Link></li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ───────────────────────────── Hub (EN, staged) ─────────────────────────────

export function GuidesHubViewEn() {
  const t = dict.en;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("en", [{ name: t.home, path: "/" }, { name: t.nav.guides, path: routes.en.guides }]))} />
      <section className="relative overflow-hidden bg-graphite text-on-graphite">
        <div aria-hidden className="heat-glow absolute inset-0 opacity-70" />
        <div className="container-x relative py-14 lg:py-20">
          <Breadcrumbs tone="on-dark" items={[{ name: t.home, href: href("en", "/") }, { name: t.nav.guides, href: href("en", routes.en.guides) }]} />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow text-bronze">Technical Resources</p>
            <h1 className="mt-4 text-h1 font-semibold display-wide">Technical resources for refractory & insulation buyers</h1>
            <p className="mt-6 text-lg leading-relaxed text-on-graphite-2">
              Selection guides, specification checklists and document comparisons, organised by product family and industry. English resources are written for international search intent and are published in stages after technical review.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-h3 font-semibold text-ink">What the library will cover</h2>
            <ul className="mt-6 space-y-4 text-ink-2">
              {[
                [ListChecks, "How to specify ceramic fiber: chemistry, classification temperature, density, thickness"],
                [FileText, "Reading and comparing TDS / SDS documents"],
                [Factory, "Industry guides: fire doors, furnaces, foundries, glass, ceramics, cement, petrochemical"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof ListChecks;
                return <li key={text as string} className="flex gap-3"><I aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />{text as string}</li>;
              })}
            </ul>
            <ButtonLink href={href("en", routes.en.quote)} className="mt-8">{t.requestQuote} <ArrowRight aria-hidden className="size-4" /></ButtonLink>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {categories.slice(0, 4).map((c) => <li key={c.key} className="flex"><CategoryCard c={c} locale="en" className="w-full" /></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}

// ───────────────────────────── Guide detail (TR) ─────────────────────────────

export function GuideView({ g }: { g: Guide }) {
  const t = dict.tr;
  const cat = getCategory(g.categoryKey)!;
  const sector = g.sectorKey ? getSector(g.sectorKey) : undefined;
  const path = guidePath(g);
  const draft = pubState(guideId(g.code)) === "draft";
  const relatedProducts: Product[] = (g.productKeys.length ? g.productKeys.map(getProduct) : productsOf(g.categoryKey).slice(0, 3)).filter((p): p is Product => !!p);
  const siblings = (sector ? guidesOfSector(sector.key) : guidesOfCategory(g.categoryKey).filter((x) => x.kind === "technical")).filter((x) => x.code !== g.code);
  const idx = guides.indexOf(g);
  const toc = tocOf(g.blocks);
  const crumbs = sector
    ? [{ name: t.home, path: "/" }, { name: t.nav.sectors, path: routes.tr.sectors }, { name: sector.nameTr, path: routes.tr.sector(sector.key) }, { name: g.title, path }]
    : [{ name: t.home, path: "/" }, { name: t.nav.guides, path: routes.tr.guides }, { name: cat.nameTr, path: `${routes.tr.guides}?kategori=${cat.key}` }, { name: g.title, path }];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd("tr", crumbs.filter((c) => !c.path.includes("?"))),
          articleLd("tr", { title: g.title, description: g.metaDescription || g.summary, path, section: sector?.nameTr ?? cat.nameTr }),
          ...(g.faq.length ? [faqLd(g.faq)] : []),
        )}
      />
      <section className="paper border-b border-line">
        <div className="container-x py-10 lg:py-14">
          <Breadcrumbs items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />
          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-sm text-ink-3">
              <span className="rounded-full bg-sunken px-2.5 py-1 font-mono text-xs">{g.code}</span>
              <Link href={routes.tr.item(cat.slug)} className="hover:text-accent">{cat.nameTr}</Link>
              <span aria-hidden>·</span>
              <span>{g.readingMinutes} {t.minutes}</span>
            </div>
            <h1 className="mt-5 text-h1 font-semibold text-ink">{g.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">{g.summary}</p>
            <p className="mt-5 text-sm text-ink-3"><span className="font-medium text-ink-2">Kimin için:</span> {g.audience}</p>
            {draft && <div className="mt-8"><DraftBanner text={t.draft} code={g.code} /></div>}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28"><Toc items={toc} label={t.onThisPage} /></div>
          </aside>
          <article className="lg:col-span-6">
            <Prose blocks={g.blocks.slice(g.blocks[0]?.type === "p" && g.blocks[0].text === g.summary ? 1 : 0)} />
            {g.faq.length > 0 && (
              <div className="mt-16">
                <h2 id="sss" className="mb-6 text-h3 font-semibold text-ink">{t.faq}</h2>
                <FaqList items={g.faq} />
              </div>
            )}
          </article>
          <aside className="lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-graphite p-6 text-on-graphite">
                <p className="text-lg font-semibold">Teknik teklif</p>
                <p className="mt-2 text-sm leading-relaxed text-on-graphite-2">Şartnamenizi, miktarı ve teslim yerini paylaşın; uygun ürün seçeneklerini belgeleriyle teklif edelim.</p>
                <ButtonLink href={routes.tr.quote} className="mt-5 w-full">{t.requestQuote}</ButtonLink>
              </div>
              {relatedProducts.length > 0 && (
                <div className="rounded-2xl border border-line bg-elev p-6">
                  <p className="eyebrow mb-4">{t.related}</p>
                  <ul className="space-y-4">
                    {relatedProducts.map((p) => (
                      <li key={p.key} className="border-b border-line pb-4 last:border-0 last:pb-0">
                        <Link href={routes.tr.item(prodSlug(p, "tr"))} className="font-medium text-ink hover:text-accent">{p.nameTr}</Link>
                        <AddToQuote
                          locale="tr"
                          size="sm"
                          location="guide_sidebar"
                          className="mt-3 w-full"
                          item={{ key: p.key, name: p.nameTr, category: cat.nameTr, href: routes.tr.item(p.slug) }}
                          labels={{ add: t.addToQuote, added: t.addedToQuote }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="border-t border-line bg-elev py-14">
          <div className="container-x">
            <h2 className="text-h3 font-semibold text-ink">{sector ? `${sector.nameTr} için diğer rehberler` : `${cat.nameTr}: diğer rehberler`}</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {siblings.slice(0, 3).map((s) => (
                <li key={s.code}>
                  <Link href={guidePath(s)} className="card card-hover flex h-full flex-col p-5">
                    <span className="font-mono text-xs text-ink-3">{s.code}</span>
                    <span className="mt-2 font-medium leading-snug text-ink">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <nav className="mt-10 flex justify-between gap-4 text-sm" aria-label="Rehber gezinme">
              {idx > 0 ? <Link className="text-ink-3 hover:text-accent" href={guidePath(guides[idx - 1]!)}>← {truncate(guides[idx - 1]!.title, 60)}</Link> : <span />}
              {idx < guides.length - 1 && <Link className="text-right text-ink-3 hover:text-accent" href={guidePath(guides[idx + 1]!)}>{truncate(guides[idx + 1]!.title, 60)} →</Link>}
            </nav>
          </div>
        </section>
      )}

      <FinalCta locale="tr" title="Teknik sorunuzun cevabı teklif dosyanızda olsun." lead="Mevcut ürün kodu, TDS veya çizimle birlikte talebinizi iletin." />
    </>
  );
}
