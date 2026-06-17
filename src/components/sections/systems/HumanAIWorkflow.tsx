"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Systems — Section 3. Human + AI workflow. A two-sided interface: design
 * intent on the left, a human control / review gate in the middle, and
 * the generated product surface on the right. A design block travels
 * across, pauses at the review gate, and resolves into a clean UI on the
 * far side, while a return line shows the loop staying two-way. The
 * message: AI accelerates production, human judgment controls the
 * experience. Continuous CSS motion, frozen under reduced motion.
 */

const TRAITS = [
  "Figma + MCP",
  "Design-to-code",
  "AI prototyping",
  "Human review",
  "Local AI / LM Studio",
  "Controlled output",
];

function WorkflowStage() {
  return (
    <div className="sys-flow" aria-hidden>
      {/* Connecting track + return loop. */}
      <div className="sys-flow-track">
        <span className="sys-flow-return" />
        <span className="sys-flow-token" />
      </div>

      <div className="sys-flow-zones">
        <div className="sys-flow-zone sys-flow-zone--design">
          <span className="sys-flow-tag">Design intent</span>
          <div className="sys-flow-blocks">
            <span className="sys-flow-b sys-flow-b--w" />
            <span className="sys-flow-b sys-flow-b--m" />
            <span className="sys-flow-b sys-flow-b--s" />
            <span className="sys-flow-b sys-flow-b--m" />
          </div>
        </div>

        <div className="sys-flow-zone sys-flow-zone--review">
          <span className="sys-flow-tag">Human review</span>
          <div className="sys-flow-gate">
            <span className="sys-flow-gate-ring" />
            <svg viewBox="0 0 24 24" className="sys-flow-check">
              <path
                d="M5 12.5L10 17.5L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="sys-flow-zone sys-flow-zone--output">
          <span className="sys-flow-tag">Product output</span>
          <div className="sys-flow-ui">
            <span className="sys-flow-ui-bar" />
            <span className="sys-flow-ui-row" />
            <span className="sys-flow-ui-row sys-flow-ui-row--short" />
            <span className="sys-flow-ui-cta" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HumanAIWorkflow() {
  return (
    <section className="section-pad sys-section border-t border-white/[0.06]">
      <Container>
        <div className="sys-stack-head">
          <Reveal>
            <span className="section-label sys-eyebrow">Human + AI workflow</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-section text-white heading-sheen sys-h2">
              AI accelerates production. Judgment controls the experience.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-body text-white/60 sys-lead sys-lead--center">
              AI-assisted workflows move design to code faster, with Figma, MCP,
              and local models doing the heavy lifting in the background. Every
              output still passes a human review gate before it becomes the
              experience.
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade" duration={1} delay={0.1}>
          <WorkflowStage />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="sys-trait-row sys-trait-row--center">
            {TRAITS.map((t) => (
              <span key={t} className="sys-trait">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
