"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  Frame, Tabs, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: a production sprint board. Rough client notes become a sitemap,
   then sections, then an AI draft, then a designer cleanup, then QA. Accent =
   violet for the active stage. Distinct from the Portfolio AI before/after. */

const STAGES = [
  { name: "Notes", render: () => (
    <div className="flex flex-wrap gap-1.5">
      {["we do roofing", "need quotes", "show reviews", "service areas"].map((n, i) => (
        <span key={n} className="rounded-md border border-[rgba(var(--c-fg-rgb),0.14)] px-2 py-1 text-[0.65rem]" style={{ transform: `rotate(${[-3, 2, -1, 3][i]}deg)`, background: "rgba(var(--c-fg-rgb),0.03)" }}>{n}</span>
      ))}
    </div>
  ) },
  { name: "Sitemap", render: () => (
    <div className="flex flex-wrap gap-1.5">
      {["Home", "Services", "Areas", "Reviews", "Quote"].map((n) => (
        <span key={n} className="rounded-md px-2.5 py-1 text-[0.65rem] font-medium" style={{ background: "color-mix(in oklab, var(--cs) 14%, transparent)", color: "var(--cs)" }}>{n}</span>
      ))}
    </div>
  ) },
  { name: "AI draft", render: () => (
    <div className="flex flex-col gap-1.5">
      {[1, 0.6, 0.8].map((w, i) => <span key={i} className="h-3 rounded border border-dashed border-[rgba(var(--c-fg-rgb),0.2)]" style={{ width: `${w * 100}%` }} />)}
      <span className="text-[0.6rem] opacity-50">rough wireframes, generated</span>
    </div>
  ) },
  { name: "Cleanup", render: () => (
    <div className="flex flex-col gap-1.5">
      {[1, 0.66, 0.82].map((w, i) => <span key={i} className="h-3 rounded" style={{ width: `${w * 100}%`, background: "color-mix(in oklab, var(--cs) 28%, transparent)" }} />)}
      <span className="text-[0.6rem] opacity-50">spacing + hierarchy sharpened</span>
    </div>
  ) },
  { name: "QA", render: () => (
    <div className="flex items-center gap-2">
      {["Desktop", "Tablet", "Mobile"].map((d) => (
        <span key={d} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.62rem] font-medium" style={{ background: "color-mix(in oklab, var(--cs) 12%, transparent)", color: "var(--cs)" }}>✓ {d}</span>
      ))}
    </div>
  ) },
];

function SprintBoard() {
  const motionOn = useMotion();
  const [i, setI] = useState(1);
  return (
    <div className="flex flex-col gap-3">
      <Tabs items={STAGES.map((s) => s.name)} active={i} onChange={setI} />
      <Frame label={`Sprint · ${STAGES[i].name}`}>
        <div className="min-h-[3.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={motionOn ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, ease: EASE }}
            >
              {STAGES[i].render()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Frame>
    </div>
  );
}

export function AiSprintCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="flex flex-col gap-6">
        <Statement>
          AI speeds up the middle of the process.{" "}
          <span className="opacity-55">Strategy and review still decide the result.</span>
        </Statement>
        <Reveal delay={0.08}><SprintBoard /></Reveal>
        <Reveal delay={0.12}><p className="text-xs opacity-50">Step through the sprint. Rough notes become a usable direction.</p></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Rough notes are not a brief">Structure comes before generation.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">Skip the structure and AI produces something generic, fast. The sitemap and section plan are what make the output usable.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Where AI helps, where it does not">A tool inside a controlled process.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["AI accelerates drafts and components", "The brief and IA stay human-led", "Designer cleanup fixes spacing and hierarchy", "Responsive QA before anything ships"].map((t) => (
            <StaggerItem key={t}>
              <div className="flex items-center gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3 text-sm opacity-90">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--cs)" }} />{t}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">A repeatable workflow, not a one-off trick.</h3>
        </Reveal>
        <Closing>The value here is operational: a sprint that turns messy client input into a launch-ready direction, using AI for speed without skipping strategy or review.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
