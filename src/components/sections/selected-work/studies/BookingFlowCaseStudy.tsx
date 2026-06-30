"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  PhoneFrame, StepFlow, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: a phone booking journey built around confidence. Tap a time, watch
   it lock into the review card, end on a calm confirmation. Accent = warm
   amber for selected + confirm states. */

const TIMES = ["9:00", "11:30", "14:00", "16:30"];

function BookingDemo() {
  const motionOn = useMotion();
  const [picked, setPicked] = useState<string | null>("11:30");
  const [done, setDone] = useState(false);
  return (
    <PhoneFrame>
      <div className="rounded-2xl bg-[rgba(var(--c-fg-rgb),0.03)] p-3">
        <p className="text-[0.7rem] font-semibold opacity-80">Choose a time</p>
        <p className="mb-2 text-[0.6rem] opacity-50">Tue · 24 spots open</p>
        <div className="grid grid-cols-2 gap-1.5">
          {TIMES.map((t) => {
            const on = picked === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => { setPicked(t); setDone(false); }}
                className="rounded-lg border py-1.5 text-[0.7rem] font-medium transition-colors"
                style={{
                  borderColor: on ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.12)",
                  background: on ? "color-mix(in oklab, var(--cs) 16%, transparent)" : "transparent",
                  color: on ? "var(--cs)" : "inherit",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Review card */}
      <div className="rounded-2xl border border-[rgba(var(--c-fg-rgb),0.1)] p-3">
        <p className="mb-1.5 text-[0.7rem] font-semibold opacity-80">Review</p>
        <div className="flex items-center justify-between text-[0.68rem]">
          <span className="opacity-60">Studio session</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={picked ?? "none"}
              className="font-semibold"
              style={{ color: "var(--cs)" }}
              initial={motionOn ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {picked ? `Tue · ${picked}` : "Pick a time"}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => picked && setDone(true)}
          className="mt-2.5 w-full rounded-lg py-1.5 text-[0.7rem] font-semibold"
          style={{ background: "var(--cs)", color: "var(--cs-ink)" }}
        >
          {done ? "Booked" : "Confirm booking"}
        </button>
      </div>

      {/* Confirmation */}
      <AnimatePresence>
        {done && (
          <motion.div
            className="flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-[0.68rem]"
            style={{ borderColor: "color-mix(in oklab, var(--cs) 45%, transparent)" }}
            initial={motionOn ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--cs) 22%, transparent)", color: "var(--cs)" }}>✓</span>
            <span className="opacity-75">Confirmed · Tue {picked}. Reminder set.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}

export function BookingFlowCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-center gap-6 md:grid-cols-2">
        <Statement>
          Users should understand availability and effort{" "}
          <span className="opacity-55">before they commit.</span>
        </Statement>
        <Reveal delay={0.1}><BookingDemo /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Clarity before questions">Answer the big question first: can I book this, and what happens next?</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">Booking flows fail when they ask for details before showing availability. So availability comes first, and forms come last.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Small decisions, one at a time">A short path, not a long form.</NumberHead>
        <StepFlow steps={[
          { t: "Service", d: "What you are booking." },
          { t: "Time", d: "Real availability up front." },
          { t: "Details", d: "Only what is needed." },
          { t: "Review", d: "Everything visible before submit." },
          { t: "Confirm", d: "A calm, complete close." },
        ]} />
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Designing for confidence, not just completion.</h3>
        </Reveal>
        <Closing>The win here is reducing hesitation: showing availability early, keeping each step small, and ending on a confirmation that feels finished rather than a celebration that feels loud.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
