import Image from "next/image";
import { Reveal } from "@/components/motion";
import TryOnSlider from "@/components/TryOnSlider";
import { GoldButton, Hud, SectionHeading } from "@/components/ui";
import { EVENT } from "@/lib/content";

const PERKS = ["Demo access to Clothsy AI", "Mentorship from the Clothsy AI team", "Internship interviews for top teams"];

export default function TitleSponsor() {
  return (
    <section id="clothsy" className="relative z-10 overflow-hidden border-t-2 border-line bg-ink py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[480px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto grid w-[90%] max-w-[1200px] items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            kicker="09 · Title sponsor"
            title={
              <>
                Meet <span className="italic text-gold">Clothsy AI</span>
              </>
            }
            lede="See it on you, before you buy."
          />
          <div className="mb-8 inline-flex items-center gap-4 bg-ivory px-5 py-3">
            <Image src="/logos/clothsy-wordmark.png" alt="Clothsy AI" width={600} height={149} className="h-8 w-auto" />
            <span className="h-6 w-px bg-ink/20" />
            <Image src="/logos/fabricvton.webp" alt="FabricVTON" width={900} height={253} className="h-7 w-auto" />
          </div>
          <div className="space-y-4 text-base leading-relaxed text-ivory/80">
            <p>
              Clothsy AI, by FabricVTON, builds AI-powered virtual try-on that lets shoppers see themselves in clothes
              before they buy, helping brands boost buyer confidence and reduce returns. Available on Shopify and
              WooCommerce.
            </p>
            <p className="text-mute">
              At Hack the Fashion, participants can explore virtual try-on and AI-driven fashion experiences, get
              mentorship from the Clothsy AI team, and compete for internship opportunities.
            </p>
          </div>
          <div className="mt-8 border border-line bg-ink-2 p-5">
            <Hud className="text-gold">What players get</Hud>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-4">
              {PERKS.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-ivory/90">
                  <span className="text-gold">✦</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <GoldButton href={EVENT.clothsyUrl} external>
              Visit Clothsy AI ↗
            </GoldButton>
            <GoldButton href={EVENT.fabricvtonUrl} external variant="ghost">
              Visit FabricVTON ↗
            </GoldButton>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto w-full max-w-[420px]">
          <div className="mb-3 flex items-center justify-between">
            <Hud className="text-gold">Fitting room // live demo</Hud>
            <Hud>Drag to try on</Hud>
          </div>
          <TryOnSlider />
        </Reveal>
      </div>
    </section>
  );
}
