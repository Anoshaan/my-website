"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";

/**
 * HeroParticles — a soft cloud of glowing particles drifting slowly near the
 * bottom of the Hero. They move organically (gentle multi-axis bobbing around
 * a home position). As the user scrolls down, they smoothly scatter and begin 
 * orbiting, joining the motion language of the Figma particles in the next section.
 */

type P = {
  hx: number; // home x (0..1 of width)
  hy: number; // home y, fraction UP from the bottom of the CANVAS
  ax1: number;
  ax2: number;
  fx1: number;
  fx2: number;
  px1: number;
  px2: number;
  ay: number;
  fy: number;
  py: number;
  ci: number; // colour index
  sz: number; // size factor
  // Orbit props for when they scatter
  oA: number; // orbit angle
  oR: number; // orbit radius factor
  oS: number; // orbit speed
  oB: number; // orbit bob
  // Scatter properties for individual smooth movement
  sDelay: number; // scroll start delay
  sDur: number;   // scroll duration
  sAmt: number;   // how much to transition to the scattered state (0 = stay, 1 = full orbit)
};

const DARK: [number, number, number][] = [
  [207, 217, 255],
  [255, 255, 255],
  [150, 170, 255],
];
const LIGHT: [number, number, number][] = [
  [90, 82, 224],
  [79, 95, 230],
  [120, 110, 200],
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function HeroParticles({ reduced, progress }: { reduced?: boolean | null; progress?: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const small = window.matchMedia("(max-width: 600px)").matches;
    const N = small ? 22 : 40;

    let W = 0;
    let H = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // The canvas is 200vh tall (from -50vh to 150vh). The hero section is the middle 100vh.
    // So the bottom of the hero section is at yf = 0.25 of the canvas.
    const parts: P[] = Array.from({ length: N }, (_, i) => ({
      hx: Math.random(),
      hy: rand(0.25, 0.32), // Sit nicely near the bottom of the hero section
      ax1: rand(0.015, 0.05),
      ax2: rand(0.006, 0.02),
      fx1: rand(0.1, 0.24),
      fx2: rand(0.3, 0.55),
      px1: rand(0, Math.PI * 2),
      px2: rand(0, Math.PI * 2),
      ay: rand(0.01, 0.03),
      fy: rand(0.08, 0.2),
      py: rand(0, Math.PI * 2),
      ci: i % 3,
      sz: rand(1, 2),
      oA: rand(0, Math.PI * 2),
      oR: rand(0.4, 1.5), // Much wider radius so they go left, right, and bottom
      oS: rand(0.03, 0.08) * (Math.random() < 0.5 ? 1 : -1),
      oB: rand(0, Math.PI * 2),
      sDelay: rand(0, 0.4),   // Individual delays so they don't move together
      sDur: rand(0.4, 0.8),   // Different transition speeds
      sAmt: Math.random() < 0.2 ? rand(0, 0.2) : rand(0.5, 1), // 20% stay near top, others scatter down
    }));

    const draw = (t: number) => {
      const theme = document.documentElement.getAttribute("data-theme");
      const light = theme === "light";
      const pal = light ? LIGHT : DARK;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";

      const pScroll = progress ? clamp(progress.get(), 0, 1) : 0;

      // Orbit center: shifted down so that it orbits exactly where the Figma mockup is.
      // (H is 200vh, top is -50vh. cy = H * 0.75 puts it at 100vh down, plus 60vh translation = 160vh, which is the middle of the next section).
      const cx = W / 2;
      const cy = H * 0.75; 

      for (let i = 0; i < N; i++) {
        const p = parts[i];

        // Calculate individual smooth progress for this particle
        const rawP = clamp((pScroll - p.sDelay) / p.sDur, 0, 1);
        const smoothP = rawP * rawP * (3 - 2 * rawP);
        // How much this specific particle should scatter
        const scatter = smoothP * p.sAmt;

        // 1) Home positions (band)
        const driftX = reduced ? 0 : (Math.sin(t * p.fx1 + p.px1) * p.ax1 + Math.sin(t * p.fx2 + p.px2) * p.ax2) * W;
        const hX = p.hx * W + driftX;
        const driftY = reduced ? 0 : Math.sin(t * p.fy + p.py) * p.ay;
        const hY = H - (p.hy + driftY) * H;

        // 2) Orbit positions (scattered)
        const a = p.oA + t * p.oS;
        const rx = W * 0.45 * p.oR;
        const ry = H * 0.25 * p.oR;
        const orbX = cx + Math.cos(a) * rx;
        const orbY = cy + Math.sin(a) * ry + Math.sin(t * 0.5 + p.oB) * 20;

        // 3) Interpolate
        const x = lerp(hX, orbX, scatter);
        const y = lerp(hY, orbY, scatter);

        // Alpha logic
        // Only fade top edge if they are in the home band. Once scattering, no fade.
        const topFade = 1 - clamp(((H - hY)/H - 0.32) / 0.1, 0, 1) * 0.7;
        const effectiveTopFade = lerp(topFade, 1, scatter);
        
        const shimmer = reduced ? 1 : 0.72 + 0.28 * Math.sin(t * 0.7 + p.py * 2);
        const alpha = effectiveTopFade * shimmer * (light ? 0.5 : 0.62);
        if (alpha <= 0.01) continue;

        const [r, g, b] = pal[p.ci];
        const size = p.sz * (small ? 1.15 : 1.45);
        const base = `${r},${g},${b}`;

        ctx.fillStyle = `rgba(${base},${alpha * (light ? 0.16 : 0.22)})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 2.4, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = `rgba(${base},${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = `rgba(${base},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduced) {
      const render = () => draw(0);
      const unsub = progress ? progress.on("change", render) : () => {};
      render();
      return () => {
        unsub();
        ro.disconnect();
      };
    }

    let raf = 0;
    const loop = () => {
      draw(performance.now() / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced, progress]);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden />;
}
