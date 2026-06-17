import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import "./about.css";

/**
 * About hero — human, but still in the dark premium product style. Left
 * column carries the two-line title (white/silver animated gradient), a
 * short intro, and the resume download. Right column holds the looping
 * personal video in a refined rounded frame with a subtle ambient glow,
 * so it reads as part of the page rather than an embedded media block.
 */
export function AboutHero() {
  return (
    <section className="ab-hero">
      <Container>
        <div className="ab-hero-grid">
          <Reveal variant="fade" duration={1.1} delay={0.2} className="ab-hero-media">
            <div className="ab-hero-video-glow" aria-hidden />
            <div className="about-video ab-hero-video">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/about/intro-poster.jpg"
              >
                <source src="/about/intro.mp4" type="video/mp4" />
              </video>
            </div>
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
                  href="/resume/Anoshaan-Resume.pdf"
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
