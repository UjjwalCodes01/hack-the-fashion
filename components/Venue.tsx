import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { JacketOutline, Kicker, NeonFrame } from "@/components/hud";
import { Reveal } from "@/components/motion";
import { EVENT } from "@/lib/content";

// Drop a real photo of the venue here and it replaces the placeholder on the next build/reload.
const PHOTO = "/venue_kiet.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

const CYAN_MAGENTA = "linear-gradient(135deg, #22d3ee 0%, #8b5cf6 45%, #e040fb 100%)";
const MAGENTA_CYAN = "linear-gradient(135deg, #e040fb 0%, #8b5cf6 55%, #22d3ee 100%)";

const ICON: Record<string, string[]> = {
  building: ["M3 21h18", "M5 21V7l7-4 7 4v14", "M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01", "M10 21v-4h4v4"],
  pin: ["M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  moon: ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"],
  route: ["M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M8 17h6.5a3.5 3.5 0 0 0 0-7h-5a3.5 3.5 0 0 1 0-7H16"],
  map: ["M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z", "M9 3v15", "M15 6v15"],
  expand: ["M15 3h6v6", "M9 21H3v-6", "M21 3l-7 7", "M3 21l7-7"],
};

function Icon({ name, className = "" }: { name: keyof typeof ICON; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {ICON[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function Fact({ icon, tone, label, value }: { icon: keyof typeof ICON; tone: "cyan" | "magenta"; label: string; value: ReactNode }) {
  const c = tone === "cyan" ? "border-cyan/70 text-cyan shadow-[0_0_12px_rgba(34,211,238,0.35)]" : "border-magenta/70 text-magenta shadow-[0_0_12px_rgba(224,64,251,0.35)]";
  return (
    <div className="flex items-center gap-4 py-3">
      <span className={`flex size-14 shrink-0 items-center justify-center rounded-md border bg-void/60 ${c}`}>
        <Icon name={icon} className="size-7" />
      </span>
      <span>
        <span className="block font-ui text-[15px] font-semibold text-frost">{label}</span>
        <span className="block text-[14px] leading-snug text-frost/80">{value}</span>
      </span>
    </div>
  );
}

/** Neon road + pin + chequered flag ornament from the mockup. */
function FinishOrnament({ className = "" }: { className?: string }) {
  const flag = Array.from({ length: 12 }, (_, i) => ({ x: (i % 4) * 9, y: Math.floor(i / 4) * 9, on: (i + Math.floor(i / 4)) % 2 === 0 }));
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden>
      <defs>
        <linearGradient id="road" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#e040fb" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M40 220C120 205 300 200 285 150S120 120 150 92" fill="none" stroke="#1b1036" strokeWidth="34" />
      <path d="M40 220C120 205 300 200 285 150S120 120 150 92" fill="none" stroke="url(#road)" strokeWidth="3" filter="url(#glow)" />
      <path d="M40 220C120 205 300 200 285 150S120 120 150 92" fill="none" stroke="#f5d0fe" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="10 10" />
      <g filter="url(#glow)" fill="#e040fb">
        <path d="M20 168l14 10-14 10 6-10z" />
        <path d="M40 168l14 10-14 10 6-10z" />
        <path d="M60 168l14 10-14 10 6-10z" />
      </g>
      <ellipse cx="150" cy="96" rx="34" ry="10" fill="#22d3ee" fillOpacity="0.25" stroke="#22d3ee" strokeWidth="1.5" filter="url(#glow)" />
      <path d="M150 88c-14-16-22-26-22-38a22 22 0 0 1 44 0c0 12-8 22-22 38z" fill="#c026d3" stroke="#f0abfc" strokeWidth="2" filter="url(#glow)" />
      <circle cx="150" cy="50" r="8" fill="#fff" />
      <path d="M210 92V20" stroke="#e9d5ff" strokeWidth="3" />
      <g transform="translate(212 22)">
        {flag.map((f) => (
          <rect key={`${f.x}-${f.y}`} x={f.x} y={f.y} width="9" height="9" fill={f.on ? "#f5f3ff" : "#7c3aed"} />
        ))}
      </g>
    </svg>
  );
}

export default function Venue() {
  return (
    <section id="venue" className="relative isolate overflow-hidden pb-24 pt-24 md:pt-28 lg:min-h-[max(100svh,900px)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/venue_bg.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/40 to-void/70" />
      </div>
      <JacketOutline className="pointer-events-none absolute right-[2%] top-[6%] hidden w-[11%] opacity-40 xl:block" color="#60a5fa" />

      <div className="relative mx-auto w-[92%] max-w-[1280px]">
        {/* Heading */}
        <Reveal className="text-center">
          <Kicker>// 07. Venue //</Kicker>
          <h2 className="mt-4 font-display text-[9.5vw] font-black uppercase italic leading-none sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white via-[#e6e9f5] to-[#9aa3b8] bg-clip-text pr-2 text-transparent drop-shadow-[0_0_14px_rgba(200,220,255,0.35)]">
              Venue &amp;
            </span>{" "}
            <span className="grad-circuit pr-2">Location</span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="hidden h-px w-24 bg-gradient-to-r from-transparent to-violet sm:block md:w-28" />
            <p className="font-ui text-sm font-semibold uppercase tracking-[0.35em] text-magenta md:text-base md:tracking-[0.45em]">
              Where ideas turn into reality
            </p>
            <span className="hidden h-px w-24 bg-gradient-to-l from-transparent to-violet sm:block md:w-28" />
          </div>
        </Reveal>

        {/* Photo + details */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.12fr_1fr]">
          <Reveal className="min-w-0">
            <NeonFrame hex="#8b5cf6" fill={CYAN_MAGENTA} innerClassName="bg-void" className="h-full">
              <div className="relative aspect-[16/10] h-full min-h-[260px] overflow-hidden lg:aspect-auto">
                {hasPhoto ? (
                  <Image src={PHOTO} alt="KIET Group of Institutions campus" fill sizes="(min-width:1024px) 640px, 92vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-[3px] flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#1a0a3a] via-[#0d0726] to-[#2a0b45]">
                    <div aria-hidden className="hud-grid absolute inset-0" />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-1/2 items-end gap-[2%] px-[6%] opacity-60">
                      {[30, 55, 42, 80, 64, 92, 50, 70, 38, 60].map((h, i) => (
                        <span key={i} className="flex-1 border-t border-violet/70 bg-gradient-to-b from-violet/30 to-transparent" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <Image src="/logos/kiet.png" alt="KIET Group of Institutions" width={662} height={223} className="relative h-16 w-auto brightness-0 invert drop-shadow-[0_0_14px_rgba(224,64,251,0.7)] md:h-24" />
                    <p className="relative font-display text-xl font-bold uppercase tracking-[0.15em] text-frost md:text-2xl">AI Skills Lab</p>
                    <p className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                      {EVENT.lat} · {EVENT.lon}
                    </p>
                  </div>
                )}
              </div>
            </NeonFrame>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <NeonFrame hex="#c026d3" fill={MAGENTA_CYAN} innerClassName="bg-[#0a0620]/90" className="h-full">
              <div className="flex h-full flex-col p-6 md:p-8">
                <div className="flex min-w-0 gap-5">
                  <Icon name="building" className="size-16 shrink-0 text-magenta drop-shadow-[0_0_10px_#e040fb]" />
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase leading-tight text-white md:text-3xl">
                      AI Skills Lab, <span className="italic text-cyan">KIET</span>
                    </h3>
                    <p className="mt-2 font-ui text-lg font-semibold text-[#d27bff]">KIET Group of Institutions</p>
                    <p className="text-[15px] leading-relaxed text-frost/85">
                      Delhi-NCR, Meerut Road (NH-58),
                      <br />
                      Ghaziabad, Uttar Pradesh – 201206
                    </p>
                  </div>
                </div>
                <div className="my-5 h-px bg-gradient-to-r from-violet/60 via-violet/30 to-transparent" />
                <div className="grid flex-1 content-center gap-x-6 sm:grid-cols-2">
                  <Fact icon="pin" tone="cyan" label="Event hall" value="AI Skills Lab" />
                  <Fact icon="users" tone="magenta" label="Capacity" value={<strong className="font-semibold text-white">250 participants</strong>} />
                  <Fact icon="moon" tone="magenta" label="Overnight" value="Open all night · Meals covered" />
                  <Fact icon="route" tone="cyan" label="Getting there" value="Metro, bus & parking details sent to shortlisted teams" />
                </div>
              </div>
            </NeonFrame>
          </Reveal>
        </div>

        {/* Map + directions */}
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="min-w-0">
            <NeonFrame hex="#8b5cf6" fill={MAGENTA_CYAN} innerClassName="bg-void">
              <div className="relative h-[240px] overflow-hidden md:h-[270px]">
                <iframe
                  title="Map: KIET Group of Institutions, Ghaziabad"
                  src={EVENT.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] [filter:invert(0.92)_hue-rotate(200deg)_saturate(0.7)_brightness(0.85)]"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-violet/10 mix-blend-color" />
                <div className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 border border-magenta bg-void/90 px-4 py-2 text-center font-ui text-sm font-semibold leading-tight text-white shadow-[0_0_16px_rgba(224,64,251,0.6)]">
                  KIET Group of
                  <br />
                  Institutions
                </div>
                <a
                  href={EVENT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the map in Google Maps"
                  className="absolute right-3 top-3 flex size-9 items-center justify-center border border-white/30 bg-void/80 text-white transition hover:border-cyan hover:text-cyan"
                >
                  <Icon name="expand" className="size-5" />
                </a>
              </div>
            </NeonFrame>
          </Reveal>

          <Reveal delay={0.1} className="relative min-w-0">
            <div className="relative flex flex-col gap-6 border-t border-violet/40 pt-6 md:flex-row md:items-start md:border-t-0 md:pt-0">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-md border border-cyan/50 bg-[#0d1a3a] text-cyan shadow-[0_0_16px_rgba(34,211,238,0.35)]">
                <Icon name="map" className="size-9" />
              </span>
              <div className="max-w-md xl:max-w-[330px]">
                <h3 className="font-display text-2xl font-black uppercase text-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">Get directions</h3>
                <p className="mt-2 text-base leading-relaxed text-frost/85">Find the fastest route to the hackathon venue using Google Maps.</p>
                <a
                  href={EVENT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-6 inline-flex items-center gap-2 px-9 py-3 font-ui text-base font-bold text-white transition active:scale-95"
                >
                  <span aria-hidden className="clip-slant absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#c026d3] shadow-[0_0_24px_rgba(192,38,211,0.6)] transition group-hover:brightness-125" />
                  <span className="relative">Open in Google Maps</span>
                  <span className="relative transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
            <FinishOrnament className="pointer-events-none absolute -bottom-16 -right-[3%] hidden w-[36%] xl:block" />
          </Reveal>
        </div>

      </div>
    </section>
  );
}
