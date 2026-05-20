import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const expertise = [
  "Lead UX Engineering",
  "Enterprise Product Design",
  "Design Systems Architecture",
  "AI Experience Systems",
  "Motion & Interaction Design",
  "Frontend Experience Strategy",
  "UX Research",
  "Behavioral Design",
];

export function WhoIAm() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)",
        }}
      />
      <Container>
        <div className="grid gap-12 md:gap-16 md:grid-cols-[0.9fr_1.7fr] items-center">
          {/* Visual mark */}
          <Reveal>
            <div className="relative aspect-square max-w-[420px] mx-auto md:mx-0">
              <div
                aria-hidden
                className="absolute inset-[-8%] rounded-full border border-white/[0.08]"
                style={{ animation: "spin 80s linear infinite" }}
              />
              <div className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/[0.14] bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
                <div
                  className="absolute inset-[12%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, color-mix(in oklab, #8b5cf6 70%, #fff) 0%, color-mix(in oklab, #8b5cf6 20%, #2a2f55) 50%, transparent 80%)",
                    filter: "blur(10px)",
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-[64px] h-[64px] rounded-full bg-black border border-white/[0.14] grid place-items-center text-2xl font-semibold text-white shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
                A
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <h2 className="text-section text-white max-w-[22ch]">
                Lead UX Engineer and Senior Product Experience Designer —
                building digital systems that solve real problems at scale.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body text-white/60 max-w-[54ch]">
                From complex enterprise platforms to AI-driven interfaces, I
                bring together behavioral research, systems design, and motion
                craft to ship products that perform at every level.
              </p>
            </Reveal>

            <StaggerContainer className="flex flex-wrap gap-2 mt-2">
              {expertise.map((tag) => (
                <StaggerItem key={tag}>
                  <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-supporting text-white/65 hover:text-white hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {tag}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
