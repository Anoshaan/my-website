"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

const principles: { icon: AnimatedIconName; title: string; body: string }[] = [
  {
    icon: "brain",
    title: "Human-Centered Thinking",
    body: "Understanding user intent, cognitive load, and interaction friction to design intuitive experiences.",
  },
  {
    icon: "scale",
    title: "Systems & Scalability",
    body: "Building modular design foundations that support product growth and consistency.",
  },
  {
    icon: "network",
    title: "AI-Assisted Workflows",
    body: "Using AI strategically across ideation, prototyping, and workflow acceleration.",
  },
  {
    icon: "motion",
    title: "Motion & Interaction",
    body: "Designing purposeful animations and responsive interactions that improve usability.",
  },
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

function NumberedRow({
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
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const shifted = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.85, ease: easeOutExpo }}
      className={`numbered-row ${shifted ? "is-shifted" : ""}`}
    >
      {/* LEFT — ghost numeral */}
      <div className="relative flex items-start justify-start gap-4 sm:gap-6">
        <span className="ghost-numeral-sm">{num}</span>
        <span className="hidden md:inline-flex pt-3">
          <AnimatedIcon name={icon} />
        </span>
      </div>

      {/* RIGHT — title + body */}
      <div className="flex flex-col gap-3 max-w-[58ch]">
        <span className="md:hidden">
          <AnimatedIcon name={icon} />
        </span>
        <h3 className="text-card-title text-white text-[clamp(1.25rem,2vw,1.6rem)]">
          {title}
        </h3>
        <p className="text-body text-white/62">{body}</p>
      </div>
    </motion.div>
  );
}

export function DesignPrinciples() {
  return (
    <section className="section-pad relative">
      <Container>
        <div className="mb-[clamp(40px,5vw,72px)]">
          <SectionTitle
            title="Design Principles Behind Every Product"
            intro="Every product decision should solve a real human problem while supporting long-term scalability. My process blends behavioral UX, systems thinking, and rapid iteration to create experiences that remain useful as products evolve."
          />
        </div>

        <div className="relative">
          {principles.map((p, i) => (
            <NumberedRow
              key={p.title}
              index={i}
              icon={p.icon}
              title={p.title}
              body={p.body}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
