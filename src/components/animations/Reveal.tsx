"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** "up" | "fade" — preset motion shape. */
  variant?: "up" | "fade";
  className?: string;
  /**
   * Animate once only, or every time element enters viewport.
   * Default: false — keeps animating on re-entry as the user scrolls up/down.
   */
  once?: boolean;
  /** Custom duration in seconds. */
  duration?: number;
  /** How much of the element must be visible to trigger. 0-1. */
  amount?: number;
  as?: "div" | "section" | "article" | "header" | "span";
};

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
  once = false,
  duration = 0.8,
  amount = 0.15,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -5% 0px" }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: easeOutExpo }}
    >
      {children}
    </MotionTag>
  );
}
