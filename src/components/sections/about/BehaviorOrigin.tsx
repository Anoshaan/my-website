"use client";

import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About — Section 1. Where the interest started. A quiet behavior map: an
 * attention path traces through a minimal interface while points light up
 * for attention, decision, feedback, and memory. It connects the human
 * psychology side of the story to interface design. The cursor only
 * animates when motion is allowed; the rest is gentle CSS.
 */

const PATH = "M40 46 L150 46 L150 104 L74 104 L74 150 L210 150";

const POINTS = [
  { x: 40, y: 46, label: "Attention" },
  { x: 150, y: 104, label: "Decision" },
  { x: 74, y: 150, label: "Feedback" },
  { x: 210, y: 150, label: "Memory" },
];

export function BehaviorOrigin() {
  const reduced = useReducedMotion();

  return (
    <section className="section-pad ab-section border-t border-white/[0.06]">
      <Container>
        <div className="ab-split">
          <div className="ab-split-copy">
            <Reveal>
              <span className="section-label ab-eyebrow">Where the interest started</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white heading-sheen">
                It began with how people behave.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/62 ab-lead">
                Long before the tools, I was drawn to the questions underneath
                interfaces. Why people notice one thing and ignore another, how
                they decide, and what makes an interaction feel right.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="text-body text-white/55 ab-lead">
                Psychology, decision-making, interaction patterns, motion, and
                feedback became the lens I use to design products, and the
                reason I think in systems instead of screens.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade" duration={1} delay={0.1} className="ab-behavior">
            <svg viewBox="0 0 260 200" className="ab-behavior-svg" aria-hidden>
              <defs>
                <radialGradient id="abAttnGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(207,217,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(207,217,255,0)" />
                </radialGradient>
              </defs>

              {/* Minimal interface. */}
              <rect className="ab-bh-screen" x="16" y="20" width="228" height="160" rx="10" />
              <line className="ab-bh-ui" x1="32" y1="36" x2="120" y2="36" />
              <rect className="ab-bh-ui-block" x="130" y="62" width="44" height="30" rx="5" />
              <rect className="ab-bh-ui-block" x="32" y="120" width="60" height="22" rx="5" />

              {/* Attention path. */}
              <path className="ab-bh-path" d={PATH} fill="none" />

              {/* Nodes. */}
              {POINTS.map((p, i) => (
                <g key={p.label} className="ab-bh-node" style={{ animationDelay: `${i * 0.9}s` }}>
                  <circle cx={p.x} cy={p.y} r="11" fill="url(#abAttnGlow)" />
                  <circle className="ab-bh-node-dot" cx={p.x} cy={p.y} r="4" />
                  <text className="ab-bh-label" x={p.x} y={p.y - 14} textAnchor="middle">
                    {p.label}
                  </text>
                </g>
              ))}

              {/* Travelling cursor — motion only. */}
              {!reduced && (
                <circle className="ab-bh-cursor" r="3.5">
                  <animateMotion dur="6s" repeatCount="indefinite" path={PATH} />
                </circle>
              )}
            </svg>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
