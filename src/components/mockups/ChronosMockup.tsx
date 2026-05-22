"use client";

import { type CSSProperties, useEffect, useId, useRef } from "react";
import "./ChronosMockup.css";

/**
 * ChronosMockup — a looping, animated miniature of the
 * "Chronos Enterprise OS" workforce dashboard. Drops into the
 * Video / Mockup media slot of the Workforce Time & Resource
 * Management Platform case study (landing carousel + Labs page).
 *
 * Purely decorative (aria-hidden) and pointer-transparent so it
 * never interferes with the surrounding card link. All motion is
 * CSS-driven; an IntersectionObserver pauses it while off-screen.
 */

const NAV_ICONS = [
  "M3 3h4.4v4.4H3zM8.6 3H13v4.4H8.6zM3 8.6h4.4V13H3zM8.6 8.6H13V13H8.6z",
  "M8 8.3a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2zM3.5 13c0-2.3 2-3.5 4.5-3.5S12.5 10.7 12.5 13",
  "M4.6 3.4h6.8v9.2H4.6zM6.4 3.4V2.2h3.2v1.2",
  "M3.7 12.5V8M8 12.5V3.9M12.3 12.5V9.3",
  "M3.4 4.4h9.2v8.3H3.4zM3.4 7h9.2M6.2 2.7v2.3M9.8 2.7v2.3",
  "M5 3.2h4l2.4 2.4v7.2H5zM9 3.2v2.4h2.4",
];

const LINE_D =
  "M2,112 C34,107 50,92 80,84 C112,76 126,92 158,72 C196,49 210,30 248,34 C290,38 308,20 314,16";
const AREA_D = `${LINE_D} L314,134 L2,134 Z`;
const DASH_D = "M2,124 C44,122 84,115 134,106 C188,96 252,84 314,74";

const KPIS = [
  {
    label: "Billable Hrs",
    count: "chronos-c84",
    pct: true,
    trend: "↑ 12% MoM",
    up: true,
    target: true,
    i: 1,
  },
  {
    label: "Active Projects",
    count: "chronos-c128",
    pct: false,
    trend: "8 in review",
    up: false,
    target: false,
    i: 2,
  },
  {
    label: "Efficiency",
    count: "chronos-c91",
    pct: true,
    trend: "Peak perf",
    up: true,
    target: false,
    i: 3,
  },
];

export function ChronosMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[:]/g, "");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-idle", !entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="chronos-mock" ref={rootRef} aria-hidden="true">
      <div className="chronos-scene">
        {/* title bar */}
        <div className="chronos-topbar">
          <span className="chronos-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="chronos-brand">
            <span className="chronos-brand-name">Chronos</span>
            <span className="chronos-brand-sub">Workforce OS</span>
          </span>
          <span className="chronos-live">
            <span className="chronos-live-dot" />
            Live
          </span>
        </div>

        <div className="chronos-body">
          {/* sidebar */}
          <div className="chronos-side">
            <span className="chronos-nav-pill" />
            {NAV_ICONS.map((d, idx) => (
              <span className="chronos-nav-item" key={idx}>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={d} />
                </svg>
              </span>
            ))}
          </div>

          {/* main */}
          <div className="chronos-main">
            <div className="chronos-head">
              <span className="chronos-head-title">Executive Overview</span>
              <span className="chronos-head-chip">Oct 12 – Nov 11</span>
            </div>

            {/* KPI row */}
            <div className="chronos-kpis">
              {KPIS.map((k) => (
                <div
                  key={k.label}
                  className={`chronos-kpi${k.target ? " is-target" : ""}`}
                  style={{ "--i": k.i } as CSSProperties}
                >
                  <span className="chronos-kpi-label">{k.label}</span>
                  <span
                    className={`chronos-kpi-num ${k.count}${
                      k.pct ? " is-pct" : ""
                    }`}
                  />
                  <span
                    className={`chronos-kpi-trend${k.up ? " up" : ""}`}
                  >
                    {k.trend}
                  </span>
                </div>
              ))}
            </div>

            {/* charts row */}
            <div className="chronos-charts">
              {/* line / area chart */}
              <div
                className="chronos-panel chronos-chart"
                style={{ "--i": 4 } as CSSProperties}
              >
                <div className="chronos-panel-head">
                  <span className="chronos-panel-title">
                    Revenue vs Resource Cost
                  </span>
                  <span className="chronos-legend">
                    <span className="chronos-leg">
                      <i style={{ background: "var(--blue-soft)" }} />
                      Rev
                    </span>
                    <span className="chronos-leg">
                      <i style={{ background: "var(--green)" }} />
                      Cost
                    </span>
                  </span>
                </div>
                <svg
                  className="chronos-chart-svg"
                  viewBox="0 0 316 138"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id={`${uid}-area`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#5b86ff"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor="#5b86ff"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <line
                    className="chronos-grid"
                    x1="2"
                    y1="38"
                    x2="314"
                    y2="38"
                  />
                  <line
                    className="chronos-grid"
                    x1="2"
                    y1="76"
                    x2="314"
                    y2="76"
                  />
                  <line
                    className="chronos-grid"
                    x1="2"
                    y1="112"
                    x2="314"
                    y2="112"
                  />
                  <path
                    className="chronos-area"
                    d={AREA_D}
                    fill={`url(#${uid}-area)`}
                  />
                  <path className="chronos-dash" d={DASH_D} />
                  <path
                    className="chronos-line"
                    d={LINE_D}
                    pathLength={100}
                  />
                  <circle
                    className="chronos-scan"
                    r="3.4"
                    style={
                      {
                        offsetPath: `path("${LINE_D}")`,
                      } as CSSProperties
                    }
                  />
                </svg>
              </div>

              {/* utilization ring */}
              <div
                className="chronos-panel chronos-ring"
                style={{ "--i": 5 } as CSSProperties}
              >
                <span className="chronos-panel-title">Utilization</span>
                <div className="chronos-ring-wrap">
                  <svg className="chronos-ring-svg" viewBox="0 0 116 116">
                    <circle
                      className="chronos-ring-track"
                      cx="58"
                      cy="58"
                      r="46"
                    />
                    <circle
                      className="chronos-ring-fill"
                      cx="58"
                      cy="58"
                      r="46"
                      pathLength={100}
                      transform="rotate(-90 58 58)"
                    />
                  </svg>
                  <span className="chronos-ring-num chronos-c82" />
                </div>
                <span className="chronos-ring-cap">Avg across teams</span>
              </div>
            </div>
          </div>
        </div>

        {/* cursor + click ripple */}
        <svg
          className="chronos-cursor"
          width="19"
          height="19"
          viewBox="0 0 20 20"
        >
          <path
            d="M4 3l12 5.2-5 1.7L8.4 15z"
            fill="#ffffff"
            stroke="#0a0c12"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
        <span className="chronos-ripple" />
      </div>
    </div>
  );
}
