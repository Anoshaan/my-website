"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * About — Section 5. Off-screen discipline. Sport as part of the mindset,
 * not a hobby list. Each one is an abstract kinetic motion mark, never a
 * cartoon icon: a quick shuttle line, a swimming wave rhythm, and a
 * tactical movement path. Lines draw continuously; static under reduced
 * motion.
 */

type Sport = { name: string; label: string; mark: ReactNode };

const SPORTS: Sport[] = [
  {
    name: "Badminton",
    label: "Speed. Focus. Precision.",
    mark: (
      <svg viewBox="0 0 160 70" className="ab-mark-svg" aria-hidden>
        <path
          className="ab-mark-line ab-mark-line--shuttle"
          d="M8 58 L44 20 L74 50 L108 14 L150 44"
          fill="none"
        />
        <circle className="ab-mark-pt ab-mark-pt--shuttle" cx="150" cy="44" r="3.5" />
      </svg>
    ),
  },
  {
    name: "Swimming",
    label: "Endurance. Rhythm. Recovery.",
    mark: (
      <svg viewBox="0 0 160 70" className="ab-mark-svg" aria-hidden>
        <path
          className="ab-mark-line ab-mark-line--wave"
          d="M4 35 Q 24 12 44 35 T 84 35 T 124 35 T 164 35"
          fill="none"
        />
        <path
          className="ab-mark-line ab-mark-line--wave2"
          d="M4 50 Q 24 30 44 50 T 84 50 T 124 50 T 164 50"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Football",
    label: "Teamwork. Strategy. Energy.",
    mark: (
      <svg viewBox="0 0 160 70" className="ab-mark-svg" aria-hidden>
        <path
          className="ab-mark-line ab-mark-line--tactic"
          d="M12 56 C 40 56, 44 18, 76 18 S 120 40, 148 16"
          fill="none"
          strokeDasharray="2 5"
        />
        <circle className="ab-mark-node" cx="12" cy="56" r="3" />
        <circle className="ab-mark-node" cx="76" cy="18" r="3" />
        <circle className="ab-mark-node ab-mark-node--goal" cx="148" cy="16" r="3.5" />
      </svg>
    ),
  },
];

export function OffScreenDiscipline() {
  return (
    <section className="section-pad ab-section border-t border-white/[0.06]">
      <Container>
        <div className="ab-disc-head">
          <Reveal>
            <h2 className="text-section text-white heading-sheen">
              The habits that keep the work sharp.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-body text-white/60 ab-lead">
              Movement, strategy, and consistency carry straight back into how I
              think and work. These are part of the mindset, not a break from it.
            </p>
          </Reveal>
        </div>

        <div className="ab-disc-grid">
          {SPORTS.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 0.1} className="ab-mark">
              <div className="ab-mark-visual">{s.mark}</div>
              <h3 className="ab-mark-name">{s.name}</h3>
              <span className="ab-mark-label">{s.label}</span>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
