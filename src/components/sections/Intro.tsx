"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TypingText } from "@/components/animations/TypingText";
import { ScrambledText } from "@/components/animations/ScrambledText";
import { motion } from "motion/react";

/**
 * Lazy intro video — keeps a poster image up until the section
 * is within ~one viewport of being visible, then mounts the
 * <video>. Avoids fetching the mp4 (and its decode cost) during
 * the LCP window, which makes the hero text paint sooner on a
 * cold load.
 */
function LazyIntroVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // Defensive: any image or video error becomes a quiet state change
  // (falls back to the poster) instead of a window 'error' event that
  // the Next dev overlay surfaces as "[object Event]".
  return (
    <div ref={wrapRef} className="h-full w-full">
      {ready && !failed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/about/intro-poster.jpg"
          onError={() => setFailed(true)}
        >
          <source src="/about/intro.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/about/intro-poster.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

// Full discipline list — rendered as plain typographic labels (no
// bubble backgrounds). Wraps across multiple rows on narrower
// columns; never feels cluttered because the items have no chrome.
const expertise = [
  "Product Systems Design",
  "Associate UI/UX Lead",
  "Design Systems Architecture",
  "AI Experience Systems",
  "Motion & Interaction Design",
  "Frontend Experience Strategy",
  "UX Research",
  "Behavioral Design",
];

/**
 * Intro — section after the hero. Two columns: copy on the left
 * (introduction + expertise capsules), looping video on the right.
 *
 * Section reveal vs. typing reveal are deliberately decoupled:
 *  - `sectionInView` fires early (as the section starts entering)
 *    so the section content fades in calmly and never sits empty.
 *  - `typingInView` fires only when the heading is roughly at the
 *    *center* of the viewport, so the "Hello, I'm Anoshaan." typing
 *    plays as an intentional, cinematic moment — not on page load.
 */
export function Intro() {
  // Previously gated on `useInView` so the section + typing waited
  // for the heading to reach the viewport centre. Under Lenis ×
  // motion v11 that observer can fail to deliver, leaving the entire
  // section invisible. Trigger on mount instead; the typing still
  // plays after a short delay so it reads as deliberate.
  const sectionInView = true;
  const [typingInView, setTypingInView] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setTypingInView(true), 280);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
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
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.35fr_1fr] items-center">
          {/* Left — copy, vertically centred against the video on desktop */}
          <div className="flex flex-col justify-center">
            <motion.h2
              className="text-section text-white relative"
              // The heading itself is always visible (so the section
              // doesn't look broken until the user scrolls to it) —
              // only the typing inside it waits for the centre trigger.
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
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
                  // Slower, cinematic cadence — ~85ms/char ≈ 1.7s total.
                  speed={85}
                  delay={120}
                  active={typingInView}
                />
              </span>
            </motion.h2>

            <motion.p
              className="mt-5 font-medium tracking-tight text-white/70"
              style={{ fontSize: "clamp(1.15rem, 1.55vw, 1.55rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={
                sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
            >
              Product Systems Designer • Associate UI/UX Lead
            </motion.p>

            <motion.p
              className="mt-7 text-body text-white/60 max-w-[56ch]"
              initial={{ opacity: 0, y: 16 }}
              animate={
                sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.7, delay: 0.28, ease: easeOutExpo }}
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
              animate={
                sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.7, delay: 0.42, ease: easeOutExpo }}
            >
              <span className="text-eyebrow text-white/55 eyebrow-strong">
                Areas of Expertise
              </span>
              <div className="mt-5 flex flex-wrap items-center gap-x-[clamp(18px,2vw,32px)] gap-y-3">
                {expertise.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      sectionInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.55 + i * 0.08,
                      ease: easeOutExpo,
                    }}
                    className="expertise-item"
                  >
                    <ScrambledText radius={90} duration={900} speed={36}>
                      {tag}
                    </ScrambledText>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — looping intro video, scaled to fill its column
              height so it visually balances the left text block. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={
              sectionInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.94 }
            }
            transition={{ duration: 1, delay: 0.15, ease: easeOutExpo }}
            className="intro-video-frame mx-auto w-full max-w-[520px] aspect-square lg:max-w-none lg:aspect-auto lg:h-full lg:mx-0"
          >
            <div className="relative h-full w-full">
              <div aria-hidden className="about-video-glow absolute inset-0" />
              <div className="about-video intro-video-flip h-full w-full">
                <LazyIntroVideo />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
