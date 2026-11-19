"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, ClipboardList, Moon, Plus, Sun } from "lucide-react";
import { quoteStore } from "@/lib/quote-store";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

/** Rehydrates the persisted RFQ list once per page (store uses skipHydration to avoid SSR mismatch). */
export function QuoteHydrator({ locale }: { locale: Locale }) {
  useEffect(() => {
    void quoteStore(locale).persist.rehydrate();
  }, [locale]);
  return null;
}

export function QuoteBadge({ locale, href, label, className }: { locale: Locale; href: string; label: string; className?: string }) {
  const count = quoteStore(locale)((s) => s.items.length);
  return (
    <Link href={href} className={cn("relative inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-sunken", className)}>
      <ClipboardList aria-hidden className="size-[1.15rem]" />
      <span className="sr-only">{label}{count ? ` (${count})` : ""}</span>
      {count > 0 && (
        <span aria-hidden className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-5 text-accent-ink">
          {count}
        </span>
      )}
    </Link>
  );
}

export function AddToQuote({
  locale, item, labels, size = "md", className, location,
}: {
  locale: Locale;
  item: { key: string; name: string; category: string; href: string };
  labels: { add: string; added: string };
  size?: "sm" | "md" | "lg";
  className?: string;
  location: string;
}) {
  const store = quoteStore(locale);
  const inList = store((s) => s.items.some((i) => i.key === item.key));
  const add = store((s) => s.add);
  const remove = store((s) => s.remove);
  return (
    <button
      type="button"
      aria-pressed={inList}
      onClick={() => {
        if (inList) {
          remove(item.key);
          track({ event: "remove_from_quote", item_key: item.key });
        } else {
          add(item);
          track({ event: "add_to_quote", item_key: item.key, item_category: item.category, location });
        }
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]",
        size === "sm" ? "h-10 px-4 text-sm" : size === "lg" ? "h-14 px-7 text-base" : "h-12 px-6 text-[0.95rem]",
        inList ? "border border-accent bg-accent-soft text-accent" : "bg-accent text-accent-ink hover:bg-accent-hover",
        className,
      )}
    >
      {inList ? <Check aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4" />}
      {inList ? labels.added : labels.add}
    </button>
  );
}

// ───────────────────────── theme ─────────────────────────

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

export function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme ?? "light", () => "light");
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("ares-theme", next);
        } catch {}
      }}
      className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-sunken"
      aria-label={next === "dark" ? labels.dark : labels.light}
    >
      <Sun aria-hidden className="hidden size-[1.1rem] dark:block" />
      <Moon aria-hidden className="size-[1.1rem] dark:hidden" />
    </button>
  );
}

/** Pre-paint theme script (inline in <head>) — avoids a flash of the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem('ares-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;

/** Scroll-depth events (25/50/75/100). */
export function ScrollDepth() {
  const [fired] = useState(() => new Set<number>());
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = ((h.scrollTop + innerHeight) / h.scrollHeight) * 100;
      for (const p of [25, 50, 75, 100] as const) {
        if (pct >= p - 1 && !fired.has(p)) {
          fired.add(p);
          track({ event: "scroll_depth", percent: p });
        }
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [fired]);
  return null;
}
