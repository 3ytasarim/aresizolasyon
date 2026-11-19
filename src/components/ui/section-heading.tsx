import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, lead, align = "left", className, as: As = "h2", tone = "default", action }: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; align?: "left" | "center"; className?: string; as?: "h1" | "h2"; tone?: "default" | "on-dark"; action?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", align === "center" && "items-center text-center md:flex-col md:items-center", className)}>
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow mb-4", tone === "on-dark" && "text-bronze")}>{eyebrow}</p>}
        <As className={cn("text-h2 font-semibold", tone === "on-dark" ? "text-on-graphite" : "text-ink")}>{title}</As>
        {lead && <p className={cn("mt-5 text-lg leading-relaxed", tone === "on-dark" ? "text-on-graphite-2" : "text-ink-2")}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}
