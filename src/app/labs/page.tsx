import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHead } from "@/components/ui/PageHead";
import { Reveal } from "@/components/animations/Reveal";
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

/**
 * Per-case-study detail copy + secondary PNG image. The PNG can be
 * dropped into /public/case-studies/<slug>-detail.png and it will be
 * picked up automatically. Detail paragraphs are short, scannable, and
 * sit below the headline summary in the expanded body.
 */

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
          <div className="flex flex-col">
            {caseStudies.map((c, idx) => (
              <Reveal
                key={c.slug}
                as="article"
                variant="up"
                amount={0.12}
                duration={0.7}
                className="lab-case"
              >
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

                  {c.detail && c.detail.length > 0 && (
                    <div className="lab-case-detail">
                      {c.detail.map((p, i) => (
                        <p key={i} className="lab-case-detail-p">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="lab-case-meta">
                    {c.role && (
                      <div className="lab-case-meta-row">
                        <span className="text-eyebrow eyebrow-strong text-white/60">
                          Role
                        </span>
                        <span className="lab-case-meta-value">{c.role}</span>
                      </div>
                    )}

                    {c.timeline && (
                      <div className="lab-case-meta-row">
                        <span className="text-eyebrow eyebrow-strong text-white/60">
                          Timeline
                        </span>
                        <span className="lab-case-meta-value">{c.timeline}</span>
                      </div>
                    )}

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

                  {c.detailImage && (
                    <div className="lab-case-detail-image">
                      <Image
                        src={c.detailImage}
                        alt={`${c.title} — detail`}
                        width={1600}
                        height={1000}
                        sizes="(min-width: 900px) 50vw, 100vw"
                        priority={idx === 0}
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
