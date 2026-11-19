/**
 * Brand illustrations for the catalogue. No product photography exists yet, so each category
 * gets an abstract, material-specific SVG in the logo palette (graphite planes + copper heat).
 * Deterministic (seeded) so server and client render identically. No grid/dot patterns.
 */
import { cn } from "@/lib/utils";

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

type Kind =
  | "seramik-elyaf-urunleri"
  | "refrakter-beton-ve-harclar"
  | "refrakter-ve-izolasyon-tuglalari"
  | "yuksek-sicaklik-izolasyon-plakalari"
  | "refrakter-ankraj-sistemleri"
  | "refrakter-yardimci-malzemeler"
  | "teknik-izolasyon-ve-muhendislik-malzemeleri"
  | "seramik-ve-cam-firin-malzemeleri"
  | "dokumhane-malzemeleri";

export function MaterialArt({ kind, seed = 1, className, glow = true }: { kind: string; seed?: number; className?: string; glow?: boolean }) {
  const r = rng(seed * 9301 + kind.length * 49297);
  const id = `ma-${kind.slice(0, 6)}-${seed}`;
  return (
    <svg viewBox="0 0 400 300" className={cn("h-full w-full", className)} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a292d" />
          <stop offset="1" stopColor="#141316" />
        </linearGradient>
        <radialGradient id={`${id}-heat`} cx="0.75" cy="0.25" r="0.75">
          <stop offset="0" stopColor="#e39a66" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#a0572a" stopOpacity="0.18" />
          <stop offset="1" stopColor="#a0572a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-cu`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0b68a" />
          <stop offset="0.5" stopColor="#c27240" />
          <stop offset="1" stopColor="#7b3f25" />
        </linearGradient>
        <linearGradient id={`${id}-gr`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6a6a6d" />
          <stop offset="1" stopColor="#2b2b2f" />
        </linearGradient>
        <linearGradient id={`${id}-iv`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f2ea" />
          <stop offset="1" stopColor="#d9d1c4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      {glow && <rect width="400" height="300" fill={`url(#${id}-heat)`} className="animate-ember" />}
      <Scene kind={kind as Kind} r={r} id={id} />
    </svg>
  );
}

function Scene({ kind, r, id }: { kind: Kind; r: () => number; id: string }) {
  switch (kind) {
    case "seramik-elyaf-urunleri": {
      // fluffy fibre strands over a rolled blanket
      const strands = Array.from({ length: 70 }, (_, i) => {
        const y = 70 + r() * 170;
        const x = -20 + r() * 80;
        const c1 = y + (r() - 0.5) * 80;
        const c2 = y + (r() - 0.5) * 80;
        return (
          <path key={i} d={`M${x} ${y} C ${120 + r() * 40} ${c1}, ${240 + r() * 40} ${c2}, ${420} ${y + (r() - 0.5) * 40}`}
            stroke={i % 9 === 0 ? "#e2a77c" : "#efe8dc"} strokeOpacity={0.12 + r() * 0.35} strokeWidth={0.6 + r() * 1.4} fill="none" />
        );
      });
      return (
        <g>
          {strands}
          <ellipse cx="300" cy="215" rx="58" ry="58" fill={`url(#${id}-iv)`} opacity="0.92" />
          {[48, 38, 28, 18, 9].map((rr, i) => (
            <ellipse key={rr} cx="300" cy="215" rx={rr} ry={rr} fill="none" stroke={i === 2 ? "#c27240" : "#b9b0a2"} strokeWidth={i === 2 ? 2 : 1.2} opacity="0.85" />
          ))}
        </g>
      );
    }
    case "refrakter-beton-ve-harclar": {
      const stones = Array.from({ length: 46 }, (_, i) => {
        const cx = r() * 400, cy = 120 + r() * 180, s = 4 + r() * 16;
        return <ellipse key={i} cx={cx} cy={cy} rx={s} ry={s * (0.6 + r() * 0.4)} transform={`rotate(${r() * 180} ${cx} ${cy})`}
          fill={i % 6 === 0 ? `url(#${id}-cu)` : "#8d8a85"} opacity={0.35 + r() * 0.5} />;
      });
      return (
        <g>
          <path d="M0 150 C 90 120, 180 170, 260 140 S 380 120, 400 135 L400 300 L0 300 Z" fill="#3a393d" />
          {stones}
          <path d="M0 150 C 90 120, 180 170, 260 140 S 380 120, 400 135" stroke="#e2a77c" strokeWidth="2" fill="none" opacity="0.7" />
        </g>
      );
    }
    case "refrakter-ve-izolasyon-tuglalari":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${70 + i * 34} ${190 - i * 52})`}>
              <path d="M0 40 L150 40 L210 10 L60 10 Z" fill={i === 1 ? `url(#${id}-cu)` : "#cfc7ba"} opacity={i === 1 ? 0.95 : 0.85} />
              <path d="M0 40 L150 40 L150 78 L0 78 Z" fill={i === 1 ? "#8a4724" : "#9c968c"} />
              <path d="M150 40 L210 10 L210 48 L150 78 Z" fill={i === 1 ? "#5e3019" : "#6f6a62"} />
            </g>
          ))}
        </g>
      );
    case "yuksek-sicaklik-izolasyon-plakalari":
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${60 + i * 26} ${70 + i * 34})`}>
              <path d="M0 30 L190 30 L250 0 L60 0 Z" fill={i === 3 ? `url(#${id}-cu)` : i % 2 ? "#e8e1d5" : "#bdb5a8"} />
              <path d="M0 30 L190 30 L190 42 L0 42 Z" fill={i === 3 ? "#7b3f25" : "#7b766e"} />
              <path d="M190 30 L250 0 L250 12 L190 42 Z" fill="#4f4b46" />
            </g>
          ))}
        </g>
      );
    case "refrakter-ankraj-sistemleri":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="0" y="236" width="400" height="64" fill="#3b3a3e" />
          {[80, 170, 260, 340].map((x, i) => (
            <g key={x} stroke={i === 1 ? `url(#${id}-cu)` : "#c9c5bc"} strokeWidth="7">
              <path d={`M${x} 236 L${x} 150 L${x - 34} 92`} />
              <path d={`M${x} 150 L${x + 34} 92`} />
            </g>
          ))}
        </g>
      );
    case "refrakter-yardimci-malzemeler": {
      const fibres = Array.from({ length: 90 }, (_, i) => {
        const x = 30 + r() * 340, y = 60 + r() * 200, a = r() * Math.PI, l = 10 + r() * 26;
        return <line key={i} x1={x} y1={y} x2={x + Math.cos(a) * l} y2={y + Math.sin(a) * l}
          stroke={i % 5 === 0 ? "#e2a77c" : "#cfc9be"} strokeWidth={i % 3 === 0 ? 2.2 : 1.2} strokeOpacity={0.4 + r() * 0.5} strokeLinecap="round" />;
      });
      return <g>{fibres}</g>;
    }
    case "teknik-izolasyon-ve-muhendislik-malzemeleri":
      return (
        <g fill="none">
          <circle cx="200" cy="160" r="92" stroke="#d9d1c4" strokeWidth="26" opacity="0.9" />
          <circle cx="200" cy="160" r="92" stroke={`url(#${id}-cu)`} strokeWidth="6" strokeDasharray="18 10" />
          <circle cx="200" cy="160" r="54" stroke="#6a6a6d" strokeWidth="2" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <circle key={i} cx={200 + Math.cos(a) * 128} cy={160 + Math.sin(a) * 128} r="7" fill="#8d8a85" />;
          })}
        </g>
      );
    case "seramik-ve-cam-firin-malzemeleri":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(0 ${80 + i * 40})`}>
              <rect x="30" y="0" width="340" height="22" rx="11" fill={i === 2 ? `url(#${id}-cu)` : `url(#${id}-iv)`} opacity={i === 2 ? 1 : 0.85 - i * 0.08} />
              <ellipse cx="370" cy="11" rx="6" ry="11" fill={i === 2 ? "#7b3f25" : "#9c968c"} />
            </g>
          ))}
        </g>
      );
    case "dokumhane-malzemeleri":
      return (
        <g>
          <path d="M120 120 L280 120 L262 250 Q200 270 138 250 Z" fill={`url(#${id}-gr)`} />
          <ellipse cx="200" cy="120" rx="80" ry="18" fill="#2b2b2f" stroke="#8d8a85" strokeWidth="3" />
          <ellipse cx="200" cy="122" rx="66" ry="12" fill={`url(#${id}-cu)`} className="animate-ember" />
          <path d="M268 112 Q300 100 318 140 Q326 170 322 300" stroke="#f0b68a" strokeWidth="5" fill="none" opacity="0.8" />
        </g>
      );
    default:
      return null;
  }
}
