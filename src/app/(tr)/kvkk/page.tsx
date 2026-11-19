import { PrivacyView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  path: "/kvkk/",
  title: "KVKK Aydınlatma Metni | Ares İzolasyon",
  description: "Ares İzolasyon kişisel verilerin korunması ve çerez kullanımı hakkında aydınlatma metni.",
  alternates: { en: "/privacy/" },
  published: false,
});

export default function Page() {
  return <PrivacyView locale="tr" />;
}
