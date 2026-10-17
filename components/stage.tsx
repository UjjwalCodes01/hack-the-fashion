import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * A section locked to its background artwork's aspect ratio on xl screens, so children can be
 * placed in percentages over the art (and sized in `cqw`). Below xl it falls back to a normal,
 * stacked layout over a cover-cropped background.
 */
export function Stage({
  id,
  bg,
  w,
  h,
  className = "",
  children,
}: {
  id: string;
  bg: string;
  w: number;
  h: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-void">
      <div
        className={`@container relative px-[4%] pb-20 pt-24 md:pt-28 xl:aspect-[var(--ar)] xl:p-0 ${className}`}
        style={{ "--ar": `${w}/${h}` } as CSSProperties}
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={bg} alt="" fill sizes="100vw" className="object-cover xl:object-fill" />
          <div className="absolute inset-0 bg-void/55 xl:hidden" />
          <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-void to-transparent" />
        </div>
        {children}
      </div>
    </section>
  );
}

/** Absolutely positions its children (in % of the stage) on xl; a normal block below xl. */
export function At({
  l,
  t,
  w,
  className = "",
  children,
}: {
  l: number;
  t: number;
  w: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:w-[var(--w)] ${className}`}
      style={{ "--l": `${l}%`, "--t": `${t}%`, "--w": `${w}%` } as CSSProperties}
    >
      {children}
    </div>
  );
}
