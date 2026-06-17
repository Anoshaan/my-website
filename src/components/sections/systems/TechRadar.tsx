"use client";

import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Systems — Section 4. Technology radar. A calm centre point (product
 * thinking) with topic chips sitting around it in two layered rings. A
 * sweep line passes over the field; on hover each chip reveals a one-line
 * insight. Chips reveal ring by ring on scroll. On small screens the
 * radar collapses into a clean horizontal-scroll chip rail.
 */

type Topic = { label: string; insight: string; ring: 0 | 1 };

const TOPICS: Topic[] = [
  { label: "AI-assisted design", insight: "Speed on production, not on the decisions.", ring: 0 },
  { label: "MCP workflows", insight: "Design context, piped straight into code.", ring: 1 },
  { label: "Local AI / LM Studio", insight: "Private models. Nothing leaves the machine.", ring: 0 },
  { label: "Design-to-code", insight: "Editable output, not throwaway generation.", ring: 1 },
  { label: "Front-end practices", insight: "Clean, semantic, accessible by default.", ring: 0 },
  { label: "Accessibility testing", insight: "AAA checked, never assumed.", ring: 1 },
  { label: "A/B testing", insight: "Let real users settle the debate.", ring: 0 },
  { label: "UX analytics", insight: "Watch where attention actually goes.", ring: 1 },
  { label: "Motion as feedback", insight: "Movement that explains state, not decorates it.", ring: 0 },
  { label: "Performance-aware UI", insight: "Perceived speed is a design material.", ring: 1 },
  { label: "Design QA", insight: "The last 5% is where quality lives.", ring: 0 },
  { label: "Reusable systems", insight: "Build once, ship everywhere.", ring: 1 },
];

export function TechRadar() {
  return (
    <section className="section-pad sys-section border-t border-white/[0.06]">
      <Container>
        <div className="sys-stack-head">
          <Reveal>
            <h2 className="text-section text-white heading-sheen sys-h2">
              Tracking what changes how products get built.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-body text-white/60 sys-lead sys-lead--center">
              Product technology moves fast. These are the tools and practices I
              keep close, with product thinking at the centre of all of them.
            </p>
          </Reveal>
        </div>

        {/* Radar — desktop / tablet. */}
        <div className="sys-radar" aria-hidden="false">
          <div className="sys-radar-field">
            <span className="sys-radar-ring sys-radar-ring--1" aria-hidden />
            <span className="sys-radar-ring sys-radar-ring--2" aria-hidden />
            <span className="sys-radar-ring sys-radar-ring--3" aria-hidden />
            <span className="sys-radar-sweep" aria-hidden />
            <span className="sys-radar-core" aria-hidden>
              <span className="sys-radar-core-dot" />
              <span className="sys-radar-core-label">Product thinking</span>
            </span>

            {TOPICS.map((t, i) => {
              const angle = (i / TOPICS.length) * Math.PI * 2 - Math.PI / 2;
              // Radius % matches the ring radii (ring--2 = 29, ring--3 = 43)
              // so each label sits cleanly on its ring path. Equal x/y on a
              // square field keeps them on a true circle.
              const r = t.ring === 0 ? 29 : 43;
              // Rounded to a fixed precision so the SSR and client strings are
              // byte-identical (avoids a float-precision hydration mismatch).
              const x = (50 + Math.cos(angle) * r).toFixed(3);
              const y = (50 + Math.sin(angle) * r).toFixed(3);
              return (
                <ScrollReveal
                  key={t.label}
                  delay={(t.ring === 0 ? 0 : 0.18) + (i % 6) * 0.05}
                  y={12}
                  duration={0.6}
                  className="sys-radar-chip-wrap"
                  style={
                    { left: `${x}%`, top: `${y}%` } as CSSProperties
                  }
                >
                  <span className="sys-radar-chip" tabIndex={0}>
                    {t.label}
                    <span className="sys-radar-insight" role="tooltip">
                      {t.insight}
                    </span>
                  </span>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Chip rail — small screens. */}
        <div className="sys-radar-rail" aria-hidden="false">
          {TOPICS.map((t) => (
            <div key={t.label} className="sys-radar-rail-chip">
              <span className="sys-radar-rail-label">{t.label}</span>
              <span className="sys-radar-rail-insight">{t.insight}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
