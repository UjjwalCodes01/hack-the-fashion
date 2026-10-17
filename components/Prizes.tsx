import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Banner, NeonFrame } from "@/components/hud";
import { Reveal } from "@/components/motion";
import { PODIUM, SPECIAL_AWARDS } from "@/lib/content";

type Tone = "cyan" | "gold" | "magenta" | "violet" | "green";

const TONE: Record<Tone, { hex: string; text: string; amount: string }> = {
  cyan: { hex: "#e8a112", text: "text-cyan", amount: "from-[#ffedc8] via-[#e8a112] to-[#d6930d]" },
  gold: { hex: "#fbbf24", text: "text-[#fbbf24]", amount: "from-[#fff3c4] via-[#fbbf24] to-[#d97706]" },
  magenta: { hex: "#fa6027", text: "text-magenta", amount: "from-[#ffddd1] via-[#f28157] to-[#ed622f]" },
  violet: { hex: "#f6863c", text: "text-violet", amount: "" },
  green: { hex: "#22c55e", text: "text-[#4ade80]", amount: "" },
};

const ICONS: Record<string, { d: string[]; fill?: boolean }> = {
  trophy: {
    d: [
      "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
      "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
      "M4 22h16",
      "M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22",
      "M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8",
      "M18 2H6v7a6 6 0 0 0 12 0V2z",
    ],
  },
  crown: {
    d: [
      "M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.3l4.27-3.67a.5.5 0 0 1 .8.52l-2.83 10.25a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52L7.09 9.17a1 1 0 0 0 1.52-.3z",
      "M5 21h14",
    ],
    fill: true,
  },
  shirt: {
    d: ["M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"],
    fill: true,
  },
  leaf: {
    d: ["M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z", "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"],
    fill: true,
  },
  laptop: { d: ["M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"] },
  users: {
    d: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
    fill: true,
  },
};

function Icon({ name, className = "" }: { name: keyof typeof ICONS; className?: string }) {
  const icon = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill={icon.fill ? "currentColor" : "none"}
      fillOpacity={icon.fill ? 0.35 : undefined}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {icon.d.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function TonedFrame({ tone, className = "", children }: { tone: Tone; className?: string; children: ReactNode }) {
  return (
    <NeonFrame hex={TONE[tone].hex} className={className}>
      {children}
    </NeonFrame>
  );
}

const PLACE = {
  1: { tone: "gold" as Tone, icon: "crown" as const, x: 51, bottom: 63.5, w: "lg:w-[30%]", delay: "0s" },
  2: { tone: "cyan" as Tone, icon: "trophy" as const, x: 15.5, bottom: 47, w: "lg:w-[25%]", delay: "-2s" },
  3: { tone: "magenta" as Tone, icon: "trophy" as const, x: 85.6, bottom: 45, w: "lg:w-[25%]", delay: "-4s" },
};

/* Horizontal slices of public/prize_box.png, one per island, so each can float on its own. */
const ISLANDS = [
  { clip: "inset(0 69.6% 0 0)", delay: "-2s" },
  { clip: "inset(0 27% 0 30.4%)", delay: "0s" },
  { clip: "inset(0 0 0 73%)", delay: "-4s" },
];

function PrizeCard({ place }: { place: 1 | 2 | 3 }) {
  const p = PODIUM.find((x) => x.place === place)!;
  const cfg = PLACE[place];
  const t = TONE[cfg.tone];
  const winner = place === 1;
  return (
    <TonedFrame tone={cfg.tone}>
      <div className={winner ? "px-6 pb-5 pt-4" : "px-5 pb-4 pt-4"}>
        <div className="flex items-center gap-3">
          <Icon name={cfg.icon} className={`${winner ? "size-9" : "size-7"} ${t.text}`} />
          <p className={`font-ui font-bold uppercase tracking-[0.1em] ${t.text} ${winner ? "text-lg" : "text-sm"}`}>{p.title}</p>
        </div>
        <p
          className={`mt-1 bg-gradient-to-b bg-clip-text font-display font-black leading-tight text-transparent ${t.amount} ${
            winner ? "text-4xl xl:text-5xl" : "text-3xl xl:text-4xl"
          }`}
        >
          <span className="font-sans">₹</span>
          {p.amount.replace("₹", "")}
        </p>
        <ul className="mt-2 space-y-1">
          {p.perks.map((perk) => (
            <li key={perk} className={`flex items-start gap-2 text-frost/90 ${winner ? "text-[13px]" : "text-[13px]"}`}>
              <span aria-hidden className={`mt-[3px] text-[10px] ${t.text}`}>
                ◆
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </TonedFrame>
  );
}

const AWARD_STYLE: { tone: Tone; icon: keyof typeof ICONS }[] = [
  { tone: "violet", icon: "shirt" },
  { tone: "green", icon: "leaf" },
  { tone: "cyan", icon: "laptop" },
  { tone: "magenta", icon: "users" },
];

export default function Prizes() {
  return (
    <section id="prizes" className="relative isolate overflow-hidden pb-20 pt-24 md:pt-28 lg:min-h-[max(100svh,940px)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/prize_bg.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_40%,rgba(10,6,3,0.55)_100%)]" />
      </div>

      <Banner side="left" />
      <Banner side="right" />

      <div className="relative mx-auto w-[92%] max-w-[1180px]">
        {/* Heading */}
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/70 md:w-28" />
            <p className="font-ui text-sm font-semibold uppercase tracking-[0.25em] text-frost/80">// 03.Prizes //</p>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/70 md:w-28" />
          </div>
          <h2 className="mt-3 font-display text-[10vw] font-black uppercase leading-none sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-[#ff926b] via-[#f35e28] to-[#c24d23] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(243,94,40,0.55)]">
              <span className="font-sans">₹</span>50,000+
            </span>{" "}
            <span className="neon-white">In</span> <span className="grad-24">Prizes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-frost/85 md:text-lg">
            Cash, internship interviews with Clothsy AI and FabricVTON, and special awards for standout builds.
          </p>
        </Reveal>

        {/* Podium: floating islands with prize cards */}
        <div className="relative mt-10 flex flex-col gap-5 lg:mt-6 lg:block lg:pt-[22%]">
          <Reveal className="relative aspect-[1774/887] w-full" y={50}>
            {ISLANDS.map((isl) => (
              <div key={isl.clip} className="absolute inset-0 animate-float-slow" style={{ clipPath: isl.clip, animationDelay: isl.delay }}>
                <Image
                  src="/prize_box.png"
                  alt=""
                  fill
                  sizes="(min-width:1024px) 1180px, 92vw"
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                />
              </div>
            ))}
            <span className="sr-only">Prize podium: winner in the centre, 1st runner-up on the left, 2nd runner-up on the right.</span>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3 lg:contents">
            {([2, 1, 3] as const).map((place, i) => {
              const cfg = PLACE[place];
              const style = { "--x": `${cfg.x}%`, "--b": `${cfg.bottom}%` } as CSSProperties;
              return (
                <div
                  key={place}
                  style={style}
                  className={`${place === 1 ? "order-first sm:order-none" : ""} lg:absolute lg:bottom-[var(--b)] lg:left-[var(--x)] lg:-translate-x-1/2 ${cfg.w}`}
                >
                  {/* Floats in step with its island (same delay); kept off the element that's centred with translate. */}
                  <div className="lg:animate-float-slow" style={{ animationDelay: cfg.delay }}>
                    <Reveal delay={0.15 * i + 0.2}>
                      <PrizeCard place={place} />
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Special awards */}
        <Reveal className="relative mt-14 lg:-mt-[4%]">
          <div className="relative z-10 mx-auto -mb-px w-fit">
            <div
              className="clip-slant flex items-center gap-3 bg-gradient-to-r from-cyan/70 via-violet to-magenta/70 p-[1.5px]"
              style={{ clipPath: "polygon(28px 0, calc(100% - 28px) 0, 100% 100%, 0 100%)" }}
            >
              <div
                className="flex items-center gap-3 bg-[#1a0d05] px-12 py-2.5"
                style={{ clipPath: "polygon(27px 0, calc(100% - 27px) 0, 100% 100%, 0 100%)" }}
              >
                <Icon name="trophy" className="size-6 text-cyan" />
                <span className="font-display text-lg font-bold uppercase tracking-[0.06em] text-frost md:text-xl">Special awards</span>
              </div>
            </div>
          </div>
          <div className="border border-violet/60 bg-[#1a0d05]/85 p-4 shadow-[0_0_40px_rgba(246,134,60,0.3)] backdrop-blur-sm md:p-5">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SPECIAL_AWARDS.map((a, i) => {
                const s = AWARD_STYLE[i];
                const t = TONE[s.tone];
                return (
                  <li key={a.title}>
                    <TonedFrame tone={s.tone} className="h-full">
                      <div className="flex h-full items-center gap-4 px-4 py-4">
                        <Icon name={s.icon} className={`size-10 shrink-0 ${t.text}`} />
                        <div>
                          <p className="font-ui text-[15px] font-bold leading-tight text-white">{a.title}</p>
                          {a.by && <p className="font-mono text-[10px] uppercase tracking-wider text-frost/60">{a.by}</p>}
                          <p className="mt-1.5 text-[13px] text-frost/85">{a.reward}</p>
                        </div>
                      </div>
                    </TonedFrame>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
