import Image from "next/image";
import Link from "next/link";
import { Kicker, NeonFrame } from "@/components/hud";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { EVENT, RULES } from "@/lib/content";

// Same pair of accents the Sponsors / FAQ sections use.
const ORANGE = "#ed622f";
const AMBER = "#e8a112";

const AT_A_GLANCE = [
  { value: "2–4", label: "Members per team" },
  { value: "₹0", label: "Entry fee" },
  { value: "24h", label: "Built on site" },
  { value: "1", label: "Team per person" },
];

/** Octagonal number badge. */
function Badge({ n, hex }: { n: number; hex: string }) {
  const oct = "polygon(28% 0,72% 0,100% 28%,100% 72%,72% 100%,28% 100%,0 72%,0 28%)";
  return (
    <span className="flex size-14 shrink-0 items-center justify-center p-[2px]" style={{ clipPath: oct, background: `linear-gradient(135deg, ${hex}, ${hex}40)` }}>
      <span className="flex h-full w-full items-center justify-center bg-[#1a0d05] font-display text-xl font-black" style={{ clipPath: oct, color: hex }}>
        {String(n).padStart(2, "0")}
      </span>
    </span>
  );
}

export default function Rules() {
  return (
    <section id="rules" className="relative isolate overflow-hidden pb-24 pt-24 md:pt-28 lg:min-h-[max(100svh,900px)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/new_bg.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(10,6,3,0.55)_0%,transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-[92%] max-w-[1200px]">
        {/* Heading — same pattern as the other sections */}
        <Reveal className="text-center">
          <Kicker>// 04. Rules //</Kicker>
          <h2 className="mt-4 font-display text-[11vw] font-black uppercase italic leading-none sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-b from-white via-[#e6e9f5] to-[#9aa3b8] bg-clip-text pr-2 text-transparent drop-shadow-[0_0_14px_rgba(255,230,200,0.35)]">
              Play it
            </span>{" "}
            <span className="grad-circuit pr-2">Fair</span>
          </h2>
          <p className="mt-5 font-ui text-xs font-semibold uppercase tracking-[0.4em] text-frost md:text-sm md:tracking-[0.5em]">
            Create bolder. Compete fairer.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-frost/85 md:text-lg">
            Eight rules that keep the 24 hours smooth, inclusive and exciting for everyone. Read them once — then go build.
          </p>
        </Reveal>

        {/* At a glance */}
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <NeonFrame hex={AMBER} innerClassName="bg-[#140a04]/88 backdrop-blur-sm">
            <dl className="grid grid-cols-2 md:grid-cols-4">
              {AT_A_GLANCE.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-4 py-5 text-center ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-white/10`}
                >
                  <dd className="grad-circuit font-display text-3xl font-black leading-none md:text-4xl">{f.value}</dd>
                  <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-frost/70 md:text-[11px]">{f.label}</dt>
                </div>
              ))}
            </dl>
          </NeonFrame>
        </Reveal>

        {/* Rule cards */}
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RULES.map((rule, i) => {
            const hex = i % 2 === 0 ? ORANGE : AMBER;
            return (
              <li key={rule.title} className="h-full">
                <Reveal delay={0.05 * (i % 4)} y={18} className="h-full">
                  <NeonFrame hex={hex} innerClassName="bg-[#140a04]/88 backdrop-blur-sm" className="h-full">
                    <div className="flex h-full flex-col p-5">
                      <div className="flex items-start justify-between">
                        <Badge n={i + 1} hex={hex} />
                        <span style={{ color: hex, filter: `drop-shadow(0 0 6px ${hex})` }}>
                          <Icon name={rule.icon} filled className="size-8" />
                        </span>
                      </div>
                      <h3 className="mt-4 font-ui text-lg font-bold uppercase leading-tight tracking-[0.05em] text-white">{rule.title}</h3>
                      <span aria-hidden className="mt-2 h-px w-full" style={{ background: `linear-gradient(90deg, ${hex}, transparent)` }} />
                      <p className="mt-3 text-[14px] leading-relaxed text-frost/80">{rule.text}</p>
                    </div>
                  </NeonFrame>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Bottom bar */}
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <NeonFrame hex={ORANGE} fill={`linear-gradient(90deg, ${ORANGE}, ${AMBER} 50%, ${ORANGE})`} innerClassName="bg-[#140a04]/92">
            <div className="flex flex-col items-center gap-5 px-6 py-5 text-center md:flex-row md:text-left">
              <Icon name="flag" filled className="size-10 shrink-0 text-frost" />
              <p className="font-display text-lg font-black uppercase leading-tight text-white">
                Same energy.
                <br />
                <span className="grad-circuit">Real impact.</span>
              </p>
              <span aria-hidden className="hidden h-10 w-px bg-white/20 md:block" />
              <p className="flex-1 text-sm leading-snug text-frost/80">
                Questions about a rule? Write to{" "}
                <a href={`mailto:${EVENT.email}`} className="text-frost underline decoration-[#ed622f] underline-offset-4 hover:text-white">
                  {EVENT.email}
                </a>
                .
              </p>
              <Link
                href="/terms"
                className="clip-slant shrink-0 bg-gradient-to-r from-[#ed622f] to-[#e8a112] px-7 py-3 font-ui text-sm font-bold uppercase tracking-[0.12em] text-[#140a04] transition hover:brightness-110"
              >
                Read full guidelines →
              </Link>
            </div>
          </NeonFrame>
        </Reveal>
      </div>
    </section>
  );
}
