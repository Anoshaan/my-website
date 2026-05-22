"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { TypingText } from "@/components/animations/TypingText";
import { motion, useInView } from "motion/react";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const expertise = [
  "Lead UX Engineering",
  "Enterprise Product Design",
  "Design Systems Architecture",
  "AI Experience Systems",
  "Motion & Interaction Design",
  "Frontend Experience Strategy",
  "UX Research",
  "Behavioral Design",
];

/**
 * Intro — unified introduction section directly after the hero.
 * Merges the former "Hello, I'm Anoshaan" typing intro with the
 * "Lead UX Engineer" two-column layout: copy on the left, animated
 * visual on the right. Spacing is intentionally tight so the
 * transition out of the hero feels seamless.
 */
export function Intro() {
  const ref = useRef<HTMLElement>(null);
  // Plays once — the intro types itself out a single time and then holds,
  // so scrolling back through it never restarts or glitches the animation.
  // amount 0 + a positive bottom margin fires the reveal *as the section
  // starts entering the viewport* (even slightly before), so on mobile
  // the heading is never a blank gap waiting to type.
  const inView = useInView(ref, {
    once: true,
    amount: 0,
    margin: "0px 0px 14% 0px",
  });

  // "Hello, I'm Anoshaan." ≈ 20 chars · 40ms, no start delay ≈ 0.8s.
  const afterType = 0.95;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-[clamp(32px,5vw,72px)] pb-[clamp(76px,9vw,128px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] max-w-[80vw] h-[600px] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(207, 217, 255, 0.05) 0%, transparent 60%)",
        }}
      />

      <Container>
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-[1.6fr_1fr] items-center">
          {/* Left — copy */}
          <div className="flex flex-col">
            <motion.h2
              className="text-section text-white relative"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              {/* Invisible placeholder reserves the final size so the
                  typing animation never causes layout shift. */}
              <span aria-hidden className="invisible">
                Hello, I&apos;m Anoshaan.
              </span>
              <span className="absolute inset-0">
                <TypingText
                  text="Hello, I'm Anoshaan."
                  speed={40}
                  delay={0}
                  active={inView}
                />
              </span>
            </motion.h2>

            <motion.p
              className="mt-5 font-medium tracking-tight text-white/70"
              style={{ fontSize: "clamp(1.15rem, 1.55vw, 1.55rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: afterType, ease: easeOutExpo }}
            >
              Lead UX Engineer &amp; Senior Product Experience Designer
            </motion.p>

            <motion.p
              className="mt-7 text-body text-white/60 max-w-[56ch]"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.7,
                delay: afterType + 0.18,
                ease: easeOutExpo,
              }}
            >
              I design scalable digital systems that combine interface clarity,
              motion intelligence, and structured user experience thinking. From
              product strategy to production-ready interaction systems, I build
              experiences that solve real problems with precision, usability,
              and emotional intent.
            </motion.p>

            <motion.div
              className="mt-9 pt-7 border-t border-white/[0.07]"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.7,
                delay: afterType + 0.34,
                ease: easeOutExpo,
              }}
            >
              <span className="text-eyebrow text-white/40">
                Areas of Expertise
              </span>
              <div className="flex flex-wrap gap-2 mt-4">
                {expertise.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: afterType + 0.46 + i * 0.05,
                      ease: easeOutExpo,
                    }}
                    className="inline-flex items-center px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-supporting text-white/65 hover:text-white hover:border-white/[0.14] hover:bg-white/[0.05] transition-[color,border-color,background-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — animated visual (placeholder for future globe) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }
            }
            transition={{ duration: 1, delay: 0.15, ease: easeOutExpo }}
            className="relative aspect-square w-full max-w-[400px] mx-auto lg:ml-auto lg:mr-0"
          >
            <div
              aria-hidden
              className="absolute inset-[-8%] rounded-full border border-white/[0.08]"
              style={{ animation: "spin 80s linear infinite" }}
            />
            <div className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/[0.14] bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
              <div
                aria-hidden
                className="absolute inset-[12%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, color-mix(in oklab, #cfd9ff 70%, #fff) 0%, color-mix(in oklab, #cfd9ff 20%, #2a2f55) 50%, transparent 80%)",
                  filter: "blur(10px)",
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-[64px] h-[64px] rounded-full bg-black border border-white/[0.14] grid place-items-center text-2xl font-semibold text-white shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
              A
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
