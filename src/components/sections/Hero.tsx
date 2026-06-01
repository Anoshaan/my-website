"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import ShinyText from "@/components/animations/ShinyText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Hero — layered scroll parallax. The title moves slower than the body
 * copy, which moves slower than the CTAs, creating a sense of depth as
 * the user begins to scroll. A faint outlined word sits in the
 * background as a brand mark.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax — title drifts up slowest, ctas fastest. Magnitudes are
  // intentionally small so the effect reads as depth, never as motion.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -110]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.55]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden perspective"
    >
      {/* Layered depth — three radial washes at different scales. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 55%, rgba(207, 217, 255, 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="hero-aura pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[850px] max-w-[90vw] h-[400px] rounded-full"
        style={{
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.05), transparent)",
          filter: "blur(140px)",
        }}
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full"
      >
        <Container
          size="default"
          className="flex flex-col items-center text-center py-24"
        >
          <motion.div style={{ y: titleY }}>
            <Reveal duration={0.9}>
              <h1 className="text-hero text-white max-w-[22ch] mx-auto">
                <ShinyText
                  text="Designing Product Experiences That Scale With Human Behavior"
                  color="#d6d6da"
                  shineColor="#ffffff"
                  speed={6}
                  spread={115}
                  delay={1.6}
                />
              </h1>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: bodyY }}>
            <Reveal delay={0.18} duration={0.9}>
              <p className="text-body text-white/65 max-w-[58ch] mx-auto mt-6">
                I design enterprise-grade digital experiences across web,
                mobile, and AI-driven platforms — combining behavioral UX,
                scalable systems, motion, and frontend thinking to create
                products that feel intuitive, fast, and deeply human.
              </p>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: ctaY }}>
            <Reveal delay={0.32} duration={0.9}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10">
                <Button href="/labs" variant="primary">
                  View Case Studies
                </Button>
                <Button
                  href="/systems"
                  variant="ghost"
                  trailingIcon={null}
                  rainbow={false}
                >
                  Explore Systems
                </Button>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </motion.div>

    </section>
  );
}
