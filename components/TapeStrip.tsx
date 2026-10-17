import { KEY_DATES } from "@/lib/content";

/** Key dates printed on a tailor's measuring tape — off-grid's race-info strip, re-cut. */
export default function TapeStrip() {
  return (
    <section aria-label="Key dates" className="relative z-20 overflow-hidden bg-ink py-10 md:py-14">
      <div className="-ml-[2%] w-[104%] -rotate-1 border-y-2 border-gold-deep bg-gold-soft px-[2%] shadow-[0_0_60px_rgba(212,168,87,0.18)]">
        <div className="tape-ticks overflow-x-auto [scrollbar-width:none]">
          <ul className="mx-auto flex w-max min-w-full items-stretch justify-between gap-0 px-4 pb-5 pt-6 md:w-[90%] md:max-w-[1200px] md:px-0">
            {KEY_DATES.map((d, i) => (
              <li key={d.label} className="flex shrink-0 items-stretch">
                <div className="flex flex-col items-center px-5 text-center md:px-6">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink/60 md:text-[10px]">
                    {d.label}
                  </span>
                  <span className="mt-1 font-display text-2xl font-bold uppercase text-ink md:text-3xl">{d.value}</span>
                </div>
                {i < KEY_DATES.length - 1 && <span aria-hidden className="w-px self-stretch bg-ink/20" />}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between border-t border-ink/15 px-4 py-1 md:px-10">
          <span className="truncate font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink/50">HTF // Measured in hours, cut in code</span>
          <span className="hidden font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink/50 sm:inline">cm 0 — 24</span>
        </div>
      </div>
    </section>
  );
}
