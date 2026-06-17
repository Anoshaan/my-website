"use client";

import { type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CaseStudyContent } from "@/lib/case-studies-content";
import { CaseVisual } from "./CaseStudyVisuals";

/**
 * CaseStudyArticle — the single renderer for every detailed Labs case study.
 *
 * The opening hero is intentionally calm and editorial: a CASE STUDY label,
 * the title, the challenge question, a short intro, and tags. There is NO
 * animated visual beside the title — visuals only appear as the reader scrolls
 * into each section. The only fixed element is the overlay's close button
 * (owned by CaseStudyOverlay).
 *
 * The project accent is applied as `--cs-accent` on the root, so all the
 * shared `csw-*` visual styling tints to match the matching Labs row.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className="csw-section"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <h3 className="csw-heading">{heading}</h3>
      {children}
    </motion.section>
  );
}

export function CaseStudyArticle({ data }: { data: CaseStudyContent }) {
  const reduced = useReducedMotion();

  return (
    <div
      className="csw-root"
      style={{ "--cs-accent": data.accent } as CSSProperties}
    >
      {/* Calm editorial hero — no visual beside the title. */}
      <motion.header
        className="csa-hero"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="csw-eyebrow">Case study</span>
        <h2 className="csa-hero-title">{data.title}</h2>
        <p className="csa-hero-challenge">{data.challenge}</p>
        <p className="csa-hero-intro">{data.intro}</p>
        <ul className="csw-tags">
          {data.tags.map((t) => (
            <li key={t} className="csw-tag">
              {t}
            </li>
          ))}
        </ul>
        <span className="csa-hero-rule" aria-hidden />
      </motion.header>

      {data.sections.map((s) => (
        <Section key={s.heading} heading={s.heading}>
          {s.question && <p className="csw-question">{s.question}</p>}
          {s.paragraphs?.map((p) => (
            <p key={p} className="csw-body">
              {p}
            </p>
          ))}
          {s.visual && <CaseVisual visual={s.visual} />}
          {s.lead && <p className="csw-body csw-body-lead">{s.lead}</p>}
          {s.note && <p className="csw-note">{s.note}</p>}
        </Section>
      ))}

      {/* Final takeaway */}
      <div className="csw-stage csw-final" data-play="on">
        <span className="csa-hero-rule is-center" aria-hidden />
        <blockquote className="csw-quote">
          {data.takeaway.quote.map((line, i) => (
            <span
              key={line}
              className={
                i === data.takeaway.quote.length - 1 ? "csw-quote-accent" : ""
              }
            >
              {line}
            </span>
          ))}
        </blockquote>
        <p className="csw-final-line">{data.takeaway.closing}</p>
      </div>
    </div>
  );
}
