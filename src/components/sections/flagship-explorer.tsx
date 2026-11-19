"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AddToQuote } from "@/components/layout/client-bits";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export type FlagshipItem = {
  key: string;
  name: string;
  href: string;
  definition: string;
  useAreas: string;
  params: string[];
};

export function FlagshipExplorer({ items, locale, category, labels }: {
  items: FlagshipItem[];
  locale: Locale;
  category: string;
  labels: { add: string; added: string; view: string; useAreas: string; params: string };
}) {
  const [active, setActive] = useState(0);
  const base = useId();
  const it = items[active]!;
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div role="tablist" aria-orientation="vertical" aria-label={category} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
        {items.map((p, i) => (
          <button
            key={p.key}
            role="tab"
            id={`${base}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-p`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setActive((active + 1) % items.length); }
              if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setActive((active - 1 + items.length) % items.length); }
            }}
            className={cn(
              "group flex min-h-12 shrink-0 items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-colors lg:min-h-14",
              i === active ? "bg-on-graphite/[0.08] text-on-graphite" : "text-on-graphite-2 hover:bg-on-graphite/[0.04] hover:text-on-graphite",
            )}
          >
            <span className="flex items-center gap-3">
              <span className={cn("hidden font-mono text-xs lg:inline", i === active ? "text-bronze" : "opacity-50")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="whitespace-nowrap text-[0.95rem] font-medium lg:whitespace-normal lg:text-base">{p.name}</span>
            </span>
            <span aria-hidden className={cn("hidden h-px w-8 transition-all lg:block", i === active ? "w-12 bg-bronze" : "bg-on-graphite/20")} />
          </button>
        ))}
      </div>
      <div id={`${base}-p`} role="tabpanel" aria-labelledby={`${base}-t${active}`} className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 lg:col-span-7 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={it.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <h3 className="text-h3 font-semibold text-on-graphite">{it.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-on-graphite-2">{it.definition}</p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-bronze">{labels.useAreas}</dt>
                <dd className="mt-2 leading-relaxed text-on-graphite">{it.useAreas}</dd>
              </div>
              <div>
                <dt className="eyebrow text-bronze">{labels.params}</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {it.params.map((p) => (
                    <span key={p} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-on-graphite-2">{p}</span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <AddToQuote locale={locale} location="home_flagship" item={{ key: it.key, name: it.name, category, href: it.href }} labels={{ add: labels.add, added: labels.added }} />
              <Link href={it.href} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-[0.95rem] font-medium text-on-graphite transition-colors hover:bg-white/10">
                {labels.view} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
