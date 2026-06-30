"use client";

import React from "react";
import { motion } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  StepFlow, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: raw AI output refined by design judgment. Rough drafts appear, the
   strongest direction is selected, weak ones recede, and sections align into a
   real system. Accent = mint for the chosen / refined areas. No magic sparkle. */

function DraftToPolish() {
  const motionOn = useMotion();
  const drafts = [
    { strong: false, r: -3 },
    { strong: true, r: 0 },
    { strong: false, r: 4 },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-dashed border-[rgba(var(--c-fg-rgb),0.16)] p-4">
        <p className="mb-2 text-[0.65rem] uppercase tracking-wide opacity-45">AI drafts</p>
        <div className="flex gap-2">
          {drafts.map((d, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-lg border p-2"
              style={{ borderColor: d.strong ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.14)", transform: `rotate(${d.r}deg)` }}
              initial={motionOn ? { opacity: 0, y: 8 } : false}
              whileInView={{ opacity: d.strong ? 1 : 0.4, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.12 }}
            >
              <span className="block h-1.5 w-full rounded-full" style={{ background: d.strong ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.2)" }} />
              <span className="mt-1 block h-1 w-2/3 rounded-full bg-[rgba(var(--c-fg-rgb),0.14)]" />
              {d.strong && <span className="mt-1.5 block text-center text-[0.55rem] font-semibold" style={{ color: "var(--cs)" }}>chosen</span>}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in oklab, var(--cs) 45%, transparent)" }}>
        <p className="mb-2 text-[0.65rem] uppercase tracking-wide" style={{ color: "var(--cs)" }}>Refined</p>
        <div className="flex flex-col gap-1.5">
          {[1, 0.7, 0.45].map((w, i) => (
            <span key={i} className="h-2.5 rounded-md" style={{ width: `${w * 100}%`, background: "color-mix(in oklab, var(--cs) 32%, transparent)" }} />
          ))}
        </div>
        <p className="mt-2 text-[0.62rem] opacity-55">Spacing, hierarchy, motion fixed by hand.</p>
      </div>
    </div>
  );
}

export function PortfolioAiCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="flex flex-col gap-6">
        <Statement>
          The speed came from AI.{" "}
          <span className="opacity-55">The quality came from direction, editing, and judgment.</span>
        </Statement>
        <Reveal delay={0.08}><DraftToPolish /></Reveal>
        <Reveal delay={0.12}><p className="text-xs opacity-50">This very site is the work and the proof at the same time.</p></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Fast did not mean random">A controlled sprint, not a template.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">A quick rebuild usually means a generic starter kit. The challenge was keeping speed without losing a point of view.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="The production line">AI explores. The designer directs.</NumberHead>
        <StepFlow steps={[
          { t: "Need", d: "An active job search." },
          { t: "Direction", d: "Human-led layout and tone." },
          { t: "AI build", d: "Components, fast." },
          { t: "Cleanup", d: "Every screen reviewed." },
          { t: "Polish", d: "Motion, responsive, perf." },
        ]} />
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="03" kicker="One responsive system">Desktop and mobile, in step.</NumberHead>
        <Reveal>
          <div className="flex items-end justify-center gap-3">
            <div className="h-24 w-40 rounded-lg border border-[rgba(var(--c-fg-rgb),0.14)] p-2">
              <span className="block h-2 w-1/2 rounded" style={{ background: "color-mix(in oklab, var(--cs) 30%, transparent)" }} />
              <span className="mt-1 block h-1.5 w-full rounded bg-[rgba(var(--c-fg-rgb),0.1)]" />
              <span className="mt-1 block h-1.5 w-3/4 rounded bg-[rgba(var(--c-fg-rgb),0.1)]" />
            </div>
            <div className="h-28 w-16 rounded-lg border border-[rgba(var(--c-fg-rgb),0.14)] p-2">
              <span className="block h-2 w-3/4 rounded" style={{ background: "color-mix(in oklab, var(--cs) 30%, transparent)" }} />
              <span className="mt-1 block h-1.5 w-full rounded bg-[rgba(var(--c-fg-rgb),0.1)]" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Taste is the part AI cannot replace.</h3>
        </Reveal>
        <Closing>The story here is judgment: using AI to move fast through production, while direction, editing, and craft keep the result personal rather than generic.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
