import { type ComponentType, createElement } from "react";
import { caseStudies } from "@/lib/case-studies-content";
import { CaseStudyArticle } from "@/components/sections/labs/casestudy/CaseStudyArticle";

/**
 * Registry of detailed case studies that open in the in-page overlay.
 *
 * Keyed by the Labs project `num`. A project only renders a
 * "Read Detailed Case Study" button when an entry exists here. Every detailed
 * study is now data-driven: its content lives in `case-studies-content` and is
 * rendered by the shared `CaseStudyArticle`, so adding a new one is a single
 * data entry — no bespoke component required.
 *
 * The Labs page never navigates away — the overlay is a focused reading layer.
 */
export type CaseStudyDetail = {
  title: string;
  Body: ComponentType;
};

export const caseStudyDetails: Record<string, CaseStudyDetail> = Object.fromEntries(
  Object.values(caseStudies).map((cs) => {
    const Body: ComponentType = () => createElement(CaseStudyArticle, { data: cs });
    Body.displayName = `CaseStudy_${cs.num}`;
    return [cs.num, { title: cs.title, Body }];
  })
);
