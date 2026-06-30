"use client";

import React from "react";
import { motion } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: early product thinking, intentionally low-fidelity. Rough screens
   connect into a flow; a decision branches; the MVP path is highlighted.
   Accent = slate, used only for the chosen path + decision markers. */

function Wireflow() {
  const motionOn = useMotion();
  const stroke = "rgba(var(--c-fg-rgb),0.3)";
  const draw = (delay: number, accent = false) => ({
    initial: motionOn ? { pathLength: 0, opacity: 0 } : false,
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, ease: EASE, delay },
    stroke: accent ? "var(--cs)" : stroke,
  });
  // three low-fi phone screens + a branch
  const phone = (x: number, delay: number) => (
    <>
      <motion.rect x={x} y="20" width="46" height="84" rx="6" fill="none" strokeWidth="1.4" {...draw(delay)} />
      <motion.line x1={x + 8} y1="34" x2={x + 30} y2="34" strokeWidth="1.4" {...draw(delay + 0.2)} />
      <motion.rect x={x + 8} y="44" width="30" height="20" rx="3" fill="none" strokeWidth="1.2" {...draw(delay + 0.3)} />
      <motion.line x1={x + 8} y1="74" x2={x + 38} y2="74" strokeWidth="1.2" {...draw(delay + 0.4)} />
      <motion.line x1={x + 8} y1="84" x2={x + 30} y2="84" strokeWidth="1.2" {...draw(delay + 0.45)} />
    </>
  );
  return (
    <div className="rounded-2xl border border-dashed border-[rgba(var(--c-fg-rgb),0.16)] bg-[rgba(var(--c-fg-rgb),0.015)] p-4">
      <svg viewBox="0 0 300 130" className="w-full" aria-hidden>
        {phone(8, 0)}
        {phone(92, 0.6)}
        {phone(176, 1.2)}
        {/* connectors */}
        <motion.line x1="56" y1="62" x2="90" y2="62" strokeWidth="1.4" {...draw(0.9, true)} markerEnd="url(#wf-arrow)" />
        <motion.line x1="140" y1="62" x2="174" y2="62" strokeWidth="1.4" {...draw(1.5, true)} markerEnd="url(#wf-arrow)" />
        {/* decision branch off the middle screen */}
        <motion.line x1="115" y1="104" x2="115" y2="118" strokeWidth="1.2" {...draw(1.8)} />
        <motion.circle cx="115" cy="122" r="3" fill="var(--cs)" initial={motionOn ? { scale: 0 } : false} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2, duration: 0.3 }} />
        <defs>
          <marker id="wf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--cs)" strokeWidth="1" />
          </marker>
        </defs>
      </svg>
      <div className="mt-1 flex items-center justify-between text-[0.6rem] opacity-50">
        <span>Entry</span><span>Decision point</span><span>MVP screen</span>
      </div>
    </div>
  );
}

export function MobileWireflowCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="flex flex-col gap-6">
        <Statement>
          The goal was not to make screens look finished.{" "}
          <span className="opacity-55">It was to make the product logic visible.</span>
        </Statement>
        <Reveal delay={0.08}><Wireflow /></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Idea to flow">Conversation first becomes a path.</NumberHead>
        <Stagger className="flex flex-wrap items-center gap-2">
          {["Client notes", "User goal", "Key screens", "Decision points", "MVP path"].map((t, i, a) => (
            <StaggerItem key={t}>
              <span className="flex items-center gap-2">
                <span className="rounded-lg border border-dashed border-[rgba(var(--c-fg-rgb),0.18)] px-3 py-1.5 text-xs font-medium">{t}</span>
                {i < a.length - 1 && <span className="opacity-30">→</span>}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Screens before styling">Low fidelity on purpose.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">Beautiful screens that do not connect create rework. Wireframes keep the focus on user action, not visual style, while it is still cheap to change.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="03" kicker="Decision points & MVP">Branch the paths. Then draw the line.</NumberHead>
        <Reveal>
          <div className="grid grid-cols-2 gap-3">
            {[{ t: "Edge cases", d: "Empty, error and alternate paths mapped early." }, { t: "MVP boundary", d: "What ships first, separated from later." }].map((c) => (
              <div key={c.t} className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in oklab, var(--cs) 40%, transparent)" }}>
                <p className="text-sm font-semibold">{c.t}</p>
                <p className="mt-1 text-xs leading-relaxed opacity-65">{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Thinking made visible before pixels.</h3>
        </Reveal>
        <Closing>This is the part of the process clients rarely see: turning an idea into a flow, exposing the decisions and edge cases, and agreeing on the MVP before any screen gets styled.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
