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
    years: ["Present", "2025", "2024", "2023", "2022", "2021"],
    logo: { src: "/logos/aeturnum.png", alt: "Aeturnum", width: 220, height: 40 },
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
    years: ["2021", "2020", "2019", "2018"],
    logo: { src: "/logos/elegant-media.png", alt: "Elegant Media", width: 240, height: 40 },
    points: [
      "Designed end-to-end product experiences for clients across fintech, healthcare, logistics, and government platforms.",
      "Established interaction and visual standards that carried consistency across a high-volume agency portfolio.",
      "Worked directly across the full product lifecycle: research, system design, prototyping, and production hand-off.",
    ],
  },
];

const allYears = ["Present", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

function YearRail({ years }: { years: string[] }) {
  return (
    <div className="about-tl-rail mb-16 lg:mb-20 w-full" aria-hidden>
      <span className="about-tl-rail-line" />
      <div className="about-tl-walker-container">
        <div className="about-tl-walker">
          <svg viewBox="0 0 24 32" width="22" height="30" className="walker-svg walker-svg-walk">
            <circle cx="12" cy="4" r="3" fill="currentColor" />
            <path d="M12 7 v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 9 L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="walk-arm-l" />
            <path d="M12 9 L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="walk-arm-r" />
            <path d="M12 17 L9 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="walk-leg-l" />
            <path d="M12 17 L15 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="walk-leg-r" />
          </svg>
          <svg viewBox="0 0 24 32" width="22" height="30" className="walker-svg walker-svg-run">
            <circle cx="12" cy="4" r="3" fill="currentColor" />
            <path d="M12 7 v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 9 L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="run-arm-l" />
            <path d="M12 9 L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="run-arm-r" />
            <path d="M12 17 L9 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="run-leg-l" />
            <path d="M12 17 L15 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="run-leg-r" />
          </svg>
        </div>
      </div>
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

        <div className="mt-20 lg:mt-28">
          <YearRail years={allYears} />
          <div className="about-xp-grid">
            {roles.map((r, i) => (
              <ScrollReveal key={r.company} delay={i * 0.08} className="about-xp-col">
                <div className="bg-white/[0.03] rounded-2xl flex flex-1 flex-col gap-6 p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
                    <h3 className="text-[1.6rem] leading-snug font-semibold text-white">{r.role}</h3>
                    <span className="career-logo flex-shrink-0">
                      <Image
                        src={r.logo.src}
                        alt={r.logo.alt}
                        width={r.logo.width}
                        height={r.logo.height}
                        sizes="160px"
                      />
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 pt-2">
                    {r.points.map((p, j) => (
                      <li key={j} className="text-body text-white/62 flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-[4px] w-[4px] flex-shrink-0 rounded-full bg-white/30"
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

