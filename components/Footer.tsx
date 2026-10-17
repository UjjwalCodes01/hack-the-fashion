import Link from "next/link";
import { Label, NeonFrame, Plus, Wordmark } from "@/components/hud";
import { RegisterButton } from "@/components/Nav";
import { EVENT } from "@/lib/content";

const COLUMNS = [
  {
    title: "Event",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#tracks", label: "Tracks" },
      { href: "/#timeline", label: "Timeline" },
      { href: "/#prizes", label: "Prizes" },
      { href: "/#judges", label: "Judges" },
    ],
  },
  {
    title: "Info",
    links: [
      { href: "/#rules", label: "Rules" },
      { href: "/#submission", label: "Submission" },
      { href: "/#venue", label: "Venue" },
      { href: "/#sponsors", label: "Sponsors" },
      { href: "/#faq", label: "FAQ" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

const SOCIAL = [
  {
    href: EVENT.instagram,
    label: "Instagram",
    d: ["M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z", "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", "M17.5 6.5h.01"],
  },
  {
    href: EVENT.linkedin,
    label: "LinkedIn",
    d: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z", "M2 9h4v12H2z", "M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"],
  },
  { href: `mailto:${EVENT.email}`, label: "Email", d: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "m22 6-10 7L2 6"] },
];

function FinishStrip() {
  return (
    <div aria-hidden className="flex h-3 w-full overflow-hidden">
      {Array.from({ length: 160 }, (_, i) => (
        <span key={i} className="flex h-full w-3 shrink-0 flex-col">
          <span className={`h-1/2 ${i % 2 ? "bg-magenta/70" : "bg-void"}`} />
          <span className={`h-1/2 ${i % 2 ? "bg-void" : "bg-cyan/60"}`} />
        </span>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-void">
      {/* top neon rule */}
      <div aria-hidden className="h-px bg-gradient-to-r from-cyan via-violet to-magenta shadow-[0_0_18px_#a855f7]" />
      <div aria-hidden className="hud-grid absolute inset-0 -z-10 opacity-40" />
      <div aria-hidden className="absolute -left-40 top-20 -z-10 size-[520px] rounded-full bg-magenta/10 blur-[120px]" />
      <div aria-hidden className="absolute -right-40 bottom-10 -z-10 size-[520px] rounded-full bg-cyan/10 blur-[120px]" />
      <Plus className="absolute left-[3%] top-8 hidden md:block" />
      <Plus className="absolute right-[3%] top-8 hidden md:block" />

      <div className="relative mx-auto w-[92%] max-w-[1200px] pt-16">
        {/* CTA */}
        <NeonFrame hex="#a855f7" fill="linear-gradient(90deg,#22d3ee,#a855f7 50%,#e040fb)" innerClassName="bg-[#0a0620]/92">
          <div className="flex flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
            <div>
              <Label className="text-cyan">// Ready · Set · Build</Label>
              <p className="mt-2 font-display text-2xl font-black uppercase leading-tight text-white md:text-3xl">
                Don&apos;t just imagine the future of fashion. <span className="grad-circuit">Build it.</span>
              </p>
              <p className="mt-2 text-sm text-frost/75">Applications open soon on Unstop · Registrations close 28 October 2026</p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <RegisterButton />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-frost/70">{EVENT.dates} · KIET Ghaziabad</span>
            </div>
          </div>
        </NeonFrame>

        {/* Columns */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" aria-label="Hack the Fashion home" className="inline-block">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-frost/75">Reimagining Fashion Through AI, Technology &amp; Innovation.</p>
            <p className="mt-3 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-frost/50">
              Title sponsor Clothsy AI · Powered by FabricVTON · Supporting partners HP and Intel
            </p>
            <ul className="mt-5 flex gap-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center border border-violet/50 text-frost/80 transition hover:border-magenta hover:text-magenta hover:shadow-[0_0_14px_rgba(224,64,251,0.5)]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                      {s.d.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <Label className="text-magenta">{col.title} //</Label>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-flex items-center gap-2 font-ui text-[15px] text-frost/80 transition-colors hover:text-white">
                      <span aria-hidden className="h-px w-0 bg-cyan transition-all duration-300 group-hover:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <Label className="text-magenta">Contact // Secure line</Label>
            <ul className="mt-4 space-y-2.5 font-ui text-[15px]">
              <li>
                <a href={`mailto:${EVENT.email}`} className="break-all text-frost/85 hover:text-cyan">
                  {EVENT.email}
                </a>
              </li>
              <li>
                <a href={EVENT.instagram} target="_blank" rel="noopener noreferrer" className="text-frost/85 hover:text-cyan">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href={EVENT.linkedin} target="_blank" rel="noopener noreferrer" className="text-frost/85 hover:text-cyan">
                  LinkedIn ↗
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-frost/60">
              Organised by the AI Skills Lab CoE,
              <br />
              KIET Group of Institutions, Ghaziabad
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-violet/25 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-frost/60">© 2026 Hack the Fashion. All rights reserved.</p>
          <Label className="text-frost/45">
            KIET_GZB · {EVENT.lat} · {EVENT.lon}
          </Label>
          <a href="#top" className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>

      {/* Watermark */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[1.6vw] select-none whitespace-nowrap text-center font-display text-[8.2vw] font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(168,85,247,0.35)]"
      >
        Hack the Fashion
      </p>
      <FinishStrip />
    </footer>
  );
}
