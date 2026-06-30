"use client";

import { Button } from "@/components/ui/Button";
import { LabsEmbed } from "@/components/sections/labs/LabsEmbed";

/**
 * Featured Case Study — a split-layout showcase. The live Workforce case study
 * mockup (the same /case-studies/1.html rendered on the Selected Work page) is
 * the hero visual, anchored to the left, suspended in space with a soft floor
 * glow, slow float, and a whisper of perspective. The right column carries the
 * label, heading, insight, and the link into Selected Work. Content is
 * vertically centred to the dashboard. No cards — copy reads as part of the
 * page.
 *
 * The visual and copy intentionally mirror the first Selected Work case study so
 * the two areas feel connected; update them together.
 *
 * The entrance is a CSS mount animation (matching the site's Reveal /
 * SectionFade pattern), since IntersectionObserver / motion whileInView
 * don't fire reliably under the site's Lenis smooth-scroll setup.
 */

export function CaseStudyFeature() {
  return (
    <section id="case-study" className="cs-section">
      <div className="cs-inner">
        {/* LEFT — live mockup hero, anchored to the left edge */}
        <div className="cs-dash-col">
          <div className="cs-dash-stage">
            <span className="cs-dash-glow" aria-hidden />
            <div className="cs-dash-float">
              <div className="cs-dash-tilt">
                <div className="cs-dash-embed">
                  <LabsEmbed
                    src="/case-studies/1.html"
                    title="Workforce Time & Resource Management"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — case study content (mirrors Selected Work pathway #1) */}
        <div className="cs-content">
          <p className="cs-label">Featured Work</p>
          <h2 className="text-section cs-heading">
            Workforce Time &amp; Resource Management
          </h2>

          <div className="cs-desc">
            <p>
              A workforce operations platform designed to help teams track time,
              understand workload, manage project activity, and reduce
              operational noise across departments.
            </p>
            <p>
              Teams were spending too much time switching between timesheets,
              project updates, approvals, and activity tracking.
            </p>
          </div>

          <div className="cs-learned">
            <span className="cs-learned-label">What I Learned</span>
            <p>
              The experience came together as a role-based dashboard where each
              user sees the right work, the right status, and the next action,
              without digging through unnecessary screens.
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
