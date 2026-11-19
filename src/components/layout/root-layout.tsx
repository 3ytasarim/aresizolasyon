import type { ReactNode } from "react";
import { Footer, Header } from "@/components/layout/site-chrome";
import { themeScript } from "@/components/layout/client-bits";
import { ConsentBanner } from "@/components/layout/consent";
import { JsonLd } from "@/components/ui/json-ld";
import { archivo, inter } from "@/lib/fonts";
import { graph, organizationLd, websiteLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import "@/app/globals.css";

export function RootLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale === "tr" ? "tr" : "en"} className={`${inter.variable} ${archivo.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout: literal <head> injects the theme script */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={graph(organizationLd(locale), websiteLd(locale))} />
      </head>
      <body className="min-h-dvh">
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <ConsentBanner locale={locale} />
      </body>
    </html>
  );
}
