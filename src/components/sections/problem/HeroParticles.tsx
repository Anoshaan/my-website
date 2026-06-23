"use client";

import { useEffect, useRef } from "react";

/**
 * HeroParticles — a soft cloud of glowing particles drifting slowly near the
 * bottom of the Hero. They move organically (gentle multi-axis bobbing around
 * a home position), staying mostly in the lower band and only ever rising a
 * little, never reaching the buttons. They do NOT shoot upward and do NOT fade
 * on scroll — the band that hosts them never dims, so the field reads as one
 * continuous flow into the next section's particles (same dot language).
 *
 * Crisp glowing dots (core + tight halo), theme-aware (additive glow on dark,
 * soft violet dots on light), and reduced-motion friendly.
 */

type P = {
  hx: number; // home x (0..1 of width)
  hy: number; // home y, fraction UP from the band bottom (0 = bottom)
  ax1: number; // x drift amplitude (fraction of width)
  ax2: number;
  fx1: number; // x drift frequencies
  fx2: number;
  px1: number; // phases
  px2: number;
  ay: number; // y drift amplitude (fraction of band)
  fy: number;
  py: number;
  ci: number; // colour index
  sz: number; // size factor
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

export function HeroParticles({ reduced }: { reduced?: boolean | null }) {
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

    // Homes biased to the LOWER part of the band so the cloud sits near the
    // hero's bottom edge; the small y drift lets them rise only slightly.
    const parts: P[] = Array.from({ length: N }, (_, i) => ({
      hx: Math.random(),
      hy: rand(0.04, 0.46),
      ax1: rand(0.015, 0.05),
      ax2: rand(0.006, 0.02),
      fx1: rand(0.1, 0.24),
      fx2: rand(0.3, 0.55),
      px1: rand(0, Math.PI * 2),
      px2: rand(0, Math.PI * 2),
      ay: rand(0.05, 0.13),
      fy: rand(0.08, 0.2),
      py: rand(0, Math.PI * 2),
      ci: i % 3,
      sz: rand(1, 2),
    }));

    const draw = (t: number) => {
      const theme = document.documentElement.getAttribute("data-theme");
      const light = theme === "light";
      const pal = light ? LIGHT : DARK;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";

      for (let i = 0; i < N; i++) {
        const p = parts[i];

        const driftX = reduced
          ? 0
          : (Math.sin(t * p.fx1 + p.px1) * p.ax1 +
              Math.sin(t * p.fx2 + p.px2) * p.ax2) *
            W;
        const x = p.hx * W + driftX;

        const driftY = reduced ? 0 : Math.sin(t * p.fy + p.py) * p.ay;
        // yf = fraction up from the bottom of the band; capped so particles
        // never climb past ~the lower two-thirds (well below the buttons).
        const yf = clamp(p.hy + driftY, 0, 0.62);
        const y = H - yf * H;

        // Crisp and visible: full near the bottom, only softening as a particle
        // approaches the top of its allowed range (no hard edge, no haze).
        const topFade = 1 - clamp((yf - 0.42) / 0.2, 0, 1) * 0.7;
        const shimmer = reduced ? 1 : 0.72 + 0.28 * Math.sin(t * 0.7 + p.py * 2);
        const alpha = topFade * shimmer * (light ? 0.5 : 0.62);
        if (alpha <= 0.01) continue;

        const [r, g, b] = pal[p.ci];
        const size = p.sz * (small ? 1.15 : 1.45);
        const base = `${r},${g},${b}`;

        // Soft halo.
        ctx.fillStyle = `rgba(${base},${alpha * (light ? 0.16 : 0.22)})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 2.4, 0, 6.2832);
        ctx.fill();
        // Mid glow.
        ctx.fillStyle = `rgba(${base},${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, 6.2832);
        ctx.fill();
        // Crisp core.
        ctx.fillStyle = `rgba(${base},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
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
  }, [reduced]);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden />;
}
