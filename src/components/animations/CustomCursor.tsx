"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — dot + ring with mix-blend-mode: difference.
 *
 * - `.is-hover` is added when entering generic interactive elements (a, button, etc.)
 *   and expands the ring slightly.
 * - `.is-precise` is added for navigation links and elements marked with
 *   `data-cursor-precise`. The ring fades out completely, leaving only the
 *   center dot — a minimal, precise cursor for clickable nav tabs.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (("ontouchstart" in window) ||
        window.matchMedia("(hover: none)").matches);

    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!cursor || !dot || !ring) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let rx = cx;
    let ry = cy;
    let raf = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // The DOT is updated directly in the pointermove handler — it
    // tracks the cursor 1:1 with zero lag, regardless of what else
    // the browser is doing on the rAF tick (grid canvas, motion
    // animations, etc.). Only the RING uses the eased rAF loop, so
    // the visual "weight" of the cursor is preserved while the
    // primary signal is always instant.
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      // Snap the dot directly — no rAF, no lerp.
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      wake();
    };
    const onDown = () => {
      cursor.classList.add("is-down");
      wake();
    };
    const onUp = () => {
      cursor.classList.remove("is-down");
      wake();
    };

    const tick = () => {
      // Faster ring catch-up (0.18 → 0.35) so it never visibly trails.
      rx = lerp(rx, cx, 0.35);
      ry = lerp(ry, cy, 0.35);
      const scale = cursor.classList.contains("is-down") ? 0.7 : 1;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      if (Math.abs(rx - cx) < 0.3 && Math.abs(ry - cy) < 0.3) {
        // Snap the last fractional pixel and stop the loop.
        rx = cx;
        ry = cy;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    // Place the dot at its initial position so first-paint isn't (0,0).
    dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const onEnter = () => cursor.classList.add("is-hover");
    const onLeave = () => cursor.classList.remove("is-hover");
    const onPreciseEnter = () => cursor.classList.add("is-precise");
    const onPreciseLeave = () => cursor.classList.remove("is-precise");

    const interactiveSelectors =
      "a, button, [data-magnetic], [data-magnetic-soft], [data-tilt], [data-cursor-hover]";
    const preciseSelectors = "header nav a, [data-cursor-precise]";

    // Track attached elements so the MutationObserver doesn't stack listeners
    // on the same node when subtrees update.
    const attached = new WeakSet<Element>();
    const preciseAttached = new WeakSet<Element>();

    const attach = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        if (attached.has(el)) return;
        attached.add(el);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
      });
      document.querySelectorAll(preciseSelectors).forEach((el) => {
        if (preciseAttached.has(el)) return;
        preciseAttached.add(el);
        el.addEventListener("pointerenter", onPreciseEnter);
        el.addEventListener("pointerleave", onPreciseLeave);
      });
    };

    attach();
    const observer = new MutationObserver(() => attach());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
      document.querySelectorAll(preciseSelectors).forEach((el) => {
        el.removeEventListener("pointerenter", onPreciseEnter);
        el.removeEventListener("pointerleave", onPreciseLeave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor" aria-hidden>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
