export type Locale = "tr" | "en";

/** Public prefix of the global site. "/en" on a single host (dev, preview); "" on aresrefractory.com. */
const EN_PREFIX = process.env.NEXT_PUBLIC_EN_PREFIX ?? "/en";

export const ORIGIN: Record<Locale, string> = {
  tr: process.env.NEXT_PUBLIC_TR_ORIGIN ?? "https://www.aresizolasyon.com",
  en: process.env.NEXT_PUBLIC_EN_ORIGIN ?? "https://www.aresrefractory.com",
};

/** Route table. Paths are canonical (no locale prefix) and always end with "/". */
export const routes = {
  tr: {
    home: "/",
    products: "/urunler/",
    guides: "/teknik-rehber/",
    guide: (slug: string) => `/teknik-rehber/${slug}/`,
    sectors: "/sektorler/",
    sector: (key: string) => `/sektorler/${key}/`,
    sectorGuide: (key: string, slug: string) => `/sektorler/${key}/${slug}/`,
    item: (slug: string) => `/${slug}/`,
    quote: "/teklif-listesi/",
    about: "/hakkimizda/",
    contact: "/iletisim/",
    privacy: "/kvkk/",
  },
  en: {
    home: "/",
    products: "/products/",
    guides: "/technical-resources/",
    guide: (slug: string) => `/technical-resources/${slug}/`,
    sectors: "/industries/",
    sector: (key: string) => `/industries/${key}/`,
    sectorGuide: (key: string, slug: string) => `/industries/${key}/${slug}/`,
    item: (slug: string) => `/${slug}/`,
    quote: "/rfq/",
    about: "/about/",
    contact: "/contact/",
    privacy: "/privacy/",
  },
} as const;

/** Link href for the current deployment (adds the /en prefix on single-host setups). */
export const href = (locale: Locale, path: string) => (locale === "en" ? `${EN_PREFIX}${path}` : path);
/** Absolute canonical URL on the locale's own domain. */
export const absUrl = (locale: Locale, path: string) => `${ORIGIN[locale]}${path}`;

export const dict = {
  tr: {
    brand: "Ares İzolasyon",
    tagline: "Refrakter & Yüksek Sıcaklık İzolasyonu",
    nav: { products: "Ürünler", sectors: "Sektörler", guides: "Teknik Rehber", about: "Kurumsal", contact: "İletişim" },
    quoteList: "Teklif Listesi",
    requestQuote: "Teklif İste",
    addToQuote: "Teklif listesine ekle",
    addedToQuote: "Listede",
    allProducts: "Tüm ürünler",
    viewCategory: "Kategoriyi incele",
    viewProduct: "Ürünü incele",
    readGuide: "Rehberi oku",
    home: "Ana Sayfa",
    flagship: "Ana ürün grubu",
    draft: "Taslak içerik — teknik doğrulama ve yayın onayı bekliyor",
    switchSite: "Global site (EN)",
    skip: "İçeriğe geç",
    search: "Ara",
    minutes: "dk okuma",
    faq: "Sık sorulan sorular",
    related: "İlgili ürünler",
    relatedGuides: "İlgili teknik rehberler",
    onThisPage: "Bu sayfada",
    menu: "Menü",
    close: "Kapat",
  },
  en: {
    brand: "Ares Refractory",
    tagline: "Refractory & High-Temperature Insulation",
    nav: { products: "Products", sectors: "Industries", guides: "Technical Resources", about: "Company", contact: "Contact" },
    quoteList: "RFQ List",
    requestQuote: "Request a Quote",
    addToQuote: "Add to RFQ",
    addedToQuote: "In RFQ",
    allProducts: "All products",
    viewCategory: "Explore category",
    viewProduct: "View product",
    readGuide: "Read guide",
    home: "Home",
    flagship: "Core product family",
    draft: "Draft content — pending technical review and approval",
    switchSite: "Türkiye (TR)",
    skip: "Skip to content",
    search: "Search",
    minutes: "min read",
    faq: "Frequently asked questions",
    related: "Related products",
    relatedGuides: "Related technical resources",
    onThisPage: "On this page",
    menu: "Menu",
    close: "Close",
  },
} as const;

export type Dict = (typeof dict)[Locale];
