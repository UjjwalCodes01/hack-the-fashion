import type { CSSProperties } from "react";
import { Kicker, LogoMark, NeonFrame } from "@/components/hud";
import { Icon, type IconName } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { RegisterButton } from "@/components/Nav";
import { At, Stage } from "@/components/stage";
import { TRACKS, type Track } from "@/lib/content";

const TONE: Record<Track["tone"], { hex: string; text: string }> = {
  magenta: { hex: "#e040fb", text: "text-magenta" },
  cyan: { hex: "#22d3ee", text: "text-cyan" },
  violet: { hex: "#c084fc", text: "text-[#d8b4fe]" },
  teal: { hex: "#2dd4bf", text: "text-[#5eead4]" },
  gold: { hex: "#fbbf24", text: "text-[#fcd34d]" },
};

/* Card placement over public/track_bg.png (percent of the stage), taken from the mockup. */
const CARD_AT: Record<string, { l: number; t: number; w: number }> = {
  "01": { l: 7.4, t: 43.5, w: 19 },
  "02": { l: 25.5, t: 24.5, w: 18.5 },
  "03": { l: 39.8, t: 48.5, w: 17 },
  "04": { l: 53, t: 25.5, w: 17 },
  "05": { l: 68, t: 54.5, w: 17.5 },
  "06": { l: 78.6, t: 22.5, w: 13.4 },
};

/* Holographic cubes standing on the floating platforms of track_bg.png (x/y = platform top centre). */
const CUBES: { x: number; y: number; size: number; tone: Track["tone"]; icon: IconName }[] = [
  { x: 16, y: 77, size: 6.6, tone: "magenta", icon: "shirt" },
  { x: 33, y: 53.5, size: 4.6, tone: "cyan", icon: "shirt" },
  { x: 48.5, y: 78.5, size: 5.6, tone: "violet", icon: "pen" },
  { x: 62, y: 55, size: 4.6, tone: "teal", icon: "recycle" },
  { x: 85, y: 50.5, size: 4.6, tone: "gold", icon: "users" },
];

/** Isometric glass cube (SVG, so it scales with the stage) with a floating hologram glyph inside. */
function HoloCube({ size, tone, icon }: { size: number; tone: Track["tone"]; icon: IconName }) {
  const hex = TONE[tone].hex;
  const id = `holo-${tone}-${icon}`;
  return (
    <div className="relative" style={{ width: `${size}cqw`, aspectRatio: "100 / 110" }}>
      <svg viewBox="0 0 100 110" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* hidden back edges */}
        <path d="M50 5V59M50 59L7 82M50 59L93 82" stroke={hex} strokeOpacity="0.5" strokeWidth="1" fill="none" />
        {/* faces */}
        <path d="M50 5L93 28L50 51L7 28Z" fill={hex} fillOpacity="0.4" />
        <path d="M7 28L50 51V105L7 82Z" fill={hex} fillOpacity="0.26" />
        <path d="M50 51L93 28V82L50 105Z" fill={hex} fillOpacity="0.16" />
        {/* glowing visible edges */}
        <path d="M50 5L93 28L50 51L7 28ZM7 28V82L50 105L93 82V28M50 51V105" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.4" strokeLinejoin="round" fill="none" filter={`url(#${id})`} style={{ color: hex }} />
        <path d="M50 5L93 28L50 51L7 28ZM7 28V82L50 105L93 82V28M50 51V105" stroke={hex} strokeWidth="3" strokeOpacity="0.55" strokeLinejoin="round" fill="none" />
      </svg>
      <div className="absolute left-1/2 top-[57%] w-[52%] -translate-x-1/2 -translate-y-1/2" style={{ color: "#fff", filter: `drop-shadow(0 0 0.35cqw ${hex}) drop-shadow(0 0 0.8cqw ${hex})` }}>
        <Icon name={icon} filled className="h-auto w-full" />
      </div>
    </div>
  );
}

function TrackCard({ track }: { track: Track }) {
  const t = TONE[track.tone];
  return (
    <NeonFrame hex={t.hex} innerClassName="bg-[#0a0620]/82 backdrop-blur-sm" className="h-full">
      <div className="p-4 xl:p-[0.85cqw]">
        <div className="flex items-start gap-3 xl:gap-[0.7cqw]">
          <span
            className={`flex size-12 shrink-0 items-center justify-center border-2 font-display text-xl font-black xl:size-[3cqw] xl:border-[0.12cqw] xl:text-[1.35cqw] ${t.text}`}
            style={{ borderColor: t.hex, boxShadow: `0 0 12px ${t.hex}66, inset 0 0 10px ${t.hex}33` }}
          >
            {track.no}
          </span>
          <div className="min-w-0 flex-1">
            <p className={`font-display text-xl font-black leading-none xl:text-[1.35cqw] ${t.text}`}>{track.no}</p>
            <h3 className="mt-1 font-ui text-[15px] font-bold uppercase leading-tight text-white xl:text-[0.9cqw]">{track.title}</h3>
          </div>
          <span
            className={`flex size-9 shrink-0 items-center justify-center border xl:size-[2.2cqw] ${t.text}`}
            style={{ borderColor: `${t.hex}aa` }}
          >
            <Icon name={track.icon} filled className="size-5 xl:size-[1.3cqw]" />
          </span>
        </div>
        <ul className="mt-3 space-y-1 xl:mt-[0.6cqw] xl:space-y-[0.2cqw]">
          {track.ideas.map((idea) => (
            <li key={idea} className="flex items-start gap-2 text-[13.5px] leading-snug text-frost/90 xl:gap-[0.45cqw] xl:text-[0.8cqw]">
              <span aria-hidden className={`mt-[0.35em] text-[0.6em] ${t.text}`}>
                ◆
              </span>
              {idea}
            </li>
          ))}
        </ul>
      </div>
    </NeonFrame>
  );
}

/** Text painted onto the blank banners that hang in track_bg.png. */
function BannerText({ l, t, w, lines }: { l: number; t: number; w: number; lines: string[] }) {
  return (
    <div
      aria-hidden
      className="absolute hidden -rotate-[8deg] flex-col items-center xl:flex"
      style={{ left: `${l}%`, top: `${t}%`, width: `${w}%` } as CSSProperties}
    >
      <LogoMark className="w-[45%] drop-shadow-[0_0_0.6cqw_#e040fb]" />
      <p className="mt-[0.8cqw] text-center font-display text-[1.25cqw] font-black uppercase leading-[1.05] text-frost [text-shadow:0_0_0.6cqw_rgba(224,64,251,0.8)]">
        {lines.map((x) => (
          <span key={x} className="block">
            {x}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function Tracks() {
  return (
    <Stage id="tracks" bg="/track_bg.png" w={1671} h={941}>
      <BannerText l={2.4} t={9} w={6.2} lines={["Hack", "the", "Fashion"]} />
      <BannerText l={92.6} t={21} w={6.2} lines={["Ideas", "Style", "Impact"]} />

      {/* Cubes on the platforms (xl only — they belong to the artwork) */}
      {CUBES.map((c) => (
        <div key={`${c.x}-${c.y}`} aria-hidden className="absolute hidden -translate-x-1/2 -translate-y-full xl:block" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
          <div className="animate-float-slow" style={{ animationDelay: `${-c.x / 10}s` }}>
            <HoloCube size={c.size} tone={c.tone} icon={c.icon} />
          </div>
          <div className="mx-auto -mt-[0.6cqw] h-[1.2cqw] w-[120%] -translate-x-[8%] rounded-[50%] blur-[0.6cqw]" style={{ background: `${TONE[c.tone].hex}88` }} />
        </div>
      ))}

      {/* Heading */}
      <At l={15} t={3} w={70} className="text-center">
        <Reveal>
          <Kicker>// 02. Tracks //</Kicker>
          <h2 className="mt-3 font-display text-[9.5vw] font-black uppercase leading-none sm:text-6xl xl:mt-[0.6cqw] xl:text-[4cqw]">
            <span className="bg-gradient-to-b from-white via-[#e6e9f5] to-[#9aa3b8] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(200,220,255,0.35)]">
              Choose your
            </span>{" "}
            <span className="grad-circuit">Track</span>
          </h2>
          <p className="mt-4 font-ui text-xs font-semibold uppercase tracking-[0.35em] text-frost xl:mt-[0.7cqw] xl:text-[0.9cqw] xl:tracking-[0.42em]">
            Same platform · Different directions · Bigger impact
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-frost/85 xl:mt-[0.6cqw] xl:max-w-none xl:text-[1cqw]">
            Pick a track that matches your interests and build innovative solutions at the intersection of fashion,
            technology and real-world impact.
          </p>
        </Reveal>
      </At>

      {/* Track cards */}
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:contents">
        {TRACKS.map((track, i) => {
          const at = CARD_AT[track.no];
          return (
            <li key={track.no} className="contents">
              <At l={at.l} t={at.t} w={at.w}>
                <Reveal delay={0.07 * i} y={20}>
                  <TrackCard track={track} />
                </Reveal>
              </At>
            </li>
          );
        })}
      </ul>

      {/* Not sure bar */}
      <At l={23} t={85.5} w={54} className="mt-8 xl:mt-0">
        <Reveal>
          <NeonFrame hex="#c026d3" fill="linear-gradient(90deg,#e040fb,#a855f7 50%,#e040fb)" innerClassName="bg-[#0a0620]/90">
            <div className="flex flex-col items-center gap-4 px-6 py-5 text-center md:flex-row md:text-left xl:gap-[1.4cqw] xl:px-[2cqw] xl:py-[1.1cqw]">
              <Icon name="flag" className="size-10 shrink-0 text-frost drop-shadow-[0_0_8px_#e040fb] xl:size-[2.6cqw]" filled />
              <div className="flex-1">
                <p className="font-display text-lg font-bold uppercase tracking-[0.08em] text-white xl:text-[1.35cqw]">Not sure which track?</p>
                <p className="mt-1 text-sm text-frost/80 xl:text-[0.85cqw]">
                  You can choose a track during registration or discuss with mentors on Day 1.
                </p>
              </div>
              <RegisterButton className="xl:px-[2cqw]! xl:py-[0.7cqw]! xl:text-[0.95cqw]!" />
            </div>
          </NeonFrame>
        </Reveal>
      </At>
    </Stage>
  );
}
