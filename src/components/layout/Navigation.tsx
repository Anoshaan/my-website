"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Labs", href: "/labs" },
  { label: "Systems", href: "/systems" },
  { label: "Brand", href: "/brand" },
  { label: "About", href: "/about" },
  { label: "Connect", href: "/connect" },
];

// Sustained upward distance (px) the user must scroll before the nav drops
// back in — keeps a tiny upward nudge from re-summoning it.
const SHOW_THRESHOLD = 110;
// Stay pinned/visible while still near the top of the page.
const TOP_ZONE = 90;
// Only start hiding once the user is genuinely down the page.
const HIDE_AFTER = 160;

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Direction-aware reveal: hide on scroll-down, and only drop the nav back
  // in after the user has scrolled UP a sustained distance (so a small
  // upward nudge does nothing). Throttled with requestAnimationFrame.
  useEffect(() => {
    let lastY = window.scrollY;
    let upAccum = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const dy = y - lastY;
      setScrolled(y > 20);

      if (y <= TOP_ZONE) {
        // Near the top → always available, reset the accumulator.
        setHidden(false);
        upAccum = 0;
      } else if (dy > 0) {
        // Scrolling down → collapse once past the threshold; reset up-count.
        upAccum = 0;
        if (y > HIDE_AFTER) setHidden(true);
      } else if (dy < 0) {
        // Scrolling up → build intent; reveal only after a sustained nudge.
        upAccum += -dy;
        if (upAccum >= SHOW_THRESHOLD) setHidden(false);
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] flex items-center justify-center pt-4 sm:pt-5 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && "-translate-y-[140%]"
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "app-nav flex items-center gap-0.5 sm:gap-2 px-1.5 sm:px-3 py-2 rounded-full transition-all duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          scrolled && "app-nav--scrolled"
        )}
      >
        {links.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-precise
              className={cn(
                "nav-link group relative inline-flex items-center justify-center px-2 sm:px-4 py-1.5 rounded-full text-[12.5px] sm:text-sm font-medium tracking-tight transition-colors duration-[250ms] min-h-[40px] sm:min-w-[44px]",
                active
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              )}
            >
              <span className="nav-rollover">
                <span className="nav-rollover__top">{link.label}</span>
                <span className="nav-rollover__bottom" aria-hidden="true">
                  {link.label}
                </span>
              </span>
              {active && (
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-px bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
