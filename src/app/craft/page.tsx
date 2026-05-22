import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHead } from "@/components/ui/PageHead";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const sketches = [
  {
    tag: "Sketch · 2025",
    title: "Spatial Layering Studies",
    note: "Z-axis composition for cinematic dashboards.",
    gradient:
      "radial-gradient(60% 60% at 30% 40%, rgba(207, 217, 255, 0.14), transparent 60%)",
  },
  {
    tag: "Motion · 2025",
    title: "Easing Library v2",
    note: "Custom timing curves for product interactions.",
    gradient:
      "radial-gradient(60% 60% at 70% 30%, rgba(255, 184, 154, 0.12), transparent 60%)",
  },
  {
    tag: "Component · 2024",
    title: "Adaptive Side Panels",
    note: "Responsive layout primitives across breakpoints.",
    gradient:
      "radial-gradient(60% 60% at 50% 50%, rgba(138, 166, 255, 0.14), transparent 60%)",
  },
  {
    tag: "Concept · 2024",
    title: "AI Drift Visualization",
    note: "Visual language for prompt evolution.",
    gradient:
      "radial-gradient(60% 60% at 40% 60%, rgba(207, 217, 255, 0.14), transparent 60%)",
  },
  {
    tag: "Token · 2024",
    title: "Surface Elevation Map",
    note: "Codified elevation system for dark UI.",
    gradient:
      "radial-gradient(60% 60% at 60% 40%, rgba(255, 184, 154, 0.10), transparent 60%)",
  },
  {
    tag: "Sketch · 2023",
    title: "Quiet Forms",
    note: "Studies in negative space and breathing room.",
    gradient:
      "radial-gradient(60% 60% at 50% 50%, rgba(138, 166, 255, 0.12), transparent 60%)",
  },
];

export default function CraftPage() {
  return (
    <>
      <PageHead
        title="Sketches, studies, and"
        shineWords="experiments."
        intro="Work-in-progress explorations, design fragments, and ideas that haven't made it into shipped products yet."
      />

      <section className="pb-24">
        <Container>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sketches.map((s) => (
              <StaggerItem key={s.title}>
                <Card>
                  <div
                    className="aspect-[4/3] rounded-[18px] overflow-hidden border border-white/[0.08] bg-[#0a0a0c]"
                    style={{ background: s.gradient + ", #0a0a0c" }}
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-eyebrow text-white/40">{s.tag}</span>
                    <h3 className="text-card-title text-white">{s.title}</h3>
                    <p className="text-supporting text-white/55">{s.note}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
