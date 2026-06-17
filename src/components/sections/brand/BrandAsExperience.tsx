"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Brand — Section 1. Brand as experience. A split composition: static
 * brand elements on the left (type, color, grid, tone) flow across an
 * animated connector into a living product surface on the right. The
 * point: identity only becomes real through interaction. Continuous CSS
 * flow, frozen under reduced motion.
 */
export function BrandAsExperience() {
  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-split">
          <div className="br-split-copy">
            <Reveal>
              <span className="section-label br-eyebrow">Brand as experience</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white heading-sheen br-h2">
                Brand is not decoration.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 br-lead">
                A brand is not only how it looks. It is how it speaks, moves,
                responds, and feels. The static pieces are only the start. They
                come alive the moment someone uses the product.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade" duration={1} delay={0.1} className="br-exp" >
            <div className="br-exp-wrap" aria-hidden>
              {/* LEFT — static brand kit. */}
              <div className="br-exp-kit">
                <span className="br-exp-kit-tag">Identity</span>
                <div className="br-exp-chips">
                  <span className="br-exp-chip br-exp-chip--1" />
                  <span className="br-exp-chip br-exp-chip--2" />
                  <span className="br-exp-chip br-exp-chip--3" />
                </div>
                <span className="br-exp-type br-exp-type--lg" />
                <span className="br-exp-type br-exp-type--sm" />
                <span className="br-exp-kit-grid" />
              </div>

              {/* CONNECTOR — pieces flowing across. */}
              <div className="br-exp-flow">
                <span className="br-exp-particle br-exp-particle--1" />
                <span className="br-exp-particle br-exp-particle--2" />
                <span className="br-exp-particle br-exp-particle--3" />
              </div>

              {/* RIGHT — living product surface. */}
              <div className="br-exp-product">
                <span className="br-exp-product-tag">Experience</span>
                <span className="br-exp-product-bar" />
                <span className="br-exp-product-row" />
                <span className="br-exp-product-row br-exp-product-row--short" />
                <span className="br-exp-product-cta" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
