import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <section className="section-pad text-center" id="contact">
      <Container size="narrow" className="flex flex-col items-center gap-6">
        <Reveal>
          <span className="text-eyebrow text-white/55">Contact</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-section text-white">
            Let&apos;s build something meaningful.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body text-white/60 max-w-[58ch]">
            Whether you need to scale a design system, refine product
            interactions, or bring motion intelligence to your interfaces — let&apos;s
            start a conversation.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-2">
            <Button href="mailto:hello@anoshaan.com" variant="primary">
              hello@anoshaan.com
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
