import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideView } from "@/components/views/guides";
import { getGuide, guideId, guides, pubState } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => guides.filter((g) => !g.sectorKey).map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const g = getGuide(p.slug, null);
  if (!g) return {};
  return buildMetadata({
    locale: "tr",
    path: `/teknik-rehber/${g.slug}/`,
    title: `${truncate(g.seoTitle, 62)} | Ares İzolasyon`,
    description: truncate(g.metaDescription || g.summary, 160),
    published: pubState(guideId(g.code)) === "published",
    ogType: "article",
  });
}

export default async function Page({ params }: Props) {
  const p = await params;
  const g = getGuide(p.slug, null);
  if (!g) notFound();
  return <GuideView g={g} />;
}
