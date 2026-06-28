"use client";
import React from "react";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  /** How close (px) to an edge before the border lights up. */
  edgeSensitivity?: number;
  /** HSL color tuple as space-separated string, e.g. "220 80 70". */
  glowColor?: string;
  /** Card background color. */
  backgroundColor?: string;
  /** Card border radius in px. */
  borderRadius?: number;
  /** Glow blur radius. */
  glowRadius?: number;
  /** Glow intensity 0-1. */
  glowIntensity?: number;
  /** Glow cone angular spread (deg). */
  coneSpread?: number;
  /** Auto-rotate gradient mesh. */
  animated?: boolean;
  /** Mesh fill opacity 0-1. */
  fillOpacity?: number;
  /** Mesh gradient colors. */
  colors?: string[];
  /** Lift on hover. */
  lift?: boolean;
  style?: CSSProperties;
};

/**
 * BorderGlow — pointer-tracking glow card.
 * - Mesh gradient backdrop revealed inside the card
 * - Border edge brightens near the cursor (edgeSensitivity)
 * - Glow cone follows the pointer
 */
export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 35,
  glowColor = "220 80 70",
  backgroundColor = "#0f1115",
  borderRadius = 28,
  glowRadius = 52,
  glowIntensity = 0.65,
  coneSpread = 22,
  animated = false,
  fillOpacity = 0.18,
  colors = ["#8b5cf6", "#ec4899", "#38bdf8"],
  lift = true,
  style,
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const edge = useMotionValue(0);

  const smoothX = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.4 });
  const smoothY = useSpring(my, { stiffness: 220, damping: 28, mass: 0.4 });
  const smoothEdge = useSpring(edge, { stiffness: 200, damping: 24 });

  const glowBg = useTransform(
    [smoothX, smoothY] as never,
    ([x, y]: number[]) =>
      `radial-gradient(${glowRadius}% ${glowRadius}% at ${x}% ${y}%, hsla(${glowColor} / ${glowIntensity}) 0%, hsla(${glowColor} / 0) 70%)`
  );

  const borderOpacity = useTransform(smoothEdge, [0, 1], [0.12, 0.85]);
  const borderGradient = useTransform(
    [smoothX, smoothY] as never,
    ([x, y]: number[]) =>
      `radial-gradient(${coneSpread * 6}% ${coneSpread * 6}% at ${x}% ${y}%, hsla(${glowColor} / 1) 0%, hsla(${glowColor} / 0) 60%)`
  );

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mx.set(x);
      my.set(y);

      // edge sensitivity: distance from any edge in px
      const dxLeft = e.clientX - rect.left;
      const dxRight = rect.right - e.clientX;
      const dyTop = e.clientY - rect.top;
      const dyBottom = rect.bottom - e.clientY;
      const minEdgeDist = Math.min(dxLeft, dxRight, dyTop, dyBottom);
      const edgeFactor = Math.max(
        0,
        Math.min(1, 1 - minEdgeDist / edgeSensitivity)
      );
      edge.set(edgeFactor);
    },
    [mx, my, edge, edgeSensitivity]
  );

  const handleLeave = useCallback(() => {
    setHovered(false);
    edge.set(0);
  }, [edge]);

  // mesh fill — three-color soft mesh, optionally animated
  useEffect(() => {
    if (!animated) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.0025;
      mx.set(50 + Math.cos(t) * 30);
      my.set(50 + Math.sin(t * 1.3) * 30);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animated, mx, my]);

  const meshStyle: CSSProperties = {
    background: `
      radial-gradient(60% 60% at 20% 20%, ${colors[0]}${alphaHex(fillOpacity)} 0%, transparent 60%),
      radial-gradient(60% 60% at 80% 20%, ${colors[1]}${alphaHex(fillOpacity)} 0%, transparent 60%),
      radial-gradient(60% 60% at 50% 80%, ${colors[2]}${alphaHex(fillOpacity * 0.8)} 0%, transparent 60%)
    `,
  };

  return (
    <motion.div
      ref={ref}
      className={`relative isolate ${className}`}
      style={{
        borderRadius,
        backgroundColor,
        ...style,
      }}
      onPointerMove={handleMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handleLeave}
      animate={
        lift
          ? { y: hovered ? -4 : 0 }
          : undefined
      }
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Mesh backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
        style={{ borderRadius, ...meshStyle }}
      />

      {/* Cursor-tracking glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
        style={{
          borderRadius,
          background: glowBg,
          opacity: hovered ? 1 : 0.45,
          transition: "opacity 250ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Edge-aware border */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius,
          padding: 1,
          background: borderGradient,
          opacity: borderOpacity,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Static subtle outline (always visible) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function alphaHex(alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  const hex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");
  return hex;
}
