"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type GlowBorderProps = {
  className?: string;
  /**
   * Play a one-shot glow sweep on mount. Set false for cards that
   * don't have a discrete entrance (e.g. an always-moving carousel) —
   * they keep only the hover glow.
   */
  revealOnce?: boolean;
};

/**
 * GlowBorder — a self-contained animated border light for any card.
 *
 * Drop it in as the first child of a card surface (`.card-surface`,
 * `.featured-slide-card`, `.lab-case`, `.testimonial-card`, …). It draws
 * a thin gradient ring masked to the card's edge:
 *  - a one-shot glow sweep on mount
 *  - a rotating glow that runs while the card is hovered
 *
 * Originally the entrance fired when the card scrolled into view via
 * IntersectionObserver. Under Lenis × motion v11 that observer can
 * fail to deliver, leaving the sweep stuck "off" and the card looking
 * flat. The sweep now fires on mount and settles after 1.7s.
 */
export function GlowBorder({ className, revealOnce = true }: GlowBorderProps) {
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    if (!revealOnce) return;
    setRevealing(true);
    const t = window.setTimeout(() => setRevealing(false), 1700);
    return () => window.clearTimeout(t);
  }, [revealOnce]);

  return (
    <span
      aria-hidden
      className={cn("glow-border", revealing && "is-revealing", className)}
    />
  );
}
