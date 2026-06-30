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

  // Filtering and scrolling are DECOUPLED. The click only updates the category;
  // the scroll happens in an effect AFTER the new filtered list has committed to
  // the DOM. Measuring/scrolling in the same click (as before) read a stale
  // layout — the section height changes with the filter — which is what made the
  // rail "jump randomly" or need a second click. A flag gates the scroll so it
  // fires only on a real selection, not on mount.
  const pendingScrollRef = useRef(false);

  const handleSelectCategory = (category: PathwayCategory) => {
    if (category !== activeCategory) pendingScrollRef.current = true;
    setActiveCategory(category);
  };

  useEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    const section = sectionRef.current;
    if (!section) return;
    // Two rAFs so the freshly filtered cards (and the swapped featured card)
    // have laid out before we scroll, giving one predictable glide to the
    // heading / filter / results area regardless of which category is picked.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
        // On desktop the site runs Lenis smooth-scroll. A native
        // window.scrollTo({behavior:"smooth"}) fights Lenis's own rAF loop and
        // gets interrupted partway — that was the "lands in an awkward middle"
        // bug (e.g. Commerce). Driving the scroll THROUGH Lenis lands cleanly
        // every time. Touch / reduced-motion fall back to a native jump.
        const target = Math.max(
          0,
          window.scrollY + section.getBoundingClientRect().top - 96
        );
        if (lenis && !reduced) {
          // Pass a numeric target (not the element) so Lenis doesn't warn about
          // offsetParent positioning and lands on an exact, stable position.
          lenis.scrollTo(target, { duration: 0.9 });
        } else {
          window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
        }
      });
    });
  }, [activeCategory, reduced]);

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

        {/* Cards stay centred in the content column — the rail no longer
            reserves a layout track beside them. */}
        <div ref={gridRef} className="scroll-mt-28">
          <div className="min-w-0">
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
        </div>

        {/* Floating category rail — a FIXED overlay pinned near the right edge.
            It reserves no layout space (cards stay centred) and floats above the
            grid (z-40). It only becomes interactive/visible once the top filter
            has scrolled away (railVisible) and slides off near the top. lg+ only
            — mobile uses the sticky dropdown in CategoryFilter. */}
        <div className="pointer-events-none fixed right-[clamp(12px,2vw,28px)] top-1/2 z-40 hidden -translate-y-1/2 lg:block">
          <div className="pointer-events-auto">
            <PathwayRail
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              visible={railVisible}
            />
          </div>
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
