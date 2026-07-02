"use client";

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PathwayCategory,
  ProductPathway,
  getPathwaysForCategory,
  getGroupedPathways,
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

  // "All Pathways" renders as category sections in rail order; each section
  // registers its wrapper here so the rail can scroll-spy and anchor to it.
  const groups = useMemo(() => getGroupedPathways(), []);
  const groupRefs = useRef(new Map<PathwayCategory, HTMLDivElement>());

  // Scroll-driven visibility for the right rail. It stays hidden while the
  // heading/filter is on screen and only slides in once the reader is a few
  // case studies deep; scrolling back toward the top slides it away again.
  // A dead zone between the show/hide thresholds prevents flicker at the edge.
  const [railVisible, setRailVisible] = useState(false);

  // Scroll-spy: which category section is currently in view (All view only).
  // Above the first section it falls back to "All Pathways" (the "All Work"
  // item), so the rail always highlights something meaningful.
  const [spyCategory, setSpyCategory] = useState<PathwayCategory>("All Pathways");
  const activeCategoryRef = useRef(activeCategory);
  activeCategoryRef.current = activeCategory;

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

      // Scroll-spy only applies to the grouped All view; in a filtered view
      // the rail highlights the active filter instead.
      if (activeCategoryRef.current !== "All Pathways") return;
      const threshold = window.innerHeight * 0.38;
      let current: PathwayCategory = "All Pathways";
      for (const group of groups) {
        const el = groupRefs.current.get(group.meta.label);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = group.meta.label;
        }
      }
      setSpyCategory(current);
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
  }, [groups]);

  const pathways = useMemo(() => getPathwaysForCategory(activeCategory), [activeCategory]);

  const smoothScrollTo = useCallback(
    (target: number) => {
      const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
      // On desktop the site runs Lenis smooth-scroll. A native
      // window.scrollTo({behavior:"smooth"}) fights Lenis's own rAF loop and
      // gets interrupted partway. Driving the scroll THROUGH Lenis lands
      // cleanly every time. Touch / reduced-motion fall back to a native jump.
      if (lenis && !reduced) {
        // The page height can change right before this call (e.g. rail click
        // swaps a short filtered view for the tall grouped All view). Lenis
        // clamps targets to its cached limit, so re-measure first or the
        // scroll stops partway down the freshly grown page.
        lenis.resize?.();
        lenis.scrollTo(target, { duration: 0.9 });
      } else {
        window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
      }
    },
    [reduced]
  );

  const scrollToGroup = useCallback(
    (category: PathwayCategory) => {
      const el = groupRefs.current.get(category);
      if (!el) return;
      smoothScrollTo(Math.max(0, window.scrollY + el.getBoundingClientRect().top - 100));
    },
    [smoothScrollTo]
  );

  // Filtering and scrolling are DECOUPLED. The click only updates the category;
  // the scroll happens in an effect AFTER the new filtered list has committed to
  // the DOM. Measuring/scrolling in the same click (as before) read a stale
  // layout — the section height changes with the filter — which is what made the
  // rail "jump randomly" or need a second click. A flag gates the scroll so it
  // fires only on a real selection, not on mount.
  const pendingScrollRef = useRef(false);
  // When the rail asks for a category section while a filter is active, the
  // view first switches back to All, then scrolls to that section post-layout.
  const pendingGroupRef = useRef<PathwayCategory | null>(null);

  const handleSelectCategory = (category: PathwayCategory) => {
    if (category !== activeCategory) {
      pendingGroupRef.current = null;
      pendingScrollRef.current = true;
    }
    setActiveCategory(category);
  };

  // Rail clicks anchor instead of filtering: the grouped All view stays as-is
  // and the page glides to that category's section. From a filtered view the
  // rail first restores the All view, then scrolls once layout has settled.
  const handleRailSelect = (category: PathwayCategory) => {
    if (category === "All Pathways") {
      if (activeCategory !== "All Pathways") {
        handleSelectCategory("All Pathways");
      } else {
        const section = sectionRef.current;
        if (section) {
          smoothScrollTo(
            Math.max(0, window.scrollY + section.getBoundingClientRect().top - 96)
          );
        }
      }
      return;
    }
    if (activeCategory === "All Pathways") {
      scrollToGroup(category);
    } else {
      pendingGroupRef.current = category;
      pendingScrollRef.current = true;
      setActiveCategory("All Pathways");
    }
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
        const groupTarget = pendingGroupRef.current;
        pendingGroupRef.current = null;
        if (groupTarget) {
          scrollToGroup(groupTarget);
          return;
        }
        smoothScrollTo(
          Math.max(0, window.scrollY + section.getBoundingClientRect().top - 96)
        );
      });
    });
  }, [activeCategory, scrollToGroup, smoothScrollTo]);

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

  const cardMotion = (key: string, idx: number, children: React.ReactNode) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={cardTransition(idx)}
      className="h-full"
    >
      {children}
    </motion.div>
  );

  const isAllView = activeCategory === "All Pathways";
  const [featured, ...rest] = pathways;
  const railActiveCategory = isAllView ? spyCategory : activeCategory;

  // 2-col grids never leave a lone card beside an empty slot: when the count
  // is odd, the last card leaves the grid and renders full-width horizontal
  // (same layout as the featured card), so every row reads complete.
  const splitOddTail = (cards: ProductPathway[]) =>
    cards.length % 2 === 1
      ? { grid: cards.slice(0, -1), tail: cards[cards.length - 1] }
      : { grid: cards, tail: null };

  const { grid: restGrid, tail: restTail } = splitOddTail(rest);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20">
      <Container>
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />

        {/* Cards stay centred in the content column — the rail no longer
            reserves a layout track beside them. */}
        <div ref={gridRef} className="scroll-mt-28">
          <div className="min-w-0">
            {isAllView ? (
              /* Grouped view: one section per category, in rail order, so the
                 rail can scroll-spy and anchor. The very first card keeps the
                 full-width featured layout. */
              <div className="mb-24 flex flex-col gap-16 md:gap-20">
                {groups.map((group, groupIdx) => {
                  const [first, ...others] = group.pathways;
                  const { grid: gridCards, tail } = splitOddTail(
                    groupIdx === 0 ? others : group.pathways
                  );
                  return (
                    <div
                      key={group.meta.label}
                      ref={(el) => {
                        if (el) groupRefs.current.set(group.meta.label, el);
                        else groupRefs.current.delete(group.meta.label);
                      }}
                      className="flex flex-col gap-8 scroll-mt-28 md:gap-10"
                    >
                      <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: reduced ? 0 : 0.45, ease: "easeOut" }}
                      >
                        <span
                          aria-hidden
                          className="h-2 w-2 flex-shrink-0 rounded-full"
                          style={{ background: group.meta.accent }}
                        />
                        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                          {group.meta.label}
                        </h3>
                        <span className="text-sm font-medium opacity-45">
                          {group.pathways.length}
                        </span>
                      </motion.div>

                      {groupIdx === 0 &&
                        first &&
                        cardMotion(`all-featured-${first.id}`, 0, (
                          <PathwayCard pathway={first} featured onOpen={handleOpen} />
                        ))}

                      {gridCards.length > 0 && (
                        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10">
                          {gridCards.map((pathway, idx) =>
                            cardMotion(`all-${pathway.id}`, idx, (
                              <PathwayCard pathway={pathway} featured={false} onOpen={handleOpen} />
                            ))
                          )}
                        </div>
                      )}

                      {tail &&
                        cardMotion(`all-${tail.id}`, gridCards.length, (
                          <PathwayCard pathway={tail} featured onOpen={handleOpen} />
                        ))}
                    </div>
                  );
                })}
              </div>
            ) : pathways.length > 0 ? (
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

                {/* Remaining — equal-height 2-column grid; an odd leftover
                    renders full-width horizontal below so no slot sits empty. */}
                {restGrid.length > 0 && (
                  <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10">
                    {restGrid.map((pathway, idx) => {
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

                {restTail && (
                  <motion.div
                    key={`${activeCategory}-${restTail.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={cardTransition(restGrid.length + 1)}
                  >
                    <PathwayCard pathway={restTail} featured onOpen={handleOpen} />
                  </motion.div>
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
            grid (z-40). In the All view it scroll-spies the section in view and
            anchors to a section on click; in a filtered view it highlights the
            filter. It only becomes interactive/visible once the top filter has
            scrolled away (railVisible) and slides off near the top. lg+ only
            — mobile uses the sticky dropdown in CategoryFilter. */}
        <div className="pointer-events-none fixed right-[clamp(12px,2vw,28px)] top-1/2 z-40 hidden -translate-y-1/2 lg:block">
          <div className="pointer-events-auto">
            <PathwayRail
              activeCategory={railActiveCategory}
              onSelectCategory={handleRailSelect}
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
