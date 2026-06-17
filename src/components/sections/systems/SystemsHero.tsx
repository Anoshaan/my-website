import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { SystemMap } from "./SystemMap";
import "./systems.css";

/**
 * Systems hero — technical product intelligence. Same inner-page hero
 * structure as the rest of the site: a left-aligned two-line title at
 * the unified scale (white statement + green animated gradient payoff)
 * and a supporting subtitle. The right column carries the living product
 * system map, which collapses below the copy as a compact cluster on
 * small screens.
 */
export function SystemsHero() {
  return (
    <section className="sys-hero">
      <Container>
        <div className="sys-hero-grid">
          <div className="sys-hero-copy">
            <Reveal delay={0.1}>
              <h1 className="page-hero-title">
                <span className="page-hero-line">Building intelligent</span>
                <span className="page-hero-grad page-hero-grad--green">
                  product systems.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="sys-hero-sub">
                I build design systems that help teams move faster without losing
                quality. For me, systems are not just components. They are shared
                decisions that make products easier to design, build, and scale.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade" duration={1.1} delay={0.2} className="sys-hero-visual">
            <SystemMap />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
