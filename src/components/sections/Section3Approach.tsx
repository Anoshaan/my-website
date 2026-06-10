"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ThinkingParticles } from "@/components/sections/approach/ThinkingParticles";

/**
 * Section 3 — How I Think Before I Design.
 *
 * A pinned, scroll-driven chapter. The particle field begins converging
 * from the screen edges while Section 2 is still fading, so it's fully
 * established by the time this section is centred. Four stages —
 * Understand, Observe, Simplify, Deliver — advance entirely by scroll
 * (with a magnetic snap between them); a neon light travels the timeline
 * as the active stage changes; the left narrative carries the reading.
 */

type Stage = { key: string; subject: string; question: string; body: string; neon: string };

const STAGES: Stage[] = [
  {
    key: "understand",
    subject: "Understand",
    question: "Gathering the full picture before deciding.",
    body: "I start with people — their goals, motivations, and context — and the business around them. Scattered signals become one shared understanding to design from.",
    neon: "#b15cff",
  },
  {
    key: "observe",
    subject: "Observe",
    question: "Finding where the experience breaks.",
    body: "I trace the real journey to see where people hesitate, stall, or drop off. Friction isn't noise — it's the map to the opportunity.",
    neon: "#ff5ccd",
  },
  {
    key: "simplify",
    subject: "Simplify",
    question: "Turning complexity into clarity.",
    body: "I strip away the noise and the nice-to-haves until only what matters remains — one clear, confident path forward.",
    neon: "#4dff9e",
  },
  {
    key: "deliver",
    subject: "Deliver",
    question: "Insight becomes a living product.",
    body: "The thinking takes shape as real interfaces, systems, and experiences — built on the foundation everything before it earned.",
    neon: "#f2ff4d",
  },
];

// Active stage by scroll progress (thresholds at the morph midpoints).
function activeFromProgress(p: number) {
  if (p < 0.39) return 0;
  if (p < 0.59) return 1;
  if (p < 0.79) return 2;
  return 3;
}

// Snap anchors — progress centres of each stage's hold.
const SNAP_CENTERS = [0.3, 0.49, 0.69, 0.9];

export function Section3Approach() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const inView = useInView(sectionRef, { margin: "40% 0px 40% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = activeFromProgress(p);
    setActive((prev) => (prev === next ? prev : next));
  });

  // Neon light that travels the timeline as the active stage changes.
  const headMV = useSpring(0, { stiffness: 90, damping: 20, mass: 0.6 });
  useEffect(() => {
    headMV.set(active / (STAGES.length - 1));
  }, [active, headMV]);
  const headTop = useMotionTemplate`${useTransform(headMV, (v) => v * 100)}%`;

  // Magnetic snap between stages (desktop / Lenis only — touch stays free).
  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    let snapping = false;

    const anchors = () => {
      const el = sectionRef.current;
      if (!el) return null;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const H = el.offsetHeight;
      const p0 = top - window.innerHeight; // scrollY at progress 0
      return SNAP_CENTERS.map((c) => p0 + c * H);
    };

    const snap = () => {
      if (snapping) return;
      const lenis = window.__lenis;
      if (!lenis) return; // touch / native momentum — leave free
      const a = anchors();
      if (!a) return;
      const y = window.scrollY;
      if (y < a[0] - 12 || y > a[a.length - 1] + 12) return;
      let nearest = a[0];
      for (const t of a) if (Math.abs(t - y) < Math.abs(nearest - y)) nearest = t;
      if (Math.abs(nearest - y) < 5) return;
      snapping = true;
      lenis.scrollTo(nearest, {
        duration: 0.8,
        easing: (x: number) => 1 - Math.pow(1 - x, 3),
        lock: true,
        onComplete: () => {
          snapping = false;
        },
      });
    };

    const onScroll = () => {
      if (snapping) return;
      clearTimeout(timer);
      timer = setTimeout(snap, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  const stage = STAGES[active];

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="approach-section"
      style={{ minHeight: reduced ? "100svh" : "480vh" }}
    >
      {/* Particle field — fixed to the viewport so it can build up across
          the section boundary. */}
      <ThinkingParticles progress={scrollYProgress} active={inView} reduced={reduced} />

      <div className="approach-sticky">
        <div className="approach-glow" aria-hidden />

        <Container size="wide" className="approach-overlay">
          <Reveal duration={0.9}>
            <header className="approach-header">
              <p className="approach-eyebrow">Every problem deserves a different approach</p>
              <h2 className="text-section approach-title">How I Think Before I Design</h2>
            </header>
          </Reveal>

          <div className="approach-grid">
            {/* Left — narrative for the active stage (primary content) */}
            <div className="approach-narrative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -12, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="approach-subject">{stage.subject}</h3>
                  <p className="approach-question">{stage.question}</p>
                  <p className="approach-body text-body">{stage.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — timeline with a travelling neon light */}
            <ul
              className="approach-menu"
              aria-label="Thinking process stages"
              style={{ ["--neon" as string]: stage.neon }}
            >
              <span className="approach-rail" aria-hidden />
              <motion.span
                className="approach-rail-trail"
                aria-hidden
                style={{ scaleY: headMV }}
              />
              <motion.span
                className="approach-rail-head"
                aria-hidden
                style={{ top: headTop, background: stage.neon, boxShadow: `0 0 18px 4px ${stage.neon}` }}
              />
              {STAGES.map((s, i) => (
                <li
                  key={s.key}
                  className={`approach-item ${i === active ? "is-active" : ""} ${
                    i < active ? "is-past" : ""
                  }`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className="approach-item-label">{s.subject}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
