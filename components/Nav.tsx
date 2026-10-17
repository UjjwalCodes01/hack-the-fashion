"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Plus, Wordmark } from "@/components/hud";
import { EVENT } from "@/lib/content";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#timeline", label: "Timeline" },
  { href: "#prizes", label: "Prizes" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
];

export { Wordmark };

export function RegisterButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  const href = EVENT.registerUrl || "#register";
  return (
    <a
      href={href}
      onClick={onClick}
      {...(EVENT.registerUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-3 font-ui text-sm font-bold uppercase tracking-[0.14em] text-white transition-transform active:scale-95 md:text-base ${className}`}
    >
      <span
        aria-hidden
        className="clip-slant absolute inset-0 bg-gradient-to-r from-[#c24d23] via-[#af431c] to-[#eb7424] shadow-[0_0_24px_rgba(237,98,47,0.6)] transition-all group-hover:brightness-125"
      />
      <span aria-hidden className="clip-slant absolute inset-[2px] bg-gradient-to-r from-[#ed622f]/90 to-[#f58a42]/90" />
      <span className="relative">Register now</span>
      <span aria-hidden className="relative transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export default function Nav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section in view.
  useEffect(() => {
    if (!home) return;
    const els = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const prefix = home ? "" : "/";

  return (
    <nav className="fixed left-0 top-0 z-50 w-full">
      <div className={`relative transition-colors duration-300 ${scrolled ? "bg-void/85 backdrop-blur-md" : "bg-gradient-to-b from-void/90 to-transparent"}`}>
        <Plus className="absolute left-[3%] top-7 hidden size-7 opacity-80 xl:block" />
        <Plus className="absolute right-[3%] top-7 hidden size-7 opacity-80 xl:block" />

        <div className="relative mx-auto flex h-20 w-[92%] max-w-[1320px] items-center justify-between md:h-[5.5rem]">
          <Link href="/" aria-label="Hack the Fashion home" className="shrink-0 transition-transform hover:scale-[1.03]">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const on = active === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={`${prefix}${l.href}`}
                    className={`group relative block px-4 py-3 font-ui text-sm font-semibold uppercase tracking-[0.12em] transition-colors xl:px-5 ${
                      on ? "text-white" : "text-frost/80 hover:text-white"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute inset-x-4 bottom-1 h-0.5 origin-center bg-gradient-to-r from-cyan to-violet shadow-[0_0_10px_rgba(232,161,18,0.8)] transition-transform duration-300 xl:inset-x-5 ${
                        on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <RegisterButton />
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex size-11 flex-col items-center justify-center gap-1.5 border border-violet/60 shadow-[0_0_12px_rgba(246,134,60,0.35)] lg:hidden"
            >
              <span className={`h-0.5 w-5 bg-frost transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-frost transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* HUD frame line with angled notches, as in the mockup */}
        <svg viewBox="0 0 1440 20" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-5 w-full" aria-hidden>
          <defs>
            <linearGradient id="navline" x1="0" x2="1">
              <stop offset="0" stopColor="#e8a112" stopOpacity="0.15" />
              <stop offset="0.3" stopColor="#f6863c" stopOpacity="0.9" />
              <stop offset="0.7" stopColor="#f6863c" stopOpacity="0.9" />
              <stop offset="1" stopColor="#e8a112" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path d="M0 19H120L134 6H380L396 19H470" fill="none" stroke="url(#navline)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d="M970 19H1040L1056 6H1306L1320 19H1440" fill="none" stroke="url(#navline)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d="M1010 18l10-12M1022 18l10-12M1034 18l10-12" stroke="#fa6027" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-void/95 backdrop-blur-lg lg:hidden"
          >
            <div className="hud-grid pointer-events-none absolute inset-0 opacity-60" />
            <ul className="relative mx-auto flex w-[92%] flex-col pt-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="border-b border-violet/25"
                >
                  <a href={`${prefix}${l.href}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                    <span className="font-display text-2xl font-bold uppercase text-frost">{l.label}</span>
                    <span className="font-mono text-xs text-magenta">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-8">
                <RegisterButton className="w-full" onClick={() => setOpen(false)} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
