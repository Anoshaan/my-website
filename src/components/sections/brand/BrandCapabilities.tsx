"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Brand — "What I can help you build". A clear, scannable map of the full
 * support around a brand, from the first idea to ongoing growth. Each area
 * is a calm row with a gold marker; no cards, matching the page rhythm.
 * Reveals row by row on scroll.
 */

const AREAS = [
  "Brand idea and positioning",
  "Brand identity direction",
  "Logo and visual system direction",
  "Typography, color, layout, and tone",
  "Website design",
  "Product UI and digital experience",
  "Motion, micro-interactions, 3D, and scroll storytelling",
  "Social media and launch content",
  "Pitch decks and presentation assets",
  "Video, explainer, and campaign assets",
  "Brand guidelines and reusable templates",
  "Ongoing creative support as the brand grows",
];

export function BrandCapabilities() {
  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-stack-head">
          <Reveal>
            <h2 className="text-section text-white heading-sheen br-h2">
              What I can help you build.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body text-white/60 br-lead br-lead--center">
              Whatever stage the idea is at, here is the full range of support I
              can bring to it.
            </p>
          </Reveal>
        </div>

        <div className="br-cap-grid">
          {AREAS.map((area, i) => (
            <ScrollReveal
              key={area}
              delay={(i % 2) * 0.06 + Math.floor(i / 2) * 0.05}
              className="br-cap-item"
            >
              <span className="br-cap-dot" aria-hidden />
              <span className="br-cap-label">{area}</span>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
