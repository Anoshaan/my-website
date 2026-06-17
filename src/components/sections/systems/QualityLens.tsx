"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Systems — Section 1. Product Quality Lens. Quality isn't guessed; it's
 * inspected through layers. A scanning glass lens on the left passes over
 * six concentric quality rings; on the right, six quality areas reveal in
 * sequence, each indicator lighting as its layer is read. Each area gets
 * exactly one sharp sentence.
 */

type Quality = { name: string; line: string };

const QUALITIES: Quality[] = [
  {
    name: "Clarity",
    line: "Every screen earns its space. If it doesn't help someone decide, it goes.",
  },
  {
    name: "Accessibility",
    line: "Designed to AAA thinking, so the experience holds for everyone, not the average user.",
  },
  {
    name: "Behavior",
    line: "Tested against how people actually move through a product, not how we assume they will.",
  },
  {
    name: "Performance",
    line: "Measured, never guessed. Perceived speed is treated as part of the design.",
  },
  {
    name: "Consistency",
    line: "One system of decisions, applied the same way across every surface.",
  },
  {
    name: "Validation",
    line: "A/B testing, usability runs, and design QA turn opinions into measurable improvement.",
  },
];

function Lens() {
  return (
    <div className="sys-lens" aria-hidden>
      <svg viewBox="0 0 200 200" className="sys-lens-svg">
        <defs>
          <radialGradient id="lensCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(120,224,184,0.22)" />
            <stop offset="70%" stopColor="rgba(120,224,184,0.04)" />
            <stop offset="100%" stopColor="rgba(120,224,184,0)" />
          </radialGradient>
          <linearGradient id="lensScan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(120,224,184,0)" />
            <stop offset="50%" stopColor="rgba(150,240,200,0.7)" />
            <stop offset="100%" stopColor="rgba(120,224,184,0)" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="96" fill="url(#lensCore)" />

        {/* Concentric quality rings — one per area. */}
        {QUALITIES.map((_, i) => (
          <circle
            key={i}
            className="sys-lens-ring"
            cx="100"
            cy="100"
            r={26 + i * 12}
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}

        {/* Marker indicators sitting on the rings. */}
        {QUALITIES.map((_, i) => (
          <circle
            key={`m-${i}`}
            className="sys-lens-marker"
            cx={100}
            cy={100 - (26 + i * 12)}
            r="2.6"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}

        <circle className="sys-lens-core" cx="100" cy="100" r="4" />

        {/* Scanning sweep crossing the lens. */}
        <g className="sys-lens-scan">
          <rect x="2" y="98" width="196" height="4" fill="url(#lensScan)" />
        </g>
      </svg>
    </div>
  );
}

export function QualityLens() {
  return (
    <section className="section-pad sys-section">
      <Container>
        <div className="sys-split">
          <div className="sys-split-copy">
            <Reveal>
              <span className="section-label sys-eyebrow">Product quality lens</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white heading-sheen sys-h2">
                Quality is inspected, not guessed.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 sys-lead">
                Every product passes through the same lens. Each layer is read,
                tested, and refined before it ships.
              </p>
            </Reveal>

            <div className="sys-quality-list">
              {QUALITIES.map((q, i) => (
                <ScrollReveal
                  key={q.name}
                  delay={i * 0.07}
                  className="sys-quality-item"
                >
                  <span className="sys-quality-dot" aria-hidden />
                  <div>
                    <h3 className="sys-quality-name">{q.name}</h3>
                    <p className="sys-quality-line">{q.line}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="sys-split-visual sys-lens-wrap">
            <Lens />
          </div>
        </div>
      </Container>
    </section>
  );
}
