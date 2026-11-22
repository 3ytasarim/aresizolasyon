import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, className, tone = "default" }: { items: Crumb[]; className?: string; tone?: "default" | "on-dark" }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={tone === "on-dark" ? "text-on-graphite" : "text-ink"}>{it.name}</span>
              ) : (
                <Link href={it.href} className={cn("inline-flex min-h-8 items-center underline-offset-4 hover:underline", tone === "on-dark" ? "text-on-graphite-2" : "text-ink-3")}>
                  {it.name}
                </Link>
              )}
              {!last && <ChevronRight aria-hidden className={cn("size-3.5", tone === "on-dark" ? "text-on-graphite-2" : "text-ink-3")} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
