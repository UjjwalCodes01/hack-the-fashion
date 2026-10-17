import Image from "next/image";
import { Reveal } from "@/components/motion";
import { GoldButton, LiveDot } from "@/components/ui";
import { EVENT } from "@/lib/content";

export default function Register() {
  return (
    <section id="register" className="relative z-10 overflow-hidden border-t-2 border-gold bg-ink py-24 md:py-36">
      <div aria-hidden className="absolute inset-0">
        <Image src="/images/runway.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="houndstooth absolute inset-0 opacity-[0.04]" />
      </div>
      <Reveal className="relative mx-auto w-[90%] max-w-4xl text-center">
        <p className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-gold">
          <LiveDot /> {EVENT.dates} · {EVENT.venue}
        </p>
        <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] text-ivory md:text-7xl">
          Don&apos;t just imagine the future of fashion.{" "}
          <span className="italic text-gold">Build it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-mute">
          Applications open soon on Unstop. Registrations close on 28 October 2026.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          {EVENT.registerUrl ? (
            <GoldButton href={EVENT.registerUrl} external className="px-10 py-4 text-sm">
              Register on Unstop ↗
            </GoldButton>
          ) : (
            <span className="inline-flex items-center gap-3 border border-gold/60 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <LiveDot /> Applications opening soon on Unstop
            </span>
          )}
          <p className="text-sm text-mute">
            Questions in the meantime?{" "}
            <a href={`mailto:${EVENT.email}`} className="text-ivory underline-offset-4 hover:text-gold hover:underline">
              {EVENT.email}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
