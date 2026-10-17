import Image from "next/image";
import type { CSSProperties } from "react";
import { Kicker, NeonFrame } from "@/components/hud";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { At, Stage } from "@/components/stage";
import { EVENT, SUBMISSION, SUBMISSION_STEPS } from "@/lib/content";

/*
 * submission_center.png has three tile captions misspelled in the artwork ("DEMO VIDED",
 * "RITCH DECK", "SDLUTIOVBRIE"). These patches cover them with the correct words; positions
 * and angles are measured from the image (percent of its width/height).
 */
const LABEL_FIXES = [
  { text: "Demo video", x: 33.7, y: 32.8, w: 10.5, rot: -11 },
  { text: "Pitch deck", x: 66.9, y: 31.8, w: 10, rot: 12 },
  { text: "Solution brief", x: 80.7, y: 45.1, w: 12, rot: 13 },
];

/** Tiny pixel sparkle / crown ornaments around the title. */
function Sparkle({ className = "", color = "#c4b5fd" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 7 7" className={className} shapeRendering="crispEdges" aria-hidden style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      {[[3, 0], [3, 1], [2, 2], [3, 2], [4, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [2, 4], [3, 4], [4, 4], [3, 5], [3, 6]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill={x === 3 && y === 3 ? "#fff" : color} />
      ))}
    </svg>
  );
}

function Crown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={className} shapeRendering="crispEdges" aria-hidden style={{ filter: "drop-shadow(0 0 4px #f5b83d)" }}>
      {[[0, 0], [4, 0], [8, 0], [0, 1], [1, 1], [3, 1], [4, 1], [5, 1], [7, 1], [8, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill={y === 3 ? "#fde68a" : "#f5b83d"} />
      ))}
    </svg>
  );
}

function PortalButton() {
  const live = !!EVENT.submissionUrl;
  const inner = (
    <>
      <span className="flex items-center justify-center self-stretch bg-violet/40 px-5 xl:px-[1.2cqw]">
        <Icon name="send" filled className="size-7 text-white xl:size-[1.8cqw]" />
      </span>
      <span className="flex flex-1 items-center justify-center gap-3 whitespace-nowrap px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-white xl:gap-[0.8cqw] xl:px-[1.2cqw] xl:py-[1cqw] xl:text-[0.95cqw]">
        {live ? "Go to submission portal" : "Portal opens on 2 Nov"} <span aria-hidden>→</span>
      </span>
    </>
  );
  const cls =
    "group flex items-stretch overflow-hidden border-2 border-[#a78bfa] bg-gradient-to-r from-[#3b1a8a] via-[#4c1d95] to-[#3b1a8a] shadow-[0_0_30px_rgba(139,92,246,0.7)] transition";
  return live ? (
    <a href={EVENT.submissionUrl} target="_blank" rel="noopener noreferrer" className={`${cls} hover:brightness-125`}>
      {inner}
    </a>
  ) : (
    <div className={cls} aria-label="The submission portal link will be shared when hacking starts on 2 November">
      {inner}
    </div>
  );
}

export default function Submission() {
  return (
    <Stage id="submission" bg="/submission_bg.png" w={1672} h={941}>
      {/* Banner text on the left banner of submission_bg.png */}
      <p
        aria-hidden
        className="absolute left-[4.3%] top-[31%] hidden w-[6.2%] -rotate-[4deg] text-center font-display text-[1.3cqw] font-black uppercase leading-[1.05] text-frost [text-shadow:0_0_0.6cqw_rgba(168,85,247,0.9)] xl:block"
      >
        Ideas
        <br />
        Style
        <br />
        Impact
      </p>

      {/* Heading */}
      <At l={30} t={2} w={40} className="text-center">
        <Reveal>
          <Kicker>// 06. Submission //</Kicker>
          <h2 className="relative mt-3 font-display font-black uppercase leading-[0.95] xl:mt-[0.7cqw]">
            <span className="block text-[12vw] text-white drop-shadow-[0_0_16px_rgba(196,181,253,0.7)] sm:text-7xl xl:text-[4.4cqw]">Submit</span>
            <span className="block bg-gradient-to-b from-[#ede9fe] via-[#c4b5fd] to-[#8b5cf6] bg-clip-text text-[12vw] text-transparent drop-shadow-[0_0_18px_rgba(139,92,246,0.8)] sm:text-7xl xl:text-[4.4cqw]">
              Your idea
            </span>
            <Sparkle className="absolute left-[12%] top-[14%] hidden size-[2cqw] xl:block" />
            <Sparkle className="absolute left-[2%] top-[58%] hidden size-[2.2cqw] xl:block" color="#fcd34d" />
            <Crown className="absolute right-[11%] top-[10%] hidden w-[2.3cqw] xl:block" />
            <Sparkle className="absolute right-[2%] top-[58%] hidden size-[2.2cqw] xl:block" color="#e879f9" />
          </h2>
          <p className="mt-4 font-ui text-xs font-semibold uppercase tracking-[0.4em] text-frost xl:mt-[0.9cqw] xl:text-[0.9cqw]">
            Build <span className="text-violet">›</span> Submit <span className="text-violet">›</span> Freeze <span className="text-violet">›</span> Compete
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-frost/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.95),0_0_14px_rgba(0,0,0,0.8)] xl:mt-[0.6cqw] xl:max-w-none xl:text-[0.98cqw]">
            Package your innovation and submit all the required items before the code freeze deadline. Make sure
            everything is complete and working.
          </p>
        </Reveal>
      </At>

      {/* Treasure chest with the five deliverables */}
      <At l={31} t={30.5} w={39} className="mx-auto mt-8 max-w-xl xl:mt-0 xl:max-w-none">
        <Reveal y={30}>
          <div className="@container relative aspect-[1536/1024]">
            <Image src="/submission_center.png" alt="Treasure chest releasing five tiles: README, demo video, source code, pitch deck and solution brief" fill sizes="(min-width:1280px) 39vw, 90vw" className="object-contain" />
            {LABEL_FIXES.map((f) => (
              <span
                key={f.text}
                aria-hidden
                className="absolute flex items-center justify-center whitespace-nowrap rounded-[0.4cqw] bg-[#2a0b22] px-[0.4cqw] py-[0.15cqw] font-ui text-[1.75cqw] font-bold uppercase leading-none tracking-[0.02em] text-[#fbeaff] shadow-[0_0_0.6cqw_0.4cqw_#2a0b22]"
                style={{ left: `${f.x}%`, top: `${f.y}%`, minWidth: `${f.w}%`, transform: `translate(-50%,-50%) rotate(${f.rot}deg)` } as CSSProperties}
              >
                {f.text}
              </span>
            ))}
          </div>
        </Reveal>
      </At>

      {/* Portal button + platform line */}
      <At l={36.5} t={68.6} w={27} className="mx-auto mt-6 max-w-md xl:mt-0 xl:max-w-none">
        <Reveal delay={0.1}>
          <PortalButton />
        </Reveal>
      </At>
      <At l={28} t={77.2} w={44} className="mt-4 text-center xl:mt-0">
        <p className="mx-auto w-fit rounded-sm bg-void/75 px-4 py-1.5 font-ui text-sm text-frost/90 backdrop-blur-sm xl:px-[1cqw] xl:py-[0.3cqw] xl:text-[0.85cqw]">
          Platform: Devfolio / Unstop / Google Form <span className="mx-2 text-frost/40">|</span> Deadline: 03 Nov, 10:00 AM IST
        </p>
      </At>

      {/* Steps panel */}
      <At l={74.3} t={17} w={23.4} className="mt-12 xl:mt-0">
        <Reveal delay={0.1}>
          <div className="rounded-sm bg-void/60 p-4 backdrop-blur-sm xl:p-[0.9cqw]">
            <p className="font-display text-lg font-black uppercase tracking-[0.04em] text-[#fbbf24] [text-shadow:0_0_12px_rgba(251,191,36,0.5)] xl:text-[1.15cqw]">
              Submission steps
            </p>
            <ol className="relative mt-4 space-y-3 pl-6 xl:mt-[0.9cqw] xl:space-y-[0.6cqw] xl:pl-[1.6cqw]">
              <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-gradient-to-b from-[#fbbf24] via-violet to-violet xl:left-[0.32cqw]" />
              {SUBMISSION_STEPS.map((s, i) => (
                <li key={s.title} className="relative">
                  <span aria-hidden className="absolute -left-6 top-1/2 size-2.5 -translate-y-1/2 rotate-45 bg-violet shadow-[0_0_8px_#a855f7] xl:-left-[1.6cqw] xl:size-[0.7cqw]" />
                  <div className="flex items-center gap-3 border border-violet/40 bg-[#120a2a]/90 p-3 xl:gap-[0.8cqw] xl:p-[0.7cqw]">
                    <span className="flex size-11 shrink-0 items-center justify-center bg-gradient-to-b from-[#9333ea] to-[#6d28d9] font-display text-base font-bold text-white xl:size-[2.7cqw] xl:text-[1.05cqw]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-ui text-[15px] font-bold text-white xl:text-[0.92cqw]">{s.title}</p>
                      <p className="text-[12.5px] leading-snug text-frost/75 xl:text-[0.72cqw]">{s.text}</p>
                    </div>
                    <Icon name={s.icon} className="size-7 shrink-0 text-frost/90 xl:size-[1.8cqw]" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </At>

      {/* Deliverable cards */}
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 xl:absolute xl:left-[2%] xl:top-[80.8%] xl:mt-0 xl:w-[96%] xl:gap-[1.1cqw]">
        {SUBMISSION.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={0.06 * i} y={16} className="h-full">
              <NeonFrame hex={item.tone} innerClassName="bg-[#0a0620]/90" className="h-full">
                <div className="flex h-full gap-3 p-4 xl:gap-[0.8cqw] xl:p-[0.8cqw]">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-sm xl:size-[3cqw]"
                    style={{ background: `${item.tone}26`, color: item.tone, boxShadow: `inset 0 0 12px ${item.tone}40` }}
                  >
                    <Icon name={item.icon} filled className="size-7 xl:size-[1.8cqw]" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-ui text-base font-bold uppercase text-white xl:text-[0.98cqw]">{item.title}</p>
                      <span
                        className="rounded-sm px-1.5 py-0.5 font-ui text-[10px] font-semibold xl:px-[0.35cqw] xl:text-[0.6cqw]"
                        style={{ background: `${item.tone}26`, color: item.tone }}
                      >
                        ✓ Required
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-snug text-frost/80 xl:mt-[0.35cqw] xl:text-[0.74cqw]">{item.text}</p>
                    <p className="mt-auto flex items-center gap-1.5 pt-2 font-ui text-[13px] font-semibold text-frost/90 xl:pt-[0.5cqw] xl:text-[0.76cqw]">
                      <Icon name={item.via.startsWith("Upload") ? "upload" : "link"} className="size-4 xl:size-[0.95cqw]" />
                      <span style={{ color: item.tone }}>{item.via}</span>
                    </p>
                  </div>
                </div>
              </NeonFrame>
            </Reveal>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
