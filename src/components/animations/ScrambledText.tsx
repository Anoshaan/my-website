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
  // restores it, plus the original glyph so settle is exact.
  const charRefs = useRef<
    Array<{ el: HTMLSpanElement; original: string; until: number }>
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
    }));

    let lastFrame = 0;
    const tick = (now: number) => {
      // ~24fps swap cadence for the glyphs — cheaper than every frame
      // and reads as a controlled flicker rather than noise.
      if (now - lastFrame >= speed) {
        lastFrame = now;
        for (const c of charRefs.current) {
          if (c.until > now) {
            const i = Math.floor(Math.random() * scrambleChars.length);
            c.el.textContent = scrambleChars[i] ?? c.original;
          } else if (c.el.textContent !== c.original) {
            c.el.textContent = c.original;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const handleMove = (e: PointerEvent) => {
      const now = performance.now();
      for (const c of charRefs.current) {
        const rect = c.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        if (dist < radius) {
          // Closer characters scramble for longer — gives the field
          // a feeling of "depth" rather than a uniform flip.
          const factor = 1 - dist / radius;
          const end = now + duration * factor;
          if (end > c.until) c.until = end;
        }
      }
    };

    const handleLeave = () => {
      // No abrupt reset — characters settle on their own as `until`
      // values fall behind `now`. That's what makes it feel smooth.
    };

    root.addEventListener("pointermove", handleMove);
    root.addEventListener("pointerleave", handleLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
