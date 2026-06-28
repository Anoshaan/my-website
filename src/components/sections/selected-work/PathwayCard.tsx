import React from "react";
import { MainProductPathway } from "@/lib/product-pathways";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import { featuredCaseStudies } from "@/lib/case-studies";
import { CaseStudyMedia } from "@/components/mockups/CaseStudyMedia";

interface PathwayCardProps {
  pathway: MainProductPathway;
  featured?: boolean;
  className?: string;
  onClickPathway?: (pathway: MainProductPathway) => void;
}

export function PathwayCard({ pathway, featured = false, className = "", onClickPathway }: PathwayCardProps) {
  const cardStyle = {
    '--card-accent': pathway.accentColor,
    '--card-soft-bg': pathway.softAccentColor,
  } as React.CSSProperties;

  const oldCaseStudy = featuredCaseStudies.find(c => 
    c.title === pathway.title || c.slug === pathway.slug || pathway.title.includes(c.title) || c.title.includes(pathway.title)
  );

  return (
    <article 
      style={cardStyle}
      className={`
        group relative flex flex-col bg-[var(--color-card)] 
        rounded-[2rem] border border-[var(--color-card-border)] overflow-hidden 
        transition-all duration-500 shadow-sm hover:shadow-xl hover:border-[var(--color-card-border-hover)]
        ${featured ? 'md:grid md:grid-cols-2 md:gap-8 lg:gap-12' : 'gap-4'}
        ${className}
      `}
    >
      <div className={`flex flex-col p-8 sm:p-10 ${featured ? 'pr-0 justify-center' : 'pb-0'}`}>
        
        {pathway.question && (
          <p className="text-sm font-medium opacity-60 mb-2">
            {pathway.question}
          </p>
        )}
        
        <h3 className={`font-semibold tracking-tight mb-6 ${featured ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
          {pathway.title}
        </h3>
        
        <div className="flex flex-col gap-4 text-base opacity-80 leading-relaxed mb-6 max-w-xl">
          {pathway.story && pathway.story.length > 0 ? (
            pathway.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))
          ) : (
             <p>{pathway.summary}</p>
          )}
        </div>

        {pathway.proof && (
          <p className="text-base font-medium opacity-90 mb-8 max-w-xl border-l-2 border-[var(--card-accent)] pl-4">
            {pathway.proof}
          </p>
        )}
        
        <div className={`flex flex-col gap-6 mb-8 ${featured ? '' : ''}`}>
          {pathway.whatChanged && pathway.whatChanged.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold">What changed</span>
              <ul className="flex flex-col gap-2">
                {pathway.whatChanged.map((item, i) => (
                  <li key={i} className="text-sm opacity-80 flex items-start gap-2">
                    <span className="opacity-50 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pathway.keyInsight && (
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-sm font-semibold">Key insight</span>
              <p className="text-sm opacity-80">{pathway.keyInsight}</p>
            </div>
          )}
        </div>
        
        <div className={`mt-auto flex items-start pt-4 ${featured ? '' : 'w-full'}`}>
          <button 
            onClick={() => onClickPathway?.(pathway)}
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border border-[var(--color-line)] hover:bg-[var(--color-surface-2)] text-[var(--color-fg)]"
          >
            View Product Pathway
            <svg className="transition-transform duration-300 group-hover/btn:translate-x-1 opacity-70" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className={`p-6 sm:p-8 ${featured ? 'pl-0 flex items-center' : 'pt-0'}`}>
        <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden transition-transform duration-700 group-hover:scale-[1.02] group-hover:-translate-y-1 bg-[var(--color-surface)] relative flex items-center justify-center">
          {oldCaseStudy ? (
            <CaseStudyMedia caseStudy={oldCaseStudy} index={0} icon="scan" />
          ) : (
            <PlaceholderVisual label={pathway.visualComponentName} className="bg-[var(--color-surface)] w-full h-full" />
          )}
        </div>
      </div>
    </article>
  );
}
