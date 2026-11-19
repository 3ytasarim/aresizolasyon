"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { quoteStore } from "@/lib/quote-store";
import { track } from "@/lib/analytics";
import { buttonClass } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

/** Adds the item (if missing) and goes straight to the RFQ form — the fastest path to a lead. */
export function QuoteNow({ locale, item, label, quoteHref, variant = "secondary", className, location }: {
  locale: Locale;
  item: { key: string; name: string; category: string; href: string };
  label: string;
  quoteHref: string;
  variant?: "secondary" | "on-dark" | "ghost";
  className?: string;
  location: string;
}) {
  const store = quoteStore(locale);
  const router = useRouter();
  return (
    <button
      type="button"
      className={buttonClass(variant, "md", className)}
      onClick={() => {
        if (!store.getState().has(item.key)) store.getState().add(item);
        track({ event: "cta_click", cta_id: "quote_now", location });
        router.push(`${quoteHref}#form`);
      }}
    >
      {label} <ArrowRight aria-hidden className="size-4" />
    </button>
  );
}
