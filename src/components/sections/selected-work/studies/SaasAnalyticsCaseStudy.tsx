"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  Frame, Tabs, Stagger, StaggerItem, NoteRow, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: a chart that explains itself. The line draws in, one point is
   highlighted, an insight card slides in, and a segment toggle re-reads the
   same chart. Accent = soft blue. */

const SEGMENTS = [
  { name: "All users", pts: [40, 38, 42, 36, 30, 33, 31], drop: 4, insight: "Conversion dipped after the mobile checkout step." },
  { name: "Mobile", pts: [44, 40, 39, 28, 22, 24, 23], drop: 3, insight: "Mobile checkout step 2 is where users leave." },
  { name: "Returning", pts: [30, 33, 35, 34, 36, 38, 40], drop: -1, insight: "Returning users are steady. The issue is new traffic." },
  { name: "New", pts: [46, 41, 38, 30, 26, 25, 24], drop: 3, insight: "New users drop early. First-run clarity needs work." },
];
const W = 320, H = 120, PAD = 12;

function toPath(pts: number[]) {
  const max = 50;
  const step = (W - PAD * 2) / (pts.length - 1);
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${PAD + i * step} ${H - PAD - (p / max) * (H - PAD * 2)}`).join(" ");
}
function point(pts: number[], i: number) {
  const max = 50;
  const step = (W - PAD * 2) / (pts.length - 1);
  return { x: PAD + i * step, y: H - PAD - (pts[i] / max) * (H - PAD * 2) };
}

function ChartInsight() {
  const motionOn = useMotion();
  const [seg, setSeg] = useState(1);
  const s = SEGMENTS[seg];
  const dp = s.drop >= 0 ? point(s.pts, s.drop) : null;
  return (
    <div className="flex flex-col gap-4">
      <Tabs items={SEGMENTS.map((x) => x.name)} active={seg} onChange={setSeg} />
      <Frame label={`Conversion · ${s.name}`}>
        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1={PAD} x2={W - PAD} y1={PAD + g * (H - PAD * 2)} y2={PAD + g * (H - PAD * 2)} stroke="rgba(var(--c-fg-rgb),0.07)" strokeWidth="1" />
            ))}
            <motion.path
              key={s.name}
              d={toPath(s.pts)}
              fill="none" stroke="var(--cs)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={motionOn ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: EASE }}
            />
            {dp && (
              <motion.circle
                key={`${s.name}-dot`} cx={dp.x} cy={dp.y} r="4" fill="var(--cs)"
                initial={motionOn ? { scale: 0, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4, ease: EASE }}
              />
            )}
          </svg>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.name}
              className="mt-1 inline-flex items-start gap-2 rounded-xl border px-3 py-2 text-xs"
              style={{ borderColor: "color-mix(in oklab, var(--cs) 45%, transparent)", background: "color-mix(in oklab, var(--cs) 8%, transparent)" }}
              initial={motionOn ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
            >
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--cs)" }} />
              <span className="font-medium opacity-90">{s.insight}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </Frame>
    </div>
  );
}

export function SaasAnalyticsCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      {/* Lead with the transformation, not the dashboard */}
      <section className="flex flex-col gap-6">
        <Statement>
          The dashboard was not built to show more numbers.{" "}
          <span className="opacity-55">It was built to make the important number explain itself.</span>
        </Statement>
        <Reveal delay={0.08}><ChartInsight /></Reveal>
        <Reveal delay={0.12}><p className="text-xs opacity-50">Switch the segment. The same chart re-reads itself.</p></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="The gap">Numbers were visible. Meaning was not.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">People could see the charts and still not answer the only questions that matter: what changed, why, which segment caused it, and what to check next.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="The insight layer">A layer that sits above the chart.</NumberHead>
        <Stagger className="flex flex-col gap-2.5">
          {["Highlight the change before the detail", "Explain it in one plain line", "Point to the segment behind it", "Suggest the next thing to check"].map((t, i) => (
            <StaggerItem key={t}>
              <div className="flex items-center gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3">
                <span className="font-mono text-xs font-semibold" style={{ color: "var(--cs)" }}>{`0${i + 1}`}</span>
                <span className="text-sm font-medium">{t}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="03" kicker="From reports to reading">Comparison, filters, and saved views.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Trend comparison against last period", "Filters that sit next to the question", "Saved views for repeat reporting", "Insight cards instead of raw tables"].map((t) => (
            <StaggerItem key={t}><NoteRow>{t}</NoteRow></StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Simplifying data-heavy interfaces into confident decisions.</h3>
        </Reveal>
        <Closing>Design skill here is restraint: showing the one number that matters, explaining it in plain language, and guiding the reader to the next action instead of more charts.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
