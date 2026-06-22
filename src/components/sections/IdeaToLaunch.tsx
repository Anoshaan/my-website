"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
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

/** Subtle pen-nib mark — reads as design / brand craft, sits quietly before the label. */
function BrandMarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20.5 6 15 16 5l3 3L9 18l-5 2.5Z" />
      <path d="m14 7 3 3" />
      <path d="m6 15 3 3" />
    </svg>
  );
}

export function IdeaToLaunch() {
  const { time, activeStep, seekToStep, animationRef, pause, resume } =
    useProcessTimeline();

  return (
    <section id="idea-to-launch" className="relative py-[clamp(72px,9vw,128px)]">
      <Container size="wide">
        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-x-[clamp(32px,4.5vw,96px)] gap-y-[clamp(36px,5vw,52px)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          {/* LEFT — content + process nav + CTA */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="section-label mb-3">Process</p>
              <h2 className="heading-sheen text-[clamp(1.9rem,3.2vw,2.85rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
                From first idea to launch, faster with AI
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="text-body text-white/60 max-w-[46ch]">
                I guide the full product journey: shaping the idea, designing the
                experience, building fast prototypes, supporting dev, and
                preparing the product for launch.
              </p>
            </Reveal>

            {/* Nine process stops — typographic nav, no numbers, no box. The
                active stop grows with a soft pop; the rest stay calm. */}
            <Reveal delay={0.1}>
              <ul className="-ml-0.5 flex flex-col">
                {STEPS.map((s, i) => {
                  const active = i === activeStep;
                  return (
                    <li key={s.title} className="leading-none">
                      <button
                        type="button"
                        onClick={() => seekToStep(i)}
                        aria-current={active ? "step" : undefined}
                        className="group/step block rounded-md py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-[rgba(245,166,35,0.5)]"
                      >
                        <motion.span
                          className={cn(
                            "inline-block origin-left text-[1.05rem] font-medium tracking-tight transition-colors duration-500 will-change-transform",
                            active
                              ? "text-white"
                              : "text-white/40 group-hover/step:text-white/70"
                          )}
                          animate={{ scale: active ? 1.13 : 1 }}
                          transition={{ type: "spring", stiffness: 480, damping: 17 }}
                        >
                          {s.title}
                        </motion.span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div>
                <Button
                  href="/brand"
                  variant="secondary"
                  leadingIcon={<BrandMarkIcon />}
                >
                  Build a Brand With Me
                </Button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — large visual + changing, right-aligned description */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.12} amount={0.05} className="w-full">
              <div
                ref={animationRef}
                role="img"
                aria-label="Animated walkthrough of the product process: client idea, research, competitors, UX flow, AI prototype, front-end build, dev and QA, launch prep, and launched product."
                className="relative mx-auto w-full max-w-[860px]"
                style={{ aspectRatio: "16 / 9" }}
              >
                <ProductProcessAnimation time={time} />
              </div>
            </Reveal>

            {/* Hovering this area pauses autoplay so the copy can be read. */}
            <div
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="w-full lg:ml-auto lg:max-w-[46ch] lg:text-right"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStep}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                  className="text-body text-white/55"
                >
                  {STEPS[activeStep].sub}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
