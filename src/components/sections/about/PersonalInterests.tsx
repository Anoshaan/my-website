"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrambledText } from "@/components/animations/ScrambledText";

/**
 * About — Section 6. Personal interests.
 * A small, restrained section that humanizes the page without
 * tipping casual. Three sports with a one-line framing — kept
 * to a single quiet row of capsules.
 */

const interests = [
  { label: "Badminton", note: "Primary sport — long-running discipline." },
  { label: "Swimming", note: "Strongest personal activity." },
  { label: "Football", note: "Favorite sport to play and follow." },
];

export function PersonalInterests() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-[44ch]">
            <Reveal>
              <span className="text-eyebrow text-white/45">Off-screen</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white mt-3 heading-sheen">
                Beyond the work.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 mt-5 max-w-[46ch]">
                A small list — the sports and movement that keep the rest of
                the work grounded.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="w-full lg:w-auto">
            <ul className="flex flex-col gap-3">
              {interests.map((it, i) => (
                <li
                  key={it.label}
                  className="interest-row"
                  style={{ animationDelay: `${(i % 3) * 0.6}s` }}
                >
                  <span className="interest-row-label">
                    <ScrambledText radius={80} duration={800} speed={38}>
                      {it.label}
                    </ScrambledText>
                  </span>
                  <span className="interest-row-note">{it.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
