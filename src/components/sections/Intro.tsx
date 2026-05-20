import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export function Intro() {
  return (
    <section className="section-pad border-b border-white/[0.06]">
      <Container size="narrow">
        <Reveal>
          <h2 className="text-section text-white mb-6">
            Hello, I&apos;m Anoshaan.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="flex flex-col gap-4 text-body text-white/65 max-w-[62ch]">
            <p>
              I help startups, ISVs, and enterprise teams transform complex
              ideas into scalable digital experiences.
            </p>
            <p>
              My work focuses on simplifying high-friction interactions,
              building adaptive design systems, and creating products that
              balance usability, performance, and emotional clarity.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
