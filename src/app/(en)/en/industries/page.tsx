import { SectorsView } from "@/components/views/sectors";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  path: "/industries/",
  title: "Industries | Fire Doors, Furnaces, Foundries - Ares Refractory",
  description: "Ceramic fiber and refractory supply for fire door manufacturers, industrial furnace builders, steel, foundries, glass, ceramics, cement, energy and petrochemical plants.",
  alternates: { tr: "/sektorler/" },
});

export default function Page() {
  return <SectorsView locale="en" />;
}
