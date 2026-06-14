"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About — Section 3. Path through experience.
 * Two roles only: Aeturnum and Elegant Media. Spacious, premium,
 * easy to scan. Each card uses three concise high-impact points
 * and shows the employer's logo in the tag area.
 */

type Role = {
  badge: string;
  company: string;
  role: string;
  period: string;
  logo: { src: string; alt: string; width: number; height: number };
  points: string[];
};

const roles: Role[] = [
  {
    badge: "AE",
    company: "Aeturnum",
    role: "Associate UI/UX Lead",
    period: "October 2021 – Present",
    logo: {
      src: "/logos/aeturnum.png",
      alt: "Aeturnum",
      width: 132,
      height: 24,
    },
    points: [
      "Lead UX and motion direction across enterprise platforms: design systems, AI-driven workflows, and large-scale product surfaces.",
      "Build scalable interaction frameworks and motion languages that hold up across multiple products and engineering teams.",
      "Partner with product, engineering, and leadership; integrate AI-assisted workflows into how design itself ships.",
    ],
  },
  {
    badge: "EM",
    company: "Elegant Media",
    role: "Senior UI/UX Engineer",
    period: "September 2018 – October 2021",
    logo: {
      src: "/logos/elegant-media.png",
      alt: "Elegant Media",
      width: 148,
      height: 24,
    },
    points: [
      "Designed end-to-end product experiences for clients across fintech, healthcare, logistics, and government platforms.",
      "Established interaction and visual standards that carried consistency across a high-volume agency portfolio.",
      "Worked directly across the full product lifecycle: research, system design, prototyping, and production hand-off.",
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
          title="A path through Enterprise User Experience."
          intro="Eight years across product systems design, design systems, and motion craft, moving from a high-volume digital studio into deep, long-form product systems work."
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
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-eyebrow text-white/50">
                    {r.period}
                  </span>
                  <span className="career-logo">
                    <Image
                      src={r.logo.src}
                      alt={r.logo.alt}
                      width={r.logo.width}
                      height={r.logo.height}
                      sizes="160px"
                    />
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
