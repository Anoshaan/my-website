import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const steps = [
  {
    title: "Discover",
    body: "Exploring the problem space through stakeholder conversations, product context, and user behavior analysis to align on outcomes before any solution work begins.",
  },
  {
    title: "Research",
    body: "Mapping user needs, pain points, and mental models through qualitative and quantitative methods to ground every design decision in real behavior.",
  },
  {
    title: "Structure",
    body: "Defining information architecture, user flows, and interaction patterns that support the product vision and reduce cognitive friction at every step.",
  },
  {
    title: "Design",
    body: "Crafting high-fidelity interfaces, motion systems, and component structures grounded in research, systems thinking, and production-ready standards.",
  },
  {
    title: "Collaborate",
    body: "Working alongside engineers, product managers, and stakeholders to refine, validate, and align the solution across disciplines at every stage.",
  },
  {
    title: "Deliver",
    body: "Shipping production-ready specifications, design systems, and handoff documentation built for clean implementation and long-term maintainability.",
  },
];

export function Process() {
  return (
    <section className="section-pad">
      <Container>
        <SectionTitle title="How I Approach Product Design" />
        <StaggerContainer className="grid gap-6 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <StaggerItem key={s.title}>
              <Card>
                <h3 className="text-card-title text-white">{s.title}</h3>
                <p className="text-body text-white/60">{s.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
