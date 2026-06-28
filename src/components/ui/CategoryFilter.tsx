"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import {
  CATEGORY_META,
  CategoryIconKey,
  PathwayCategory,
  getCategoryCounts,
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

  const counts = useMemo(() => getCategoryCounts(), []);

  const renderButtons = () =>
    CATEGORY_META.map((meta) => {
      const isActive = activeCategory === meta.label;
      const isAll = meta.label === "All Pathways";

      // Active fills the whole button with the category's soft accent (warm
      // neutral for "All"); dark neutral text keeps high contrast in both
      // themes. No strong shadow on the active chip.
      const activeStyle: React.CSSProperties = isActive
        ? {
            backgroundColor: meta.softBg,
            borderColor: meta.border,
            color: "#1a1a1a",
          }
        : {};

      const inactiveClasses = isActive
        ? ""
        : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-fg)] opacity-80 hover:opacity-100 hover:bg-[var(--color-surface-2)]";

      return (
        <button
          key={meta.label}
          type="button"
          onClick={() => onSelectCategory(meta.label)}
          aria-pressed={isActive}
          style={activeStyle}
          className={`
            flex flex-shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border
            px-4 py-2.5 text-sm font-medium transition-all duration-300
            select-none focus:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent]
            ${inactiveClasses}
          `}
        >
          <span 
            className="flex items-center justify-center"
            style={isActive ? { color: meta.accent } : { opacity: 0.8 }}
          >
            {getCategoryIcon(meta.icon)}
          </span>
          <span>{meta.label}</span>
          <span
            className="flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold"
            style={
              isActive
                ? { backgroundColor: meta.accent, color: "#1a1a1a" }
                : undefined
            }
          >
            <span className={isActive ? "" : "rounded-full bg-[var(--color-line)] px-2 py-0.5 text-[var(--color-fg)]"}>
              {counts[meta.label] ?? 0}
            </span>
          </span>
        </button>
      );
    });

  return (
    <>
      <div ref={containerRef} className="relative z-20 mb-12 w-full overflow-hidden bg-transparent py-4">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="px-4">
            <h3 id="category-filter-heading" className="text-3xl font-medium tracking-tight">
              Find the work that matches what you’re building
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-base opacity-70">
              Choose a direction and the page will shape itself around the kind of product story you
              want to explore.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-4">
            <div className="hidden md:flex flex-col items-center gap-3 pb-2">
              <div className="flex justify-center gap-3">{renderButtons().slice(0, 5)}</div>
              <div className="flex justify-center gap-3">{renderButtons().slice(5)}</div>
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
                    {meta.label} ({counts[meta.label] ?? 0})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Floating filter bar — soft, no heavy shadow. */}
      <div
        className={`pointer-events-none fixed left-1/2 top-4 z-50 w-fit max-w-[95vw] -translate-x-1/2 transition-all duration-500 ease-out ${
          isFloating ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <div
          className={`pointer-events-auto hidden md:flex flex-col items-center justify-center gap-2 rounded-3xl border border-[var(--color-line)] bg-[var(--color-bg)]/85 p-3 backdrop-blur-xl transition-transform duration-300 hide-scrollbar lg:p-4 ${
            isFloating ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex justify-center gap-2">{renderButtons().slice(0, 5)}</div>
          <div className="flex justify-center gap-2">{renderButtons().slice(5)}</div>
        </div>
        <div
          className={`pointer-events-auto flex md:hidden max-h-[60vh] flex-wrap items-center justify-center gap-2 rounded-3xl border border-[var(--color-line)] bg-[var(--color-bg)]/85 p-2 backdrop-blur-xl transition-transform duration-300 hide-scrollbar ${
            isFloating ? "scale-100" : "scale-95"
          }`}
        >
            <select 
              value={activeCategory} 
              onChange={(e) => onSelectCategory(e.target.value as PathwayCategory)}
              className="w-[240px] appearance-none rounded-full border border-transparent bg-transparent px-4 py-2 text-sm font-medium focus:outline-none"
              style={{
                 backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M4 6l4 4 4-4'/%3e%3c/svg%3e")`,
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'right 12px center'
              }}
            >
              {CATEGORY_META.map(meta => (
                <option key={meta.label} value={meta.label}>
                  {meta.label} ({counts[meta.label] ?? 0})
                </option>
              ))}
            </select>
        </div>
      </div>
    </>
  );
}
