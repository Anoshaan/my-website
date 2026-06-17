"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Brand — Section 7. Brand support model. Three stages of support, with a
 * gold path growing from Starting to Scaling as you scroll. Editorial and
 * premium, never pricing cards. Static under reduced motion.
 */

const STAGES = [
  {
    name: "Starting",
    body: "Clarify the idea, define the direction, and create the first brand experience.",
  },
  {
    name: "Growing",
    body: "Build the website, product UI, launch assets, motion, content, and social presence.",
  },
  {
    name: "Scaling",
    body: "Create guidelines, templates, systems, and repeatable creative structure so the brand can grow consistently.",
  },
];

export function BrandSupport() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 75%"],
  });
  const grow = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-stack-head">
          <Reveal>
            <h2 className="text-section text-white heading-sheen br-h2">
              Support that grows with the brand.
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="br-support">
          <div className="br-support-track" aria-hidden>
            <motion.span
              className="br-support-grow"
              style={reduced ? { scaleX: 1 } : { scaleX: grow }}
            />
          </div>

          <div className="br-support-stages">
            {STAGES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1} className={`br-support-panel br-support-panel--${i}`}>
                <span className="br-support-node" aria-hidden />
                <span className="br-support-step">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="br-support-name">{s.name}</h3>
                <p className="br-support-body">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
