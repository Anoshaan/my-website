"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyMedia } from "@/components/mockups/CaseStudyMedia";
import { caseStudies } from "@/lib/case-studies";
import { labsProjects, type LabsProject } from "@/lib/labs-projects";

/**
 * Labs showcase — a vertical sequence of large, alternating project
 * lessons. Odd rows place the visual on the left; even rows mirror it.
 * No cards: depth comes from a dominant floating visual (parallax +
 * perspective tilt + floor glow) and a strong type hierarchy on the
 * content side. Entrances animate once on mount (Reveal), never on
 * scroll-up.
 */

function ArrowSmall() {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      <div className="labs-visual-glow" aria-hidden />
      <motion.div ref={ref} className="labs-visual-stage" style={{ y }}>
        <div className="labs-visual-float">
          <div className={`labs-visual-frame is-tilt-${tilt}`}>
            <CaseStudyMedia
              caseStudy={caseStudy}
              index={index}
              icon={project.icon}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: LabsProject; index: number }) {
  // Project 1 (index 0) = visual left. Then alternate.
  const contentSide = index % 2 === 0 ? "right" : "left";
  const insightLead = project.insight.slice(0, -1);
  const insightPunch = project.insight[project.insight.length - 1];

  return (
    <Reveal as="article" className={`labs-row is-content-${contentSide}`}>
      <ProjectVisual
        project={project}
        index={index}
        tilt={contentSide === "right" ? "right" : "left"}
      />

      <div className="labs-content">
        <span className="labs-domain">{project.domain}</span>

        <h2 className="labs-question">{project.question}</h2>

        <p className="labs-story">{project.story}</p>

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

        <Link href={project.ctaHref} className="labs-cta" data-cursor-precise>
          View Case Study <ArrowSmall />
        </Link>
      </div>
    </Reveal>
  );
}

export function LabsShowcase() {
  return (
    <section className="pb-[clamp(120px,16vw,200px)]">
      <Container size="wide">
        <div className="labs-showcase">
          {labsProjects.map((project, i) => (
            <ProjectRow key={project.num} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
