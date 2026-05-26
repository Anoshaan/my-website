"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ScrambledTextProps = {
  /** Pointer radius in px — characters inside this circle get scrambled. */
  radius?: number;
  /** Total scramble-and-settle time per character (ms). */
  duration?: number;
  /** Cadence of the random-glyph swap (ms between frames). */
  speed?: number;
  /** Characters used to scramble. */
  scrambleChars?: string;
  className?: string;
  children: string;
  /** Render tag — defaults to `span` so it can drop into existing capsules. */
  as?: "span" | "div";
};

/**
 * ScrambledText — premium, lightweight scramble-on-hover.
 *
 * Inspired by the GSAP ScrambleTextPlugin / SplitText demo but written
 * from scratch with `requestAnimationFrame` so we don't pull in a paid
 * Club GSAP plugin. The interaction matches the spec:
 *  - pointer enters a radius around a character
 *  - that character flips through scramble glyphs, then settles back
 *  - duration & cadence are configurable per character
 *
 * Honors `prefers-reduced-motion`: the text stays static if the user
 * has asked the OS to dial down motion.
 */
export function ScrambledText({
  radius = 90,
  duration = 900,
  speed = 38,
  scrambleChars = ".:/-*+",
  className,
  children,
  as: Tag = "span",
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLElement>(null);
  // One bookkeeping entry per character span — tracks the timer that
  // restores it, plus the original glyph and a cached centre point
  // so pointermove doesn't have to call getBoundingClientRect for
  // every character on every event (each call forces layout — for
  // ~20 instances × ~20 chars that's a major desktop scroll-jank
  // source on its own).
  const charRefs = useRef<
    Array<{
      el: HTMLSpanElement;
      original: string;
      until: number;
      cx: number;
      cy: number;
    }>
  >([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    // Wire up the entries from the spans that ScrambledText splits the
    // text into. This effect re-binds whenever the text content changes.
    const spans = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-scramble-char]")
    );
    charRefs.current = spans.map((el) => ({
      el,
      original: el.dataset.original ?? el.textContent ?? "",
      until: 0,
      cx: 0,
      cy: 0,
    }));

    // Cache char rects + the root's bounding rect once. Re-cache on
    // resize / scroll (passive) and invalidate when the root itself
    // moves (motion entrances). Each cache pass is one layout flush
    // shared across all chars, vs. one per char per move event.
    let rootRect: DOMRect | null = null;
    const cacheRects = () => {
      rootRect = root.getBoundingClientRect();
      for (const c of charRefs.current) {
        const r = c.el.getBoundingClientRect();
        c.cx = r.left + r.width / 2;
        c.cy = r.top + r.height / 2;
      }
    };
    cacheRects();
    let cacheRaf = 0;
    const scheduleCache = () => {
      if (cacheRaf) return;
      cacheRaf = requestAnimationFrame(() => {
        cacheRaf = 0;
        cacheRects();
      });
    };
    window.addEventListener("scroll", scheduleCache, { passive: true });
    window.addEventListener("resize", scheduleCache);

    let lastFrame = 0;
    // Idle by default — the rAF loop only runs while at least one
    // character is mid-scramble. With ~20 instances on the page, a
    // permanent rAF per instance was a measurable desktop CPU drain.
    const tick = (now: number) => {
      if (now - lastFrame >= speed) {
        lastFrame = now;
        let anyActive = false;
        for (const c of charRefs.current) {
          if (c.until > now) {
            anyActive = true;
            const i = Math.floor(Math.random() * scrambleChars.length);
            c.el.textContent = scrambleChars[i] ?? c.original;
          } else if (c.el.textContent !== c.original) {
            c.el.textContent = c.original;
          }
        }
        if (!anyActive) {
          rafRef.current = null;
          return; // settle — wait for next pointermove to wake us
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const handleMove = (e: PointerEvent) => {
      // Cheap pre-check: bail entirely if the pointer is outside the
      // root's bounding box + radius. This is the common case on a
      // big page with many instances and skips all per-char math.
      if (!rootRect) return;
      if (
        e.clientX < rootRect.left - radius ||
        e.clientX > rootRect.right + radius ||
        e.clientY < rootRect.top - radius ||
        e.clientY > rootRect.bottom + radius
      ) {
        return;
      }
      const r2 = radius * radius;
      const now = performance.now();
      let touched = false;
      const chars = charRefs.current;
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        const dx = e.clientX - c.cx;
        const dy = e.clientY - c.cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          // Skip the sqrt — convert to a linear factor at the end.
          const factor = 1 - Math.sqrt(d2) / radius;
          const end = now + duration * factor;
          if (end > c.until) {
            c.until = end;
            touched = true;
          }
        }
      }
      if (touched) wake();
    };

    const handleLeave = () => {
      // No abrupt reset — characters settle on their own as `until`
      // values fall behind `now`. That's what makes it feel smooth.
    };

    root.addEventListener("pointermove", handleMove);
    root.addEventListener("pointerleave", handleLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (cacheRaf) cancelAnimationFrame(cacheRaf);
      window.removeEventListener("scroll", scheduleCache);
      window.removeEventListener("resize", scheduleCache);
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeave);
      // Restore original glyphs on unmount so React's reconciliation
      // doesn't pick up scramble characters as the canonical text.
      for (const c of charRefs.current) {
        c.el.textContent = c.original;
      }
    };
  }, [radius, duration, speed, scrambleChars, children]);

  // Split the input string into per-character spans. Whitespace is
  // preserved as plain text nodes so word-breaking still works on
  // narrow capsules.
  const parts: React.ReactNode[] = [];
  for (let i = 0; i < children.length; i++) {
    const ch = children[i];
    if (ch === " ") {
      parts.push(" ");
    } else {
      parts.push(
        <span
          key={i}
          data-scramble-char
          data-original={ch}
          style={{ display: "inline-block" }}
        >
          {ch}
        </span>
      );
    }
  }

  return (
    <Tag
      ref={rootRef as React.RefObject<HTMLSpanElement & HTMLDivElement>}
      className={cn("scrambled-text", className)}
      aria-label={children}
    >
      {parts}
    </Tag>
  );
}
