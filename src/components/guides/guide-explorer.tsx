"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type GuideItem = {
  code: string;
  title: string;
  summary: string;
  href: string;
  kind: "technical" | "sector";
  categoryKey: string;
  categoryName: string;
  sectorKey: string | null;
  sectorName: string | null;
  minutes: number;
};

const PAGE = 24;

export function GuideExplorer({ items, categories, sectors }: {
  items: GuideItem[];
  categories: { key: string; name: string; count: number }[];
  sectors: { key: string; name: string; count: number }[];
}) {
  const [kind, setKind] = useState<"all" | "technical" | "sector">("all");
  const [cat, setCat] = useState("all");
  const [sector, setSector] = useState("all");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const dq = useDeferredValue(q);

  // Deep links: /teknik-rehber/?kategori=…  or  ?sektor=…  or  ?q=…
  // Runs once after hydration: the static page cannot know the query string at build time.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const k = sp.get("kategori");
    const s = sp.get("sektor");
    const query = sp.get("q");
    if (k && categories.some((c) => c.key === k)) setCat(k);
    if (s && sectors.some((x) => x.key === s)) { setKind("sector"); setSector(s); }
    if (query) setQ(query);
  }, [categories, sectors]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const fuse = useMemo(
    () => new Fuse(items, { keys: [{ name: "title", weight: 3 }, { name: "summary", weight: 1 }, { name: "categoryName", weight: 1 }, { name: "sectorName", weight: 1 }, { name: "code", weight: 2 }], threshold: 0.38, ignoreLocation: true }),
    [items],
  );

  const list = useMemo(() => {
    const base = dq.trim().length > 1 ? fuse.search(dq.trim()).map((r) => r.item) : items;
    return base.filter(
      (g) => (kind === "all" || g.kind === kind) && (cat === "all" || g.categoryKey === cat) && (sector === "all" || g.sectorKey === sector),
    );
  }, [fuse, items, dq, kind, cat, sector]);

  // Back to the first page whenever the filter changes.
  const filterKey = `${dq}|${kind}|${cat}|${sector}`;
  const [seenFilter, setSeenFilter] = useState(filterKey);
  if (seenFilter !== filterKey) {
    setSeenFilter(filterKey);
    setLimit(PAGE);
  }
  useEffect(() => {
    if (dq.trim().length < 3) return;
    const id = setTimeout(() => track({ event: "guide_search", query: dq.trim(), results: list.length }), 800);
    return () => clearTimeout(id);
  }, [dq, list.length]);

  const chip = (active: boolean) =>
    cn("inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors", active ? "border-ink bg-ink text-bg" : "border-line text-ink-2 hover:border-line-strong hover:text-ink");

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <span className="sr-only">Rehberlerde ara</span>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Konu ara: yoğunluk, ankraj, TDS, yangın kapısı…"
            className="h-12 w-full rounded-full border border-line bg-elev pl-11 pr-10 text-base text-ink sm:text-[0.95rem] placeholder:text-ink-3 focus:border-accent focus:outline-none"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-sunken" aria-label="Aramayı temizle">
              <X aria-hidden className="size-4" />
            </button>
          )}
        </label>
        <div role="tablist" aria-label="Rehber türü" className="inline-flex rounded-full border border-line bg-elev p-1">
          {([["all", "Tümü"], ["technical", "Ürün rehberleri"], ["sector", "Sektörel rehberler"]] as const).map(([k, l]) => (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => { setKind(k); if (k !== "sector") setSector("all"); track({ event: "guide_filter", filter: "kind", value: k }); }}
              className={cn("h-10 rounded-full px-4 text-sm transition-colors", kind === k ? "bg-accent text-accent-ink" : "text-ink-2 hover:text-ink")}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0" aria-label="Kategori filtresi">
        <button type="button" aria-pressed={cat === "all"} className={chip(cat === "all")} onClick={() => setCat("all")}>Tüm kategoriler</button>
        {categories.map((c) => (
          <button key={c.key} type="button" aria-pressed={cat === c.key} className={chip(cat === c.key)} onClick={() => { setCat(c.key); track({ event: "guide_filter", filter: "category", value: c.key }); }}>
            {c.name} <span className="font-mono text-xs opacity-60">{c.count}</span>
          </button>
        ))}
      </div>

      {kind === "sector" && (
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0" aria-label="Sektör filtresi">
          <button type="button" aria-pressed={sector === "all"} className={chip(sector === "all")} onClick={() => setSector("all")}>Tüm sektörler</button>
          {sectors.map((s) => (
            <button key={s.key} type="button" aria-pressed={sector === s.key} className={chip(sector === s.key)} onClick={() => { setSector(s.key); track({ event: "guide_filter", filter: "sector", value: s.key }); }}>
              {s.name} <span className="font-mono text-xs opacity-60">{s.count}</span>
            </button>
          ))}
        </div>
      )}

      <p className="mt-8 text-sm text-ink-3" aria-live="polite">{list.length} rehber</p>
      {list.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-line p-10 text-center text-ink-3">Bu filtrelerle eşleşen rehber yok. Sorunuzu teklif formunda iletebilirsiniz; teknik ekip yanıtlar.</p>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.slice(0, limit).map((g) => (
            <li key={g.code} className="card card-hover group relative flex flex-col p-6">
              <div className="flex items-center gap-2 text-xs text-ink-3">
                <span className={cn("rounded-full px-2.5 py-1 font-mono", g.kind === "sector" ? "bg-accent-soft text-accent" : "bg-sunken")}>{g.code}</span>
                <span className="truncate">{g.kind === "sector" ? g.sectorName : g.categoryName}</span>
              </div>
              <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-ink">
                <Link href={g.href} className="after:absolute after:inset-0 after:content-['']">{g.title}</Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-3">{g.summary}</p>
              <p className="mt-auto pt-5 text-xs text-ink-3">{g.minutes} dk okuma</p>
            </li>
          ))}
        </ul>
      )}
      {list.length > limit && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="h-12 rounded-full border border-line px-6 text-sm font-medium text-ink hover:border-line-strong hover:bg-sunken">
            Daha fazla göster ({list.length - limit})
          </button>
        </div>
      )}
    </div>
  );
}
