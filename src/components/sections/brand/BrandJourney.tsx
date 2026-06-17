"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Brand — Section 2. Brand creation journey. A flowing path with a
 * distinct crafted glyph per stage: idea → positioning → identity →
 * website/product → content → launch → scale. A gold line draws through the stages on
 * scroll and each glyph lights as it is reached. Cinematic, controlled;
 * static under reduced motion.
 */

type Stage = { name: string; line: string; glyph: ReactNode };

const G = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STAGES: Stage[] = [
  {
    name: "Idea",
    line: "A spark worth building around.",
    glyph: (
      <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="3.4" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="8" {...G} opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Positioning",
    line: "Where it stands, and who it's for.",
    glyph: (
      <svg viewBox="0 0 32 32">
        <line x1="16" y1="5" x2="16" y2="27" {...G} opacity="0.4" />
        <line x1="5" y1="16" x2="27" y2="16" {...G} opacity="0.4" />
        <circle cx="20" cy="12" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Identity",
    line: "The look, the voice, the feel.",
    glyph: (
      <svg viewBox="0 0 32 32">
        <rect x="6" y="7" width="9" height="9" rx="2" fill="currentColor" stroke="none" />
        <rect x="18" y="7" width="8" height="3" rx="1.5" {...G} />
        <rect x="18" y="13" width="8" height="3" rx="1.5" {...G} opacity="0.6" />
        <rect x="6" y="20" width="20" height="3" rx="1.5" {...G} opacity="0.45" />
      </svg>
    ),
  },
  {
    name: "Website / Product",
    line: "Where the brand becomes usable.",
    glyph: (
      <svg viewBox="0 0 32 32">
        <rect x="6" y="7" width="20" height="18" rx="2.5" {...G} />
        <line x1="6" y1="12" x2="26" y2="12" {...G} opacity="0.55" />
        <circle cx="9" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Content",
    line: "The stories that carry it.",
    glyph: (
      <svg viewBox="0 0 32 32">
        <rect x="7" y="6" width="18" height="20" rx="2.5" {...G} opacity="0.5" />
        <line x1="11" y1="12" x2="21" y2="12" {...G} />
        <line x1="11" y1="16" x2="21" y2="16" {...G} opacity="0.7" />
        <line x1="11" y1="20" x2="17" y2="20" {...G} opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Launch",
    line: "Out into the world.",
    glyph: (
      <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="6.5" {...G} opacity="0.55" />
        <circle cx="16" cy="16" r="11" {...G} opacity="0.28" />
      </svg>
    ),
  },
  {
    name: "Scale",
    line: "Growing it consistently.",
    glyph: (
      <svg viewBox="0 0 32 32">
        <line x1="9" y1="24" x2="9" y2="18" {...G} opacity="0.5" />
        <line x1="16" y1="24" x2="16" y2="13" {...G} opacity="0.75" />
        <line x1="23" y1="24" x2="23" y2="8" {...G} />
        <path d="M7 11 L14 14 L20 9 L25 6" {...G} opacity="0.6" />
      </svg>
    ),
  },
];

function JourneyStage({
  stage,
  index,
  total,
  progress,
  reduced,
}: {
  stage: Stage;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean | null;
}) {
  const point = index / (total - 1);
  const lit = useTransform(progress, [point - 0.06, point + 0.02], [0.25, 1]);
  const y = useTransform(progress, [point - 0.12, point + 0.04], [reduced ? 0 : 18, 0]);
  const opacity = useTransform(progress, [point - 0.12, point + 0.04], [0.2, 1]);

  return (
    <motion.div className="br-journey-stage" style={reduced ? undefined : { opacity, y }}>
      <motion.span
        className="br-journey-glyph"
        style={reduced ? { opacity: 1 } : { opacity: lit }}
      >
        {stage.glyph}
      </motion.span>
      <h3 className="br-journey-name">{stage.name}</h3>
      <p className="br-journey-line">{stage.line}</p>
    </motion.div>
  );
}

export function BrandJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-stack-head">
          <Reveal>
            <h2 className="text-section text-white heading-sheen br-h2">
              From idea to launch.
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="br-journey">
          <div className="br-journey-track" aria-hidden>
            <motion.span
              className="br-journey-fill"
              style={reduced ? { scaleX: 1 } : { scaleX: lineScale }}
            />
          </div>
          <div className="br-journey-stages">
            {STAGES.map((s, i) => (
              <JourneyStage
                key={s.name}
                stage={s}
                index={i}
                total={STAGES.length}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
