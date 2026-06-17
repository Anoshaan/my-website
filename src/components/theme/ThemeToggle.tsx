"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

/**
 * Sun/moon theme switch. Two visual variants:
 *  - "floating": glassy pill fixed at the top-left of the page (site-wide).
 *  - "inline": bare button sized to sit inside the footer pill.
 *
 * Renders a stable placeholder until mounted so SSR markup matches and the
 * icon never flashes the wrong state.
 */
export function ThemeToggle({
  variant = "inline",
  className,
}: {
  variant?: "floating" | "inline";
  className?: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  // Visual styling (background, border, ink, blur) is driven by the
  // `.theme-toggle*` rules in globals.css, because the site's unlayered
  // `button { background: none; border: 0 }` reset overrides Tailwind's
  // layered colour utilities on <button> elements. We keep only layout here.
  const base =
    variant === "floating"
      ? // Hidden on phones so the corner stays clear for the full nav; the
        // footer carries the theme toggle on mobile. Visible from sm up.
        "theme-toggle theme-toggle--floating fixed top-4 right-3 sm:top-5 sm:right-5 z-[101] hidden sm:inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full"
      : "theme-toggle inline-flex items-center justify-center w-9 h-9 rounded-full";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      data-cursor-precise
      className={cn(base, className)}
    >
      <span className="relative block w-[18px] h-[18px]" aria-hidden="true">
        {/* Sun — shown in dark mode (tap to go light) */}
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "absolute inset-0 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            mounted && isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          )}
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
        {/* Moon — shown in light mode (tap to go dark) */}
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "absolute inset-0 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            mounted && !isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          )}
        >
          <path d="M20.5 14.2A8.2 8.2 0 0 1 9.8 3.5a8.2 8.2 0 1 0 10.7 10.7Z" />
        </svg>
      </span>
    </button>
  );
}
