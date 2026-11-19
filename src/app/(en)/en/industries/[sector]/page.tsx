import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorView } from "@/components/views/sectors";
import { sectors } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ sector: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => sectors.map((s) => ({ sector: s.enSlug }));
const find = (slug: string) => sectors.find((s) => s.enSlug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = find((await params).sector);
  if (!s) return {};
  return buildMetadata({
    locale: "en",
    path: `/industries/${s.enSlug}/`,
    title: `${s.nameEn}: Ceramic Fiber & Refractory Supply | Ares Refractory`,
    description: truncate(s.leadEn, 160),
    alternates: { tr: `/sektorler/${s.key}/` },
  });
}

export default async function Page({ params }: Props) {
  const s = find((await params).sector);
  if (!s) notFound();
  return <SectorView s={s} locale="en" />;
}
