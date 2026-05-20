"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion, useInView } from "motion/react";

type Stat = {
  value: string;
  label: string;
  countTo?: number;
  suffix?: string;
};

const stats: Stat[] = [
  { value: "8+", label: "Years Experience", countTo: 8, suffix: "+" },
  {
    value: "1200+",
    label: "Product Screens Designed",
    countTo: 1200,
    suffix: "+",
  },
  {
    value: "∞",
    label: "Enterprise UX • Systems Thinking • Motion",
  },
  { value: "AI", label: "AI-Driven Product Experiences" },
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
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center gap-3 py-8 px-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <span
                className={
                  s.countTo !== undefined ? "stat-number" : "stat-symbol accent-text"
                }
              >
                {s.countTo !== undefined ? (
                  <AnimatedNumber target={s.countTo} suffix={s.suffix} />
                ) : (
                  s.value
                )}
              </span>
              <span className="text-eyebrow text-white/55 max-w-[28ch]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
