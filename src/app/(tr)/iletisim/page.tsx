import { ContactView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  path: "/iletisim/",
  title: "İletişim | Ares İzolasyon",
  description: "Ares İzolasyon teknik ekibine ulaşın; teklif talebinizi şartname ve teknik dosyalarla iletin.",
  alternates: { en: "/contact/" },
});

export default function Page() {
  return <ContactView locale="tr" />;
}
