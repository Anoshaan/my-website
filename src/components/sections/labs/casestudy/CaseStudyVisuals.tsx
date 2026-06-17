"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useInView, useReducedMotion } from "motion/react";
import type {
  CollageCard,
  FlowNode,
  IconName,
  Layer,
  MotionGlyph,
  MotionTile,
  RoleCard,
  RolePreview,
  Step,
  Visual,
} from "@/lib/case-studies-content";

/**
 * CaseStudyVisuals — the configurable, data-driven visual primitives shared by
 * every detailed Labs case study. Each primitive renders the same `csw-*`
 * class structure the overlay CSS already styles (so all visuals inherit the
 * project accent via `--cs-accent`), but takes its content from data so the
 * same component serves five different stories.
 *
 * Every looping animation is gated by the inherited `--play` custom property
 * (running on screen, paused off screen) and silenced under
 * prefers-reduced-motion.
 */

/* ------------------------------------------------------------------ Stage */
function Stage({
  className = "",
  children,
  amount = 0.25,
  label,
}: {
  className?: string;
  children: ReactNode;
  amount?: number;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  return (
    <div
      ref={ref}
      className={`csw-stage ${className}`}
      data-play={inView ? "on" : "off"}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------- Icon */
const ICON_PATHS: Record<IconName, ReactNode> = {
  director: (
    <>
      <rect x="3" y="3" width="7.5" height="9" rx="1.4" />
      <rect x="13.5" y="3" width="7.5" height="5" rx="1.4" />
      <rect x="13.5" y="11" width="7.5" height="10" rx="1.4" />
      <rect x="3" y="15" width="7.5" height="6" rx="1.4" />
    </>
  ),
  pm: (
    <>
      <rect x="3" y="3" width="4.6" height="12" rx="1.2" />
      <rect x="9.7" y="3" width="4.6" height="16" rx="1.2" />
      <rect x="16.4" y="3" width="4.6" height="8" rx="1.2" />
    </>
  ),
  teamLead: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <circle cx="17.5" cy="9.5" r="2.2" />
      <path d="M16 14.4a4.6 4.6 0 0 1 4.5 5.1" />
    </>
  ),
  employee: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8.5l1.4 1.4L12 7.2" />
      <path d="M14.5 8.5H17" />
      <path d="M8 14l1.4 1.4L12 12.7" />
      <path d="M14.5 14H17" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  report: (
    <>
      <path d="M4 4v16h16" />
      <rect x="7.5" y="12" width="2.6" height="5" rx="0.6" />
      <rect x="12.7" y="8.5" width="2.6" height="8.5" rx="0.6" />
      <rect x="17.4" y="14" width="2.6" height="3" rx="0.6" />
    </>
  ),
  eyeFilter: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  nodes: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M8.2 6.6 15.8 6.6M7.4 8 10.8 16M16.6 8 13.2 16" />
    </>
  ),
  focus: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </>
  ),
  chartUp: (
    <>
      <path d="M4 4v16h16" />
      <path d="M7 15l3.5-4 3 2.5L20 8" />
      <path d="M16.5 8H20v3.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.4 15.4 21 21" />
    </>
  ),
  bolt: <path d="M13 2 4 13h6l-1 9 9-12h-6z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M16 8l-2.4 5.6L8 16l2.4-5.6z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3 8l9 5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6z" />
      <path d="M9 12l2.2 2.2L15.4 10" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.2L21 7H6.2" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12.5 11.5 4H20v8.5L11.5 21z" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="10" r="6.5" />
      <path d="M9 9.6l2.2 2.2L15 8" />
      <path d="M8.4 15 7 22l5-2.4L17 22l-1.4-7" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
      <path d="M18.5 15.5 19.4 18 22 18.9 19.4 19.8 18.5 22.4 17.6 19.8 15 18.9 17.6 18z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h10" />
      <circle cx="19.5" cy="18" r="0.6" />
    </>
  ),
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* =================================================================== FLOW */
function FlowVisual({
  nodes,
  legend,
}: {
  nodes: FlowNode[];
  legend?: { down: string; up?: string };
}) {
  return (
    <Stage className="csw-flow" amount={0.22}>
      <span className="csw-flow-rail" aria-hidden>
        <span className="csw-flow-signal down" />
        {legend?.up && <span className="csw-flow-signal up" />}
      </span>
      {nodes.map((n, i) => (
        <div
          className="csw-flow-node"
          key={n.label}
          style={{ "--i": i } as CSSProperties}
        >
          <span className="csw-flow-ico" aria-hidden>
            <Icon name={n.icon} />
          </span>
          <span className="csw-flow-text">
            <span className="csw-flow-name">{n.label}</span>
            {n.sub && <span className="csw-flow-sub">{n.sub}</span>}
          </span>
        </div>
      ))}
      {legend && (
        <div className="csw-flow-legend" aria-hidden>
          <span className="down">{legend.down}</span>
          {legend.up && <span className="up">{legend.up}</span>}
        </div>
      )}
    </Stage>
  );
}

/* ================================================================== ROLES */
function RolePreviewMock({ kind }: { kind: RolePreview }) {
  if (kind === "stats") {
    return (
      <span className="csw-rp csw-rp-portfolio" aria-hidden>
        <span className="csw-rp-stat" />
        <span className="csw-rp-stat" />
        <span className="csw-rp-grid">
          <i />
          <i />
          <i />
          <i />
        </span>
      </span>
    );
  }
  if (kind === "bars") {
    return (
      <span className="csw-rp csw-rp-alloc" aria-hidden>
        <span className="csw-rp-row">
          <em>JC</em>
          <i style={{ "--w": "48%" } as CSSProperties} />
        </span>
        <span className="csw-rp-row">
          <em>AK</em>
          <i style={{ "--w": "82%" } as CSSProperties} />
        </span>
        <span className="csw-rp-row over">
          <em>RK</em>
          <i style={{ "--w": "96%" } as CSSProperties} />
        </span>
      </span>
    );
  }
  return (
    <span className="csw-rp csw-rp-task" aria-hidden>
      <span className="csw-rp-task-row is-sel">
        <b />
        Primary item
      </span>
      <span className="csw-rp-task-row">
        <b />
        Secondary item
      </span>
      <span className="csw-rp-time">
        Focus <i />
      </span>
    </span>
  );
}

function RolesVisual({ cards }: { cards: RoleCard[] }) {
  return (
    <Stage className="csw-roles" amount={0.2}>
      {cards.map((r, i) => (
        <div
          className="csw-role-card"
          key={r.role}
          style={{ "--i": i } as CSSProperties}
        >
          <span className="csw-role-head">
            <span className="csw-role-ico" aria-hidden>
              <Icon name={r.icon} />
            </span>
            <span className="csw-role-name">{r.role}</span>
          </span>
          <p className="csw-role-need">{r.need}</p>
          <RolePreviewMock kind={r.preview} />
        </div>
      ))}
    </Stage>
  );
}

/* ================================================================= LAYERS */
function LayersVisual({
  layers,
  caption,
}: {
  layers: Layer[];
  caption?: string;
}) {
  return (
    <Stage className="csw-layers" amount={0.25}>
      {layers.map((l, i) => (
        <div
          key={l.label}
          className={`csw-layer${l.focus ? " is-focus" : ""}${
            l.sharp ? " is-sharp" : ""
          }`}
          style={{ "--i": i } as CSSProperties}
        >
          <span className="csw-layer-name">{l.label}</span>
          <span className="csw-layer-chips" aria-hidden>
            {Array.from({ length: l.chips }).map((_, c) => (
              <i key={c} style={{ "--c": c } as CSSProperties} />
            ))}
          </span>
        </div>
      ))}
      {caption && <span className="csw-layers-caption">{caption}</span>}
    </Stage>
  );
}

/* ================================================================== STEPS */
function StepMock({ kind }: { kind: Step["kind"] }) {
  switch (kind) {
    case "project":
      return (
        <span className="csw-pf-mock pf-project" aria-hidden>
          <i className="pf-title" />
          <span className="pf-chip">Active</span>
        </span>
      );
    case "tasks":
      return (
        <span className="csw-pf-mock pf-tasks" aria-hidden>
          <i style={{ "--d": "0s" } as CSSProperties} />
          <i style={{ "--d": ".25s" } as CSSProperties} />
          <i style={{ "--d": ".5s" } as CSSProperties} />
        </span>
      );
    case "team":
      return (
        <span className="csw-pf-mock pf-team" aria-hidden>
          <em style={{ "--d": "0s" } as CSSProperties}>AK</em>
          <em style={{ "--d": ".2s" } as CSSProperties}>MR</em>
          <em style={{ "--d": ".4s" } as CSSProperties}>SJ</em>
        </span>
      );
    case "filter":
      return (
        <span className="csw-pf-mock pf-filter" aria-hidden>
          <i className="keep" />
          <i className="keep" />
          <i className="drop" />
          <i className="drop" />
        </span>
      );
    case "time":
      return (
        <span className="csw-pf-mock pf-time" aria-hidden>
          <span className="pf-field">8.0h</span>
          <span className="pf-save" />
        </span>
      );
    default:
      return (
        <span className="csw-pf-mock pf-report" aria-hidden>
          <i style={{ "--h": "45%" } as CSSProperties} />
          <i style={{ "--h": "70%" } as CSSProperties} />
          <i style={{ "--h": "58%", "--grow": "1" } as CSSProperties} />
        </span>
      );
  }
}

function StepsVisual({ steps }: { steps: Step[] }) {
  return (
    <Stage className="csw-pf" amount={0.15}>
      {steps.map((s, i) => (
        <div className="csw-pf-step" key={s.label} style={{ "--i": i } as CSSProperties}>
          <StepMock kind={s.kind} />
          <span className="csw-pf-meta">
            <span className="csw-pf-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="csw-pf-label">{s.label}</span>
          </span>
          {i < steps.length - 1 && (
            <span className="csw-pf-link" aria-hidden>
              <span style={{ "--i": i } as CSSProperties} />
            </span>
          )}
        </div>
      ))}
    </Stage>
  );
}

/* ================================================================ COLLAGE */
function CollageMockBody({ kind }: { kind: CollageCard["mock"] }) {
  switch (kind) {
    case "mgr":
      return (
        <div className="csw-ui-mock ui-mgr">
          <span className="ui-mgr-head">
            <i className="ui-mgr-title" />
            <span className="ui-mgr-cap">
              <i />
            </span>
          </span>
          {["Atlas Migration", "Brand Refresh", "Mobile App v2"].map((p, r) => (
            <span
              key={p}
              className="ui-mgr-row"
              style={{ "--d": `${r * 0.7}s` } as CSSProperties}
            >
              <em>{p}</em>
              <i />
            </span>
          ))}
        </div>
      );
    case "emp":
      return (
        <div className="csw-ui-mock ui-emp">
          <span className="ui-emp-row keep">Design QA</span>
          <span className="ui-emp-row keep">API review</span>
          <span className="ui-emp-row drop">Budget review</span>
          <span className="ui-emp-row drop">Hiring panel</span>
        </div>
      );
    case "time":
      return (
        <div className="csw-ui-mock ui-time">
          <span className="ui-time-task">Design QA: checkout</span>
          <span className="ui-time-field">
            8.0h<span className="ui-caret" />
          </span>
          <span className="ui-time-save">Save</span>
        </div>
      );
    case "res":
      return (
        <div className="csw-ui-mock ui-res">
          {[
            { who: "JC", w: 48, over: false },
            { who: "AK", w: 82, over: false },
            { who: "RK", w: 104, over: true },
          ].map((m) => (
            <span key={m.who} className={`ui-res-row ${m.over ? "is-over" : ""}`}>
              <em>{m.who}</em>
              <span className="ui-res-bar">
                <i style={{ "--w": `${Math.min(m.w, 100)}%` } as CSSProperties} />
              </span>
              {m.over && <span className="ui-res-flag">Over capacity</span>}
            </span>
          ))}
        </div>
      );
    case "rep":
      return (
        <div className="csw-ui-mock ui-rep">
          <span className="ui-rep-bars">
            <i style={{ "--h": "45%" } as CSSProperties} />
            <i style={{ "--h": "62%" } as CSSProperties} />
            <i style={{ "--h": "52%" } as CSSProperties} />
            <i className="grow" style={{ "--h": "80%" } as CSSProperties} />
          </span>
          <i className="ui-rep-line" />
        </div>
      );
    case "kpi":
      return (
        <div className="csw-ui-mock ui-kpi">
          {[
            { l: "Revenue", v: "$2.4M", d: "+8%", down: false },
            { l: "Active users", v: "18.2k", d: "+3%", down: false },
            { l: "Conversion", v: "4.6%", d: "-12%", down: true },
          ].map((k, i) => (
            <span
              key={k.l}
              className={`ui-kpi-card ${k.down ? "is-down" : ""}`}
              style={{ "--d": `${i * 0.5}s` } as CSSProperties}
            >
              <em>{k.l}</em>
              <b>{k.v}</b>
              <i>{k.d}</i>
            </span>
          ))}
        </div>
      );
    case "trend":
      return (
        <div className="csw-ui-mock ui-trend">
          <svg viewBox="0 0 120 56" fill="none" preserveAspectRatio="none" aria-hidden>
            <path
              className="ui-trend-area"
              d="M2 44 22 36 42 40 62 24 82 28 102 12 118 16 118 54 2 54Z"
            />
            <path
              className="ui-trend-line"
              d="M2 44 22 36 42 40 62 24 82 28 102 12 118 16"
            />
            <circle className="ui-trend-dot" cx="102" cy="12" r="3" />
          </svg>
        </div>
      );
    case "anomaly":
      return (
        <div className="csw-ui-mock ui-anomaly">
          <span className="ui-anom-row">
            <span className="ui-anom-dot" />
            <em>Conversion drop</em>
            <i>-12%</i>
          </span>
          <span className="ui-anom-sub">Returning users, mobile checkout</span>
          <span className="ui-anom-bar">
            <span className="ui-anom-fill" />
          </span>
        </div>
      );
    case "bars":
      return (
        <div className="csw-ui-mock ui-barchart">
          {[58, 72, 40, 88, 64].map((h, i) => (
            <i
              key={i}
              className={i === 3 ? "hi" : ""}
              style={{ "--h": `${h}%`, "--d": `${i * 0.12}s` } as CSSProperties}
            />
          ))}
        </div>
      );
    case "list":
      return (
        <div className="csw-ui-mock ui-list">
          <span className="ui-list-bar">
            <i />
            <i className="ui-list-chip" />
          </span>
          {["Item one", "Item two", "Item three", "Item four"].map((t, i) => (
            <span
              key={t}
              className={`ui-list-row ${i > 1 ? "drop" : "keep"}`}
              style={{ "--d": `${i * 0.15}s` } as CSSProperties}
            >
              {t}
            </span>
          ))}
        </div>
      );
    case "page":
      return (
        <div className="csw-ui-mock ui-page">
          <span className="ui-page-hero" style={{ "--d": "0s" } as CSSProperties}>
            <i className="ui-page-h1" />
            <i className="ui-page-h2" />
            <span className="ui-page-cta" />
          </span>
          <span className="ui-page-grid">
            {[0, 1, 2].map((i) => (
              <i key={i} style={{ "--d": `${0.4 + i * 0.18}s` } as CSSProperties} />
            ))}
          </span>
          <span className="ui-page-strip" style={{ "--d": "1.1s" } as CSSProperties}>
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
      );
    case "menu":
      return (
        <div className="csw-ui-mock ui-menu">
          <span className="ui-menu-tabs">
            <i className="is-on">Popular</i>
            <i>Mains</i>
            <i>Sides</i>
            <i>Drinks</i>
          </span>
          <span className="ui-menu-grid">
            {["Signature Bowl", "Garden Wrap", "House Fries", "Cold Brew"].map(
              (t, i) => (
                <span
                  key={t}
                  className={`ui-menu-item ${i === 0 ? "is-pop" : ""}`}
                  style={{ "--d": `${i * 0.2}s` } as CSSProperties}
                >
                  <i className="ui-menu-thumb" />
                  <em>{t}</em>
                  <b>$12</b>
                </span>
              )
            )}
          </span>
        </div>
      );
    case "product":
      return (
        <div className="csw-ui-mock ui-product">
          <span className="ui-product-img" />
          <span className="ui-product-title" />
          <span className="ui-product-opts">
            <i className="is-on">Small</i>
            <i>Medium</i>
            <i>Large</i>
          </span>
          <span className="ui-product-foot">
            <b className="ui-product-price">$14.00</b>
            <span className="ui-product-add">Add</span>
          </span>
        </div>
      );
    case "cart":
      return (
        <div className="csw-ui-mock ui-cart">
          <span className="ui-cart-row">
            <em>Signature Bowl</em>
            <i>$12.00</i>
          </span>
          <span className="ui-cart-row">
            <em>Cold Brew</em>
            <i>$4.00</i>
          </span>
          <span className="ui-cart-total">
            <em>Total</em>
            <b>$16.00</b>
          </span>
          <span className="ui-cart-btn">Checkout</span>
        </div>
      );
    case "detail":
      return (
        <div className="csw-ui-mock ui-detail">
          <span className="ui-detail-top">
            <span className="ui-detail-img" />
            <span className="ui-detail-meta">
              <i className="ui-detail-badge">Verified</i>
              <i className="ui-detail-line" />
              <i className="ui-detail-line short" />
            </span>
          </span>
          <span className="ui-detail-tabs">
            <i className="is-on">Specs</i>
            <i>Usage</i>
            <i>Compliance</i>
          </span>
          <span className="ui-detail-note">Compliance guidance</span>
        </div>
      );
    default:
      return null;
  }
}

function CollageVisual({ cards }: { cards: CollageCard[] }) {
  return (
    <Stage className="csw-ui-grid" amount={0.15}>
      {cards.map((c, i) => (
        <figure
          key={`${c.mock}-${i}`}
          className={`csw-ui-card ${c.span ? "span2" : ""}`}
        >
          <CollageMockBody kind={c.mock} />
          <figcaption>{c.caption}</figcaption>
        </figure>
      ))}
    </Stage>
  );
}

/* ===================================================================== AI */
function AiVisual({
  title,
  message,
  confidence,
  reasons,
  features,
  applyLabel,
}: {
  title: string;
  message: string;
  confidence: number;
  reasons: string[];
  features: string[];
  applyLabel: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (reduced) {
      setStep(2);
      setExpanded(true);
      return;
    }
    if (!inView) return;
    const delays = [1600, 1500, 1700, 1800];
    const id = window.setTimeout(() => setStep((s) => (s + 1) % 4), delays[step]);
    return () => window.clearTimeout(id);
  }, [step, inView, reduced]);

  useEffect(() => {
    if (reduced) return;
    setExpanded(step >= 2);
  }, [step, reduced]);

  const applied = step >= 3;

  return (
    <div className="csw-ai">
      <div
        ref={ref}
        className="csw-ai-panel"
        data-applied={applied}
        data-play={inView ? "on" : "off"}
      >
        <div className="csw-ai-head">
          <span className="csw-ai-spark" aria-hidden />
          <span className="csw-ai-title">{title}</span>
        </div>

        <p className="csw-ai-msg">{message}</p>

        <div className="csw-ai-conf">
          <span className="csw-ai-ring" data-fill={step >= 0 ? "on" : "off"} aria-hidden>
            <b>{confidence}%</b>
          </span>
          <span className="csw-ai-conf-text">
            Confidence
            <em>Based on the signals below.</em>
          </span>
        </div>

        <button
          type="button"
          className="csw-ai-why"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          Why this?
        </button>
        <ul className={`csw-ai-reasons ${expanded ? "is-open" : ""}`}>
          {reasons.map((r, i) => (
            <li key={r} style={{ "--i": i } as CSSProperties}>
              {r}
            </li>
          ))}
        </ul>

        <div className="csw-ai-actions">
          <span className={`csw-ai-apply ${applied ? "is-done" : ""}`}>
            {applied ? "Applied" : applyLabel}
          </span>
          <span className="csw-ai-dismiss">Dismiss</span>
        </div>
      </div>

      <div className="csw-ai-aside">
        <ul className="csw-ai-features">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ================================================================= MOTION */
function MotionGlyphBody({ kind }: { kind: MotionGlyph }) {
  switch (kind) {
    case "assign":
      return (
        <>
          <svg viewBox="0 0 44 44" fill="none" aria-hidden>
            <rect className="mt-box" x="7" y="7" width="30" height="30" rx="7" />
            <path className="mt-draw" d="M14 22l5 5 11-12" />
          </svg>
          <span className="mt-badge" />
        </>
      );
    case "clock":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <circle className="mt-pulse" cx="22" cy="22" r="14" />
          <circle className="mt-dial" cx="22" cy="22" r="14" />
          <line className="mt-hand" x1="22" y1="22" x2="22" y2="13" />
          <line className="mt-hand2" x1="22" y1="22" x2="29" y2="22" />
        </svg>
      );
    case "warn":
      return (
        <>
          <span className="mt-cap">
            <i className="mt-cap-fill" />
          </span>
          <svg className="mt-tri" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 4l9 16H3z" />
            <path d="M12 10v5" />
            <circle cx="12" cy="17.6" r="0.6" />
          </svg>
        </>
      );
    case "approve":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <rect className="mt-doc" x="11" y="6" width="22" height="32" rx="4" />
          <path className="mt-doc-l" d="M16 15h12M16 21h12M16 27h7" />
          <circle className="mt-stamp" cx="30" cy="31" r="8" />
          <path className="mt-stamp-c" d="M26.5 31l2.4 2.4 4.6-5" />
        </svg>
      );
    case "sync":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <g className="mt-sync-arrows">
            <path d="M11 19a11 11 0 0 1 19-5" />
            <path d="M30 11v5h-5" />
            <path d="M33 25a11 11 0 0 1-19 5" />
            <path d="M14 33v-5h5" />
          </g>
          <path className="mt-sync-line" d="M16 27l4-4 4 2 5-6" />
        </svg>
      );
    case "drop":
      return (
        <>
          <span className="mt-dd-trigger">
            All teams
            <i />
          </span>
          <span className="mt-dd-menu">
            <i />
            <i className="mt-dd-sel" />
            <i />
          </span>
        </>
      );
    case "loader":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <circle className="mt-track" cx="22" cy="22" r="14" />
          <circle className="mt-spin" cx="22" cy="22" r="14" />
          <path className="mt-loader-c" d="M15 22l5 5 10-11" />
        </svg>
      );
    case "prog":
      return (
        <>
          <span className="mt-pbar">
            <i className="mt-pbar-fill" />
          </span>
          <span className="mt-prog-val">72%</span>
        </>
      );
    case "line":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <path className="mt-axis" d="M9 9v26h26" />
          <path className="mt-line-draw" d="M11 30l6-7 5 3 5-9 6 4" />
          <circle className="mt-line-dot" cx="32" cy="21" r="2.4" />
        </svg>
      );
    case "reveal":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <rect className="mt-reveal-frame" x="7" y="9" width="30" height="26" rx="4" />
          <rect className="mt-reveal-fill" x="7" y="9" width="30" height="26" rx="4" />
          <path className="mt-reveal-l" d="M13 18h12M13 24h18M13 30h9" />
        </svg>
      );
    case "cart":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <path
            className="mt-cart-body"
            d="M9 12h3l2.4 13.6a1.6 1.6 0 0 0 1.6 1.4h9.4a1.6 1.6 0 0 0 1.6-1.4L35 15H13.2"
          />
          <circle className="mt-cart-w" cx="18" cy="32" r="1.7" />
          <circle className="mt-cart-w" cx="27" cy="32" r="1.7" />
          <circle className="mt-cart-item" cx="24" cy="10" r="3.2" />
        </svg>
      );
    case "badge":
      return (
        <svg viewBox="0 0 44 44" fill="none" aria-hidden>
          <circle className="mt-badge-ring" cx="22" cy="19" r="11" />
          <path className="mt-badge-c" d="M17 19l3.4 3.4L28 15" />
          <path className="mt-badge-tail" d="M15 28l-2 10 9-4 9 4-2-10" />
        </svg>
      );
    default:
      return null;
  }
}

function MotionVisual({ tiles }: { tiles: MotionTile[] }) {
  return (
    <Stage className="csw-mt-grid" amount={0.12}>
      {tiles.map((t) => (
        <div className={`csw-mt mt-${t.glyph}`} key={t.label}>
          <span className="csw-mt-stage">
            <MotionGlyphBody kind={t.glyph} />
          </span>
          <span className="csw-mt-label">{t.label}</span>
        </div>
      ))}
    </Stage>
  );
}

/* ================================================================ INSIGHT */
function InsightVisual({
  panels,
}: {
  panels: { label: string; body: string }[];
}) {
  return (
    <Stage className="csw-insight" amount={0.2}>
      {panels.map((p, i) => (
        <div
          className="csw-insight-panel"
          key={p.label}
          style={{ "--i": i } as CSSProperties}
        >
          <span className="csw-insight-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="csw-insight-label">{p.label}</span>
          <p className="csw-insight-body">{p.body}</p>
          <span className="csw-insight-bar" aria-hidden>
            <i />
          </span>
        </div>
      ))}
    </Stage>
  );
}

/* ============================================================ BEFORE/AFTER */
function BeforeAfterVisual({ before, after }: { before: string; after: string }) {
  return (
    <Stage className="csw-ba" amount={0.25}>
      <div className="csw-ba-card is-before">
        <span className="csw-ba-tag">Before</span>
        <p>{before}</p>
      </div>
      <span className="csw-ba-arrow" aria-hidden>
        <svg viewBox="0 0 40 24" fill="none">
          <path d="M4 12h30" />
          <path d="M27 5l7 7-7 7" />
        </svg>
      </span>
      <div className="csw-ba-card is-after">
        <span className="csw-ba-tag">After</span>
        <p>{after}</p>
      </div>
    </Stage>
  );
}

/* =============================================================== TIMELINE */
function TimelineVisual({ steps }: { steps: string[] }) {
  return (
    <Stage className="csw-timeline" amount={0.25}>
      <span className="csw-timeline-track" aria-hidden>
        <span className="csw-timeline-fill" />
      </span>
      {steps.map((s, i) => (
        <div
          className="csw-timeline-step"
          key={s}
          style={{ "--i": i, "--n": steps.length } as CSSProperties}
        >
          <span className="csw-timeline-dot" aria-hidden>
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M4 8.4l2.6 2.6L12 5.4" />
            </svg>
          </span>
          <span className="csw-timeline-label">{s}</span>
        </div>
      ))}
    </Stage>
  );
}

/* ================================================================ BALANCE */
function BalanceVisual({
  left,
  right,
  center,
}: {
  left: string;
  right: string;
  center: string;
}) {
  return (
    <Stage className="csw-balance" amount={0.3}>
      <div className="csw-balance-side is-left">
        <span className="csw-balance-tag">Compliance</span>
        <p>{left}</p>
      </div>
      <div className="csw-balance-center">
        <span className="csw-balance-core" aria-hidden />
        <p>{center}</p>
      </div>
      <div className="csw-balance-side is-right">
        <span className="csw-balance-tag">Confidence</span>
        <p>{right}</p>
      </div>
    </Stage>
  );
}

/* ============================================================= MOBILE FLOW */
function MobileFlowVisual({ steps }: { steps: string[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setTimeout(
      () => setPhase((p) => (p + 1) % steps.length),
      1600
    );
    return () => window.clearTimeout(id);
  }, [phase, inView, reduced, steps.length]);

  return (
    <div
      ref={ref}
      className="csw-mobile"
      data-play={inView ? "on" : "off"}
      role="img"
      aria-label="Mobile ordering flow moving from menu to checkout"
    >
      <div className="csw-phone">
        <span className="csw-phone-notch" aria-hidden />
        <div className="csw-phone-screen">
          <span className="csw-phone-status">{steps[phase]}</span>
          <span className="csw-phone-body" aria-hidden>
            <i className="csw-phone-line w1" />
            <i className="csw-phone-line w2" />
            <span className="csw-phone-card" data-on={phase >= 1}>
              <i />
              <i className="short" />
            </span>
            <span className="csw-phone-card alt" data-on={phase >= 2}>
              <i />
              <i className="short" />
            </span>
            <span
              className={`csw-phone-cta ${phase >= steps.length - 1 ? "is-done" : ""}`}
            >
              {phase >= steps.length - 1 ? "Order placed" : "Continue"}
            </span>
          </span>
        </div>
      </div>
      <ol className="csw-mobile-steps">
        {steps.map((s, i) => (
          <li key={s} className={i === phase ? "is-on" : i < phase ? "is-done" : ""}>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ============================================================ Visual switch */
export function CaseVisual({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case "flow":
      return <FlowVisual nodes={visual.nodes} legend={visual.legend} />;
    case "roles":
      return <RolesVisual cards={visual.cards} />;
    case "layers":
      return <LayersVisual layers={visual.layers} caption={visual.caption} />;
    case "steps":
      return <StepsVisual steps={visual.steps} />;
    case "collage":
      return <CollageVisual cards={visual.cards} />;
    case "ai":
      return (
        <AiVisual
          title={visual.title}
          message={visual.message}
          confidence={visual.confidence}
          reasons={visual.reasons}
          features={visual.features}
          applyLabel={visual.applyLabel}
        />
      );
    case "motion":
      return <MotionVisual tiles={visual.tiles} />;
    case "insight":
      return <InsightVisual panels={visual.panels} />;
    case "beforeAfter":
      return <BeforeAfterVisual before={visual.before} after={visual.after} />;
    case "timeline":
      return <TimelineVisual steps={visual.steps} />;
    case "balance":
      return (
        <BalanceVisual
          left={visual.left}
          right={visual.right}
          center={visual.center}
        />
      );
    case "mobileFlow":
      return <MobileFlowVisual steps={visual.steps} />;
    default:
      return null;
  }
}
