import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

const principles: { icon: AnimatedIconName; title: string; body: string }[] = [
  {
    icon: "brain",
    title: "Human-Centered Thinking",
    body: "Understanding user intent, cognitive load, and interaction friction to design intuitive experiences.",
  },
  {
    icon: "scale",
    title: "Systems & Scalability",
    body: "Building modular design foundations that support product growth and consistency.",
  },
  {
    icon: "network",
    title: "AI-Assisted Workflows",
    body: "Using AI strategically across ideation, prototyping, and workflow acceleration.",
  },
  {
    icon: "motion",
    title: "Motion & Interaction",
    body: "Designing purposeful animations and responsive interactions that improve usability.",
  },
];

export function DesignPrinciples() {
  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          title="Design Principles Behind Every Product"
          intro="Every product decision should solve a real human problem while supporting long-term scalability. My process blends behavioral UX, systems thinking, and rapid iteration to create experiences that remain useful as products evolve."
        />
        <StaggerContainer className="grid gap-6 mt-16 sm:grid-cols-2">
          {principles.map((p) => (
            <StaggerItem key={p.title}>
              <Card>
                <AnimatedIcon name={p.icon} />
                <h3 className="text-card-title text-white">{p.title}</h3>
                <p className="text-body text-white/60">{p.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
