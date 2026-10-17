"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FabricSwatch, WordStack } from "@/components/hud";

const EASE = [0.22, 1, 0.36, 1] as const;

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

/** Tilted holographic panel floating around the jacket. */
function HoloPanel({ kind, className = "" }: { kind: "fabric" | "grid" | "floor"; className?: string }) {
  if (kind === "fabric") {
    return (
      <div className={`overflow-hidden border-2 border-magenta/70 shadow-[0_0_30px_rgba(250,96,39,0.55)] ${className}`}>
        <FabricSwatch id="holo-fabric" tone="violet" className="h-full w-full" />
      </div>
    );
  }
  return (
    <div
      className={`border border-cyan/70 bg-cyan/10 shadow-[0_0_30px_rgba(232,161,18,0.45)] [background-image:linear-gradient(rgba(232,161,18,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(232,161,18,0.45)_1px,transparent_1px)] ${
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
        <Image src="/new_bg.png" alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_30%,rgba(10,6,3,0.65)_100%)]" />
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
        <span aria-hidden className="absolute -right-10 bottom-[42%] hidden font-display text-4xl font-black italic text-magenta [text-shadow:0_0_12px_#fa6027] lg:block">
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
              className="object-contain drop-shadow-[0_20px_60px_rgba(246,134,60,0.55)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Date bar */}
      <Appear delay={0.7} className="relative z-20 -mt-[4%] flex w-[94%] max-w-[1040px] flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-0">
        <span aria-hidden className="hidden pr-3 font-display text-3xl font-black italic text-violet [text-shadow:0_0_10px_#f6863c] md:block">
          ///
        </span>
        <div className="clip-slant relative bg-gradient-to-r from-[#e86f1e] to-[#eb7424] px-8 py-3 text-center shadow-[0_0_30px_rgba(232,111,30,0.7)] md:px-10">
          <p className="whitespace-nowrap font-display text-lg font-bold uppercase tracking-[0.06em] text-white md:text-2xl">Nov 02 – 03, 2026</p>
        </div>
        <div className="clip-slant relative flex-1 bg-frost px-6 py-3 text-center md:-ml-3 md:px-10">
          <p className="font-ui text-sm font-bold uppercase tracking-[0.06em] text-void md:whitespace-nowrap md:text-base xl:text-lg">24-hour in-person hackathon • KIET Ghaziabad</p>
        </div>
        <span aria-hidden className="hidden pl-3 font-display text-3xl font-black italic text-violet [text-shadow:0_0_10px_#f6863c] md:block">
          ///
        </span>
      </Appear>

      {/* Bottom HUD frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[1.5%] bottom-5 z-10 h-28">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 100V14L12 0H260" fill="none" stroke="#f6863c" strokeOpacity="0.7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d="M740 0H988L1000 14V100" fill="none" stroke="#f6863c" strokeOpacity="0.7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d="M0 99.5H1000" stroke="#f6863c" strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <WordStack words={["Fashion", "meets", "technology"]} rule={false} className="absolute bottom-9 left-[3.5%] z-10 hidden text-[11px] md:flex" />
      <WordStack words={["Create", "Innovate", "Style", "Impact"]} rule={false} align="right" className="absolute bottom-9 right-[3.5%] z-10 hidden text-[11px] md:flex" />
    </section>
  );
}
