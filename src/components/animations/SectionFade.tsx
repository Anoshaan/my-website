"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionFadeProps = {
  children: ReactNode;
  className?: string;
  /** Wrap as `section` vs `div`. */
  as?: "section" | "div";
};

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/**
 * One-shot section entrance — gentle fade in on mount. Previously used
 * `whileInView`/`useInView`, but under Lenis smooth-scroll +
 * Next 15 + React 19, the IntersectionObserver `whileInView` relies on
 * never fires for some users, leaving entire sections invisible. The
 * fix prioritises content visibility: animate on mount with a small
 * delay so the entrance still feels intentional.
 */
export function SectionFade({
  children,
  className,
  as = "div",
}: SectionFadeProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;
  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
    >
      {children}
    </MotionTag>
  );
}
