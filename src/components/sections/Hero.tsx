"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Hero — a quiet, centered first impression. No imagery, no calls to
 * action: just the statement and a single line of intent. The title is
 * rendered as solid white type so it is unambiguously the strongest,
 * first thing the eye lands on — every ambient layer (galaxy, rays) is
 * kept low-contrast so nothing competes with the primary message.
 * A faint scroll parallax lets the title drift up slower than the body
 * copy, giving a subtle sense of depth as the user begins to scroll.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax — title drifts up slower than the body copy. Magnitudes are
  // intentionally small so the effect reads as depth, never as motion.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -100]);
  // Galaxy depth drifts slowest of all — the parallax that sells the sense
  // of a deep, cinematic field sitting behind the type.
  const galaxyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);
  // Fade the hero out as it lifts away — gone by the time it's ~halfway
  // scrolled, handing the frame over to the rising workspace below.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden perspective"
    >
      {/* Hero galaxy — a premium, low-contrast depth field (nebula glow +
          fine stars) layered behind the type with a slow parallax. Masked
          to dissolve into transparency toward the bottom so it blends into
          the site-wide field with no hard cut into the next section. */}
      <motion.div
        aria-hidden
        className="hero-galaxy"
        style={reduced ? undefined : { y: galaxyY }}
      >
        <div className="hero-galaxy-glow" />
        <div className="hero-galaxy-stars" />
      </motion.div>

      {/* Ambient light rays — soft shafts falling from above the frame. */}
      <div className="hero-rays" aria-hidden />

      <motion.div style={{ opacity: heroOpacity }} className="w-full relative z-10">
        <Container
          size="default"
          className="flex flex-col items-center text-center py-14 md:py-20"
        >
          <motion.div style={{ y: titleY }}>
            <Reveal duration={0.9}>
              <h1 className="hero-title text-white max-w-[30ch] mx-auto">
                Designing Product Experiences Shaped by Human Behavior
              </h1>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: bodyY }}>
            <Reveal delay={0.18} duration={0.9}>
              <p className="text-body text-white/65 max-w-[52ch] mx-auto mt-6">
                Every product tells a story. This is where I share mine.
              </p>
            </Reveal>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator — no CTAs; the page itself is the invitation.
          Anchored to the section bottom, fading away with the hero. */}
      <motion.div style={{ opacity: heroOpacity }}>
        <Reveal delay={0.6} variant="fade" duration={1.2}>
          <div className="hero-scroll-hint" aria-hidden>
            <span className="hero-scroll-line" />
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
