"use client";

import {
  type CSSProperties,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import "./MidFi.css";

/**
 * MidFi — mid-fidelity mockup primitives shared by every non-Chronos
 * case study card. Each case study composes a tall, slot-shaped tree
 * out of these parts; the shell handles the chrome (browser bar or
 * phone notch), the auto-scroll loop, off-screen pause, and the
 * reduced-motion fallback.
 *
 * Authoring rules
 * ───────────────
 * 1. Compose content roughly 2× the visible height so the scroll has
 *    somewhere to go. The shell rides up by 50% of the content height
 *    and back down.
 * 2. Set `--accent` on <MidFiShell> to theme the mockup. All primitives
 *    (chips, bars, rings, glows) read from --accent.
 * 3. Anything with motion already pauses while off-screen via the
 *    shell's IntersectionObserver. Don't add fresh observers.
 */

type Orientation = "web" | "mobile";

type ShellProps = PropsWithChildren<{
  orientation: Orientation;
  accent: string;
  /** Optional title shown in the faux browser/title bar. */
  title?: string;
  /** Optional eyebrow line shown beside the title (web only). */
  meta?: string;
}>;

export function MidFiShell({
  orientation,
  accent,
  title,
  meta,
  children,
}: ShellProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-idle", !entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { "--accent": accent } as CSSProperties;

  if (orientation === "mobile") {
    return (
      <div
        ref={ref}
        className="midfi midfi--mobile"
        style={style}
        aria-hidden="true"
      >
        <div className="midfi-stage">
          <div className="midfi-phone">
            <div className="midfi-phone-notch" />
            <div className="midfi-phone-screen">
              <div className="midfi-status">
                <span>9:41</span>
                <span className="midfi-status-icons">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="midfi-scroll midfi-scroll--mobile">
                <div className="midfi-content midfi-content--mobile">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="midfi midfi--web" style={style} aria-hidden="true">
      <div className="midfi-browser">
        <div className="midfi-browser-bar">
          <span className="midfi-browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="midfi-browser-url">
            {title ?? "preview"}
            {meta ? <em>{meta}</em> : null}
          </span>
          <span className="midfi-browser-tools">
            <i />
            <i />
          </span>
        </div>
        <div className="midfi-scroll midfi-scroll--web">
          <div className="midfi-content midfi-content--web">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── primitives ─────────────── */

export function Section({
  children,
  pad = "md",
  bg,
  className,
}: PropsWithChildren<{ pad?: "sm" | "md" | "lg"; bg?: string; className?: string }>) {
  return (
    <div
      className={`midfi-section midfi-section--${pad}${className ? ` ${className}` : ""}`}
      style={bg ? { background: bg } : undefined}
    >
      {children}
    </div>
  );
}

export function Row({
  children,
  gap = 8,
  align = "center",
  justify = "start",
  wrap = false,
  className,
}: PropsWithChildren<{
  gap?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  className?: string;
}>) {
  return (
    <div
      className={`midfi-row${className ? ` ${className}` : ""}`}
      style={{
        gap,
        alignItems:
          align === "between"
            ? "center"
            : align === "start"
              ? "flex-start"
              : align === "end"
                ? "flex-end"
                : align,
        justifyContent:
          justify === "between"
            ? "space-between"
            : justify === "start"
              ? "flex-start"
              : justify === "end"
                ? "flex-end"
                : justify,
        flexWrap: wrap ? "wrap" : "nowrap",
      }}
    >
      {children}
    </div>
  );
}

export function Stack({
  children,
  gap = 8,
  className,
}: PropsWithChildren<{ gap?: number; className?: string }>) {
  return (
    <div className={`midfi-stack${className ? ` ${className}` : ""}`} style={{ gap }}>
      {children}
    </div>
  );
}

/** Big page title — used at the top of most mockups. */
export function HeroTitle({ children }: PropsWithChildren) {
  return <div className="midfi-hero-title">{children}</div>;
}

export function Eyebrow({ children }: PropsWithChildren) {
  return <span className="midfi-eyebrow">{children}</span>;
}

export function Bar({
  width = "100%",
  height = 8,
  dim = 0.35,
}: {
  width?: number | string;
  height?: number;
  dim?: number;
}) {
  return (
    <span
      className="midfi-bar"
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height,
        opacity: dim,
      }}
    />
  );
}

export function Chip({
  children,
  accent,
  size = "sm",
}: PropsWithChildren<{ accent?: boolean; size?: "xs" | "sm" }>) {
  return (
    <span
      className={`midfi-chip midfi-chip--${size}${accent ? " is-accent" : ""}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  pad = 12,
  className,
}: PropsWithChildren<{ pad?: number; className?: string }>) {
  return (
    <div
      className={`midfi-card${className ? ` ${className}` : ""}`}
      style={{ padding: pad }}
    >
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  trend,
  accent,
}: {
  label: string;
  value: ReactNode;
  trend?: string;
  accent?: boolean;
}) {
  return (
    <div className={`midfi-stat${accent ? " is-accent" : ""}`}>
      <span className="midfi-stat-label">{label}</span>
      <span className="midfi-stat-value">{value}</span>
      {trend ? <span className="midfi-stat-trend">{trend}</span> : null}
    </div>
  );
}

/** Small avatar circle with monogram initials. */
export function Avatar({
  initials,
  size = 28,
  tone = "neutral",
}: {
  initials: string;
  size?: number;
  tone?: "accent" | "warm" | "cool" | "neutral";
}) {
  return (
    <span
      className={`midfi-avatar midfi-avatar--${tone}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initials}
    </span>
  );
}

/** Horizontal-stacked bar chart, animated growing in. */
export function BarChart({
  values,
  height = 72,
}: {
  values: number[];
  height?: number;
}) {
  return (
    <div className="midfi-chart" style={{ height }}>
      {values.map((v, i) => (
        <span
          key={i}
          className="midfi-chart-col"
          style={{ "--h": `${v}%`, "--d": `${i * 0.08}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}

/** Sparkline-style smooth line graph drawn with CSS only. */
export function Sparkline({
  points,
  height = 56,
}: {
  points: number[];
  height?: number;
}) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const w = 100;
  const stepX = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * stepX;
      const y = 100 - ((p - min) / range) * 100;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${d} L${w} 100 L0 100 Z`;
  return (
    <svg
      className="midfi-spark"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ height }}
    >
      <defs>
        <linearGradient id="midfi-spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="midfi-spark-area" d={area} fill="url(#midfi-spark-grad)" />
      <path
        className="midfi-spark-line"
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Big circular ring with percent fill — for utilization / progress. */
export function Ring({
  pct,
  label,
  size = 64,
}: {
  pct: number;
  label?: string;
  size?: number;
}) {
  return (
    <div
      className="midfi-ring"
      style={{ width: size, height: size, "--pct": pct } as CSSProperties}
    >
      <svg viewBox="0 0 36 36">
        <circle
          className="midfi-ring-track"
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
        />
        <circle
          className="midfi-ring-fill"
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          pathLength={100}
          transform="rotate(-90 18 18)"
        />
      </svg>
      {label ? <span className="midfi-ring-label">{label}</span> : null}
    </div>
  );
}

export function Thumb({
  aspect = "1 / 1",
  tone,
  glyph,
}: {
  aspect?: string;
  tone?: "warm" | "cool" | "neutral" | "accent";
  glyph?: ReactNode;
}) {
  return (
    <div
      className={`midfi-thumb midfi-thumb--${tone ?? "neutral"}`}
      style={{ aspectRatio: aspect }}
    >
      {glyph}
    </div>
  );
}

/** Signature animation: a cursor that travels between two waypoints and
 *  clicks at each end. Coordinates are percentages of the frame.
 *  Place this directly inside <MidFiShell> (any orientation). */
export function Cursor({
  from = [25, 70],
  to = [70, 30],
}: {
  from?: [number, number];
  to?: [number, number];
}) {
  const style = {
    "--cx1": `${from[0]}%`,
    "--cy1": `${from[1]}%`,
    "--cx2": `${to[0]}%`,
    "--cy2": `${to[1]}%`,
  } as CSSProperties;
  return (
    <>
      <div className="midfi-cursor-ripple-host" style={style}>
        <span className="midfi-cursor-ripple" />
      </div>
      <div className="midfi-cursor" style={style}>
        <svg viewBox="0 0 16 16">
          <path
            d="M3 2.5l10 4.5-4.2 1.5L6.8 12.5z"
            fill="#ffffff"
            stroke="#0a0c12"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}

/** Signature animation for mobile mockups: a touch ripple that taps at a
 *  fixed coordinate, then fades out. */
export function Touch({ at = [50, 50] }: { at?: [number, number] }) {
  return (
    <span
      className="midfi-touch"
      style={
        {
          "--tx": `${at[0]}%`,
          "--ty": `${at[1]}%`,
        } as CSSProperties
      }
    />
  );
}

/** Renders a tabular-numeric value with optional currency / percent
 *  formatting. (Originally drove a CSS-counter animation, but the
 *  @property pattern requires per-value keyframes — kept here as a
 *  display primitive so call-sites can stay declarative.) */
export function Counter({
  to,
  variant,
  className,
}: {
  to: number;
  variant?: "currency" | "pct";
  className?: string;
}) {
  const formatted =
    variant === "currency"
      ? `$${to.toLocaleString()}`
      : variant === "pct"
        ? `${to}%`
        : to.toLocaleString();
  return (
    <span className={`midfi-counter${className ? ` ${className}` : ""}`}>
      {formatted}
    </span>
  );
}

/** Single text-row list item with icon + 2 bars + optional trailing chip. */
export function ListRow({
  icon,
  primary,
  secondary,
  trailing,
}: {
  icon?: ReactNode;
  primary: ReactNode;
  secondary?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="midfi-list-row">
      {icon ? <span className="midfi-list-icon">{icon}</span> : null}
      <span className="midfi-list-text">
        <span className="midfi-list-primary">{primary}</span>
        {secondary ? (
          <span className="midfi-list-secondary">{secondary}</span>
        ) : null}
      </span>
      {trailing ? <span className="midfi-list-trail">{trailing}</span> : null}
    </div>
  );
}
