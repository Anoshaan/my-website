"use client";

/**
 * SystemMap — a "living product system map" for the Systems hero. Small
 * labelled nodes (UX, UI, Code, Testing, Accessibility, AI, Design
 * Systems, Delivery) connected by fine lines that trace and breathe.
 * Pure SVG + CSS: edges carry a slow travelling dash so the map reads as
 * product infrastructure with signal moving through it, not random
 * particles. Nodes pulse gently and lift their neighbours on hover.
 *
 * Decorative — hidden from assistive tech, simplified to a static spread
 * under reduced motion (see systems.css). The viewBox is square so it
 * scales down to a compact cluster on small screens.
 */

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Emphasis tier — drives size + brightness. */
  tier: 1 | 2 | 3;
};

const NODES: Node[] = [
  { id: "core", label: "Product", x: 50, y: 50, tier: 1 },
  { id: "ux", label: "UX", x: 22, y: 26, tier: 2 },
  { id: "ui", label: "UI", x: 50, y: 16, tier: 2 },
  { id: "ds", label: "Design Systems", x: 80, y: 28, tier: 2 },
  { id: "code", label: "Code", x: 88, y: 58, tier: 2 },
  { id: "ai", label: "AI", x: 74, y: 82, tier: 3 },
  { id: "test", label: "Testing", x: 44, y: 86, tier: 3 },
  { id: "a11y", label: "Accessibility", x: 16, y: 70, tier: 3 },
  { id: "delivery", label: "Delivery", x: 12, y: 48, tier: 3 },
];

const EDGES: [string, string][] = [
  ["core", "ux"],
  ["core", "ui"],
  ["core", "ds"],
  ["core", "code"],
  ["core", "ai"],
  ["core", "test"],
  ["core", "a11y"],
  ["core", "delivery"],
  ["ux", "ui"],
  ["ui", "ds"],
  ["ds", "code"],
  ["code", "ai"],
  ["ai", "test"],
  ["test", "a11y"],
  ["a11y", "delivery"],
  ["delivery", "ux"],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function SystemMap() {
  return (
    <div className="sys-map" aria-hidden>
      <svg viewBox="0 0 100 100" className="sys-map-svg" role="presentation">
        <defs>
          <radialGradient id="sysNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(120,224,184,0.55)" />
            <stop offset="100%" stopColor="rgba(120,224,184,0)" />
          </radialGradient>
          <linearGradient id="sysEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(120,224,184,0.05)" />
            <stop offset="50%" stopColor="rgba(120,224,184,0.5)" />
            <stop offset="100%" stopColor="rgba(120,224,184,0.05)" />
          </linearGradient>
        </defs>

        {/* Edges — faint base line + a travelling traced segment. */}
        <g className="sys-map-edges">
          {EDGES.map(([a, b], i) => {
            const na = byId(a);
            const nb = byId(b);
            return (
              <g key={`${a}-${b}`}>
                <line
                  className="sys-edge-base"
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                />
                <line
                  className="sys-edge-trace"
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  style={{ animationDelay: `${(i % 6) * -1.3}s` }}
                />
              </g>
            );
          })}
        </g>

        {/* Nodes. */}
        <g className="sys-map-nodes">
          {NODES.map((n, i) => (
            <g
              key={n.id}
              className={`sys-node sys-node--t${n.tier} ${
                n.id === "core" ? "is-core" : ""
              }`}
              style={{ animationDelay: `${i * -0.9}s` }}
            >
              <circle className="sys-node-halo" cx={n.x} cy={n.y} r={n.tier === 1 ? 7 : 5} />
              <circle
                className="sys-node-dot"
                cx={n.x}
                cy={n.y}
                r={n.tier === 1 ? 2.6 : n.tier === 2 ? 1.7 : 1.3}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Node labels live in HTML for crisp type at any scale. */}
      <div className="sys-map-labels">
        {NODES.map((n) => (
          <span
            key={n.id}
            className={`sys-map-label sys-map-label--t${n.tier} ${
              n.id === "core" ? "is-core" : ""
            }`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.label}
          </span>
        ))}
      </div>
    </div>
  );
}
