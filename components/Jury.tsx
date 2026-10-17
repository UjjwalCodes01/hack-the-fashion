import { GrowX, Reveal } from "@/components/motion";
import { Corners, Hud, HudCard, LiveDot, SectionHeading } from "@/components/ui";
import { CRITERIA, EVENT, JUDGES, MENTOR_AREAS, ROUNDS } from "@/lib/content";

export default function Jury() {
  return (
    <section id="judging" className="relative z-10 overflow-hidden border-t-2 border-line bg-ink-2 py-20 md:py-28">
      <div aria-hidden className="houndstooth pointer-events-none absolute inset-0 opacity-[0.025]" />
      <div className="relative mx-auto w-[90%] max-w-[1200px]">
        {/* Criteria */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              kicker="06 · Judging"
              title={
                <>
                  How we <span className="italic text-gold">judge</span>
                </>
              }
              lede="Every build walks the same runway. Five criteria, weighted, scored by a panel across technology, fashion business and design."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {ROUNDS.map((r) => (
                <div key={r.name} className="relative border border-line bg-ink p-5">
                  <Corners className="border-gold/60" />
                  <Hud className="text-gold">{r.name}</Hud>
                  <p className="mt-2 font-display text-3xl font-bold text-ivory">{r.time}</p>
                  <p className="mt-1 text-sm text-mute">{r.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <ol className="space-y-6 self-center">
            {CRITERIA.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={0.06 * i} y={16}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-ivory md:text-2xl">
                      <span className="mr-3 font-mono text-xs text-gold">//0{i + 1}</span>
                      {c.title}
                    </h3>
                    <span className="font-display text-3xl font-bold text-gold">{c.weight}%</span>
                  </div>
                  <div className="relative mt-2 h-1.5 bg-line">
                    <GrowX className="absolute inset-y-0 left-0 bg-gold" width={`${c.weight * 4}%`} delay={0.1 + 0.06 * i} />
                  </div>
                  <p className="mt-2 text-sm text-mute">{c.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Judges */}
        <div id="judges" className="mt-24 scroll-mt-28 md:mt-32">
          <Reveal>
            <SectionHeading
              kicker="07 · The jury"
              title={
                <>
                  Meet the <span className="italic text-gold">judges</span>
                </>
              }
              lede="A balanced panel across technology, fashion business and design."
            />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {JUDGES.map((j, i) => {
              const tba = !j.initials;
              return (
                <Reveal key={j.role} delay={0.06 * i}>
                  <HudCard code={`JUDGE_0${i + 1}`} tag={tba ? "TBA" : "Set"} meta={[]} className="h-full">
                    <div
                      className={`flex aspect-[5/2] w-full items-center justify-center border sm:aspect-square ${
                        tba ? "border-dashed border-line bg-ink" : "border-gold/50 bg-gradient-to-br from-gold/25 to-ink"
                      }`}
                    >
                      <span className={`font-display text-6xl font-bold ${tba ? "text-ivory/15" : "text-gold"}`}>
                        {j.initials ?? "?"}
                      </span>
                    </div>
                    <p className={`mt-4 font-display text-xl font-semibold leading-tight ${tba ? "text-ivory/50" : "text-ivory"}`}>
                      {j.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-mute">{j.role}</p>
                  </HudCard>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">More judges to be announced</p>
        </div>

        {/* Mentors */}
        <div id="mentors" className="mt-24 scroll-mt-28 md:mt-32">
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <SectionHeading
                kicker="08 · Mentors"
                title={
                  <>
                    Unstuck, <span className="italic text-gold">on call</span>
                  </>
                }
                lede="Mentors circulate through the night across five areas of expertise. Bring them what you're stuck on and trade it for a way forward, during mentor rounds or any time."
              />
              <a
                href={`mailto:${EVENT.email}?subject=Mentoring%20at%20Hack%20the%20Fashion`}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
              >
                Want to mentor? Write to us ▸
              </a>
            </div>
            <ul className="grid gap-px self-center border border-line bg-line sm:grid-cols-2">
              {MENTOR_AREAS.map((m, i) => (
                <li key={m.title} className="group flex items-start gap-4 bg-ink-2 p-5 transition-colors hover:bg-ink-3">
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <div>
                    <p className="font-display text-xl font-semibold text-ivory transition-colors group-hover:text-gold">{m.title}</p>
                    <p className="text-sm text-mute">{m.text}</p>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3 bg-ink p-5">
                <LiveDot />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Mentor line-up revealed soon</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
