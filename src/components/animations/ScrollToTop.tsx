"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets scroll to the top on every route change.
 *
 * Disables the browser's native scroll restoration so Back/Forward also
 * land at the top, then jumps both window and documentElement instantly
 * to avoid the "flicker → smooth scroll up" effect Lenis would otherwise
 * produce. The reset runs in a layout-effect-style microtask so the new
 * page paints from the top, not from whatever the previous route was at.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const jump = () => {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true, lock: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Two passes: once now (before paint of new route) and once after a
    // frame, so any deferred layout/Lenis tick lands at top: 0 too.
    jump();
    const raf = requestAnimationFrame(jump);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
