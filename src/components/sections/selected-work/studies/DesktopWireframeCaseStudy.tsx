"use client";

import React from "react";
import { motion } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: a blueprint, not a polished UI. Thin lines draw themselves into a
   product skeleton; a flow connects screens. Accent = slate, used only for
   active path lines + current markers. */

function BlueprintDraw() {
  const motionOn = useMotion();
  const stroke = "rgba(var(--c-fg-rgb),0.32)";
  const draw = (delay: number) => ({
    initial: motionOn ? { pathLength: 0, opacity: 0 } : false,
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, ease: EASE, delay },
  });
  return (
    <div className="rounded-2xl border border-dashed border-[rgba(var(--c-fg-rgb),0.16)] bg-[rgba(var(--c-fg-rgb),0.015)] p-4">
      <svg viewBox="0 0 320 180" className="w-full" aria-hidden>
        {/* desktop frame */}
        <motion.rect x="6" y="6" width="308" height="168" rx="8" fill="none" stroke={stroke} strokeWidth="1.4" {...draw(0)} />
        {/* top bar */}
        <motion.line x1="6" y1="26" x2="314" y2="26" stroke={stroke} strokeWidth="1.2" {...draw(0.5)} />
        {/* sidebar */}
        <motion.line x1="74" y1="26" x2="74" y2="174" stroke={stroke} strokeWidth="1.2" {...draw(0.7)} />
        {[44, 60, 76, 92].map((y, i) => (
          <motion.line key={y} x1="18" y1={y} x2="60" y2={y} stroke={stroke} strokeWidth="1.4" {...draw(0.9 + i * 0.08)} />
        ))}
        {/* content cards */}
        <motion.rect x="88" y="38" width="100" height="40" rx="4" fill="none" stroke={stroke} strokeWidth="1.2" {...draw(1.2)} />
        <motion.rect x="198" y="38" width="100" height="40" rx="4" fill="none" stroke={stroke} strokeWidth="1.2" {...draw(1.3)} />
        {/* table rows (accent = active region) */}
        {[96, 112, 128, 144].map((y, i) => (
          <motion.line key={y} x1="88" y1={y} x2="298" y2={y} stroke={i === 0 ? "var(--cs)" : stroke} strokeWidth={i === 0 ? "1.8" : "1.2"} {...draw(1.5 + i * 0.1)} />
        ))}
      </svg>
    </div>
  );
}

const FLOW = ["Dashboard", "Detail view", "Settings", "Admin action", "Confirmation"];

function FlowPath() {
  const motionOn = useMotion();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <motion.span
            className="rounded-lg border px-3 py-1.5 text-xs font-medium"
            style={{ borderColor: i === 0 ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.14)", color: i === 0 ? "var(--cs)" : "inherit" }}
            initial={motionOn ? { opacity: 0, y: 8 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.1 }}
          >
            {f}
          </motion.span>
          {i < FLOW.length - 1 && <span className="opacity-30">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

const MODULES = ["Dashboard shell", "Data table states", "User roles", "Settings flow", "Admin confirmation"];

export function DesktopWireframeCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      {/* Lead with the blueprint, not a finished screen */}
      <section className="flex flex-col gap-6">
        <Statement>
          The first design decision was not colour or layout.{" "}
          <span className="opacity-55">It was deciding how the product should be understood.</span>
        </Statement>
        <Reveal delay={0.08}><BlueprintDraw /></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Structure before surface">Wireframes came first for a reason.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">Complex desktop products fail when navigation and hierarchy are treated as visual layout. The skeleton had to make sense before a single pixel was styled.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Mapping the skeleton">One path through the whole product.</NumberHead>
        <Reveal delay={0.05}><FlowPath /></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="03" kicker="Reducing complexity early">Cheap to change on paper. Expensive in code.</NumberHead>
        <Reveal>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-dashed border-[rgba(var(--c-fg-rgb),0.16)] p-4">
              <p className="mb-2 text-[0.65rem] uppercase tracking-wide opacity-45">Before</p>
              <div className="flex flex-wrap gap-1.5">
                {["?", "?", "?", "?", "?"].map((_, i) => (
                  <span key={i} className="h-6 w-10 rounded-md border border-[rgba(var(--c-fg-rgb),0.14)]" style={{ transform: `rotate(${[-5, 4, -2, 6, -3][i]}deg)` }} />
                ))}
              </div>
              <p className="mt-2 text-[0.7rem] opacity-50">Scattered screens</p>
            </div>
            <div className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in oklab, var(--cs) 45%, transparent)" }}>
              <p className="mb-2 text-[0.65rem] uppercase tracking-wide opacity-45">After</p>
              <div className="flex flex-col gap-1.5">
                {[0, 1, 2].map((r) => (
                  <span key={r} className="h-3 rounded-md" style={{ width: `${100 - r * 18}%`, background: "color-mix(in oklab, var(--cs) 35%, transparent)" }} />
                ))}
              </div>
              <p className="mt-2 text-[0.7rem] opacity-50">Connected skeleton</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="04" kicker="Key wireframe modules">The blocks the build depended on.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {MODULES.map((m, i) => (
            <StaggerItem key={m}>
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-[rgba(var(--c-fg-rgb),0.16)] px-4 py-3">
                <span className="font-mono text-xs font-semibold" style={{ color: "var(--cs)" }}>{`M${i + 1}`}</span>
                <span className="text-sm font-medium">{m}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Product thinking before UI polish.</h3>
        </Reveal>
        <Closing>This is the planning layer most case studies hide: deciding structure, navigation, roles, and flows first, so the polished interface has something solid underneath.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
