"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PathwayCategory,
  ProductPathway,
  getPathwaysForCategory,
} from "@/lib/product-pathways";
import { Container } from "@/components/ui/Container";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { PathwayRail } from "@/components/ui/PathwayRail";
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
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Scroll-driven visibility for the right rail. It stays hidden while the
  // heading/filter is on screen and only slides in once the reader is a few
  // case studies deep; scrolling back toward the top slides it away again.
  // A dead zone between the show/hide thresholds prevents flicker at the edge.
  const [railVisible, setRailVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const grid = gridRef.current;
      if (!grid) return;
      const top = grid.getBoundingClientRect().top;
      setRailVisible((prev) => {
        if (top < -260) return true; // scrolled well into the case studies
        if (top > -160) return false; // back up near the heading / nav
        return prev; // hysteresis dead zone
      });
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

  const pathways = useMemo(() => getPathwaysForCategory(activeCategory), [activeCategory]);

  const handleSelectCategory = (category: PathwayCategory) => {
    setActiveCategory(category);

    // Always glide back up to the TOP of the section (heading + filter) so a
    // fresh selection reads from the start. This works for the top buttons and
    // the sticky right rail alike; returning to the top also tucks the rail
    // away, and scrolling back down brings it in again.
    requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;
      const target = window.scrollY + section.getBoundingClientRect().top - 80;
      if (target < window.scrollY - 1) {
        window.scrollTo({ top: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
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
    <section ref={sectionRef} className="relative py-12 md:py-20">
      <Container>
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />

        <div ref={gridRef} className="scroll-mt-28 lg:flex lg:items-start lg:gap-8 xl:gap-10">
          {/* Cards column — min-w-0 lets long titles/tags wrap instead of
              forcing the flex track wider than the viewport. */}
          <div className="min-w-0 lg:flex-1">
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
                      return (
                        <motion.div
                          key={`${activeCategory}-${pathway.id}`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={cardTransition(idx + 1)}
                          className="h-full"
                        >
                          <PathwayCard pathway={pathway} featured={false} onOpen={handleOpen} />
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

          {/* Vertical right rail — its own layout column on lg+, so it reserves
              real space and never overlaps card text or preview media. */}
          <aside className="hidden lg:block lg:w-[220px] lg:flex-shrink-0 lg:self-stretch">
            <PathwayRail
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              visible={railVisible}
            />
          </aside>
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
