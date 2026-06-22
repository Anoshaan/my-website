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
    sub: "From the first call, I listen closely to understand the client's full idea, goals, and expectations. This gives me a clear foundation before I start shaping the product.",
    start: 4.2,
  },
  {
    title: "Research",
    sub: "I do a deep dive into the idea, the users, accessibility needs, and the business goals. The aim is to understand how the experience can become simpler, clearer, and more useful.",
    start: 8.7,
  },
  {
    title: "Competitors",
    sub: "I study the client's domain, similar products, and existing solutions in the market. Then I look for gaps and opportunities to create something more unique for this client.",
    start: 13.2,
  },
  {
    title: "UX Flow",
    sub: "Based on the research, I create a UX flow that is accessible, unique, and easy for the end user. Every step should help users reach their goal with less friction.",
    start: 17.7,
  },
  {
    title: "AI Prototype",
    sub: "AI helps us move faster through early wireframes and low-fidelity prototypes. This gives the client something clear to review early, before we invest time in high-detail design.",
    start: 22.4,
  },
  {
    title: "Front-End Build",
    sub: "Once the direction is approved, I move into full design and front-end build with support from tools like Lovable, Claude Code, v0, Antigravity, Google AI Studio, Figma, and MCP servers. AI speeds up the process, but the final design and product decisions stay human-controlled.",
    start: 27.2,
  },
  {
    title: "Dev + QA",
    sub: "After the front-end build, I stay involved with developers and QA to answer questions, clarify interactions, and solve functional issues. I work with the team until the product feels polished and production-ready.",
    start: 32.2,
  },
  {
    title: "Launch Prep",
    sub: "I can extend the design work into launch materials like motion assets, JSON/Lottie animations, marketing visuals, countdown pages, and landing pages. This helps the product feel ready before it goes live.",
    start: 36.9,
  },
  {
    title: "Launched Product",
    sub: "From the first idea to launch, I stay with the client and team through the full journey. After launch, we can run usability tests, accessibility checks, and A/B testing to improve what real users need.",
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
    stopRef.current();
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
    if (inViewRef.current) startRef.current();
  }, []);

  useEffect(() => {
    // Reduced motion: hold a calm, "launched" frame and never auto-advance.
    if (reduced) {
      setTime(STEPS[STEPS.length - 1].start + 0.6);
      return;
    }

    const el = animationRef.current;

    const step = (ts: number) => {
      if (!inViewRef.current || pausedRef.current) {
        rafRef.current = null;
        return;
      }
      if (lastRef.current == null) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 1 / 30) * RATE;
      lastRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= DURATION) next = LOOP_START + (next - DURATION);
        if (next < LOOP_START) next = LOOP_START;
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    const start = () => {
      if (rafRef.current == null && !pausedRef.current) {
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
