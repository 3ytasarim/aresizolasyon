import { SectorsView } from "@/components/views/sectors";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  path: "/sektorler/",
  title: "Sektörel Çözümler | Yangın Kapısı, Fırın, Dökümhane - Ares İzolasyon",
  description: "Yangın kapısı üreticileri, endüstriyel fırın imalatçıları, demir-çelik, dökümhane, cam, seramik, çimento ve enerji tesisleri için refrakter ve izolasyon tedariki.",
  alternates: { en: "/industries/" },
});

export default function Page() {
  return <SectorsView locale="tr" />;
}
