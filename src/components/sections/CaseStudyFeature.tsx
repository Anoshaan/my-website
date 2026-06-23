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

export function CaseStudyFeature() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.6);
  const [stageH, setStageH] = useState(420);

  // Scale the fixed-size dashboard to sit fully visible, anchored to the
  // left corner of its column — slightly smaller than full width so the
  // entire screen always stays in frame.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const compute = () => {
      const f = (el.clientWidth * 0.96) / DESIGN_W;
      setFit(f);
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
              <div className="cs-dash-fit" style={{ transform: `scale(${fit})` }}>
                <div className="cs-dash-tilt">
                  <WorkforceDashboard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — case study content */}
        <div className="cs-content">
          <p className="cs-label">Featured Work</p>
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

          <div className="cs-actions">
            <Button href="/selected-work" variant="secondary">
              See All Selected Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
