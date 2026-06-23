"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const links = [
  { label: "Selected Work", href: "/selected-work" },
  { label: "Process", href: "/process" },
  { label: "Branding", href: "/branding" },
  { label: "About Me", href: "/about-me" },
  { label: "Let's Talk", href: "/lets-talk" },
];

/**
 * Inline page footer — appears at the natural end of each page, not pinned
 * to the viewport. It reveals with a slight delay after the closing CTA
 * settles (scroll-linked, so it works in both directions) and anchors the
 * very bottom of the page — nothing scrolls past it.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Late ramp = the "slight delay" after the CTA section has settled.
  const opacity = useTransform(scrollYProgress, [0.35, 0.95], [0, 1]);
  const y = useTransform(scrollYProgress, [0.35, 0.95], [22, 0]);

  const goToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.footer
      ref={ref}
      aria-label="Site footer"
      className="relative z-10 flex items-center justify-center pt-10 pb-10 sm:pt-12 sm:pb-12 px-3"
      style={reduced ? undefined : { opacity, y }}
    >
      <nav
        aria-label="Footer"
        className="app-footer-pill flex items-center gap-3 sm:gap-5 px-3 sm:px-5 py-2 rounded-full max-w-[calc(100vw-16px)]"
      >
        <span className="hidden md:inline-flex items-center text-sm font-medium tracking-tight text-white/85 whitespace-nowrap px-2">
          Anoshaan&nbsp;·&nbsp;Product Experience Designer &amp; UI/UX Lead
        </span>

        <span className="hidden md:inline-block h-3.5 w-px bg-white/[0.14]" aria-hidden />

        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="footer-link group inline-flex items-center justify-center px-2.5 sm:px-3 py-1.5 rounded-full text-sm font-medium tracking-tight text-white/60 hover:text-white transition-colors duration-[250ms] min-h-[36px] whitespace-nowrap"
              data-cursor-precise
            >
              {link.label}
            </Link>
          ))}
        </div>

        <span className="hidden sm:inline-block h-3.5 w-px bg-white/[0.14]" aria-hidden />

        <ThemeToggle variant="inline" />

        <span className="inline-block h-3.5 w-px bg-white/[0.14]" aria-hidden />

        <button
          type="button"
          onClick={goToTop}
          aria-label="Go to top"
          data-cursor-precise
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium tracking-tight text-white/60 hover:text-white transition-colors duration-[250ms] min-h-[36px] whitespace-nowrap"
        >
          <span className="hidden sm:inline">Go to Top</span>
          <span className="sm:hidden">Top</span>
          <svg viewBox="0 0 14 14" width="11" height="11" aria-hidden="true">
            <path
              d="M7 11V3M3 7L7 3L11 7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
    </motion.footer>
  );
}
