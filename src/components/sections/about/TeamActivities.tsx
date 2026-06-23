"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * About — "What I Bring to the Team". Three simple sport items, each just an
 * icon + name (no keyword tags). The three figures share one consistent
 * line-art character style; a gentle idle motion keeps them alive.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* One shared character: round head + simple body, posed per sport. */
const Badminton: ReactNode = (
  <svg viewBox="0 0 64 64" className="ab-sport-svg ab-sport-badminton" aria-hidden>
    <circle cx="30" cy="14" r="5" {...stroke} />
    <path {...stroke} d="M30 19v16M30 25l-8 7" />
    <path {...stroke} d="M30 35l-6 13M30 35l7 12" />
    
    <g className="ab-sport-anim-racket" style={{ transformOrigin: "30px 24px" }}>
      <path {...stroke} d="M30 24l9-9" />
      <ellipse cx="44" cy="13" rx="5" ry="6.5" {...stroke} transform="rotate(35 44 13)" />
      <path {...stroke} d="M40 17l-2 3" />
    </g>
    
    <g className="ab-sport-anim-shuttle" style={{ transformOrigin: "52px 6px" }}>
      <circle cx="52" cy="6" r="1.6" {...stroke} />
      <path {...stroke} d="M52 7l-2 3M52 7l2 3M52 8v3" />
    </g>
  </svg>
);

const Swimming: ReactNode = (
  <svg viewBox="0 0 64 64" className="ab-sport-svg ab-sport-swimming" aria-hidden>
    <g className="ab-sport-anim-swimmer" style={{ transformOrigin: "32px 32px" }}>
      <circle cx="24" cy="28" r="5" {...stroke} />
      <path {...stroke} d="M29 30l16 4" />
      <path {...stroke} d="M45 34l8 3M45 34l7 6" />
      <path {...stroke} d="M37 32l8-8" className="ab-sport-anim-swim-arm-b" style={{ transformOrigin: "37px 32px" }} />
      <path {...stroke} d="M37 32l9 6" className="ab-sport-anim-swim-arm-f" style={{ transformOrigin: "37px 32px" }} />
    </g>
    <g className="ab-sport-anim-waves">
      <path {...stroke} d="M -16 46 c4-3 8-3 12 0 s8 3 12 0 s8-3 12 0 s8 3 12 0 s8-3 12 0 s8 3 12 0 s8-3 12 0 s8 3 12 0" opacity="0.7" className="ab-sport-anim-wave1" />
      <path {...stroke} d="M -16 53 c4-3 8-3 12 0 s8 3 12 0 s8-3 12 0 s8 3 12 0 s8-3 12 0 s8 3 12 0 s8-3 12 0 s8 3 12 0" opacity="0.45" className="ab-sport-anim-wave2" />
    </g>
  </svg>
);

const Football: ReactNode = (
  <svg viewBox="0 0 64 64" className="ab-sport-svg ab-sport-football" aria-hidden>
    <circle cx="28" cy="13" r="5" {...stroke} />
    <path {...stroke} d="M28 18v14M28 24l8 5M28 24l-7 4" />
    <path {...stroke} d="M28 32l-6 13" />
    <path {...stroke} d="M28 32l10 9" className="ab-sport-anim-leg" style={{ transformOrigin: "28px 32px" }} />
    <g className="ab-sport-anim-ball" style={{ transformOrigin: "46px 46px" }}>
      <circle cx="46" cy="46" r="6" {...stroke} />
      <path {...stroke} d="M46 41l2 4 4 1M46 41l-2 4-4 1M44 50l2-2 2 2" opacity="0.7" />
    </g>
  </svg>
);

const SPORTS = [
  { name: "Badminton", icon: Badminton },
  { name: "Swimming", icon: Swimming },
  { name: "Football", icon: Football },
];

export function TeamActivities() {
  return (
    <section className="section-pad ab-section border-t border-white/[0.06]">
      <Container>
        <Reveal>
          <h2 className="text-section text-white heading-sheen ab-h2-mt">
            What I Bring to the Team
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-body text-white/60 ab-lead ab-lead--wide">
            I also enjoy being part of team activities beyond the screen.
            Badminton, swimming, and football keep me active, connected, and
            involved with the culture around the work, not just the work itself.
          </p>
        </Reveal>

        <div className="ab-sport-grid">
          {SPORTS.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 0.1} className="ab-sport-card">
              <span className="ab-sport-icon">{s.icon}</span>
              <h3 className="ab-sport-name">{s.name}</h3>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
