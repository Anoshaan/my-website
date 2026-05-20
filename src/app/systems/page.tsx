import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHead } from "@/components/ui/PageHead";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const beliefs = [
  {
    title: "Tokens before components.",
    body: "A design system should encode decisions, not just visuals. Tokens make every choice traceable and reversible.",
  },
  {
    title: "Behavior over decoration.",
    body: "Motion, color, and typography exist to make interfaces more usable — not to make them more impressive.",
  },
  {
    title: "Systems are products too.",
    body: "Treat the design system like an internal product. Versioning, docs, and adoption metrics matter.",
  },
  {
    title: "Constraints enable scale.",
    body: "A small set of well-chosen primitives outperforms a sprawling library. Constraints are a feature.",
  },
  {
    title: "Cross-functional by default.",
    body: "Engineers and designers ship the system together. Otherwise you ship two systems that disagree.",
  },
  {
    title: "Quality is measurable.",
    body: "Adoption rate, override count, contribution velocity — design systems can and should be quantified.",
  },
];

const toolkit = [
  "Figma",
  "Tokens Studio",
  "Storybook",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Framer Motion",
  "Linear",
  "Notion",
];

export default function SystemsPage() {
  return (
    <>
      <PageHead
        eyebrow="Systems"
        title="Building scalable design"
        shineWords="foundations."
        intro="Design systems, interaction patterns, and product methodology that supports growth without sacrificing consistency."
      />

      <section className="pb-24">
        <Container>
          <SectionTitle title="Operating beliefs" />
          <StaggerContainer className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b) => (
              <StaggerItem key={b.title}>
                <Card>
                  <h3 className="text-card-title text-white">{b.title}</h3>
                  <p className="text-body text-white/60">{b.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="section-pad border-t border-white/[0.06]">
        <Container>
          <SectionTitle eyebrow="Toolkit" title="What I work with" />
          <div className="flex flex-wrap gap-2 mt-10">
            {toolkit.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-supporting text-white/65 hover:text-white hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                {t}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
