"use client";

import React from "react";
import {
  CATEGORY_META,
  PathwayCategory,
} from "@/lib/product-pathways";
import { getCategoryIcon } from "./CategoryFilter";

interface PathwayRailProps {
  activeCategory: PathwayCategory;
  onSelectCategory: (category: PathwayCategory) => void;
  /**
   * Scroll-driven visibility. The rail only reveals once the reader has
   * scrolled past the heading/filter and into the case studies; it slides back
   * off to the right when they return to the top (where the main nav lives).
   */
  visible: boolean;
}

/**
 * PathwayRail — the vertical, sticky filter rail shown beside the cards on
 * desktop/large-tablet (lg+). It replaces the old top-centre floating pill so it
 * never collides with the main navigation. It lives in its own layout column
 * (see PathwaysGrid), so it carves out real space and never covers card text or
 * preview media. Categories stack vertically with their icon, a compact label,
 * and a live count; the active pathway is filled with its soft accent.
 *
 * It stays hidden (slid off to the right) while the filter section is on screen
 * and only glides in once the reader is a few case studies deep, so it never
 * competes with the heading or the main navigation up top.
 */
export function PathwayRail({ activeCategory, onSelectCategory, visible }: PathwayRailProps) {
  return (
    <nav
      aria-label="Filter pathways"
      aria-hidden={!visible}
      className={`flex max-h-[86vh] w-[210px] flex-col gap-1.5 overflow-y-auto rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-bg)]/80 p-2.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-[140%] opacity-0"
      }`}
    >
      <span className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-45">
        Pathways
      </span>

      {CATEGORY_META.map((meta) => {
        const isActive = activeCategory === meta.label;

        // Selected state is communicated by colour/fill + accent border only —
        // no drop shadow (the rail card already carries its own elevation).
        const activeStyle: React.CSSProperties = isActive
          ? {
              backgroundColor: meta.softBg,
              borderColor: meta.accent,
              color: "#1a1a1a",
            }
          : {};

        return (
          <button
            key={meta.label}
            type="button"
            onClick={() => onSelectCategory(meta.label)}
            aria-pressed={isActive}
            style={activeStyle}
            title={meta.label}
            className={`group flex items-center gap-2.5 rounded-full border px-3 py-2 text-left text-[13px] font-medium transition-all duration-300 [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
              isActive
                ? "font-semibold"
                : "border-transparent text-[var(--color-fg)] opacity-70 hover:bg-[var(--color-surface-2)] hover:opacity-100"
            }`}
          >
            <span
              className="flex flex-shrink-0 items-center justify-center"
              style={isActive ? { color: meta.accent } : { opacity: 0.8 }}
            >
              {getCategoryIcon(meta.icon)}
            </span>
            <span className="min-w-0 flex-1 truncate">{meta.short}</span>
          </button>
        );
      })}
    </nav>
  );
}
