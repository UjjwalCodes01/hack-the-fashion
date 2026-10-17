import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Brackets, FabricSwatch, Globe, JacketOutline, Label, Meters, Spark, WordStack } from "@/components/hud";

function Hi({ c, children }: { c: "cyan" | "magenta"; children: React.ReactNode }) {
  return <strong className={`font-semibold ${c === "cyan" ? "text-cyan" : "text-magenta"}`}>{children}</strong>;
}

function ScannerCard() {
  return (
    <div className="hud-panel relative">
      <Brackets color="border-violet" size="size-5" />
      <div className="flex items-center justify-between px-4 pt-3 md:px-5">
        <Label className="text-frost/60">
          Hack the fashion // <span className="text-violet">stats_01</span>
        </Label>
        <Label className="font-bold text-magenta">HTF-01 ●</Label>
      </div>

      <div className="grid grid-cols-[72px_1fr_84px] gap-3 p-4 md:grid-cols-[96px_1fr_112px] md:gap-4 md:p-5">
        {/* Left: fabric analysis */}
        <div className="flex flex-col gap-3">
          <div className="aspect-square overflow-hidden border border-magenta/70 shadow-[0_0_14px_rgba(224,64,251,0.45)]">
            <FabricSwatch id="about-fab-v" tone="violet" className="h-full w-full" />
          </div>
          <div className="aspect-square overflow-hidden border border-cyan/50">
            <FabricSwatch id="about-fab-c" tone="cyan" className="h-full w-full" />
          </div>
          <Label className="mt-1 leading-relaxed text-frost/70">
            Fabric
            <br />
            analysis
            <br />
            <span className="text-violet">// AI</span>
          </Label>
          <Meters
            values={[
              { v: 70, c: "cyan" },
              { v: 85, c: "cyan" },
              { v: 55, c: "magenta" },
            ]}
          />
        </div>

        {/* Centre: jacket + 24 */}
        <div className="relative flex min-h-[260px] flex-col items-center justify-end md:min-h-[360px]">
          <div aria-hidden className="hud-grid absolute inset-0 opacity-60" />
          <div aria-hidden className="absolute left-1/2 top-[40%] h-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-violet/30 blur-[60px]" />
          <div className="absolute inset-x-[-6%] top-0 bottom-[22%] animate-float">
            <Image
              src="/about_jabket.png"
              alt="White and violet tech-wear jacket wrapped in cyan light trails"
              fill
              sizes="(min-width:1024px) 360px, 60vw"
              className="object-contain drop-shadow-[0_10px_40px_rgba(34,211,238,0.35)]"
            />
          </div>
          <p className="grad-24 relative font-display text-6xl font-black leading-none md:text-8xl">24</p>
          <p className="relative mt-1 font-ui text-xs font-bold uppercase tracking-[0.2em] text-frost md:text-base">
            Hours of innovation
          </p>
        </div>

        {/* Right: garment detection */}
        <div className="flex flex-col gap-3">
          <Label className="leading-relaxed text-frost/80">
            Garment detection
            <br />
            <span className="text-violet">// AI model</span>
          </Label>
          <div className="flex aspect-[4/5] items-center justify-center border border-cyan/50 bg-cyan/5">
            <JacketOutline className="w-3/4" />
          </div>
          <div className="aspect-[5/3] overflow-hidden border border-cyan/50">
            <FabricSwatch id="about-fab-c2" tone="cyan" className="h-full w-full" />
          </div>
          <div className="flex items-end gap-2">
            <Meters
              className="flex-1"
              values={[
                { v: 80, c: "magenta" },
                { v: 60, c: "cyan" },
                { v: 40, c: "magenta" },
                { v: 70, c: "cyan" },
              ]}
            />
            <Spark className="h-8 w-8 md:w-10" />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 px-4 pb-3 md:px-5">
        <div className="flex flex-col gap-0.5">
          <Label className="text-frost/60">
            Status: <span className="text-cyan">Online</span>
          </Label>
          <Label className="text-frost/60">
            Mode: <span className="text-magenta">Innovation</span>
          </Label>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex flex-col items-end gap-0.5">
            <Label className="text-frost/60">KIET Ghaziabad</Label>
            <Label className="text-frost/60">Target: Real impact</Label>
          </div>
          <Globe className="size-5 text-violet" />
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden py-24 md:py-28 lg:flex lg:min-h-[max(100svh,56.3vw)] lg:items-center lg:py-[7vw]">
      {/* HUD frame backdrop: stretched to the section on desktop so the frame edges stay visible */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-void">
        <Image src="/about_bg.png" alt="" fill sizes="100vw" className="object-cover lg:object-fill" />
      </div>

      {/* Side word stacks */}
      <WordStack words={["Fashion", "meets", "technology"]} rule={false} className="absolute left-[5%] top-[29%] hidden text-[11px] text-cyan/80 xl:flex" />
      <WordStack words={["Ideas", "Design", "Innovate", "Impact"]} className="absolute bottom-[9%] left-[4.5%] hidden !border-magenta text-[11px] xl:flex" />
      <WordStack words={["AI", "Fashion", "Tech", "Sustainability", "Creativity"]} rule={false} className="absolute right-[2.5%] top-[40%] hidden text-[10px] text-cyan/80 xl:flex" />

      <div className="relative mx-auto w-[88%] max-w-[1180px] xl:w-[76%]">
        {/* Heading */}
        <Reveal className="mb-12 text-center md:mb-16">
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-frost/70">
            <span className="flex items-center gap-3">
              <span className="text-violet">// —</span> 01 <span className="hidden h-px w-20 bg-cyan/60 sm:block" />
            </span>
            <span className="flex items-center gap-2">
              Section <span className="text-cyan">—\</span>
            </span>
          </div>
          <h2 className="font-display text-[8.5vw] font-black uppercase leading-[1.05] tracking-[0.01em] sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="neon-white">About </span>
            <span className="neon-cyan">Hack </span>
            <span className="grad-fashion">The Fashion</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="hidden h-px w-24 bg-gradient-to-r from-transparent to-magenta sm:block md:w-32" />
            <p className="font-ui text-sm font-semibold uppercase tracking-[0.35em] text-magenta md:text-lg md:tracking-[0.45em]">
              Where fashion meets the future
            </p>
            <span className="hidden h-px w-24 bg-gradient-to-l from-transparent to-magenta sm:block md:w-32" />
          </div>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          {/* Copy with bracket rule */}
          <Reveal className="relative py-4 pl-6 md:pl-10">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-0.5 bg-gradient-to-b from-magenta via-violet/30 to-magenta" />
            <span aria-hidden className="absolute left-0 top-0 h-0.5 w-4 bg-magenta" />
            <span aria-hidden className="absolute bottom-0 left-0 h-0.5 w-4 bg-magenta" />
            <div className="space-y-7 text-base leading-relaxed text-frost/90 md:text-[1.2rem] md:leading-[1.65]">
              <p>
                Hack the Fashion is a high-energy <Hi c="cyan">24-hour hackathon</Hi> for creators, developers and
                designers who want to shape the next generation of fashion through technology.
              </p>
              <p>
                Build innovative solutions using <Hi c="magenta">AI-powered fashion</Hi>,{" "}
                <Hi c="magenta">virtual try-on</Hi>, and emerging technologies to solve{" "}
                <Hi c="cyan">real-world challenges</Hi> in the fashion industry.
              </p>
              <p>
                From idea to prototype, teams will collaborate, innovate and present their solutions in a{" "}
                <Hi c="magenta">24-hour offline hackathon</Hi> at KIET Deemed To Be University.
              </p>
            </div>
            <p aria-hidden className="mt-10 font-mono text-xs tracking-[0.3em] text-violet/70">
              {"// '/// /// //// ////."}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ScannerCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
