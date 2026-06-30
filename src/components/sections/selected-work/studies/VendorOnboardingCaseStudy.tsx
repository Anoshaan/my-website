"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  MarkerHead, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: seller onboarding where quality is visible before publish. A
   readiness meter climbs as fields complete; status moves Draft -> Reviewing
   -> Approved; publish unlocks only when ready. Accent = orange for progress
   + publish-ready. */

const FIELDS = ["Profile", "Listing details", "Media", "Pricing", "Verification"];

function ListingBuilder() {
  const motionOn = useMotion();
  const [done, setDone] = useState<boolean[]>([true, true, false, false, false]);
  const count = done.filter(Boolean).length;
  const pct = count / FIELDS.length;
  const ready = count === FIELDS.length;
  const status = ready ? "Approved" : count >= 4 ? "Reviewing" : "Draft";
  return (
    <div className="rounded-2xl border border-[rgba(var(--c-fg-rgb),0.1)] bg-[rgba(var(--c-fg-rgb),0.02)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[0.7rem] font-semibold opacity-80">Listing readiness</span>
        <span className="rounded-full px-2.5 py-0.5 text-[0.62rem] font-medium" style={{ background: "color-mix(in oklab, var(--cs) 16%, transparent)", color: "var(--cs)" }}>{status}</span>
      </div>
      {/* meter */}
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-[rgba(var(--c-fg-rgb),0.08)]">
        <motion.div className="h-full rounded-full" style={{ background: "var(--cs)" }} animate={{ width: `${pct * 100}%` }} transition={{ duration: motionOn ? 0.4 : 0, ease: EASE }} />
      </div>
      <div className="flex flex-col gap-1.5">
        {FIELDS.map((f, i) => (
          <button key={f} type="button" onClick={() => setDone((s) => s.map((v, j) => (j === i ? !v : v)))}
            className="flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left"
            style={{ borderColor: done[i] ? "color-mix(in oklab, var(--cs) 40%, transparent)" : "rgba(var(--c-fg-rgb),0.1)" }}>
            <span className="flex h-4 w-4 items-center justify-center rounded-full text-[0.55rem] font-bold"
              style={{ background: done[i] ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.1)", color: done[i] ? "var(--cs-ink)" : "transparent" }}>✓</span>
            <span className="text-[0.72rem] font-medium" style={done[i] ? undefined : { opacity: 0.55 }}>{f}</span>
          </button>
        ))}
      </div>
      <button type="button" disabled={!ready}
        className="mt-3 w-full rounded-lg py-2 text-[0.72rem] font-semibold transition-opacity"
        style={{ background: ready ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.08)", color: ready ? "var(--cs-ink)" : "rgba(var(--c-fg-rgb),0.4)", cursor: ready ? "pointer" : "not-allowed" }}>
        {ready ? "Publish listing" : `Complete ${FIELDS.length - count} more to publish`}
      </button>
    </div>
  );
}

export function VendorOnboardingCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-start gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Statement>Good onboarding helps sellers publish better listings, with fewer mistakes.</Statement>
          <Reveal delay={0.08}><p className="text-sm leading-relaxed opacity-70">Complete the sections. The readiness meter climbs, status moves forward, and publish unlocks only when the listing is actually ready.</p></Reveal>
        </div>
        <Reveal delay={0.1}><ListingBuilder /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="A guided path">Sellers drop off when forms are long and confusing.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">Breaking the journey into clear, savable steps, with quality visible up front, means vendors publish complete listings instead of half-finished ones.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <MarkerHead>Status that reduces support questions.</MarkerHead>
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2">
            {["Draft", "Reviewing", "Approved"].map((s, i) => (
              <React.Fragment key={s}>
                <span className="rounded-full px-3 py-1 text-[0.7rem] font-medium" style={{ background: "color-mix(in oklab, var(--cs) 12%, transparent)", color: "var(--cs)" }}>{s}</span>
                {i < 2 && <span className="opacity-30">→</span>}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Required fields shown up front", "Inline guidance prevents mistakes", "Approval state always visible", "Drafts saved at every step"].map((t) => (
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
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Designing the operations side of a marketplace.</h3>
        </Reveal>
        <Closing>This is the seller-side craft buyers never see: guiding vendors to publish-ready quality, making approval legible, and protecting buyer confidence before a listing ever goes live.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
