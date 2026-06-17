"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Brand — Section 5. Motion, 3D, and visual depth. A motion stage: a
 * product card floats with subtle depth, motion-path lines trace around
 * it, and small looping shapes drift. The card eases slightly forward and
 * back as you scroll, and tilts on hover (desktop only). Soft gold
 * highlights, premium not flashy. Static under reduced motion.
 */

const TRAITS = ["GSAP", "Lottie", "Scroll storytelling", "3D product visuals", "Cinematic web"];

export function MotionDepth() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slight forward/back travel through the section.
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [reduced ? 0 : 40, 0, reduced ? 0 : -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-stack-head">
          <Reveal>
            <span className="section-label br-eyebrow">Motion, 3D, and depth</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-section text-white heading-sheen br-h2">
              Movement that supports clarity and emotion.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-body text-white/60 br-lead br-lead--center">
              The craft layer: scroll storytelling, micro-interactions, 3D
              product moments, and cinematic web detail, used to make a product
              feel considered, never just to show off.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="br-stage">
          {/* Motion path lines + looping shapes. */}
          <svg className="br-stage-paths" viewBox="0 0 400 260" aria-hidden>
            <path className="br-stage-path" d="M20 200 C 120 200, 120 60, 220 60 S 360 40, 384 44" />
            <path className="br-stage-path br-stage-path--2" d="M16 80 C 100 80, 120 200, 220 200 S 360 210, 388 206" />
          </svg>
          <span className="br-stage-shape br-stage-shape--ring" aria-hidden />
          <span className="br-stage-shape br-stage-shape--dot" aria-hidden />
          <span className="br-stage-shape br-stage-shape--bar" aria-hidden />

          {/* Floating product card. */}
          <div className="br-stage-card-wrap">
            <motion.div
              className="br-stage-card"
              style={reduced ? undefined : { y, scale }}
            >
              <div className="br-stage-card-glow" aria-hidden />
              <div className="br-stage-card-top">
                <span className="br-stage-card-badge" />
                <span className="br-stage-card-title" />
              </div>
              <div className="br-stage-card-body">
                <span className="br-stage-card-line" />
                <span className="br-stage-card-line br-stage-card-line--short" />
                <div className="br-stage-card-foot">
                  <span className="br-stage-card-cta" />
                  <span className="br-stage-card-pill" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="br-trait-row br-trait-row--center">
            {TRAITS.map((t) => (
              <span key={t} className="br-trait">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
