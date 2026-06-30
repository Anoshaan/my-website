"use client";

import React from "react";
import { ProductPathway } from "@/lib/product-pathways";
import {
  CSShell, CategoryChip, LiveMockup, ExternalLinks, Tags, Reveal, Statement,
  NumberHead, Stagger, StaggerItem, Closing,
} from "../caseStudyKit";

/* Concept: a website assembled from reusable CMS blocks. Practical and
   client-friendly. Blocks stack into a page; each is editable after launch.
   Accent = soft violet for block outlines + the contact CTA. */

const BLOCKS = [
  { t: "Hero", d: "What you do, in one line" },
  { t: "Services", d: "Editable service cards" },
  { t: "Trust proof", d: "Reviews and results" },
  { t: "FAQ", d: "Answers before they ask" },
  { t: "Contact", d: "One-tap on mobile" },
];

function PageBuilder() {
  return (
    <Stagger className="flex flex-col gap-2" amount={0.2}>
      {BLOCKS.map((b, i) => (
        <StaggerItem key={b.t}>
          <div
            className="flex items-center justify-between rounded-xl border px-4 py-3"
            style={{ borderColor: i === BLOCKS.length - 1 ? "var(--cs)" : "rgba(var(--c-fg-rgb),0.12)", borderStyle: "dashed" }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] opacity-45">{`0${i + 1}`}</span>
              <span className="text-sm font-semibold">{b.t}</span>
              <span className="text-xs opacity-55">{b.d}</span>
            </div>
            <span
              className="rounded-md px-2 py-0.5 text-[0.6rem] font-medium"
              style={i === BLOCKS.length - 1
                ? { background: "var(--cs)", color: "var(--cs-ink)" }
                : { background: "rgba(var(--c-fg-rgb),0.06)", color: "rgba(var(--c-fg-rgb),0.55)" }}
            >
              {i === BLOCKS.length - 1 ? "CTA" : "editable"}
            </span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function ServiceWebsiteCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <CSShell pathway={pathway}>
      <header className="flex flex-col gap-5">
        <CategoryChip pathway={pathway} />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{pathway.title}</h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">{pathway.detailHero}</p>
      </header>

      <LiveMockup pathway={pathway} />

      {pathway.externalLinks?.length ? (
        <Reveal><ExternalLinks pathway={pathway} /></Reveal>
      ) : null}

      <section className="flex flex-col gap-6">
        <Statement>
          A small business website has two jobs:{" "}
          <span className="opacity-55">build trust fast, and stay easy to update.</span>
        </Statement>
        <Reveal delay={0.1}><PageBuilder /></Reveal>
        <Reveal delay={0.15}><p className="text-xs opacity-50">Every section is a reusable block the owner can edit. No developer required.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="01" kicker="Trust before complexity">The first screen answers what the business does and why it matters.</NumberHead>
        <Reveal><p className="text-sm leading-relaxed opacity-70">No heavy platform. Just a clear story, visible trust, and a contact action that never hides.</p></Reveal>
      </section>

      <section className="flex flex-col gap-5">
        <NumberHead n="02" kicker="CMS blocks for real updates">Built the way the owner thinks.</NumberHead>
        <Stagger className="grid gap-2.5 sm:grid-cols-2">
          {["Sections are reusable content types", "Fields match plain business language", "Mobile contact stays one tap away", "New pages built without code"].map((t) => (
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
          <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">Designing for the people who maintain it.</h3>
        </Reveal>
        <Closing>The craft here is practicality: a credible site that converts, built on a content system the owner can actually keep alive after handoff.</Closing>
      </section>

      <Tags pathway={pathway} />
    </CSShell>
  );
}
