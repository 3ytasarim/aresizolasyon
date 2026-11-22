"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { href, routes, type Locale } from "@/lib/i18n";

type Choice = { analytics: boolean; at: string };
const KEY = "ares-consent-v1";
const GA = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;

const read = (): Choice | null => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
};

/**
 * KVKK / GDPR consent. Only strictly-necessary storage (theme, RFQ list) is used without consent;
 * analytics (GA4, Clarity) load only after an explicit "Accept". Equal-weight buttons, no pre-ticks.
 */
export function ConsentBanner({ locale }: { locale: Locale }) {
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  // localStorage is only readable after hydration; undefined = "not known yet", so nothing flashes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setChoice(read()), []);

  const save = (analytics: boolean) => {
    const c = { analytics, at: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {}
    setChoice(c);
  };

  const tr = locale === "tr";
  return (
    <>
      {choice?.analytics && GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice?.analytics && CLARITY && (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");`}
        </Script>
      )}
      {choice === null && (
        <div role="region" aria-label={tr ? "Çerez tercihleri" : "Cookie preferences"} className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-2xl border border-line bg-elev/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
          <p className="text-sm leading-relaxed text-ink-2">
            {tr
              ? "Sitenin çalışması için zorunlu tercihleri (tema, teklif listesi) cihazınızda saklıyoruz. Ziyaret istatistikleri için analiz çerezlerini yalnızca onayınızla kullanırız."
              : "We store strictly necessary preferences (theme, RFQ list) on your device. Analytics cookies are used only with your consent."}{" "}
            <Link href={href(locale, routes[locale].privacy)} className="text-accent underline underline-offset-4">
              {tr ? "Ayrıntılar" : "Details"}
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => save(true)} className="h-11 rounded-full sm:flex-1 bg-ink px-5 text-sm font-medium text-bg">
              {tr ? "Analiz çerezlerini kabul et" : "Accept analytics"}
            </button>
            <button type="button" onClick={() => save(false)} className="h-11 rounded-full sm:flex-1 border border-line-strong px-5 text-sm font-medium text-ink">
              {tr ? "Yalnızca zorunlu" : "Necessary only"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
