"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * About — Section 3. Systems outside the screen. Three controlled research
 * projects, each shown as a crafted, animated system object rather than a
 * stock photo. Framed professionally as learning and research, and tied
 * back to the way they trained a systems mindset: inputs, state, feedback
 * loops, constraints, and user control.
 */

type Obj = {
  title: string;
  body: string;
  tags: string[];
  visual: (reduced: boolean | null) => ReactNode;
};

function RFVisual() {
  return (
    <svg viewBox="0 0 200 120" className="ab-obj-svg ab-obj-svg--rf" aria-hidden>
      {/* Signal module. */}
      <rect className="ab-rf-board" x="74" y="44" width="52" height="40" rx="5" />
      <circle className="ab-rf-chip" cx="100" cy="64" r="6" />
      <line className="ab-rf-pin" x1="74" y1="54" x2="64" y2="54" />
      <line className="ab-rf-pin" x1="74" y1="74" x2="64" y2="74" />
      <line className="ab-rf-pin" x1="126" y1="54" x2="136" y2="54" />
      <line className="ab-rf-pin" x1="126" y1="74" x2="136" y2="74" />
      {/* Emanating signal waves. */}
      <circle className="ab-rf-wave" cx="100" cy="64" r="20" />
      <circle className="ab-rf-wave" cx="100" cy="64" r="20" style={{ animationDelay: "1.3s" }} />
      <circle className="ab-rf-wave" cx="100" cy="64" r="20" style={{ animationDelay: "2.6s" }} />
      {/* Frequency trace. */}
      <path className="ab-rf-freq" d="M10 30 Q 18 18 26 30 T 42 30 T 58 30" fill="none" />
    </svg>
  );
}

function WifiVisual({ reduced }: { reduced: boolean | null }) {
  const nodes = [
    [40, 40],
    [160, 32],
    [104, 70],
    [54, 96],
    [150, 92],
  ];
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
  ];
  return (
    <svg viewBox="0 0 200 120" className="ab-obj-svg ab-obj-svg--wifi" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          className="ab-wf-edge"
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
        />
      ))}
      {!reduced &&
        edges.map(([a, b], i) => (
          <circle key={`p${i}`} className="ab-wf-packet" r="2.6">
            <animate
              attributeName="cx"
              values={`${nodes[a][0]};${nodes[b][0]}`}
              dur="2.4s"
              repeatCount="indefinite"
              begin={`${i * 0.6}s`}
            />
            <animate
              attributeName="cy"
              values={`${nodes[a][1]};${nodes[b][1]}`}
              dur="2.4s"
              repeatCount="indefinite"
              begin={`${i * 0.6}s`}
            />
          </circle>
        ))}
      {nodes.map(([x, y], i) => (
        <circle key={`n${i}`} className={`ab-wf-node ${i === 2 ? "is-hub" : ""}`} cx={x} cy={y} r={i === 2 ? 6 : 4} />
      ))}
      <text className="ab-wf-tag" x="100" y="115" textAnchor="middle">
        sandbox
      </text>
    </svg>
  );
}

function AeroVisual() {
  return (
    <svg viewBox="0 0 200 120" className="ab-obj-svg ab-obj-svg--aero" aria-hidden>
      {/* Tower. */}
      <path className="ab-ae-tower" d="M70 18 L86 18 L82 104 L74 104 Z" />
      {/* Sensor nodes. */}
      <circle className="ab-ae-sensor" cx="78" cy="34" r="3" />
      <circle className="ab-ae-sensor" cx="78" cy="56" r="3" style={{ animationDelay: "0.6s" }} />
      <circle className="ab-ae-sensor" cx="78" cy="78" r="3" style={{ animationDelay: "1.2s" }} />
      {/* Water flow line. */}
      <line className="ab-ae-flow" x1="78" y1="20" x2="78" y2="102" />
      {/* Phone UI panel. */}
      <rect className="ab-ae-phone" x="122" y="30" width="40" height="66" rx="7" />
      <line className="ab-ae-phone-bar" x1="130" y1="42" x2="154" y2="42" />
      <rect className="ab-ae-phone-stat" x="130" y="50" width="24" height="14" rx="3" />
      <path className="ab-ae-phone-chart" d="M130 84 L138 78 L146 82 L154 72" fill="none" />
      {/* Readouts. */}
      <text className="ab-ae-read" x="100" y="40" textAnchor="middle">24°</text>
      <text className="ab-ae-read" x="100" y="60" textAnchor="middle">68%</text>
    </svg>
  );
}

const OBJECTS: Obj[] = [
  {
    title: "Signals & RF Exploration",
    body: "A hands-on study of how radio signals travel, fade, and respond to their surroundings. Reading those invisible inputs and responses is the same instinct I bring to designing feedback and state.",
    tags: ["Signal Behavior", "Inputs & Response", "Experimentation"],
    visual: () => <RFVisual />,
  },
  {
    title: "Connected Systems Research",
    body: "A controlled, sandboxed look at how connected devices talk to each other: how messages move, stay in sync, and recover when something breaks. It sharpened how I think about flow, edge cases, and reliability.",
    tags: ["Protocol Behavior", "Edge Cases", "Reliability"],
    visual: (reduced) => <WifiVisual reduced={reduced} />,
  },
  {
    title: "Smart Aeroponic Tower",
    body: "A self-built smart growing system using sensors, automation logic, and environmental controls, with a mobile app to monitor and control plant growth end to end.",
    tags: ["IoT Sensors", "Automation Logic", "Mobile Control"],
    visual: () => <AeroVisual />,
  },
];

const MINDSET = ["Inputs", "State", "Feedback loops", "Constraints", "System response", "User control"];

export function SystemsOffScreen() {
  const reduced = useReducedMotion();
  return (
    <section className="section-pad ab-section border-t border-white/[0.06]">
      <Container>
        <Reveal>
          <h2 className="text-section text-white heading-sheen ab-h2-mt">
            Curiosity that runs deeper than interfaces.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-body text-white/60 ab-lead ab-lead--wide">
            Outside product work, I explore systems that involve signals,
            feedback loops, sensors, and connected hardware. These projects
            sharpen how I think about inputs, constraints, state, and response.
          </p>
        </Reveal>

        <div className="ab-obj-grid">
          {OBJECTS.map((o, i) => (
            <ScrollReveal key={o.title} delay={i * 0.1} className="ab-obj">
              <div className="ab-obj-visual">{o.visual(reduced)}</div>
              <h3 className="ab-obj-title">{o.title}</h3>
              <p className="ab-obj-body">{o.body}</p>
              <div className="ab-obj-tags">
                {o.tags.map((t) => (
                  <span key={t} className="ab-obj-tag">
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="ab-mindset">
            <span className="ab-mindset-label">They trained me to think in</span>
            <div className="ab-mindset-chips">
              {MINDSET.map((m) => (
                <span key={m} className="ab-mindset-chip">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
