"use client";

import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { Kicker, NeonFrame } from "@/components/hud";
import { Reveal } from "@/components/motion";
import { EVENT, FAQS } from "@/lib/content";
import Image from "next/image";

const ICON: Record<string, string[]> = {
  users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  rupee: ["M6 3h12", "M6 8h12", "m6 13 8.5 8", "M6 13h3", "M9 13c6.67 0 6.67-10 0-10"],
  code: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"],
  user: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  shirt: ["M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"],
  food: ["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", "M7 2v20", "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"],
  bot: ["M12 8V4H8", "M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z", "M2 14h2", "M20 14h2", "M15 13v2", "M9 13v2"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8"],
  bed: ["M2 4v16", "M2 8h18a2 2 0 0 1 2 2v10", "M2 17h20", "M6 8v9"],
  cash: ["M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M6 12h.01M18 12h.01"],
  mail: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "m22 6-10 7L2 6"],
};

// One icon per entry in FAQS (same order); the last FAQ ("Who do I contact…") becomes "Still have a question?".
const FAQ_ICONS = ["users", "rupee", "users", "code", "user", "shirt", "food", "bot", "file", "bed", "cash", "mail"];

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {(ICON[name] ?? ICON.mail).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/* ── Pixel "?" cube ─────────────────────────────────────────────────────── */

const Q = [".###.", "#...#", "....#", "...#.", "..#..", ".....", "..#.."];

function PixelQ({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 5 7" className="h-[62%] w-auto" shapeRendering="crispEdges" style={{ filter: `drop-shadow(0 0 6px ${color})` }} aria-hidden>
      {Q.flatMap((row, y) => [...row].map((c, x) => (c === "#" ? <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null)))}
    </svg>
  );
}

function QuestionCube({ size, className = "", style }: { size: number; className?: string; style?: CSSProperties }) {
  const half = size / 2;
  const faces = [
    { t: `translateZ(${half}px)`, c: "#f5d0fe", b: "#e040fb" },
    { t: `rotateY(90deg) translateZ(${half}px)`, c: "#67e8f9", b: "#22d3ee" },
    { t: `rotateY(180deg) translateZ(${half}px)`, c: "#f5d0fe", b: "#e040fb" },
    { t: `rotateY(-90deg) translateZ(${half}px)`, c: "#67e8f9", b: "#22d3ee" },
    { t: `rotateX(90deg) translateZ(${half}px)`, c: "#e9d5ff", b: "#a855f7" },
    { t: `rotateX(-90deg) translateZ(${half}px)`, c: "#e9d5ff", b: "#a855f7" },
  ];
  return (
    <div className={className} style={{ width: size, height: size, perspective: size * 5, ...style }} aria-hidden>
      <div className="relative h-full w-full animate-cube [transform-style:preserve-3d] [transform:rotateX(-18deg)_rotateY(-34deg)]">
        {faces.map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]"
            style={{
              transform: f.t,
              background:
                "linear-gradient(135deg,#2a1748 0%,#160c2c 55%,#0e081e 100%), repeating-linear-gradient(0deg,transparent 0 11px,rgba(255,255,255,0.04) 11px 12px)",
              border: `${Math.max(2, size / 40)}px solid ${f.b}`,
              boxShadow: `inset 0 0 ${size / 6}px ${f.b}66, 0 0 ${size / 8}px ${f.b}88`,
            }}
          >
            <div className="absolute inset-[8%] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12.5%_12.5%]" />
            <PixelQ color={f.c} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CubeShrine() {
  const steps = ["Ideas", "People", "Fashion", "Tech"];
  return (
    <div className="relative mx-auto h-[600px] w-full max-w-[520px]">
      <QuestionCube size={52} className="absolute left-[14%] top-[2%] animate-float-slow" style={{ animationDelay: "-3s" }} />
      <QuestionCube size={40} className="absolute right-[10%] top-[30%] animate-float" style={{ animationDelay: "-1s" }} />
      <QuestionCube size={44} className="absolute left-[2%] top-[52%] animate-float-slow" />

      <div className="absolute left-1/2 top-[10%] -translate-x-1/2">
        <div className="animate-float">
          <QuestionCube size={200} />
        </div>
        <div aria-hidden className="mx-auto mt-10 h-6 w-48 animate-glow rounded-[50%] bg-magenta/40 blur-xl" />
      </div>

      {/* Stone steps */}
      <div className="absolute bottom-0 left-[12%] right-0 flex flex-col">
        {steps.map((s, i) => (
          <div
            key={s}
            className="relative flex h-14 items-center border border-[#3b2a5c] bg-gradient-to-b from-[#2a1d42] to-[#170f28] px-5 shadow-[inset_0_2px_0_rgba(255,255,255,0.06),0_6px_14px_rgba(0,0,0,0.5)]"
            style={{ marginLeft: `${i * 9}%`, marginTop: i ? -2 : 0 }}
          >
            <span className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px)] [background-size:22px_14px]" />
            <span className="relative font-display text-xl font-black uppercase tracking-[0.06em] text-[#f9a8f4] drop-shadow-[0_0_8px_#e040fb]">{s}</span>
            <span className="absolute -left-1 bottom-1 size-2.5 bg-magenta shadow-[0_0_10px_#e040fb]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Accordion ──────────────────────────────────────────────────────────── */

type Item = { q: string; a: ReactNode; icon: string };

function Row({ item, i, open, onToggle }: { item: Item; i: number; open: boolean; onToggle: () => void }) {
  // Rows alternate magenta / cyan; the open row is always magenta.
  const hex = open ? "#e040fb" : i % 2 === 0 ? "#d946ef" : "#22d3ee";
  const tone = hex === "#22d3ee" ? "text-cyan" : "text-magenta";
  return (
    <NeonFrame hex={hex} innerClassName={open ? "bg-gradient-to-r from-[#3b0d4f]/95 via-[#1a0b33]/95 to-[#0b0722]/95" : "bg-[#0a0620]/92"}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${i}`}
          id={`faq-q-${i}`}
          className="flex w-full items-center gap-4 px-4 py-3 text-left md:px-5"
        >
          <Icon name={item.icon} className={`size-6 shrink-0 ${tone}`} />
          <span aria-hidden className="h-6 w-px bg-white/15" />
          <span className={`flex-1 font-ui text-[15px] font-bold md:text-base ${open ? "text-[#f0abfc]" : "text-white"}`}>{item.q}</span>
          <svg viewBox="0 0 24 24" className={`size-5 shrink-0 transition-transform duration-300 ${tone} ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${i}`}
            role="region"
            aria-labelledby={`faq-q-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-3 mb-3 rounded-sm border border-white/10 bg-void/40 px-4 py-3 text-[14px] leading-relaxed text-frost/85 md:mx-4">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </NeonFrame>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const items: Item[] = [
    ...FAQS.slice(0, -1).map((f, i) => ({ q: f.q, a: f.a, icon: FAQ_ICONS[i] })),
    {
      q: "Still have a question?",
      icon: "mail",
      a: (
        <>
          Email us at{" "}
          <a href={`mailto:${EVENT.email}`} className="text-cyan underline-offset-4 hover:underline">
            {EVENT.email}
          </a>{" "}
          or message us on{" "}
          <a href={EVENT.instagram} target="_blank" rel="noopener noreferrer" className="text-cyan underline-offset-4 hover:underline">
            Instagram
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="relative isolate overflow-hidden pb-24 pt-24 md:pt-28 lg:min-h-[max(100svh,940px)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/faq_bg.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
      </div>

      <div className="relative mx-auto w-[92%] max-w-[1200px] xl:w-[78%]">
        <Reveal className="text-center">
          <Kicker>// 09. FAQ //</Kicker>
          <h2 className="mt-4 font-display text-[9vw] font-black uppercase leading-none sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white via-[#e6e9f5] to-[#9aa3b8] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(200,220,255,0.35)]">
              Questions,
            </span>{" "}
            <span className="grad-circuit">Answered</span>
          </h2>
          <p className="mt-5 font-ui text-xs font-semibold uppercase tracking-[0.35em] text-frost md:text-sm md:tracking-[0.45em]">
            Still curious? We&apos;ve got you covered.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-frost/85 md:text-lg">
            Find answers to the most common questions about Hack the Fashion 2026. Can&apos;t find what you&apos;re looking
            for? Feel free to reach out to us.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="hidden lg:block" y={40}>
            <CubeShrine />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={item.q}>
                  <Row item={item} i={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
