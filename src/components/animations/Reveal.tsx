"use client";

import { motion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** "up" | "fade" — preset motion shape. */
  variant?: "up" | "fade";
  className?: string;
  style?: CSSProperties;
  /** Retained for API compatibility; ignored now that we animate on mount. */
  once?: boolean;
  duration?: number;
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

/**
 * Reveal — fade-in (with optional translateY) on mount. Previously used
 * `whileInView`/`useInView` so the entrance fired when the element
 * scrolled into view, but under Lenis smooth-scroll the
 * IntersectionObserver tracker can fail to deliver, leaving entire
 * sections stuck invisible. Animate on mount guarantees the content
 * is always reachable.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
  style,
  duration = 0.8,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      animate="visible"
      variants={variants[variant]}
      transition={{ duration, delay, ease: easeOutExpo }}
    >
      {children}
    </MotionTag>
  );
}
