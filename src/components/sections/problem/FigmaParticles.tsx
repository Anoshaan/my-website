"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";

/**
 * FigmaParticles — a light, premium particle field for the hero→workspace
 * transition (Section 2). It is scrubbed by the same scroll progress that
 * drives the rising Figma card:
 *
 *   • As the user begins scrolling down from the hero, particles drift in
 *     from every side and gather softly around where the screen appears.
 *   • While the screen is centred they keep orbiting gently around it.
 *   • When the screen parks to the right (desktop) or lifts up (mobile),
 *     the whole field shifts with it so it always haloes the screen.
 *
 * It is deliberately sparse and low-contrast — a halo, never a background
 * effect — and reads in both themes (additive glow on dark, soft ink dots
 * on light). The canvas sits behind the card, so particles surround its
 * edges rather than covering the UI.
 */

type Props = {
  /** The section's scroll progress (0→1), shared with the card transform. */
  progress: MotionValue<number>;
  /** Split layout (card parks right) vs stacked (card lifts up). */
  isWide: boolean;
  reduced?: boolean | null;
};

type P = {
  a0: number; // orbit start angle
  rad: number; // 0..1 orbit radius factor
  sp: number; // orbit angular speed
  bob: number; // vertical bob phase
  ex: number; // edge-home unit dir x
  ey: number; // edge-home unit dir y
  ci: number; // colour index
  sz: number; // size factor
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
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

export function FigmaParticles({ progress, isWide, reduced }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wideRef = useRef(isWide);
  wideRef.current = isWide;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const small = window.matchMedia("(max-width: 600px)").matches;
    const wideScreen = window.matchMedia("(min-width: 900px)").matches;
    const N = small ? 34 : wideScreen ? 78 : 52;

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

    const parts: P[] = Array.from({ length: N }, (_, i) => {
      const ea = Math.random() * Math.PI * 2;
      return {
        a0: Math.random() * Math.PI * 2,
        rad: Math.random(),
        sp: (0.06 + Math.random() * 0.12) * (Math.random() < 0.5 ? 1 : -1),
        bob: Math.random() * Math.PI * 2,
        ex: Math.cos(ea) * (1.1 + Math.random() * 0.5),
        ey: Math.sin(ea) * (1.1 + Math.random() * 0.5),
        ci: i % 3,
        sz: 0.7 + Math.random() * 1.3,
      };
    });

    const draw = (t: number) => {
      const p = clamp01(progress.get());
      const wide = wideRef.current;

      // Gather amount — particles drift in and settle into their halo.
      const g = smooth(0.04, 0.42, p);
      if (g <= 0.001) {
        ctx.clearRect(0, 0, W, H);
        return;
      }

      // Focus point + radius scale track the card transform.
      let fx: number;
      let fy: number;
      let rScale: number;
      if (wide) {
        fx = lerp(0.5, 0.7, smooth(0.7, 0.82, p));
        fy = 0.52;
        rScale = lerp(1, 0.64, smooth(0.7, 0.82, p));
      } else {
        fx = 0.5;
        fy = lerp(0.5, 0.26, smooth(0.7, 0.82, p));
        rScale = lerp(1, 0.58, smooth(0.7, 0.82, p));
      }

      const cx = fx * W;
      const cy = fy * H;
      const rx0 = W * (small ? 0.42 : 0.4) * rScale;
      const ry0 = H * 0.4 * rScale;

      const theme = document.documentElement.getAttribute("data-theme");
      const light = theme === "light";
      const pal = light ? LIGHT : DARK;
      // Additive glow reads beautifully on the dark field; on light we draw
      // soft ink dots normally so they stay visible against the bright page.
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";

      for (let i = 0; i < N; i++) {
        const pt = parts[i];
        const a = pt.a0 + t * pt.sp;
        const rr = 0.5 + pt.rad * 0.62;
        const orbX = cx + Math.cos(a) * rx0 * rr;
        const orbY = cy + Math.sin(a) * ry0 * rr + Math.sin(t * 0.5 + pt.bob) * 7;
        const homeX = cx + pt.ex * W * 0.85;
        const homeY = cy + pt.ey * H * 0.85;
        const x = lerp(homeX, orbX, g);
        const y = lerp(homeY, orbY, g);

        // Depth shimmer so the field feels alive rather than uniform.
        const shimmer = 0.6 + 0.4 * Math.sin(t * 0.9 + pt.bob * 2);
        const alpha = g * shimmer * (light ? 0.5 : 0.6);
        if (alpha <= 0.01) continue;

        const [r, gg, b] = pal[pt.ci];
        const size = pt.sz * (small ? 1.1 : 1.4);
        const base = `${r},${gg},${b}`;
        // Soft halo + crisp core.
        ctx.fillStyle = `rgba(${base},${alpha * (light ? 0.18 : 0.22)})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 2.6, 0, 6.2832);
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
      const unsub = progress.on("change", render);
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
  }, [progress, reduced]);

  return <canvas ref={canvasRef} className="problem-particles" aria-hidden />;
}
