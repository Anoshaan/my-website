/* eslint-disable */
"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Product process animation — "From idea to launch, faster with AI".
//
// Ported from the Claude Design handoff (Portfolio.dc.html / ProductProcess-
// Animation.jsx) into a native, self-contained client component. This is a
// designed, self-contained motion piece (a looping reel), so it keeps its own
// internal warm palette and inline styles — that art direction is intentional
// and is framed as "screen content" by <IdeaToLaunch>, the same way the Labs
// mockups are treated. Nothing here leaks to global CSS.
//
// Adaptations vs. the raw handoff:
//   • Engine slimmed to what this reel uses (no dev scrubber / keyboard / no
//     localStorage). The original global key listener is removed because we
//     render inline (not in an iframe) and must not hijack space / arrows.
//   • rAF is gated by an IntersectionObserver — it only runs while on screen.
//   • Honours prefers-reduced-motion with a calm static frame.
//   • Fonts mapped to the site's Geist tokens; the duplicate hero title is
//     removed (the section heading above it now owns that line); em dashes
//     removed from on-screen copy.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";

// ── Easing functions ─────────────────────────────────────────────────────────
const Easing = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function interpolate(input, output, ease = Easing.linear) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? (ease[i] || Easing.linear) : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// ── Timeline + sprite context ────────────────────────────────────────────────
// `time` is the stage playhead (it can be paused on hover so a stage/description
// can be read). `clock` is a continuous, never-pausing wall clock that drives
// all ambient looping motion (drifting particles, orbiting icons, the gentle
// float of every card) so the reel stays visibly alive even while the story is
// held. This is what keeps the animation from ever freezing under hover.
const TimelineContext = React.createContext({ time: 0, duration: 10, playing: false, clock: 0 });
const useTime = () => React.useContext(TimelineContext).time;
const useClock = () => React.useContext(TimelineContext).clock;
const useTimeline = () => React.useContext(TimelineContext);

const SpriteContext = React.createContext({ localTime: 0, progress: 0, duration: 0 });
const useSprite = () => React.useContext(SpriteContext);

function Sprite({ start = 0, end = Infinity, children, keepMounted = false }) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = { localTime, progress, duration, visible };

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SpriteContext.Provider>
  );
}

// ── StageView — controlled renderer. Fits the fixed 1920×1080 design canvas
//    into its container and draws whatever `time` it is given. The clock now
//    lives in useProcessTimeline (timeline.ts); there is no chrome, no card,
//    and the background is transparent so the visual sits natively on the page.
function StageView({ width = 1920, height = 1080, time = 0, duration = 44, children }) {
  const [scale, setScale] = React.useState(0);
  const [, bump] = React.useReducer((x) => (x + 1) % 1e6, 0);
  const wrapRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const s = Math.min(el.clientWidth / width, el.clientHeight / height);
      setScale(s > 0 ? s : 0.01);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  // The continuous ambient clock is read live from the wall clock at render
  // time, so it is always fresh while the parent is re-rendering (i.e. while
  // the stage playhead is advancing). When the playhead is PAUSED on hover the
  // parent stops re-rendering, so a lightweight rAF below forces re-renders —
  // but only while the visual is actually on screen and the playhead is static.
  // This keeps the reel alive under hover without ever re-rendering off-screen.
  const lastTimeRef = React.useRef(time);
  const lastChangeRef = React.useRef(0);
  if (time !== lastTimeRef.current) {
    lastTimeRef.current = time;
    lastChangeRef.current = typeof performance !== "undefined" ? performance.now() : 0;
  }

  React.useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const el = wrapRef.current;
    let onscreen = true;
    let io = null;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([e]) => { onscreen = e.isIntersecting; },
        { threshold: 0.01 }
      );
      io.observe(el);
    }
    let raf = 0;
    const loop = () => {
      // Only drive our own frames when on screen AND the playhead is static
      // (parent not re-rendering); otherwise the parent's per-frame render
      // already refreshes the live clock for us.
      if (onscreen && !document.hidden &&
          performance.now() - lastChangeRef.current > 40) {
        bump();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io && io.disconnect(); };
  }, []);

  const clock = (typeof performance !== "undefined" ? performance.now() : 0) / 1000;
  const ctx = { time, duration, playing: true, clock };

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width,
          height,
          position: "relative",
          transform: `scale(${scale})`,
          transformOrigin: "center",
          flexShrink: 0,
          overflow: "hidden",
          opacity: scale > 0 ? 1 : 0,
        }}
      >
        <TimelineContext.Provider value={ctx}>{children}</TimelineContext.Provider>
      </div>
    </div>
  );
}

// ── Movie tokens ─────────────────────────────────────────────────────────────
const ACCENT = "var(--color-accent)";
const ACCENT_DEEP = "var(--color-accent)";
const ACCENT_SOFT = "rgba(var(--c-accent-rgb), 0.15)";
const INK = "var(--color-fg)";
const SUB = "var(--color-fg-muted)";
const CARD = "var(--color-card)";
const FONT = "var(--font-geist-sans), system-ui, sans-serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

// ── inline icons ─────────────────────────────────────────────────────────────
const SW = (p, w = 2.2) => ({ stroke: p, strokeWidth: w, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" });
const I = (s, kids) => <svg width={s} height={s} viewBox="0 0 24 24">{kids}</svg>;
const IconBulb = ({ c = ACCENT_DEEP, s = 30 }) => I(s, <><path {...SW(c)} d="M9 18h6M10 21h4" /><path {...SW(c)} d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3Z" /></>);
const IconChat = ({ c = INK, s = 26 }) => I(s, <path {...SW(c)} d="M20 12a7 7 0 0 1-9.7 6.5L5 20l1.4-4.6A7 7 0 1 1 20 12Z" />);
const IconTarget = ({ c = INK, s = 26 }) => I(s, <><circle {...SW(c)} cx="12" cy="12" r="8" /><circle {...SW(c)} cx="12" cy="12" r="3.3" /></>);
const IconUsers = ({ c = INK, s = 26 }) => I(s, <><circle {...SW(c)} cx="9" cy="9" r="3" /><path {...SW(c)} d="M3.5 19a5.5 5.5 0 0 1 11 0M16 7a3 3 0 0 1 0 5.8M20.5 19a5 5 0 0 0-3.5-4.8" /></>);
const IconSearch = ({ c = INK, s = 26 }) => I(s, <><circle {...SW(c)} cx="11" cy="11" r="6.5" /><path {...SW(c)} d="m20 20-3.8-3.8" /></>);
const IconRocket = ({ c = INK, s = 30 }) => I(s, <><path {...SW(c)} d="M5 15c-1.2 1-1.5 4-1.5 4s3-.3 4-1.5M14 4.5C9 7 7 12 7.5 16.5c4.5.5 9.5-1.5 12-6.5.8-1.6 1-3.6 1-5.5-1.9 0-3.9.2-6.5 1Z" /><circle cx="14.5" cy="9.5" r="1.5" fill={c} /></>);
const IconCheck = ({ c = "#1f9d5a", s = 22 }) => I(s, <path {...SW(c, 2.6)} d="m5 12.5 4.2 4.5L19 7" />);
const IconCode = ({ c = INK, s = 24 }) => I(s, <path {...SW(c)} d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />);
const IconSpark = ({ c = ACCENT, s = 18 }) => I(s, <path d="M12 2c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z" fill={c} />);
const IconClock = ({ c = INK, s = 26 }) => I(s, <><circle {...SW(c)} cx="12" cy="12" r="8" /><path {...SW(c)} d="M12 8v4.2l2.6 1.8" /></>);
const IconGrid = ({ c = INK, s = 24 }) => I(s, <><rect {...SW(c)} x="4" y="4" width="6.5" height="6.5" rx="1.6" /><rect {...SW(c)} x="13.5" y="4" width="6.5" height="6.5" rx="1.6" /><rect {...SW(c)} x="4" y="13.5" width="6.5" height="6.5" rx="1.6" /><rect {...SW(c)} x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" /></>);
const IconFlow = ({ c = INK, s = 24 }) => I(s, <><rect {...SW(c)} x="3" y="9" width="6" height="6" rx="1.4" /><rect {...SW(c)} x="15" y="4" width="6" height="6" rx="1.4" /><rect {...SW(c)} x="15" y="14" width="6" height="6" rx="1.4" /><path {...SW(c, 1.9)} d="M9 12h3.5M12.5 12V7H15M12.5 12v5H15" /></>);
const IconFigma = ({ s = 24 }) => I(s, <><circle cx="9" cy="5.5" r="2.6" fill="#f24e1e" /><circle cx="9" cy="12" r="2.6" fill="#a259ff" /><circle cx="9" cy="18.5" r="2.6" fill="#0acf83" /><circle cx="15" cy="5.5" r="2.6" fill="#ff7262" /><circle cx="15" cy="12" r="2.6" fill="#1abcfe" /></>);
const IconMega = ({ c = INK, s = 26 }) => I(s, <path {...SW(c)} d="M4 10v4h3l8 4V6l-8 4H4Zm14 .5a3 3 0 0 1 0 3" />);
const IconPlay = ({ c = "#fff", s = 26 }) => I(s, <path d="M8 5v14l11-7z" fill={c} />);
const IconBug = ({ c = ACCENT_DEEP, s = 22 }) => I(s, <><rect {...SW(c)} x="8" y="8" width="8" height="11" rx="4" /><path {...SW(c)} d="M12 4v3M5 10h3M16 10h3M5 17h3M16 17h3M9 5l1 2M15 5l-1 2" /></>);

// ── scene-relative timed gate ────────────────────────────────────────────────
function At({ from = 0, to = Infinity, children }) {
  const { localTime } = useSprite();
  if (localTime < from || localTime > to) return null;
  return children(localTime - from);
}

// ── glass card ───────────────────────────────────────────────────────────────
function FloatCard({ x, y, w, h, appear = 0, leave = null, phase = 0, drift = 5, glow = false, r = 18, children, tint = CARD, extra }) {
  const { localTime, duration } = useSprite();
  const clock = useClock();
  const lv = leave == null ? duration : leave;
  let op = 1, sc = 1, ty = 0;
  if (localTime < appear) { op = 0; sc = 0.85; ty = 16; }
  else if (localTime < appear + 0.5) {
    const t = Easing.easeOutBack(clamp((localTime - appear) / 0.5, 0, 1));
    op = clamp((localTime - appear) / 0.28, 0, 1); sc = 0.85 + 0.15 * t; ty = 16 * (1 - t);
  } else if (localTime > lv - 0.4) {
    const t = Easing.easeInQuad(clamp((localTime - (lv - 0.4)) / 0.4, 0, 1));
    op = 1 - t; sc = 1 - 0.06 * t; ty = -12 * t;
  }
  // Idle float runs on the continuous clock so every card keeps drifting even
  // while the stage playhead is paused for reading.
  const fl = Math.sin((clock + phase) * 1.15) * drift;
  const fr = Math.sin((clock + phase) * 0.8) * 0.7;
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      transform: `translateY(${ty + fl}px) scale(${sc}) rotate(${fr}deg)`,
      opacity: op, borderRadius: r, background: tint,
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      border: "1px solid var(--color-card-border)",
      boxShadow: glow
        ? "0 18px 46px -12px rgba(240,150,20,0.42), 0 3px 12px rgba(60,40,10,0.08), inset 0 1px 0 rgba(255,255,255,0.95)"
        : "0 18px 40px -18px rgba(60,48,30,0.30), 0 2px 8px rgba(60,48,30,0.05), inset 0 1px 0 rgba(255,255,255,0.95)",
      willChange: "transform, opacity", ...extra,
    }}>
      {glow && <div style={{ position: "absolute", inset: -1, borderRadius: r, border: `1.5px solid ${ACCENT}`, opacity: 0.5, pointerEvents: "none" }} />}
      {children}
    </div>
  );
}

const Lab = ({ children, c = INK, s = 16 }) => <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: s, color: c, letterSpacing: "-0.01em" }}>{children}</div>;
const Mut = ({ children, s = 12.5 }) => <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: s, color: SUB, marginTop: 2 }}>{children}</div>;
function Chip({ children, active, dot }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 20, fontFamily: FONT, fontWeight: 700, fontSize: 13, background: active ? ACCENT : "var(--color-card)", color: active ? "var(--color-bg)" : INK, border: active ? "none" : "1px solid var(--color-card-border)", boxShadow: "0 2px 8px rgba(var(--shadow-rgb), 0.05)" }}>{dot && <span style={{ width: 8, height: 8, borderRadius: 3, background: dot }} />}{children}</span>;
}
function Bars({ h = 56, accentIdx = 3, vals = [0.5, 0.75, 0.55, 0.95, 0.68], w = 22 }) {
  return <svg width={vals.length * w} height={h} viewBox={`0 0 ${vals.length * w} ${h}`}>{vals.map((b, i) => <rect key={i} x={4 + i * w} y={h - b * (h - 4)} width={w - 9} height={b * (h - 4)} rx="3" fill={i === accentIdx ? ACCENT : "var(--color-line-2)"} />)}</svg>;
}
function Lines({ n = 3, w = 130, c = "var(--color-line-2)", g = 8 }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: g }}>{Array.from({ length: n }).map((_, i) => <div key={i} style={{ height: 6, width: i === n - 1 ? w * 0.6 : w, background: c, borderRadius: 4 }} />)}</div>;
}

// ── orbit, particles — subtle ambient layers (no opaque card background) ──────
const ORBIT_ICONS = [IconBulb, IconSearch, IconTarget, IconFlow, IconSpark, IconCode, IconCheck, IconRocket];
function Orbit({ bright = 0.3 }) {
  const t = useTime();
  const ck = useClock();
  const intro = clamp((t - 0.4) / 1.4, 0, 1);
  const cx = 960, cy = 540, rx = 760, ry = 430;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: intro }}>
      <svg width="1920" height="1080" style={{ position: "absolute", inset: 0 }}>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(150,135,110,0.13)" strokeWidth="1.5" strokeDasharray="2 11" />
        <ellipse cx={cx} cy={cy} rx={rx * 0.64} ry={ry * 0.64} fill="none" stroke="rgba(245,166,35,0.12)" strokeWidth="1.5" strokeDasharray="2 13" />
      </svg>
      {ORBIT_ICONS.map((Ic, i) => {
        const ang = (i / ORBIT_ICONS.length) * Math.PI * 2 + ck * 0.16;
        const ix = cx + Math.cos(ang) * rx, iy = cy + Math.sin(ang) * ry;
        const dep = (Math.sin(ang) + 1) / 2;
        const op = bright * (0.35 + dep * 0.65);
        const sz = 42;
        return <div key={i} style={{ position: "absolute", left: ix - sz / 2, top: iy - sz / 2, width: sz, height: sz, borderRadius: 12, background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.65)", display: "flex", alignItems: "center", justifyContent: "center", opacity: op, boxShadow: "0 6px 16px rgba(60,48,30,0.07)", transform: `scale(${0.7 + dep * 0.4})` }}><Ic s={20} c={i % 3 === 0 ? ACCENT_DEEP : "#9a9082"} /></div>;
      })}
    </div>
  );
}
function Particles() {
  const t = useClock();
  const dots = React.useMemo(() => Array.from({ length: 22 }).map((_, i) => ({ x: (i * 61.8) % 97, base: (i * 43) % 100, sp: 3 + (i % 5), sz: 1.5 + (i % 3), ph: i })), []);
  return <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{dots.map((d, i) => {
    const y = (d.base - (t * d.sp * 0.45) % 110 + 110) % 110;
    const op = 0.08 + Math.sin((t + d.ph) * 0.8) * 0.06;
    return <div key={i} style={{ position: "absolute", left: `${d.x}%`, top: `${y}%`, width: d.sz * 2, height: d.sz * 2, borderRadius: "50%", background: i % 3 === 0 ? "rgba(245,166,35,0.5)" : "rgba(170,160,145,0.5)", opacity: op }} />;
  })}</div>;
}

// ══ 01 CLIENT IDEA ═══════════════════════════════════════════════════════════
function SceneIdea() {
  return (
    <Sprite start={4} end={8.7}>
      <FloatCard x={620} y={300} w={360} h={150} appear={0.3} leave={4.4} phase={0.3} extra={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: ACCENT_SOFT, display: "flex", alignItems: "center", justifyContent: "center" }}><IconChat s={24} c={ACCENT_DEEP} /></div>
          <div><Lab>Client call</Lab><Mut>&ldquo;Here&rsquo;s what we need&hellip;&rdquo;</Mut></div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", gap: 3, height: 30 }}>
            <At from={0.3}>{lt => <>{[10, 20, 14, 26, 12, 22, 16].map((hh, i) => <div key={i} style={{ width: 4, height: hh + Math.sin(lt * 6 + i) * 6, background: ACCENT, borderRadius: 2, opacity: 0.8 }} />)}</>}</At>
          </div>
        </div>
        <div style={{ marginTop: 14 }}><Lines n={2} w={300} /></div>
      </FloatCard>

      <At from={0.6} to={2.6}>{lt => {
        const p = clamp(lt / 1.6, 0, 1);
        return <>{[[640, 480, 0], [700, 540, 0.25], [760, 470, 0.5]].map((b, i) => {
          const pp = clamp((p - b[2]) / 0.5, 0, 1);
          return <div key={i} style={{ position: "absolute", left: b[0] + pp * 360, top: b[1] - pp * 160, opacity: (1 - pp) * 0.95, padding: "9px 14px", borderRadius: 14, background: i % 2 ? ACCENT : "#fff", color: i % 2 ? "#fff" : INK, fontFamily: FONT, fontWeight: 600, fontSize: 13, boxShadow: "0 8px 18px rgba(60,48,30,0.12)", border: i % 2 ? "none" : "1px solid #ece4d6" }}>{["Goal", "Users", "Budget"][i]}</div>;
        })}</>;
      }}</At>

      <FloatCard x={250} y={300} w={230} h={170} appear={0.4} leave={4.4} phase={1} extra={{ padding: 18, transform: "rotate(-3deg)" }}>
        <Lab s={14} c={ACCENT_DEEP}>Rough idea</Lab>
        <div style={{ marginTop: 12 }}><Lines n={4} w={180} c="#e7cf9c" /></div>
        <div style={{ position: "absolute", right: 14, top: 14 }}><IconBulb s={26} /></div>
      </FloatCard>

      <FloatCard x={1080} y={280} w={420} h={420} appear={1.8} leave={4.4} phase={0.6} glow extra={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}><IconBulb s={28} /><Lab s={20}>Project brief</Lab></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[["Problem", "#ffd9a8"], ["Goal", "#ffe7bd"], ["Need", "#ffefce"]].map(([c, bg], i) => (
            <At key={i} from={2 + i * 0.18}>{() => <div style={{ padding: "12px 10px", borderRadius: 10, background: bg, textAlign: "center", fontFamily: FONT, fontWeight: 700, fontSize: 13, color: ACCENT_DEEP }}>{c}</div>}</At>
          ))}
        </div>
        <Lines n={3} w={372} />
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Onboarding", "Payments", "Dashboard"].map((c, i) => <At key={i} from={2.5 + i * 0.15}>{() => <Chip>{c}</Chip>}</At>)}
        </div>
      </FloatCard>
    </Sprite>
  );
}

// ══ 02 RESEARCH ══════════════════════════════════════════════════════════════
function SceneResearch() {
  const cards = [
    { x: 560, y: 300, w: 250, h: 150, ic: IconTarget, t: "Business goal", s: "grow activation +30%", a: 0.2, glow: true },
    { x: 830, y: 300, w: 250, h: 150, ic: IconUsers, t: "User needs", s: "speed · clarity · trust", a: 0.45 },
    { x: 1100, y: 300, w: 250, h: 150, ic: IconUsers, t: "Audience", s: "3 key personas", a: 0.7 },
    { x: 560, y: 470, w: 250, h: 150, ic: IconTarget, t: "Pain points", s: "drop-off at signup", a: 0.95 },
    { x: 830, y: 470, w: 250, h: 150, ic: IconSearch, t: "Insights", s: "12 findings", a: 1.2 },
  ];
  return (
    <Sprite start={8.5} end={13.2}>
      <div style={{ position: "absolute", inset: 0, transform: "translateX(150px)" }}>
      {cards.map((c, i) => (
        <FloatCard key={i} x={c.x} y={c.y} w={c.w} h={c.h} appear={c.a} leave={13 - 8.5} phase={i * 0.5} glow={c.glow} extra={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
          <c.ic s={26} c={c.glow ? ACCENT_DEEP : INK} />
          <div><Lab s={16} c={c.glow ? ACCENT_DEEP : INK}>{c.t}</Lab><Mut>{c.s}</Mut></div>
        </FloatCard>
      ))}
      <FloatCard x={1100} y={470} w={250} h={150} appear={0.6} leave={13 - 8.5} phase={2} extra={{ padding: 18 }}>
        <Lab s={14}>Signal</Lab>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 14 }}><Bars h={64} /><IconSearch s={28} c={ACCENT_DEEP} /></div>
      </FloatCard>
      <FloatCard x={250} y={300} w={250} h={320} appear={0.3} leave={13 - 8.5} phase={1.4} extra={{ padding: 18 }}>
        <Lab s={15}>Research notes</Lab>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {[["#fff2d6", 0.5], ["#ffe7bd", 0.8], ["#fff7e8", 1.1]].map(([bg, d], i) => <At key={i} from={d}>{() => <div style={{ background: bg, borderRadius: 9, padding: 11 }}><Lines n={2} w={180} c="#e7cf9c" /></div>}</At>)}
        </div>
      </FloatCard>
      <At from={1.4} to={4.2}>{lt => {
        const x = 540 + (clamp(lt / 2.4, 0, 1)) * 820;
        return <div style={{ position: "absolute", left: x, top: 290, width: 2, height: 340, background: `linear-gradient(${ACCENT}, rgba(245,166,35,0))`, boxShadow: `0 0 16px ${ACCENT}`, opacity: 0.7 }} />;
      }}</At>
      </div>
    </Sprite>
  );
}

// ══ 03 COMPETITORS ═══════════════════════════════════════════════════════════
function MiniBrowser({ accentBar, gap }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 26, display: "flex", alignItems: "center", gap: 5, padding: "0 11px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-line)", borderRadius: "16px 16px 0 0" }}>
        {["#ff6159", "#ffbd2e", "#28c93f"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
        <div style={{ marginLeft: 5, height: 8, width: 90, borderRadius: 5, background: "#e6ddcf" }} />
      </div>
      <div style={{ flex: 1, padding: 12 }}>
        <div style={{ height: 26, borderRadius: 6, background: accentBar ? ACCENT_SOFT : "var(--color-surface)", marginBottom: 9 }} />
        <div style={{ display: "flex", gap: 8 }}><div style={{ flex: 1 }}><Lines n={2} w={90} /></div><Bars h={40} accentIdx={-1} vals={[0.5, 0.8, 0.6]} w={16} /></div>
        {gap && <div style={{ position: "absolute", top: 8, right: 8, width: 12, height: 12, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />}
      </div>
    </div>
  );
}
function SceneCompetitors() {
  return (
    <Sprite start={13} end={17.7}>
      <div style={{ position: "absolute", inset: 0, transform: "translateX(150px)" }}>
      {[[560, 300, false, true], [830, 300, false, false], [560, 470, false, true], [830, 470, false, false]].map((c, i) => (
        <FloatCard key={i} x={c[0]} y={c[1]} w={250} h={150} appear={0.2 + i * 0.18} leave={17.5 - 13} phase={i * 0.5} extra={{ padding: 0, overflow: "hidden" }}><MiniBrowser gap={c[3]} /></FloatCard>
      ))}
      <FloatCard x={1100} y={300} w={250} h={150} appear={1.1} leave={17.5 - 13} glow phase={1} extra={{ padding: 0, overflow: "hidden" }}>
        <MiniBrowser accentBar />
        <div style={{ position: "absolute", top: 9, right: 9, padding: "4px 9px", borderRadius: 12, background: ACCENT, color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 11 }}>OPPORTUNITY</div>
      </FloatCard>
      <FloatCard x={250} y={300} w={250} h={320} appear={0.3} leave={17.5 - 13} phase={1.4} extra={{ padding: 18 }}>
        <Lab s={15}>Comparison</Lab>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {["Speed", "Onboarding", "Pricing", "UX clarity"].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 78, fontFamily: FONT, fontSize: 12, color: SUB }}>{r}</span>
              {[0, 1, 2].map(j => <div key={j} style={{ width: 16, height: 16, borderRadius: 5, background: (i === 3 && j === 0) ? ACCENT : (j < 2 ? "#e2dacc" : "#f0e9dd") }} />)}
            </div>
          ))}
        </div>
      </FloatCard>
      <FloatCard x={1100} y={470} w={250} h={150} appear={1.3} leave={17.5 - 13} phase={2} extra={{ padding: 18, display: "flex", flexWrap: "wrap", alignContent: "center", gap: 9 }}>
        {[["Market", false], ["Gaps", true], ["UX issues", false], ["Better UX", true]].map(([c, a], i) => <Chip key={i} active={a}>{c}</Chip>)}
      </FloatCard>
      <At from={1.2} to={4}>{lt => { const x = 540 + clamp(lt / 2.4, 0, 1) * 820; return <div style={{ position: "absolute", left: x, top: 290, width: 2, height: 340, background: `linear-gradient(${ACCENT}, rgba(245,166,35,0))`, boxShadow: `0 0 16px ${ACCENT}`, opacity: 0.6 }} />; }}</At>
      </div>
    </Sprite>
  );
}

// ══ 04 UX FLOW ═══════════════════════════════════════════════════════════════
function WF({ phone, accent }) {
  return (
    <div style={{ height: "100%", padding: 11, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ height: 18, borderRadius: 5, background: "var(--color-surface)" }} />
      <div style={{ flex: 1, borderRadius: 8, border: "1.5px dashed var(--color-line-2)", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ height: phone ? 26 : 36, borderRadius: 6, background: "var(--color-surface-2)" }} />
        <div style={{ height: 6, width: "78%", borderRadius: 4, background: "#ded6c8" }} />
        <div style={{ height: 6, width: "92%", borderRadius: 4, background: "#ded6c8" }} />
      </div>
      <div style={{ height: 22, borderRadius: 7, background: accent ? ACCENT : "#d8cfc0" }} />
    </div>
  );
}
function SceneUX() {
  const screens = [[280, 340], [620, 320], [960, 340], [1300, 320]];
  return (
    <Sprite start={17.5} end={22.4}>
      <At from={0.9} to={4.6}>{lt => {
        const off = clamp(lt / 1.4, 0, 1);
        return <svg width="1920" height="1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[[480, 415, 620, 400], [820, 400, 960, 415], [1160, 415, 1300, 400]].map((a, i) => (
            <path key={i} d={`M${a[0]} ${a[1]} C ${a[0] + 50} ${a[1] - 30}, ${a[2] - 50} ${a[3] - 30}, ${a[2]} ${a[3]}`} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeDasharray="7 8" strokeDashoffset={-lt * 26} opacity={0.6 * clamp((off - i * 0.18), 0, 1)} markerEnd="url(#ar)" />
          ))}
          <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill={ACCENT} /></marker></defs>
        </svg>;
      }}</At>
      {screens.map((s, i) => (
        <FloatCard key={i} x={s[0]} y={s[1]} w={i % 2 ? 200 : 170} h={i % 2 ? 200 : 240} appear={0.3 + i * 0.22} leave={22.2 - 17.5} phase={i * 0.5} extra={{ overflow: "hidden" }}><WF phone={i % 2 === 0} accent={i === 3} /></FloatCard>
      ))}
      <FloatCard x={560} y={600} w={790} h={110} appear={1.4} leave={22.2 - 17.5} phase={2} extra={{ padding: "0 22px", display: "flex", alignItems: "center", gap: 10 }}>
        <Lab s={14}>Navigation</Lab>
        {["Home", "Search", "Detail", "Cart", "Checkout", "Done"].map((c, i) => <React.Fragment key={i}><Chip active={i === 0}>{c}</Chip>{i < 5 && <span style={{ color: "#cdc2b0" }}>&rarr;</span>}</React.Fragment>)}
      </FloatCard>
      <FloatCard x={250} y={340} w={150} h={240} appear={0.2} leave={22.2 - 17.5} phase={1.1} extra={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
        <IconFlow s={26} c={ACCENT_DEEP} /><Lab s={13}>Screen map</Lab>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>{[0, 1, 2].map(i => <div key={i} style={{ height: 22, borderRadius: 6, background: i === 0 ? ACCENT_SOFT : "#f0e9dd" }} />)}</div>
      </FloatCard>
    </Sprite>
  );
}

// ══ 05 AI PROTOTYPE ══════════════════════════════════════════════════════════
const AI_TOOLS = [["Claude", "#d97706"], ["Lovable", "#ff4d6d"], ["v0", "#2b2b2b"], ["Antigravity", "#2563eb"]];
const PROMPT = "Build a clean onboarding flow\nfor a fintech mobile app.\n3 steps, trust-first, fast.";
function SceneAI() {
  return (
    <Sprite start={22.2} end={27.2}>
      <FloatCard x={250} y={300} w={470} h={250} appear={0.2} leave={27 - 22.2} phase={0.3} extra={{ padding: 0, overflow: "hidden" }}>
        <div style={{ height: 32, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}><IconSpark s={16} /><span style={{ color: "rgba(0,0,0,0.5)", fontFamily: MONO, fontSize: 12 }}>prompt</span></div>
        <div style={{ padding: 18, fontFamily: MONO, fontSize: 16, lineHeight: 1.6, color: INK, whiteSpace: "pre-wrap" }}>
          <At from={0.3}>{lt => { const n = Math.floor(clamp(lt / 2, 0, 1) * PROMPT.length); const blink = Math.floor(lt * 2) % 2; return <>{PROMPT.slice(0, n)}<span style={{ opacity: blink, color: ACCENT }}>&#9613;</span></>; }}</At>
        </div>
      </FloatCard>
      <FloatCard x={250} y={580} w={470} h={100} appear={0.6} leave={27 - 22.2} phase={1} extra={{ padding: 16, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {AI_TOOLS.map(([n, col], i) => (
          <At key={i} from={0}>{lt => { const on = lt > 1.2 + i * 0.4; return <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: on ? "#fff" : "#f3ede3", border: on ? `1.5px solid ${col}` : "1px solid #ece4d6", boxShadow: on ? "0 4px 12px rgba(60,48,30,0.1)" : "none", fontFamily: FONT, fontWeight: 700, fontSize: 14, color: on ? INK : SUB }}><span style={{ width: 11, height: 11, borderRadius: 4, background: on ? col : "#cdc2b0" }} />{n}</div>; }}</At>
        ))}
      </FloatCard>
      <At from={0.8} to={4.4}>{lt => <>{[[760, 360], [800, 470], [740, 560], [820, 300]].map((p, i) => { const o = clamp(Math.sin((lt * 2 + i) * 1.5), 0, 1); return <div key={i} style={{ position: "absolute", left: p[0], top: p[1], opacity: o, transform: `scale(${0.6 + o * 0.7})` }}><IconSpark s={20} /></div>; })}</>}</At>
      <FloatCard x={900} y={300} w={300} h={250} appear={1.4} leave={27 - 22.2} phase={0.7} glow extra={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}><IconGrid s={22} c={ACCENT_DEEP} /><Lab s={15} c={ACCENT_DEEP}>Generating&hellip;</Lab></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9 }}>
          {Array.from({ length: 9 }).map((_, i) => <At key={i} from={1.4 + i * 0.12}>{() => <div style={{ height: 48, borderRadius: 7, background: "rgba(245,166,35,0.16)", border: `1.5px solid ${ACCENT}` }} />}</At>)}
        </div>
      </FloatCard>
      <FloatCard x={1240} y={300} w={260} h={330} appear={3.0} leave={27 - 22.2} phase={1.3} extra={{ overflow: "hidden", padding: 0 }}>
        <div style={{ height: 38, background: ACCENT, display: "flex", alignItems: "center", padding: "0 14px" }}><div style={{ height: 9, width: 90, borderRadius: 5, background: "rgba(255,255,255,0.7)" }} /></div>
        <div style={{ padding: 15 }}>
          <div style={{ height: 70, borderRadius: 9, background: "linear-gradient(120deg,#ffe6bf,#ffd08a)", marginBottom: 11 }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 11 }}>{[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 50, borderRadius: 7, background: "#f1ebe1" }} />)}</div>
          <Lines n={2} w={228} />
          <div style={{ height: 34, borderRadius: 8, background: ACCENT, marginTop: 12 }} />
        </div>
      </FloatCard>
      <FloatCard x={900} y={580} w={300} h={100} appear={1.0} leave={27 - 22.2} phase={1.8} extra={{ padding: 14, overflow: "hidden" }}>
        <At from={1}>{lt => <div style={{ fontFamily: MONO, fontSize: 11.5, color: "#1f9d5a", lineHeight: 1.7 }}>{["✓ parsing brief", "✓ generating layout", "✓ wiring components", "▐ rendering preview"].slice(0, Math.floor(clamp((lt - 1) / 2, 0, 1) * 4) + 1).map((l, i) => <div key={i} style={{ opacity: i === 3 ? 0.7 : 1 }}>{l}</div>)}</div>}</At>
      </FloatCard>
    </Sprite>
  );
}

// ══ 06 FRONT-END BUILD ═══════════════════════════════════════════════════════
function SceneFrontEnd() {
  return (
    <Sprite start={27} end={32.2}>
      <At from={1.0} to={4.8}>{lt => <svg width="1920" height="1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <path d="M530 400 C 680 400, 720 400, 880 400" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeDasharray="6 7" strokeDashoffset={-lt * 30} opacity="0.6" />
        <circle r="4" fill={ACCENT}><animateMotion dur="1.5s" repeatCount="indefinite" path="M530 400 C 680 400, 720 400, 880 400" /></circle>
        <text x="705" y="388" textAnchor="middle" fontFamily={MONO} fontSize="12" fill={ACCENT_DEEP}>MCP</text>
      </svg>}</At>
      <FloatCard x={250} y={300} w={280} h={210} appear={0.3} leave={32 - 27} phase={0.3} extra={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}><IconFigma s={22} /><Lab s={15}>Figma canvas</Lab></div>
        <div style={{ display: "flex", gap: 9 }}><div style={{ flex: 1, height: 110, borderRadius: 8, background: "linear-gradient(120deg,#ffe6bf,#ffd08a)" }} /><div style={{ width: 80, display: "flex", flexDirection: "column", gap: 6 }}><div style={{ height: 8, background: "#e2dacc", borderRadius: 4 }} /><div style={{ height: 8, background: "#e2dacc", borderRadius: 4 }} /><div style={{ height: 8, width: "60%", background: "#e2dacc", borderRadius: 4 }} /><div style={{ marginTop: "auto", height: 26, background: ACCENT, borderRadius: 6 }} /></div></div>
      </FloatCard>
      <FloatCard x={250} y={530} w={280} h={150} appear={0.7} leave={32 - 27} phase={0.9} extra={{ padding: 16 }}>
        <Lab s={14}>Design tokens</Lab>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>{[ACCENT, "#23201b", "#1f9d5a", "#2563eb", "#a259ff"].map((c, i) => <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: c }} />)}</div>
        <div style={{ marginTop: 12 }}><Lines n={2} w={240} /></div>
      </FloatCard>
      <FloatCard x={900} y={300} w={300} h={310} appear={1.4} leave={32 - 27} phase={1.2} extra={{ padding: 0, overflow: "hidden" }}>
        <div style={{ height: 30, display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>{["#ff6159", "#ffbd2e", "#28c93f"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}<span style={{ marginLeft: 6, color: "rgba(0,0,0,0.5)", fontFamily: MONO, fontSize: 11 }}>Product.tsx</span></div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>{[[70, "#7dd3fc"], [130, "#fbbf77"], [100, "#86efac"], [150, "#7dd3fc"], [80, "#c4b5fd"], [120, "#fbbf77"]].map(([w, c], i) => <At key={i} from={1.4 + i * 0.12}>{() => <div style={{ display: "flex", gap: 7, paddingLeft: i === 1 || i === 2 || i === 4 ? 14 : 0 }}><div style={{ width: 16, height: 6, background: "rgba(0,0,0,0.15)", borderRadius: 3 }} /><div style={{ width: w, height: 6, background: c, borderRadius: 3, opacity: 0.85 }} /></div>}</At>)}</div>
      </FloatCard>
      <FloatCard x={900} y={628} w={300} h={56} appear={1.8} leave={32 - 27} phase={1.6} glow extra={{ padding: "0 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <IconSpark s={18} /><span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13.5, color: ACCENT_DEEP }}>AI assists, I keep design control</span>
      </FloatCard>
      <FloatCard x={1240} y={300} w={260} h={150} appear={1.0} leave={32 - 27} phase={1.4} extra={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}><IconGrid s={22} c={ACCENT_DEEP} /><Lab s={14}>Components</Lab></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>{Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ height: 32, borderRadius: 7, background: i % 3 === 0 ? ACCENT_SOFT : "#f0e9dd", border: "1px solid #ece4d6" }} />)}</div>
      </FloatCard>
      <FloatCard x={1240} y={470} w={260} h={210} appear={2.0} leave={32 - 27} phase={2} extra={{ padding: 16, display: "flex", gap: 10, alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 130, height: 100, borderRadius: 8, background: "#fff", border: "1px solid #ece4d6", padding: 8 }}><div style={{ height: 20, background: ACCENT_SOFT, borderRadius: 4, marginBottom: 6 }} /><div style={{ height: 6, background: "var(--color-surface)", borderRadius: 3, marginBottom: 5 }} /><div style={{ height: 6, width: "70%", background: "var(--color-surface)", borderRadius: 3 }} /></div>
        <div style={{ width: 56, height: 80, borderRadius: 8, background: "#fff", border: "1px solid #ece4d6", padding: 6 }}><div style={{ height: 14, background: ACCENT_SOFT, borderRadius: 3, marginBottom: 5 }} /><div style={{ height: 5, background: "var(--color-surface)", borderRadius: 2, marginBottom: 4 }} /><div style={{ height: 5, width: "60%", background: "var(--color-surface)", borderRadius: 2 }} /></div>
        <div style={{ width: 34, height: 64, borderRadius: 7, background: "#fff", border: "1px solid #ece4d6", padding: 5 }}><div style={{ height: 11, background: ACCENT_SOFT, borderRadius: 3 }} /></div>
      </FloatCard>
    </Sprite>
  );
}

// ══ 07 DEV + QA ══════════════════════════════════════════════════════════════
function SceneDev() {
  const cols = ["Design", "Development", "QA", "Approved"];
  return (
    <Sprite start={32.2} end={36.9}>
      <FloatCard x={250} y={300} w={760} h={330} appear={0.3} leave={36.7 - 32.2} phase={0.3} extra={{ padding: 22 }}>
        <Lab s={17}>Production board</Lab>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 16 }}>
          {cols.map((c, i) => <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12.5, color: i === 3 ? "#1f9d5a" : SUB }}>{c}</div><div style={{ height: 200, borderRadius: 10, background: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.04)" }} /></div>)}
        </div>
        <At from={0.9} to={5}>{lt => { const p = clamp(lt / 3.4, 0, 1); const colW = (760 - 44 - 42) / 4; const xp = 22 + interpolate([0, 1], [0, colW * 3], Easing.easeInOutCubic)(p); const done = p > 0.95; return <div style={{ position: "absolute", left: xp + 4, top: 92, width: colW - 4, height: 46, borderRadius: 9, background: done ? "#e7f7ee" : "#fff", border: `1.5px solid ${done ? "#1f9d5a" : ACCENT}`, boxShadow: "0 8px 16px rgba(60,48,30,0.12)", display: "flex", alignItems: "center", gap: 9, padding: "0 12px" }}>{done ? <IconCheck s={20} /> : <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />}<div style={{ flex: 1, height: 6, borderRadius: 4, background: done ? "#bfe8d0" : "#e7dfd2" }} /></div>; }}</At>
      </FloatCard>
      <FloatCard x={1040} y={300} w={300} h={210} appear={0.8} leave={36.7 - 32.2} phase={1} extra={{ padding: 20 }}>
        <Lab s={15}>QA checklist</Lab>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          {["Unit tests", "Responsive", "Accessibility", "Performance"].map((c, i) => <At key={i} from={1 + i * 0.4}>{() => <div style={{ display: "flex", alignItems: "center", gap: 10 }}><IconCheck s={18} /><span style={{ fontFamily: FONT, fontSize: 14, color: INK }}>{c}</span></div>}</At>)}
        </div>
      </FloatCard>
      <FloatCard x={1370} y={300} w={170} h={210} appear={0.6} leave={36.7 - 32.2} phase={1.4} extra={{ padding: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <At from={0}>{lt => { const fixed = lt > 2.4; return <>{fixed ? <IconCheck s={40} /> : <IconBug s={40} />}<Lab s={14} c={fixed ? "#1f9d5a" : ACCENT_DEEP}>{fixed ? "Fixed" : "3 bugs"}</Lab></>; }}</At>
      </FloatCard>
      <FloatCard x={1040} y={530} w={500} h={100} appear={2.6} leave={36.7 - 32.2} glow phase={2} extra={{ padding: "0 22px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#e7f7ee", display: "flex", alignItems: "center", justifyContent: "center" }}><IconCheck s={28} /></div>
        <div><Lab s={18} c="#1f9d5a">Approved &middot; Release candidate</Lab><Mut s={13.5}>v1.0 ready to ship</Mut></div>
        <span style={{ marginLeft: "auto" }}><Chip active>Ship</Chip></span>
      </FloatCard>
    </Sprite>
  );
}

// ══ 08 LAUNCH PREP ═══════════════════════════════════════════════════════════
function SceneLaunchPrep() {
  return (
    <Sprite start={36.9} end={41}>
      <FloatCard x={250} y={300} w={320} h={250} appear={0.2} leave={40.8 - 36.9} phase={0.3} extra={{ padding: 0, overflow: "hidden" }}>
        <div style={{ height: 36, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}><div style={{ height: 9, width: 80, borderRadius: 5, background: "rgba(255,255,255,0.7)" }} /><div style={{ height: 16, width: 42, borderRadius: 8, background: "rgba(255,255,255,0.5)" }} /></div>
        <div style={{ padding: 16 }}><div style={{ height: 80, borderRadius: 9, background: "linear-gradient(120deg,#ffe6bf,#ffd08a)", marginBottom: 11 }} /><Lines n={2} w={270} /><div style={{ height: 28, width: 110, borderRadius: 8, background: ACCENT, marginTop: 12 }} /></div>
        <div style={{ position: "absolute", bottom: 12, right: 14, fontFamily: FONT, fontSize: 11, fontWeight: 700, color: SUB }}>Landing page</div>
      </FloatCard>
      <FloatCard x={600} y={300} w={250} h={150} appear={0.5} leave={40.8 - 36.9} phase={0.9} extra={{ padding: 0, overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#e0dcd5,#b5b0a8)", position: "relative" }}><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}><IconPlay c={ACCENT_DEEP} s={24} /></div></div><div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: FONT, fontSize: 12, fontWeight: 700, color: INK }}>Launch video</div></div>
      </FloatCard>
      <FloatCard x={600} y={470} w={120} h={140} appear={0.7} leave={40.8 - 36.9} phase={1.4} extra={{ padding: 11 }}><div style={{ height: 70, borderRadius: 8, background: "linear-gradient(135deg,#ffd08a,#f59e0b)", marginBottom: 8 }} /><Lines n={2} w={92} /></FloatCard>
      <FloatCard x={730} y={470} w={120} h={140} appear={0.9} leave={40.8 - 36.9} phase={1.8} extra={{ padding: 11 }}><div style={{ height: 70, borderRadius: 8, background: "linear-gradient(135deg,#9ec5e8,#5b8fd1)", marginBottom: 8 }} /><Lines n={2} w={92} /></FloatCard>
      <FloatCard x={880} y={300} w={300} h={120} appear={1.1} leave={40.8 - 36.9} phase={1.2} extra={{ display: "flex", alignItems: "center", gap: 16, padding: "0 22px" }}>
        <IconClock s={30} c={ACCENT_DEEP} />
        <div style={{ display: "flex", gap: 9 }}>{["02", "14", "36"].map((d, i) => <div key={i} style={{ padding: "10px 13px", borderRadius: 10, background: INK, color: "#fff", fontFamily: FONT, fontWeight: 800, fontSize: 22 }}>{d}</div>)}</div>
      </FloatCard>
      <FloatCard x={880} y={440} w={300} h={190} appear={1.3} leave={40.8 - 36.9} phase={2.2} extra={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}><IconMega s={24} c={ACCENT_DEEP} /><Lab s={15}>Launch checklist</Lab></div>
        {["Assets ready", "Store listing", "Campaign live", "Press kit"].map((c, i) => <At key={i} from={1.3 + i * 0.35}>{() => <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}><IconCheck s={16} /><span style={{ fontFamily: FONT, fontSize: 13.5, color: INK }}>{c}</span></div>}</At>)}
      </FloatCard>
      <FloatCard x={1210} y={300} w={330} h={330} appear={1.0} leave={40.8 - 36.9} glow phase={1.6} extra={{ padding: 0, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(150deg,#fff3df,#ffe0b0)", padding: 24, display: "flex", flexDirection: "column" }}>
          <Chip dot={ACCENT_DEEP}>Campaign</Chip>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 32, color: INK, marginTop: 18, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Launching<br />soon.</div>
          <div style={{ marginTop: "auto", display: "flex", gap: 8 }}><div style={{ flex: 1, height: 40, borderRadius: 9, background: ACCENT }} /><div style={{ width: 40, height: 40, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><IconRocket s={22} c={ACCENT_DEEP} /></div></div>
        </div>
      </FloatCard>
    </Sprite>
  );
}

// ══ 09 LAUNCHED PRODUCT + loop ═══════════════════════════════════════════════
function SceneLaunched() {
  return (
    <Sprite start={40.8} end={44}>
      {/* Completion ambience — a soft, slow radial glow behind the product so
          the final stage reads as the finished, launched output. Minimal. */}
      <At from={0}>{lt => {
        const g = 0.45 + Math.sin(lt * 1.4) * 0.18;
        return <div style={{ position: "absolute", left: "50%", top: "50%", width: 1200, height: 1200, transform: "translate(-50%,-50%)", borderRadius: "50%", background: `radial-gradient(circle, rgba(245,166,35,${0.12 * g}) 0%, rgba(245,166,35,0) 60%)`, filter: "blur(24px)", pointerEvents: "none" }} />;
      }}</At>
      <At from={0.2}>{lt => {
        const inT = Easing.easeOutBack(clamp(lt / 0.7, 0, 1));
        const glow = 0.5 + Math.sin(lt * 3) * 0.3;
        const fade = clamp((lt - 2.0) / 1.0, 0, 1);
        return (
          <div style={{ position: "absolute", left: 750, top: 320, width: 420, height: 320, opacity: 1 - fade, transform: `scale(${0.8 + 0.2 * inT})`, transformOrigin: "50% 50%" }}>
            <div style={{ position: "absolute", inset: -40, borderRadius: 40, background: `radial-gradient(circle, rgba(245,166,35,${0.34 * glow}), rgba(245,166,35,0) 70%)`, filter: "blur(6px)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "rgba(255,255,255,0.96)", border: `1.5px solid ${ACCENT}`, boxShadow: "0 26px 60px -16px rgba(240,150,20,0.5)", overflow: "hidden" }}>
              <div style={{ height: 46, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}><div style={{ height: 11, width: 110, borderRadius: 6, background: "rgba(255,255,255,0.75)" }} /><IconRocket s={24} c="#fff" /></div>
              <div style={{ padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}><div><div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, color: INK }}>Live</div><Mut s={13}>real users, real traffic</Mut></div><span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 20, background: "#e7f7ee", color: "#1f9d5a", fontFamily: FONT, fontWeight: 700, fontSize: 12 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1f9d5a" }} />Launch complete</span></div>
                <svg width="356" height="120" viewBox="0 0 356 120"><polyline points="6,108 64,92 120,96 178,62 236,48 296,22 350,8" fill="none" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="760" strokeDashoffset={760 - clamp(lt / 1.6, 0, 1) * 760} />{[[64, 92], [178, 62], [296, 22]].map((pt, i) => <circle key={i} cx={pt[0]} cy={pt[1]} r="5" fill={ACCENT_DEEP} opacity={clamp(lt - 0.6 - i * 0.25, 0, 1)} />)}</svg>
              </div>
            </div>
          </div>
        );
      }}</At>
      <At from={0.6} to={2.4}>{lt => <>{[[520, 360], [1010, 420], [500, 560], [1030, 320], [540, 640]].map((p, i) => { const o = clamp(Math.sin(lt * 2.2 + i * 1.1), 0, 1); return <div key={i} style={{ position: "absolute", left: p[0], top: p[1], width: 12, height: 12, borderRadius: "50%", background: ACCENT, opacity: o * 0.8, transform: `scale(${0.5 + o})` }} />; })}</>}</At>

      <At from={2.0}>{lt => { const p = clamp((lt - 2.0) / 1.0, 0, 1); return <div style={{ position: "absolute", inset: 0, opacity: p }}><Orbit bright={0.9} /></div>; }}</At>
    </Sprite>
  );
}

// ── world & movie ────────────────────────────────────────────────────────────
function World() {
  const t = useTime();
  const camScale = interpolate([0, 4, 22, 40.5, 44], [1.035, 1.0, 1.012, 1.0, 1.035], Easing.easeInOutSine)(t);
  const orbitBright = t > 41 ? 0.0 : interpolate([0, 4, 5], [0.5, 0.3, 0.3], Easing.linear)(t);
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale})`, transformOrigin: "50% 52%", willChange: "transform" }}>
      <Orbit bright={orbitBright} />
      <SceneIdea />
      <SceneResearch />
      <SceneCompetitors />
      <SceneUX />
      <SceneAI />
      <SceneFrontEnd />
      <SceneDev />
      <SceneLaunchPrep />
      <SceneLaunched />
    </div>
  );
}
export default function ProductProcessAnimation({ time = 0 }) {
  return (
    <StageView time={time} width={1920} height={1080} duration={44}>
      <Particles />
      <World />
    </StageView>
  );
}

