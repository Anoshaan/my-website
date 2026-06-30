"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  Frame, Tabs, Stagger, StaggerItem, Closing, useMotion,
} from "../caseStudyKit";

/* Concept: a marketing site as a product-education system. Benefit-first
   feature cards, use-case tabs that switch by audience, conversion shown only
   after value. Accent = emerald for active feature/use-case/CTA. */

const USECASES = [
  { who: "Founders", line: "See traction without exporting a single CSV." },
  { who: "Ops teams", line: "Replace five spreadsheets with one source." },
  { who: "Sales", line: "Point prospects at proof, not promises." },
];

function UseCaseSwitch() {
  const motionOn = useMotion();
  const [i, setI] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <Tabs items={USECASES.map((u) => u.who)} active={i} onChange={setI} />
      <Frame label={`Built for ${USECASES[i].who}`}>
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            className="text-sm font-medium"
            initial={motionOn ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {USECASES[i].line}
          </motion.p>
        </AnimatePresence>
      </Frame>
    </div>
  );
}

const FEATURES = [
  { benefit: "Know what changed overnight", detail: "Daily digest, no dashboard digging." },
  { benefit: "Trust the numbers in a meeting", detail: "Live data, one source of truth." },
  { benefit: "Onboard a teammate in minutes", detail: "Roles and views, preset." },
];

export function SaasWebsiteCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="flex flex-col gap-6">
        <Statement>
          A SaaS site has to teach the product{" "}
          <span className="opacity-55">while moving visitors toward action.</span>
        </Statement>
        <Reveal delay={0.08}><p className="text-sm leading-relaxed opacity-70">One question shaped the structure: how fast can a visitor understand the value?</p></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Positioning first">Lead with the value, not the feature list.</NumberHead>
        <Stagger className="flex flex-col gap-2.5">
          {FEATURES.map((f, i) => (
            <StaggerItem key={f.benefit}>
              <div className="rounded-2xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.65rem]" style={{ color: "var(--cs)" }}>{`0${i + 1}`}</span>
                  <span className="text-sm font-semibold">{f.benefit}</span>
                </div>
                <p className="mt-0.5 pl-6 text-xs opacity-60">{f.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.05}><p className="text-xs opacity-50">Benefit first. Supporting detail second.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Use cases by audience">One product, read differently per visitor.</NumberHead>
        <Reveal delay={0.05}><UseCaseSwitch /></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="03" kicker="CMS structure for scale">Sections are content types, not hand-built pages.</NumberHead>
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {["Hero", "Feature story", "Use case", "Proof", "Pricing", "Lead capture"].map((b) => (
              <span key={b} className="rounded-lg border border-[rgba(var(--c-fg-rgb),0.12)] px-3 py-1.5 text-xs font-medium">{b}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.05}><p className="text-sm leading-relaxed opacity-70">The team reorders and reuses blocks as the roadmap moves, so the site keeps up with the product.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Strategy, structured as a system.</h3>
        </Reveal>
        <Closing>This is positioning turned into architecture: explain value quickly, adapt the story per audience, and keep conversion calm and well-timed, all on a content model that scales.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
