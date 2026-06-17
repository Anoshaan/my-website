"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Systems — Section 5. From idea to product. A thin line traces a working
 * loop through six stages, each revealing one sharp sentence as the line
 * reaches it, then curves back from the last stage to the first to show
 * continuous improvement. Scroll-scrubbed line draw + node activation;
 * static under reduced motion.
 */

type Stage = { name: string; line: string };

const STAGES: Stage[] = [
  { name: "Understand", line: "Learn the people, the problem, and the constraints." },
  { name: "Structure", line: "Shape the system and information before the screens." },
  { name: "Design", line: "Make it clear, accessible, and intentional." },
  { name: "Build", line: "Ship clean front-end, accelerated by AI where it helps." },
  { name: "Test", line: "Validate with real users and measurable signals." },
  { name: "Improve", line: "Feed what we learn back into the system." },
];

function StageNode({
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
  const lit = useTransform(progress, [point - 0.06, point + 0.02], [0, 1]);
  const opacity = useTransform(progress, [point - 0.12, point + 0.04], [0.3, 1]);
  const y = useTransform(progress, [point - 0.12, point + 0.04], [reduced ? 0 : 16, 0]);

  return (
    <motion.div
      className="sys-loop-stage"
      style={reduced ? undefined : { opacity, y }}
    >
      <motion.span
        className="sys-loop-node"
        style={reduced ? { opacity: 1 } : { opacity: lit }}
        aria-hidden
      />
      <span className="sys-loop-index">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="sys-loop-name">{stage.name}</h3>
      <p className="sys-loop-line">{stage.line}</p>
    </motion.div>
  );
}

export function ProductLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section className="section-pad sys-section border-t border-white/[0.06]">
      <Container>
        <div className="sys-stack-head">
          <Reveal>
            <h2 className="text-section text-white heading-sheen sys-h2">
              One loop, run continuously.
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="sys-loop">
          <div className="sys-loop-track" aria-hidden>
            <motion.span
              className="sys-loop-fill"
              style={reduced ? { scaleX: 1 } : { scaleX: lineScale }}
            />
          </div>

          <div className="sys-loop-stages">
            {STAGES.map((s, i) => (
              <StageNode
                key={s.name}
                stage={s}
                index={i}
                total={STAGES.length}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </div>

          <div className="sys-loop-return" aria-hidden>
            <svg viewBox="0 0 100 12" preserveAspectRatio="none">
              <path
                className="sys-loop-return-path"
                d="M97 1 C97 9, 88 11, 50 11 C12 11, 3 9, 3 1"
                fill="none"
              />
            </svg>
            <span className="sys-loop-return-label">Continuous improvement</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
