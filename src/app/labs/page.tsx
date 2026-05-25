import { Container } from "@/components/ui/Container";
import { PageHead } from "@/components/ui/PageHead";
import { Reveal } from "@/components/animations/Reveal";
import { GlowBorder } from "@/components/animations/GlowBorder";
import { ScrambledText } from "@/components/animations/ScrambledText";
import { type AnimatedIconName } from "@/components/icons/AnimatedIcon";
import { CaseStudyMedia } from "@/components/mockups/CaseStudyMedia";
import { caseStudies } from "@/lib/case-studies";

const labIcons: AnimatedIconName[] = [
  "network",
  "scan",
  "structure",
  "radar",
  "flow",
  "scale",
  "vector",
  "collaborate",
  "motion",
  "brain",
];

export default function LabsPage() {
  return (
    <>
      <PageHead
        title="Case studies in"
        shineWords="enterprise UX."
        intro="Selected enterprise platforms, AI systems, and digital experiences focused on usability, scalability, and interaction quality."
      />
      <section className="pb-32">
        <Container size="wide">
          <div className="flex flex-col gap-10 lg:gap-14">
            {caseStudies.map((c, idx) => (
              <Reveal
                key={c.slug}
                as="article"
                variant="up"
                amount={0.12}
                duration={0.7}
                className="lab-case"
              >
                <GlowBorder />
                <div className="lab-case-media">
                  <CaseStudyMedia
                    caseStudy={c}
                    index={idx}
                    icon={labIcons[idx % labIcons.length]}
                  />
                </div>

                <div className="lab-case-body">
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="tag">
                        <ScrambledText radius={80} duration={800} speed={38}>
                          {t}
                        </ScrambledText>
                      </span>
                    ))}
                  </div>

                  <h2 className="lab-case-title">{c.title}</h2>

                  <p className="lab-case-summary">{c.summary}</p>

                  <div className="lab-case-meta">
                    <div className="lab-case-meta-row">
                      <span className="text-eyebrow eyebrow-strong text-white/60">
                        Domain
                      </span>
                      <span className="lab-case-meta-value">{c.domain}</span>
                    </div>

                    <div className="lab-case-meta-row">
                      <span className="text-eyebrow eyebrow-strong text-white/60">
                        Highlights
                      </span>
                      <div className="lab-case-pills">
                        {c.highlights.map((h) => (
                          <span key={h} className="lab-case-pill">
                            <ScrambledText radius={70} duration={750} speed={40}>
                              {h}
                            </ScrambledText>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lab-case-meta-row">
                      <span className="text-eyebrow eyebrow-strong text-white/60">
                        Focus Areas
                      </span>
                      <div className="lab-case-pills">
                        {c.focusAreas.map((f) => (
                          <span key={f} className="lab-case-pill is-accent">
                            <ScrambledText radius={70} duration={750} speed={40}>
                              {f}
                            </ScrambledText>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
