"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

/**
 * About — Section 6. Beyond the work.
 * Two-column layout. Heading and framing copy on the left,
 * three sport tiles in a single horizontal row on the right.
 * Tiles use line-drawn SVG icons that match the rest of the
 * site's wireframe icon language.
 */

type Sport = {
  icon: React.ReactNode;
  title: string;
  label: string;
};

const ICON_PROPS = {
  width: 28,
  height: 28,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const sports: Sport[] = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <line x1="11" y1="37" x2="33" y2="15" />
        <path d="M33 15 L37 11 L41 15 L37 19 Z" />
        <ellipse
          cx="14"
          cy="34"
          rx="8"
          ry="4"
          transform="rotate(-45 14 34)"
        />
        <line x1="9.5" y1="33.5" x2="18" y2="34.5" opacity="0.55" />
        <line x1="11" y1="29.5" x2="18" y2="38.5" opacity="0.55" />
        <line x1="14" y1="28" x2="14" y2="40" opacity="0.55" />
      </svg>
    ),
    title: "Competitive Badminton",
    label: "Focus • Speed • Precision",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="32" cy="13" r="3" />
        <path d="M14 22 L22 19 L28 23 L24 28 L28 34" />
        <path d="M22 19 L20 26" opacity="0.7" />
        <path
          d="M7 36 Q11 33 15 36 T23 36 T31 36 T39 36 T47 36"
          opacity="0.85"
        />
        <path
          d="M5 42 Q9 39 13 42 T21 42 T29 42 T37 42 T45 42"
          opacity="0.55"
        />
      </svg>
    ),
    title: "Swimming",
    label: "Endurance • Discipline • Recovery",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="24" cy="24" r="14" />
        <polygon
          points="24,18 29,21.5 27,27.5 21,27.5 19,21.5"
          opacity="0.85"
        />
        <line x1="24" y1="10" x2="24" y2="18" opacity="0.6" />
        <line x1="36.1" y1="18.6" x2="29" y2="21.5" opacity="0.6" />
        <line x1="11.9" y1="18.6" x2="19" y2="21.5" opacity="0.6" />
        <line x1="16.3" y1="35" x2="21" y2="27.5" opacity="0.6" />
        <line x1="31.7" y1="35" x2="27" y2="27.5" opacity="0.6" />
      </svg>
    ),
    title: "Football",
    label: "Teamwork • Strategy • Energy",
  },
];

export function PersonalInterests() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.4fr)] lg:items-center lg:gap-[clamp(48px,6vw,96px)]">
          {/* LEFT — heading + framing copy */}
          <div className="max-w-[46ch]">
            <Reveal>
              <span className="text-eyebrow text-white/45">Off-screen</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white mt-3 heading-sheen">
                Beyond the Work.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 mt-5">
                Outside of product systems, UX, and technology, sports play a
                major role in how I think, compete, and stay disciplined.
                Movement, strategy, and consistency are a huge part of my
                mindset both inside and outside of work.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — three sport tiles in one horizontal row */}
          <StaggerContainer
            stagger={0.1}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
          >
            {sports.map((s) => (
              <StaggerItem key={s.title}>
                <div className="sport-tile">
                  <span className="sport-tile-icon" aria-hidden>
                    {s.icon}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="sport-tile-title">{s.title}</h3>
                    <span className="sport-tile-label">{s.label}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
