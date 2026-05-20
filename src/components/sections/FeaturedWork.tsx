import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";

const projects = [
  {
    title: "Fintech Core Platform",
    tags: ["Wealth Management", "Systems"],
    context:
      "A unified wealth management terminal designed for active traders.",
    result:
      "Reduced trader execution errors by 42% and accelerated transaction times by 28%.",
    href: "/labs",
  },
  {
    title: "Aura AI Experience",
    tags: ["AI", "Conversational UX"],
    context:
      "An ambient AI assistant integrated across desktop and mobile flows.",
    result:
      "Lifted task completion 36% and shortened onboarding from 5 min to 90s.",
    href: "/labs",
  },
];

export function FeaturedWork() {
  return (
    <section className="section-pad">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <SectionTitle
            eyebrow="Featured Work"
            title="Selected Work"
            intro="Selected enterprise platforms, AI systems, and digital experiences focused on usability, scalability, and interaction quality."
            className="max-w-[820px]"
          />
          <Reveal delay={0.2}>
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-eyebrow text-white/65 hover:text-white transition-colors duration-[250ms] min-h-[44px]"
            >
              View all work
              <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Reveal key={p.title} duration={0.9}>
              <Link href={p.href} className="block h-full">
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
                    <div className="flex flex-wrap gap-2 text-eyebrow text-white/55">
                      {p.tags.map((t, i) => (
                        <span key={t}>
                          {t}
                          {i < p.tags.length - 1 && (
                            <span className="ml-2 opacity-50">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight text-white leading-tight">
                      {p.title}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-eyebrow text-white/40">Context</span>
                        <p className="text-supporting text-white/65">{p.context}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-eyebrow text-white/40">Result</span>
                        <p className="text-supporting text-white/65">{p.result}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3 text-supporting text-white">
                      View Full Case Study
                      <span className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-white/[0.14]">
                        <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
                          <path
                            d="M3 11L11 3M11 3H5M11 3V9"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
