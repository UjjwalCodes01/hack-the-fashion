import Image from "next/image";
import type { ReactNode } from "react";
import { Banner, Kicker, NeonFrame } from "@/components/hud";
import { Reveal } from "@/components/motion";
import { EVENT } from "@/lib/content";

const MAGENTA = "#d946ef";
const CYAN = "#22d3ee";

const ICON: Record<string, string[]> = {
  crown: [
    "M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.3l4.27-3.67a.5.5 0 0 1 .8.52l-2.83 10.25a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52L7.09 9.17a1 1 0 0 0 1.52-.3z",
    "M5 21h14",
  ],
  bolt: ["M13 2 3 14h9l-1 8 10-12h-9l1-8z"],
  star: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  handshake: [
    "m11 17 2 2a1 1 0 1 0 3-3",
    "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
    "m21 3 1 11h-2",
    "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
    "M3 4h8",
  ],
  plus: ["M12 5v14", "M5 12h14"],
};

function Icon({ name, className = "" }: { name: keyof typeof ICON; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {ICON[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** Neon tier panel with a label tab centred on its top edge. */
function Tier({
  hex,
  label,
  icon,
  className = "",
  children,
}: {
  hex: string;
  label: string;
  icon: keyof typeof ICON;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative pt-4 ${className}`}>
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2" style={{ filter: `drop-shadow(0 0 8px ${hex})` }}>
        <div className="clip-chamfer p-[1.5px]" style={{ background: hex }}>
          <div className="clip-chamfer flex items-center gap-2 whitespace-nowrap bg-[#0a0620] px-5 py-1.5">
            <Icon name={icon} className="size-4" />
            <span className="font-ui text-[13px] font-bold uppercase tracking-[0.14em] text-frost">{label}</span>
          </div>
        </div>
      </div>
      <NeonFrame hex={hex} className="h-full" innerClassName="bg-[#08051c]/88">
        <div className="h-full px-5 pb-5 pt-9">{children}</div>
      </NeonFrame>
    </div>
  );
}

function Tagline({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-frost/75">{children}</p>;
}

function LogoTile({ children, href, label }: { children: ReactNode; href?: string; label?: string }) {
  const cls =
    "flex h-16 items-center justify-center border border-white/12 bg-[#0c0824]/90 px-3 transition-colors hover:border-white/35 md:h-[4.5rem]";
  return href ? (
    <a href={href} aria-label={label} className={`${cls} group`}>
      {children}
    </a>
  ) : (
    <div className={cls}>{children}</div>
  );
}

function OpenSlot({ href, text }: { href: string; text: string }) {
  return (
    <LogoTile href={href} label={text}>
      <span className="flex flex-col items-center gap-1 text-frost/50 transition-colors group-hover:text-frost">
        <Icon name="plus" className="size-5" />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">{text}</span>
      </span>
    </LogoTile>
  );
}

export default function Sponsors() {
  const partnerMail = `mailto:${EVENT.email}?subject=Partnering%20with%20Hack%20the%20Fashion`;
  return (
    <section id="sponsors" className="relative isolate overflow-hidden pb-24 pt-24 md:pt-28 lg:min-h-[max(100svh,940px)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/sponsers_bg.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(4,3,10,0.35)_0%,transparent_60%)]" />
      </div>

      <Banner side="left" />
      <Banner side="right" lines={["Ideas", "Style", "Impact"]} />

      <div className="relative mx-auto w-[92%] max-w-[1150px] xl:w-[70%]">
        {/* Heading */}
        <Reveal className="text-center">
          <Kicker>// 08. Sponsors //</Kicker>
          <h2 className="mt-4 font-display text-[11vw] font-black uppercase leading-none sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white via-[#e6e9f5] to-[#9aa3b8] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(200,220,255,0.35)]">
              Our
            </span>{" "}
            <span className="grad-circuit">Sponsors</span>
          </h2>
          <p className="mt-5 font-ui text-xs font-semibold uppercase tracking-[0.3em] text-frost md:text-sm md:tracking-[0.4em]">
            Powering ideas <span className="mx-2 text-magenta">•</span> Fueling innovation <span className="mx-2 text-magenta">•</span> Building the future
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-frost/85 md:text-lg">
            We&apos;re proud to collaborate with industry leaders, innovative brands and communities who believe in the next
            generation of creators.
          </p>
          <div aria-hidden className="mx-auto mt-5 h-0.5 w-48 bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_10px_#22d3ee]" />
        </Reveal>

        {/* Title sponsor */}
        <Reveal className="mx-auto mt-10 w-full max-w-[460px]">
          <Tier hex={MAGENTA} label="Title sponsor" icon="crown">
            <a href={EVENT.clothsyUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Image src="/logos/clothsy-wordmark.png" alt="Clothsy AI" width={600} height={149} className="mx-auto h-14 w-auto brightness-0 invert md:h-16" />
            </a>
            <Tagline>See it on you, before you buy.</Tagline>
          </Tier>
        </Reveal>

        {/* Powered by / Organised by */}
        <div className="mx-auto mt-6 grid max-w-[860px] gap-6 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Tier hex={CYAN} label="Powered by" icon="bolt">
              <a href={EVENT.fabricvtonUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Image src="/logos/fabricvton.webp" alt="FabricVTON" width={900} height={253} className="mx-auto h-11 w-auto brightness-0 invert" />
              </a>
              <Tagline>AI virtual try-on</Tagline>
            </Tier>
          </Reveal>
          <Reveal delay={0.1}>
            <Tier hex={MAGENTA} label="Organized by" icon="users">
              <div className="flex items-center justify-center gap-5">
                <Image src="/logos/ai-skills-lab.png" alt="AI Skills Lab CoE" width={500} height={500} className="size-12 rounded-full bg-white p-0.5" />
                <span aria-hidden className="h-8 w-px bg-white/20" />
                <Image src="/logos/kiet.png" alt="KIET Group of Institutions" width={662} height={223} className="h-11 w-auto brightness-0 invert" />
              </div>
              <Tagline>AI Skills Lab CoE · KIET</Tagline>
            </Tier>
          </Reveal>
        </div>

        {/* Supporting / community partners */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal delay={0.05}>
            <Tier hex={CYAN} label="Supporting partners" icon="star">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <LogoTile>
                  <Image src="/logos/hp.png" alt="HP" width={228} height={228} className="h-11 w-auto" />
                </LogoTile>
                <LogoTile>
                  <Image src="/logos/intel.png" alt="Intel" width={328} height={217} className="h-10 w-auto" />
                </LogoTile>
                <OpenSlot href={EVENT.brochure} text="Your brand" />
                <OpenSlot href={EVENT.brochure} text="Your brand" />
              </div>
            </Tier>
          </Reveal>
          <Reveal delay={0.1}>
            <Tier hex={MAGENTA} label="Community partners" icon="users">
              <div className="grid grid-cols-3 gap-3">
                <OpenSlot href={partnerMail} text="Slot open" />
                <OpenSlot href={partnerMail} text="Slot open" />
                <OpenSlot href={partnerMail} text="Slot open" />
              </div>
            </Tier>
          </Reveal>
        </div>

        {/* Join bar */}
        <Reveal className="mx-auto mt-8 max-w-[930px]">
          <NeonFrame hex="#8b5cf6" innerClassName="bg-[#08051c]/90">
            <div className="flex flex-col items-center gap-5 px-6 py-5 text-center md:flex-row md:text-left">
              <Icon name="handshake" className="size-12 shrink-0 text-magenta drop-shadow-[0_0_8px_#e040fb]" />
              <span aria-hidden className="hidden h-12 w-px bg-white/15 md:block" />
              <div className="flex-1">
                <p className="font-ui text-base font-bold uppercase tracking-[0.3em] text-white">Join our sponsors</p>
                <p className="mt-1 text-sm text-frost/75">
                  Be part of a movement that blends fashion, technology and creativity. Tiers start at ₹5,000 —{" "}
                  <a href={EVENT.brochure} target="_blank" rel="noopener noreferrer" className="text-cyan underline-offset-4 hover:underline">
                    brochure (PDF)
                  </a>
                  .
                </p>
              </div>
              <a
                href={partnerMail}
                className="group relative inline-flex shrink-0 items-center gap-2 border border-[#f0abfc] bg-gradient-to-r from-[#c026d3] to-[#9333ea] px-7 py-3 font-ui text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_24px_rgba(217,70,239,0.55)] transition hover:brightness-125"
              >
                Become a sponsor <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </NeonFrame>
        </Reveal>
      </div>
    </section>
  );
}
