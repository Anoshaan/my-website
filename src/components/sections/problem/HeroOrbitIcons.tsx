"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * HeroOrbitIcons — the tool/brand logos that orbit the rising Figma
 * workspace in Section 2. It is rendered INSIDE the same `.problem-figma`
 * motion layer as the card, so it inherits the card's scroll-driven
 * transform (rise → centre → park-left → scale-down). That keeps the
 * whole composition — particles, card, icons — moving as one connected
 * system: when the UI slides left and shrinks, the icons go with it.
 *
 * The icons live in a fixed 1100×680 design box (the same size as the
 * workspace) so their positions lock to the card edges at any viewport.
 * They sit BEHIND the card in the DOM, so at rest they emerge from behind
 * it: as the group scales out from the centre they spread past the edges
 * and ring the UI, then a slow per-icon float/rotate keeps them alive
 * without ever drifting far — a soft, magnetic planetarium.
 *
 * Scroll-linked group transform (opacity + emerge-scale) is driven by the
 * shared section progress; the continuous float is pure CSS so it stays
 * GPU-cheap and is trivially disabled for reduced motion.
 */

type Props = {
  /** Section scroll progress (0→1), shared with the card + particles. */
  progress: MotionValue<number>;
  reduced?: boolean | null;
};

type Orbit = {
  src: string;
  /** Offset from card centre in design px (1100×680 space). */
  x: number;
  y: number;
  /** Tile size in design px. */
  s: number;
  /** Float cycle duration (s) and negative start delay for desync. */
  dur: number;
  delay: number;
  /** Float rotation direction. */
  ccw?: boolean;
};

const BASE = "/assets/icons/hero-orbit";

/**
 * Layout rings the card perimeter. The first entries are the most
 * "anchor" positions; responsive tiers hide the trailing ones (see CSS
 * `[data-tier]` rules), so order = priority.
 */
const ICONS: Orbit[] = [
  { src: `${BASE}/after-effects.png`, x: -560, y: -300, s: 74, dur: 11, delay: -1.5 },
  { src: `${BASE}/gsap.png`, x: 560, y: -288, s: 70, dur: 12.5, delay: -4, ccw: true },
  { src: `${BASE}/lottiefiles.png`, x: -676, y: 36, s: 66, dur: 13.5, delay: -2.5, ccw: true },
  { src: `${BASE}/logo-5.png`, x: 678, y: 18, s: 72, dur: 10.5, delay: -6 },
  { src: `${BASE}/logo-3.png`, x: -470, y: 376, s: 64, dur: 12, delay: -3.5 },
  { src: `${BASE}/logo-6.png`, x: 472, y: 372, s: 68, dur: 14, delay: -5, ccw: true },
  { src: `${BASE}/logo-0.png`, x: -226, y: -408, s: 60, dur: 13, delay: -2 },
  { src: `${BASE}/logo-1.png`, x: 250, y: -406, s: 62, dur: 11.5, delay: -7, ccw: true },
  { src: `${BASE}/logo-7.png`, x: 648, y: 286, s: 58, dur: 12.8, delay: -1, ccw: true },
  { src: `${BASE}/logo-2.png`, x: -150, y: 430, s: 56, dur: 14.5, delay: -8 },
  { src: `${BASE}/logo-4.png`, x: 176, y: 432, s: 58, dur: 13.8, delay: -4.5, ccw: true },
];

export function HeroOrbitIcons({ progress, reduced }: Props) {
  // Group emerge — fades in and spreads out from centre as the card nears
  // the middle of the frame, then eases slightly back as the scene parks.
  // (Hooks are called unconditionally; ignored on the reduced path.)
  const opacity = useTransform(progress, [0.34, 0.5, 0.7, 0.86], [0, 1, 1, 0.9]);
  const scale = useTransform(progress, [0.34, 0.56], [0.4, 1]);

  const style = reduced
    ? { opacity: 1 }
    : { opacity, scale };

  return (
    <motion.div
      className="problem-orbit"
      data-reduced={reduced ? "true" : undefined}
      style={style}
      aria-hidden
    >
      {ICONS.map((ic, i) => (
        <span
          key={ic.src}
          className={`orbit-icon${ic.ccw ? " is-ccw" : ""}`}
          style={
            {
              ["--x"]: ic.x,
              ["--y"]: ic.y,
              ["--s"]: ic.s,
              ["--fd"]: `${ic.dur}s`,
              ["--dl"]: `${ic.delay}s`,
              ["--i"]: i,
            } as React.CSSProperties
          }
        >
          <span className="orbit-icon-float">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="orbit-icon-img" src={ic.src} alt="" draggable={false} />
          </span>
        </span>
      ))}
    </motion.div>
  );
}
