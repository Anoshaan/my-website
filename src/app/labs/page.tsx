import type { CSSProperties } from "react";
import ShinyText from "@/components/animations/ShinyText";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { LabEntryVisual } from "@/components/labs/LabEntryVisual";
import { labEntries } from "@/lib/labs-entries";

export const metadata = {
  title: "Design Labs",
  description:
    "Real-world product challenges, design decisions, and lessons learned across enterprise systems, analytics, commerce, and emerging technology.",
};

/**
 * Labs — a design journal rather than a portfolio gallery. Each project is
 * one large editorial spread (visual-dominant, alternating sides) that
 * frames a challenge, tells a short story, and lands on a single takeaway.
 * The page itself is the case-study experience — no cards, no per-project
 * "view case study" buttons.
 */
export default function LabsPage() {
  return (
    <>
      {/* ── Editorial header ─────────────────────────────── */}
      <section className="pt-[clamp(140px,16vw,200px)] pb-[clamp(48px,7vw,88px)]">
        <Container>
          <div className="flex flex-col gap-6 max-w-[940px]">
            <Reveal delay={0.05}>
              <span className="text-eyebrow eyebrow-strong text-accent-soft">
                Design Labs
              </span>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="text-hero text-white labs-head-title">
                <ShinyText
                  text="Lessons learned through building digital products."
                  color="#d6d6da"
                  shineColor="#ffffff"
                  speed={6}
                  spread={115}
                  delay={1.6}
                />
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body text-white/65 max-w-[62ch]">
                Real-world challenges, design decisions, and product thinking
                across enterprise systems, analytics, commerce, and emerging
                technology.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Editorial spreads ────────────────────────────── */}
      <section className="pb-[clamp(96px,12vw,176px)]">
        <Container size="wide">
          <div className="labs-entries">
            {labEntries.map((entry, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal
                  key={entry.title}
                  as="article"
                  variant="up"
                  amount={0.12}
                  duration={0.7}
                  className={`lab-entry${reversed ? " is-reversed" : ""}`}
                >
                  <div
                    className="lab-entry-visual"
                    style={{ "--entry-accent": entry.accent } as CSSProperties}
                  >
                    <LabEntryVisual visual={entry.visual} title={entry.title} />
                  </div>

                  <div
                    className="lab-entry-content"
                    style={{ "--entry-accent": entry.accent } as CSSProperties}
                  >
                    <span className="lab-entry-kicker">Lab {entry.index}</span>

                    <p className="lab-challenge">{entry.challenge}</p>

                    <h2 className="lab-entry-title">{entry.title}</h2>

                    <div className="lab-story">
                      {entry.story.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>

                    <div className="lab-bottom">
                      <div className="lab-col">
                        <span className="lab-col-label">What Changed</span>
                        <ul className="lab-changed-list">
                          {entry.whatChanged.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="lab-col">
                        <span className="lab-col-label">Key Insight</span>
                        <div className="lab-insight">
                          {entry.keyInsight.map((line, k) => (
                            <p key={k}>{line}</p>
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
