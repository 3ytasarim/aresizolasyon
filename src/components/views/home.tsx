import Link from "next/link";
import { ArrowRight, BookOpenText, FileCheck2, FileUp, ListPlus, Ruler, ScrollText, ShieldCheck, Truck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CategoryCard, GuideCard } from "@/components/catalog/cards";
import { FlagshipExplorer } from "@/components/sections/flagship-explorer";
import {
  FLAGSHIP_CATEGORY, categories, catName, catSlug, getCategory, guides, prodName, prodSlug, productsOf, sectors, stats,
} from "@/lib/content";
import { EN_PRODUCT } from "@/content/en";
import { dict, href, routes, type Locale } from "@/lib/i18n";
import { capTr } from "@/lib/utils";

const COPY = {
  tr: {
    eyebrow: "Refrakter & Yüksek Sıcaklık İzolasyonu",
    h1a: "Seramik yünü ve refrakter",
    h1b: "şartnamenize göre tedarik.",
    lead: "Yangın kapısı, endüstriyel fırın, dökümhane ve proses tesisleri için 9 kategori ve 40 ürün grubunda; teknik belgeye dayalı, ölçüye ve miktara göre B2B teklif.",
    ctaSecondary: "Ürün kataloğu",
    trust: [
      { icon: FileCheck2, text: "TDS / SDS ile ürün eşleştirme" },
      { icon: Ruler, text: "Ölçü, kalınlık ve yoğunluğa göre teklif" },
      { icon: Truck, text: "Türkiye geneli ve ihracat sevkiyatı" },
    ],
    spec: { title: "Örnek teklif kalemi", rows: [["Ürün", "Seramik elyaf battaniye"], ["Elyaf kimyası", "Şartnameye göre"], ["Kalınlık / yoğunluk", "Müşteri tanımlı"], ["Miktar", "Rulo / m² / parti"]], status: "Teknik kontrol" },
    flagshipEyebrow: "Ana ürün grubu",
    flagshipTitle: "Seramik yünü ürün ailesi",
    flagshipLead: "Battaniyeden modüle, kağıttan tekstile sekiz form. Elyaf kimyası, sınıflandırma sıcaklığı ve ürün formu birlikte değerlendirilir; teklif bu üç bilgiyle başlar.",
    useAreas: "Kullanım alanları",
    params: "Teklif için belirtin",
    fireDoor: { title: "Yangın kapısı üreticileri için seramik yünü", text: "Kalınlık, yoğunluk ve elyaf kimyası kapı modelinize ve test kapsamınıza göre değişir. Şartnamenizi paylaşın, aynı referansla tekrar eden partiler planlayalım.", cta: "Uygulama sayfası" },
    catEyebrow: "Ürün kataloğu",
    catTitle: "Dokuz kategori, kırk ürün grubu",
    catLead: "Her kategori ve alt ürün kendi teknik sayfasına sahiptir: kullanım alanları, seçim parametreleri, ilgili rehberler ve teklif formu.",
    processEyebrow: "Teklif süreci",
    processTitle: "Ürün adından değil, uygulama koşulundan başlıyoruz",
    steps: [
      { icon: ListPlus, title: "Listeye ekleyin", text: "İhtiyacınız olan ürün gruplarını teklif listesine ekleyin." },
      { icon: FileUp, title: "Şartnameyi paylaşın", text: "Ölçü, miktar, teslim yeri; varsa çizim, TDS veya mevcut ürün kodu." },
      { icon: ShieldCheck, title: "Teknik eşleştirme", text: "Ürün ailesi, üretici belgeleri ve tedarik durumu kontrol edilir." },
      { icon: ScrollText, title: "Yazılı teklif", text: "Ürün tanımı, belge listesi ve teslim koşullarıyla net bir teklif." },
    ],
    sectorEyebrow: "Sektörel çözümler",
    sectorTitle: "Prosesinizi bilen tedarik",
    kbEyebrow: "Teknik Bilgi Merkezi",
    kbTitle: "Satın almadan önce doğru soruları sorun",
    kbLead: `${stats.guides} rehberlik teknik kütüphane; kategori, ürün ve sektöre göre düzenlendi. Her rehber ilgili ürün sayfasına ve teklif formuna bağlanır.`,
    kbCta: "Teknik rehberi keşfedin",
    kbStats: [[String(stats.technicalGuides), "ürün rehberi"], [String(stats.sectorGuides), "sektör rehberi"], [String(stats.categories), "kategori"]],
    finalTitle: "Şartnameniz hazırsa, teklifiniz de hazırlanabilir.",
    finalLead: "Ürün, miktar ve teslim yerini paylaşın; teknik dosyanızı ekleyin. Size yazılı teklifle dönelim.",
  },
  en: {
    eyebrow: "Refractory & High-Temperature Insulation",
    h1a: "Ceramic fiber & refractories,",
    h1b: "supplied to your specification.",
    lead: "Nine categories and forty product groups for fire door, industrial furnace, foundry and process plant manufacturers — quoted on documented specifications, dimensions and volumes.",
    ctaSecondary: "Product catalogue",
    trust: [
      { icon: FileCheck2, text: "Matched to TDS / SDS documentation" },
      { icon: Ruler, text: "Quoted by size, thickness and density" },
      { icon: Truck, text: "Export shipping from Türkiye" },
    ],
    spec: { title: "Sample RFQ line", rows: [["Product", "Ceramic fiber blanket"], ["Fiber chemistry", "Per specification"], ["Thickness / density", "Customer defined"], ["Quantity", "Rolls / m² / batch"]], status: "Technical review" },
    flagshipEyebrow: "Core product family",
    flagshipTitle: "Ceramic fiber products",
    flagshipLead: "Eight forms from blanket to module, paper to textiles. Fiber chemistry, classification temperature and product form are assessed together — every quotation starts there.",
    useAreas: "Typical applications",
    params: "Specify for your RFQ",
    fireDoor: { title: "Ceramic fiber for fire door manufacturers", text: "Thickness, density and fiber chemistry follow your door model and test scope. Share your specification and we plan repeat batches against the same reference.", cta: "Application page" },
    catEyebrow: "Product catalogue",
    catTitle: "Nine categories, forty product groups",
    catLead: "Every category and product group has its own technical page with applications, selection parameters and an RFQ form.",
    processEyebrow: "How quoting works",
    processTitle: "We start from your operating conditions, not a product name",
    steps: [
      { icon: ListPlus, title: "Build your list", text: "Add the product groups you need to the RFQ list." },
      { icon: FileUp, title: "Share the spec", text: "Dimensions, quantity, destination; drawings, TDS or current product code if available." },
      { icon: ShieldCheck, title: "Technical match", text: "Product family, manufacturer documents and availability are checked." },
      { icon: ScrollText, title: "Written quotation", text: "Clear product definition, document list and delivery terms." },
    ],
    sectorEyebrow: "Industries",
    sectorTitle: "Supply that understands your process",
    kbEyebrow: "Technical Resources",
    kbTitle: "Ask the right questions before you buy",
    kbLead: "Our technical library is organised by category, product and industry. English resources are being prepared for international search intent and will be published in stages.",
    kbCta: "Explore technical resources",
    kbStats: [[String(stats.categories), "categories"], [String(stats.products), "product groups"], [String(stats.sectors), "industries"]],
    finalTitle: "Specification ready? Your quotation can be too.",
    finalLead: "Share product, quantity and destination, attach your technical file, and we will come back with a written quotation.",
  },
} as const;

export function HomeView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const c = COPY[locale];
  const r = routes[locale];
  const flagship = getCategory(FLAGSHIP_CATEGORY)!;
  const others = categories.filter((x) => x.key !== FLAGSHIP_CATEGORY);
  const fireDoor = sectors.find((s) => s.key === "yangin-kapisi-ureticileri")!;
  const flagshipItems = productsOf(FLAGSHIP_CATEGORY).map((p) => ({
    key: p.key,
    name: prodName(p, locale),
    href: href(locale, r.item(prodSlug(p, locale))),
    definition: locale === "tr" ? capTr(p.definition) : EN_PRODUCT[p.key]!.definition,
    useAreas: locale === "tr" ? capTr(p.facts.useAreas) : EN_PRODUCT[p.key]!.useAreas,
    params: locale === "tr" ? p.facts.selectionParams.map(capTr) : ["Fiber chemistry", "Classification temperature", "Thickness", "Density", "Dimensions"],
  }));
  const featuredGuides = locale === "tr" ? ["R-01-01", "S-001", "R-01-02"].map((code) => guides.find((g) => g.code === code)).filter((g) => g !== undefined) : [];

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-graphite text-on-graphite">
        <div aria-hidden className="heat-glow absolute inset-0 animate-ember" />
        <div aria-hidden className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(212_142_97/0.25),transparent_65%)] blur-2xl" />
        <div className="container-x relative grid items-center gap-14 pb-20 pt-16 lg:grid-cols-12 lg:pb-28 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="eyebrow text-bronze animate-rise">{c.eyebrow}</p>
            <h1 className="mt-6 text-display font-semibold display-wide animate-rise [animation-delay:80ms]">
              {c.h1a} <span className="bg-gradient-to-r from-[#f0b68a] via-[#dd9c6d] to-[#b66a38] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-on-graphite-2 animate-rise [animation-delay:160ms] sm:text-xl">{c.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3 animate-rise [animation-delay:240ms]">
              <ButtonLink href={href(locale, r.quote)} size="lg">
                {t.requestQuote} <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href={href(locale, r.products)} size="lg" variant="outline-dark">{c.ctaSecondary}</ButtonLink>
            </div>
            <ul className="mt-12 grid gap-4 text-sm text-on-graphite-2 animate-rise [animation-delay:320ms] sm:grid-cols-3">
              {c.trust.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]"><Icon aria-hidden className="size-4 text-bronze" /></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="animate-plane [animation-delay:150ms]">
              <Logo variant="emblem" tone="on-dark" className="mx-auto w-[88%] drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-72 rounded-2xl border border-white/10 bg-[#202023]/85 p-5 shadow-2xl backdrop-blur-xl animate-rise [animation-delay:500ms]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-on-graphite-2">{c.spec.title}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dd9c6d]/15 px-2 py-0.5 text-[11px] text-[#f0b68a]">
                  <span className="size-1.5 rounded-full bg-[#f0b68a]" /> {c.spec.status}
                </span>
              </div>
              <dl className="mt-4 space-y-2.5 text-sm">
                {c.spec.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <dt className="text-on-graphite-2">{k}</dt>
                    <dd className="text-right text-on-graphite">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Flagship: ceramic fiber ───────────── */}
      <section className="relative bg-graphite-2 py-20 text-on-graphite lg:py-28" aria-labelledby="flagship-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-bronze">{c.flagshipEyebrow}</p>
              <h2 id="flagship-title" className="mt-4 text-h2 font-semibold">{c.flagshipTitle}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-graphite-2">{c.flagshipLead}</p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <ButtonLink href={href(locale, r.item(catSlug(flagship, locale)))} variant="outline-dark">
                {catName(flagship, locale)} <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </div>
          <div className="mt-12">
            <FlagshipExplorer
              items={flagshipItems}
              locale={locale}
              category={catName(flagship, locale)}
              labels={{ add: t.addToQuote, added: t.addedToQuote, view: t.viewProduct, useAreas: c.useAreas, params: c.params }}
            />
          </div>
          <Link
            href={href(locale, r.sector(locale === "tr" ? fireDoor.key : fireDoor.enSlug))}
            className="group mt-6 flex flex-col gap-4 rounded-2xl border border-[#dd9c6d]/30 bg-gradient-to-r from-[#a0572a]/25 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8"
          >
            <div className="max-w-3xl">
              <p className="text-lg font-semibold text-on-graphite">{c.fireDoor.title}</p>
              <p className="mt-2 leading-relaxed text-on-graphite-2">{c.fireDoor.text}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 font-medium text-[#f0b68a]">
              {c.fireDoor.cta} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* ───────────── Categories ───────────── */}
      <section className="paper py-20 lg:py-28" aria-labelledby="cats-title">
        <div className="container-x">
          <SectionHeading
            eyebrow={c.catEyebrow}
            title={<span id="cats-title">{c.catTitle}</span>}
            lead={c.catLead}
            action={<ButtonLink href={href(locale, r.products)} variant="ghost">{t.allProducts} <ArrowRight aria-hidden className="size-4" /></ButtonLink>}
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((cat, i) => (
              <Reveal as="li" key={cat.key} delay={(i % 4) * 0.06} className="flex">
                <CategoryCard c={cat} locale={locale} className="w-full" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Process ───────────── */}
      <section className="border-y border-line bg-elev py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={c.processEyebrow} title={c.processTitle} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative bg-elev p-7 lg:p-8">
                <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
                <Icon aria-hidden className="mt-6 size-7 text-accent" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-3">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Sectors ───────────── */}
      <section className="py-20 lg:py-28" aria-labelledby="sectors-title">
        <div className="container-x">
          <SectionHeading
            eyebrow={c.sectorEyebrow}
            title={<span id="sectors-title">{c.sectorTitle}</span>}
            action={<ButtonLink href={href(locale, r.sectors)} variant="ghost">{t.nav.sectors} <ArrowRight aria-hidden className="size-4" /></ButtonLink>}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal as="li" key={s.key} delay={(i % 3) * 0.05}>
                <Link href={href(locale, r.sector(locale === "tr" ? s.key : s.enSlug))} className="card card-hover group flex h-full flex-col p-6">
                  <span className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-ink">{locale === "tr" ? s.nameTr : s.nameEn}</span>
                    <ArrowRight aria-hidden className="size-4 text-ink-3 transition-all group-hover:translate-x-1 group-hover:text-accent" />
                  </span>
                  <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-3">{locale === "tr" ? s.leadTr : s.leadEn}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Knowledge center ───────────── */}
      <section className="paper border-t border-line py-20 lg:py-28" aria-labelledby="kb-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow inline-flex items-center gap-2"><BookOpenText aria-hidden className="size-4" />{c.kbEyebrow}</p>
            <h2 id="kb-title" className="mt-4 text-h2 font-semibold text-ink">{c.kbTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">{c.kbLead}</p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {c.kbStats.map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-[family-name:var(--font-display)] text-4xl font-semibold text-ink display-wide">{n}</dd>
                  <dd className="mt-1 text-sm text-ink-3">{l}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={href(locale, r.guides)} className="mt-10" variant="secondary">
              {c.kbCta} <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
          <ul className="grid gap-4 lg:col-span-7">
            {featuredGuides.length > 0
              ? featuredGuides.map((g, i) => (
                  <Reveal as="li" key={g.code} delay={i * 0.06}><GuideCard g={g} /></Reveal>
                ))
              : others.slice(0, 3).map((cat) => (
                  <li key={cat.key} className="card flex items-center justify-between p-6">
                    <span className="font-semibold text-ink">{catName(cat, locale)}</span>
                    <span className="text-sm text-ink-3">{locale === "tr" ? "Rehberler" : "Resources in preparation"}</span>
                  </li>
                ))}
          </ul>
        </div>
      </section>

      <FinalCta locale={locale} title={c.finalTitle} lead={c.finalLead} />
    </>
  );
}

export function FinalCta({ locale, title, lead }: { locale: Locale; title: string; lead: string }) {
  const t = dict[locale];
  const r = routes[locale];
  return (
    <section className="relative overflow-hidden bg-graphite py-20 text-on-graphite lg:py-24">
      <div aria-hidden className="heat-glow absolute inset-0" />
      <div className="container-x relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h2 font-semibold">{title}</h2>
          <p className="mt-4 text-lg text-on-graphite-2">{lead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={href(locale, r.quote)} size="lg">{t.requestQuote} <ArrowRight aria-hidden className="size-4" /></ButtonLink>
          <ButtonLink href={href(locale, r.contact)} size="lg" variant="outline-dark">{t.nav.contact}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
