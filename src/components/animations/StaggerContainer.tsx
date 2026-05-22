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
  /**
   * Animate once or every time the container enters viewport.
   * Default: true — the grid settles after its entrance and never
   * re-animates, so scrolling back up can't make cards glitch or jump.
   */
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

export function StaggerContainer({
  children,
  className,
  stagger = 0.15,
  delay = 0,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -5% 0px" }}
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
