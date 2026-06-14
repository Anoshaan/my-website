"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Contact — the closing scene. The headline grows from 0.94 → 1 as the
 * section enters the viewport, so the page lands on a clear final beat.
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 32, 0]);

  return (
    <section
      ref={ref}
      className="section-pad text-center relative overflow-hidden"
      id="contact"
    >
      <Container
        size="default"
        className="flex flex-col items-center gap-8"
      >
        <motion.h2
          className="text-section text-white heading-sheen mx-auto"
          style={{ scale, y, maxWidth: "20ch" }}
        >
          Let&apos;s build something meaningful.
        </motion.h2>

        <Reveal delay={0.2}>
          <p className="text-body text-white/60 max-w-[58ch]">
            Whether you need to scale a design system, refine product
            interactions, or bring motion intelligence to your interfaces,
            let&apos;s start a conversation.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-4">
            <Button href="mailto:hello@anoshaan.com" variant="primary">
              hello@anoshaan.com
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
