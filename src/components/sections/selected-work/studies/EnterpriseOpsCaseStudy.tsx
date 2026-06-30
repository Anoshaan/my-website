"use client";

import React from "react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, Tags, Reveal, Statement, NumberHead,
  MarkerHead, Frame, NoteRow, Stagger, StaggerItem, StatusChip, Closing,
} from "../caseStudyKit";

/* Concept: a live operations console. Scattered signals organise into priority
   lanes; ownership is the interface; escalation stays calm. Accent = gold. */

const SOURCES = ["Email", "Chat", "Request", "Approval", "Status update"];

function IntakeStrip() {
  return (
    <Stagger className="flex flex-wrap gap-2" amount={0.4}>
      {SOURCES.map((s) => (
        <StaggerItem key={s}>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(var(--c-fg-rgb),0.12)] bg-[var(--c-bg)] px-3 py-1.5 text-xs font-medium shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cs)" }} />
            {s}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

const LANES: { name: string; cards: string[]; accent?: boolean; blocked?: number }[] = [
  { name: "New", cards: ["Vendor refund", "Access request"] },
  { name: "Assigned", cards: ["Contract review"] },
  { name: "In progress", cards: ["Onboarding", "Data export"], blocked: 1 },
  { name: "Needs approval", cards: ["Budget sign-off"], accent: true },
  { name: "Resolved", cards: ["Invoice cleared"] },
];

function Lanes() {
  return (
    <Frame label="Operations console">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {LANES.map((lane) => (
          <div key={lane.name} className="min-w-[8.5rem] flex-1">
            <div className="mb-2 flex items-center gap-1.5 text-[0.7rem] font-semibold" style={lane.accent ? { color: "var(--cs)" } : { opacity: 0.6 }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: lane.accent ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.25)" }} />
              {lane.name}
            </div>
            <div className="flex flex-col gap-1.5">
              {lane.cards.map((c, i) => {
                const blocked = lane.blocked === i;
                return (
                  <div
                    key={c}
                    className="rounded-lg border bg-[rgba(var(--c-fg-rgb),0.03)] px-2.5 py-2 text-[0.72rem] font-medium"
                    style={{ borderColor: blocked ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.1)" }}
                  >
                    <span className="flex items-center gap-1.5">
                      {blocked && <span className="csk-dot-pulse h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--cs)" }} />}
                      {c}
                    </span>
                    {blocked && <span className="mt-1 block text-[0.62rem] font-normal opacity-55">blocked · waiting on owner</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const OWNERS = [
  { who: "OPS", item: "Budget sign-off", next: "Awaiting approver" },
  { who: "IT", item: "Access request", next: "In progress" },
  { who: "FIN", item: "Vendor refund", next: "Needs detail" },
];

export function EnterpriseOpsCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <LiveMockup pathway={pathway} />

      {/* Open with the noise */}
      <section className="flex flex-col gap-6">
        <Statement>
          Operations teams were not lacking updates.{" "}
          <span className="opacity-55">They were drowning in them.</span>
        </Statement>
        <Reveal delay={0.1}><IntakeStrip /></Reveal>
        <Reveal delay={0.15}>
          <p className="text-sm leading-relaxed opacity-65">
            Every request had a place to live. The problem was that none of those places spoke to each other.
          </p>
        </Reveal>
      </section>

      {/* Noise before structure */}
      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Noise before structure">
          Work was moving. Nobody could see where it was stuck.
        </NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Requests split across five tools", "Ownership unclear after every handoff", "Priority changes buried in chat", "Approvals stalled for missing context"].map((p) => (
            <StaggerItem key={p}><NoteRow>{p}</NoteRow></StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* The command layer */}
      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="The command layer">
          One board, read by priority and next action.
        </NumberHead>
        <Reveal delay={0.05}><Lanes /></Reveal>
      </section>

      {/* Ownership is the interface */}
      <section className="flex flex-col gap-5">
        <MarkerHead>Ownership is the interface.</MarkerHead>
        <Reveal>
          <Frame>
            <div className="flex flex-col gap-2">
              {OWNERS.map((o) => (
                <div key={o.item} className="flex items-center gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] px-3 py-2.5">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[0.62rem] font-bold" style={{ background: "color-mix(in oklab, var(--cs) 20%, transparent)", color: "var(--cs)" }}>{o.who}</span>
                  <span className="flex-1 text-xs font-medium">{o.item}</span>
                  <StatusChip>{o.next}</StatusChip>
                </div>
              ))}
            </div>
          </Frame>
        </Reveal>
        <Reveal delay={0.05}><p className="text-sm leading-relaxed opacity-70">Every item carries a visible owner, a state, and one next step. No item drifts without a name attached.</p></Reveal>
      </section>

      {/* Escalation without panic */}
      <section className="flex flex-col gap-5">
        <NumberHead n="03" kicker="Escalation without panic">
          Urgent work rises. The interface stays quiet.
        </NumberHead>
        <Reveal>
          <div className="flex items-center gap-3 rounded-2xl border px-4 py-3.5" style={{ borderColor: "var(--cs)" }}>
            <EscalationDot />
            <div>
              <p className="text-sm font-semibold">Budget sign-off · escalated</p>
              <p className="text-xs opacity-60">A soft outline, not an alarm. The card moves up; the screen does not flash red.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What this shows */}
      <section className="flex flex-col gap-5">
        <PlainHeadLocal />
        <Closing>
          This case study is about operational clarity: turning scattered signals into a priority order, making ownership unavoidable, and letting urgency surface without turning the console into noise.
        </Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}

function EscalationDot() {
  return (
    <span
      className="csk-dot-pulse h-3 w-3 flex-shrink-0 rounded-full"
      style={{ background: "var(--cs)" }}
    />
  );
}

function PlainHeadLocal() {
  return (
    <Reveal className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">What this shows</span>
      <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Decision speed comes from hierarchy, not more dashboards.</h3>
    </Reveal>
  );
}
