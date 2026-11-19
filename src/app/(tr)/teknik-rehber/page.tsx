import { GuidesHubView } from "@/components/views/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  path: "/teknik-rehber/",
  title: "Teknik Rehber | Seramik Yünü ve Refrakter Bilgi Merkezi - Ares İzolasyon",
  description: "Seramik yünü seçimi, teknik şartname, TDS/SDS karşılaştırması ve sektörel satın alma rehberleri. Kategori, ürün ve sektöre göre düzenlenmiş teknik kütüphane.",
  alternates: { en: "/technical-resources/" },
});

export default function Page() {
  return <GuidesHubView />;
}
