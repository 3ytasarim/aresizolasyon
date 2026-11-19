import { AboutView } from "@/components/views/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  path: "/about/",
  title: "About | Ares Refractory",
  description: "Ares supplies ceramic fiber, refractory and high-temperature insulation materials to industrial manufacturers against their technical specification.",
  alternates: { tr: "/hakkimizda/" },
});

export default function Page() {
  return <AboutView locale="en" />;
}
