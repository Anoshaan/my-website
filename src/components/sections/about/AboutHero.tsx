import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { AlphaVideo } from "./AlphaVideo";
import "./about.css";

/**
 * About hero — human, but still in the premium product style. The looping
 * transparent portrait sits large on the left, with no frame, border, or
 * box, so the character reads as part of the page itself. The copy on the
 * right carries the two-line title, a short intro, and the resume download.
 */
export function AboutHero() {
  return (
    <section className="ab-hero">
      <Container>
        <div className="ab-hero-grid">
          <Reveal variant="fade" duration={1.1} delay={0.2} className="ab-hero-media">
            <AlphaVideo />
          </Reveal>

          <div className="ab-hero-copy">
            <Reveal delay={0.1}>
              <h1 className="page-hero-title">
                <span className="page-hero-line">Human behavior is</span>
                <span className="page-hero-grad page-hero-grad--silver">
                  my design system.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="ab-hero-sub">
                I&apos;m Anoshaan, a product experience designer focused on
                building digital products that are clear, useful, and easy to
                scale. My work sits between user experience, interface design,
                motion, and frontend thinking.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="ab-hero-actions">
                <Button
                  href="/resume/Anoshaan_Resume_2026.pdf"
                  variant="secondary"
                  rainbow={false}
                  trailingIcon={null}
                  download
                >
                  Download Resume
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
