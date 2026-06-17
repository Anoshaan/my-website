"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyMedia } from "@/components/mockups/CaseStudyMedia";
import { caseStudies } from "@/lib/case-studies";
import { labsProjects, type LabsProject } from "@/lib/labs-projects";
import { caseStudyDetails } from "@/lib/case-study-details";
import { LabsEmbed } from "./LabsEmbed";
import { CaseStudyOverlay } from "./CaseStudyOverlay";

/**
 * Labs showcase — a vertical sequence of large, alternating project
 * lessons. Odd rows place the visual on the left; even rows mirror it.
 * No cards: depth comes from a dominant floating visual (parallax +
 * perspective tilt + floor glow) and a strong type hierarchy on the
 * content side. Entrances animate once on mount (Reveal), never on
 * scroll-up.
 *
 * Projects registered in `caseStudyDetails` show a "Read Detailed Case
 * Study" button that opens an in-page overlay — never a route change.
 */

/** Dominant visual — slow scroll parallax + a perspective tilt that
 *  leans toward the content so the pair reads as one composition. */
function ProjectVisual({
  project,
  index,
  tilt,
}: {
  project: LabsProject;
  index: number;
  tilt: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduced ? 0 : -36, reduced ? 0 : 36]
  );

  const caseStudy =
    caseStudies.find((c) => c.slug === project.visualSlug) ?? caseStudies[0];

  return (
    <div className="labs-visual">
      <motion.div ref={ref} className="labs-visual-stage" style={{ y }}>
        <div className="labs-visual-float">
          <div className={`labs-visual-frame is-tilt-${tilt}`}>
            {project.embed ? (
              <LabsEmbed src={project.embed} title={project.title} />
            ) : (
              <CaseStudyMedia
                caseStudy={caseStudy}
                index={index}
                icon={project.icon}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  onOpenDetail,
}: {
  project: LabsProject;
  index: number;
  onOpenDetail: (num: string, trigger: HTMLButtonElement) => void;
}) {
  // Project 1 (index 0) = visual left. Then alternate.
  const contentSide = index % 2 === 0 ? "right" : "left";
  const insightLead = project.insight.slice(0, -1);
  const insightPunch = project.insight[project.insight.length - 1];
  const hasDetail = Boolean(caseStudyDetails[project.num]);

  return (
    <Reveal
      as="article"
      className={`labs-row is-content-${contentSide}`}
      style={{ "--labs-accent": project.accent } as CSSProperties}
    >
      <ProjectVisual
        project={project}
        index={index}
        tilt={contentSide === "right" ? "right" : "left"}
      />

      <div className="labs-content">
        <span className="labs-challenge">{project.challenge}</span>

        <h2 className="labs-title">{project.title}</h2>

        <div className="labs-story">
          {project.story.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        {/* What Changed | Key Insight — side by side, never stacked. */}
        <div className="labs-bottom">
          <div className="labs-changed">
            <span className="labs-changed-label">What changed</span>
            <ul>
              {project.whatChanged.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="labs-insight">
            <span className="labs-insight-label">Key insight</span>
            <p className="labs-insight-text">
              {insightLead.map((line) => (
                <span key={line} className="labs-insight-line">
                  {line}{" "}
                </span>
              ))}
              <span className="labs-insight-punch">{insightPunch}</span>
            </p>
          </div>
        </div>

        {hasDetail && (
          <button
            type="button"
            className="labs-detail-btn"
            onClick={(e) => onOpenDetail(project.num, e.currentTarget)}
          >
            Read Detailed Case Study
            <span className="labs-detail-arrow" aria-hidden>
              →
            </span>
          </button>
        )}
      </div>
    </Reveal>
  );
}

export function LabsShowcase() {
  // `renderNum` is the case study whose content is mounted; `open` drives the
  // slide animation. They are separate so the sheet can animate OUT (open
  // false) before its content is torn down.
  const [renderNum, setRenderNum] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const active = renderNum ? caseStudyDetails[renderNum] : null;

  const openDetail = (num: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setRenderNum(num);
    setOpen(true);
  };

  return (
    <section className="pb-[clamp(120px,16vw,200px)]">
      <Container size="wide">
        <div className="labs-showcase">
          {labsProjects.map((project, i) => (
            <ProjectRow
              key={project.num}
              project={project}
              index={i}
              onOpenDetail={openDetail}
            />
          ))}
        </div>
      </Container>

      {active && (
        <CaseStudyOverlay
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setRenderNum(null)}
          title={active.title}
          returnFocusRef={triggerRef}
        >
          <active.Body />
        </CaseStudyOverlay>
      )}
    </section>
  );
}
