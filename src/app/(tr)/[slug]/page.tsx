import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView, ProductView } from "@/components/views/catalog-item";
import { categories, categoryId, catSlug, productId, products, prodSlug, pubState, resolveCatalogSlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return [...categories.map((c) => ({ slug: c.slug })), ...products.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hit = resolveCatalogSlug(slug, "tr");
  if (!hit) return {};
  const it = hit.item;
  const isCat = hit.type === "category";
  return buildMetadata({
    locale: "tr",
    path: `/${slug}/`,
    title: it.seoTitle || `${it.nameTr} | Ares İzolasyon`,
    description: truncate(it.metaDescription || it.summary, 160),
    alternates: { en: `/${hit.type === "category" ? catSlug(hit.item, "en") : prodSlug(hit.item, "en")}/` },
    published: pubState(isCat ? categoryId(it.key, "tr") : productId(it.key, "tr")) === "published",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const hit = resolveCatalogSlug(slug, "tr");
  if (!hit) notFound();
  return hit.type === "category" ? <CategoryView c={hit.item} locale="tr" /> : <ProductView p={hit.item} locale="tr" />;
}
