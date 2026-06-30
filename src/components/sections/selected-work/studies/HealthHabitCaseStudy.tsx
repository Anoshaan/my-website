"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, MarkerHead,
  PlainHead, PhoneFrame, Stagger, StaggerItem, Closing, useMotion,
} from "../caseStudyKit";

/* Concept: a calm daily companion. Breathing ring, soft check-in fill, a
   missed day that invites a restart instead of punishing. Accent = mint,
   used only as the supportive action colour. */

function CheckIn() {
  const motionOn = useMotion();
  const [checked, setChecked] = useState(false);
  return (
    <PhoneFrame>
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-[rgba(var(--c-fg-rgb),0.03)] p-4">
        <p className="text-[0.7rem] font-semibold opacity-75">Today</p>
        {/* breathing ring */}
        <div className="csk-breathe relative flex h-20 w-20 items-center justify-center rounded-full border-[3px]" style={{ borderColor: "color-mix(in oklab, var(--cs) 60%, transparent)" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={checked ? "done" : "open"}
              className="text-sm font-semibold"
              style={{ color: checked ? "var(--cs)" : "inherit" }}
              initial={motionOn ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {checked ? "✓ Done" : "3 / 5"}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => setChecked((v) => !v)}
          className="w-full rounded-full py-2 text-[0.72rem] font-semibold transition-colors"
          style={{ background: checked ? "color-mix(in oklab, var(--cs) 18%, transparent)" : "var(--cs)", color: checked ? "var(--cs)" : "var(--cs-ink)" }}
        >
          {checked ? "Checked in for today" : "Check in"}
        </button>
      </div>
    </PhoneFrame>
  );
}

export function HealthHabitCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Statement>Good habit design should help people return.</Statement>
          <Reveal delay={0.08}><p className="text-sm leading-relaxed opacity-70">Not punish them for missing a day. The product is built for real life, where progress is rarely perfect.</p></Reveal>
        </div>
        <Reveal delay={0.1}><CheckIn /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <PlainHead sub="Designed for imperfect progress">A check-in, not a test.</PlainHead>
        <Stagger className="flex flex-col gap-2.5">
          {["One gentle daily action, never a wall of metrics", "Progress shown softly, never as pressure", "Missed days stay recoverable by design"].map((t) => (
            <StaggerItem key={t}>
              <div className="flex items-center gap-3 rounded-2xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3 text-sm opacity-90">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--cs)" }} />{t}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="flex flex-col gap-5">
        <MarkerHead>Restart-friendly UX.</MarkerHead>
        <Reveal>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[rgba(var(--c-fg-rgb),0.09)] p-4">
              <p className="mb-1.5 text-[0.65rem] uppercase tracking-wide opacity-45">Missed yesterday</p>
              <p className="text-sm leading-relaxed opacity-80">No broken streak. No red. Just a quiet note.</p>
            </div>
            <div className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in oklab, var(--cs) 45%, transparent)" }}>
              <p className="mb-1.5 text-[0.65rem] uppercase tracking-wide" style={{ color: "var(--cs)" }}>Today</p>
              <p className="text-sm font-medium">Restart today →</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Emotion is a design material.</h3>
        </Reveal>
        <Closing>The thinking here is tone: supportive language, soft motion, and a restart that feels normal. Retention comes from how the product makes someone feel when they slip, not from streak pressure.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
