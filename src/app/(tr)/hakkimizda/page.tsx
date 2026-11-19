import { AboutView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  path: "/hakkimizda/",
  title: "Kurumsal | Ares İzolasyon",
  description: "Ares İzolasyon: seramik yünü başta olmak üzere refrakter ve yüksek sıcaklık izolasyon malzemelerinde teknik şartnameye göre tedarik.",
  alternates: { en: "/about/" },
});

export default function Page() {
  return <AboutView locale="tr" />;
}
