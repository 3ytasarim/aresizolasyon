import { FileClock } from "lucide-react";

export function DraftBanner({ text, code }: { text: string; code?: string }) {
  return (
    <div role="note" className="flex items-start gap-3 rounded-xl border border-dashed border-bronze/60 bg-accent-soft/60 px-4 py-3 text-sm text-ink-2">
      <FileClock aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
      <p>
        {text}
        {code && <span className="ml-2 rounded bg-elev px-1.5 py-0.5 font-mono text-xs text-ink-3">{code}</span>}
      </p>
    </div>
  );
}
