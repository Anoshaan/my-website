import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHead } from "@/components/ui/PageHead";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

const beliefs: { icon: AnimatedIconName; title: string; body: string }[] = [
  {
    icon: "structure",
    title: "Tokens before components.",
    body: "A design system should encode decisions, not just visuals. Tokens make every choice traceable and reversible.",
  },
  {
    icon: "motion",
    title: "Behavior over decoration.",
    body: "Motion, color, and typography exist to make interfaces more usable — not to make them more impressive.",
  },
  {
    icon: "network",
    title: "Systems are products too.",
    body: "Treat the design system like an internal product. Versioning, docs, and adoption metrics matter.",
  },
  {
    icon: "scale",
    title: "Constraints enable scale.",
    body: "A small set of well-chosen primitives outperforms a sprawling library. Constraints are a feature.",
  },
  {
    icon: "collaborate",
    title: "Cross-functional by default.",
    body: "Engineers and designers ship the system together. Otherwise you ship two systems that disagree.",
  },
  {
    icon: "radar",
    title: "Quality is measurable.",
    body: "Adoption rate, override count, contribution velocity — design systems can and should be quantified.",
  },
];

export default function SystemsPage() {
  return (
    <>
      <PageHead
        title="Building scalable design"
        shineWords="foundations."
        intro="Design systems, interaction patterns, and product methodology that supports growth without sacrificing consistency."
      />

      <section className="pb-24">
        <Container>
          <SectionTitle title="Operating beliefs" />
          <StaggerContainer className="grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b) => (
              <StaggerItem key={b.title}>
                <Card>
                  <AnimatedIcon name={b.icon} />
                  <h3 className="text-card-title text-white">{b.title}</h3>
                  <p className="text-body text-white/60">{b.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
