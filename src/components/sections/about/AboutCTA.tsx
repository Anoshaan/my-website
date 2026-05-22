import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * About — Section 6. Calm closing CTA.
 */
export function AboutCTA() {
  return (
    <section className="section-pad border-t border-white/[0.06] text-center">
      <Container size="narrow" className="flex flex-col items-center gap-6">
        <Reveal>
          <span className="text-eyebrow text-white/45">What&apos;s next</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-section text-white">
            Let&apos;s design something that lasts.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-body text-white/60 max-w-[54ch]">
            If you&apos;re building something complex — an enterprise platform, a
            design system, or an AI-driven product — I&apos;d love to hear about
            it.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-2">
            <Button href="mailto:hello@anoshaan.com">
              hello@anoshaan.com
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
