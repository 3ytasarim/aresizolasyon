import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { CategoryCard, ProductCard } from "@/components/catalog/cards";
import { FinalCta } from "@/components/views/home";
import { guidePath } from "@/components/views/guides";
import { getCategory, guidesOfSector, productsOf, sectors, type Sector } from "@/lib/content";
import { dict, href, routes, type Locale } from "@/lib/i18n";
import { breadcrumbLd, graph } from "@/lib/seo";

const sName = (s: Sector, l: Locale) => (l === "tr" ? s.nameTr : s.nameEn);
const sLead = (s: Sector, l: Locale) => (l === "tr" ? s.leadTr : s.leadEn);
const sPath = (s: Sector, l: Locale) => routes[l].sector(l === "tr" ? s.key : s.enSlug);

export function SectorsView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const r = routes[locale];
  const tr = locale === "tr";
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(locale, [{ name: t.home, path: "/" }, { name: t.nav.sectors, path: r.sectors }]))} />
      <section className="paper border-b border-line">
        <div className="container-x py-12 lg:py-16">
          <Breadcrumbs items={[{ name: t.home, href: href(locale, "/") }, { name: t.nav.sectors, href: href(locale, r.sectors) }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">{tr ? "Sektörel çözümler" : "Industries"}</p>
            <h1 className="mt-4 text-h1 font-semibold text-ink">{tr ? "Prosesinize göre refrakter ve izolasyon tedariki" : "Refractory & insulation supply by industry"}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">
              {tr
                ? "Aynı ürün farklı sektörlerde farklı şartnameyle istenir. Sektör sayfaları, teklif için hangi bilgilerin gerektiğini ve ilgili ürün gruplarını bir arada gösterir."
                : "The same product is specified differently in each industry. Each page lists what we need for a quotation and the relevant product families."}
            </p>
          </div>
        </div>
      </section>
      <section className="py-14 lg:py-20">
        <ul className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <li key={s.key}>
              <Link href={href(locale, sPath(s, locale))} className="card card-hover group flex h-full flex-col p-7">
                <h2 className="text-h3 font-semibold text-ink">{sName(s, locale)}</h2>
                <p className="mt-3 leading-relaxed text-ink-3">{sLead(s, locale)}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent">
                  {tr ? "Sektör sayfası" : "View industry"} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta locale={locale} title={tr ? "Sektörünüz listede yok mu?" : "Industry not listed?"} lead={tr ? "Prosesinizi ve mevcut malzemeyi anlatın; uygun ürün ailesini birlikte belirleyelim." : "Describe your process and current materials and we will identify the right product family."} />
    </>
  );
}

export function SectorView({ s, locale }: { s: Sector; locale: Locale }) {
  const t = dict[locale];
  const r = routes[locale];
  const tr = locale === "tr";
  const path = sPath(s, locale);
  const sectorGuides = tr ? guidesOfSector(s.key) : [];
  const flagshipProducts = s.categoryKeys[0] ? productsOf(s.categoryKeys[0]).slice(0, 4) : [];
  const isFireDoor = s.key === "yangin-kapisi-ureticileri";
  const spec = tr ? s.specTr : s.specEn;

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(locale, [{ name: t.home, path: "/" }, { name: t.nav.sectors, path: r.sectors }, { name: sName(s, locale), path }]))} />
      <section className="relative overflow-hidden bg-graphite text-on-graphite">
        <div aria-hidden className="heat-glow absolute inset-0 opacity-80" />
        <div className="container-x relative grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <Breadcrumbs tone="on-dark" items={[{ name: t.home, href: href(locale, "/") }, { name: t.nav.sectors, href: href(locale, r.sectors) }, { name: sName(s, locale), href: href(locale, path) }]} />
            <p className="eyebrow mt-10 text-bronze">{tr ? "Sektörel çözüm" : "Industry solution"}</p>
            <h1 className="mt-4 text-h1 font-semibold display-wide">
              {isFireDoor ? (tr ? "Yangın kapısı üreticileri için seramik yünü tedariki" : "Ceramic fiber supply for fire door manufacturers") : sName(s, locale)}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-on-graphite-2">{sLead(s, locale)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, r.quote)} size="lg">{t.requestQuote} <ArrowRight aria-hidden className="size-4" /></ButtonLink>
              {s.categoryKeys[0] && (
                <ButtonLink href="#urunler" size="lg" variant="outline-dark">{tr ? "İlgili ürünler" : "Related products"}</ButtonLink>
              )}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
              <p className="font-semibold">{tr ? "Teklif için ihtiyaç duyduğumuz bilgiler" : "What we need to quote"}</p>
              <ul className="mt-5 space-y-3.5">
                {spec.map((x) => (
                  <li key={x} className="flex gap-3 text-on-graphite-2"><CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-bronze" />{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {isFireDoor && (
        <section className="paper border-b border-line py-16 lg:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-h2 font-semibold text-ink">{tr ? "Tek reçete yok: değerler şartnamenizden gelir" : "No single recipe: values come from your specification"}</h2>
              <p className="mt-5 leading-relaxed text-ink-2">
                {tr
                  ? "Bir seramik yününün sıcaklık sınıfı, kapının EI30, EI60, EI90 veya EI120 sınıfını tek başına kanıtlamaz. Sınıf, test edilmiş kapı takımının performansıdır. Bu yüzden kalınlık, yoğunluk ve elyaf kimyasını sizin onaylı tasarımınıza göre tedarik ediyor; ilk parti ve numune onayından sonra aynı referansı koruyoruz."
                  : "The temperature class of a ceramic fiber does not on its own prove a door's EI30–EI120 rating; the rating belongs to the tested door assembly. We supply thickness, density and chemistry to your approved design and keep the same reference after sample and first-batch approval."}
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-line bg-elev">
                <table className="w-full text-left text-[0.95rem]">
                  <thead className="bg-sunken text-sm text-ink">
                    <tr><th scope="col" className="p-4 font-semibold">{tr ? "Parametre" : "Parameter"}</th><th scope="col" className="p-4 font-semibold">{tr ? "Nasıl belirlenir?" : "How it is set"}</th></tr>
                  </thead>
                  <tbody className="divide-y divide-line text-ink-2">
                    {(tr
                      ? [["Kalınlık", "Kapı kanadı kesiti ve test edilmiş tasarım"], ["Yoğunluk", "Üretici şartnamesi; yalnızca yoğunluk kaliteyi göstermez"], ["Elyaf kimyası", "ASW/RCF veya AES/LBP — belge ve mevzuat farkıyla"], ["Ölçü / format", "Rulo, plaka veya kanada göre özel kesim"], ["Belgeler", "TDS, SDS, parti/lot izlenebilirliği"], ["Sevkiyat", "Yıllık plan, parti büyüklüğü, ambalaj"]]
                      : [["Thickness", "Door leaf cross-section and tested design"], ["Density", "Manufacturer specification — density alone is not quality"], ["Fiber chemistry", "ASW/RCF or AES/LBP, with different documentation"], ["Size / format", "Roll, board or cut-to-leaf"], ["Documents", "TDS, SDS, lot traceability"], ["Supply", "Annual plan, batch size, packaging"]]
                    ).map(([a, b]) => (
                      <tr key={a}><th scope="row" className="p-4 font-medium text-ink">{a}</th><td className="p-4">{b}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {flagshipProducts.length > 0 && (
        <section id="urunler" className="scroll-mt-24 py-16 lg:py-20">
          <div className="container-x">
            <h2 className="text-h2 font-semibold text-ink">{tr ? "İlgili ürün grupları" : "Related product groups"}</h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {flagshipProducts.map((p) => <li key={p.key} className="flex"><ProductCard p={p} locale={locale} className="w-full" /></li>)}
            </ul>
            {s.categoryKeys.length > 1 && (
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {s.categoryKeys.slice(1).map((k) => getCategory(k)).map((c) => c && <li key={c.key} className="flex"><CategoryCard c={c} locale={locale} className="w-full" /></li>)}
              </ul>
            )}
          </div>
        </section>
      )}

      {sectorGuides.length > 0 && (
        <section className="border-t border-line bg-elev py-16 lg:py-20">
          <div className="container-x">
            <h2 className="text-h2 font-semibold text-ink">{s.nameTr} için teknik rehberler</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {sectorGuides.map((g) => (
                <li key={g.code}>
                  <Link href={guidePath(g)} className="card card-hover group flex h-full gap-4 p-6">
                    <FileText aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                    <span>
                      <span className="font-mono text-xs text-ink-3">{g.code}</span>
                      <span className="mt-1 block font-semibold leading-snug text-ink">{g.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        locale={locale}
        title={tr ? `${s.nameTr}: şartnamenize göre teklif` : `${s.nameEn}: quotation to your specification`}
        lead={tr ? "Teknik dosyanızı ekleyin; ürün tanımı ve belge listesiyle yazılı teklif hazırlayalım." : "Attach your technical file and we will prepare a written quotation with product definition and documents."}
      />
    </>
  );
}
