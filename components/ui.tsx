import type { ReactNode } from "react";

/** Mono "HUD" label, e.g. `HTF // LOOK_01`. */
export function Hud({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] text-mute md:text-[11px] ${className}`}>
      {children}
    </span>
  );
}

export function LiveDot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-1.5 rounded-full bg-gold animate-pulse-dot ${className}`} />;
}

/** Section heading: gold kicker, big Bodoni title, optional lede. */
export function SectionHeading({
  kicker,
  title,
  lede,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={`mb-12 md:mb-16 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-gold ${center ? "justify-center" : ""}`}>
        <span aria-hidden className="h-px w-8 bg-gold" />
        {kicker}
      </p>
      <h2 className="font-display text-4xl leading-[0.95] font-semibold uppercase tracking-tight text-ivory sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {lede && <p className="mt-5 text-base leading-relaxed text-mute md:text-lg">{lede}</p>}
    </div>
  );
}

/** Gold corner brackets around a box, the viewfinder frame from off-grid's cards. */
export function Corners({ className = "border-gold" }: { className?: string }) {
  const base = `pointer-events-none absolute size-3 ${className}`;
  return (
    <>
      <span aria-hidden className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span aria-hidden className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span aria-hidden className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}

/**
 * Off-grid's telemetry card, restyled as a runway look card:
 * header strip with a code + live dot, body, and a footer of status meta.
 */
export function HudCard({
  code,
  tag = "AW26",
  meta = ["STATUS: RUNWAY", "FITTING: LIVE", "KIET_GZB:01", "CUT: VERIFIED"],
  className = "",
  children,
}: {
  code: string;
  tag?: string;
  meta?: string[];
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden border border-line bg-ink-2 transition-colors duration-500 hover:border-gold/60 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 whitespace-nowrap border-b border-line bg-ink-3 px-4 py-2">
        <Hud className="text-gold/80">HTF // {code}</Hud>
        <span className="flex items-center gap-2">
          <Hud>{tag}</Hud>
          <LiveDot />
        </span>
      </div>
      <div className="relative flex-1 p-5 md:p-6">{children}</div>
      {meta.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-dashed border-line px-4 py-3">
          {meta.map((m) => (
            <Hud key={m} className="truncate text-[9px] md:text-[10px]">
              {m}
            </Hud>
          ))}
        </div>
      )}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
      />
    </div>
  );
}

/** Infinite horizontal marquee. Children are rendered twice for a seamless loop. */
export function Marquee({
  children,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div className={`flex w-max shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Thin ivory/gold slogan band that sits between sections. */
export function SloganBand({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <section
      aria-label={text}
      className="relative z-10 overflow-hidden border-y-2 border-gold bg-ink-3 py-6 shadow-[0_0_60px_rgba(212,168,87,0.12)] md:py-8"
    >
      <Marquee reverse={reverse}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-display text-3xl font-semibold uppercase italic text-ivory md:px-10 md:text-5xl">
              {text}
            </span>
            <span aria-hidden className="text-2xl text-gold md:text-4xl">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function GoldButton({
  href,
  children,
  external = false,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  // Only the solid button gets the cut corners; on a bordered button they'd break the outline.
  const styles =
    variant === "solid"
      ? "bg-gold text-ink hover:bg-gold-soft [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]"
      : "border border-ivory/30 text-ivory hover:border-gold hover:text-gold";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 ${styles} ${className}`}
    >
      {children}
    </a>
  );
}
