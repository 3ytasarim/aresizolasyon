"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Flame, Search, X } from "lucide-react";
import { AddToQuote } from "@/components/layout/client-bits";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export type CatalogItem = { key: string; name: string; alt: string; definition: string; href: string; categoryKey: string; categoryName: string; flagship: boolean; n: number };
export type CatalogCategory = { key: string; name: string; count: number };

const norm = (s: string) => s.toLocaleLowerCase("tr-TR").normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

export function CatalogExplorer({ items, categories, locale, labels, initialCategory }: {
  items: CatalogItem[];
  categories: CatalogCategory[];
  locale: Locale;
  initialCategory?: string;
  labels: { all: string; search: string; add: string; added: string; empty: string; results: string };
}) {
  const [cat, setCat] = useState<string>(initialCategory ?? "all");
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);
  const list = useMemo(() => {
    const nq = norm(dq.trim());
    return items.filter((i) => (cat === "all" || i.categoryKey === cat) && (!nq || norm(`${i.name} ${i.alt} ${i.definition} ${i.categoryName}`).includes(nq)));
  }, [items, cat, dq]);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <label className="relative block">
            <span className="sr-only">{labels.search}</span>
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={labels.search}
              className="h-12 w-full rounded-full border border-line bg-elev pl-11 pr-10 text-[0.95rem] text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-sunken" aria-label="Temizle">
                <X aria-hidden className="size-4" />
              </button>
            )}
          </label>
          <div role="radiogroup" aria-label={labels.all} className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
            {[{ key: "all", name: labels.all, count: items.length }, ...categories].map((c) => (
              <button
                key={c.key}
                role="radio"
                aria-checked={cat === c.key}
                onClick={() => {
                  setCat(c.key);
                  track({ event: "catalog_filter", value: c.key });
                }}
                className={cn(
                  "flex min-h-11 shrink-0 items-center justify-between gap-3 rounded-full border px-4 text-left text-sm transition-colors lg:rounded-xl lg:border-transparent",
                  cat === c.key ? "border-ink bg-ink text-bg lg:border-transparent" : "border-line text-ink-2 hover:bg-sunken hover:text-ink",
                )}
              >
                <span className="flex items-center gap-2 whitespace-nowrap lg:whitespace-normal">
                  {c.key === "seramik-elyaf-urunleri" && <Flame aria-hidden className={cn("size-3.5", cat === c.key ? "text-bronze" : "text-accent")} />}
                  {c.name}
                </span>
                <span className={cn("font-mono text-xs", cat === c.key ? "opacity-70" : "text-ink-3")}>{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
      <div className="lg:col-span-9">
        <p className="mb-5 text-sm text-ink-3" aria-live="polite">{list.length} {labels.results}</p>
        {list.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line p-10 text-center text-ink-3">{labels.empty}</p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-elev">
            {list.map((i) => (
              <li key={i.key} className="group relative grid gap-4 p-5 transition-colors hover:bg-sunken/60 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-6 sm:p-6">
                <span className="hidden font-mono text-xs text-ink-3 sm:block">{String(i.n).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-3">
                    {i.flagship && <Flame aria-hidden className="size-3 text-accent" />}
                    {i.categoryName}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">
                    <Link href={i.href} className="after:absolute after:inset-0 after:content-['']">{i.name}</Link>
                    <span className="ml-2 text-sm font-normal text-ink-3" lang={locale === "tr" ? "en" : "tr"}>{i.alt}</span>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-3">{i.definition}</p>
                </div>
                <div className="relative z-10">
                  <AddToQuote locale={locale} size="sm" location="catalog" item={{ key: i.key, name: i.name, category: i.categoryName, href: i.href }} labels={{ add: labels.add, added: labels.added }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
