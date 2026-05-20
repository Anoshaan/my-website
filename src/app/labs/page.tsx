import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHead } from "@/components/ui/PageHead";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const cases = [
  {
    title: "Fintech Core Platform",
    tags: ["Wealth Management", "Systems", "2024"],
    context:
      "A unified wealth management terminal designed for active traders.",
    result:
      "Reduced trader execution errors by 42% and accelerated transaction times by 28%.",
  },
  {
    title: "Aura AI Experience",
    tags: ["AI", "Conversational UX", "2025"],
    context:
      "An ambient AI assistant integrated across desktop and mobile flows.",
    result:
      "Lifted task completion 36% and shortened onboarding from 5 min to 90s.",
  },
  {
    title: "Lumina Trading Dashboard",
    tags: ["Fintech", "Dashboards", "2024"],
    context:
      "Real-time portfolio terminal for institutional traders.",
    result:
      "Cut alarm fatigue 30% and reduced trader execution errors by 22%.",
  },
  {
    title: "Nexus Operating System",
    tags: ["Platform", "Enterprise", "2023"],
    context:
      "Internal operating system unifying scheduling, alerts, and reporting.",
    result:
      "Consolidated 7 internal tools into one. NPS jumped from 24 to 61.",
  },
  {
    title: "Mira Health Suite",
    tags: ["Healthcare", "Mobile", "2023"],
    context:
      "Patient-facing care-coordination app for chronic conditions.",
    result:
      "Improved adherence by 41% and reduced support tickets by 28%.",
  },
  {
    title: "Praxis Design System",
    tags: ["Design Systems", "Tokens", "2022"],
    context:
      "End-to-end design language and component library for a multi-product suite.",
    result:
      "Shipped 5 products on a single system. 60% faster feature delivery.",
  },
];

export default function LabsPage() {
  return (
    <>
      <PageHead
        eyebrow="Labs"
        title="Case studies in"
        shineWords="enterprise UX."
        intro="Selected enterprise platforms, AI systems, and digital experiences focused on usability, scalability, and interaction quality."
      />
      <section className="pb-24">
        <Container>
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {cases.map((c) => (
              <StaggerItem key={c.title}>
                <Card size="large">
                  <div className="aspect-[16/10] rounded-[18px] overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#0d0d14] to-[#050507] relative">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 60% at 80% 20%, rgba(207, 217, 255, 0.16), transparent 60%)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-3 text-eyebrow text-white/55">
                      {c.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight text-white leading-tight">
                      {c.title}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-eyebrow text-white/40">Context</span>
                        <p className="text-supporting text-white/65">{c.context}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-eyebrow text-white/40">Result</span>
                        <p className="text-supporting text-white/65">{c.result}</p>
                      </div>
                    </div>
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
