"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

/** Logical design size of the embedded HTML mockups (desktop, 4:3). */
const EMBED_W = 1440;
const EMBED_H = 1080;

/** Live interactive mockup, rendered at full desktop size then scaled to
 *  fit the frame so it reads as a crisp product screenshot while keeping
 *  every GSAP entrance + hover interaction intact. */
function LabsEmbed({ src, title }: { src: string; title: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => setScale(host.clientWidth / EMBED_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={hostRef} className="labs-embed" aria-hidden>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        tabIndex={-1}
        style={{
          width: EMBED_W,
          height: EMBED_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
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

function ProjectRow({ project, index }: { project: LabsProject; index: number }) {
  // Project 1 (index 0) = visual left. Then alternate.
  const contentSide = index % 2 === 0 ? "right" : "left";
  const insightLead = project.insight.slice(0, -1);
  const insightPunch = project.insight[project.insight.length - 1];

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
