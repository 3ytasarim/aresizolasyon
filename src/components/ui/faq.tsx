import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";

/** Native <details> accordion: accessible, works without JS, matches FAQPage JSON-LD. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-4 text-left text-[1.05rem] font-medium text-ink">
            <h3 className="font-sans text-[1.05rem] font-medium tracking-normal">{f.q}</h3>
            <Plus aria-hidden className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="pb-6 pr-10 text-ink-2 leading-relaxed whitespace-pre-line">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
