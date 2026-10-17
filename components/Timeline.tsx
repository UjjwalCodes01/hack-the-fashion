"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Plus } from "@/components/hud";
import { Reveal } from "@/components/motion";
import { TIMELINE, type TimelineIcon } from "@/lib/content";

/* Node centres measured from public/timeline_track.png (percent of width / height). */
const NODES: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 50.1, y: 2.2, side: "left" },
  { x: 82.6, y: 10.9, side: "left" },
  { x: 46.5, y: 20.3, side: "left" },
  { x: 83.1, y: 32.1, side: "left" },
  { x: 33.4, y: 42.8, side: "right" },
  { x: 79.6, y: 58.1, side: "left" },
  { x: 49.7, y: 85.9, side: "left" },
];

const ICON_PATHS: Record<TimelineIcon, string[]> = {
  register: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  shortlist: ["m3 17 2 2 4-4", "m3 7 2 2 4-4", "M13 6h8", "M13 12h8", "M13 18h8"],
  briefing: ["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"],
  start: ["M6 3l14 9-14 9V3z"],
  submit: ["M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2", "M12 12v9", "m16 16-4-4-4 4"],
  trophy: [
    "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
    "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
    "M4 22h16",
    "M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22",
    "M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8",
    "M18 2H6v7a6 6 0 0 0 12 0V2z",
  ],
};

function Icon({ name, className = "" }: { name: TimelineIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function StopCard({ i, compact = false }: { i: number; compact?: boolean }) {
  const t = TIMELINE[i];
  const magenta = i % 2 === 0;
  const tone = magenta
    ? { box: "border-magenta text-magenta shadow-[0_0_16px_rgba(250,96,39,0.55)]", num: "text-magenta", edge: "border-magenta/70" }
    : { box: "border-cyan text-cyan shadow-[0_0_16px_rgba(232,161,18,0.5)]", num: "text-cyan", edge: "border-cyan/70" };
  return (
    <div className={`clip-chamfer flex items-stretch border bg-void/85 backdrop-blur-sm ${tone.edge} ${compact ? "" : "shadow-[0_0_24px_rgba(246,134,60,0.25)]"}`}>
      <div className={`m-2 flex w-14 shrink-0 items-center justify-center border-2 bg-void md:w-16 ${tone.box}`}>
        <Icon name={t.icon} className="size-7 md:size-8" />
      </div>
      <div className="flex min-w-0 flex-col justify-center py-2.5 pl-2 pr-4">
        <span className={`font-display text-lg font-bold leading-none ${tone.num}`}>{String(i + 1).padStart(2, "0")}</span>
        <span className="mt-1 font-ui text-[15px] font-bold uppercase leading-tight tracking-[0.04em] text-white">{t.title}</span>
        {t.sub && <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.08em] text-frost/70">{t.sub}</span>}
        <span className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-frost/80">{t.stamp}</span>
      </div>
    </div>
  );
}

function Track() {
  return (
    <div className="relative mx-auto mt-10 hidden aspect-[1189/1323] w-full max-w-[1000px] md:block">
      {/* The circuit fades and settles in (same in-view trigger as the cards, so it always shows). */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/timeline_track.png"
          alt="Neon race track winding through seven checkpoints to the finish line"
          fill
          sizes="(min-width:1024px) 1000px, 100vw"
          className="object-contain drop-shadow-[0_0_24px_rgba(250,96,39,0.35)]"
        />
      </motion.div>
      <ol>
        {NODES.map((n, i) => {
          const pos =
            n.side === "left"
              ? { right: `${100 - n.x + 3.2}%`, top: `${n.y}%` }
              : { left: `${n.x + 3.2}%`, top: `${n.y}%` };
          return (
            <li key={i} className="absolute w-[min(330px,34%)] -translate-y-1/2" style={pos}>
              <motion.div
                initial={{ opacity: 0, x: n.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 * i }}
                className="relative"
              >
                <StopCard i={i} />
                {/* connector to the node */}
                <span
                  aria-hidden
                  className={`absolute top-1/2 h-px w-[3.2vw] max-w-8 bg-gradient-to-r ${
                    n.side === "left" ? "left-full from-violet to-transparent" : "right-full from-transparent to-violet"
                  }`}
                />
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative isolate overflow-hidden pb-20 pt-24 md:pb-24 md:pt-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/timeline_bg.png" alt="" fill sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/20 to-void/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      <Plus className="absolute left-[6%] top-12 hidden md:block" />
      <Plus className="absolute right-[6%] top-12 hidden md:block" />

      <div className="relative mx-auto w-[90%] max-w-[1200px]">
        {/* Side readouts */}
        <Reveal className="absolute left-0 top-24 hidden lg:block">
          <p className="font-ui text-[12px] font-medium uppercase leading-relaxed tracking-[0.24em] text-frost/75">
            Your journey
            <br />
            from idea
            <br />
            to impact
          </p>
        </Reveal>
        <Reveal className="mx-auto mb-8 w-fit lg:absolute lg:right-0 lg:top-14 lg:mb-0">
          <div className="hud-panel relative px-6 py-3 text-center">
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-frost/70">Laps to innovation</p>
            <p className="mt-1 font-display text-4xl font-bold leading-none">
              <span className="neon-magenta">00</span>
              <span className="mx-2 text-2xl text-frost">→</span>
              <span className="neon-cyan">24</span>
            </p>
            <p className="mt-1 font-ui text-xs font-bold uppercase tracking-[0.2em] text-frost">Hours</p>
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal className="text-center">
          <p className="font-ui text-sm font-bold uppercase tracking-[0.35em] text-magenta">
            <span className="mr-2 text-magenta/60">{"////"}</span>Roadmap<span className="ml-2 text-magenta/60">{"////"}</span>
          </p>
          <h2 className="mt-3 font-display text-[13vw] font-black uppercase leading-none sm:text-7xl lg:text-8xl">
            <span className="neon-white">The </span>
            <span className="grad-circuit">Circuit</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="hidden h-px w-20 bg-frost/40 sm:block" />
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.4em] text-frost md:text-sm">
              Race • Build • Innovate • Win
            </p>
            <span className="hidden h-px w-20 bg-frost/40 sm:block" />
          </div>
        </Reveal>

        {/* Desktop/tablet: the circuit */}
        <Track />

        {/* Mobile: stacked laps */}
        <ol className="relative mt-10 space-y-4 pl-6 md:hidden">
          <span aria-hidden className="absolute bottom-2 left-0 top-2 w-0.5 bg-gradient-to-b from-magenta via-violet to-cyan shadow-[0_0_10px_#f6863c]" />
          {TIMELINE.map((_, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[31px] top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 bg-void ${
                  i % 2 === 0 ? "border-magenta shadow-[0_0_10px_#fa6027]" : "border-cyan shadow-[0_0_10px_#e8a112]"
                }`}
              />
              <Reveal delay={0.04 * i} y={16}>
                <StopCard i={i} compact />
              </Reveal>
            </li>
          ))}
          <li className="pt-2 text-center font-display text-3xl font-black uppercase tracking-[0.1em] text-magenta [text-shadow:0_0_14px_#fa6027]">
            Finish
          </li>
        </ol>

        <p className="mt-10 text-center font-ui text-xs font-semibold uppercase tracking-[0.5em] text-frost/80 md:mt-6 md:text-sm">
          Ideas today <span className="mx-2 text-magenta">•</span> Impact tomorrow
        </p>
      </div>
    </section>
  );
}
