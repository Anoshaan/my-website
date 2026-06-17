"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Brand — Section 6. Production and launch assets. A wall of crafted
 * panels (video, social, website, UI, campaign, pitch, explainer) slides
 * in and lifts on hover. Abstract visuals, never stock photos. Kept short.
 */

type Panel = { label: string; glyph: ReactNode; span?: boolean };

const G = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PANELS: Panel[] = [
  {
    label: "Video",
    span: true,
    glyph: (
      <svg viewBox="0 0 48 48">
        <rect x="6" y="12" width="36" height="24" rx="3" {...G} />
        <path d="M21 20 L29 24 L21 28 Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Social",
    glyph: (
      <svg viewBox="0 0 48 48">
        <rect x="10" y="10" width="28" height="28" rx="6" {...G} />
        <circle cx="24" cy="24" r="7" {...G} opacity="0.7" />
        <circle cx="32" cy="16" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Website",
    glyph: (
      <svg viewBox="0 0 48 48">
        <rect x="8" y="10" width="32" height="24" rx="3" {...G} />
        <line x1="8" y1="17" x2="40" y2="17" {...G} opacity="0.6" />
        <line x1="20" y1="38" x2="28" y2="38" {...G} opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "Campaign",
    span: true,
    glyph: (
      <svg viewBox="0 0 48 48">
        <path d="M12 28 L30 18 L30 34 Z" {...G} />
        <path d="M30 21 L38 18 L38 34 L30 31" {...G} opacity="0.7" />
        <path d="M16 30 L16 38" {...G} opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "Pitch",
    glyph: (
      <svg viewBox="0 0 48 48">
        <rect x="9" y="11" width="30" height="20" rx="2" {...G} />
        <line x1="24" y1="31" x2="24" y2="37" {...G} opacity="0.6" />
        <line x1="18" y1="37" x2="30" y2="37" {...G} opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "Explainer",
    glyph: (
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="14" {...G} />
        <path d="M20 18 L30 24 L20 30 Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function LaunchAssets() {
  return (
    <section className="section-pad br-section border-t border-white/[0.06]">
      <Container>
        <div className="br-stack-head">
          <Reveal>
            <h2 className="text-section text-white heading-sheen br-h2">
              Everything a launch needs to land.
            </h2>
          </Reveal>
        </div>

        <div className="br-wall">
          {PANELS.map((p, i) => (
            <ScrollReveal
              key={p.label}
              delay={i * 0.06}
              className={`br-panel-wrap ${p.span ? "br-panel-wrap--wide" : ""}`}
            >
              <div className="br-panel">
                <span className="br-panel-glyph" aria-hidden>
                  {p.glyph}
                </span>
                <span className="br-panel-label">{p.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
