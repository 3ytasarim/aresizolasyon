import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";
import { MaterialArt } from "@/components/brand/material-art";
import { AddToQuote } from "@/components/layout/client-bits";
import { cn, truncate } from "@/lib/utils";
import { dict, href, routes, type Locale } from "@/lib/i18n";
import { catIntro, catName, catSlug, prodDefinition, prodName, prodSlug, productsOf, getCategory, type Category, type Product, type Guide } from "@/lib/content";
import { capTr } from "@/lib/utils";

export function CategoryCard({ c, locale, className, size = "md" }: { c: Category; locale: Locale; className?: string; size?: "md" | "lg" }) {
  const t = dict[locale];
  const items = productsOf(c.key);
  return (
    <Link href={href(locale, routes[locale].item(catSlug(c, locale)))} className={cn("card card-hover group flex flex-col overflow-hidden", className)}>
      <div className={cn("relative overflow-hidden", size === "lg" ? "aspect-[16/9]" : "aspect-[16/10]")}>
        <MaterialArt kind={c.key} seed={c.id} className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-2.5 py-1 font-mono text-xs text-white/85 backdrop-blur">
          {String(c.id).padStart(2, "0")} · {items.length} {locale === "tr" ? "ürün grubu" : "groups"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 font-semibold text-ink">{catName(c, locale)}</h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-3">{truncate(catIntro(c, locale), 190)}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {items.slice(0, 4).map((p) => (
            <li key={p.key} className="rounded-full bg-sunken px-2.5 py-1 text-xs text-ink-2">{prodName(p, locale)}</li>
          ))}
          {items.length > 4 && <li className="rounded-full px-2 py-1 text-xs text-ink-3">+{items.length - 4}</li>}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
          {t.viewCategory}
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ProductCard({ p, locale, showCategory = true, className }: { p: Product; locale: Locale; showCategory?: boolean; className?: string }) {
  const t = dict[locale];
  const c = getCategory(p.categoryKey)!;
  const url = href(locale, routes[locale].item(prodSlug(p, locale)));
  const name = prodName(p, locale);
  return (
    <article className={cn("card card-hover group relative flex flex-col overflow-hidden", className)}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <MaterialArt kind={p.categoryKey} seed={p.id + 11} glow={false} />
        {p.categoryKey === "seramik-elyaf-urunleri" && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
            <Flame aria-hidden className="size-3" /> {locale === "tr" ? "Ana ürün" : "Core"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {showCategory && <p className="text-xs font-medium uppercase tracking-wider text-ink-3">{catName(c, locale)}</p>}
        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">
          <Link href={url} className="after:absolute after:inset-0 after:content-['']">{name}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-3">{capTr(truncate(prodDefinition(p, locale).replace(`${p.nameTr}, `, ""), 140))}</p>
        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-5">
          <AddToQuote
            locale={locale}
            size="sm"
            location="product_card"
            item={{ key: p.key, name, category: catName(c, locale), href: url }}
            labels={{ add: t.addToQuote, added: t.addedToQuote }}
          />
          <ArrowUpRight aria-hidden className="size-5 text-ink-3 transition-colors group-hover:text-accent" />
        </div>
      </div>
    </article>
  );
}

export function GuideCard({ g, className }: { g: Guide; className?: string }) {
  const c = getCategory(g.categoryKey)!;
  const url = g.sectorKey ? routes.tr.sectorGuide(g.sectorKey, g.slug) : routes.tr.guide(g.slug);
  return (
    <article className={cn("card card-hover group relative flex flex-col p-6", className)}>
      <div className="flex items-center gap-2 text-xs text-ink-3">
        <span className="rounded-full bg-sunken px-2.5 py-1 font-mono">{g.code}</span>
        <span className="truncate">{g.kind === "sector" ? g.sectorName : c.nameTr}</span>
      </div>
      <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-ink">
        <Link href={url} className="after:absolute after:inset-0 after:content-['']">{g.title}</Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-3">{truncate(g.summary, 180)}</p>
      <p className="mt-auto pt-5 text-xs text-ink-3">{g.readingMinutes} {dict.tr.minutes}</p>
    </article>
  );
}
