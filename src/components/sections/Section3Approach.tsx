"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Section 3 — Thinking Model. "How I read the user before I design."
 *
 * Not a checklist, card grid, or timeline. A soft thinking cloud: a central
 * "user" core with four thinking facets floating around it, joined by subtle
 * connectors and faint orbit rings. Calm, spacious, human — the message is
 * that the design starts from behaviour, clarity, trust, and natural
 * decisions, not from screens.
 */

type Facet = {
  key: string;
  title: string;
  body: string;
  icon: ReactNode;
  /** Desktop float offset so the four cards feel scattered, not gridded. */
  lift: number;
};

const IconIntent = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);
const IconLoad = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
    <path d="M3 12.5 12 17l9-4.5" />
    <path d="M3 17 12 21.5 21 17" />
  </svg>
);
const IconTrust = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 5 6v5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconNext = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 18c0-5 3-8 8-8h6" />
    <path d="m14 6 4 4-4 4" />
  </svg>
);

const FACETS: Facet[] = [
  {
    key: "intent",
    title: "User Intent",
    body: "What they came to do, not just what the product wants to show.",
    icon: IconIntent,
    lift: -18,
  },
  {
    key: "load",
    title: "Mental Load",
    body: "How much thinking, guessing, or effort the interface is asking from them.",
    icon: IconLoad,
    lift: 26,
  },
  {
    key: "trust",
    title: "Trust Moments",
    body: "The small details that make users feel safe, clear, and confident.",
    icon: IconTrust,
    lift: -26,
  },
  {
    key: "next",
    title: "Natural Next Step",
    body: "The path that feels obvious without forcing the user to think too much.",
    icon: IconNext,
    lift: 18,
  },
];

function FacetCard({
  facet,
  index,
  reduced,
}: {
  facet: Facet;
  index: number;
  reduced: boolean | null;
}) {
  return (
    <Reveal delay={0.06 * index}>
      <motion.div
        style={{ ["--lift" as string]: `${facet.lift}px` }}
        className="thinking-card"
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 6.5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
        }
      >
        <span className="thinking-card-glow" aria-hidden />
        <span className="thinking-card-icon">{facet.icon}</span>
        <h3 className="thinking-card-title">{facet.title}</h3>
        <p className="thinking-card-body">{facet.body}</p>
      </motion.div>
    </Reveal>
  );
}

export function Section3Approach() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="approach" className="thinking-section section-pad">
      <div className="thinking-aura" aria-hidden />

      <Container size="wide">
        {/* Header */}
        <Reveal duration={0.9}>
          <header className="thinking-header">
            <p className="section-label">Thinking Model</p>
            <h2 className="text-section heading-sheen thinking-title">
              How I read the user before I design
            </h2>
            <p className="text-body thinking-intro">
              <span className="hidden md:inline">
                I begin by listening closely: what the client wants to build, what
                users need to understand, and where the business needs clarity.
                From there, I turn scattered ideas into a shared direction before
                touching the interface.
              </span>
              <span className="inline md:hidden">
                I start by listening to client goals and user needs, turning scattered ideas into a clear direction before designing the interface.
              </span>
            </p>
          </header>
        </Reveal>

        {/* Thinking cloud — four facets floating around a central core */}
        <div className="thinking-cloud">
          {/* Ambient orbit rings + connectors (desktop) */}
          <div className="thinking-orbits" aria-hidden>
            <span className="thinking-ring thinking-ring-1" />
            <span className="thinking-ring thinking-ring-2" />
            <svg
              className="thinking-links"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line x1="50" y1="50" x2="22" y2="26" />
              <line x1="50" y1="50" x2="78" y2="26" />
              <line x1="50" y1="50" x2="22" y2="74" />
              <line x1="50" y1="50" x2="78" y2="74" />
            </svg>
          </div>

          {/* Central core — the user */}
          <div className="thinking-core" aria-hidden>
            <motion.span
              className="thinking-core-dot"
              animate={reduced ? undefined : { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
              transition={reduced ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="thinking-core-label">The user</span>
          </div>

          {/* Facet cards */}
          <div className="thinking-grid">
            {FACETS.map((f, i) => (
              <FacetCard key={f.key} facet={f} index={i} reduced={reduced} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
