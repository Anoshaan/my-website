"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Brand — Section 3. Identity system. An animated brand board assembles
 * tile by tile, the way a real guideline is built: type, color, grid,
 * spacing, a UI surface, a motion curve, and a tone block. Custom and
 * ownable, no stock imagery or generic mockups. Tiles slide in on scroll.
 */
export function IdentitySystem() {
  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-split br-split--board">
          <div className="br-split-copy">
            <Reveal>
              <span className="section-label br-eyebrow">Identity system</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white heading-sheen br-h2">
                Structure, not just decoration.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 br-lead">
                Visual direction, typography, a color system, layout language,
                and tone, all written down as reusable, digital-first brand
                rules. A guideline a team can actually build on.
              </p>
            </Reveal>
          </div>

          <div className="br-board" aria-hidden>
            <ScrollReveal delay={0} className="br-tile br-tile--type">
              <span className="br-tile-tag">Type</span>
              <span className="br-tile-aa">Aa</span>
              <span className="br-tile-line br-tile-line--lg" />
              <span className="br-tile-line br-tile-line--sm" />
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="br-tile br-tile--color">
              <span className="br-tile-tag">Color</span>
              <div className="br-tile-chips">
                <span className="br-tile-chip br-tile-chip--1" />
                <span className="br-tile-chip br-tile-chip--2" />
                <span className="br-tile-chip br-tile-chip--3" />
                <span className="br-tile-chip br-tile-chip--4" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16} className="br-tile br-tile--grid">
              <span className="br-tile-tag">Grid</span>
              <span className="br-tile-grid-lines" />
            </ScrollReveal>

            <ScrollReveal delay={0.24} className="br-tile br-tile--ui">
              <span className="br-tile-tag">Product</span>
              <span className="br-tile-ui-bar" />
              <span className="br-tile-ui-row" />
              <span className="br-tile-ui-row br-tile-ui-row--short" />
            </ScrollReveal>

            <ScrollReveal delay={0.32} className="br-tile br-tile--motion">
              <span className="br-tile-tag">Motion</span>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="br-tile-curve">
                <path
                  d="M4 34 C 30 34, 34 8, 60 8 S 92 6, 96 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="br-tile br-tile--tone">
              <span className="br-tile-tag">Tone</span>
              <span className="br-tile-tone-text">Confident. Warm. Precise.</span>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
