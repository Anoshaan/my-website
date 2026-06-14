import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * About — Section 8. Calm closing CTA.
 */
export function AboutCTA() {
  return (
    <section className="section-pad border-t border-white/[0.06] text-center">
      <Container size="narrow" className="flex flex-col items-center gap-6">
        <Reveal>
          <span className="text-eyebrow text-white/45">What&apos;s next</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-section text-white heading-sheen">
            Let&apos;s build meaningful digital experiences.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-body text-white/60 max-w-[54ch]">
            If you&apos;re building something complex, an enterprise platform,
            an AI-driven product, a system that has to think, I&apos;d like to
            hear about it.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-2">
            <Button href="mailto:hello@anoshaan.com" rainbow>
              hello@anoshaan.com
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
