"use client";

import Image from "next/image";
import { useState } from "react";

/** Drag-to-compare: original photo on the left, Clothsy AI try-on result on the right. */
export default function TryOnSlider() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[720/995] w-full select-none overflow-hidden border border-gold/40 bg-ink-3">
      <Image src="/images/tryon/result.webp" alt="Try-on result: the same model wearing a tan leather trench coat" fill sizes="(min-width:1024px) 420px, 90vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src="/images/tryon/person.webp" alt="Original photo: model wearing an olive trench coat" fill sizes="(min-width:1024px) 420px, 90vw" className="object-cover" />
      </div>

      {/* Handle */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-gold" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-ink/80 font-mono text-xs text-gold backdrop-blur">
          ◂▸
        </span>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 bg-ink/75 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-gold px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
        Clothsy AI
      </span>

      {/* Garment chip */}
      <div className="pointer-events-none absolute bottom-3 right-3 w-20 border border-gold/50 bg-ivory p-1 shadow-xl md:w-24">
        <div className="relative aspect-[480/639]">
          <Image src="/images/tryon/garment.webp" alt="Garment: tan leather trench coat" fill sizes="96px" className="object-contain" />
        </div>
        <p className="mt-1 text-center font-mono text-[8px] font-bold uppercase tracking-wider text-ink">Garment</p>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare original photo and virtual try-on result"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
