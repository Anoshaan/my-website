"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * ProductUniverse — replaces the old intro. A personal "galaxy" where
 * expertise nodes orbit a portrait positioned at the section's
 * gravitational center. Three concentric rings, each with their own
 * radius, speed, and direction. Mouse parallax pushes the entire
 * system gently against the cursor. Stars twinkle in the background.
 *
 * Orbit math: every node is positioned by rotating its ring container
 * via CSS `@keyframes`, while the node itself counter-rotates so its
 * label always reads upright. This keeps the animation on the
 * compositor — no JS per-frame work.
 */

type OrbitNode = {
  label: string;
  /** 0–1 fraction around the ring — controls starting angle. */
  offset: number;
};

type Ring = {
  /** Orbit radius as a fraction of the universe size (1 = full radius). */
  radius: number;
  /** Seconds per full revolution. Larger = slower. */
  duration: number;
  /** Reverse direction. */
  reverse?: boolean;
  nodes: OrbitNode[];
};

const RINGS: Ring[] = [
  {
    radius: 0.24,
    duration: 70,
    nodes: [
      { label: "Product Experience Design", offset: 0.08 },
      { label: "Interaction Design", offset: 0.42 },
      { label: "Motion Design", offset: 0.75 },
    ],
  },
  {
    radius: 0.37,
    duration: 110,
    reverse: true,
    nodes: [
      { label: "UX Strategy", offset: 0.02 },
      { label: "Design Systems", offset: 0.28 },
      { label: "Prototyping", offset: 0.55 },
      { label: "User Research", offset: 0.8 },
    ],
  },
  {
    radius: 0.48,
    duration: 160,
    nodes: [
      { label: "Frontend Thinking", offset: 0.18 },
      { label: "AI Experiences", offset: 0.5 },
      { label: "Motion Behavior", offset: 0.82 },
    ],
  },
];

/** Renders the portrait img only after it loads — keeps the broken
 * image icon out of the layout if /about/portrait.png isn't present. */
function Portrait() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/about/portrait.png"
      alt=""
      aria-hidden
      className="pu-portrait"
      loading="lazy"
      decoding="async"
      style={{ opacity: loaded ? 1 : 0 }}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}

export function ProductUniverse() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax — translate the whole universe a few px against
  // the cursor. Spring-damped so it never feels twitchy.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      // Max ±18px translation.
      px.set(dx * 18);
      py.set(dy * 18);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [px, py, reduced]);

  // Track section visibility so orbit animations only run while in
  // view — keeps the rest of the page snappy.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pu-section relative overflow-hidden"
    >
      {/* Soft atmospheric glow behind the portrait. */}
      <div aria-hidden className="pu-glow" />

      <Container className="relative z-10">
        <Reveal duration={0.9}>
          <h2 className="text-section text-white text-center max-w-[20ch] mx-auto">
            Navigating the Product Universe
          </h2>
        </Reveal>
        <Reveal delay={0.15} duration={0.9}>
          <p className="text-body text-white/65 text-center max-w-[62ch] mx-auto mt-5">
            Every great product is a system of connected experiences. From
            research and strategy to interface design and implementation, each
            discipline plays a role in creating products people love to use.
          </p>
        </Reveal>
      </Container>

      {/* Universe wrapper anchors the orbit stage to the section's
          bottom edge so the portrait reads as the gravitational floor.
          The inner motion.div carries the mouse-parallax translation —
          kept on its own element so it doesn't clobber the wrapper's
          positioning transform. */}
      <div className="pu-universe-wrap">
      <motion.div
        className="pu-universe"
        style={{ x: tx, y: ty }}
        data-in-view={inView ? "true" : "false"}
        data-reduced={reduced ? "true" : "false"}
      >
        {/* Faint orbital paths (visual rings only). */}
        <div aria-hidden className="pu-orbit-paths">
          {RINGS.map((ring, i) => (
            <div
              key={i}
              className="pu-orbit-path"
              style={{
                width: `calc(var(--pu-size) * ${ring.radius * 2})`,
                height: `calc(var(--pu-size) * ${ring.radius * 2})`,
              }}
            />
          ))}
        </div>

        {/* Each node gets its own orbiter — phase-shifted via animation-delay
            so a single set of @keyframes drives the whole ring without
            losing label uprightness. */}
        {RINGS.flatMap((ring, i) =>
          ring.nodes.map((node, j) => {
            const delay = `-${(node.offset * ring.duration).toFixed(3)}s`;
            const dur = `${ring.duration}s`;
            const radius = `calc(var(--pu-size) * ${ring.radius})`;
            return (
              <div
                key={`${i}-${j}`}
                className="pu-orbiter"
                style={{
                  animationDuration: dur,
                  animationDelay: delay,
                  animationDirection: ring.reverse ? "reverse" : "normal",
                }}
              >
                <div
                  className="pu-orbiter-radius"
                  style={{ transform: `translateX(${radius})` }}
                >
                  <div
                    className="pu-orbiter-counter"
                    style={{
                      animationDuration: dur,
                      animationDelay: delay,
                      animationDirection: ring.reverse ? "normal" : "reverse",
                    }}
                  >
                    <span className="pu-node">{node.label}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Portrait — the gravitational core. The glow behind stands in
            until the real PNG is dropped at /about/portrait.png. */}
        <div className="pu-portrait-wrap">
          <Portrait />
        </div>
      </motion.div>
      </div>
    </section>
  );
}
