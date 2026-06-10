"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WorkforceDashboard } from "@/components/sections/casestudy/WorkforceDashboard";

/**
 * Featured Case Study — a split-layout showcase. The animated workforce
 * dashboard is the hero visual, anchored to the left edge (a few percent
 * bleeding off-screen) and suspended in space with a soft floor glow,
 * slow float, and a whisper of perspective. The right column carries the
 * label, heading, insight, tags, and navigation. Content is vertically
 * centred to the dashboard. No cards — copy reads as part of the page.
 *
 * The entrance is a CSS mount animation (matching the site's Reveal /
 * SectionFade pattern), since IntersectionObserver / motion whileInView
 * don't fire reliably under the site's Lenis smooth-scroll setup.
 */

const DESIGN_W = 1180;
const DESIGN_H = 720;

const TAGS = [
  "Enterprise UX",
  "Workforce Planning",
  "Task Management",
  "Time Tracking",
  "Operations",
];

export function CaseStudyFeature() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.6);
  const [offset, setOffset] = useState(0);
  const [stageH, setStageH] = useState(420);

  // Scale the fixed-size dashboard so it slightly overflows the left edge.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const compute = () => {
      const bleed = window.innerWidth * 0.025; // ~2.5% beyond the left edge
      const rendered = el.clientWidth + bleed;
      const f = rendered / DESIGN_W;
      setFit(f);
      setOffset(bleed);
      setStageH(DESIGN_H * f);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <section id="case-study" className="cs-section">
      <div className="cs-inner">
        {/* LEFT — dashboard hero, anchored to the left edge */}
        <div className="cs-dash-col">
          <div ref={stageRef} className="cs-dash-stage" style={{ height: stageH }}>
            <span className="cs-dash-glow" aria-hidden />
            <div className="cs-dash-float">
              <div
                className="cs-dash-fit"
                style={{ transform: `translateX(${-offset}px) scale(${fit})` }}
              >
                <div className="cs-dash-tilt">
                  <WorkforceDashboard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — case study content */}
        <div className="cs-content">
          <p className="cs-label">Featured Case Study</p>
          <h2 className="text-section cs-heading">
            Designing Clarity Across Workforce Operations
          </h2>

          <div className="cs-desc">
            <p>
              In large organizations, work often passes through multiple layers
              before reaching the people responsible for execution.
            </p>
            <p>
              This platform transformed complex project structures into focused
              task views, helping employees quickly understand their
              responsibilities and record time without navigating unnecessary
              information.
            </p>
          </div>

          <div className="cs-learned">
            <span className="cs-learned-label">What I Learned</span>
            <p>
              The challenge wasn&rsquo;t helping users track time. It was ensuring
              they only saw what mattered, before they needed to.
            </p>
          </div>

          <ul className="cs-tags">
            {TAGS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="cs-actions">
            <Button href="/labs" variant="primary">
              View Case Study
            </Button>
            <Button href="/labs" variant="ghost" rainbow={false}>
              Explore All Labs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
