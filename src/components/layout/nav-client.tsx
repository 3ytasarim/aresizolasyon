"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Flame, Menu as MenuIcon, X } from "lucide-react";
import type { Menu } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Labels = {
  products: string; sectors: string; guides: string; about: string; contact: string;
  allProducts: string; flagship: string; menu: string; close: string; requestQuote: string; viewCategory: string;
};
type Links = { products: string; sectors: string; guides: string; about: string; contact: string; quote: string };

const EASE = [0.16, 1, 0.3, 1] as const;

export function DesktopNav({ menu, labels, links }: { menu: Menu; labels: Labels; links: Links }) {
  const [open, setOpen] = useState<null | "products" | "sectors">(null);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on route change (state reset during render, not in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(null);
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onDown = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(null);
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onDown);
    };
  }, []);

  const hover = (v: typeof open) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setOpen(v);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      closeTimer.current = setTimeout(() => setOpen(null), 140);
    },
  });

  const flagship = menu.categories.find((c) => c.flagship)!;
  const others = menu.categories.filter((c) => !c.flagship);
  const linkCls = "relative inline-flex h-11 items-center gap-1 rounded-full px-3.5 text-[0.95rem] text-ink-2 transition-colors hover:text-ink";

  return (
    <div ref={ref} className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        <li {...hover("products")}>
          <button type="button" className={cn(linkCls, open === "products" && "text-ink")} aria-expanded={open === "products"} aria-controls="mega-products" onClick={() => setOpen(open === "products" ? null : "products")}>
            {labels.products}
            <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-300", open === "products" && "rotate-180")} />
          </button>
        </li>
        <li {...hover("sectors")}>
          <button type="button" className={cn(linkCls, open === "sectors" && "text-ink")} aria-expanded={open === "sectors"} aria-controls="mega-sectors" onClick={() => setOpen(open === "sectors" ? null : "sectors")}>
            {labels.sectors}
            <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-300", open === "sectors" && "rotate-180")} />
          </button>
        </li>
        <li><Link className={linkCls} href={links.guides}>{labels.guides}</Link></li>
        <li><Link className={linkCls} href={links.about}>{labels.about}</Link></li>
        <li><Link className={linkCls} href={links.contact}>{labels.contact}</Link></li>
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            id={open === "products" ? "mega-products" : "mega-sectors"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-line bg-bg/95 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] backdrop-blur-xl"
            {...hover(open)}
          >
            {open === "products" ? (
              <div className="container-x grid grid-cols-12 gap-8 py-8">
                <Link href={flagship.href} className="group relative col-span-4 overflow-hidden rounded-2xl bg-graphite p-7 text-on-graphite">
                  <div aria-hidden className="heat-glow absolute inset-0 opacity-90" />
                  <div className="relative">
                    <p className="eyebrow inline-flex items-center gap-1.5 text-bronze"><Flame className="size-3.5" />{labels.flagship}</p>
                    <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">{flagship.name}</p>
                    <ul className="mt-5 grid grid-cols-1 gap-1.5 text-sm text-on-graphite-2">
                      {flagship.products.map((p) => <li key={p.key}>{p.name}</li>)}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bronze">
                      {labels.viewCategory} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
                <div className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-7">
                  {others.map((c) => (
                    <div key={c.key}>
                      <Link href={c.href} className="text-[0.95rem] font-semibold text-ink hover:text-accent">{c.name}</Link>
                      <ul className="mt-2.5 space-y-1.5">
                        {c.products.map((p) => (
                          <li key={p.key}><Link href={p.href} className="text-sm text-ink-3 transition-colors hover:text-ink">{p.name}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 flex items-center justify-between border-t border-line pt-5">
                    <Link href={links.products} className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                      {labels.allProducts} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container-x grid grid-cols-3 gap-3 py-8">
                {menu.sectors.map((s) => (
                  <Link key={s.key} href={s.href} className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 text-ink-2 transition-colors hover:border-line hover:bg-elev hover:text-ink">
                    {s.name}
                    <ArrowRight aria-hidden className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileNav({ menu, labels, links }: { menu: Menu; labels: Labels; links: Links }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>("seramik-elyaf-urunleri");
  const pathname = usePathname();
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  // true only on the client after hydration — no effect, no hydration mismatch.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // The overlay is portalled to <body>: the sticky header uses backdrop-filter, which makes it the
  // containing block for position:fixed children and would clip a full-screen menu to the header height.
  const overlay = (
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={labels.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex flex-col bg-bg"
          >
            <div className="container-x flex h-[4.5rem] shrink-0 items-center justify-end border-b border-line">
              <button type="button" onClick={() => setOpen(false)} className="inline-flex size-11 items-center justify-center rounded-full border border-line" autoFocus>
                <X aria-hidden className="size-5" />
                <span className="sr-only">{labels.close}</span>
              </button>
            </div>
            <nav className="container-x flex-1 overflow-y-auto py-6">
              <p className="eyebrow mb-3">{labels.products}</p>
              <ul className="divide-y divide-line border-y border-line">
                {menu.categories.map((c) => (
                  <li key={c.key}>
                    <button type="button" className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-[1.05rem] font-medium text-ink" aria-expanded={section === c.key} onClick={() => setSection(section === c.key ? null : c.key)}>
                      <span className="flex items-center gap-2">
                        {c.flagship && <Flame aria-hidden className="size-4 text-accent" />}
                        {c.name}
                      </span>
                      <ChevronDown aria-hidden className={cn("size-5 text-ink-3 transition-transform", section === c.key && "rotate-180")} />
                    </button>
                    {section === c.key && (
                      <ul className="pb-4 pl-1">
                        <li><Link href={c.href} className="flex min-h-11 items-center text-accent font-medium">{labels.viewCategory} →</Link></li>
                        {c.products.map((p) => (
                          <li key={p.key}><Link href={p.href} className="flex min-h-11 items-center text-ink-2">{p.name}</Link></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-1 text-lg">
                {[
                  [labels.sectors, links.sectors],
                  [labels.guides, links.guides],
                  [labels.about, links.about],
                  [labels.contact, links.contact],
                ].map(([l, h]) => (
                  <li key={h}><Link href={h!} className="flex min-h-12 items-center font-medium text-ink">{l}</Link></li>
                ))}
              </ul>
            </nav>
            <div className="container-x shrink-0 border-t border-line py-4">
              <Link href={links.quote} className="flex h-14 w-full items-center justify-center rounded-full bg-accent font-medium text-accent-ink">
                {labels.requestQuote}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink">
        <MenuIcon aria-hidden className="size-5" />
        <span className="sr-only">{labels.menu}</span>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}

const noopSubscribe = () => () => {};
