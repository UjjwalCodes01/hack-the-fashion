import Image from "next/image";
import { Kicker, NeonFrame } from "@/components/hud";
import { Reveal } from "@/components/motion";
import { EVENT, JUDGES, type Judge } from "@/lib/content";

const TONES = [
  { hex: "#ff5e23", text: "text-[#ff9e5d]", tab: "bg-[#ff5e23] text-white", pill: "border-[#ff5e23] bg-[#ff5e23]/15 text-[#ffd4b8]" },
  { hex: "#e8a112", text: "text-cyan", tab: "bg-cyan text-void", pill: "border-cyan bg-cyan/15 text-cyan" },
];

/** Little pixel cluster used as a header ornament. */
function Pixels({ className = "" }: { className?: string }) {
  const on = [
    [2, 0], [3, 0], [1, 1], [2, 1], [3, 1], [4, 1], [0, 2], [1, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [2, 4],
  ];
  return (
    <svg viewBox="0 0 5 5" className={className} shapeRendering="crispEdges" aria-hidden>
      {on.map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill={(x + y) % 3 === 0 ? "#fffaf3" : "#fa6027"} />
      ))}
    </svg>
  );
}

function Portrait({ judge, tone }: { judge: Judge; tone: (typeof TONES)[number] }) {
  const tba = !judge.initials && !judge.photo;
  const gid = `sil-${judge.category.replace(/[^a-z]/gi, "")}`;
  return (
    <div className="relative aspect-[5/6] overflow-hidden border" style={{ borderColor: `${tone.hex}99` }}>
      {/* holo-city backdrop */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#3a1e0b] via-[#261307] to-[#1a0d05]" />
      <div aria-hidden className="hud-grid absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-2/3 items-end gap-[3%] px-[4%] opacity-50">
        {[38, 70, 52, 88, 44, 64, 30, 76].map((h, i) => (
          <span key={i} className="flex-1 border-t" style={{ height: `${h}%`, borderColor: tone.hex, background: `linear-gradient(${tone.hex}33, transparent)` }} />
        ))}
      </div>

      {judge.photo ? (
        <Image src={judge.photo} alt={judge.name} fill sizes="(min-width:1024px) 220px, 45vw" className="object-cover" />
      ) : tba ? (
        <>
          <svg viewBox="0 0 100 100" className="absolute inset-x-[8%] bottom-0 h-[86%] w-[84%]" aria-hidden>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={tone.hex} stopOpacity="0.55" />
                <stop offset="1" stopColor={tone.hex} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="38" r="19" fill={`url(#${gid})`} stroke={tone.hex} strokeOpacity="0.8" />
            <path d="M10 100C10 74 28 62 50 62S90 74 90 100Z" fill={`url(#${gid})`} stroke={tone.hex} strokeOpacity="0.8" />
          </svg>
          <span className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 font-display text-5xl font-black text-white/90 [text-shadow:0_0_18px_currentColor]">
            ?
          </span>
          <span aria-hidden className="absolute inset-x-0 top-0 h-1/4 animate-scan bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <span className="absolute inset-x-0 bottom-2 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-frost/80">Revealing soon</span>
        </>
      ) : (
        <>
          <div aria-hidden className="absolute left-1/2 top-[42%] size-[70%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full blur-2xl" style={{ background: `${tone.hex}55` }} />
          <span className="grad-circuit absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 font-display text-6xl font-black">{judge.initials}</span>
          <span className="absolute inset-x-0 bottom-2 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-cyan">● Confirmed</span>
        </>
      )}
    </div>
  );
}

function JudgeCard({ judge, i }: { judge: Judge; i: number }) {
  const tone = TONES[i % 2];
  const tba = judge.name === "To be announced";
  return (
    <div className="relative h-full pt-4">
      {/* number tab */}
      <span
        className={`absolute left-3 top-0 z-10 px-3 py-0.5 font-display text-sm font-bold ${tone.tab}`}
        style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <NeonFrame hex={tone.hex} className="h-full" innerClassName="bg-[#1c0e05]/92">
        <div className="flex h-full flex-col p-2.5 pb-4">
          <Portrait judge={judge} tone={tone} />
          <div className="flex flex-1 flex-col px-1.5 pt-3">
            <p className={`font-ui text-lg font-bold leading-tight ${tba ? "text-frost/60" : "text-white"}`}>{judge.name}</p>
            <span className="mt-1.5 h-px w-full" style={{ background: `linear-gradient(90deg, ${tone.hex}, transparent)` }} />
            <p className="mt-2 text-[12.5px] leading-snug text-frost/80">
              {judge.title}
              <br />
              {judge.org}
            </p>
            <div className="mt-3 flex h-8 items-center">
              {judge.logo ? (
                <Image src={judge.logo.src} alt={judge.logo.alt} width={judge.logo.w} height={judge.logo.h} className="h-6 w-auto max-w-full object-contain brightness-0 invert" />
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost/40">Logo // TBA</span>
              )}
            </div>
            <span className={`mt-auto inline-flex w-full justify-center rounded-full border px-1.5 py-1 text-center font-ui text-[9.5px] font-bold uppercase leading-tight tracking-[0.08em] xl:text-[10px] ${tone.pill}`}>
              {judge.category}
            </span>
          </div>
        </div>
      </NeonFrame>
    </div>
  );
}

export default function Judges() {
  return (
    <section id="judges" className="relative isolate overflow-hidden pb-[10%] pt-24 md:pt-28 lg:min-h-[max(100svh,900px)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/new_bg.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
      </div>

      <div className="relative mx-auto w-[92%] max-w-[1200px] xl:w-[72%]">
        {/* Heading */}
        <Reveal className="relative text-center">
          <Pixels className="absolute -top-2 left-0 hidden size-10 drop-shadow-[0_0_10px_#fa6027] md:block lg:left-[4%]" />
          <Pixels className="absolute -top-2 right-0 hidden size-10 -scale-x-100 drop-shadow-[0_0_10px_#fa6027] md:block lg:right-[4%]" />
          <Kicker>// 04. Judges //</Kicker>
          <h2 className="mt-4 font-display text-[10vw] font-black uppercase italic leading-none sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white via-[#e6e9f5] to-[#9aa3b8] bg-clip-text pr-2 text-transparent drop-shadow-[0_0_14px_rgba(255,230,200,0.35)]">
              Meet the
            </span>{" "}
            <span className="grad-circuit pr-2">Judges</span>
          </h2>
          <p className="mt-5 font-ui text-xs font-semibold uppercase tracking-[0.35em] text-frost md:text-sm md:tracking-[0.45em]">
            Experts . Creators . Builders . Industry leaders
          </p>
          <div aria-hidden className="mx-auto mt-4 h-px w-3/4 bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-frost/85 md:text-lg">
            A diverse panel of experts from fashion, technology, design and business, who will evaluate your ideas, guide
            you and cheer you on.
          </p>
        </Reveal>

        {/* Cards */}
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5 lg:gap-5">
          {JUDGES.map((j, i) => (
            <li key={j.category} className="h-full">
              <Reveal delay={0.08 * i} className="h-full">
                <JudgeCard judge={j} i={i} />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 w-fit border border-violet/40 bg-void/80 px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-frost/80 backdrop-blur-sm">
          More judges to be announced ·{" "}
          <a href={`mailto:${EVENT.email}?subject=Judging%20at%20Hack%20the%20Fashion`} className="text-cyan underline-offset-4 hover:underline">
            Want to judge? Write to us
          </a>
        </p>
      </div>
    </section>
  );
}
