"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { HeroParticles } from "@/components/sections/problem/HeroParticles";

const HERO_TITLE = "Designing product experiences shaped by human behavior.";

/* Small, subtle topic glyphs for the hero CTAs — same hairline stroke
   language as the button arrow so they read as part of the system. */
const LabsIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.35"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6.3 1.9h3.4M6.9 1.9v3.9L3.6 11.4a1.4 1.4 0 0 0 1.2 2.1h6.4a1.4 1.4 0 0 0 1.2-2.1L9.1 5.8V1.9" />
    <path d="M5.4 9.1h5.2" />
  </svg>
);

const BrandIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.35"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 1.7 13.6 4.9v6.2L8 14.3 2.4 11.1V4.9z" />
    <circle cx="8" cy="8" r="2.1" />
  </svg>
);

/**
 * Hero — a quiet, centered first impression. No imagery: the statement,
 * a single line of intent, and two calls to action. The title is
 * rendered as solid white type so it is unambiguously the strongest,
 * first thing the eye lands on — every ambient layer (galaxy, rays) is
 * kept low-contrast so nothing competes with the primary message.
 * A faint scroll parallax lets the title drift up slower than the body
 * copy, giving a subtle sense of depth as the user begins to scroll.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 1000);
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

  // Particles travel — instead of scrolling up with the hero section,
  // they travel down into the next section to blend with the workspace particles.
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0vh", reduced ? "0vh" : "60vh"]);
  const particlesScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.3]);
  
  // Fade out the hero particles exactly when the Figma mockup in the next section
  // scales down and moves to the right (between 105vh and 123vh of absolute scroll).
  const particlesOpacity = useTransform(scrollY, [vh * 1.05, vh * 1.23], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-x-clip perspective"
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
              <h1
                className="hero-title hero-title-shine max-w-[30ch] mx-auto"
                data-text={HERO_TITLE}
              >
                {HERO_TITLE}
              </h1>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: bodyY }}>
            <Reveal delay={0.18} duration={0.9}>
              <p className="text-body text-white/65 max-w-[54ch] mx-auto mt-6">
                <span className="hidden md:inline">
                  I design web, mobile, and AI product experiences that turn
                  complex ideas into clear, usable, scalable products. I combine
                  UX thinking, visual craft, motion, and product strategy to make
                  digital products that feel simple and human.
                </span>
                <span className="inline md:hidden">
                  I design intuitive web, mobile, and AI products. I combine UX,
                  visual craft, and motion to make complex ideas feel simple and human.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.3} duration={0.9}>
              <div className="hero-cta-row mt-9">
                <Button
                  href="/selected-work"
                  variant="primary"
                  tone="work"
                  leadingIcon={<LabsIcon />}
                >
                  View Selected Work
                </Button>
                <Button
                  href="/branding"
                  variant="primary"
                  tone="brand"
                  leadingIcon={<BrandIcon />}
                >
                  Build a Brand
                </Button>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll cue — a soft cloud of glowing particles drifting slowly near
          the bottom edge, in the same dot language as the next section's field.
          It does NOT fade with the hero: the particles actively travel downward 
          on scroll to lead the user into the workspace section below, merging 
          into one continuous depth field rather than vanishing. */}
      <motion.div 
        className="hero-particles-band" 
        style={{ y: particlesY, scale: particlesScale, opacity: particlesOpacity }}
        aria-hidden
      >
        <HeroParticles reduced={reduced} progress={scrollYProgress} />
      </motion.div>
    </section>
  );
}
