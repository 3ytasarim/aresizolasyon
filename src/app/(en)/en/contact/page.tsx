import { ContactView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  path: "/contact/",
  title: "Contact | Ares Refractory",
  description: "Contact the Ares technical team and send your RFQ with specifications and technical files.",
  alternates: { tr: "/iletisim/" },
});

export default function Page() {
  return <ContactView locale="en" />;
}
