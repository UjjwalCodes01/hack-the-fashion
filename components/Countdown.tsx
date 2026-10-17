"use client";

import { useEffect, useState } from "react";

type Parts = { d: string; h: string; m: string; s: string } | null;

function partsUntil(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    d: pad(Math.floor(diff / 86_400_000)),
    h: pad(Math.floor(diff / 3_600_000) % 24),
    m: pad(Math.floor(diff / 60_000) % 60),
    s: pad(Math.floor(diff / 1000) % 60),
  };
}

export default function Countdown({ to }: { to: string }) {
  // Rendered as "--" on the server, filled in after hydration to avoid a mismatch.
  const [parts, setParts] = useState<Parts>(null);

  useEffect(() => {
    const target = new Date(to).getTime();
    const tick = () => setParts(partsUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [to]);

  const cells: [string, string | undefined][] = [
    ["Days", parts?.d],
    ["Hours", parts?.h],
    ["Minutes", parts?.m],
    ["Seconds", parts?.s],
  ];

  return (
    <div role="timer" aria-label="Time until hacking starts" className="grid grid-cols-4 gap-2">
      {cells.map(([label, value]) => (
        <div key={label} className="relative border border-line bg-ink-2/80 px-2 py-3 text-center backdrop-blur-sm">
          <span className="block font-display text-3xl font-semibold tabular-nums text-ivory md:text-4xl">
            {value ?? "--"}
          </span>
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-mute">{label}</span>
        </div>
      ))}
    </div>
  );
}
