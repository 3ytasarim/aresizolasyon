import { QuoteView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  path: "/teklif-listesi/",
  title: "Teklif Listesi | Ares İzolasyon",
  description: "Ürünlerinizi, miktarları ve teknik şartnamenizi tek formda iletin; teknik kontrol sonrası yazılı teklif alın.",
  alternates: { en: "/rfq/" },
  published: false,
});

export default function Page() {
  return <QuoteView locale="tr" />;
}
