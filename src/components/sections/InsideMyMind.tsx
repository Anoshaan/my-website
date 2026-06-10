"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Inside My Mind — a 3D spatial card stack.
 *
 * Replaces the prior "galaxy constellation" with a more interactive,
 * spatial-UI feel: seven thinking steps rendered as floating cards in
 * a perspective stack. The active card sits forward (z=0); the others
 * recede along the z axis behind it. Mouse-tilt parallax on the stack.
 * Six principle chips orbit around the active card, repositioning
 * when the step changes.
 */

type Step = {
  number: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "User Problem",
    body: "Start with the human friction — not a feature wishlist, not a competitor sheet, but the actual moment something feels harder than it should.",
  },
  {
    number: "02",
    title: "Observation",
    body: "Watch how people behave in the real environment. The gap between what they say and what they do is where the truth lives.",
  },
  {
    number: "03",
    title: "Insight",
    body: "Distil pages of notes into a single sentence that reframes the problem and makes the solution feel inevitable.",
  },
  {
    number: "04",
    title: "Hypothesis",
    body: "If we change X, then Y should happen for these people. A claim sharp enough to be wrong, specific enough to be tested.",
  },
  {
    number: "05",
    title: "Prototype",
    body: "Build the cheapest, smallest, sharpest version of the idea — enough fidelity to provoke a real reaction.",
  },
  {
    number: "06",
    title: "Validation",
    body: "Put the prototype in front of real people. Listen for the silences. Watch for the workarounds.",
  },
  {
    number: "07",
    title: "Solution",
    body: "Ship the smallest thing that demonstrably moves the metric — and design the loop that makes the next iteration easier.",
  },
];

type Principle = { label: string; body: string };
const PRINCIPLES: Principle[] = [
  { label: "Clarity", body: "Remove confusion before adding features." },
  { label: "Simplicity", body: "Complex problems deserve simple experiences." },
  { label: "Purpose", body: "Every decision should have a reason." },
  { label: "Empathy", body: "Understand people before designing for them." },
  { label: "Systems", body: "Think beyond screens and individual moments." },
  { label: "Motion", body: "Use movement to guide, not distract." },
];

export function InsideMyMind() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  // Mouse-driven tilt — converts pointer position relative to the stage
  // into a spring-smoothed rotateX / rotateY pair for the whole stack.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 90, damping: 16, mass: 0.4 });
  const springY = useSpring(tiltY, { stiffness: 90, damping: 16, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [reduced ? 0 : 6, reduced ? 0 : -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [reduced ? 0 : -8, reduced ? 0 : 8]);

  const stageRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltX.set(px);
    tiltY.set(py);
  };
  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Auto-advance the active step every ~4.5s so the section feels alive
  // even without mouse interaction. Pauses when the page is hidden.
  useEffect(() => {
    if (reduced) return;
    let id: number | undefined;
    const start = () => {
      id = window.setInterval(
        () => setActive((i) => (i + 1) % STEPS.length),
        4500
      );
    };
    const stop = () => {
      if (id) window.clearInterval(id);
    };
    if (!document.hidden) start();
    const onVis = () => {
      stop();
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <section className="mind-section section-pad relative">
      <Container size="wide">
        <Reveal>
          <div className="mind-head">
            <h2 className="text-section text-white heading-sheen max-w-[20ch]">
              Inside My Mind
            </h2>
            <p className="text-body text-white/65 max-w-[60ch] mt-6">
              Every design decision starts with a question. Before thinking
              about interfaces or features, I focus on understanding the
              problem, uncovering insights, and finding the simplest path
              forward. Design is not just about creating solutions — it&apos;s
              about asking better questions.
            </p>
          </div>
        </Reveal>

        <div className="mind-layout">
          {/* LEFT — 3D stage with floating cards + mouse tilt */}
          <motion.div
            ref={stageRef}
            className="mind-stage"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{ perspective: 1400 }}
          >
            <motion.div
              className="mind-stack"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {STEPS.map((s, i) => {
                const delta = i - active;
                // Cards in front of the active one slide up + fade; cards
                // behind recede into z space. The active card sits forward.
                const z = -Math.abs(delta) * 80;
                const y = delta * 18;
                const opacity =
                  Math.abs(delta) > 3 ? 0 : 1 - Math.abs(delta) * 0.18;
                const scale = 1 - Math.abs(delta) * 0.045;
                return (
                  <motion.button
                    key={s.title}
                    type="button"
                    aria-label={`${s.title} — step ${s.number}`}
                    onClick={() => setActive(i)}
                    className={`mind-card ${i === active ? "is-active" : ""}`}
                    animate={{
                      translateZ: z,
                      y,
                      opacity,
                      scale,
                    }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="mind-card-num">{s.number}</div>
                    <div className="mind-card-title">{s.title}</div>
                    <div className="mind-card-body">{s.body}</div>
                    <div className="mind-card-glow" aria-hidden />
                  </motion.button>
                );
              })}

              {/* Orbiting principle chips — float around the stack. */}
              <div className="mind-orbits" aria-hidden>
                {PRINCIPLES.map((p, i) => {
                  const angle = (i / PRINCIPLES.length) * Math.PI * 2;
                  const radius = 280;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius * 0.55;
                  return (
                    <motion.span
                      key={p.label}
                      className="mind-principle-chip"
                      style={{
                        translateX: x,
                        translateY: y,
                        translateZ: 60,
                      }}
                      animate={{
                        translateY: [y - 6, y + 6, y - 6],
                      }}
                      transition={{
                        duration: 6 + i * 0.4,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    >
                      <span className="mind-principle-label">{p.label}</span>
                      <span className="mind-principle-body">{p.body}</span>
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>

            {/* Soft floor glow under the stack */}
            <div className="mind-floor" aria-hidden />
          </motion.div>

          {/* RIGHT — vertical step picker */}
          <div className="mind-picker">
            <ol className="mind-picker-list">
              {STEPS.map((s, i) => (
                <li key={s.title} className="mind-picker-item">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`mind-picker-btn ${
                      i === active ? "is-active" : ""
                    }`}
                  >
                    <span className="mind-picker-num">{s.number}</span>
                    <span className="mind-picker-title">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                className="mind-picker-body"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {STEPS[active].body}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
