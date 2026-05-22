import type { CSSProperties, ReactElement } from "react";
import { cn } from "@/lib/utils";

/**
 * AnimatedIcon — a single, unified icon language for the whole site.
 *
 * Every glyph is outlined / wireframe, drawn on a 48×48 grid with a
 * 1.5 stroke, and carries a subtle, semantic micro-animation driven
 * purely by CSS (see the "ANIMATED ICONS" block in globals.css).
 * No JS per frame, GPU-friendly transforms/opacity only, and the
 * global reduced-motion rule freezes them on a sensible static state.
 */
export type AnimatedIconName =
  | "brain"
  | "network"
  | "scan"
  | "flow"
  | "scale"
  | "radar"
  | "structure"
  | "vector"
  | "collaborate"
  | "motion";

const SVG = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/* Human creative thinking — neural cluster, signals flow inward, tips fire. */
function Brain() {
  const tips = [
    [24, 9.5],
    [11.5, 16],
    [37, 15],
    [10.5, 31],
    [38, 31],
    [23, 39],
  ];
  return (
    <svg {...SVG}>
      {tips.map(([x, y], i) => (
        <path
          key={`l${i}`}
          className="ai-dash"
          d={`M24 24L${x} ${y}`}
          style={delay(i * -0.37)}
        />
      ))}
      <circle cx="24" cy="24" r="3.4" fill="currentColor" stroke="none" />
      {tips.map(([x, y], i) => (
        <circle
          key={`t${i}`}
          className="ai-syn"
          cx={x}
          cy={y}
          r="2.5"
          style={delay(i * 0.34)}
        />
      ))}
    </svg>
  );
}

/* AI systems — nodes orbit a stable core on a rotating network. */
function Network() {
  const nodes = [
    [24, 9.5],
    [36.6, 31],
    [11.4, 31],
  ];
  return (
    <svg {...SVG}>
      <g className="ai-spin">
        <circle
          cx="24"
          cy="24"
          r="14"
          className="ai-ring"
          strokeDasharray="3 5"
        />
        {nodes.map(([x, y], i) => (
          <line key={`e${i}`} x1="24" y1="24" x2={x} y2={y} opacity="0.5" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle
            key={`n${i}`}
            cx={x}
            cy={y}
            r="3.3"
            fill="currentColor"
            stroke="none"
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="4.6" />
      <circle cx="24" cy="24" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Research — a grid of data points read by a sweeping scan line. */
function Scan() {
  const dots: number[][] = [];
  for (const y of [17, 24, 31]) for (const x of [17, 24, 31]) dots.push([x, y]);
  return (
    <svg {...SVG}>
      <rect x="9" y="9" width="30" height="30" rx="7" opacity="0.55" />
      {dots.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.7"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
      ))}
      <line className="ai-scan" x1="13" y1="14.5" x2="35" y2="14.5" />
    </svg>
  );
}

/* Delivery — chevrons stream steadily in one direction. */
function Flow() {
  return (
    <svg {...SVG}>
      <line
        x1="9"
        y1="34"
        x2="39"
        y2="34"
        opacity="0.38"
        strokeDasharray="2 4"
      />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${15 + i * 9} 21)`}>
          <path
            className="ai-flow"
            d="M-3.4 -6L3.4 0L-3.4 6"
            style={delay(i * 0.22)}
          />
        </g>
      ))}
    </svg>
  );
}

/* Scalability — a system scaling up, bar by bar. */
function Scale() {
  const bars = [
    { x: 9.5, h: 9 },
    { x: 18.5, h: 15 },
    { x: 27.5, h: 21 },
    { x: 36.5, h: 27 },
  ];
  return (
    <svg {...SVG}>
      <line x1="7.5" y1="38.6" x2="40.5" y2="38.6" opacity="0.4" />
      {bars.map((b, i) => (
        <rect
          key={i}
          className="ai-bar"
          x={b.x}
          y={38 - b.h}
          width="5"
          height={b.h}
          rx="1.7"
          style={delay(i * 0.22)}
        />
      ))}
    </svg>
  );
}

/* Discovery — a radar sweep surfacing a blip. */
function Radar() {
  return (
    <svg {...SVG}>
      <circle cx="24" cy="24" r="13.5" opacity="0.5" />
      <circle cx="24" cy="24" r="7" opacity="0.5" />
      <circle cx="24" cy="24" r="1.9" fill="currentColor" stroke="none" />
      <g className="ai-sweep">
        <path
          d="M24 24L24 10.5A13.5 13.5 0 0 1 35.7 17.3Z"
          fill="currentColor"
          stroke="none"
          opacity="0.14"
        />
        <line x1="24" y1="24" x2="24" y2="10.5" />
      </g>
      <circle
        className="ai-blip"
        cx="32"
        cy="17.5"
        r="2.2"
        fill="currentColor"
        stroke="none"
        style={delay(0.6)}
      />
    </svg>
  );
}

/* Structure — layered architecture settling into place. */
function Structure() {
  const layers: [string, number, number][] = [
    ["12,14 24,9.5 36,14 24,18.5", 1, 0],
    ["12,24 24,19.5 36,24 24,28.5", 0.78, 0.4],
    ["12,34 24,29.5 36,34 24,38.5", 0.58, 0.8],
  ];
  return (
    <svg {...SVG}>
      {layers.map(([points, opacity, d], i) => (
        <polygon
          key={i}
          className="ai-layer"
          points={points}
          opacity={opacity}
          style={delay(d)}
        />
      ))}
    </svg>
  );
}

/* Design — a bezier path with live anchor points. */
function Vector() {
  return (
    <svg {...SVG}>
      <line
        x1="13"
        y1="33"
        x2="13"
        y2="20"
        opacity="0.5"
        strokeDasharray="1.5 3"
      />
      <line
        x1="35"
        y1="15"
        x2="35"
        y2="28"
        opacity="0.5"
        strokeDasharray="1.5 3"
      />
      <circle cx="13" cy="20" r="2" />
      <circle cx="35" cy="28" r="2" />
      <path className="ai-dash" d="M13 33C13 20 35 28 35 15" />
      <rect
        className="ai-anchor"
        x="10.4"
        y="30.4"
        width="5.2"
        height="5.2"
        rx="1"
      />
      <rect
        className="ai-anchor"
        x="32.4"
        y="12.4"
        width="5.2"
        height="5.2"
        rx="1"
        style={delay(0.7)}
      />
    </svg>
  );
}

/* Collaboration — linked contributors pulsing in concert. */
function Collaborate() {
  const nodes = [
    [24, 12],
    [12, 34],
    [36, 34],
  ];
  return (
    <svg {...SVG}>
      <path className="ai-dash" d="M24 12L12 34" />
      <path className="ai-dash" d="M12 34L36 34" style={delay(-0.5)} />
      <path className="ai-dash" d="M36 34L24 12" style={delay(-1)} />
      {nodes.map(([x, y], i) => (
        <circle
          key={`n${i}`}
          className="ai-node"
          cx={x}
          cy={y}
          r="4.4"
          style={delay(i * 0.36)}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={`d${i}`}
          cx={x}
          cy={y}
          r="1.5"
          fill="currentColor"
          stroke="none"
        />
      ))}
    </svg>
  );
}

/* Motion & interaction — a small figure mid-stride. */
function Motion() {
  return (
    <svg {...SVG}>
      <line
        x1="10.5"
        y1="39"
        x2="37.5"
        y2="39"
        opacity="0.3"
        strokeDasharray="2.5 4"
      />
      <g className="ai-walk">
        <circle cx="24" cy="12.5" r="3.5" />
        <line x1="24" y1="16" x2="24" y2="27.5" />
        <line className="ai-arm ai-arm-a" x1="24" y1="18.5" x2="24" y2="26" />
        <line className="ai-arm ai-arm-b" x1="24" y1="18.5" x2="24" y2="26" />
        <line className="ai-leg ai-leg-a" x1="24" y1="27.5" x2="24" y2="37.5" />
        <line className="ai-leg ai-leg-b" x1="24" y1="27.5" x2="24" y2="37.5" />
      </g>
    </svg>
  );
}

const GLYPHS: Record<AnimatedIconName, () => ReactElement> = {
  brain: Brain,
  network: Network,
  scan: Scan,
  flow: Flow,
  scale: Scale,
  radar: Radar,
  structure: Structure,
  vector: Vector,
  collaborate: Collaborate,
  motion: Motion,
};

/* Subtle per-icon tints — pale, desaturated, cool-leaning so the
   set reads as one futuristic family rather than a rainbow. */
const TONES: Record<AnimatedIconName, string> = {
  brain: "#cdd1ec",
  network: "#bcc9f2",
  scan: "#bcd9e4",
  flow: "#bce0d2",
  scale: "#ccc2ea",
  radar: "#bcd4ea",
  structure: "#c4caea",
  vector: "#ecd0bc",
  collaborate: "#c0cae8",
  motion: "#d6c8e6",
};

type AnimatedIconProps = {
  name: AnimatedIconName;
  /** Tile size preset. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function AnimatedIcon({
  name,
  size = "sm",
  className,
}: AnimatedIconProps) {
  const Glyph = GLYPHS[name];
  return (
    <span
      className={cn(
        "anim-icon",
        size === "md" && "anim-icon-md",
        size === "lg" && "anim-icon-lg",
        className
      )}
      data-icon={name}
      style={{ "--icon-tone": TONES[name] } as CSSProperties}
      aria-hidden
    >
      <Glyph />
    </span>
  );
}
