"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion";
import { Hud, LiveDot, SectionHeading } from "@/components/ui";
import { SCHEDULE, type ScheduleKind } from "@/lib/content";

// Day-by-day schedule (moved out of the old Timeline; not rendered until its section is redesigned).
const KINDS: ScheduleKind[] = ["Milestone", "Food", "Mentors", "Checkpoint", "Judging", "Fun"];

const KIND_STYLE: Record<ScheduleKind, string> = {
  Milestone: "bg-gold text-ink",
  Food: "bg-ivory/10 text-ivory",
  Mentors: "bg-gold/15 text-gold-soft",
  Checkpoint: "border border-gold/50 text-gold",
  Judging: "bg-ivory text-ink",
  Fun: "border border-ivory/30 text-ivory/80",
};

export default function Schedule() {
  const [day, setDay] = useState(0);
  const [filter, setFilter] = useState<ScheduleKind | null>(null);
  const items = SCHEDULE[day].items;

  return (
    <div id="schedule" className="mt-24 scroll-mt-28 md:mt-32">
      <Reveal>
        <SectionHeading
          kicker="05 · Schedule"
          title={
            <>
              24 hours, <span className="italic text-gold">mapped</span>
            </>
          }
        />
      </Reveal>

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div role="tablist" aria-label="Schedule day" className="flex">
          {SCHEDULE.map((d, i) => (
            <button
              key={d.day}
              type="button"
              role="tab"
              aria-selected={day === i}
              onClick={() => setDay(i)}
              className={`relative border-b-2 px-5 py-3 text-left transition-colors ${
                day === i ? "border-gold" : "border-line hover:border-ivory/40"
              }`}
            >
              <span className={`block font-display text-2xl font-semibold uppercase ${day === i ? "text-ivory" : "text-ivory/40"}`}>
                {d.day}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{d.label}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Filter by type">
          <button
            type="button"
            onClick={() => setFilter(null)}
            aria-pressed={filter === null}
            className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
              filter === null ? "bg-ivory text-ink" : "border border-line text-mute hover:text-ivory"
            }`}
          >
            All
          </button>
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(filter === k ? null : k)}
              aria-pressed={filter === k}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                filter === k ? "bg-gold text-ink" : "border border-line text-mute hover:text-ivory"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <motion.ul layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((it) => {
            const dim = filter !== null && filter !== it.kind;
            return (
              <motion.li
                layout
                key={`${day}-${it.time}-${it.title}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: dim ? 0.25 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="group relative border border-line bg-ink-2 transition-colors hover:border-gold/60"
              >
                <div className="flex items-center justify-between border-b border-line bg-ink-3 px-4 py-2">
                  <Hud className="text-gold/80">Call time //</Hud>
                  <span className="flex items-center gap-2">
                    <Hud>{SCHEDULE[day].day}</Hud>
                    <LiveDot />
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display text-3xl font-bold text-ivory">{it.time}</p>
                  <p className="mt-1 text-base font-semibold text-ivory/90">{it.title}</p>
                  <p className="mt-0.5 font-display text-sm italic text-gold">{it.cue}</p>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-line px-4 py-2">
                  <Hud className="text-[9px]">Status: scheduled</Hud>
                  <span className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${KIND_STYLE[it.kind]}`}>
                    {it.kind}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
