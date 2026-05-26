"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "motion/react";
import { GlowBorder } from "@/components/animations/GlowBorder";

type Stat =
  | { kind: "count"; countTo: number; suffix: string; label: string }
  | { kind: "symbol"; value: string; label: string }
  | { kind: "infinity"; label: string };

const stats: Stat[] = [
  {
    kind: "count",
    countTo: 8,
    suffix: "+",
    label: "Years crafting digital experiences",
  },
  {
    kind: "count",
    countTo: 200,
    suffix: "+",
    label: "Products, platforms & UX systems delivered",
  },
  {
    kind: "symbol",
    value: "AI",
    label: "AI-driven product experiences",
  },
  {
    kind: "infinity",
    label: "Design thinking that evolves with user behavior",
  },
];

/** A lemniscate with a bright "comet" segment orbiting a faint track. */
function InfinityMark() {
  const d =
    "M50 25 C50 8 22 8 22 25 C22 42 50 42 50 25 C50 8 78 8 78 25 C78 42 50 42 50 25 Z";
  return (
    <svg
      className="infinity-mark"
      viewBox="0 0 100 50"
      fill="none"
      role="img"
      aria-label="Continuously evolving"
    >
      <path
        className="infinity-track"
        d={d}
        pathLength={360}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="infinity-comet"
        d={d}
        pathLength={360}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  // Count-up runs on mount. Previously gated on `useInView` so it
  // started when the card scrolled into view, but Lenis × motion v11
  // can fail to deliver the IntersectionObserver entry, leaving the
  // number stuck at 0.
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="section-pad border-y border-white/[0.06]">
      <Container>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="stat-card relative flex flex-col items-center justify-center text-center gap-4 py-9 px-5 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card)] hover:border-[var(--color-card-border-hover)] hover:bg-[var(--color-card-hover)] transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <GlowBorder />
              <div className="flex items-center justify-center min-h-[clamp(3.25rem,6vw,5rem)]">
                {s.kind === "count" ? (
                  <span className="stat-number">
                    <AnimatedNumber target={s.countTo} suffix={s.suffix} />
                  </span>
                ) : s.kind === "symbol" ? (
                  <span className="stat-symbol accent-text">{s.value}</span>
                ) : (
                  <InfinityMark />
                )}
              </div>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
