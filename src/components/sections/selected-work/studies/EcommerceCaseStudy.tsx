"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  Frame, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: a catalog you can question. Filters reorder the shelf; products
   carry just enough to compare. Accent = amber for selected filters + buy. */

const PRODUCTS = [
  { n: "Aero Mug", p: "$24", tags: ["under", "stock"] },
  { n: "Trail Bottle", p: "$38", tags: ["stock"] },
  { n: "Desk Lamp", p: "$72", tags: ["wireless"] },
  { n: "Mini Speaker", p: "$45", tags: ["under", "wireless", "stock"] },
  { n: "Cable Kit", p: "$18", tags: ["under", "stock"] },
  { n: "Stand Pro", p: "$96", tags: ["wireless"] },
];
const FILTERS = [
  { key: "all", label: "All" },
  { key: "under", label: "Under $50" },
  { key: "wireless", label: "Wireless" },
  { key: "stock", label: "In stock" },
];

function CatalogDemo() {
  const motionOn = useMotion();
  const [f, setF] = useState("all");
  const shown = f === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.tags.includes(f));
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((flt) => {
          const on = f === flt.key;
          return (
            <button key={flt.key} type="button" onClick={() => setF(flt.key)} className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ background: on ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.05)", color: on ? "var(--cs-ink)" : "rgba(var(--c-fg-rgb),0.7)" }}>
              {flt.label}
            </button>
          );
        })}
      </div>
      <Frame label={`Catalog · ${shown.length} items`}>
        <div className="grid grid-cols-3 gap-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.n}
                layout={motionOn}
                initial={motionOn ? { opacity: 0, scale: 0.9 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={motionOn ? { opacity: 0, scale: 0.9 } : undefined}
                transition={{ duration: 0.28, ease: EASE }}
                className="rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] p-2.5"
              >
                <span className="mb-2 block h-8 rounded-md bg-[rgba(var(--c-fg-rgb),0.05)]" />
                <p className="text-[0.7rem] font-semibold">{p.n}</p>
                <p className="text-[0.65rem]" style={{ color: "var(--cs)" }}>{p.p}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Frame>
    </div>
  );
}

export function EcommerceCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="flex flex-col gap-6">
        <Statement>
          Filters are not just controls.{" "}
          <span className="opacity-55">They are how a customer asks the catalog a question.</span>
        </Statement>
        <Reveal delay={0.08}><CatalogDemo /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Browsing needs structure">Customers decide faster when differences are easy to compare.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">When a shelf is hard to scan, people compare by hand or leave. Category logic and honest product cards do the sorting for them.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Cards and comparison">Enough on the card to choose.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Key differences visible on the card", "Filters that match real decisions", "Compare before committing to a detail page", "Sticky purchase action where the thumb is"].map((t) => (
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
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Discovery is a design problem, not a feature list.</h3>
        </Reveal>
        <Closing>The thinking here is decision support: structure the catalog so the right product surfaces quickly, and the customer reaches checkout already confident.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
