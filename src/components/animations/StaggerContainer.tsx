"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  /** Delay between children in seconds. Default 0.15. */
  stagger?: number;
  /** Delay before first child. */
  delay?: number;
  /** Retained for API compatibility; ignored now that we animate on mount. */
  once?: boolean;
  amount?: number;
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * StaggerContainer — orchestrates child entrance with a stagger, on
 * mount. Previously used `whileInView`/`useInView`, but under Lenis
 * smooth-scroll the IntersectionObserver tracker fails to deliver
 * for some users, leaving grids stuck invisible (only the heading
 * visible). Animate on mount guarantees the content is reachable.
 */
export function StaggerContainer({
  children,
  className,
  stagger = 0.15,
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
