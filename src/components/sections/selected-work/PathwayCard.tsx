import React from "react";
import { ProductPathway } from "@/lib/product-pathways";
import { PathwayPlaceholder } from "./PathwayPlaceholder";

interface PathwayCardProps {
  pathway: ProductPathway;
  /** Full-width horizontal layout (visual beside the text). */
  featured?: boolean;
  className?: string;
  onOpen: (pathway: ProductPathway) => void;
}

/**
 * One card for every pathway. Cards are flex columns with the action button
 * pinned to the bottom (`mt-auto`) and stretch to `h-full`, so two cards in a
 * row always match height regardless of body length. Featured cards lay the
 * visual beside the text and may have their own height.
 */
export function PathwayCard({ pathway, featured = false, className = "", onOpen }: PathwayCardProps) {
  const accentStyle = {
    "--card-accent": pathway.accentColor,
    "--card-soft-bg": pathway.accentSoftBg,
    "--card-border": pathway.accentBorder,
  } as React.CSSProperties;

  return (
    <article
      style={accentStyle}
      className={`
        group relative flex h-full flex-col overflow-hidden rounded-[2rem]
        border border-[var(--color-card-border)] bg-[var(--color-card)]
        shadow-sm transition-all duration-500 hover:border-[var(--color-card-border-hover)] hover:shadow-xl
        ${featured ? "md:grid md:grid-cols-2 md:items-stretch" : ""}
        ${className}
      `}
    >
      {/* Visual */}
      <div className={`p-6 sm:p-8 ${featured ? "order-2 md:order-2 md:pl-0" : "pb-0"}`}>
        <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.02]">
          <PathwayPlaceholder type={pathway.mockupType} accent={pathway.accentColor} />
        </div>
      </div>

      {/* Text */}
      <div className={`flex flex-1 flex-col p-8 sm:p-10 ${featured ? "order-1 justify-center md:pr-0" : "pt-6"}`}>
        <p className="mb-2 text-sm font-medium" style={{ color: "var(--color-fg)", opacity: 0.55 }}>
          {pathway.question}
        </p>

        <h3
          className={`mb-4 font-semibold tracking-tight ${featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}
        >
          {pathway.title}
        </h3>

        <p className="mb-5 max-w-xl text-base leading-relaxed opacity-80">{pathway.description}</p>

        {/* Tags — soft accent background, neutral readable text */}
        <div className="mb-6 flex flex-wrap gap-2">
          {pathway.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-medium text-[var(--color-fg)]"
              style={{
                backgroundColor: pathway.accentSoftBg,
                border: `1px solid ${pathway.accentBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p
          className="mb-8 max-w-xl border-l-2 pl-4 text-base font-medium opacity-90"
          style={{ borderColor: pathway.accentColor }}
        >
          {pathway.summaryLine}
        </p>

        <div className="mt-auto flex items-start pt-2">
          <button
            type="button"
            onClick={() => onOpen(pathway)}
            className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--color-fg)] transition-all duration-300"
            style={{
              backgroundColor: pathway.accentSoftBg,
              border: `1px solid ${pathway.accentBorder}`,
            }}
            aria-label={`View Product Pathway: ${pathway.title}`}
          >
            View Product Pathway
            <svg
              className="opacity-70 transition-transform duration-300 group-hover/btn:translate-x-1"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
