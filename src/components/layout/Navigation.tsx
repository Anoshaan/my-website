"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Selected Work", href: "/selected-work" },
  { label: "Process", href: "/process" },
  { label: "Branding", href: "/branding" },
  { label: "About Me", href: "/about-me" },
  { label: "Let's Talk", href: "/lets-talk" },
];

// Sustained upward distance (px) the user must scroll before the nav drops
// back in. Deliberately on the higher end so a small swipe/nudge up never
// re-summons it — the nav only returns on clear, sustained upward intent.
const SHOW_THRESHOLD = 150;
// Stay pinned/visible while still near the top of the page.
const TOP_ZONE = 90;
// Only start hiding once the user is genuinely down the page.
const HIDE_AFTER = 160;
// Reset the upward accumulator after a brief pause so an old, abandoned
// upward nudge doesn't combine with a fresh one to trip the threshold early.
const UP_IDLE_RESET_MS = 220;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Direction-aware reveal: hide on scroll-down, and only drop the nav back
  // in after the user has scrolled UP a sustained distance (so a small
  // upward nudge does nothing). Throttled with requestAnimationFrame.
  useEffect(() => {
    let lastY = window.scrollY;
    let upAccum = 0;
    let lastUpTs = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const dy = y - lastY;
      setScrolled(y > 20);

      if (y <= TOP_ZONE) {
        setHidden(false);
        upAccum = 0;
      } else if (dy > 0) {
        upAccum = 0;
        if (y > HIDE_AFTER) setHidden(true);
      } else if (dy < 0) {
        const now = performance.now();
        if (now - lastUpTs > UP_IDLE_RESET_MS) upAccum = 0;
        lastUpTs = now;
        upAccum += -dy;
        // Reveal only on sustained upward intent. The Selected Work filter now
        // lives in a right-side rail / bottom pill, so the top nav no longer
        // conflicts with it and uses the same calm reveal as every other page.
        if (upAccum >= SHOW_THRESHOLD) {
          setHidden(false);
        }
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
  }, [pathname]);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // While the menu is open, lock background scroll (Lenis-aware) and allow
  // closing with Escape.
  useEffect(() => {
    const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        lenis?.start();
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    return undefined;
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] flex items-center justify-center pt-4 sm:pt-5 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          hidden && !menuOpen && "-translate-y-[140%]"
        )}
      >
        {/* DESKTOP / TABLET — centred pill with the full set of links. */}
        <nav
          aria-label="Primary"
          className={cn(
            "app-nav hidden sm:flex items-center gap-0.5 sm:gap-2 px-1.5 sm:px-3 py-2 rounded-full transition-all duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
            scrolled && "app-nav--scrolled"
          )}
        >
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-precise
                className={cn(
                  "nav-link group relative inline-flex items-center justify-center px-2 sm:px-4 py-1.5 rounded-full text-[12.5px] sm:text-sm font-medium tracking-tight transition-colors duration-[250ms] min-h-[40px] sm:min-w-[44px]",
                  active ? "text-white" : "text-white/55 hover:text-white"
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

        {/* MOBILE — name on the left, hamburger on the right. */}
        <div
          className={cn(
            "app-nav app-nav--mobile sm:hidden flex items-center justify-between gap-3 px-4 py-2 rounded-full transition-all duration-[500ms]",
            scrolled && "app-nav--scrolled"
          )}
        >
          <Link href="/" className="nav-brand" data-cursor-precise>
            Anoshaan
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={cn("nav-burger", menuOpen && "is-open")}
            data-cursor-precise
          >
            <span className="nav-burger-line" />
            <span className="nav-burger-line" />
            <span className="nav-burger-line" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU — backdrop + glass panel with all links + theme toggle. */}
      <div
        id="mobile-menu"
        className={cn("nav-mobile-menu sm:hidden", menuOpen && "is-open")}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          className="nav-mobile-backdrop"
          onClick={() => setMenuOpen(false)}
        />
        <nav aria-label="Mobile" className="nav-mobile-panel">
          <ul className="nav-mobile-list">
            {links.map((link, i) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href} style={{ ["--i" as string]: i }}>
                  <Link
                    href={link.href}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                    className={cn("nav-mobile-link", active && "is-active")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav-mobile-foot">
            <span className="nav-mobile-foot-label">Theme</span>
            <ThemeToggle variant="inline" />
          </div>
        </nav>
      </div>
    </>
  );
}
