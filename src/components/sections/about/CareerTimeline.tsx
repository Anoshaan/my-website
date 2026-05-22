"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About — Section 3. Premium vertical career timeline.
 * A faint rail runs the full height; an accent fill scales with
 * scroll progress through the section. Each role is a glass card
 * with a monogram badge sitting on the rail.
 */

type Role = {
  badge: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  highlight: string;
};

const roles: Role[] = [
  {
    badge: "IP",
    company: "Independent Practice",
    role: "Lead UX Engineer",
    period: "2024 — Now",
    summary:
      "Partnering with startups, ISVs, and enterprise teams on AI experiences, fintech platforms, and design systems — from product strategy through production-ready interaction systems.",
    highlight: "End-to-end ownership across 6+ platforms",
  },
  {
    badge: "HL",
    company: "Halcyon Labs",
    role: "Senior Product Experience Designer",
    period: "2021 — 2024",
    summary:
      "Led product experience design across two flagship products and established the company's first design system from the ground up.",
    highlight: "Built the founding design system",
  },
  {
    badge: "AL",
    company: "Aurora Labs",
    role: "Product Designer",
    period: "2019 — 2021",
    summary:
      "Owned end-to-end design on consumer-facing financial products, balancing regulatory constraints with everyday usability.",
    highlight: "200K+ active users served",
  },
  {
    badge: "NW",
    company: "Northwind",
    role: "Interaction Designer",
    period: "2017 — 2019",
    summary:
      "Designed motion systems and interaction patterns across the company's web and mobile product suite.",
    highlight: "Defined the product motion language",
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
          title="A path through enterprise UX"
          intro="Eight years moving between product design, design systems, and frontend craft — across enterprise, fintech, and AI-driven platforms."
        />

        <div ref={ref} className="about-timeline mt-14 lg:mt-16 max-w-[820px]">
          <div aria-hidden className="about-tl-track" />
          <motion.div
            aria-hidden
            className="about-tl-fill"
            style={{ scaleY: scrollYProgress }}
          />

          {roles.map((r, i) => (
            <Reveal
              key={r.company}
              delay={i * 0.05}
              className="about-tl-item"
            >
              <div className="about-tl-badge">{r.badge}</div>

              <div className="card-surface card-lift flex flex-col gap-3 p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-eyebrow text-white/50">
                    {r.period}
                  </span>
                  <span className="lab-case-pill is-accent">
                    {r.highlight}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-card-title text-white">{r.role}</h3>
                  <p className="text-supporting text-white/45">
                    {r.company}
                  </p>
                </div>

                <p className="text-body text-white/62">{r.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
