"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

const steps: { icon: AnimatedIconName; title: string; body: string }[] = [
  {
    icon: "radar",
    title: "Discover",
    body: "Exploring the problem space through stakeholder conversations, product context, and user behavior analysis to align on outcomes before any solution work begins.",
  },
  {
    icon: "scan",
    title: "Research",
    body: "Mapping user needs, pain points, and mental models through qualitative and quantitative methods to ground every design decision in real behavior.",
  },
  {
    icon: "structure",
    title: "Structure",
    body: "Defining information architecture, user flows, and interaction patterns that support the product vision and reduce cognitive friction at every step.",
  },
  {
    icon: "vector",
    title: "Design",
    body: "Crafting high-fidelity interfaces, motion systems, and component structures grounded in research, systems thinking, and production-ready standards.",
  },
  {
    icon: "collaborate",
    title: "Collaborate",
    body: "Working alongside engineers, product managers, and stakeholders to refine, validate, and align the solution across disciplines at every stage.",
  },
  {
    icon: "flow",
    title: "Deliver",
    body: "Shipping production-ready specifications, design systems, and handoff documentation built for clean implementation and long-term maintainability.",
  },
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

function Step({
  index,
  icon,
  title,
  body,
}: {
  index: number;
  icon: AnimatedIconName;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const isRight = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: isRight ? 50 : -50,
        rotateY: isRight ? -8 : 8,
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, rotateY: 0 }
          : { opacity: 0, x: isRight ? 50 : -50, rotateY: isRight ? -8 : 8 }
      }
      transition={{ duration: 0.9, ease: easeOutExpo }}
      className={`process-row ${isRight ? "is-right" : "is-left"}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="process-row-numeral">{num}</div>
      <div className="process-row-body">
        <div className="flex items-center gap-3">
          <AnimatedIcon name={icon} />
          <h3 className="text-card-title text-white text-[clamp(1.3rem,2.2vw,1.8rem)]">
            {title}
          </h3>
        </div>
        <p className="text-body text-white/62 max-w-[44ch]">{body}</p>
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    <section className="section-pad relative">
      <Container>
        <div className="mb-[clamp(40px,5vw,80px)]">
          <SectionTitle title="How I Approach Product Design" />
        </div>

        <div className="process-track perspective">
          {steps.map((s, i) => (
            <Step
              key={s.title}
              index={i}
              icon={s.icon}
              title={s.title}
              body={s.body}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
