"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Next Mission — closing scene. Calm, centered, cinematic. Soft
 * atmospheric purple wash, sparse stars, no hard shapes or rings.
 * One CTA. Headline rises + scales gently on entrance.
 */
export function NextMission() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [reduced ? 0 : 28, 0]
  );
  const headingScale = useTransform(
    scrollYProgress,
    [0, 0.6],
    [reduced ? 1 : 0.96, 1]
  );

  return (
    <section
      ref={ref}
      id="contact"
      className="next-mission-section section-pad text-center"
    >
      {/* Atmosphere — a single soft purple aura that fades smoothly into
          the page background. Stars are handled globally by the fixed
          GalaxyBackground, so this section only adds the closing glow. */}
      <div className="next-mission-aura" aria-hidden />

      <Container size="default" className="next-mission-content">
        <motion.h2
          className="text-section text-white heading-sheen next-mission-title"
          style={{ y: headingY, scale: headingScale }}
        >
          I&apos;m Ready for the Next Mission.
        </motion.h2>

        <Reveal delay={0.2}>
          <p className="text-body text-white/65 next-mission-body">
            Whether you&apos;re building a new product, refining an existing
            experience, or exploring an ambitious idea, I&apos;d love to hear
            about it. Let&apos;s turn conversations into meaningful products.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="next-mission-cta-wrap rainbow-shadow">
            <a
              href="mailto:hello@anoshaan.com"
              className="next-mission-cta btn-glass"
              data-cursor-precise
            >
              Start a Conversation
              <svg
                viewBox="0 0 14 14"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
