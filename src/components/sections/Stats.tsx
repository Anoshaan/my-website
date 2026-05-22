"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion, useInView } from "motion/react";

type Stat =
  | { kind: "count"; countTo: number; suffix: string; label: string }
  | { kind: "symbol"; value: string; label: string }
  | { kind: "text"; value: string; label: string };

const stats: Stat[] = [
  {
    kind: "count",
    countTo: 8,
    suffix: "+",
    label: "Years crafting digital experiences",
  },
  {
    kind: "count",
    countTo: 120,
    suffix: "+",
    label: "Products, platforms & UX systems delivered",
  },
  {
    kind: "symbol",
    value: "AI",
    label: "AI-driven product experiences",
  },
  {
    kind: "text",
    value: "Enterprise UX Systems",
    label: "Design thinking that evolves with user behavior",
  },
];

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // No once: true — re-triggers every time it enters viewport
  const inView = useInView(ref, { amount: 0.3, margin: "0px 0px -5% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }
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
  }, [inView, target]);

  return (
    <span ref={ref}>
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2, margin: "0px 0px -5% 0px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center justify-center text-center gap-4 py-9 px-5 rounded-2xl border border-white/[0.08] bg-[rgba(20,20,25,0.9)] backdrop-blur-xl hover:border-white/[0.18] hover:bg-[rgba(24,24,30,0.92)] transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <div className="flex items-center justify-center min-h-[clamp(3.25rem,6vw,5rem)]">
                {s.kind === "count" ? (
                  <span className="stat-number">
                    <AnimatedNumber target={s.countTo} suffix={s.suffix} />
                  </span>
                ) : s.kind === "symbol" ? (
                  <span className="stat-symbol accent-text">{s.value}</span>
                ) : (
                  <span className="stat-text accent-text">{s.value}</span>
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
