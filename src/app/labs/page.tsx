import { Container } from "@/components/ui/Container";
import { PageHead } from "@/components/ui/PageHead";
import { Reveal } from "@/components/animations/Reveal";
import { caseStudies } from "@/lib/case-studies";

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
            {caseStudies.map((c, idx) => {
              const num = String(idx + 1).padStart(2, "0");
              return (
                <Reveal
                  key={c.slug}
                  as="article"
                  variant="up"
                  amount={0.12}
                  duration={0.7}
                  className="lab-case"
                >
                  <div className="lab-case-media">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 60% at 80% 20%, rgba(207, 217, 255, 0.16), transparent 60%)",
                      }}
                    />
                    <div className="lab-case-media-index" aria-hidden>
                      {num}
                    </div>
                    <div className="lab-case-media-label">
                      <span>Video / Mockup</span>
                      <span aria-hidden>{c.tags[0]}</span>
                    </div>
                  </div>

                  <div className="lab-case-body">
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h2 className="lab-case-title">{c.title}</h2>

                    <p className="lab-case-summary">{c.summary}</p>

                    <div className="lab-case-meta">
                      <div className="lab-case-meta-row">
                        <span className="text-eyebrow text-white/40">
                          Domain
                        </span>
                        <span className="lab-case-meta-value">{c.domain}</span>
                      </div>

                      <div className="lab-case-meta-row">
                        <span className="text-eyebrow text-white/40">
                          Highlights
                        </span>
                        <div className="lab-case-pills">
                          {c.highlights.map((h) => (
                            <span key={h} className="lab-case-pill">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lab-case-meta-row">
                        <span className="text-eyebrow text-white/40">
                          Focus Areas
                        </span>
                        <div className="lab-case-pills">
                          {c.focusAreas.map((f) => (
                            <span key={f} className="lab-case-pill is-accent">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
