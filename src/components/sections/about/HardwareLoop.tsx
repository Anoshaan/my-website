"use client";

import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About — Section 4. Hardware-aware thinking. One continuous loop instead
 * of four separate cards: a user action triggers a response, a sensor
 * sends data, the software layer reacts, the interface updates, and the
 * loop returns to the physical system. The traveling pulse runs only when
 * motion is allowed.
 */

const POINTS = [
  { label: "Action", x: 110, y: 18 },
  { label: "Sensor", x: 202, y: 110 },
  { label: "Software", x: 110, y: 202 },
  { label: "Interface", x: 18, y: 110 },
];

// A circle the pulse travels (clockwise).
const LOOP = "M110 18 A 92 92 0 1 1 109.9 18";

const FACETS = [
  { title: "Connected devices", body: "Microcontrollers, sensors, and the small protocols that link them." },
  { title: "Automation logic", body: "Feedback loops and rules that keep a physical system in balance." },
  { title: "Sensors & telemetry", body: "Reading the real world cleanly, then turning it into a usable stream." },
  { title: "End-to-end systems", body: "Hardware, firmware, software, and interface designed as one thing." },
];

export function HardwareLoop() {
  const reduced = useReducedMotion();

  return (
    <section className="section-pad ab-section border-t border-white/[0.06]">
      <Container>
        <div className="ab-split ab-split--loop">
          <div className="ab-split-copy">
            <Reveal>
              <h2 className="text-section text-white heading-sheen">
                My work doesn&apos;t end at the screen.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 ab-lead">
                I think about systems through inputs, state, feedback, and
                response, the same loop whether it runs in software or across a
                physical device.
              </p>
            </Reveal>
            <div className="ab-facets">
              {FACETS.map((f, i) => (
                <Reveal key={f.title} delay={0.2 + i * 0.06} className="ab-facet">
                  <span className="ab-facet-dot" aria-hidden />
                  <div>
                    <h3 className="ab-facet-title">{f.title}</h3>
                    <p className="ab-facet-body">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="fade" duration={1} delay={0.1} className="ab-loop">
            <svg viewBox="0 0 220 220" className="ab-loop-svg" aria-hidden>
              <circle className="ab-loop-ring" cx="110" cy="110" r="92" fill="none" />
              <path id="abLoopPath" className="ab-loop-active" d={LOOP} fill="none" />

              {POINTS.map((p, i) => (
                <g key={p.label} className="ab-loop-node" style={{ animationDelay: `${i * 1.2}s` }}>
                  <circle className="ab-loop-node-halo" cx={p.x} cy={p.y} r="16" />
                  <circle className="ab-loop-node-dot" cx={p.x} cy={p.y} r="6" />
                  <text
                    className="ab-loop-label"
                    x={p.x}
                    y={p.y + (p.y < 110 ? -16 : p.y > 110 ? 26 : 4)}
                    textAnchor="middle"
                  >
                    {p.label}
                  </text>
                </g>
              ))}

              <text className="ab-loop-center" x="110" y="106" textAnchor="middle">
                One
              </text>
              <text className="ab-loop-center ab-loop-center--sm" x="110" y="124" textAnchor="middle">
                system
              </text>

              {!reduced && (
                <circle className="ab-loop-pulse" r="4.5">
                  <animateMotion dur="5s" repeatCount="indefinite">
                    <mpath href="#abLoopPath" />
                  </animateMotion>
                </circle>
              )}
            </svg>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
