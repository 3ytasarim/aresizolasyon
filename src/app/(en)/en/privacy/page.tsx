import { PrivacyView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  path: "/privacy/",
  title: "Privacy Notice | Ares Refractory",
  description: "How Ares processes personal data and cookies.",
  alternates: { tr: "/kvkk/" },
  published: false,
});

export default function Page() {
  return <PrivacyView locale="en" />;
}
