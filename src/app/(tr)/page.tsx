import type { Metadata } from "next";
import { HomeView } from "@/components/views/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "tr",
  path: "/",
  title: "Ares İzolasyon | Seramik Yünü, Refrakter ve Yüksek Sıcaklık İzolasyonu",
  description:
    "Seramik yünü, refrakter beton, izolasyon tuğlası, yüksek sıcaklık plakaları ve ankraj sistemlerinde teknik şartnameye göre B2B tedarik. Ürünleri inceleyin, teklif listenizi oluşturun.",
  alternates: { en: "/" },
});

export default function Page() {
  return <HomeView locale="tr" />;
}
