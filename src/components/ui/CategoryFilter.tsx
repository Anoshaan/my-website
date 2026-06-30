"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  CATEGORY_META,
  CategoryIconKey,
  PathwayCategory,
} from "@/lib/product-pathways";

interface CategoryFilterProps {
  activeCategory: PathwayCategory;
  onSelectCategory: (category: PathwayCategory) => void;
}

const iconProps = {
  width: 15,
  height: 15,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  className: "flex-shrink-0",
};

/** One unique icon per category, keyed by the data's stable icon key. */
export const getCategoryIcon = (key: CategoryIconKey) => {
  switch (key) {
    case "compass":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...iconProps}>
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      );
    case "smartphone":
      return (
        <svg {...iconProps}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "globe":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
    case "shoppingBag":
      return (
        <svg {...iconProps}>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...iconProps}>
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
    case "palette":
      return (
        <svg {...iconProps}>
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case "clapperboard":
      return (
        <svg {...iconProps}>
          <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
          <path d="m6.2 5.3 3.1 3.9" />
          <path d="m12.4 3.4 3.1 4" />
          <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        </svg>
      );
    case "component":
      return (
        <svg {...iconProps}>
          <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
          <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
          <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
          <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
        </svg>
      );
    default:
      return null;
  }
};

export function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  const [isFloating, setIsFloating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setIsFloating(rect.bottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderButtons = () =>
    CATEGORY_META.flatMap((meta, idx) => {
      const isActive = activeCategory === meta.label;

      // Active: filled with the category's soft accent, dark neutral text for
      // contrast in both themes, plus a lift + drop shadow + accent border +
      // bolder label so the selected chip reads as raised — and the cue is
      // structural (not colour-only) for accessibility.
      const activeStyle: React.CSSProperties = isActive
        ? {
            backgroundColor: meta.softBg,
            borderColor: meta.accent,
            color: "#1a1a1a",
            boxShadow: "0 12px 30px -12px rgba(0,0,0,0.30)",
          }
        : {};

      const stateClasses = isActive
        ? "-translate-y-0.5 font-semibold"
        : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-fg)] opacity-80 hover:opacity-100 hover:-translate-y-0.5 hover:bg-[var(--color-surface-2)] hover:shadow-[0_8px_22px_-12px_rgba(0,0,0,0.25)]";

      const btn = (
        <button
          key={meta.label}
          type="button"
          onClick={() => onSelectCategory(meta.label)}
          aria-pressed={isActive}
          style={activeStyle}
          className={`
            flex flex-shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border
            px-4 py-2.5 text-sm font-medium transition-all duration-300
            select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
            [-webkit-tap-highlight-color:transparent]
            ${stateClasses}
          `}
        >
          <span
            className="flex items-center justify-center"
            style={isActive ? { color: meta.accent } : { opacity: 0.8 }}
          >
            {getCategoryIcon(meta.icon)}
          </span>
          <span>{meta.label}</span>
        </button>
      );

      // Force a clean 5 / 4 split on HD+ (xl): after the 5th chip a full-width,
      // zero-height break pushes the remaining four onto a second row. Below xl
      // the break is hidden, so chips wrap naturally (two to three rows).
      if (idx === 4) {
        return [btn, <div key="row-break" aria-hidden className="hidden basis-full xl:block" />];
      }
      return [btn];
    });

  return (
    <>
      <div ref={containerRef} className="relative z-20 mb-12 w-full bg-transparent py-4">
        {/* Generous gap between the title/body block and the filter row so the
            two read as distinct, breathing zones (not cramped together). */}
        <div className="flex flex-col items-center gap-10 text-center md:gap-16">
          <div className="px-4">
            <h3 id="category-filter-heading" className="text-3xl font-medium tracking-tight">
              Explore the range of product thinking
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-base opacity-70">
              A curated view of product platforms, mobile flows, web systems, AI-assisted workflows,
              brand foundations, motion work, and launch-ready handoff processes. Organized to show
              how I approach different product challenges from idea to execution.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-4 xl:max-w-[1600px]">
            {/* HD+ (xl): forced 5 / 4 split via the row-break injected in
                renderButtons. Below xl: chips reflow naturally across two to
                three rows. The wider xl track gives the five top-row chips room
                so they never collapse into one over-long line. */}
            <div className="hidden md:flex flex-wrap justify-center gap-2.5 pb-2">
              {renderButtons()}
            </div>
            <div className="flex md:hidden justify-center w-full">
              <select 
                value={activeCategory} 
                onChange={(e) => onSelectCategory(e.target.value as PathwayCategory)}
                className="w-full max-w-[300px] appearance-none rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-line)]"
                style={{
                   backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M4 6l4 4 4-4'/%3e%3c/svg%3e")`,
                   backgroundRepeat: 'no-repeat',
                   backgroundPosition: 'right 16px center'
                }}
              >
                {CATEGORY_META.map(meta => (
                  <option key={meta.label} value={meta.label}>
                    {meta.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/*
        Mobile/tablet sticky filter — a compact dropdown pinned to the BOTTOM of
        the viewport once the inline filter scrolls away. Bottom placement keeps
        it clear of the main navigation up top and never blocks the cards. On
        lg+, the vertical PathwayRail (rendered beside the cards) takes over, so
        this is hidden there.
      */}
      <div
        className={`pointer-events-none fixed bottom-4 left-1/2 z-50 w-fit max-w-[95vw] -translate-x-1/2 lg:hidden transition-all duration-500 ease-out ${
          isFloating ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bg)]/90 py-1.5 pl-4 pr-1.5 shadow-lg backdrop-blur-xl">
          <span className="text-xs font-medium opacity-55">Pathway</span>
          <div className="relative">
            <select
              aria-label="Filter pathways"
              value={activeCategory}
              onChange={(e) => onSelectCategory(e.target.value as PathwayCategory)}
              className="w-[210px] appearance-none rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] py-2 pl-4 pr-9 text-sm font-medium focus:outline-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M4 6l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              {CATEGORY_META.map((meta) => (
                <option key={meta.label} value={meta.label}>
                  {meta.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
