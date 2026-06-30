"use client";

import React from "react";
import { motion } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  PhoneFrame, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: a learning path that answers "where do I continue?". The continue
   card lifts, lesson nodes light up one by one, progress fills in small
   segments. Accent = sky blue for current lesson + active node. */

const NODES = [
  { t: "Intro", done: true },
  { t: "Variables", done: true },
  { t: "Functions", current: true },
  { t: "Loops" },
  { t: "Practice" },
];

function LearningPath() {
  const motionOn = useMotion();
  return (
    <PhoneFrame>
      {/* continue card lifts */}
      <motion.div
        className="rounded-2xl border p-3"
        style={{ borderColor: "color-mix(in oklab, var(--cs) 50%, transparent)", background: "color-mix(in oklab, var(--cs) 8%, transparent)" }}
        initial={motionOn ? { opacity: 0, y: 14 } : false}
        whileInView={motionOn ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="text-[0.6rem] uppercase tracking-wide" style={{ color: "var(--cs)" }}>Continue</p>
        <p className="mt-0.5 text-sm font-semibold">Functions · Lesson 3</p>
        <div className="mt-2 flex gap-1">
          {[1, 1, 1, 0, 0, 0].map((on, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: on ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.14)" }} />
          ))}
        </div>
        <p className="mt-1 text-[0.62rem] opacity-55">3 of 6 sections</p>
      </motion.div>

      {/* path nodes light up one by one */}
      <Stagger className="flex flex-col gap-1.5 rounded-2xl bg-[rgba(var(--c-fg-rgb),0.03)] p-3" amount={0.3}>
        {NODES.map((n) => (
          <StaggerItem key={n.t}>
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[0.55rem] font-bold"
                style={{
                  background: n.done ? "color-mix(in oklab, var(--cs) 22%, transparent)" : n.current ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.08)",
                  color: n.current ? "var(--cs-ink)" : n.done ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.5)",
                }}
              >
                {n.done ? "✓" : ""}
              </span>
              <span className="text-[0.72rem] font-medium" style={n.current ? { color: "var(--cs)" } : n.done ? undefined : { opacity: 0.5 }}>{n.t}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </PhoneFrame>
  );
}

export function EdTechCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Statement>Learning apps fail when users return and cannot tell where to continue.</Statement>
          <Reveal delay={0.08}><p className="text-sm leading-relaxed opacity-70">The first screen exists to remove one question: where do I pick this back up?</p></Reveal>
        </div>
        <Reveal delay={0.1}><LearningPath /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Return without searching">Continue is the first action, not a buried one.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">A content library makes you hunt. A guided path puts the next step in front of you.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Progress that explains itself">Small wins, not one long bar.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Lessons broken into short sections", "Progress in human terms, not just percent", "Completed, active and locked states are obvious", "Practice framed as a checkpoint, not a quiz"].map((t) => (
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
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Orientation is a feature.</h3>
        </Reveal>
        <Closing>Motivation here is structural, not gamified: make the next step obvious, show progress in small honest pieces, and keep the learner oriented every time they come back.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
