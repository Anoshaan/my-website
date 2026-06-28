"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { FigmaWorkspace } from "@/components/sections/figma/FigmaWorkspace";
import { FigmaParticles } from "@/components/sections/problem/FigmaParticles";
import { HeroOrbitIcons } from "@/components/sections/problem/HeroOrbitIcons";

const DESIGN_W = 1100;
const DESIGN_H = 680;

// Environmental star dots — deterministic so SSR and client agree.
const ENV_STARS = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 53 + 7) % 100}%`,
  top: `${(i * 31 + 11) % 100}%`,
  d: `${-((i * 1.7) % 6)}s`,
}));

/**
 * Section 2 — The Problem.
 *
 * One continuous, scroll-driven scene that picks up exactly as the Hero
 * fades away:
 *
 *   1. While the Hero lifts and fades, the workspace screen is already
 *      rising in from the bottom of the viewport (large + close).
 *   2. It pins dead-centre, scales down and settles 100%.
 *   3. It holds briefly, then slides to the right and scales down.
 *   4. The heading reveals on the left, then the body below — and the
 *      moment the composition completes, continued scrolling moves the
 *      story on to the next chapter (no inactive waiting states).
 *
 * A persistent environmental layer (dotted rings, guide lines, stars,
 * streaks) keeps the space alive behind the whole sequence.
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

  // Exit — the whole scene dims as it leaves the top of the viewport,
  // handing focus to the next chapter (site-wide fade system).
  const { scrollYProgress: pExit } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });
  const sceneOpacity = useTransform(pExit, [0.05, 0.55], [1, 0]);

  // Card appears as it rises; never dims (it stays a crisp visual).
  const cardOpacity = useTransform(p, [0.06, 0.16], [0, 1]);
  const rotateX = useTransform(p, [0.18, 0.45, 0.55], [8, -1.5, 0]);

  // Scale: oversized while rising → brief settle centre → shrink as it
  // parks. With a bounce overshoot at 0.63 before settling at 0.67.
  const scaleWide = useTransform(p, [0.45, 0.63, 0.67, 0.7, 0.82], [1.14, 0.94, 0.96, 0.96, 0.62]);
  const scaleNarrow = useTransform(p, [0.45, 0.63, 0.67, 0.7, 0.82], [1.0, 0.78, 0.8, 0.8, 0.45]);

  // Park position: slide right (wide) or up (narrow) — quick, right after
  // it centres.
  const xWide = useTransform(p, [0.7, 0.82], ["0%", "28%"]);
  const yNarrow = useTransform(p, [0.7, 0.82], ["0%", "-45%"]);

  // Copy reveals in a single quick beat as the card parks; everything is
  // resolved by ~0.88 so the remaining scroll flows straight into the
  // next section.
  const textOpacity = useTransform(p, [0.74, 0.88], [0, 1]);
  const textY = useTransform(p, [0.74, 0.88], [26, 0]);

  let figStyle: Record<string, unknown>;
  if (reduced) {
    figStyle = {
      transform: isWide ? "translateX(28%) scale(0.62)" : "translateY(-45%) scale(0.45)",
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
      className="problem-section text-white relative z-10"
      style={{ minHeight: reduced ? "100svh" : (isWide ? "150vh" : "120vh") }}
    >
      <motion.div
        ref={stickyRef}
        className="problem-sticky"
        style={reduced ? undefined : { opacity: sceneOpacity }}
      >
        {/* Environmental motion — persists through the whole sequence. */}
        <div className="problem-env" aria-hidden>
          <span
            className="penv-ring"
            style={{ width: "44vmin", height: "44vmin", left: "6%", top: "10%" }}
          />
          <span
            className="penv-ring"
            style={{
              width: "26vmin",
              height: "26vmin",
              right: "9%",
              bottom: "12%",
              animationDuration: "70s",
              animationDirection: "reverse",
            }}
          />
          <span
            className="penv-ring"
            style={{
              width: "70vmin",
              height: "70vmin",
              right: "-14%",
              top: "-20%",
              animationDuration: "140s",
            }}
          />
          <span className="penv-line" style={{ top: "22%", left: "4%", width: "20%" }} />
          <span className="penv-line" style={{ bottom: "18%", right: "5%", width: "16%" }} />
          {ENV_STARS.map((s, i) => (
            <span
              key={i}
              className="penv-star"
              style={{ left: s.left, top: s.top, ["--d" as string]: s.d }}
            />
          ))}
          <span
            className="penv-streak"
            style={{ top: "16%", right: "14%", ["--d" as string]: "2s" }}
          />
          <span
            className="penv-streak"
            style={{ top: "62%", left: "18%", ["--d" as string]: "7.5s" }}
          />
        </div>

        {/* Particle halo — drifts in from the sides and gathers around the
            rising screen, then follows it as it parks. Behind the card so it
            surrounds the edges rather than covering the UI. */}
        <FigmaParticles progress={p} isWide={isWide} reduced={reduced} />

        {/* Workspace — the rising design canvas. The orbit icons render first
            so they sit BEHIND the card and emerge from behind it; both share
            this layer's scroll transform so they move/scale as one system. */}
        <motion.div className="problem-figma" style={figStyle}>
          <HeroOrbitIcons progress={p} reduced={reduced} />
          <div className="problem-fit" style={{ transform: `scale(${fit})` }}>
            <FigmaWorkspace />
          </div>
        </motion.div>

        {/* Copy — left column on desktop, lower-centre on mobile */}
        <div className="problem-content">
          <motion.div className="problem-content-group" style={textStyle}>
            <p className="problem-eyebrow">The Problem</p>
            <h2 className="text-section problem-title">
              Why Great Products Need More Than Great Interfaces
            </h2>
            <p className="text-body problem-body">
              <span className="hidden md:inline">
                Most products don&rsquo;t fail because of bad technology or poor
                visuals. They fail because they overlook the people they&rsquo;re
                built for. Great design isn&rsquo;t just about making things look
                better. It&rsquo;s about understanding how people think, feel,
                and make decisions.
              </span>
              <span className="inline md:hidden">
                Most products fail because they overlook the people using them. Great design isn&rsquo;t just about looks—it&rsquo;s about understanding how people think and decide.
              </span>
            </p>

            <p className="problem-subhead">What the product really needs</p>
            <p className="problem-keywords">
              End-user mapping&nbsp;&middot; Accessibility depth&nbsp;&middot;
              First-five-second clarity&nbsp;&middot; Psychology-led
              design&nbsp;&middot; Guided attention&nbsp;&middot; Friction
              removal&nbsp;&middot; Task-first UX&nbsp;&middot; Trust-building
              moments&nbsp;&middot; Product-specific flow&nbsp;&middot; Less
              noise, more direction
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
