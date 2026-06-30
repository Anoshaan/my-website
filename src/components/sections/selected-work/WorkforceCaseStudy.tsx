"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { ProductPathway } from "@/lib/product-pathways";
import { LabsEmbed } from "@/components/sections/labs/LabsEmbed";

/**
 * WorkforceCaseStudy — a bespoke, visual-first story for the Workforce Time &
 * Resource Management pathway (id 1). It deliberately does NOT use the generic
 * PathwayModalContent text layout: this case study is built as scannable blocks,
 * mini product visuals and small interactions so it reads like a lead-level
 * product narrative rather than an article.
 *
 * Theming: all chrome is driven by the site's --c-fg / --c-bg tokens so it works
 * in light and dark. The workforce accent (teal) is scoped locally as --wf.
 * Looping micro-animations live in globals.css under the `wf-` prefix and are
 * disabled under prefers-reduced-motion; framer reveals fall back to instant.
 */

const STATUS = {
  pending: "#E0A24E",
  approved: "#46BE9B",
  review: "#E08A8A",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Small shared primitives                                             */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({
  n,
  kicker,
  children,
}: {
  n: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-xs font-medium"
          style={{ color: "var(--wf)" }}
        >
          {n}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-45">
          {kicker}
        </span>
      </div>
      <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.75rem]">
        {children}
      </h3>
    </Reveal>
  );
}

/** Faux product window — reused across the interactive sections. */
function Frame({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[rgba(var(--c-fg-rgb),0.1)] bg-[rgba(var(--c-fg-rgb),0.025)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[rgba(var(--c-fg-rgb),0.08)] px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[rgba(var(--c-fg-rgb),0.18)]" />
        <span className="h-2 w-2 rounded-full bg-[rgba(var(--c-fg-rgb),0.13)]" />
        <span className="h-2 w-2 rounded-full bg-[rgba(var(--c-fg-rgb),0.1)]" />
        <span className="ml-2 text-[0.7rem] font-medium opacity-50">{label}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Chip({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium"
      style={{ background: `${color}22`, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — Opening: scattered cards connect                                */
/* ------------------------------------------------------------------ */

const SCATTER = [
  { label: "Time log", x: -54, y: -26, r: -6 },
  { label: "Approval", x: 60, y: -34, r: 5 },
  { label: "Project update", x: -68, y: 30, r: 4 },
  { label: "Workload", x: 74, y: 26, r: -5 },
  { label: "Activity", x: 4, y: 48, r: 2 },
];

function OpeningVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="relative flex h-44 items-center justify-center md:h-52">
      {/* settle frame */}
      <motion.div
        className="absolute inset-x-6 inset-y-8 rounded-2xl border border-dashed"
        style={{ borderColor: "rgba(var(--c-fg-rgb),0.14)" }}
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
      />
      <div className="relative z-10 flex max-w-sm flex-wrap items-center justify-center gap-2">
        {SCATTER.map((c, i) => (
          <motion.span
            key={c.label}
            className="rounded-lg border border-[rgba(var(--c-fg-rgb),0.12)] bg-[var(--c-bg)] px-3 py-1.5 text-xs font-medium shadow-sm"
            initial={
              reduced ? false : { opacity: 0, x: c.x, y: c.y, rotate: c.r }
            }
            whileInView={
              reduced ? undefined : { opacity: 1, x: 0, y: 0, rotate: 0 }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}
          >
            <span
              className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
              style={{ background: "var(--wf)" }}
            />
            {c.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Real problem: clock + stacking approvals                        */
/* ------------------------------------------------------------------ */

const PAINS = [
  { t: "Timesheets live away from project context", c: STATUS.pending },
  { t: "Approvals wait because they lack detail", c: STATUS.review },
  { t: "Workload pressure shows up too late", c: STATUS.review },
  { t: "Project activity is visible only when someone asks", c: STATUS.pending },
];

function ClockVisual() {
  return (
    <Frame label="Approvals · this week">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 64 64" className="h-16 w-16 flex-shrink-0" aria-hidden>
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="rgba(var(--c-fg-rgb),0.14)"
            strokeWidth="3"
          />
          <line
            x1="32"
            y1="32"
            x2="32"
            y2="14"
            stroke="var(--wf)"
            strokeWidth="3"
            strokeLinecap="round"
            className="wf-clock-hand"
          />
          <line
            x1="32"
            y1="32"
            x2="44"
            y2="32"
            stroke="rgba(var(--c-fg-rgb),0.4)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="32" r="2.5" fill="var(--wf)" />
        </svg>
        <div className="flex w-full flex-col gap-1.5">
          <Chip color={STATUS.pending}>Pending · 6</Chip>
          <Chip color={STATUS.review}>Needs review · 2</Chip>
          <Chip color={STATUS.approved}>Approved · 14</Chip>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Product thinking: role switcher                                 */
/* ------------------------------------------------------------------ */

const ROLES = [
  {
    key: "Team member",
    line: "Quick logging and confirmation.",
    cards: ["Log time", "My tasks · 4", "Submitted this week"],
  },
  {
    key: "Manager",
    line: "Approvals, workload and project health in one read.",
    cards: ["Approvals · 3", "Team workload", "Project health"],
  },
  {
    key: "Project lead",
    line: "Progress, effort and blockers.",
    cards: ["Progress · 72%", "Effort by task", "Blockers · 2"],
  },
  {
    key: "Admin",
    line: "Structure, permissions and reporting.",
    cards: ["Teams & roles", "Permissions", "Reports"],
  },
];

function RoleSwitcher() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(1);
  const role = ROLES[active];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {ROLES.map((r, i) => {
          const on = i === active;
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
              style={{
                background: on ? "var(--wf)" : "rgba(var(--c-fg-rgb),0.05)",
                color: on ? "#0b1f1a" : "rgba(var(--c-fg-rgb),0.7)",
              }}
            >
              {r.key}
            </button>
          );
        })}
      </div>
      <Frame label="Same frame · adapts to the role">
        <div className="min-h-[7.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.key}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <p className="mb-3 text-sm opacity-70">{role.line}</p>
              <div className="grid grid-cols-3 gap-2">
                {role.cards.map((c) => (
                  <div
                    key={c}
                    className="rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.025)] px-3 py-3 text-xs font-medium"
                  >
                    <span
                      className="mb-2 block h-1.5 w-6 rounded-full"
                      style={{ background: "var(--wf)" }}
                    />
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — UX flow                                                         */
/* ------------------------------------------------------------------ */

const FLOW = [
  { t: "Log time", d: "Fast entry, tied to the right project." },
  { t: "Review context", d: "Managers see the reason behind the hours." },
  { t: "Approve", d: "Actions stay next to the information." },
  { t: "Update activity", d: "Progress reflects real team effort." },
  { t: "Plan workload", d: "Capacity is visible before people overload." },
];

function FlowSteps() {
  const reduced = useReducedMotion();
  return (
    <ol className="relative flex flex-col gap-3 md:flex-row md:gap-2">
      {FLOW.map((s, i) => (
        <motion.li
          key={s.t}
          className="relative flex-1 rounded-2xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.025)] p-4"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: EASE, delay: i * 0.1 }}
        >
          <span
            className="mb-2 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[0.7rem] font-semibold"
            style={{ background: "var(--wf)", color: "#0b1f1a" }}
          >
            {i + 1}
          </span>
          <p className="text-sm font-semibold">{s.t}</p>
          <p className="mt-1 text-xs leading-relaxed opacity-65">{s.d}</p>
        </motion.li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — UI decisions                                                    */
/* ------------------------------------------------------------------ */

function DecisionVisual({ kind }: { kind: string }) {
  if (kind === "overview")
    return (
      <div className="flex flex-col gap-1">
        <span className="h-2 w-full rounded-full bg-[var(--wf)]" />
        <span className="h-1.5 w-2/3 rounded-full bg-[rgba(var(--c-fg-rgb),0.18)]" />
        <span className="h-1.5 w-1/2 rounded-full bg-[rgba(var(--c-fg-rgb),0.12)]" />
      </div>
    );
  if (kind === "status") return <Chip color={STATUS.approved}>Approved</Chip>;
  if (kind === "approval")
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[0.7rem] font-medium"
        style={{ background: "var(--wf)", color: "#0b1f1a" }}
      >
        Approve · with note
      </span>
    );
  if (kind === "workload")
    return (
      <div className="flex items-end gap-1">
        {[40, 70, 95, 55].map((h, i) => (
          <span
            key={i}
            className="w-2.5 rounded-sm"
            style={{
              height: h * 0.28 + "px",
              background: h > 85 ? STATUS.review : "var(--wf)",
            }}
          />
        ))}
      </div>
    );
  return (
    <div className="flex gap-1.5">
      {["This week", "Team", "Billable"].map((f, i) => (
        <span
          key={f}
          className="rounded-full px-2 py-0.5 text-[0.65rem] font-medium"
          style={{
            background: i === 0 ? "var(--wf)" : "rgba(var(--c-fg-rgb),0.06)",
            color: i === 0 ? "#0b1f1a" : "rgba(var(--c-fg-rgb),0.6)",
          }}
        >
          {f}
        </span>
      ))}
    </div>
  );
}

const DECISIONS = [
  { kind: "overview", t: "Overview first, details on demand." },
  { kind: "status", t: "Status labels before numbers." },
  { kind: "approval", t: "Approvals carry context, not blind clicks." },
  { kind: "workload", t: "Workload as health signals, not spreadsheets." },
  { kind: "filter", t: "Filters narrow focus without losing the picture." },
];

/* ------------------------------------------------------------------ */
/* 6 — Key screens / modules                                           */
/* ------------------------------------------------------------------ */

const MODULES = [
  {
    key: "Today",
    desc: "Pending approvals, logged hours, activity and workload health in one read.",
    render: () => (
      <div className="grid grid-cols-2 gap-2">
        <Tile label="Logged today" value="6.5 h" bar={0.65} />
        <Tile label="Pending" value="3" accent={STATUS.pending} />
        <Tile label="Activity" value="12 updates" bar={0.4} />
        <Tile label="Capacity" value="Healthy" accent={STATUS.approved} />
      </div>
    ),
  },
  {
    key: "Approvals",
    desc: "Context-rich cards: person, project, hours, note and action.",
    render: () => (
      <div className="flex flex-col gap-2">
        {[
          { n: "A. Rao", p: "Apollo · 7.5h", s: STATUS.pending },
          { n: "M. Diaz", p: "Northwind · 4h", s: STATUS.review },
        ].map((r) => (
          <div
            key={r.n}
            className="flex items-center justify-between rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] px-3 py-2"
          >
            <div>
              <p className="text-xs font-semibold">{r.n}</p>
              <p className="text-[0.7rem] opacity-55">{r.p}</p>
            </div>
            <span
              className="rounded-md px-2 py-1 text-[0.65rem] font-medium"
              style={{ background: `${r.s}22`, color: r.s }}
            >
              Review
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "Resource health",
    desc: "Who is available, balanced or overloaded at a glance.",
    render: () => (
      <div className="flex flex-col gap-2">
        {[
          { n: "Available", v: 0.35, c: STATUS.approved },
          { n: "Balanced", v: 0.7, c: "var(--wf)" },
          { n: "Overloaded", v: 0.95, c: STATUS.review },
        ].map((r) => (
          <div key={r.n} className="flex items-center gap-3">
            <span className="w-20 text-[0.7rem] opacity-65">{r.n}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-[rgba(var(--c-fg-rgb),0.08)]">
              <span
                className="block h-full rounded-full"
                style={{ width: `${r.v * 100}%`, background: r.c }}
              />
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "Activity timeline",
    desc: "Time entries, updates and progress connected in order.",
    render: () => (
      <div className="relative ml-2 flex flex-col gap-2.5 border-l border-[rgba(var(--c-fg-rgb),0.12)] pl-4">
        {["Logged 3h · Apollo", "Note added · scope change", "Progress → 72%"].map(
          (t) => (
            <div key={t} className="relative text-xs opacity-75">
              <span
                className="absolute -left-[1.32rem] top-1 h-2 w-2 rounded-full"
                style={{ background: "var(--wf)" }}
              />
              {t}
            </div>
          )
        )}
      </div>
    ),
  },
];

function Tile({
  label,
  value,
  bar,
  accent,
}: {
  label: string;
  value: string;
  bar?: number;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] px-3 py-2.5">
      <p className="text-[0.65rem] uppercase tracking-wide opacity-50">{label}</p>
      <p className="mt-0.5 text-sm font-semibold" style={accent ? { color: accent } : undefined}>
        {value}
      </p>
      {bar !== undefined && (
        <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[rgba(var(--c-fg-rgb),0.08)]">
          <span
            className="block h-full rounded-full"
            style={{ width: `${bar * 100}%`, background: "var(--wf)" }}
          />
        </span>
      )}
    </div>
  );
}

function ModuleViewer() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const m = MODULES[active];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {MODULES.map((mod, i) => {
          const on = i === active;
          return (
            <button
              key={mod.key}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
              style={{
                background: on ? "var(--wf)" : "rgba(var(--c-fg-rgb),0.05)",
                color: on ? "#0b1f1a" : "rgba(var(--c-fg-rgb),0.7)",
              }}
            >
              {mod.key}
            </button>
          );
        })}
      </div>
      <Frame label={`Operations view · ${m.key}`}>
        <div className="min-h-[8.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={m.key}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              {m.render()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Frame>
      <p className="text-sm opacity-70">{m.desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7 — Micro-interactions (looping CSS demos)                          */
/* ------------------------------------------------------------------ */

const MICRO = [
  {
    t: "Timesheet submitted",
    d: "Card compresses, confirms, then moves to Submitted.",
    demo: (
      <div className="wf-mi-submit rounded-lg border border-[rgba(var(--c-fg-rgb),0.12)] px-3 py-2 text-[0.7rem] font-medium">
        7.5h · Apollo
        <span className="wf-mi-check" style={{ color: STATUS.approved }}>
          {" "}
          ✓
        </span>
      </div>
    ),
  },
  {
    t: "Approval action",
    d: "Status changes before the card leaves the queue.",
    demo: (
      <div className="flex items-center gap-2 text-[0.7rem] font-medium">
        <span className="wf-mi-approve rounded-md px-2 py-1" aria-label="Pending then approved" />
      </div>
    ),
  },
  {
    t: "Workload filter",
    d: "Capacity bars glide instead of jumping.",
    demo: (
      <div className="flex items-end gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="wf-mi-bar w-2.5 rounded-sm"
            style={{ background: "var(--wf)", animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    ),
  },
  {
    t: "Empty state",
    d: "Nothing pending reads as calm success, not a void.",
    demo: (
      <div className="flex items-center gap-2 text-[0.7rem] font-medium opacity-70">
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: `${STATUS.approved}22`, color: STATUS.approved }}
        >
          ✓
        </span>
        All caught up
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* 8 — Final outcome                                                   */
/* ------------------------------------------------------------------ */

function FinalVisual() {
  return (
    <Frame label="One operations workspace">
      <div className="relative grid grid-cols-4 gap-2">
        {["Overview", "Approvals", "Workload", "Activity"].map((z, i) => (
          <div
            key={z}
            className="wf-final-zone rounded-xl border border-[rgba(var(--c-fg-rgb),0.09)] px-2 py-3 text-center text-[0.7rem] font-medium"
            style={{ animationDelay: `${i * 0.8}s` }}
          >
            {z}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export function WorkforceCaseStudy({ pathway }: { pathway: ProductPathway }) {
  return (
    <div
      className="wf-root mx-auto flex w-full max-w-3xl flex-col gap-14 text-[var(--c-fg)]"
      style={
        {
          "--wf": pathway.accentColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <header className="flex flex-col gap-5">
        <span
          className="w-fit rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: pathway.accentSoftBg,
            border: `1px solid ${pathway.accentBorder}`,
            color: "#1a1a1a",
          }}
        >
          {pathway.primaryCategory}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {pathway.title}
        </h2>
        <p className="text-xl font-medium leading-relaxed opacity-90">
          {pathway.detailHero}
        </p>
      </header>

      {/* Live mockup */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[rgba(var(--c-fg-rgb),0.08)] bg-[#0a0e1a]">
        <LabsEmbed src={pathway.imageUrl!} title={pathway.title} />
      </div>

      {/* 1 — Opening */}
      <section className="flex flex-col gap-6">
        <Reveal>
          <p className="text-2xl font-medium leading-snug tracking-tight md:text-[1.7rem]">
            Time tracking was the surface. The real problem was reading what was
            happening across people, projects and approvals.{" "}
            <span className="opacity-55">Without opening five tools.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <OpeningVisual />
        </Reveal>
      </section>

      {/* 2 — Real problem */}
      <section className="flex flex-col gap-6">
        <SectionHead n="01" kicker="The real problem">
          Managers were not missing information. They were missing a clean way to
          read it.
        </SectionHead>
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <Reveal className="flex flex-col gap-2.5">
            {PAINS.map((p) => (
              <div
                key={p.t}
                className="flex items-start gap-3 rounded-xl border border-[rgba(var(--c-fg-rgb),0.08)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3 text-sm opacity-90"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: p.c }}
                />
                {p.t}
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <ClockVisual />
          </Reveal>
        </div>
      </section>

      {/* 3 — Product thinking */}
      <section className="flex flex-col gap-6">
        <SectionHead n="02" kicker="Product thinking">
          The design was shaped around daily decisions, not menu items.
        </SectionHead>
        <Reveal delay={0.05}>
          <RoleSwitcher />
        </Reveal>
      </section>

      {/* 4 — UX flow */}
      <section className="flex flex-col gap-6">
        <SectionHead n="03" kicker="The flow">
          From status to action in one straight line.
        </SectionHead>
        <FlowSteps />
      </section>

      {/* 5 — UI decisions */}
      <section className="flex flex-col gap-6">
        <SectionHead n="04" kicker="Interface decisions">
          The interface stays calm because the work behind it is already complex.
        </SectionHead>
        <div className="grid gap-3 sm:grid-cols-2">
          {DECISIONS.map((d, i) => (
            <motion.div
              key={d.t}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] px-4 py-3.5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
            >
              <span className="text-sm font-medium">{d.t}</span>
              <span className="flex-shrink-0">
                <DecisionVisual kind={d.kind} />
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6 — Key modules */}
      <section className="flex flex-col gap-6">
        <SectionHead n="05" kicker="Key screens">
          One product view that intelligently changes focus.
        </SectionHead>
        <Reveal delay={0.05}>
          <ModuleViewer />
        </Reveal>
      </section>

      {/* 7 — Micro-interactions */}
      <section className="flex flex-col gap-6">
        <SectionHead n="06" kicker="Micro-interactions">
          Motion that explains feedback, never decoration.
        </SectionHead>
        <div className="grid gap-3 sm:grid-cols-2">
          {MICRO.map((m, i) => (
            <motion.div
              key={m.t}
              className="flex flex-col gap-3 rounded-2xl border border-[rgba(var(--c-fg-rgb),0.09)] bg-[rgba(var(--c-fg-rgb),0.02)] p-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
            >
              <div className="flex h-12 items-center">{m.demo}</div>
              <div>
                <p className="text-sm font-semibold">{m.t}</p>
                <p className="mt-0.5 text-xs leading-relaxed opacity-60">{m.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8 — Final */}
      <section className="flex flex-col gap-6">
        <SectionHead n="07" kicker="What this shows">
          A focused operations workspace. Scattered updates become clear daily
          decisions.
        </SectionHead>
        <Reveal delay={0.05}>
          <FinalVisual />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="border-l-2 pl-4 text-base leading-relaxed opacity-80" style={{ borderColor: "var(--wf)" }}>
            How I work as a product designer: understand the roles, cut decision
            friction, set the MVP priorities, and design interfaces that turn
            information into action.
          </p>
        </Reveal>
      </section>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {pathway.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: pathway.accentSoftBg,
              border: `1px solid ${pathway.accentBorder}`,
              color: "#1a1a1a",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
