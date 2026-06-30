"use client";

import React from "react";
import { motion } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  MarkerHead, Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: a trust-to-booking path, not a CMS showcase. A route line runs from
   intent to contact, with trust sitting right next to the action. Accent =
   green for the path line + CTA. */

const STOPS = ["Search intent", "Service detail", "Trust proof", "Availability", "Contact"];

function TrustPath() {
  const motionOn = useMotion();
  return (
    <div className="rounded-2xl border border-[rgba(var(--c-fg-rgb),0.1)] bg-[rgba(var(--c-fg-rgb),0.02)] p-5">
      <div className="relative flex flex-col gap-3 pl-6">
        {/* the path line */}
        <motion.span
          className="absolute left-[7px] top-1 w-[2px] rounded-full"
          style={{ background: "var(--cs)", bottom: "0.5rem", transformOrigin: "top" }}
          initial={motionOn ? { scaleY: 0 } : false}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        />
        {STOPS.map((s, i) => (
          <motion.div
            key={s}
            className="relative flex items-center gap-3"
            initial={motionOn ? { opacity: 0, x: 8 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.12 }}
          >
            <span className="absolute -left-6 h-3.5 w-3.5 rounded-full border-2 bg-[var(--c-bg)]" style={{ borderColor: "var(--cs)" }} />
            <span className="text-sm font-medium">{s}</span>
            {i === 2 && <span className="rounded-full px-2 py-0.5 text-[0.6rem] font-medium" style={{ background: "color-mix(in oklab, var(--cs) 16%, transparent)", color: "var(--cs)" }}>★ 4.9 local</span>}
            {i === STOPS.length - 1 && <span className="rounded-md px-2 py-0.5 text-[0.6rem] font-semibold" style={{ background: "var(--cs)", color: "var(--cs-ink)" }}>Book now</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LocalServiceCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-center gap-6 md:grid-cols-2">
        <Statement>
          Local service sites win when trust and booking{" "}
          <span className="opacity-55">sit close together.</span>
        </Statement>
        <Reveal delay={0.1}><TrustPath /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Confidence fast">A visitor decides in seconds.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">The offer is obvious on the first screen, and the path from interest to inquiry is short enough to walk without overthinking.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <MarkerHead>Trust close to the CTA.</MarkerHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Reviews and proof beside the decision", "Local signals where they reassure most", "Booking kept light, not a platform", "Contact one tap away on mobile"].map((t) => (
            <StaggerItem key={t}>
              <div className="flex items-center gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3 text-sm opacity-90">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--cs)" }} />{t}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Booking as a light step">A drawer, not a detour.</NumberHead>
        <Reveal>
          <div className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in oklab, var(--cs) 40%, transparent)" }}>
            <p className="mb-2 text-xs font-semibold opacity-80">Request a slot</p>
            <div className="flex flex-wrap gap-1.5">
              {["Today", "Tomorrow", "This week"].map((d, i) => (
                <span key={d} className="rounded-full px-3 py-1 text-[0.7rem] font-medium" style={i === 0 ? { background: "var(--cs)", color: "var(--cs-ink)" } : { background: "rgba(var(--c-fg-rgb),0.06)", color: "rgba(var(--c-fg-rgb),0.6)" }}>{d}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Designing the path, not just the page.</h3>
        </Reveal>
        <Closing>This is conversion thinking for small businesses: shorten the distance from intent to contact, and place trust exactly where hesitation happens.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
