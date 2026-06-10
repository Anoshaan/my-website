"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { FigmaWorkspace } from "@/components/sections/figma/FigmaWorkspace";

const DESIGN_W = 1100;
const DESIGN_H = 680;

/**
 * Section 2 — The Problem.
 *
 * One continuous, scroll-driven scene that picks up exactly as the Hero
 * fades away:
 *
 *   1. While the Hero lifts and fades, the workspace screen is already
 *      rising in from the bottom of the viewport (large + close).
 *   2. It pins dead-centre, scales down and settles 100%.
 *   3. It holds, then slides to the right and scales down further.
 *   4. The heading reveals on the left, then the body + principles below.
 *
 * The `["start end", "end end"]` offset is what creates the overlap: the
 * scene's progress starts climbing the instant the page does, so the
 * card's entrance is choreographed against the Hero's exit rather than
 * waiting for it to finish.
 */
export function Section2Problem() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.6);
  const [isWide, setIsWide] = useState(true);

  // Fit the fixed-size (1100×680) card into the pinned viewport.
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const compute = () => {
      const s = Math.min(
        (el.clientWidth * 0.92) / DESIGN_W,
        (el.clientHeight * 0.84) / DESIGN_H
      );
      setFit(Math.min(s, 1.05));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Layout mode — split (card right / text left) vs stacked (card top).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Card appears as it rises; never dims (it stays a crisp visual).
  const cardOpacity = useTransform(p, [0.06, 0.16], [0, 1]);
  const rotateX = useTransform(p, [0.18, 0.5], [8, 0]);

  // Scale: oversized while rising → brief settle centre → shrink as it
  // parks. Pin lands ~0.53, so it settles right as it reaches centre.
  const scaleWide = useTransform(p, [0.4, 0.53, 0.58, 0.7], [1.12, 0.95, 0.95, 0.56]);
  const scaleNarrow = useTransform(p, [0.4, 0.53, 0.58, 0.7], [1.05, 0.85, 0.85, 0.5]);

  // Park position: slide right (wide) or up (narrow) — quick, right after
  // it centres.
  const xWide = useTransform(p, [0.58, 0.7], ["0%", "26%"]);
  const yNarrow = useTransform(p, [0.58, 0.7], ["0%", "-33%"]);

  // Copy reveals in a single quick beat as the card parks.
  const textOpacity = useTransform(p, [0.6, 0.72], [0, 1]);
  const textY = useTransform(p, [0.6, 0.72], [26, 0]);

  let figStyle: Record<string, unknown>;
  if (reduced) {
    figStyle = {
      transform: isWide ? "translateX(26%) scale(0.56)" : "translateY(-33%) scale(0.5)",
      opacity: 1,
    };
  } else if (isWide) {
    figStyle = { x: xWide, scale: scaleWide, rotateX, opacity: cardOpacity };
  } else {
    figStyle = { y: yNarrow, scale: scaleNarrow, rotateX, opacity: cardOpacity };
  }

  const textStyle = reduced ? { opacity: 1 } : { opacity: textOpacity, y: textY };

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="problem-section"
      style={{ minHeight: reduced ? "100svh" : "190vh" }}
    >
      <div ref={stickyRef} className="problem-sticky">
        {/* Workspace — the rising design canvas */}
        <motion.div className="problem-figma" style={figStyle}>
          <div className="problem-fit" style={{ transform: `scale(${fit})` }}>
            <FigmaWorkspace />
          </div>
        </motion.div>

        {/* Copy — left column on desktop, lower-centre on mobile */}
        <div className="problem-content">
          <motion.div className="problem-content-group" style={textStyle}>
            <p className="problem-eyebrow">But every story starts with a problem</p>
            <h2 className="problem-title">
              Why Great Products Need More Than Great Interfaces
            </h2>
            <p className="text-body problem-body">
              Most products don&rsquo;t fail because of bad technology or poor
              visuals. They fail because they overlook the people they&rsquo;re
              built for. Great design isn&rsquo;t just about making things look
              better&mdash;it&rsquo;s about understanding how people think, feel,
              and make decisions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
