import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { BrandMark } from "./BrandMark";
import "./brand.css";

/**
 * Brand hero — identity, product experience, and storytelling. Same
 * inner-page hero structure: a left-aligned two-line title at the
 * unified scale (white statement + gold animated gradient payoff) with a
 * supporting subtitle, and a brand-mark builder on the right that
 * collapses below the copy on small screens.
 */
export function BrandHero() {
  return (
    <section className="br-hero">
      <Container>
        <div className="br-hero-grid">
          <div className="br-hero-copy">
            <Reveal delay={0.1}>
              <h1 className="page-hero-title">
                <span className="page-hero-line">I build brands</span>
                <span className="page-hero-grad page-hero-grad--gold">
                  that feel alive.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="br-hero-sub">
                From identity and websites to product experience, motion,
                content, and launch assets, I help ideas become complete digital
                brands.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade" duration={1.1} delay={0.2} className="br-hero-visual">
            <BrandMark />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
