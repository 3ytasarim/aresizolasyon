"use client";

/**
 * Event taxonomy (docs/ANALYTICS_PLAN.md). Pushes to window.dataLayer; GA4 / GTM / Clarity pick it
 * up only after the visitor accepts analytics cookies (see components/consent).
 */
export type AresEvent =
  | { event: "cta_click"; cta_id: string; location: string }
  | { event: "add_to_quote"; item_key: string; item_category: string; location: string }
  | { event: "remove_from_quote"; item_key: string }
  | { event: "quote_step"; step: number }
  | { event: "quote_submit"; items: number; has_files: boolean }
  | { event: "quote_error"; reason: string }
  | { event: "guide_search"; query: string; results: number }
  | { event: "guide_filter"; filter: string; value: string }
  | { event: "catalog_filter"; value: string }
  | { event: "site_switch"; to: "tr" | "en" }
  | { event: "scroll_depth"; percent: 25 | 50 | 75 | 100 };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(e: AresEvent) {
  if (typeof window === "undefined") return;
  (window.dataLayer ??= []).push({ ...e, site: document.documentElement.lang });
}
