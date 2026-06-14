"use client";

import { useEffect, useRef } from "react";
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
 * One CTA. Headline rises + scales gently on entrance. When the
 * journey nears its end the page magnetically settles on the final
 * frame (CTA centered, footer anchored beneath — nothing after it).
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

  // Magnetic settle — once the closing scene is mostly in frame and the
  // user pauses, glide the page to its final resting frame so the CTA
  // centres and the footer completes the story.
  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    let snapping = false;

    const snap = () => {
      if (snapping) return;
      const lenis = window.__lenis;
      const el = ref.current;
      if (!lenis || !el) return;
      const end =
        document.documentElement.scrollHeight - window.innerHeight;
      const rect = el.getBoundingClientRect();
      // Only when the section owns most of the frame and we're not
      // already resting at the end.
      const remaining = end - window.scrollY;
      if (rect.top > window.innerHeight * 0.45) return;
      if (remaining < 6 || remaining > window.innerHeight * 0.6) return;
      snapping = true;
      lenis.scrollTo(end, {
        duration: 0.85,
        easing: (x: number) => 1 - Math.pow(1 - x, 3),
        lock: true,
        onComplete: () => {
          snapping = false;
        },
      });
    };

    const onScroll = () => {
      if (snapping) return;
      clearTimeout(timer);
      timer = setTimeout(snap, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="contact"
      className="next-mission-section text-center"
    >
      {/* Atmosphere — a single soft purple aura that fades smoothly into
          the page background. Stars are handled globally by the fixed
          GalaxyBackground, so this section only adds the closing glow. */}
      <div className="next-mission-aura" aria-hidden />

      <Container size="default" className="next-mission-content">
        <Reveal>
          <p className="next-mission-eyebrow">Contact</p>
        </Reveal>

        <motion.h2
          className="text-section text-white next-mission-title"
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
