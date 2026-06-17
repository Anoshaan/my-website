import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * About — Section 6. Final CTA. Calm, direct close that keeps the resume
 * download easy to reach and points to the work, or a direct line.
 */
export function AboutCTA() {
  return (
    <section className="section-pad border-t border-white/[0.06] text-center">
      <Container size="narrow" className="flex flex-col items-center gap-6">
        <Reveal>
          <span className="section-label">What&apos;s next</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-section text-white heading-sheen">
            If you&apos;re building something complex, I&apos;d like to hear about it.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-body text-white/60 max-w-[52ch]">
            An enterprise platform, an AI-driven product, or a system that has to
            think. Take a look at the work, or reach out directly.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="ab-cta-actions">
            <Button href="/labs" rainbow>
              View Labs
            </Button>
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
      </Container>
    </section>
  );
}
