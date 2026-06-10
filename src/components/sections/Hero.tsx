"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import ShinyText from "@/components/animations/ShinyText";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Hero — a quiet, centered first impression. No imagery, no calls to
 * action: just the statement and a single line of intent, with a slow
 * silver shine drifting across the title for a premium, restrained feel.
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
  // Fade the hero out as it lifts away — gone by the time it's ~halfway
  // scrolled, handing the frame over to the rising workspace below.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden perspective"
    >
      {/* Layered depth — a centered radial wash behind the title. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, rgba(207, 217, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div style={{ opacity: heroOpacity }} className="w-full relative z-10">
        <Container
          size="default"
          className="flex flex-col items-center text-center py-14 md:py-20"
        >
          <motion.div style={{ y: titleY }}>
            <Reveal duration={0.9}>
              <h1 className="hero-title text-white max-w-[30ch] mx-auto">
                <ShinyText
                  text="Designing Product Experiences Shaped by Human Behavior"
                  color="#b9b9c2"
                  shineColor="#ffffff"
                  speed={5}
                  spread={100}
                  delay={1}
                />
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
    </section>
  );
}
