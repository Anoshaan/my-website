"use client";

import React, { useMemo } from "react";
import {
  CATEGORY_META,
  PathwayCategory,
  getCategoryCounts,
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
  const counts = useMemo(() => getCategoryCounts(), []);

  return (
    <nav
      aria-label="Filter pathways"
      aria-hidden={!visible}
      className={`sticky top-[120px] flex flex-col gap-1.5 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-bg)]/70 p-2.5 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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

        const activeStyle: React.CSSProperties = isActive
          ? {
              backgroundColor: meta.softBg,
              borderColor: meta.border,
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
            className={`group flex items-center gap-2.5 rounded-full border px-3 py-2 text-left text-[13px] font-medium transition-all duration-300 [-webkit-tap-highlight-color:transparent] focus:outline-none ${
              isActive
                ? ""
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
            <span
              className="flex flex-shrink-0 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums"
              style={
                isActive
                  ? { backgroundColor: meta.accent, color: "#1a1a1a" }
                  : undefined
              }
            >
              <span
                className={
                  isActive
                    ? ""
                    : "rounded-full bg-[var(--color-line)] px-1.5 py-0.5 text-[var(--color-fg)]"
                }
              >
                {counts[meta.label] ?? 0}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
