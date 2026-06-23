"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * About — experience. Two roles shown side by side (current on the LEFT,
 * earlier on the RIGHT — a reverse, current-to-past read), each sitting under
 * a dashed milestone-year timeline. No progress bar; the timeline reads as
 * years, not a loader.
 */

type Role = {
  company: string;
  role: string;
  period: string;
  /** Milestone years shown on the dashed rail above the card. */
  years: string[];
  logo: { src: string; alt: string; width: number; height: number };
  points: string[];
};

const roles: Role[] = [
  {
    company: "Aeturnum",
    role: "Associate UI/UX Lead",
    period: "October 2021 – Present",
    years: ["2021", "2022", "2023", "2024", "2025", "Present"],
    logo: { src: "/logos/aeturnum.png", alt: "Aeturnum", width: 132, height: 24 },
    points: [
      "Lead UX and motion direction across enterprise platforms: design systems, AI-driven workflows, and large-scale product surfaces.",
      "Build scalable interaction frameworks and motion languages that hold up across multiple products and engineering teams.",
      "Partner with product, engineering, and leadership, integrating AI-assisted workflows into how design itself ships.",
    ],
  },
  {
    company: "Elegant Media",
    role: "Senior UI/UX Engineer",
    period: "September 2018 – October 2021",
    years: ["2018", "2019", "2020", "2021"],
    logo: { src: "/logos/elegant-media.png", alt: "Elegant Media", width: 148, height: 24 },
    points: [
      "Designed end-to-end product experiences for clients across fintech, healthcare, logistics, and government platforms.",
      "Established interaction and visual standards that carried consistency across a high-volume agency portfolio.",
      "Worked directly across the full product lifecycle: research, system design, prototyping, and production hand-off.",
    ],
  },
];

function YearRail({ years }: { years: string[] }) {
  return (
    <div className="about-tl-rail" aria-hidden>
      <span className="about-tl-rail-line" />
      <div className="about-tl-years">
        {years.map((y) => (
          <span
            key={y}
            className={`about-tl-year ${y === "Present" ? "is-now" : ""}`}
          >
            <span className="about-tl-year-dot" />
            <span className="about-tl-year-label">{y}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CareerTimeline() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          title="8+ Years Shaping Products, Teams, and User Experiences"
          intro="From a high-volume digital studio into deep, long-form product systems work, growing across UX, design systems, and motion."
        />

        <div className="about-xp-grid mt-14 lg:mt-16">
          {roles.map((r, i) => (
            <ScrollReveal key={r.company} delay={i * 0.08} className="about-xp-col">
              <YearRail years={r.years} />

              <div className="card-surface card-lift flex flex-1 flex-col gap-5 p-7 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-eyebrow text-white/50">{r.period}</span>
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
                  <p className="text-supporting text-white/45">{r.company}</p>
                </div>

                <ul className="flex flex-col gap-2.5 pt-1">
                  {r.points.map((p, j) => (
                    <li key={j} className="text-body text-white/62 flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.7em] h-[3px] w-[3px] flex-shrink-0 rounded-full bg-white/30"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
