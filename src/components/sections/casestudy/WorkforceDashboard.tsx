"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./WorkforceDashboard.css";

/**
 * WorkforceDashboard — the "TimeFlow" SaaS browser mockup recreated as a
 * self-contained React component (fixed 1180×720, scaled to fit). The
 * source's GSAP timeline is reimplemented with React state + CSS
 * transitions: data loads in, a simulated cursor clicks the time filter
 * to switch "This week" → "Today" (numbers + charts re-animate), then it
 * resets and loops. Runs independently of the section's entrance.
 */

type DataSet = {
  rows: [number, number][]; // stacked bar widths (%) per team row
  cols: number[]; // chart column fill (scaleY 0..1)
  projects: number[]; // project bar widths (%)
  projectTotals: string[];
  total: number; // hours
  amount: number; // $
};

const WEEK: DataSet = {
  rows: [
    [60, 35],
    [70, 20],
    [40, 45],
  ],
  cols: [0.4, 0.8, 0.6, 1.0, 0.4, 0, 0],
  projects: [50, 40, 10, 5],
  projectTotals: ["20:00", "10:00", "4:00", "2:00"],
  total: 36,
  amount: 1000,
};

const TODAY: DataSet = {
  rows: [
    [22, 12],
    [30, 8],
    [16, 18],
  ],
  cols: [0.1, 0.1, 0.1, 0.8, 0.1, 0, 0],
  projects: [70, 15, 15, 0],
  projectTotals: ["6:00", "1:20", "1:10", "0:00"],
  total: 8.5,
  amount: 240,
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const COL_SEGMENTS: { c: string; h: number }[][] = [
  [{ c: "wf-c-blue", h: 25 }, { c: "wf-c-pink", h: 75 }],
  [{ c: "wf-c-slate", h: 25 }, { c: "wf-c-yellow", h: 75 }],
  [{ c: "wf-c-yellow", h: 20 }, { c: "wf-c-blue", h: 30 }, { c: "wf-c-pink", h: 50 }],
  [{ c: "wf-c-slate", h: 20 }, { c: "wf-c-pink", h: 40 }, { c: "wf-c-yellow", h: 40 }],
  [{ c: "wf-c-slate", h: 30 }, { c: "wf-c-yellow", h: 70 }],
  [],
  [],
];
const COL_MAX = [100, 200, 150, 250, 100, 0, 0]; // px heights

const fmt = (v: number) => `${Math.floor(v)}:${Math.floor((v % 1) * 60).toString().padStart(2, "0")}`;

export function WorkforceDashboard() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<"week" | "today">("week");
  const [press, setPress] = useState(false);
  const [cursor, setCursor] = useState({ x: 1080, y: 700, on: false });
  const [stat, setStat] = useState({ total: "00:00", amount: "$0" });

  const data = filter === "week" ? WEEK : TODAY;

  // Animated counters.
  const rafRef = useRef<number>(0);
  const tween = (fromT: number, toT: number, fromA: number, toA: number, dur: number) => {
    cancelAnimationFrame(rafRef.current);
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 2);
      setStat({
        total: fmt(fromT + (toT - fromT) * e),
        amount: "$" + Math.floor(fromA + (toA - fromA) * e).toLocaleString(),
      });
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // Phase timeline.
  useEffect(() => {
    if (reduced) {
      setLoaded(true);
      setStat({ total: fmt(WEEK.total), amount: "$" + WEEK.amount.toLocaleString() });
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    const run = (base: number) => {
      // Load week data.
      at(base + 200, () => {
        setFilter("week");
        setLoaded(true);
        tween(0, WEEK.total, 0, WEEK.amount, 1500);
      });
      // Cursor enters and moves to the filter.
      at(base + 4200, () => setCursor({ x: 1080, y: 700, on: true }));
      at(base + 4400, () => setCursor({ x: 968, y: 250, on: true }));
      // Click → Today.
      at(base + 5800, () => setPress(true));
      at(base + 6000, () => {
        setPress(false);
        setFilter("today");
        tween(WEEK.total, TODAY.total, WEEK.amount, TODAY.amount, 800);
      });
      // Cursor leaves.
      at(base + 7400, () => setCursor({ x: 1140, y: 760, on: false }));
      // Reset for the loop.
      at(base + 9600, () => {
        setLoaded(false);
        setStat({ total: "00:00", amount: "$0" });
      });
      at(base + 10400, () => {
        setFilter("week");
        run(0);
      });
    };
    run(0);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  const rowColors: [string, string][] = [
    ["wf-c-pink", "wf-c-slate"],
    ["wf-c-pink", "wf-c-blue"],
    ["wf-c-slate", "wf-c-yellow"],
  ];
  const projColors = ["wf-c-pink", "wf-c-yellow", "wf-c-blue", "wf-c-slate"];
  const projNames = ["Project X", "Office", "ACME", "Time-off"];
  const projPct = ["50%", "40%", "10%", "5%"];

  return (
    <div className="wf-browser" aria-hidden>
      <div className="wf-topbar">
        <div className="wf-lights">
          <span className="wf-light r" />
          <span className="wf-light y" />
          <span className="wf-light g" />
        </div>
        <div className="wf-address">
          <span>app.timeflow.io/dashboard</span>
        </div>
        <div style={{ width: 56 }} />
      </div>

      <div className="wf-app">
        {/* Sidebar */}
        <aside className="wf-side">
          <div className="wf-logo">
            <span className="wf-logo-mark">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            TimeFlow
          </div>
          <div className="wf-nav">
            <div className="wf-navgroup">
              <span className="wf-navitem">⏱ Timesheet</span>
              <span className="wf-navitem">◷ Time Tracker</span>
              <span className="wf-navitem">▦ Calendar</span>
            </div>
            <div>
              <div className="wf-navlabel">Analyze</div>
              <div className="wf-navgroup">
                <span className="wf-navitem is-active">▦ Dashboard</span>
                <span className="wf-navitem">▤ Reports</span>
                <span className="wf-navitem">↗ Activity</span>
              </div>
            </div>
            <div>
              <div className="wf-navlabel">Manage</div>
              <div className="wf-navgroup">
                <span className="wf-navitem">▭ Projects</span>
                <span className="wf-navitem">☷ Team</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="wf-main">
          <header className="wf-apphead">
            <div className="wf-apphead-left">ACME Corp ▾</div>
            <div className="wf-apphead-right">
              <span>⚙</span>
              <span>🔔</span>
              <span className="wf-avatar" />
            </div>
          </header>

          <div className="wf-content">
            <div className="wf-toolbar">
              <h1 className="wf-h1">Dashboard</h1>
              <div className="wf-tools">
                <span className="wf-btn">Team ▾</span>
                <span className={`wf-btn ${press ? "is-press" : ""}`}>
                  {filter === "week" ? "This week" : "Today"} ▾
                </span>
              </div>
            </div>

            {/* Team table */}
            <div className="wf-table">
              <div className="wf-thead">
                <div>Team</div>
                <div>Latest Activity</div>
                <div>Total (This Week)</div>
              </div>
              {[
                { name: "Sarah", act: "Break", proj: "Time-off", pc: "wf-t-slate", time: "0:10", note: "In progress" },
                { name: "Owen", act: "Work", proj: "Project X", pc: "wf-t-pink", time: "5:20", note: "In progress" },
                { name: "Alex", act: "Meeting", proj: "Office", pc: "wf-t-yellow", time: "5:30", note: "32 min ago" },
              ].map((r, i) => (
                <div className="wf-trow" key={r.name}>
                  <div className="wf-tname">{r.name}</div>
                  <div className="wf-tact">
                    <span>{r.act}</span>
                    <span className={`wf-tag-dot ${r.pc}`}>
                      <i style={{ background: "currentColor" }} />
                      {r.proj}
                    </span>
                    <span className="wf-muted">{r.note}</span>
                  </div>
                  <div className="wf-ttotal">
                    <span>13:00</span>
                    <div className="wf-track">
                      <span
                        className={`wf-seg ${rowColors[i][0]}`}
                        style={{ width: loaded ? `${data.rows[i][0]}%` : 0 }}
                      />
                      <span
                        className={`wf-seg ${rowColors[i][1]}`}
                        style={{ width: loaded ? `${data.rows[i][1]}%` : 0 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Analytics */}
            <div className="wf-analytics">
              <div className="wf-stats">
                <div className="wf-stat">
                  <span className="wf-stat-k">Total time</span>
                  <span className="wf-stat-v">{stat.total}</span>
                </div>
                <div className="wf-stat">
                  <span className="wf-stat-k">Top project</span>
                  <span className="wf-stat-v">Project X</span>
                </div>
                <div className="wf-stat">
                  <span className="wf-stat-k">Amount</span>
                  <span className="wf-stat-v">{stat.amount}</span>
                </div>
              </div>

              <div className="wf-viz">
                <div className="wf-chart">
                  <div className="wf-grid">
                    {["10h", "8h", "6h", "4h", "2h", ""].map((l, i) => (
                      <div key={i}>
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="wf-cols">
                    {DAYS.map((d, i) => (
                      <div className="wf-col" key={d}>
                        <div
                          className="wf-col-fill"
                          style={{
                            height: COL_MAX[i],
                            transform: loaded ? `scaleY(${data.cols[i]})` : "scaleY(0)",
                          }}
                        >
                          {COL_SEGMENTS[i].map((s, k) => (
                            <div key={k} className={s.c} style={{ height: `${s.h}%` }} />
                          ))}
                        </div>
                        <span className="wf-col-day">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="wf-breakdown">
                  <div className="wf-donut-wrap">
                    <div className={`wf-donut ${loaded ? "is-on" : ""}`}>
                      <span className="wf-donut-total">{stat.total}</span>
                    </div>
                  </div>
                  <div className="wf-plist">
                    {projNames.map((n, i) => (
                      <div className={`wf-prow ${loaded ? "is-on" : ""}`} key={n} style={{ transitionDelay: `${i * 0.08}s` }}>
                        <span className="wf-pname">{n}</span>
                        <span className="wf-ptotal">{data.projectTotals[i]}</span>
                        <div className="wf-pbar-track">
                          <span
                            className={`wf-pbar ${projColors[i]}`}
                            style={{ width: loaded ? `${data.projects[i]}%` : 0 }}
                          />
                        </div>
                        <span className="wf-ppct">{projPct[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated cursor */}
      {!reduced && (
        <motion.div
          className="wf-cursor"
          initial={false}
          animate={{ x: cursor.x, y: cursor.y, opacity: cursor.on ? 1 : 0, scale: press ? 0.82 : 1 }}
          transition={{
            x: { type: "spring", stiffness: 55, damping: 16 },
            y: { type: "spring", stiffness: 55, damping: 16 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.12 },
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M4 4L10.5 21L13.5 14L20.5 11L4 4Z" fill="#1e293b" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
