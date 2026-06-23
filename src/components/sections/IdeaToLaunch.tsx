"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";
import { STEPS, useProcessTimeline } from "./idea-to-launch/timeline";

/**
 * IdeaToLaunch — "From first idea to launch, faster with AI".
 *
 * Full-width two-column section, native to the site (no card, no frame, no
 * progress bar). Left: heading, supporting line, the nine process stops as a
 * typographic nav, and the standard site CTA. Right: the large looping visual
 * with a changing, right-aligned description below it.
 *
 * One playhead (useProcessTimeline) drives everything: the visual auto-advances
 * (slowly, so each stage can be read) while on screen, the active stop grows
 * with a soft pop, clicking a stop seeks straight to it, and hovering the
 * description pauses autoplay. The renderer is controlled (takes `time`) and
 * loaded client-only — it relies on rAF / ResizeObserver.
 */
const ProductProcessAnimation = dynamic(
  () => import("./idea-to-launch/animation"),
  { ssr: false, loading: () => <div className="absolute inset-0" aria-hidden /> }
);

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function IdeaToLaunch() {
  const { time, activeStep, seekToStep, animationRef, pause, resume } =
    useProcessTimeline();

  return (
    <section
      id="idea-to-launch"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-[clamp(40px,6vh,80px)]"
    >
      <Container size="wide">
        <div className="mx-auto grid w-full max-w-[2100px] items-center gap-x-[clamp(32px,4.5vw,112px)] gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          {/* LEFT — header + the nine process categories. Sits above the
              animation (z-20) so the oversized visual can bleed behind it
              without ever covering the heading or the category list. */}
          <div className="relative z-20 flex flex-col">
            <Reveal>
              <p className="section-label mb-2.5">Process</p>
              <h2 className="text-section heading-sheen max-w-[15ch]">
                From first idea to launch, faster with AI
              </h2>
              <p className="text-body text-white/60 mt-3 max-w-[44ch] text-[0.95rem] leading-relaxed">
                I guide the full product journey: shaping the idea, designing the
                experience, building fast prototypes, supporting dev, and
                preparing for launch.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="-ml-0.5 mt-[clamp(16px,2.4vh,28px)] flex flex-col">
                {STEPS.map((s, i) => {
                  const active = i === activeStep;
                  return (
                    <li key={s.title} className="leading-none">
                      <button
                        type="button"
                        onClick={() => seekToStep(i)}
                        aria-current={active ? "step" : undefined}
                        className="group/step block rounded-md py-[3px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[rgba(245,166,35,0.5)]"
                      >
                        <motion.span
                          className={cn(
                            "inline-block origin-left font-medium tracking-tight transition-colors duration-500 will-change-transform",
                            active
                              ? "text-white"
                              : "text-white/35 group-hover/step:text-white/70"
                          )}
                          animate={{
                            fontSize: active ? "1.7rem" : "0.98rem",
                            opacity: active ? 1 : 0.85,
                          }}
                          transition={{ type: "spring", stiffness: 420, damping: 22 }}
                        >
                          {s.title}
                        </motion.span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — the animation as an oversized background visual layer, with
              the active step description floating on top of it. */}
          <Reveal delay={0.12} amount={0.05} className="w-full">
            <div className="relative mx-auto w-full max-w-[1340px]">
              {/* Stage — a tall, viewport-relative panel. The visual is scaled
                  up well past the frame so the scene fills the space and the
                  empty canvas margins crop away (the section clips them). */}
              <div className="relative h-[clamp(360px,62vh,600px)]">
                <div
                  ref={animationRef}
                  role="img"
                  aria-label="Animated walkthrough of the product process: client idea, research, competitors, UX flow, AI prototype, front-end build, dev and QA, launch prep, and launched product."
                  className="absolute inset-0 origin-center scale-[1.55] md:scale-[1.75]"
                >
                  <ProductProcessAnimation time={time} />
                </div>

                {/* Active step description — clean right-aligned text floating
                    over the lower portion of the visual (no card / pill / box).
                    A soft text-shadow keeps it legible on the animation.
                    Hovering pauses only the text switching; the visual keeps
                    animating via its ambient clock. */}
                <div
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                  className="absolute inset-x-0 bottom-0 z-10 flex justify-end p-[clamp(10px,1.6vw,22px)]"
                >
                  <div className="idea-desc max-w-[50ch] text-right">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeStep}
                        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                        transition={{ duration: 0.45, ease: easeOutExpo }}
                        className="idea-desc-text"
                      >
                        {STEPS[activeStep].sub}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
