import type { Metadata } from "next";
import { HomeView } from "@/components/views/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/",
  title: "Ares Refractory | Ceramic Fiber, Refractory & High-Temperature Insulation Supplier",
  description:
    "Ceramic fiber, refractory castables, insulating bricks, high-temperature boards and anchoring systems — B2B export supply from Türkiye against your technical specification. Build your RFQ list.",
  alternates: { tr: "/" },
});

export default function Page() {
  return <HomeView locale="en" />;
}
