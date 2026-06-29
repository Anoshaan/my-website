import React from "react";
import { ProductPathway } from "@/lib/product-pathways";
import { PathwayPlaceholder } from "./PathwayPlaceholder";
import { LabsEmbed } from "@/components/sections/labs/LabsEmbed";

/**
 * The shared body rendered inside CaseStudyOverlay for every pathway. All
 * pathways use this one structure, populated entirely from the pathway data.
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

function ListSection({
  label,
  accent,
  items,
}: {
  label: string;
  accent: string;
  items: string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <Section label={label} accent={accent}>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-base opacity-80">
            <span
              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: accent }}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function PathwayModalContent({ pathway }: { pathway: ProductPathway }) {
  // The Lottie pathway (id 19) is a square animation; every other .html
  // mockup is a 16:9 interactive stage rendered through LabsEmbed.
  const isLottie = pathway.id === 19;
  const isHtml = !!pathway.imageUrl?.endsWith(".html");
  const isCaseEmbed = isHtml && !isLottie;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 text-[var(--c-fg)]">
      {/* Header */}
      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: pathway.accentSoftBg,
              border: `1px solid ${pathway.accentBorder}`,
              color: "#1a1a1a",
            }}
          >
            {pathway.primaryCategory}
          </span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-[rgba(var(--c-fg-rgb),0.08)] ${
          isCaseEmbed
            ? "aspect-video bg-[#0a0e1a]"
            : isLottie
              ? "aspect-video flex items-center justify-center"
              : "flex items-center justify-center h-64 md:h-80"
        }`}
      >
        {pathway.imageUrl ? (
          isCaseEmbed ? (
            <LabsEmbed src={pathway.imageUrl} title={pathway.title} />
          ) : isHtml ? (
            <iframe
              src={pathway.imageUrl}
              title={pathway.title}
              className="h-full aspect-square border-0 pointer-events-none"
              scrolling="no"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- in-modal preview; lazy raw <img> avoids next/image fill layout constraints
            <img
              src={pathway.imageUrl}
              alt={pathway.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          )
        ) : (
          <PathwayPlaceholder type={pathway.mockupType} accent={pathway.accentColor} />
        )}
      </div>

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

      {/* Product Story */}
      <Section label="Product story" accent={pathway.accentColor}>
        <p className="text-base leading-relaxed opacity-85">{pathway.productStory}</p>
      </Section>

      {/* The Problem */}
      <Section label="The problem" accent={pathway.accentColor}>
        <p className="text-base leading-relaxed opacity-85">{pathway.problem}</p>
      </Section>

      {/* The Solution */}
      <Section label="The solution" accent={pathway.accentColor}>
        <p className="text-base leading-relaxed opacity-85">{pathway.solution}</p>
      </Section>

      {/* Users */}
      <ListSection label="Users" accent={pathway.accentColor} items={pathway.users} />

      {/* Key Features */}
      <ListSection label="Key features" accent={pathway.accentColor} items={pathway.keyFeatures} />

      {/* UX Decisions */}
      <ListSection label="UX decisions" accent={pathway.accentColor} items={pathway.uxDecisions} />

      {/* Motion Direction */}
      <ListSection label="Motion direction" accent={pathway.accentColor} items={pathway.motionDirection} />

      {/* Visual Suggestions */}
      <ListSection label="Visual suggestions" accent={pathway.accentColor} items={pathway.visualSuggestions} />

      {/* Tags */}
      <Section label="Tags" accent={pathway.accentColor}>
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
    </div>
  );
}
