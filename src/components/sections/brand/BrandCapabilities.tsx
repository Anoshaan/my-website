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

/* Grouped into clear, scannable categories so the full range reads at a
   glance instead of as one long flat list. Every original area is still
   covered, just organised under a heading. */
const GROUPS = [
  {
    title: "Brand Strategy",
    detail: "Brand idea, positioning, and the story that holds it together",
  },
  {
    title: "Identity Direction",
    detail: "Logo and visual system, typography, color, layout, and tone",
  },
  {
    title: "Website & Product Experience",
    detail: "Website design, product UI, and the full digital experience",
  },
  {
    title: "Motion & Launch Assets",
    detail:
      "Motion, micro-interactions, 3D, scroll storytelling, social, video, and launch content",
  },
  {
    title: "Guidelines & Growth Support",
    detail:
      "Brand guidelines, reusable templates, pitch decks, and ongoing creative support as the brand grows",
  },
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
          {GROUPS.map((group, i) => (
            <ScrollReveal
              key={group.title}
              delay={(i % 2) * 0.06 + Math.floor(i / 2) * 0.05}
              className="br-cap-item"
            >
              <span className="br-cap-dot" aria-hidden />
              <span className="br-cap-text">
                <span className="br-cap-label">{group.title}</span>
                <span className="br-cap-detail">{group.detail}</span>
              </span>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
