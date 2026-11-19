import { QuoteView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  path: "/rfq/",
  title: "Request for Quotation | Ares Refractory",
  description: "Send products, quantities and your technical specification in one form and receive a written quotation after technical review.",
  alternates: { tr: "/teklif-listesi/" },
  published: false,
});

export default function Page() {
  return <QuoteView locale="en" />;
}
