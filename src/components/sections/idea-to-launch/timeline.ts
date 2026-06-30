"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Shared controller for the "From idea to launch" section.
 *
 * The heavy animation renderer (animation.jsx) is *controlled*: it just draws
 * whatever `time` it's given. This hook owns the single source of truth — the
 * playhead — so the left-side step list, the right-side visual, and the
 * changing description stay in sync. The playhead auto-advances (rAF) while the
 * visual is on screen, can be paused (description hover), and respects
 * reduced-motion. Clicking a step seeks straight to it.
 *
 * The loop runs from CLIENT_IDEA's start (not 0) so the section opens directly
 * on the Client Idea stage — there is no intro clip. Playback runs at RATE
 * (< 1) so each stage stays on screen long enough to read its description.
 */

export type Step = { title: string; sub: string; start: number };

export const DURATION = 44;

/** The nine process stops. `start` is the playhead second each stage begins. */
export const STEPS: Step[] = [
  {
    title: "Client Idea",
    sub: "It starts with listening. From the first call, I get clear on the goal, the users, and what success looks like.",
    start: 4.2,
  },
  {
    title: "Research",
    sub: "I dig into the users, the problem, and the business goals, hunting for the simplest path to a clearer experience.",
    start: 8.7,
  },
  {
    title: "Competitors",
    sub: "I study the space and the players in it, then find the gaps where this work can feel sharper and more distinct.",
    start: 13.2,
  },
  {
    title: "UX Flow",
    sub: "I shape a flow that feels effortless, where every step moves the user toward their goal with less friction.",
    start: 17.7,
  },
  {
    title: "AI Prototype",
    sub: "AI lets me move fast through early prototypes, so the client has something real to react to before detailed design.",
    start: 22.4,
  },
  {
    title: "Front-End Build",
    sub: "I design and build the front end with AI in the loop for speed, while the final product decisions stay human.",
    start: 27.2,
  },
  {
    title: "Dev + QA",
    sub: "I stay close to dev and QA, clarifying interactions and resolving issues until the product feels truly polished.",
    start: 32.2,
  },
  {
    title: "Launch Prep",
    sub: "I carry the work into launch: motion, Lottie, and landing pages that make the product feel ready before it ships.",
    start: 36.9,
  },
  {
    title: "Launched Product",
    sub: "I stay through launch and beyond, using real usage and testing to keep refining what users actually need.",
    start: 41,
  },
];

/** Loop floor — the playhead never drops below the first stage (no intro). */
const LOOP_START = STEPS[0].start;
/** Playback rate (< 1 slows the reel so each stage lasts ~6–7s for reading). */
const RATE = 0.66;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useProcessTimeline() {
  const reduced = usePrefersReducedMotion();
  const [time, setTime] = useState(LOOP_START);

  // Attach to the visual wrapper — drives the in-view gate.
  const animationRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const inViewRef = useRef(true);
  const pausedRef = useRef(false);
  const startRef = useRef<() => void>(() => {});
  const stopRef = useRef<() => void>(() => {});

  const activeStep = useMemo(() => {
    let a = 0;
    for (let i = 0; i < STEPS.length; i++) {
      if (time + 1e-6 >= STEPS[i].start) a = i;
    }
    return a;
  }, [time]);

  const seekToStep = useCallback((i: number) => {
    const s = STEPS[i];
    if (!s) return;
    lastRef.current = null;
    // Land just inside the stage so its scene is already on screen.
    setTime(Math.min(s.start + 0.2, DURATION - 0.01));
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  useEffect(() => {
    // Reduced motion: hold a calm, "launched" frame and never auto-advance.
    if (reduced) {
      setTime(STEPS[STEPS.length - 1].start + 0.6);
      return;
    }

    const el = animationRef.current;

    // Cap React state updates to ~32fps. The reel is a slow ambient piece, so a
    // capped cadence is visually indistinguishable but roughly halves the
    // per-frame reconciliation of the (large) animation tree on 60Hz+ screens —
    // a major CPU saving on phones. dt still accumulates across skipped frames,
    // so motion speed is unchanged.
    const FRAME_MS = 1000 / 32;

    const step = (ts: number) => {
      if (!inViewRef.current) {
        rafRef.current = null;
        return;
      }
      if (lastRef.current == null) lastRef.current = ts;
      const elapsed = ts - lastRef.current;
      if (elapsed < FRAME_MS) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const dt = Math.min(elapsed / 1000, 1 / 30) * RATE;
      lastRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        
        let a = 0;
        for (let i = 0; i < STEPS.length; i++) {
          if (t + 1e-6 >= STEPS[i].start) a = i;
        }

        if (pausedRef.current) {
          const currStart = STEPS[a].start;
          const nextStart = a < STEPS.length - 1 ? STEPS[a + 1].start : DURATION;
          if (next >= nextStart - 0.1) {
            next = currStart + 0.2;
          }
        } else {
          if (next >= DURATION) next = LOOP_START + (next - DURATION);
          if (next < LOOP_START) next = LOOP_START;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    const start = () => {
      if (rafRef.current == null) {
        lastRef.current = null;
        rafRef.current = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    startRef.current = start;
    stopRef.current = stop;

    let io: IntersectionObserver | null = null;
    if (el) {
      io = new IntersectionObserver(
        ([entry]) => {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) start();
          else stop();
        },
        { threshold: 0.05 }
      );
      io.observe(el);
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inViewRef.current) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();
    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return { time, activeStep, seekToStep, reduced, animationRef, pause, resume };
}
