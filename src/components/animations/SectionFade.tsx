"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionFadeProps = {
  children: ReactNode;
  className?: string;
  /** Slight upward drift while fading. */
  drift?: boolean;
  /** Override the fade range. Lower numbers = sharper fade at edges. */
  fadeIn?: number;
  fadeOut?: number;
  /** Minimum opacity at the edges (0 = fully invisible, 0.1 = barely visible). */
  edgeOpacity?: number;
  /** Wrap as `section` vs `div`. */
  as?: "section" | "div";
};

/**
 * Scroll-linked fade wrapper.
 * As the section enters viewport from below, it fades in.
 * As it exits the top of viewport, it fades out.
 * Works continuously both directions — no first-time-only behavior.
 */
export function SectionFade({
  children,
  className,
  drift = true,
  fadeIn = 0.18,
  fadeOut = 0.82,
  edgeOpacity = 0,
  as = "div",
}: SectionFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, fadeIn, fadeOut, 1],
    [edgeOpacity, 1, 1, edgeOpacity]
  );

  const y = useTransform(
    scrollYProgress,
    [0, fadeIn, fadeOut, 1],
    drift ? [40, 0, 0, -40] : [0, 0, 0, 0]
  );

  const style: MotionStyle = { opacity, y };

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag ref={ref} style={style} className={cn(className)}>
      {children}
    </MotionTag>
  );
}
