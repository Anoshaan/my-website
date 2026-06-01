"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Container } from "@/components/ui/Container";
import { TypingText } from "@/components/animations/TypingText";
import { ScrambledText } from "@/components/animations/ScrambledText";
import { motion, useReducedMotion } from "motion/react";

/**
 * Lazy intro video — keeps a poster up until the section is near the
 * viewport, then mounts the real <video>.
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
 * Intro — section after the hero. Redesigned as a layered composition:
 *   - Section index badge ("01 / INTRO")
 *   - Ghost numeral "01" floating behind the heading
 *   - Mouse-tracked 3D micro-tilt on the video frame (desktop only)
 *   - Expertise items emerge with horizontal stagger
 */
export function Intro() {
  const sectionInView = true;
  const [typingInView, setTypingInView] = useState(false);
  const reduced = useReducedMotion();

  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setTypingInView(true), 280);
    return () => window.clearTimeout(id);
  }, []);

  // Mouse-tilt — translates pointer position into a small rotateX/rotateY
  // so the video frame reads as a 3D card without becoming literal.
  const onPointerMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = videoWrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    const rotX = (-dy * 7).toFixed(2);
    const rotY = (dx * 9).toFixed(2);
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
  };
  const onPointerLeave = () => {
    const el = videoWrapRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section className="relative overflow-hidden pt-[clamp(48px,6vw,96px)] pb-[clamp(96px,12vw,160px)]">
      {/* Soft accent halo behind the video column. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] max-w-[80vw] h-[600px] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(207, 217, 255, 0.06) 0%, transparent 60%)",
        }}
      />

      <Container>
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-[1.35fr_1fr] items-center perspective">
          {/* LEFT — copy */}
          <div className="relative flex flex-col justify-center">
            <motion.h2
              className="text-section text-white relative"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <span aria-hidden className="invisible">
                Hello, I&apos;m Anoshaan.
              </span>
              <span className="absolute inset-0">
                <TypingText
                  text="Hello, I'm Anoshaan."
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
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      sectionInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.55 + i * 0.06,
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

          {/* RIGHT — looping intro video with mouse-tracked 3D micro-tilt. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={
              sectionInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.94 }
            }
            transition={{ duration: 1, delay: 0.15, ease: easeOutExpo }}
            className="intro-video-frame mx-auto w-full max-w-[520px] aspect-square lg:max-w-none lg:aspect-auto lg:h-full lg:mx-0"
            onMouseMove={onPointerMove}
            onMouseLeave={onPointerLeave}
            style={{ perspective: 1400 }}
          >
            <div
              ref={videoWrapRef}
              className="tilt-target relative h-full w-full"
            >
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
