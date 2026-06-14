"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

type ScrollFocusFadeProps = {
  children: ReactNode;
  className?: string;
  /** Fade up to full focus as the section enters the viewport. */
  enter?: boolean;
  /** Fade out as the section leaves the top of the viewport. */
  exit?: boolean;
};

/**
 * ScrollFocusFade — the site-wide section focus system. A section is at
 * full presence while it owns the frame; it eases in as it arrives from
 * below and gracefully dims as it exits past the top, handing focus to
 * the next chapter. Scroll-linked (not an entrance animation), so it is
 * perfectly in step with the user's own pacing in both directions.
 */
export function ScrollFocusFade({
  children,
  className,
  enter = true,
  exit = true,
}: ScrollFocusFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 0 → section top at viewport bottom; 1 → section bottom at viewport
  // top. Full focus through the middle of the journey.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75, 0.98],
    [enter ? 0.15 : 1, 1, 1, exit ? 0 : 1]
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={reduced ? undefined : { opacity }}
    >
      {children}
    </motion.div>
  );
}
