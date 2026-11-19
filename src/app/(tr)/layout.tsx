import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootLayout } from "@/components/layout/root-layout";
import { ORIGIN } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN.tr),
  title: { default: "Ares İzolasyon | Seramik Yünü, Refrakter ve Yüksek Sıcaklık İzolasyonu", template: "%s" },
  applicationName: "Ares İzolasyon",
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#131315" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RootLayout locale="tr">{children}</RootLayout>;
}
