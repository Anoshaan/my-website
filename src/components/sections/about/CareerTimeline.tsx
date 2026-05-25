"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";
import { GlowBorder } from "@/components/animations/GlowBorder";
import { ScrambledText } from "@/components/animations/ScrambledText";

/**
 * About — Section 3. Path through experience.
 * Two roles only: Aeturnum and Elegant Media. Spacious, premium,
 * easy to scan. Each card uses three concise high-impact points
 * instead of a long descriptive paragraph.
 */

type Role = {
  badge: string;
  company: string;
  role: string;
  period: string;
  highlight: string;
  points: string[];
};

const roles: Role[] = [
  {
    badge: "AE",
    company: "Aeturnum",
    role: "Lead UX Engineer",
    period: "2022 — Now",
    highlight: "Enterprise product systems",
    points: [
      "Lead UX and motion direction across enterprise platforms — design systems, AI-driven workflows, and large-scale product surfaces.",
      "Build scalable interaction frameworks and motion languages that hold up across multiple products and engineering teams.",
      "Partner with product, engineering, and leadership; integrate AI-assisted workflows into how design itself ships.",
    ],
  },
  {
    badge: "EM",
    company: "Elegant Media",
    role: "Senior Product Designer",
    period: "2017 — 2022",
    highlight: "200+ digital products",
    points: [
      "Designed end-to-end product experiences for clients across fintech, healthcare, logistics, and government platforms.",
      "Established interaction and visual standards that carried consistency across a high-volume agency portfolio.",
      "Worked directly across the full product lifecycle — research, system design, prototyping, and production hand-off.",
    ],
  },
];

export function CareerTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 68%"],
  });

  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          title="A path through enterprise UX."
          intro="Eight years across enterprise product, design systems, and motion craft — moving from a high-volume digital studio into deep, long-form product systems work."
        />

        <div ref={ref} className="about-timeline mt-14 lg:mt-16 max-w-[860px]">
          <div aria-hidden className="about-tl-track" />
          <motion.div
            aria-hidden
            className="about-tl-fill"
            style={{ scaleY: scrollYProgress }}
          />

          {roles.map((r, i) => (
            <Reveal
              key={r.company}
              delay={i * 0.06}
              className="about-tl-item"
            >
              <div className="about-tl-badge">{r.badge}</div>

              <div className="card-surface card-lift flex flex-col gap-5 p-7 md:p-8">
                <GlowBorder />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-eyebrow text-white/50">
                    {r.period}
                  </span>
                  <span className="lab-case-pill is-accent">
                    <ScrambledText radius={70} duration={750} speed={40}>
                      {r.highlight}
                    </ScrambledText>
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-card-title text-white">{r.role}</h3>
                  <p className="text-supporting text-white/45">
                    {r.company}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5 pt-1">
                  {r.points.map((p, j) => (
                    <li
                      key={j}
                      className="text-body text-white/62 flex gap-3"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.7em] h-[3px] w-[3px] flex-shrink-0 rounded-full bg-white/30"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
