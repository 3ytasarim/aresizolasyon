import { CatalogView } from "@/components/views/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  path: "/urunler/",
  title: "Ürün Kataloğu | Seramik Yünü ve Refrakter Ürünler - Ares İzolasyon",
  description: "Seramik elyaf, refrakter beton ve harçlar, izolasyon tuğlaları, yüksek sıcaklık plakaları, ankraj sistemleri ve dökümhane malzemeleri: 9 kategori, 40 ürün grubu.",
  alternates: { en: "/products/" },
});

export default function Page() {
  return <CatalogView locale="tr" />;
}
