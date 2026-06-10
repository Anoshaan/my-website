"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/Container";

/**
 * Section 4 — This Is How I Stay Ahead.
 *
 * A pinned, cinematic section: the header settles into the centre as the
 * previous section fades away, then three premium "floating object" cards
 * reveal one-by-one as the user keeps scrolling. Each card has subtle 3D
 * depth (mouse tilt + a slow float) and a bespoke inner animation that
 * reinforces its idea — exploration, control, motion.
 */

type CardData = {
  num: string;
  title: string;
  tag: string;
  body: string;
};

const CARDS: CardData[] = [
  {
    num: "01",
    title: "AI-Powered Exploration",
    tag: "From idea to first concept in minutes, not days.",
    body: "Using AI to rapidly explore ideas, wireframes, flows, and design directions frees up time to focus on solving meaningful problems.",
  },
  {
    num: "02",
    title: "Human-Guided Control",
    tag: "Speed means nothing without structure.",
    body: "AI accelerates exploration, but every decision stays intentional, scalable, and editable — controlled through professional design systems.",
  },
  {
    num: "03",
    title: "Motion-Driven Experiences",
    tag: "Interfaces should communicate, not just exist.",
    body: "Motion guides attention, provides feedback, improves understanding, and creates experiences that feel alive.",
  },
];

/* ---------------------------------------------------------------- */
/* Card-visual animations — bespoke SVG/CSS, one idea each.          */
/* ---------------------------------------------------------------- */

// 01 — Exploration: a seed branches into possibilities that pop in turn.
function VisualExplore() {
  const thumbs = [
    { x: 70, y: 12 },
    { x: 88, y: 30 },
    { x: 92, y: 54 },
    { x: 80, y: 74 },
    { x: 58, y: 80 },
  ];
  return (
    <svg viewBox="0 0 120 96" className="evx" aria-hidden>
      <g className="evx1-streaks">
        <line x1="6" y1="40" x2="34" y2="40" />
        <line x1="2" y1="52" x2="30" y2="52" />
        <line x1="10" y1="64" x2="32" y2="64" />
      </g>
      {thumbs.map((t, i) => (
        <line
          key={`l${i}`}
          className="evx1-line"
          x1="34"
          y1="48"
          x2={t.x + 8}
          y2={t.y + 6}
          style={{ animationDelay: `${i * 0.28}s` }}
        />
      ))}
      <circle className="evx1-seed" cx="34" cy="48" r="6" />
      {thumbs.map((t, i) => (
        <rect
          key={`t${i}`}
          className="evx1-thumb"
          x={t.x}
          y={t.y}
          width="16"
          height="12"
          rx="2.5"
          style={{ animationDelay: `${i * 0.28}s` }}
        />
      ))}
    </svg>
  );
}

// 02 — Control: alignment guides sweep in and a block snaps onto the grid.
function VisualControl() {
  const dots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) dots.push({ x: 18 + c * 21, y: 16 + r * 21 });
  return (
    <svg viewBox="0 0 120 96" className="evx" aria-hidden>
      <g className="evx2-dots">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.4" />
        ))}
      </g>
      <line className="evx2-guide-v" x1="60" y1="6" x2="60" y2="90" />
      <line className="evx2-guide-h" x1="8" y1="58" x2="112" y2="58" />
      <rect className="evx2-block" x="49" y="47" width="22" height="22" rx="3" />
      <g className="evx2-handle">
        <line x1="39" y1="37" x2="81" y2="37" />
        <circle cx="39" cy="37" r="2.6" />
        <circle cx="81" cy="37" r="2.6" />
      </g>
    </svg>
  );
}

// 03 — Motion: ripples of feedback, a flowing signal, a sliding control.
function VisualMotion() {
  return (
    <svg viewBox="0 0 120 96" className="evx" aria-hidden>
      <g className="evx3-ripple">
        <circle cx="34" cy="48" r="8" />
        <circle cx="34" cy="48" r="8" style={{ animationDelay: "1.1s" }} />
        <circle cx="34" cy="48" r="8" style={{ animationDelay: "2.2s" }} />
      </g>
      <circle className="evx3-core" cx="34" cy="48" r="5" />
      <path className="evx3-wave" d="M14 70 Q34 52 54 70 T94 70 T134 70" />
      <rect className="evx3-track" x="66" y="20" width="40" height="14" rx="7" />
      <circle className="evx3-knob" cx="75" cy="27" r="5" />
    </svg>
  );
}

const VISUALS = [<VisualExplore key="0" />, <VisualControl key="1" />, <VisualMotion key="2" />];

/* ---------------------------------------------------------------- */

function EvolveCard({
  i,
  data,
  visual,
  progress,
  animate,
}: {
  i: number;
  data: CardData;
  visual: ReactNode;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const start = 0.24 + i * 0.18;
  const end = start + 0.2;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [80, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  // Mouse tilt — gives each card the feel of a physical floating object.
  const rotX = useSpring(0, { stiffness: 120, damping: 14 });
  const rotY = useSpring(0, { stiffness: 120, damping: 14 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!animate) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotY.set(px * 16);
    rotX.set(-py * 16);
  };
  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const slotStyle = animate ? { opacity, y, scale } : { opacity: 1 };

  return (
    <motion.div className="evolve-card-slot" style={slotStyle}>
      <div
        className="evolve-card-float"
        style={{ animationDelay: `${i * 0.8}s` }}
      >
        <motion.article
          className="evolve-card"
          style={animate ? { rotateX: rotX, rotateY: rotY } : undefined}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <span className="evolve-card-glow" aria-hidden />
          <div className="evolve-card-visual">{visual}</div>
          <span className="evolve-card-num">{data.num}</span>
          <h3 className="evolve-card-title">{data.title}</h3>
          <p className="evolve-card-tag">{data.tag}</p>
          <p className="evolve-card-body">{data.body}</p>
        </motion.article>
      </div>
    </motion.div>
  );
}

export function Section4StayAhead() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isWide, setIsWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const animate = isWide && !reduced;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Header settles into the centre as the section emerges.
  const headOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.16], [54, 0]);
  const headScale = useTransform(scrollYProgress, [0, 0.16], [0.92, 1]);

  const headStyle = animate
    ? { opacity: headOpacity, y: headY, scale: headScale }
    : { opacity: 1 };

  return (
    <section
      ref={sectionRef}
      id="stay-ahead"
      className="evolve-section"
      style={{ minHeight: animate ? "320vh" : undefined }}
    >
      <div className="evolve-sticky">
        <div className="evolve-aura" aria-hidden />
        <Container size="wide" className="evolve-inner">
          <motion.header className="evolve-header" style={headStyle}>
            <p className="evolve-eyebrow">Design is evolving faster than ever</p>
            <h2 className="text-section evolve-title">This Is How I Stay Ahead</h2>
            <p className="text-body evolve-body">
              Modern product design is no longer just about creating screens. The
              combination of AI, design systems, and motion has fundamentally
              changed how products are imagined, built, and experienced.
            </p>
          </motion.header>

          <div className="evolve-cards">
            {CARDS.map((c, i) => (
              <EvolveCard
                key={c.num}
                i={i}
                data={c}
                visual={VISUALS[i]}
                progress={scrollYProgress}
                animate={animate}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
