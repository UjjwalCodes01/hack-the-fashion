"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Brackets, FabricSwatch, JacketOutline, Label, Meters, Spark, WordStack, Globe } from "@/components/hud";

const EASE = [0.22, 1, 0.36, 1] as const;

const MATERIAL = [
  { k: "Texture", v: 92, c: "cyan" as const },
  { k: "Durability", v: 86, c: "violet" as const },
  { k: "Sustainability", v: 94, c: "magenta" as const },
  { k: "Style", v: 78, c: "cyan" as const },
];

const TRACK_STATUS = [
  { t: "Virtual try-on", s: "Online" },
  { t: "AI fashion design", s: "Loading" },
  { t: "Sustainable fashion", s: "Ready" },
  { t: "Fashion commerce", s: "Ready" },
];

function Appear({ delay = 0, className = "", children }: { delay?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MaterialCard() {
  return (
    <div className="hud-panel relative w-[290px] p-4">
      <Brackets color="border-magenta" size="size-3" />
      <div className="flex gap-3">
        <div className="flex-1">
          <p className="font-ui text-sm font-bold uppercase leading-tight tracking-[0.12em] text-frost">
            Material
            <br />
            analysis
          </p>
          <Meters
            className="mt-3"
            values={[
              { v: 80, c: "magenta" },
              { v: 62, c: "cyan" },
              { v: 70, c: "violet" },
            ]}
          />
        </div>
        <div className="relative h-[86px] w-[92px] overflow-hidden border border-cyan/50">
          <FabricSwatch id="hero-mat" tone="cyan" className="h-full w-full grayscale" />
        </div>
      </div>
      <div className="mt-3 flex items-end gap-3">
        <dl className="flex-1 space-y-1">
          {MATERIAL.map((m) => (
            <div key={m.k} className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-frost/70">
              <dt>{m.k}</dt>
              <dd className="text-frost">{(m.v / 100).toFixed(2)}</dd>
            </div>
          ))}
        </dl>
        <Spark className="h-12 w-24" />
      </div>
    </div>
  );
}

function DetectionCard() {
  return (
    <div className="hud-panel relative w-[250px] p-4">
      <Brackets color="border-violet" size="size-3" />
      <Label className="text-frost">Garment detection</Label>
      <div className="mt-3 grid grid-cols-[1.5fr_1fr] gap-2">
        <div className="relative aspect-[4/5] overflow-hidden border border-magenta/60 bg-void">
          <div className="hud-grid absolute inset-0" />
          <Image src="/about_jabket.png" alt="" fill sizes="140px" className="object-contain p-1" />
          <span className="absolute inset-x-0 top-0 h-6 animate-scan bg-gradient-to-b from-transparent via-cyan/40 to-transparent" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-1 items-center justify-center border border-cyan/40">
            <JacketOutline className="size-10" />
          </div>
          <div className="flex flex-1 items-center justify-center border border-cyan/40">
            <JacketOutline className="size-10" color="#c4b5fd" />
          </div>
        </div>
      </div>
      <Meters
        className="mt-3"
        values={[
          { v: 72, c: "cyan" },
          { v: 48, c: "magenta" },
        ]}
      />
    </div>
  );
}

function StatusCard() {
  return (
    <div className="hud-panel relative w-[330px] p-5">
      <Brackets color="border-magenta" size="size-3" />
      <div className="flex justify-between">
        <Label className="text-frost/60">Hack the fashion //</Label>
        <Label className="text-magenta">HTF-01 ●</Label>
      </div>
      <p className="mt-3 font-display text-2xl font-bold leading-none text-frost">AI × FASHION</p>
      <p className="mt-1 font-display text-xl font-bold leading-tight text-magenta [text-shadow:0_0_14px_rgba(224,64,251,0.6)]">
        Build the future
      </p>
      <div className="mt-4 flex items-end gap-3 border-t border-violet/30 pt-3">
        <ul className="flex-1 space-y-1">
          {TRACK_STATUS.map((r) => (
            <li key={r.t} className="grid grid-cols-[1fr_auto_auto] gap-2 font-mono text-[9.5px] uppercase tracking-wider text-frost/70">
              <span>{r.t}</span>
              <span className="text-violet">[ // ]</span>
              <span className={r.s === "Online" ? "text-cyan" : r.s === "Loading" ? "text-magenta" : "text-frost"}>{r.s}</span>
            </li>
          ))}
        </ul>
        <Globe className="size-12 shrink-0 animate-spin-slow text-frost/70" />
      </div>
    </div>
  );
}

/** Tilted holographic panel floating around the jacket. */
function HoloPanel({ kind, className = "" }: { kind: "fabric" | "grid" | "floor"; className?: string }) {
  if (kind === "fabric") {
    return (
      <div className={`overflow-hidden border-2 border-magenta/70 shadow-[0_0_30px_rgba(224,64,251,0.55)] ${className}`}>
        <FabricSwatch id="holo-fabric" tone="violet" className="h-full w-full" />
      </div>
    );
  }
  return (
    <div
      className={`border border-cyan/70 bg-cyan/10 shadow-[0_0_30px_rgba(34,211,238,0.45)] [background-image:linear-gradient(rgba(34,211,238,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.45)_1px,transparent_1px)] ${
        kind === "floor" ? "[background-size:16px_16px]" : "[background-size:10px_10px]"
      } ${className}`}
    />
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden pb-32 pt-28 md:pb-40 md:pt-32 lg:min-h-[max(100svh,860px)] lg:justify-start">
      {/* Backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src="/hero_bg.png" alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_30%,rgba(4,3,10,0.65)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* Corner word stacks */}
      <Appear delay={0.6} className="absolute left-[6%] top-36 hidden xl:block">
        <WordStack words={["Ideas", "Fabrics", "AI models", "Real impact"]} />
      </Appear>
      <Appear delay={0.6} className="absolute right-[6%] top-36 hidden xl:block">
        <WordStack words={["AI", "Fashion", "Tech", "Hackathon"]} rule={false} className="text-left" />
      </Appear>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative z-10 text-center font-display font-black uppercase leading-[0.92]"
      >
        <span className="neon-white block text-[13vw] tracking-[0.02em] sm:text-[10vw] lg:text-[8.2vw] 2xl:text-[150px]">Hack the</span>
        <span className="neon-violet block text-[13vw] tracking-[0.02em] sm:text-[10vw] lg:text-[8.2vw] 2xl:text-[150px]">Fashion</span>
        <span aria-hidden className="absolute -right-10 bottom-[42%] hidden font-display text-4xl font-black italic text-magenta [text-shadow:0_0_12px_#e040fb] lg:block">
          ///
        </span>
      </motion.h1>

      {/* Jacket stage */}
      <div className="relative z-0 -mt-[2vw] w-[92vw] max-w-[820px] sm:w-[70vw] lg:w-[48vw]">
        <HoloPanel kind="fabric" className="absolute -left-[20%] top-[8%] hidden h-[34%] w-[24%] animate-float-slow [transform:perspective(600px)_rotateY(28deg)_rotateZ(-10deg)] lg:block" />
        <HoloPanel kind="grid" className="absolute left-[4%] top-[2%] hidden h-[30%] w-[17%] animate-float opacity-80 [transform:perspective(600px)_rotateY(-22deg)_rotateZ(-6deg)] lg:block" />
        <HoloPanel kind="grid" className="absolute -right-[4%] top-[4%] hidden h-[28%] w-[16%] animate-float-slow opacity-80 [transform:perspective(600px)_rotateY(30deg)_rotateZ(8deg)] lg:block" />
        <HoloPanel kind="floor" className="absolute bottom-[4%] right-[16%] hidden h-[18%] w-[26%] animate-float [transform:perspective(500px)_rotateX(55deg)_rotateZ(-14deg)] lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
          className="relative aspect-[1536/1024]"
        >
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-violet/35 blur-[90px]" />
          <div className="relative h-full w-full animate-float">
            <Image
              src="/hero_jacket.png"
              alt="Iridescent purple tech-wear jacket with cyan trims, floating above a stack of folded fabric"
              fill
              priority
              sizes="(min-width:1024px) 48vw, 92vw"
              className="object-contain drop-shadow-[0_20px_60px_rgba(168,85,247,0.55)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Floating HUD readouts (desktop) */}
      <Appear delay={0.8} className="absolute left-[4%] top-[54%] z-10 hidden animate-float-slow xl:block">
        <MaterialCard />
      </Appear>
      <Appear delay={0.9} className="absolute right-[4%] top-[29%] z-10 hidden animate-float xl:block">
        <DetectionCard />
      </Appear>
      <Appear delay={1} className="absolute right-[3%] top-[57%] z-10 hidden animate-float-slow xl:block">
        <StatusCard />
      </Appear>

      {/* Date bar */}
      <Appear delay={0.7} className="relative z-20 -mt-[4%] flex w-[94%] max-w-[1040px] flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-0">
        <span aria-hidden className="hidden pr-3 font-display text-3xl font-black italic text-violet [text-shadow:0_0_10px_#a855f7] md:block">
          ///
        </span>
        <div className="clip-slant relative bg-gradient-to-r from-[#9333ea] to-[#7c3aed] px-8 py-3 text-center shadow-[0_0_30px_rgba(147,51,234,0.7)] md:px-10">
          <p className="whitespace-nowrap font-display text-lg font-bold uppercase tracking-[0.06em] text-white md:text-2xl">Nov 02 – 03, 2026</p>
        </div>
        <div className="clip-slant relative flex-1 bg-frost px-6 py-3 text-center md:-ml-3 md:px-10">
          <p className="font-ui text-sm font-bold uppercase tracking-[0.06em] text-void md:whitespace-nowrap md:text-base xl:text-lg">24-hour in-person hackathon • KIET Ghaziabad</p>
        </div>
        <span aria-hidden className="hidden pl-3 font-display text-3xl font-black italic text-violet [text-shadow:0_0_10px_#a855f7] md:block">
          ///
        </span>
      </Appear>

      {/* Bottom HUD frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[1.5%] bottom-5 z-10 h-28">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 100V14L12 0H260" fill="none" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d="M740 0H988L1000 14V100" fill="none" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d="M0 99.5H1000" stroke="#a855f7" strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <WordStack words={["Fashion", "meets", "technology"]} rule={false} className="absolute bottom-9 left-[3.5%] z-10 hidden text-[11px] md:flex" />
      <WordStack words={["Create", "Innovate", "Style", "Impact"]} rule={false} align="right" className="absolute bottom-9 right-[3.5%] z-10 hidden text-[11px] md:flex" />
    </section>
  );
}
