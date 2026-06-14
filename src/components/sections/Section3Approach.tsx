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
    body: "I start with the people and the business around them: their goals, motivations, and context. Scattered signals become one shared understanding to design from.",
    neon: "rgba(207, 217, 255, 1)",
  },
  {
    key: "observe",
    subject: "Observe",
    question: "Finding where the experience breaks.",
    body: "I trace the real journey to see where people hesitate, stall, or drop off. Friction isn't noise. It's the map to the opportunity.",
    neon: "rgba(207, 217, 255, 0.7)",
  },
  {
    key: "simplify",
    subject: "Simplify",
    question: "Turning complexity into clarity.",
    body: "I strip away the noise and the nice-to-haves until only what matters remains: one clear, confident path forward.",
    neon: "rgba(207, 217, 255, 0.4)",
  },
  {
    key: "deliver",
    subject: "Deliver",
    question: "Insight becomes a living product.",
    body: "The thinking takes shape as real interfaces, systems, and experiences, built on the foundation everything before it earned.",
    neon: "rgba(207, 217, 255, 0.5)",
  },
];

// Active stage by scroll progress (thresholds at the morph midpoints).
// The stage flips the moment the morph begins, so each stage's narrative
// and colours respond immediately to the snap — no waiting on scroll.
function activeFromProgress(p: number) {
  if (p < 0.5) return 0;
  if (p < 0.64) return 1;
  if (p < 0.78) return 2;
  return 3;
}

// Snap anchors — progress centres of each stage's hold.
const SNAP_CENTERS = [0.42, 0.57, 0.71, 0.88];

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

  // Discrete stepper — one scroll gesture advances exactly one stage and
  // snaps to it; no free-scrolling in between. The four stages step crisply
  // (Understand → Observe → Simplify → Deliver) and the page only scrolls
  // past once you step beyond the last stage (or back above the first).
  //
  // Lenis is NEVER stopped (stopping it makes scrollTo unreliable under
  // rapid wheels — it can lock up). Instead, while a stage gesture is being
  // handled the wheel event is swallowed with stopImmediatePropagation so
  // Lenis never sees it, and the snap is driven by lenis.scrollTo while
  // Lenis keeps running. When the gesture should leave the section, the
  // event is left untouched so Lenis scrolls the page normally.
  // Desktop / Lenis only — touch keeps native momentum scrubbing.
  useEffect(() => {
    if (reduced) return;

    const STEP = 0.6; // snap animation seconds
    const SETTLE = 40; // px tolerance for "settled on a stage"
    let animating = false;

    const metrics = () => {
      const el = sectionRef.current;
      if (!el) return null;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const H = el.offsetHeight;
      const p0 = top - window.innerHeight; // scrollY at progress 0
      return { a: SNAP_CENTERS.map((c) => p0 + c * H), end: top + H };
    };

    const nearestIndex = (a: number[], y: number) => {
      let idx = 0;
      for (let i = 1; i < a.length; i++)
        if (Math.abs(a[i] - y) < Math.abs(a[idx] - y)) idx = i;
      return idx;
    };

    // The stage to snap to, or null = release (let the page scroll on). The
    // upper bound is the section END so scrolling UP from the next section
    // re-engages and snaps back to the last stage; the lower bound sits just
    // before the first stage so scrolling DOWN settles onto it.
    const resolve = (
      m: { a: number[]; end: number },
      y: number,
      dir: number
    ): number | null => {
      const { a, end } = m;
      const last = a.length - 1;
      const vh = window.innerHeight;
      if (y < a[0] - vh * 0.5 || y > end) return null; // outside → release
      const idx = nearestIndex(a, y);
      const settled = Math.abs(a[idx] - y) < SETTLE;
      if (settled) {
        const t = idx + dir;
        return t < 0 || t > last ? null : t; // past an end → release
      }
      if (dir > 0) {
        const t = a.findIndex((ay) => ay > y + 1); // next stage below
        return t === -1 ? null : t;
      }
      let t = -1;
      for (let i = 0; i <= last; i++) if (a[i] < y - 1) t = i; // last stage above
      return t === -1 ? null : t;
    };

    const goTo = (a: number[], target: number) => {
      const lenis = window.__lenis;
      animating = true;
      const done = () => {
        animating = false;
      };
      if (lenis) {
        lenis.scrollTo(a[target], {
          duration: STEP,
          lock: true,
          easing: (x: number) => 1 - Math.pow(1 - x, 3),
          onComplete: done,
        });
      } else {
        window.scrollTo({ top: a[target], behavior: "smooth" });
        setTimeout(done, STEP * 1000 + 80);
      }
    };

    const drive = (dir: number, e: Event) => {
      const m = metrics();
      if (!m) return;
      const target = resolve(m, window.scrollY, dir);
      if (target === null) return; // release — leave the event for Lenis
      // Intercept: swallow the event so Lenis can't also scroll, and block
      // the browser's native scroll, then drive the snap ourselves.
      e.preventDefault();
      e.stopImmediatePropagation();
      if (animating) return; // one snap per gesture
      goTo(m.a, target);
    };

    const onWheel = (e: WheelEvent) => {
      if (!window.__lenis) return; // touch / no smooth-scroll — leave free
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (dir) drive(dir, e);
    };

    const onKey = (e: KeyboardEvent) => {
      let dir = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
      if (dir) drive(dir, e);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKey, { capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
      window.removeEventListener("keydown", onKey, { capture: true } as EventListenerOptions);
    };
  }, [reduced]);

  const stage = STAGES[active];

  // Exit — the chapter dims as it hands focus to the next section.
  const { scrollYProgress: pExit } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });
  const exitOpacity = useTransform(pExit, [0.05, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="approach-section"
      style={{ minHeight: reduced ? "100svh" : "400vh" }}
    >
      {/* Particle field — fixed to the viewport so it can build up across
          the section boundary. Shares the section exit opacity so it fades
          out together with the copy, not before it. */}
      <ThinkingParticles
        progress={scrollYProgress}
        active={inView}
        reduced={reduced}
        fade={reduced ? undefined : exitOpacity}
      />

      <motion.div
        className="approach-sticky"
        style={reduced ? undefined : { opacity: exitOpacity }}
      >
        <div className="approach-glow" aria-hidden />

        <Container size="wide" className="approach-overlay">
          <Reveal duration={0.9}>
            <header className="approach-header">
              <p className="approach-eyebrow">Process</p>
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
      </motion.div>
    </section>
  );
}
