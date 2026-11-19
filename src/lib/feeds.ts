import "server-only";
import { categories, categoryId, catName, catSlug, getCategory, guideId, guides, productId, products, prodName, prodSlug, pubState, sectors } from "@/lib/content";
import { ORIGIN, absUrl, routes, type Locale } from "@/lib/i18n";
import { siteStage } from "@/content/publishing";
import { guidePath } from "@/components/views/guides";

type Entry = { path: string; alt?: Partial<Record<Locale, string>> };

/** Only indexable URLs go in the sitemap (production stage + published). */
export function sitemapEntries(locale: Locale): Entry[] {
  if (siteStage() !== "production") return [];
  const r = routes[locale];
  const other: Locale = locale === "tr" ? "en" : "tr";
  const ro = routes[other];
  const list: Entry[] = [
    { path: r.home, alt: { [other]: ro.home } },
    { path: r.products, alt: { [other]: ro.products } },
    { path: r.sectors, alt: { [other]: ro.sectors } },
    { path: r.about, alt: { [other]: ro.about } },
    { path: r.contact, alt: { [other]: ro.contact } },
    ...sectors.map((s) => ({
      path: r.sector(locale === "tr" ? s.key : s.enSlug),
      alt: { [other]: ro.sector(other === "tr" ? s.key : s.enSlug) },
    })),
  ];
  if (locale === "tr") list.push({ path: r.guides });
  for (const c of categories) {
    if (pubState(categoryId(c.key, locale)) !== "published") continue;
    const alt = pubState(categoryId(c.key, other)) === "published" ? { [other]: ro.item(catSlug(c, other)) } : undefined;
    list.push({ path: r.item(catSlug(c, locale)), alt });
  }
  for (const p of products) {
    if (pubState(productId(p.key, locale)) !== "published") continue;
    const alt = pubState(productId(p.key, other)) === "published" ? { [other]: ro.item(prodSlug(p, other)) } : undefined;
    list.push({ path: r.item(prodSlug(p, locale)), alt });
  }
  if (locale === "tr") for (const g of guides) if (pubState(guideId(g.code)) === "published") list.push({ path: guidePath(g) });
  return list;
}

export function sitemapXml(locale: Locale) {
  const hreflang = (l: Locale) => (l === "tr" ? "tr-TR" : "en");
  const urls = sitemapEntries(locale)
    .map((e) => {
      const links = e.alt
        ? [[locale, e.path] as const, ...Object.entries(e.alt)]
            .map(([l, p]) => `<xhtml:link rel="alternate" hreflang="${hreflang(l as Locale)}" href="${absUrl(l as Locale, p as string)}"/>`)
            .join("")
        : "";
      return `<url><loc>${absUrl(locale, e.path)}</loc>${links}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export function robotsTxt(locale: Locale) {
  if (siteStage() !== "production") return "User-agent: *\nDisallow: /\n";
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    locale === "tr" ? "Disallow: /teklif-listesi/" : "Disallow: /rfq/",
    "",
    "# AI assistants may read and cite our technical content",
    ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
    `Sitemap: ${ORIGIN[locale]}/sitemap.xml`,
    "",
  ].join("\n");
}

/** llms.txt — a compact, citation-friendly map of the site for AI assistants (GEO). */
export function llmsTxt(locale: Locale) {
  const tr = locale === "tr";
  const r = routes[locale];
  const lines = [
    `# ${tr ? "Ares İzolasyon" : "Ares Refractory"}`,
    "",
    tr
      ? "> Seramik yünü (seramik elyaf) başta olmak üzere refrakter ve yüksek sıcaklık izolasyon malzemelerinde Türkiye merkezli B2B tedarik. Teklifler müşteri şartnamesine ve üretici TDS/SDS belgelerine göre hazırlanır; site doğrudan satış yapmaz."
      : "> Türkiye-based B2B supplier of ceramic fiber, refractory and high-temperature insulation materials. Quotations follow the customer's specification and the manufacturer's TDS/SDS; no direct online sales.",
    "",
    `## ${tr ? "Ürün kategorileri" : "Product categories"}`,
    ...categories.map((c) => {
      const items = products.filter((p) => p.categoryKey === c.key).map((p) => prodName(p, locale)).join(", ");
      return `- [${catName(c, locale)}](${absUrl(locale, r.item(catSlug(c, locale)))}): ${items}`;
    }),
    "",
    `## ${tr ? "Sektörler" : "Industries"}`,
    ...sectors.map((s) => `- [${tr ? s.nameTr : s.nameEn}](${absUrl(locale, r.sector(tr ? s.key : s.enSlug))}): ${tr ? s.leadTr : s.leadEn}`),
    "",
  ];
  if (tr) {
    const pub = guides.filter((g) => pubState(guideId(g.code)) === "published");
    if (pub.length) lines.push("## Teknik rehberler", ...pub.map((g) => `- [${g.title}](${absUrl("tr", guidePath(g))}): ${getCategory(g.categoryKey)!.nameTr}`), "");
  }
  lines.push(`## ${tr ? "Teklif" : "Quotation"}`, `- [${tr ? "Teklif listesi ve form" : "RFQ form"}](${absUrl(locale, r.quote)})`, "");
  return lines.join("\n");
}
