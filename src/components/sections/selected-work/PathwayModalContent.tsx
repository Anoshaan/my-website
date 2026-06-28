import React from "react";
import { ProductPathway } from "@/lib/product-pathways";
import { PathwayPlaceholder } from "./PathwayPlaceholder";

/**
 * The shared body rendered inside CaseStudyOverlay for every pathway. All 16
 * pathways use this one structure, populated entirely from the pathway data:
 * title, intro, categories/tags, the challenge, what changed, product thinking,
 * key insight, a placeholder visual, and optional external links.
 */

function Section({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide opacity-60">
        <span className="h-3 w-3 rounded-full" style={{ background: accent }} aria-hidden />
        {label}
      </h3>
      {children}
    </section>
  );
}

export function PathwayModalContent({ pathway }: { pathway: ProductPathway }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 text-[var(--c-fg)]">
      {/* Header */}
      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {pathway.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: pathway.accentSoftBg,
                border: `1px solid ${pathway.accentBorder}`,
                color: "#1a1a1a",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-lg leading-relaxed opacity-80">{pathway.summaryLine}</p>
      </header>

      {/* Visual */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-[rgba(var(--c-fg-rgb),0.08)] md:h-80">
        <PathwayPlaceholder type={pathway.mockupType} accent={pathway.accentColor} />
      </div>

      {/* The challenge */}
      <Section label="The challenge" accent={pathway.accentColor}>
        <p className="text-base font-medium opacity-90">{pathway.question}</p>
        <p className="text-base leading-relaxed opacity-75">{pathway.description}</p>
      </Section>

      {/* What changed */}
      <Section label="What changed" accent={pathway.accentColor}>
        <ul className="flex flex-col gap-2.5">
          {pathway.whatChanged.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base opacity-80">
              <span
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: pathway.accentColor }}
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Product thinking */}
      <Section label="Product thinking" accent={pathway.accentColor}>
        <p className="text-base leading-relaxed opacity-80">{pathway.summaryLine}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {pathway.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: pathway.accentSoftBg,
                border: `1px solid ${pathway.accentBorder}`,
                color: "#1a1a1a",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* Key insight */}
      <Section label="Key insight" accent={pathway.accentColor}>
        <blockquote
          className="rounded-2xl px-6 py-5 text-lg font-medium italic"
          style={{
            backgroundColor: pathway.accentSoftBg,
            border: `1px solid ${pathway.accentBorder}`,
            color: "#1a1a1a",
          }}
        >
          “{pathway.keyInsight}”
        </blockquote>
      </Section>

      {/* External links */}
      {pathway.externalLinks && pathway.externalLinks.length > 0 && (
        <Section label="Watch / external links" accent={pathway.accentColor}>
          <div className="flex flex-col gap-3">
            {pathway.externalLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.12)] px-5 py-4 text-base font-medium transition-colors hover:border-[rgba(var(--c-fg-rgb),0.3)]"
              >
                <span className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="2" y="4" width="20" height="16" rx="4" fill={pathway.accentColor} opacity="0.85" />
                    <path d="M10 9l5 3-5 3z" fill="white" />
                  </svg>
                  {link.label}
                </span>
                <svg
                  className="opacity-50 transition-transform duration-300 group-hover:translate-x-1"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
