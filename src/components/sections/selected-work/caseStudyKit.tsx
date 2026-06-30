"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import { LabsEmbed } from "@/components/sections/labs/LabsEmbed";

/**
 * caseStudyKit — shared, accent-driven building blocks for the bespoke
 * Selected Work detail modals. These are deliberately small atoms (reveal,
 * frames, chips, bars, rings, step flows, tabs) so each case study can
 * COMPOSE a distinct layout/rhythm rather than reuse one template.
 *
 * Theming: every atom is driven by the site's --c-fg / --c-bg tokens plus a
 * locally scoped accent --cs (set by CSShell from the pathway's assigned
 * colour). Dark ink for filled-accent surfaces is --cs-ink. All motion is
 * gated by prefers-reduced-motion through the `useMotion` helper.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/** True when motion should play. Use to gate loops + entrances. */
export function useMotion() {
  return !useReducedMotion();
}

/* ------------------------------------------------------------------ */
/* Shell + header atoms                                                */
/* ------------------------------------------------------------------ */

/**
 * Outer wrapper: sets the accent var, base text colour and column width.
 * `gap` lets each modal pick its own vertical rhythm.
 */
export function CSShell({
  pathway,
  children,
  gap = "gap-14",
}: {
  pathway: ProductPathway;
  children: React.ReactNode;
  gap?: string;
}) {
  return (
    <div
      className={`mx-auto flex w-full max-w-3xl flex-col ${gap} text-[var(--c-fg)]`}
      style={
        {
          "--cs": pathway.accentColor,
          "--cs-ink": "#0c1116",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function CategoryChip({ pathway }: { pathway: ProductPathway }) {
  return (
    <span
      className="w-fit rounded-full px-3 py-1 text-xs font-medium"
      style={{
        backgroundColor: pathway.accentSoftBg,
        border: `1px solid ${pathway.accentBorder}`,
        color: "#1a1a1a",
      }}
    >
      {pathway.primaryCategory}
    </span>
  );
}

/** The live HTML mockup (their real screen), scaled into a framed surface. */
export function LiveMockup({ pathway }: { pathway: ProductPathway }) {
  const isImage = !!pathway.imageUrl && !pathway.imageUrl.endsWith(".html");
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[rgba(var(--c-fg-rgb),0.08)] bg-[#0a0e1a]">
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- in-modal preview
        <img
          src={pathway.imageUrl}
          alt={pathway.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <LabsEmbed src={pathway.imageUrl!} title={pathway.title} />
      )}
    </div>
  );
}

export function ExternalLinks({ pathway }: { pathway: ProductPathway }) {
  if (!pathway.externalLinks?.length) return null;
  return (
    <div className="flex flex-col gap-3">
      {pathway.externalLinks.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-between gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.12)] px-5 py-4 text-sm font-medium transition-colors hover:border-[rgba(var(--c-fg-rgb),0.3)]"
        >
          <span className="min-w-0 break-words">{link.label}</span>
          <svg
            className="flex-shrink-0 opacity-50 transition-transform duration-300 group-hover:translate-x-1"
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          >
            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
          </svg>
        </a>
      ))}
    </div>
  );
}

export function Tags({ pathway }: { pathway: ProductPathway }) {
  return (
    <div className="flex flex-wrap gap-2">
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
  );
}

/* ------------------------------------------------------------------ */
/* Heading variants — different rhythms so modals don't start alike    */
/* ------------------------------------------------------------------ */

/** "01 · KICKER" + title. */
export function NumberHead({ n, kicker, children }: { n: string; kicker: string; children: React.ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-medium" style={{ color: "var(--cs)" }}>{n}</span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">{kicker}</span>
      </div>
      <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">{children}</h3>
    </Reveal>
  );
}

/** Accent vertical bar + title. */
export function MarkerHead({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h3 className="border-l-[3px] pl-4 text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]" style={{ borderColor: "var(--cs)" }}>
        {children}
      </h3>
    </Reveal>
  );
}

/** Plain bold title, no ornament. */
export function PlainHead({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <Reveal className="flex flex-col gap-2">
      {sub && <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">{sub}</span>}
      <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">{children}</h3>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Motion atoms                                                        */
/* ------------------------------------------------------------------ */

export function Reveal({
  children, delay = 0, y = 18, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered list container — children fade up one by one. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function Stagger({ children, className = "", amount = 0.25 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return <motion.div className={className} variants={staggerChild}>{children}</motion.div>;
}

/* ------------------------------------------------------------------ */
/* Surface atoms                                                       */
/* ------------------------------------------------------------------ */

/** Faux product window with a chrome bar. */
export function Frame({
  label, children, className = "",
}: { label?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-[rgba(var(--c-fg-rgb),0.1)] bg-[rgba(var(--c-fg-rgb),0.025)] ${className}`}>
      {label !== undefined && (
        <div className="flex items-center gap-2 border-b border-[rgba(var(--c-fg-rgb),0.08)] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[rgba(var(--c-fg-rgb),0.18)]" />
          <span className="h-2 w-2 rounded-full bg-[rgba(var(--c-fg-rgb),0.13)]" />
          <span className="h-2 w-2 rounded-full bg-[rgba(var(--c-fg-rgb),0.1)]" />
          <span className="ml-2 text-[0.7rem] font-medium opacity-50">{label}</span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

/** Phone-shaped frame for mobile case studies. */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[230px] rounded-[2rem] border border-[rgba(var(--c-fg-rgb),0.14)] bg-[rgba(var(--c-fg-rgb),0.025)] p-3 shadow-sm ${className}`}>
      <span className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-full bg-[rgba(var(--c-fg-rgb),0.18)]" />
      <div className="mt-3 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

export function StatusChip({ children, color }: { children: React.ReactNode; color?: string }) {
  const c = color ?? "var(--cs)";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium" style={{ background: `color-mix(in oklab, ${c} 16%, transparent)`, color: c }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      {children}
    </span>
  );
}

/** Segmented control — accent-filled active state. */
export function Tabs({
  items, active, onChange,
}: { items: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it, i) => {
        const on = i === active;
        return (
          <button
            key={it}
            type="button"
            onClick={() => onChange(i)}
            className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
            style={{
              background: on ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.05)",
              color: on ? "var(--cs-ink)" : "rgba(var(--c-fg-rgb),0.7)",
            }}
          >
            {it}
          </button>
        );
      })}
    </div>
  );
}

/** Mini bar group (workload / capacity / health). Optional accent threshold. */
export function Bars({
  values, warnAbove, warnColor = "#E08A8A", height = 36,
}: { values: number[]; warnAbove?: number; warnColor?: string; height?: number }) {
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {values.map((v, i) => (
        <span
          key={i}
          className="w-2.5 rounded-sm"
          style={{
            height: `${Math.max(8, v * height)}px`,
            background: warnAbove !== undefined && v > warnAbove ? warnColor : "var(--cs)",
          }}
        />
      ))}
    </div>
  );
}

/** Animated progress ring. */
export function Ring({ progress, size = 64, label }: { progress: number; size?: number; label?: string }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const reduced = useReducedMotion();
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(var(--c-fg-rgb),0.12)" strokeWidth="5" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--cs)" strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ}
          initial={reduced ? { strokeDashoffset: circ * (1 - progress) } : { strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ * (1 - progress) }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </svg>
      {label && <span className="absolute text-xs font-semibold">{label}</span>}
    </div>
  );
}

/** Generic step flow — horizontal on md+, stacked on mobile. */
export function StepFlow({
  steps, vertical = false,
}: { steps: { t: string; d?: string }[]; vertical?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <ol className={`flex gap-3 ${vertical ? "flex-col" : "flex-col md:flex-row md:gap-2"}`}>
      {steps.map((s, i) => (
        <motion.li
          key={s.t}
          className="relative flex-1 rounded-2xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.025)] p-4"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.42, ease: EASE, delay: i * 0.09 }}
        >
          <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[0.7rem] font-semibold" style={{ background: "var(--cs)", color: "var(--cs-ink)" }}>
            {i + 1}
          </span>
          <p className="text-sm font-semibold">{s.t}</p>
          {s.d && <p className="mt-1 text-xs leading-relaxed opacity-65">{s.d}</p>}
        </motion.li>
      ))}
    </ol>
  );
}

/** Short punchy statement block (no heading). */
export function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal>
      <p className={`text-2xl font-medium leading-snug tracking-tight md:text-[1.7rem] ${className}`}>{children}</p>
    </Reveal>
  );
}

/** Closing "what this shows" line with an accent rule. */
export function Closing({ children }: { children: React.ReactNode }) {
  return (
    <Reveal delay={0.05}>
      <p className="border-l-2 pl-4 text-base leading-relaxed opacity-80" style={{ borderColor: "var(--cs)" }}>
        {children}
      </p>
    </Reveal>
  );
}

/** Compact pain-point / note row with an accent dot. */
export function NoteRow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.08)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3 text-sm opacity-90">
      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: color ?? "var(--cs)" }} />
      <span>{children}</span>
    </div>
  );
}
