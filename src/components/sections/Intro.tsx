"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { TypingText } from "@/components/animations/TypingText";
import { motion, useInView } from "motion/react";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  // Re-triggers each time the section enters viewport
  const inView = useInView(ref, { amount: 0.4, margin: "0px 0px -10% 0px" });

  // Estimate typing duration so subs fade in right after: speed 75ms * ~22 chars ≈ 1.7s
  const subBase = 1.9;

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <Container size="narrow" className="flex flex-col items-center text-center gap-10">
        <motion.h2
          className="text-section text-white"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <TypingText
            text="Hello, I'm Anoshaan."
            speed={75}
            delay={150}
            active={inView}
          />
        </motion.h2>

        <motion.p
          className="text-body text-white/70 max-w-[62ch]"
          initial={{ opacity: 0, y: 18 }}
          animate={
            inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{
            duration: 0.8,
            delay: subBase,
            ease: easeOutExpo,
          }}
        >
          I help startups, ISVs, and enterprise teams transform complex ideas
          into scalable digital experiences.
        </motion.p>

        <motion.p
          className="text-body text-white/60 max-w-[62ch]"
          initial={{ opacity: 0, y: 18 }}
          animate={
            inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{
            duration: 0.8,
            delay: subBase + 0.35,
            ease: easeOutExpo,
          }}
        >
          My work focuses on simplifying high-friction interactions, building
          adaptive design systems, and creating products that balance
          usability, performance, and emotional clarity.
        </motion.p>
      </Container>
    </section>
  );
}
