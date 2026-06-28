"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { CATEGORIES, PathwayCategory, MAIN_PATHWAYS, ADDITIONAL_DIRECTIONS, getCategoryStyles } from "@/lib/product-pathways";

interface CategoryFilterProps {
  activeCategory: PathwayCategory;
  onSelectCategory: (category: PathwayCategory) => void;
}



export const getCategoryIcon = (category: string) => {
  const iconProps = { 
    width: 14, 
    height: 14, 
    fill: "none", 
    stroke: "currentColor", 
    strokeWidth: 2, 
    strokeLinecap: "round" as const, 
    strokeLinejoin: "round" as const, 
    className: "opacity-80 flex-shrink-0" 
  };
  
  switch (category) {
    case "All Pathways":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 2v20" />
          <path d="m17 5-5-3-5 3" />
          <path d="m19 19-7 3-7-3" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "Cross-Device Systems":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" /><path d="M12 17v4" />
          <rect x="16" y="11" width="6" height="10" rx="1" fill="currentColor" opacity="0.2" />
        </svg>
      );
    case "Dashboards & Admin Tools":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      );
    case "Mobile App Experiences":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "Web & CMS Platforms":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M3 9h18" /><path d="M9 21V9" />
        </svg>
      );
    case "Commerce & Marketplace":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case "AI & Automation UX":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
    case "Micro UI & Extensions":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
          <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
          <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
          <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
        </svg>
      );
    case "Design Systems & Handoff":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 12 12 17 22 12" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="6" cy="19" r="3" />
          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
          <circle cx="18" cy="5" r="3" />
        </svg>
      );
  }
};

export function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  const [isFloating, setIsFloating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(cat => counts[cat] = 0);
    const allItems = [...MAIN_PATHWAYS, ...ADDITIONAL_DIRECTIONS];
    counts["All Pathways"] = allItems.length;

    allItems.forEach(item => {
      const itemCategories = ['category' in item ? item.category : item.primaryCategory];
      if ('otherCategories' in item && Array.isArray(item.otherCategories)) {
        itemCategories.push(...item.otherCategories);
      }
      const uniqueCats = Array.from(new Set(itemCategories));
      uniqueCats.forEach(cat => {
        if (typeof cat === 'string' && counts[cat] !== undefined) {
          counts[cat]++;
        }
      });
    });
    return counts;
  }, []);

  const topRowCategories = CATEGORIES.slice(0, 5);
  const bottomRowCategories = CATEGORIES.slice(5);

  const renderButtons = (categories: readonly string[], inFloatingBar: boolean = false) => {
    return categories.map((category) => {
      const count = categoryCounts[category] || 0;
      const isActive = activeCategory === category;
      // Show all categories regardless of count
      
      const styles = getCategoryStyles(category);
      
      const activeClasses = inFloatingBar
        ? `${styles.highlight} border-transparent`
        : `${styles.highlight} border-transparent scale-105`;

      const inactiveClasses = "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-fg)] hover:bg-[var(--color-surface-2)] opacity-80 hover:opacity-100 hover:scale-[1.02]";

      return (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category as PathwayCategory)}
          aria-pressed={isActive}
          className={`
            flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300
            text-sm font-medium border flex-shrink-0 whitespace-nowrap overflow-hidden
            ${isActive ? activeClasses : inactiveClasses}
          `}
        >
          {getCategoryIcon(category)}
          <span>{category}</span>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-[var(--color-line)] text-[var(--color-fg)]'}`}>
            {count}
          </span>
        </button>
      );
    });
  };

  return (
    <>
      <div ref={containerRef} className="w-full relative z-20 mb-12 py-4 bg-transparent overflow-hidden">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="px-4">
            <h3 className="text-3xl font-medium tracking-tight">Find the work that matches what you’re building</h3>
            <p className="text-base opacity-70 mt-3 max-w-2xl mx-auto">Choose a direction and the page will shape itself around the kind of product story you want to explore.</p>
          </div>
          
          <div className="relative w-full max-w-[1200px] mx-auto px-4">
            {/* Desktop Layout - Fixed 5 top, 4 bottom */}
            <div className="hidden lg:flex flex-col gap-4">
              <div className="flex flex-nowrap justify-center gap-4 w-full">
                {renderButtons(topRowCategories)}
              </div>
              <div className="flex flex-nowrap justify-center gap-4 w-full">
                {renderButtons(bottomRowCategories)}
              </div>
            </div>

            {/* Mobile/Tablet Layout - Wrapping naturally */}
            <div className="flex lg:hidden flex-wrap justify-center gap-2 px-2">
              {renderButtons(CATEGORIES)}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Filter Bar */}
      <div 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out w-fit max-w-[95vw] pointer-events-none ${isFloating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
      >
        <div className={`pointer-events-auto flex items-center p-3 lg:p-4 rounded-3xl bg-[var(--color-bg)]/85 backdrop-blur-xl border border-[var(--color-line)] shadow-xl shadow-black/5 dark:shadow-white/5 transition-transform duration-300 overflow-hidden ${isFloating ? 'scale-100' : 'scale-95'}`}>
          
          {/* Desktop Floating Layout - Fixed 5 top, 4 bottom */}
          <div className="hidden lg:flex flex-col items-center gap-3 w-full">
            <div className="flex flex-nowrap justify-center gap-3 w-full">
              {renderButtons(topRowCategories, true)}
            </div>
            <div className="flex flex-nowrap justify-center gap-3 w-full">
              {renderButtons(bottomRowCategories, true)}
            </div>
          </div>

          {/* Mobile/Tablet Floating Layout - Wrapping naturally */}
          <div className="flex lg:hidden flex-wrap justify-center gap-2 max-h-[50vh] overflow-y-auto hide-scrollbar w-full">
            {renderButtons(CATEGORIES, true)}
          </div>
          
        </div>
      </div>
    </>
  );
}

