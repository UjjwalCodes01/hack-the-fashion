import Image from "next/image";
import Link from "next/link";
import { Kicker, NeonFrame } from "@/components/hud";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { At, Stage } from "@/components/stage";
import { RULES } from "@/lib/content";

const MAGENTA = "#e040fb";
const CYAN = "#22d3ee";

/* Rows of the two rule columns, in % of the stage height (from the mockup). */
const ROWS = [25.5, 41, 56.5, 72];

function RuleCard({ i }: { i: number }) {
  const rule = RULES[i];
  // Left column alternates magenta/cyan from the top; right column starts with cyan.
  const left = i < 4;
  const magenta = left ? i % 2 === 0 : i % 2 === 1;
  const hex = magenta ? MAGENTA : CYAN;
  const text = magenta ? "text-magenta" : "text-cyan";
  return (
    <NeonFrame hex={hex} innerClassName="bg-[#0a0620]/86 backdrop-blur-sm" className="h-full">
      <div className="flex gap-4 p-4 xl:gap-[1cqw] xl:p-[0.9cqw]">
        <span
          className="flex size-14 shrink-0 items-center justify-center font-display text-2xl font-black text-white xl:size-[3.4cqw] xl:text-[1.7cqw]"
          style={{
            clipPath: "polygon(25% 0,75% 0,100% 25%,100% 75%,75% 100%,25% 100%,0 75%,0 25%)",
            background: `linear-gradient(135deg, ${hex}, ${hex}55)`,
          }}
        >
          <span className="flex size-[calc(100%-4px)] items-center justify-center bg-[#0a0620]" style={{ clipPath: "inherit" }}>
            <span className={text}>{String(i + 1).padStart(2, "0")}</span>
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-ui text-base font-bold uppercase leading-tight tracking-[0.04em] text-white xl:text-[1cqw]">{rule.title}</h3>
            <Icon name={rule.icon} filled className={`size-7 shrink-0 xl:size-[1.9cqw] ${text}`} />
          </div>
          <p className="mt-1.5 text-[13.5px] leading-snug text-frost/85 xl:mt-[0.3cqw] xl:text-[0.78cqw]">{rule.text}</p>
        </div>
      </div>
    </NeonFrame>
  );
}

export default function Rules() {
  return (
    <Stage id="rules" bg="/rules_bg.png" w={1670} h={941}>
      {/* Mannequin capsule, sized so its ring sits on the empty capsule in rules_bg.png */}
      <At l={28.1} t={19.6} w={43} className="mx-auto mt-0 hidden xl:block">
        <Reveal y={30}>
          <div className="@container relative aspect-[1312/1199]">
            <Image src="/rules_center.png" alt="Holographic jacket on a mannequin inside a glowing display capsule" fill sizes="43vw" className="object-contain" />
            <p className="absolute left-[51.5%] top-[89%] w-[26%] -translate-x-1/2 -translate-y-1/2 text-center font-ui text-[2.1cqw] font-bold uppercase leading-tight tracking-[0.12em] text-cyan [text-shadow:0_0_1cqw_#22d3ee]">
              Ideas today.
              <br />
              Trend tomorrow.
            </p>
          </div>
        </Reveal>
      </At>

      {/* Heading */}
      <At l={25} t={3.2} w={50} className="text-center">
        <Reveal>
          <Kicker>// 05. Rules //</Kicker>
          <h2 className="mt-3 font-display text-[11vw] font-black uppercase italic leading-none sm:text-7xl xl:mt-[0.7cqw] xl:text-[4.6cqw]">
            <span className="bg-gradient-to-b from-white via-[#e6e9f5] to-[#9aa3b8] bg-clip-text pr-2 text-transparent drop-shadow-[0_0_14px_rgba(200,220,255,0.35)]">
              Play it
            </span>{" "}
            <span className="grad-circuit pr-2">Fair</span>
          </h2>
          <p className="mt-4 font-ui text-xs font-semibold uppercase tracking-[0.4em] text-frost xl:mt-[0.9cqw] xl:text-[0.95cqw] xl:tracking-[0.5em]">
            Create bolder. Compete fairer.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-frost/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.95),0_0_14px_rgba(0,0,0,0.8)] xl:mt-[0.7cqw] xl:max-w-none xl:text-[1cqw]">
            These rules ensure a smooth, inclusive, and exciting hackathon experience
            <br className="hidden xl:block" /> for everyone. Let&apos;s build the future of fashion — together.
          </p>
        </Reveal>
      </At>

      {/* Top-right readout */}
      <At l={73} t={9.6} w={13.5} className="hidden xl:block">
        <div className="hud-panel flex items-center justify-between px-[1cqw] py-[0.7cqw]">
          <p className="font-mono text-[0.68cqw] uppercase leading-relaxed tracking-[0.15em] text-frost/80">
            Same passion
            <br />
            Same platform
            <br />
            Fair opportunity
          </p>
          <Icon name="globe" className="size-[1.8cqw] text-frost/70" />
        </div>
      </At>

      {/* Rule cards: 01–04 on the left, 05–08 on the right */}
      <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:contents">
        {RULES.map((rule, i) => (
          <li key={rule.title} className="contents">
            <At l={i < 4 ? 14.5 : 64} t={ROWS[i % 4]} w={21.5}>
              <Reveal delay={0.06 * (i % 4)} y={16}>
                <RuleCard i={i} />
              </Reveal>
            </At>
          </li>
        ))}
      </ol>

      {/* Bottom bar */}
      <At l={20} t={88.8} w={60} className="mt-8 xl:mt-0">
        <Reveal>
          <NeonFrame hex="#c026d3" fill="linear-gradient(90deg,#e040fb,#a855f7 50%,#e040fb)" innerClassName="bg-[#0a0620]/90">
            <div className="flex flex-col items-center gap-4 px-6 py-5 text-center md:flex-row md:text-left xl:gap-[1.4cqw] xl:px-[2cqw] xl:py-[0.8cqw]">
              <Icon name="flag" filled className="size-10 shrink-0 text-frost drop-shadow-[0_0_8px_#e040fb] xl:size-[2.4cqw]" />
              <p className="font-display text-lg font-black uppercase leading-tight text-white xl:text-[1.2cqw]">
                Same energy.
                <br />
                <span className="grad-circuit">Real impact.</span>
              </p>
              <span aria-hidden className="hidden h-[2.6cqw] w-px bg-white/20 md:block" />
              <p className="flex-1 text-sm leading-snug text-frost/80 xl:text-[0.8cqw]">
                Let&apos;s keep the competition fair, friendly and inspiring for everyone. Questions? Reach out to our team anytime.
              </p>
              <Link
                href="/terms"
                className="inline-flex shrink-0 items-center gap-2 border border-[#f0abfc] bg-gradient-to-r from-[#c026d3] to-[#9333ea] px-6 py-2.5 font-ui text-sm font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_20px_rgba(217,70,239,0.55)] transition hover:brightness-125 xl:px-[1.5cqw] xl:py-[0.6cqw] xl:text-[0.85cqw]"
              >
                Read full guidelines →
              </Link>
            </div>
          </NeonFrame>
        </Reveal>
      </At>
    </Stage>
  );
}
