import Link from "next/link";
import { Globe2 } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { DesktopNav, MobileNav } from "@/components/layout/nav-client";
import { QuoteBadge, QuoteHydrator, ScrollDepth, ThemeToggle } from "@/components/layout/client-bits";
import { buildMenu } from "@/lib/nav";
import { ORIGIN, dict, href, routes, type Locale } from "@/lib/i18n";
import { stats } from "@/lib/content";

const splitDomains = process.env.NEXT_PUBLIC_EN_PREFIX === "";
/** Link to the other market's site: absolute on split domains, relative on a single host. */
export const otherSiteHref = (locale: Locale) =>
  locale === "tr" ? (splitDomains ? `${ORIGIN.en}/` : "/en/") : splitDomains ? `${ORIGIN.tr}/` : "/";

function navLinks(locale: Locale) {
  const r = routes[locale];
  return {
    products: href(locale, r.products),
    sectors: href(locale, r.sectors),
    guides: href(locale, r.guides),
    about: href(locale, r.about),
    contact: href(locale, r.contact),
    quote: href(locale, r.quote),
  };
}

export function Header({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const menu = buildMenu(locale);
  const links = navLinks(locale);
  const labels = {
    ...t.nav,
    allProducts: t.allProducts,
    flagship: t.flagship,
    menu: t.menu,
    close: t.close,
    requestQuote: t.requestQuote,
    viewCategory: t.viewCategory,
  };
  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-accent px-5 py-3 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t.skip}
      </a>
      <div className="bg-graphite text-on-graphite-2">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p className="truncate">
            {locale === "tr"
              ? "Teknik şartnameye göre B2B tedarik · Türkiye ve ihracat"
              : "B2B supply to your specification · Export from Türkiye"}
          </p>
          <div className="flex items-center gap-1" aria-label={locale === "tr" ? "Site seçimi" : "Choose site"}>
            <Globe2 aria-hidden className="mr-1 size-3.5" />
            <Link href={locale === "tr" ? "/" : otherSiteHref(locale)} className={locale === "tr" ? "font-semibold text-on-graphite" : "hover:text-on-graphite"} aria-current={locale === "tr" ? "true" : undefined} hrefLang="tr">
              Türkiye
            </Link>
            <span aria-hidden className="px-1 opacity-40">/</span>
            <Link href={locale === "en" ? href("en", "/") : otherSiteHref(locale)} className={locale === "en" ? "font-semibold text-on-graphite" : "hover:text-on-graphite"} aria-current={locale === "en" ? "true" : undefined} hrefLang="en">
              Global
            </Link>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/88">
        <div className="container-x relative flex h-[4.5rem] items-center justify-between gap-6">
          <Link href={href(locale, "/")} className="shrink-0" aria-label={`${t.brand} — ${t.home}`}>
            <Logo className="h-9 w-auto sm:h-10" title={t.brand} />
          </Link>
          <DesktopNav menu={menu} labels={labels} links={links} />
          <div className="flex items-center gap-2">
            <ThemeToggle labels={locale === "tr" ? { light: "Açık temaya geç", dark: "Koyu temaya geç" } : { light: "Switch to light theme", dark: "Switch to dark theme" }} />
            <QuoteBadge locale={locale} href={links.quote} label={t.quoteList} />
            <ButtonLink href={links.quote} size="sm" className="hidden sm:inline-flex">
              {t.requestQuote}
            </ButtonLink>
            <MobileNav menu={menu} labels={labels} links={links} />
          </div>
        </div>
      </header>
      <QuoteHydrator locale={locale} />
      <ScrollDepth />
    </>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const menu = buildMenu(locale);
  const r = routes[locale];
  const year = new Date().getFullYear();
  return (
    <footer className="bg-graphite text-on-graphite-2">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="on-dark" className="h-11 w-auto" title={t.brand} />
          <p className="mt-6 max-w-sm leading-relaxed">
            {locale === "tr"
              ? "Seramik yünü başta olmak üzere refrakter ve yüksek sıcaklık izolasyon malzemelerinde teknik şartnameye göre tedarik."
              : "Ceramic fiber, refractory and high-temperature insulation materials — sourced and supplied against your technical specification."}
          </p>
          <dl className="mt-8 grid max-w-xs grid-cols-3 gap-4 text-on-graphite">
            <div><dt className="text-xs text-on-graphite-2">{locale === "tr" ? "Kategori" : "Categories"}</dt><dd className="font-[family-name:var(--font-display)] text-2xl font-semibold">{stats.categories}</dd></div>
            <div><dt className="text-xs text-on-graphite-2">{locale === "tr" ? "Ürün grubu" : "Product groups"}</dt><dd className="font-[family-name:var(--font-display)] text-2xl font-semibold">{stats.products}</dd></div>
            <div><dt className="text-xs text-on-graphite-2">{locale === "tr" ? "Sektör" : "Industries"}</dt><dd className="font-[family-name:var(--font-display)] text-2xl font-semibold">{stats.sectors}</dd></div>
          </dl>
        </div>
        <nav className="grid gap-10 sm:grid-cols-3 lg:col-span-8" aria-label={locale === "tr" ? "Alt menü" : "Footer"}>
          <div>
            <p className="mb-4 text-sm font-semibold text-on-graphite">{t.nav.products}</p>
            <ul className="space-y-2.5 text-sm">
              {menu.categories.map((c) => <li key={c.key}><Link className="hover:text-on-graphite" href={c.href}>{c.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold text-on-graphite">{t.nav.sectors}</p>
            <ul className="space-y-2.5 text-sm">
              {menu.sectors.map((s) => <li key={s.key}><Link className="hover:text-on-graphite" href={s.href}>{s.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold text-on-graphite">{t.brand}</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link className="hover:text-on-graphite" href={href(locale, r.guides)}>{t.nav.guides}</Link></li>
              <li><Link className="hover:text-on-graphite" href={href(locale, r.about)}>{t.nav.about}</Link></li>
              <li><Link className="hover:text-on-graphite" href={href(locale, r.contact)}>{t.nav.contact}</Link></li>
              <li><Link className="hover:text-on-graphite" href={href(locale, r.quote)}>{t.quoteList}</Link></li>
              <li><Link className="hover:text-on-graphite" href={href(locale, r.privacy)}>{locale === "tr" ? "KVKK ve Gizlilik" : "Privacy"}</Link></li>
              <li><Link className="hover:text-on-graphite" href={otherSiteHref(locale)} hrefLang={locale === "tr" ? "en" : "tr"}>{t.switchSite}</Link></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {t.brand}. {locale === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}</p>
          <p>{locale === "tr" ? "aresizolasyon.com · Türkiye" : "aresrefractory.com · Global"}</p>
        </div>
      </div>
    </footer>
  );
}
