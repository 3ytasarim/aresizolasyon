import { CatalogView } from "@/components/views/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  path: "/products/",
  title: "Product Catalogue | Ceramic Fiber & Refractory Products - Ares Refractory",
  description: "Ceramic fiber, refractory castables and mortars, insulating bricks, high-temperature boards, anchoring systems and foundry materials: 9 categories, 40 product groups.",
  alternates: { tr: "/urunler/" },
});

export default function Page() {
  return <CatalogView locale="en" />;
}
