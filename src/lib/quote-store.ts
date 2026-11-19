"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type QuoteItem = {
  key: string;
  name: string;
  category: string;
  href: string;
  quantity: string;
  unit: "adet" | "m²" | "kg" | "rulo" | "paket" | "ton" | "m";
  specs: string;
};

type QuoteState = {
  items: QuoteItem[];
  add: (item: Omit<QuoteItem, "quantity" | "unit" | "specs"> & Partial<QuoteItem>) => void;
  remove: (key: string) => void;
  update: (key: string, patch: Partial<QuoteItem>) => void;
  clear: () => void;
  has: (key: string) => boolean;
};

/**
 * RFQ list. Kept per site (TR / global) in localStorage — a convenience only; nothing is sent
 * until the visitor submits the form.
 */
export const createQuoteStore = (name: string) =>
  create<QuoteState>()(
    persist(
      (set, get) => ({
        items: [],
        add: (item) =>
          set((s) =>
            s.items.some((i) => i.key === item.key)
              ? s
              : { items: [...s.items, { quantity: "", unit: "adet", specs: "", ...item }] },
          ),
        remove: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
        update: (key, patch) => set((s) => ({ items: s.items.map((i) => (i.key === key ? { ...i, ...patch } : i)) })),
        clear: () => set({ items: [] }),
        has: (key) => get().items.some((i) => i.key === key),
      }),
      {
        name,
        storage: createJSONStorage(() => {
          try {
            return localStorage;
          } catch {
            return sessionStorage;
          }
        }),
        skipHydration: true,
      },
    ),
  );

export const useQuoteTr = createQuoteStore("ares-quote-tr");
export const useQuoteEn = createQuoteStore("ares-quote-en");
export const quoteStore = (locale: "tr" | "en") => (locale === "tr" ? useQuoteTr : useQuoteEn);
