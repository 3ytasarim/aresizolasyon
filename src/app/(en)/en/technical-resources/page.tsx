import { GuidesHubViewEn } from "@/components/views/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  path: "/technical-resources/",
  title: "Technical Resources | Refractory & Insulation Buying Guides - Ares Refractory",
  description: "Selection guides, specification checklists and TDS/SDS comparisons for ceramic fiber, refractory and high-temperature insulation buyers.",
  alternates: { tr: "/teknik-rehber/" },
  published: false,
});

export default function Page() {
  return <GuidesHubViewEn />;
}
