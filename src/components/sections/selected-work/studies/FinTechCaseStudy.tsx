"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  MarkerHead, PhoneFrame, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: financial UX that reduces doubt. Restrained, premium. A row expands
   into detail, status moves Pending -> Processing -> Completed, and a quiet
   lock/check confirms. Accent = trust blue, reserved for secure states. */

const ROWS = [
  { who: "Rent transfer", amt: "-1,200", state: "Completed", detail: "Sent to Maple Lettings · cleared today" },
  { who: "Payroll", amt: "+3,400", state: "Received", detail: "Monthly salary · settled" },
  { who: "Card top-up", amt: "-200", state: "Pending", detail: "Processing · usually under a minute" },
];
const STATE_STEPS = ["Pending", "Processing", "Completed"];

function Activity() {
  const motionOn = useMotion();
  const [open, setOpen] = useState(0);
  return (
    <PhoneFrame className="max-w-[250px]">
      <div className="rounded-2xl bg-[rgba(var(--c-fg-rgb),0.03)] p-3">
        <p className="text-[0.6rem] uppercase tracking-wide opacity-50">Balance</p>
        <p className="text-lg font-semibold">$ 8,640.20</p>
      </div>
      <div className="flex flex-col gap-1.5">
        {ROWS.map((r, i) => {
          const isOpen = open === i;
          const secure = r.state === "Completed" || r.state === "Received";
          return (
            <button key={r.who} type="button" onClick={() => setOpen(isOpen ? -1 : i)} className="rounded-xl border border-[rgba(var(--c-fg-rgb),0.1)] px-3 py-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-medium">{r.who}</span>
                <span className="text-[0.72rem] font-semibold" style={{ color: r.amt.startsWith("+") ? "var(--cs)" : "inherit" }}>{r.amt}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: secure ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.3)" }} />
                <span className="text-[0.6rem] opacity-55">{r.state}</span>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={motionOn ? { opacity: 0, height: 0 } : false}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="mt-1.5 text-[0.62rem] leading-relaxed opacity-65">{r.detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </PhoneFrame>
  );
}

function StatusStepper() {
  const motionOn = useMotion();
  return (
    <div className="flex items-center gap-2">
      {STATE_STEPS.map((s, i) => (
        <React.Fragment key={s}>
          <motion.span
            className="rounded-full px-3 py-1 text-[0.7rem] font-medium"
            style={{ background: "color-mix(in oklab, var(--cs) 14%, transparent)", color: "var(--cs)" }}
            initial={motionOn ? { opacity: 0, y: 6 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.25 }}
          >
            {s}
          </motion.span>
          {i < STATE_STEPS.length - 1 && <span className="opacity-30">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export function FinTechCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Statement>Financial UX is about reducing doubt at every step.</Statement>
          <Reveal delay={0.08}><p className="text-sm leading-relaxed opacity-70">People lose confidence when a payment is sent but its status is unclear. Tap a row to see exactly what happened.</p></Reveal>
        </div>
        <Reveal delay={0.1}><Activity /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Status before action">Show the state, then the number.</NumberHead>
        <Reveal delay={0.05}><StatusStepper /></Reveal>
        <Reveal delay={0.1}><p className="text-sm leading-relaxed opacity-70">Plain words like pending, sent and received replace codes. The user always knows where a transaction stands.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <MarkerHead>Confirmation without confusion.</MarkerHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Every money action ends with a calm review step", "Amounts stay stable, never flashy", "A quiet lock and check confirm security", "Activity and balance read on one surface"].map((t) => (
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
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Trust is built in the small moments.</h3>
        </Reveal>
        <Closing>The discipline here is restraint: clear states, plain language, and steady motion. In financial products, calm and certainty matter more than speed or flourish.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
