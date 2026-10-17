import type { ReactNode } from "react";

/** Pixel "checkered-flag H" mark from the mockups. */
export function LogoMark({ className = "size-11" }: { className?: string }) {
  // 6×6 grid; 1 = white, 2 = magenta.
  const cells = [
    "1 0 1 2 0 2",
    "1 1 0 1 2 0",
    "0 1 1 0 1 2",
    "1 0 1 1 0 1",
    "2 1 0 1 1 0",
    "0 2 1 0 1 1",
  ].map((r) => r.split(" ").map(Number));
  return (
    <svg viewBox="0 0 6 6" className={className} shapeRendering="crispEdges" aria-hidden>
      {cells.flatMap((row, y) =>
        row.map((v, x) =>
          v ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={v === 1 ? "#fffaf3" : "#fa6027"} /> : null,
        ),
      )}
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="size-10 drop-shadow-[0_0_8px_rgba(250,96,39,0.5)] md:size-11" />
      <span className="flex flex-col font-display leading-none">
        <span className="text-[11px] font-semibold tracking-[0.18em] md:text-xs">
          <span className="text-magenta">HACK</span> <span className="text-frost">THE</span>
        </span>
        <span className="mt-1 text-lg font-bold tracking-[0.08em] text-frost md:text-xl">FASHION</span>
      </span>
    </span>
  );
}

/** Small "+" crosshair used at frame corners. */
export function Plus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-6 text-violet ${className}`} aria-hidden>
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** L-shaped corner brackets around a box. */
export function Brackets({ color = "border-violet", size = "size-4" }: { color?: string; size?: string }) {
  const b = `pointer-events-none absolute ${size} ${color}`;
  return (
    <>
      <span aria-hidden className={`${b} -left-px -top-px border-l-2 border-t-2`} />
      <span aria-hidden className={`${b} -right-px -top-px border-r-2 border-t-2`} />
      <span aria-hidden className={`${b} -bottom-px -left-px border-b-2 border-l-2`} />
      <span aria-hidden className={`${b} -bottom-px -right-px border-b-2 border-r-2`} />
    </>
  );
}

/** Mono HUD label. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${className}`}>{children}</span>;
}

/** Stacked HUD word list with a coloured rule on one side. */
export function WordStack({
  words,
  align = "left",
  className = "",
  rule = true,
}: {
  words: string[];
  align?: "left" | "right";
  className?: string;
  rule?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 font-ui text-[12px] font-medium uppercase leading-tight tracking-[0.22em] text-frost/80 ${
        rule ? (align === "left" ? "border-l-2 border-violet pl-3" : "border-r-2 border-magenta pr-3") : ""
      } ${align === "right" ? "text-right" : ""} ${className}`}
    >
      {words.map((w) => (
        <span key={w}>{w}</span>
      ))}
    </div>
  );
}

/** Procedural fabric texture (SVG turbulence), tinted violet or cyan. */
export function FabricSwatch({ id, tone = "violet", className = "" }: { id: string; tone?: "violet" | "cyan"; className?: string }) {
  const matrix =
    tone === "violet"
      ? "0 0 0 1 0.12  0 0 0 0.36 0.02  0 0 0 0.06 0  0 0 0 0 1"
      : "0 0 0 1 0.1  0 0 0 0.72 0.05  0 0 0 0.22 0  0 0 0 0 1";
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden>
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency={tone === "violet" ? "0.035 0.16" : "0.12 0.05"} numOctaves="4" seed={tone === "violet" ? 7 : 3} />
        <feColorMatrix type="matrix" values={matrix} />
        <feComponentTransfer>
          <feFuncR type="gamma" exponent="0.7" amplitude="1.4" />
          <feFuncG type="gamma" exponent="0.7" amplitude="1.4" />
          <feFuncB type="gamma" exponent="0.7" amplitude="1.4" />
        </feComponentTransfer>
      </filter>
      <rect width="100" height="100" filter={`url(#${id})`} />
    </svg>
  );
}

/** Thin meter bars. */
export function Meters({ values, className = "" }: { values: { v: number; c: "cyan" | "magenta" | "violet" }[]; className?: string }) {
  const color = { cyan: "bg-cyan", magenta: "bg-magenta", violet: "bg-violet" };
  return (
    <div className={`space-y-1.5 ${className}`}>
      {values.map((m, i) => (
        <div key={i} className="h-1.5 w-full bg-white/10">
          <div className={`h-full ${color[m.c]} shadow-[0_0_8px_currentColor]`} style={{ width: `${m.v}%` }} />
        </div>
      ))}
    </div>
  );
}

/** Tiny sparkline. */
export function Spark({ className = "", color = "#e8a112" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 30" className={className} aria-hidden>
      <polyline
        points="0,24 8,20 14,22 20,12 27,16 33,6 40,14 47,10 54,18 60,8 67,13 73,4 80,9"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
      />
      <path d="M0 29.5H80" stroke={color} strokeOpacity="0.3" />
    </svg>
  );
}

export function Globe({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4.5" ry="10" />
      <path d="M2 12h20M4 6.5h16M4 17.5h16M12 2v20" />
    </svg>
  );
}

/** Line-art jacket used in the "garment detection" readouts. */
export function JacketOutline({ className = "", color = "#fbc760" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M24 6h16l4 4 10 6 6 26-6 2-4-16v32H14V28l-4 16-6-2 6-26 10-6z" />
      <path d="M24 6c0 6 4 10 8 10s8-4 8-10M32 16v42M26 30h-6M44 30h-6M20 44h6M38 44h6" />
    </svg>
  );
}

/** Cut-corner panel with a coloured neon border (clip-path + inset layer, glow on the wrapper). */
export function NeonFrame({
  hex,
  fill,
  className = "",
  innerClassName = "bg-[#1a0d05]/95",
  children,
}: {
  hex: string;
  /** Optional CSS background for the border (e.g. a cyan→magenta gradient); defaults to `hex`. */
  fill?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={className} style={{ filter: `drop-shadow(0 0 10px ${hex}99) drop-shadow(0 0 26px ${hex}40)` }}>
      <div className="clip-chamfer relative h-full" style={{ background: fill ?? hex }}>
        <div className={`clip-chamfer absolute inset-[1.5px] ${innerClassName}`} />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

/** Hanging "HACK THE FASHION"-style banner for the pillars at the section edges (wide screens only). */
export function Banner({ side, lines = ["Hack", "the", "Fashion"], className = "" }: { side: "left" | "right"; lines?: string[]; className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute top-[11%] hidden w-[8.5%] max-w-[140px] min-[1400px]:block ${side === "left" ? "left-[1.6%] -rotate-2" : "right-[1.6%] rotate-2"} ${className}`}
    >
      <div className="mx-auto h-2 w-[112%] -translate-x-[5%] rounded-sm bg-gradient-to-r from-[#5e371d] via-[#eb7424] to-[#5e371d]" />
      <div className="relative flex aspect-[1/3] flex-col items-center border-2 border-magenta/80 bg-gradient-to-b from-[#331b0b] to-[#45220b] pt-[30%] shadow-[0_0_30px_rgba(250,96,39,0.45)]">
        <LogoMark className="w-[45%] drop-shadow-[0_0_10px_#fa6027]" />
        <p className="mt-[18%] -rotate-[10deg] text-center font-display text-[clamp(14px,1.4vw,22px)] font-black uppercase leading-[1.05] text-frost">
          {lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
        <div className="absolute inset-x-0 bottom-0 grid h-[22%] grid-cols-4 gap-1 p-2">
          {[1, 0, 1, 1, 0, 1, 1, 0].map((v, i) => (
            <span key={i} className={v ? "bg-magenta/70 shadow-[0_0_8px_#fa6027]" : "bg-violet/30"} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Section kicker like "// 04. JUDGES //" flanked by rules. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan/70 sm:w-16 md:w-28" />
      <p className="whitespace-nowrap font-ui text-sm font-semibold uppercase tracking-[0.3em] text-cyan">{children}</p>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan/70 sm:w-16 md:w-28" />
    </div>
  );
}
