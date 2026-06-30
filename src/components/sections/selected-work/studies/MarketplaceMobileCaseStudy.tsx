"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  MarkerHead, PhoneFrame, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: buyer-side marketplace. The product is half the decision; the
   seller is the other half. Trust reveals on context, save uses a bookmark
   beat, contact rises when ready. Accent = pink for trust, save, CTA. */

function MarketCard() {
  const motionOn = useMotion();
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <PhoneFrame className="max-w-[240px]">
      <div className="rounded-2xl border border-[rgba(var(--c-fg-rgb),0.1)] p-3">
        <div className="relative mb-2 h-20 rounded-xl bg-[rgba(var(--c-fg-rgb),0.05)]">
          <button type="button" onClick={() => setSaved((v) => !v)} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--c-bg)] text-xs shadow-sm" aria-label="Save">
            <motion.span animate={motionOn && saved ? { scale: [1, 1.3, 1] } : undefined} transition={{ duration: 0.35 }} style={{ color: saved ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.4)" }}>
              {saved ? "★" : "☆"}
            </motion.span>
          </button>
        </div>
        <p className="text-[0.74rem] font-semibold">Vintage film camera</p>
        <p className="text-[0.7rem]" style={{ color: "var(--cs)" }}>$ 140</p>
        <button type="button" onClick={() => setOpen((v) => !v)} className="mt-2 flex w-full items-center justify-between rounded-lg bg-[rgba(var(--c-fg-rgb),0.04)] px-2.5 py-1.5 text-left">
          <span className="text-[0.66rem] font-medium">Seller · M. Okafor</span>
          <span className="text-[0.6rem] opacity-50">{open ? "hide" : "trust"}</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={motionOn ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {["★ 4.9", "ID verified", "120 sold"].map((b) => (
                  <span key={b} className="rounded-full px-2 py-0.5 text-[0.58rem] font-medium" style={{ background: "color-mix(in oklab, var(--cs) 16%, transparent)", color: "var(--cs)" }}>{b}</span>
                ))}
              </div>
              <button type="button" className="mt-2 w-full rounded-lg py-1.5 text-[0.66rem] font-semibold" style={{ background: "var(--cs)", color: "var(--cs-ink)" }}>Contact seller</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}

export function MarketplaceMobileCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Statement>In a marketplace, the product is only half the decision.</Statement>
          <Reveal delay={0.08}><p className="text-sm leading-relaxed opacity-70">The seller is the other half. Open the trust panel; contact appears once there is enough context to act.</p></Reveal>
        </div>
        <Reveal delay={0.1}><MarketCard /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Discovery was not enough">Buyers decide with incomplete information.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">If seller credibility, item condition, or contact feels unclear, people hesitate. Trust cues need to sit right at the decision.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <MarkerHead>Trust signals, without the clutter.</MarkerHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Seller proof appears when it is relevant", "Save uses a light bookmark beat", "Compare brings two cards side by side", "Contact rises only after enough context"].map((t) => (
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
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Designing trust into the moment of choice.</h3>
        </Reveal>
        <Closing>The craft is timing: revealing seller credibility exactly where doubt appears, and keeping the mobile feed light so discovery still feels effortless.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
