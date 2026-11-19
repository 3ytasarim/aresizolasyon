import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView, ProductView } from "@/components/views/catalog-item";
import { categories, categoryId, catIntro, catSlug, productId, products, prodSlug, pubState, resolveCatalogSlug } from "@/lib/content";
import { EN_PRODUCT } from "@/content/en";
import { buildMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return [...categories.map((c) => ({ slug: catSlug(c, "en") })), ...products.map((p) => ({ slug: prodSlug(p, "en") }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hit = resolveCatalogSlug(slug, "en");
  if (!hit) return {};
  if (hit.type === "category") {
    const c = hit.item;
    return buildMetadata({
      locale: "en",
      path: `/${slug}/`,
      title: `${c.nameEn} | Ares Refractory`,
      description: truncate(catIntro(c, "en"), 160),
      alternates: { tr: `/${c.slug}/` },
      published: pubState(categoryId(c.key, "en")) === "published",
    });
  }
  const p = hit.item;
  return buildMetadata({
    locale: "en",
    path: `/${slug}/`,
    title: `${p.nameEn} Supplier | Ares Refractory`,
    description: truncate(`${p.nameEn}: ${EN_PRODUCT[p.key]!.definition} Typical applications: ${EN_PRODUCT[p.key]!.useAreas.toLowerCase()}. Request a quotation to your specification.`, 160),
    alternates: { tr: `/${p.slug}/` },
    published: pubState(productId(p.key, "en")) === "published",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const hit = resolveCatalogSlug(slug, "en");
  if (!hit) notFound();
  return hit.type === "category" ? <CategoryView c={hit.item} locale="en" /> : <ProductView p={hit.item} locale="en" />;
}
