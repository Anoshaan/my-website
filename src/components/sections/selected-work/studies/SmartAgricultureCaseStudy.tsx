"use client";

import React from "react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, MarkerHead,
  NumberHead, Frame, Stagger, StaggerItem, Closing,
} from "../caseStudyKit";

/* Concept: a living system. Slow, precise motion — water level, nutrient
   pulse, batch growth stages, harvest timeline. Accent = leaf green. */

function WaterTank() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-16 w-10 overflow-hidden rounded-lg border border-[rgba(var(--c-fg-rgb),0.15)]">
        {/* Fixed-height fill anchored to the bottom; CSS drifts it via transform. */}
        <div
          className="csk-water absolute inset-x-0 bottom-0 h-[72%]"
          style={{ background: "color-mix(in oklab, var(--cs) 55%, transparent)" }}
        />
      </div>
      <div>
        <p className="text-xs font-semibold">Water</p>
        <p className="text-[0.7rem] opacity-55">Stable · 62%</p>
      </div>
    </div>
  );
}

function NutrientRing({ attention }: { attention?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-[0.62rem] font-semibold ${attention ? "csk-ring" : ""}`}
        style={{ borderColor: attention ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.18)", color: attention ? "var(--cs)" : "inherit" }}
      >
        N-P-K
      </div>
      <div>
        <p className="text-xs font-semibold">Nutrients</p>
        <p className="text-[0.7rem] opacity-55">{attention ? "Nitrogen low" : "In range"}</p>
      </div>
    </div>
  );
}

const BATCHES = [
  { id: "Basil · A1", stage: 2, label: "Ready soon" },
  { id: "Kale · B2", stage: 1, label: "Growing" },
  { id: "Mint · C3", stage: 0, label: "Seedling" },
];
const STAGES = ["Seedling", "Growing", "Ready"];

function BatchCard({ b }: { b: typeof BATCHES[number] }) {
  return (
    <div className="rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold">{b.id}</span>
        <span className="text-[0.65rem]" style={{ color: "var(--cs)" }}>{b.label}</span>
      </div>
      <div className="flex items-center gap-1">
        {STAGES.map((st, i) => (
          <React.Fragment key={st}>
            <span className="h-1.5 flex-1 rounded-full" style={{ background: i <= b.stage ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.12)" }} />
          </React.Fragment>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[0.58rem] opacity-50">
        {STAGES.map((st) => <span key={st}>{st}</span>)}
      </div>
    </div>
  );
}

export function SmartAgricultureCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-6">
        <Statement>
          The plants were visible. <span className="opacity-55">The system behind them was not.</span>
        </Statement>
        <Reveal delay={0.08}>
          <Frame label="Farm health">
            <div className="grid grid-cols-2 gap-4">
              <WaterTank />
              <NutrientRing attention />
            </div>
          </Frame>
        </Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="More than one status">A farm is water, nutrients, growth, and environment at once.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">A grower should not inspect every tank and tray to know if things are on track. The system reads each signal so they can trust a glance.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <MarkerHead>Batch-first thinking.</MarkerHead>
        <Reveal delay={0.05}>
          <Frame label="Active batches">
            <Stagger className="grid gap-2.5 sm:grid-cols-3">
              {BATCHES.map((b) => <StaggerItem key={b.id}><BatchCard b={b} /></StaggerItem>)}
            </Stagger>
          </Frame>
        </Reveal>
        <Reveal delay={0.05}><p className="text-sm leading-relaxed opacity-70">Growers think in plant batches, not abstract charts. So the product does too.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Signals before spreadsheets">Health first. Readings on demand.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["A calm status before any number", "Soft pulse only when a value drifts", "Detailed readings one tap deeper", "Alerts that guide, not panic"].map((t) => (
            <StaggerItem key={t}>
              <div className="flex items-center gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3 text-sm opacity-90">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--cs)" }} />{t}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="03" kicker="Harvest readiness">Knowing what is close, before it is urgent.</NumberHead>
        <Reveal>
          <div className="relative ml-2 flex flex-col gap-3 border-l border-[rgba(var(--c-fg-rgb),0.14)] pl-5">
            {[{ t: "Basil · A1", d: "Harvest in 2 days", on: true }, { t: "Kale · B2", d: "~9 days", on: false }, { t: "Mint · C3", d: "~3 weeks", on: false }].map((h) => (
              <div key={h.t} className="relative">
                <span className="absolute -left-[1.58rem] top-1 h-2.5 w-2.5 rounded-full" style={{ background: h.on ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.2)" }} />
                <p className="text-sm font-medium">{h.t}</p>
                <p className="text-xs opacity-55">{h.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Designing for a real domain, not a generic dashboard.</h3>
        </Reveal>
        <Closing>This concept shows product thinking shaped around how growers actually work: batches over rows of data, signals over spreadsheets, and timing made visible before a decision becomes urgent.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
