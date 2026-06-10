"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

/**
 * Mission Control — "What I Bring to the Table".
 *
 * Left column (sticky) shows the ACTIVE step as a large icon, title,
 * and body — all centered. Right column is a clean scrollable list of
 * step titles; as each title crosses the centre of the viewport it
 * becomes active and its detail appears on the left.
 */

type Step = {
  icon: AnimatedIconName;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    icon: "scan",
    title: "Decode the Vision",
    body: "Turning ideas, conversations, and ambitions into a clear product direction.",
  },
  {
    icon: "radar",
    title: "Learn the Landscape",
    body: "Understanding the market, industry, competitors, and the people who matter most.",
  },
  {
    icon: "structure",
    title: "Shape the Strategy",
    body: "Defining the roadmap, positioning, and opportunities that drive meaningful outcomes.",
  },
  {
    icon: "vector",
    title: "Build the Story",
    body: "Crafting brands, narratives, and identities that people remember.",
  },
  {
    icon: "network",
    title: "Accelerate with AI",
    body: "Rapid exploration, AI-assisted workflows, and high-fidelity concepts delivered at startup speed.",
  },
  {
    icon: "brain",
    title: "Design the Experience",
    body: "Transforming ideas into intuitive journeys, interfaces, and scalable product systems.",
  },
  {
    icon: "motion",
    title: "Bring It to Life",
    body: "Adding motion, interactions, and thoughtful details that make products feel alive.",
  },
  {
    icon: "flow",
    title: "Launch with Confidence",
    body: "Websites, pitch decks, one-pagers, case studies, and launch-ready assets.",
  },
  {
    icon: "scale",
    title: "Stay in Orbit",
    body: "Continuous support, iteration, and product evolution beyond launch.",
  },
];

/* ---------- Left visual — large icon + title + body, centered ------ */
function MissionVisual({ step, index }: { step: Step; index: number }) {
  return (
    <div className="mission-visual">
      <div className="mission-visual-halo" aria-hidden />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="mission-visual-inner"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -14,
            transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mission-visual-icon" aria-hidden>
            <AnimatedIcon name={step.icon} size="lg" />
          </span>
          <h3 className="mission-visual-title">{step.title}</h3>
          <p className="mission-visual-body">{step.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Right column — title only ---------- */
function StepTitle({
  step,
  index,
  onActivate,
}: {
  step: Step;
  index: number;
  onActivate: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    margin: "-45% 0px -45% 0px",
    amount: 0,
  });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <motion.div
      ref={ref}
      className={`mission-step ${inView ? "is-active" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="mission-step-node" aria-hidden />
      <h3 className="mission-step-title">{step.title}</h3>
    </motion.div>
  );
}

export function MissionControl() {
  const [active, setActive] = useState(0);

  return (
    <section className="mission-section section-pad relative">
      <Container size="wide">
        <Reveal>
          <div className="mission-head">
            <h2 className="text-section text-white heading-sheen max-w-[20ch]">
              What I Bring to the Table
            </h2>
            <p className="text-body text-white/65 max-w-[60ch] mt-5">
              Every project starts with understanding people — the founders,
              the business, and the customers. From discovery and strategy to
              design, storytelling, motion, and launch support, I help connect
              ideas with experiences that create lasting impact.
            </p>
          </div>
        </Reveal>

        <div className="mission-grid">
          {/* LEFT — sticky: active title + body */}
          <div className="mission-visual-wrap">
            <div className="mission-visual-sticky">
              <MissionVisual step={steps[active]} index={active} />
            </div>
          </div>

          {/* RIGHT — scroll-driven list of titles */}
          <div className="mission-steps">
            <div className="mission-track" aria-hidden />
            {steps.map((s, i) => (
              <StepTitle key={s.title} step={s} index={i} onActivate={setActive} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
