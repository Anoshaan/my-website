"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PathwayCategory,
  ProductPathway,
  getPathwaysForCategory,
} from "@/lib/product-pathways";
import { Container } from "@/components/ui/Container";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { Button } from "@/components/ui/Button";
import { PathwayCard } from "./PathwayCard";
import { PathwayModalContent } from "./PathwayModalContent";
import { CaseStudyOverlay } from "@/components/sections/labs/CaseStudyOverlay";

export function PathwaysGrid() {
  const reduced = useReducedMotion();

  // Filtering is state-only — no URL/hash changes, so a filter click never
  // triggers browser jump-to-anchor behaviour.
  const [activeCategory, setActiveCategory] = useState<PathwayCategory>("All Pathways");

  // One modal for all pathways. `renderPathway` stays set through the close
  // animation so content does not vanish mid-exit.
  const [open, setOpen] = useState(false);
  const [renderPathway, setRenderPathway] = useState<ProductPathway | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const pathways = useMemo(() => getPathwaysForCategory(activeCategory), [activeCategory]);

  const handleSelectCategory = (category: PathwayCategory) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    
    // Always align the user to the filter heading when a category is selected
    requestAnimationFrame(() => {
      const heading = document.getElementById("category-filter-heading");
      if (heading) {
        const top = heading.getBoundingClientRect().top;
        const y = window.scrollY + top - 100; // 100px padding from top to leave breathing room
        window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
      }
    });
  };

  const handleOpen = (pathway: ProductPathway) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setRenderPathway(pathway);
    setOpen(true);
  };

  const cardTransition = (idx: number) => ({
    duration: reduced ? 0 : 0.4,
    ease: "easeOut" as const,
    delay: reduced ? 0 : 0.04 * Math.min(idx, 6),
  });

  const [featured, ...rest] = pathways;

  return (
    <section className="relative py-12 md:py-20">
      <Container>
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />

        <div ref={gridRef} className="scroll-mt-28">
          {pathways.length > 0 ? (
            <div className="mb-24 flex flex-col gap-8 md:gap-10">
              {/* Featured (strongest) — full-width horizontal card. Keyed by
                  category so it re-animates in on each filter change. */}
              {featured && (
                <motion.div
                  key={`${activeCategory}-featured-${featured.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={cardTransition(0)}
                >
                  <PathwayCard pathway={featured} featured onOpen={handleOpen} />
                </motion.div>
              )}

              {/* Remaining — equal-height 2-column grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10">
                  {rest.map((pathway, idx) => {
                    const isLastOdd = idx === rest.length - 1 && rest.length % 2 !== 0;
                    return (
                      <motion.div
                        key={`${activeCategory}-${pathway.id}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={cardTransition(idx + 1)}
                        className={`h-full ${isLastOdd ? "md:col-span-2" : ""}`}
                      >
                        <PathwayCard pathway={pathway} featured={isLastOdd} onOpen={handleOpen} />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center opacity-60">
              <p>No pathways found for this category.</p>
              <Button onClick={() => handleSelectCategory("All Pathways")} variant="ghost" className="mt-6">
                View all pathways
              </Button>
            </div>
          )}
        </div>
      </Container>

      {renderPathway && (
        <CaseStudyOverlay
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setRenderPathway(null)}
          title={renderPathway.title}
          returnFocusRef={triggerRef}
        >
          <PathwayModalContent pathway={renderPathway} />
        </CaseStudyOverlay>
      )}
    </section>
  );
}
