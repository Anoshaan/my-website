"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  Stagger, StaggerItem, Closing, useMotion, EASE,
} from "../caseStudyKit";

/* Concept: pricing clarity. Selecting a plan and add-ons updates a sticky
   summary so the user always knows the total before payment. Accent = amber
   for the selected plan + confirm. */

const PLANS = [{ n: "Starter", p: 9 }, { n: "Pro", p: 19 }, { n: "Team", p: 39 }];
const ADDONS = [{ n: "Extra seats", p: 6 }, { n: "Priority support", p: 8 }];

function CheckoutDemo() {
  const motionOn = useMotion();
  const [plan, setPlan] = useState(1);
  const [on, setOn] = useState<boolean[]>([false, false]);
  const total = PLANS[plan].p + ADDONS.reduce((s, a, i) => s + (on[i] ? a.p : 0), 0);
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        {PLANS.map((pl, i) => {
          const sel = plan === i;
          return (
            <motion.button
              key={pl.n}
              type="button"
              onClick={() => setPlan(i)}
              animate={motionOn ? { y: sel ? -3 : 0 } : undefined}
              transition={{ duration: 0.25, ease: EASE }}
              className="rounded-xl border p-2.5 text-left"
              style={{ borderColor: sel ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.12)", background: sel ? "color-mix(in oklab, var(--cs) 10%, transparent)" : "transparent" }}
            >
              <p className="text-[0.7rem] font-semibold">{pl.n}</p>
              <p className="text-[0.65rem] opacity-60">${pl.p}/mo</p>
            </motion.button>
          );
        })}
      </div>
      <div className="flex flex-col gap-1.5">
        {ADDONS.map((a, i) => (
          <button key={a.n} type="button" onClick={() => setOn((s) => s.map((v, j) => (j === i ? !v : v)))}
            className="flex items-center justify-between rounded-lg border px-3 py-2 text-left"
            style={{ borderColor: on[i] ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.1)" }}>
            <span className="text-[0.7rem] font-medium">{a.n}</span>
            <span className="text-[0.65rem]" style={{ color: on[i] ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.5)" }}>{on[i] ? "added" : `+$${a.p}`}</span>
          </button>
        ))}
      </div>
      {/* sticky summary */}
      <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "color-mix(in oklab, var(--cs) 12%, transparent)" }}>
        <span className="text-[0.7rem] font-medium opacity-70">Total today</span>
        <motion.span key={total} initial={motionOn ? { opacity: 0, y: -4 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="text-base font-semibold" style={{ color: "var(--cs)" }}>
          ${total}/mo
        </motion.span>
      </div>
    </div>
  );
}

export function SubscriptionCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <section className="grid items-start gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Statement>Checkout anxiety starts before the payment form.</Statement>
          <Reveal delay={0.08}><p className="text-sm leading-relaxed opacity-70">Change the plan or add-ons. The total updates in place, so the number is never a surprise.</p></Reveal>
        </div>
        <Reveal delay={0.1}><CheckoutDemo /></Reveal>
      </section>

      <LiveMockup pathway={pathway} />

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Make the decision visible">Plan differences should be scannable, not buried.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">When costs and differences are unclear, people stall right before paying. The summary keeps the choice and its price in view the whole way.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="Confidence to confirm">No surprise at the last step.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Total shown before the payment step", "Add-ons reveal their cost impact live", "A clear review confirms the order", "Trust cues sit beside the pay action"].map((t) => (
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
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Clarity is the conversion strategy.</h3>
        </Reveal>
        <Closing>The thinking is honesty: show the real total early, make every choice and its cost legible, and let the user reach payment without that last-second doubt.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
