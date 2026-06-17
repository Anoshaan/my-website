"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Route transition wrapper. App-Router `template.tsx` remounts on every
 * navigation, so a fresh entrance plays each time the route changes —
 * the whole page gently fades and lifts into place rather than hard-
 * cutting. Kept short (no exit animation) so it never delays the user,
 * and flattened to a pure fade under reduced motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
