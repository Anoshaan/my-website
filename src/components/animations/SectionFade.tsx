"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionFadeProps = {
  children: ReactNode;
  className?: string;
  /** Wrap as `section` vs `div`. */
  as?: "section" | "div";
};

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * One-shot section entrance.
 * The section gently fades in the first time it scrolls into view, then
 * stays put — it never fades back out, so content can't vanish while it
 * is still on screen. The inner sections own their own drift / stagger.
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      variants={variants}
      transition={{ duration: 0.8, ease: easeOutExpo }}
    >
      {children}
    </MotionTag>
  );
}
