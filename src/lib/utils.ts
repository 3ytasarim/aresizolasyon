import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom type scale so `text-h2` is not dropped next to `text-ink`.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["display", "h1", "h2", "h3"] }] } },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Capitalise the first letter with Turkish rules (i → İ). */
export const capTr = (s: string) => (s ? s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1) : s);

export const truncate = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
