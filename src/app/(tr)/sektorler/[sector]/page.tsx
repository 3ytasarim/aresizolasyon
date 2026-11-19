import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorView } from "@/components/views/sectors";
import { sectors } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ sector: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => sectors.map((s) => ({ sector: s.key }));
const find = (slug: string) => sectors.find((s) => s.key === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = find((await params).sector);
  if (!s) return {};
  return buildMetadata({
    locale: "tr",
    path: `/sektorler/${s.key}/`,
    title: s.key === "yangin-kapisi-ureticileri" ? "Yangın Kapısı Üreticileri İçin Seramik Yünü Tedariki | Ares İzolasyon" : `${s.nameTr} İçin Refrakter ve İzolasyon | Ares İzolasyon`,
    description: truncate(s.leadTr, 160),
    alternates: { en: `/industries/${s.enSlug}/` },
  });
}

export default async function Page({ params }: Props) {
  const s = find((await params).sector);
  if (!s) notFound();
  return <SectorView s={s} locale="tr" />;
}
