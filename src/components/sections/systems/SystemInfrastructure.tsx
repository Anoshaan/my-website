"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Systems — Section 2. Design systems as infrastructure. A layered stack
 * assembles on scroll, bottom to top: tokens → components → patterns →
 * product screens → product experience. A thin green line draws upward
 * through the stack as you scroll, showing decisions moving up from raw
 * tokens into lived experience. Scroll-scrubbed (the accepted in-control
 * pattern), flattened to a static assembled stack under reduced motion.
 */

type Layer = { label: string; sub: string };

// Rendered bottom → top.
const LAYERS: Layer[] = [
  { label: "Tokens", sub: "Color, type, space, motion" },
  { label: "Components", sub: "Accessible, versioned, documented" },
  { label: "Patterns", sub: "Reusable UI logic" },
  { label: "Product screens", sub: "Design-to-dev consistency" },
  { label: "Product experience", sub: "What the user actually feels" },
];

const TRAITS = [
  "Tokens",
  "Components",
  "Patterns",
  "Documentation",
  "Adoption",
  "Contribution",
  "Versioning",
];

function StackLayer({
  layer,
  index,
  total,
  progress,
  reduced,
}: {
  layer: Layer;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean | null;
}) {
  // Top layers settle last. Each layer animates within its own window.
  const order = total - 1 - index; // 0 = bottom (first), total-1 = top (last)
  const start = 0.08 + order * 0.14;
  const end = start + 0.26;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [reduced ? 0 : 46, 0]);

  return (
    <motion.div
      className={`sys-stack-layer sys-stack-layer--${index}`}
      style={reduced ? undefined : { opacity, y }}
    >
      <span className="sys-stack-label">{layer.label}</span>
      <span className="sys-stack-sub">{layer.sub}</span>
    </motion.div>
  );
}

export function SystemInfrastructure() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section className="section-pad sys-section border-t border-white/[0.06]">
      <Container>
        <div className="sys-split sys-split--wide">
          <div className="sys-split-copy">
            <Reveal>
              <span className="section-label sys-eyebrow">
                Design systems as infrastructure
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-section text-white heading-sheen sys-h2">
                Systems are not libraries. They are product infrastructure.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body text-white/60 sys-lead">
                A real design system encodes decisions and carries them upward,
                from a single token to the experience a user feels. It is
                versioned, documented, adopted, and contributed to like any
                other product.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="sys-trait-row">
                {TRAITS.map((t) => (
                  <span key={t} className="sys-trait">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div ref={ref} className="sys-split-visual sys-stack">
            <motion.span
              className="sys-stack-line"
              aria-hidden
              style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
            />
            <div className="sys-stack-inner">
              {LAYERS.map((layer, i) => (
                <StackLayer
                  key={layer.label}
                  layer={layer}
                  index={i}
                  total={LAYERS.length}
                  progress={scrollYProgress}
                  reduced={reduced}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
