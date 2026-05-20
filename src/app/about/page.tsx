import { Container } from "@/components/ui/Container";
import { PageHead } from "@/components/ui/PageHead";
import { Reveal } from "@/components/animations/Reveal";

const timeline = [
  {
    year: "2024 — Now",
    title: "Independent Practice",
    role: "Lead UX Engineer",
    body: "Partnering with startups, ISVs, and enterprise teams on AI experiences, fintech platforms, and design systems.",
  },
  {
    year: "2021 — 2024",
    title: "Senior Product Experience Designer",
    role: "Halcyon Labs",
    body: "Led design across two flagship products. Built and shipped the company's first design system.",
  },
  {
    year: "2019 — 2021",
    title: "Product Designer",
    role: "Aurora Labs",
    body: "Owned end-to-end design on consumer-facing financial products serving 200K+ active users.",
  },
  {
    year: "2017 — 2019",
    title: "Interaction Designer",
    role: "Northwind",
    body: "Designed motion systems and interaction patterns for the company's web and mobile product suite.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="Behavioral UX, motion craft,"
        shineWords="and systems."
        intro="I'm Anoshaan — a Lead UX Engineer and Senior Product Experience Designer with 8+ years across enterprise platforms, fintech, AI products, and design systems."
      />

      <section className="pb-12 md:pb-16">
        <Container>
          <div className="grid gap-12 md:gap-16 md:grid-cols-[1fr_1.4fr] items-start">
            <Reveal>
              <div className="aspect-[4/5] rounded-[28px] overflow-hidden border border-white/[0.14] bg-gradient-to-br from-[#0c0c12] to-[#06070b] relative">
                <div
                  aria-hidden
                  className="absolute inset-[15%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, color-mix(in oklab, #8b5cf6 70%, #fff) 0%, color-mix(in oklab, #8b5cf6 20%, #2a2f55) 50%, transparent 80%)",
                    filter: "blur(10px)",
                  }}
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.1}>
                <p className="text-body text-white">
                  My work focuses on the intersection of behavioral UX,
                  scalable systems, motion craft, and frontend thinking — the
                  places where design decisions become production code.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body text-white/65">
                  I&apos;ve led product experience design at high-growth startups
                  and ISVs, shipped enterprise platforms used by trading
                  floors and clinical teams, and built design systems that
                  scaled to multiple products without losing coherence.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-body text-white/65">
                  I work where strategy meets craft — translating ambiguous
                  product goals into clear interaction patterns, motion
                  systems, and production-ready interfaces.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad border-t border-white/[0.06]">
        <Container>
          <Reveal>
            <h2 className="text-section text-white mb-12">Selected experience</h2>
          </Reveal>
          <div className="flex flex-col">
            {timeline.map((row, i) => (
              <Reveal key={row.title} delay={i * 0.05}>
                <div className="grid gap-4 md:grid-cols-[200px_1fr_200px] items-baseline py-7 border-b border-white/[0.06]">
                  <span className="text-eyebrow text-white/55">{row.year}</span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-card-title text-white">{row.title}</h3>
                    <p className="text-supporting text-white/55">{row.body}</p>
                  </div>
                  <span className="text-eyebrow text-white/40 md:text-right">
                    {row.role}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
