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
    let dx = cx;
    let dy = cy;
    let rx = cx;
    let ry = cy;
    let raf = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: PointerEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };
    const onDown = () => cursor.classList.add("is-down");
    const onUp = () => cursor.classList.remove("is-down");

    const tick = () => {
      dx = lerp(dx, cx, 0.45);
      dy = lerp(dy, cy, 0.45);
      rx = lerp(rx, cx, 0.18);
      ry = lerp(ry, cy, 0.18);
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      const scale = cursor.classList.contains("is-down") ? 0.7 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);

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
