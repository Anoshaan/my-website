"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Brand — Section 4. Product experience as brand. The brand rules (color,
 * type, grid, tone, motion) resolve into a refined product surface with
 * live micro-interactions. The product is where the brand becomes real.
 * UI frame uses subtle continuous motion; static under reduced motion.
 */

const TRAITS = [
  "Website",
  "App UI",
  "Onboarding",
  "Empty states",
  "Micro-interactions",
  "Product storytelling",
];

function ProductFrame() {
  return (
    <div className="br-pf" aria-hidden>
      <div className="br-pf-window">
        <div className="br-pf-top">
          <span className="br-pf-dot" />
          <span className="br-pf-dot" />
          <span className="br-pf-dot" />
          <span className="br-pf-title" />
        </div>
        <div className="br-pf-body">
          <div className="br-pf-side">
            <span className="br-pf-nav br-pf-nav--active" />
            <span className="br-pf-nav" />
            <span className="br-pf-nav" />
            <span className="br-pf-nav" />
          </div>
          <div className="br-pf-main">
            <div className="br-pf-head">
              <span className="br-pf-h" />
              <span className="br-pf-toggle">
                <span className="br-pf-toggle-knob" />
              </span>
            </div>
            <div className="br-pf-stats">
              <span className="br-pf-stat" />
              <span className="br-pf-stat" />
              <span className="br-pf-stat" />
            </div>
            <div className="br-pf-chart">
              <span className="br-pf-bar br-pf-bar--1" />
              <span className="br-pf-bar br-pf-bar--2" />
              <span className="br-pf-bar br-pf-bar--3" />
              <span className="br-pf-bar br-pf-bar--4" />
              <span className="br-pf-bar br-pf-bar--5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductAsBrand() {
  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-split br-split--wide is-reversed">
          <ProductFrame />

          <div className="br-split-copy">
            <Reveal>
              <span className="section-label br-eyebrow">Product experience as brand</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white heading-sheen br-h2">
                The product is where the brand becomes real.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 br-lead">
                Color, type, grid, tone, and motion stop being a guideline and
                become a working interface. Visual hierarchy and UX clarity are
                where people actually feel the brand.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="br-trait-row">
                {TRAITS.map((t) => (
                  <span key={t} className="br-trait">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
