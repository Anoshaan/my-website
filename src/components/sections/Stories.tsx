"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyMedia } from "@/components/mockups/CaseStudyMedia";
import {
  featuredCaseStudies,
  type CaseStudy,
} from "@/lib/case-studies";

/**
 * Stories From the Real World — editorial portfolio.
 *
 * The first featured project's animation becomes a slightly-blurred
 * hero backdrop with the section title + description centered over it.
 * Below, three case studies alternate image-left / image-right with
 * gentle parallax and a floating hover lift. Links into /labs.
 */

const HERO = featuredCaseStudies[0];
// Keep three case studies below the hero (the rest are on the Labs page).
const STUDIES = featuredCaseStudies.slice(1, 4);

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

function ParallaxMedia({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
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
    [reduced ? 0 : -32, reduced ? 0 : 32]
  );

  return (
    <motion.div
      ref={ref}
      className={`story-media ${className ?? ""}`}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

function StoryRow({
  c,
  index,
  layout,
}: {
  c: CaseStudy;
  index: number;
  layout: "left" | "right";
}) {
  const mediaSide = layout === "left" ? "is-media-left" : "is-media-right";
  return (
    <Reveal>
      <Link
        href="/selected-work"
        data-cursor-precise
        className={`story-row story-row-alt ${mediaSide} group`}
        aria-label={`Read the case study: ${c.title}`}
      >
        <ParallaxMedia>
          <CaseStudyMedia caseStudy={c} index={index} icon="scan" />
        </ParallaxMedia>
        <div className="story-alt-meta">
          <span className="story-eyebrow">
            {String(index + 1).padStart(2, "0")} · Case Study
          </span>
          <h3 className="story-title-alt">{c.title}</h3>
          <p className="story-summary">{c.summary}</p>
          <div className="story-tags">
            {c.focusAreas.slice(0, 3).map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <span className="story-cta">
            Explore the Story <ArrowSmall />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Stories() {
  return (
    <section className="stories-section section-pad">
      {/* HERO — featured animation behind the centered section title. */}
      <div className="stories-hero">
        <div className="stories-hero-media" aria-hidden>
          <CaseStudyMedia caseStudy={HERO} index={0} icon="structure" />
        </div>
        <div className="stories-hero-scrim" aria-hidden />
        <Container className="stories-hero-overlay">
          <Reveal>
            <h2 className="text-section text-white heading-sheen max-w-[22ch] mx-auto">
              Stories From the Real World
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-body text-white/75 max-w-[58ch] mx-auto mt-6">
              A collection of products, platforms, and experiences I&apos;ve
              helped shape, from early concepts to launched solutions.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* CASE STUDIES — three editorial rows. */}
      <Container size="wide">
        <div className="stories-stack">
          {STUDIES.map((c, i) => (
            <StoryRow
              key={c.slug}
              c={c}
              index={i + 1}
              layout={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
