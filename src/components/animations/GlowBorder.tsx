"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

type GlowBorderProps = {
  className?: string;
  /**
   * Play a one-shot glow sweep the first time the card scrolls into view.
   * Set false for cards that don't have a discrete entrance (e.g. an
   * always-moving carousel) — they keep only the hover glow.
   */
  revealOnce?: boolean;
};

/**
 * GlowBorder — a self-contained animated border light for any card.
 *
 * Drop it in as the first child of a card surface (`.card-surface`,
 * `.featured-slide-card`, `.lab-case`, `.testimonial-card`, …). It draws
 * a thin gradient ring masked to the card's edge:
 *  - a one-shot glow sweep the first time the card scrolls into view
 *  - a rotating glow that runs while the card is hovered
 *
 * Each instance owns its own IntersectionObserver, so the entrance glow
 * fires per card with no wiring needed in the parent. Entrance plays
 * once and settles — it never re-triggers on scroll-up.
 */
export function GlowBorder({ className, revealOnce = true }: GlowBorderProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    if (!revealOnce || !inView) return;
    setRevealing(true);
    // Class is removed once the entrance sweep is done so it never
    // collides with the hover glow.
    const t = window.setTimeout(() => setRevealing(false), 1700);
    return () => window.clearTimeout(t);
  }, [revealOnce, inView]);

  return (
    <span
      // Only hover-glow cards (revealOnce=false) skip the observer entirely.
      ref={revealOnce ? ref : undefined}
      aria-hidden
      className={cn("glow-border", revealing && "is-revealing", className)}
    />
  );
}
