"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";

/**
 * ThinkingParticles — a single Canvas-2D particle field, fixed to the
 * viewport, that re-forms through four stages of a design-thinking
 * process, scrubbed by scroll progress (0 → 1):
 *
 *   Understand → a rotating point-globe of gathered signals
 *   Observe    → a journey path with a friction bottleneck (warm)
 *   Simplify   → the tangle collapses onto one clean backbone line
 *   Deliver    → a centred, front-facing dashboard (with connecting lines)
 *
 * It begins converging from the screen edges while the previous section
 * is still fading, so the field is fully established by the time this
 * section is the focal point. Colours stay on-brand; warm marks friction;
 * the Deliver chart line picks up the journey's neon accent. Formations
 * are kept compact and biased toward the central gap so they never cover
 * the side copy.
 */

type Props = {
  progress: MotionValue<number>;
  active?: boolean;
  reduced?: boolean | null;
};

type RGB = [number, number, number];
const WHITE: RGB = [255, 255, 255];
const LAV: RGB = [207, 217, 255];
const COOL: RGB = [150, 170, 255];
const WARM: RGB = [255, 184, 154];
const MUTE: RGB = [120, 132, 176];
const NEON_YELLOW: RGB = [242, 255, 77]; // Deliver chart accent

type Vec = { x: number; y: number; z: number; r: number; g: number; b: number; a: number };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Scroll progress → continuous stage float (0..3). Plateaus = holds. */
function stageFloat(p: number): number {
  const pts: [number, number][] = [
    [0.22, 0],
    [0.34, 0],
    [0.44, 1],
    [0.54, 1],
    [0.64, 2],
    [0.74, 2],
    [0.84, 3],
    [1.0, 3],
  ];
  if (p <= pts[0][0]) return 0;
  for (let k = 0; k < pts.length - 1; k++) {
    const [pa, va] = pts[k];
    const [pb, vb] = pts[k + 1];
    if (p <= pb) return lerp(va, vb, easeInOut(clamp01((p - pa) / (pb - pa))));
  }
  return 3;
}

const ROT_X = [0.22, 0.12, 0.06, 0.0];
const ROT_Y = [0.0, -0.12, 0.06, 0.0];

function setC(o: Vec, c: RGB) {
  o.r = c[0];
  o.g = c[1];
  o.b = c[2];
}

/** Target position + colour for particle `i` in a given stage. */
function form(o: Vec, stage: number, i: number, N: number, t: number) {
  const u = i / N;
  o.a = 1;

  if (stage === 0) {
    // UNDERSTAND — dense white nucleus + orbiting bands of signals.
    const split = 0.28;
    if (u < split) {
      const n = Math.max(1, Math.floor(N * split));
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      const R = 0.78 + Math.sin(t * 1.2 + i) * 0.012;
      o.x = R * Math.sin(phi) * Math.cos(theta);
      o.y = R * Math.sin(phi) * Math.sin(theta);
      o.z = R * Math.cos(phi);
      setC(o, WHITE);
    } else {
      const ring = i % 3;
      const rad = 1.5 + ring * 0.42;
      const ang = u * Math.PI * 6 + t * 0.22 * (3 - ring);
      o.x = rad * Math.cos(ang);
      o.y = rad * Math.sin(ang) * 0.4;
      o.z = rad * Math.sin(ang) * 0.9;
      setC(o, ring === 0 ? LAV : COOL);
    }
  } else if (stage === 1) {
    // OBSERVE — a journey path with a congested friction bottleneck.
    const X = -2.4 + u * 4.8;
    if (X > 0.0 && X < 1.4) {
      const ip = X / 1.4;
      const px = 0.0 + 0.5 * Math.sin(ip * Math.PI * 0.5);
      o.x = px;
      o.y = Math.sin(px * 1.8) * 0.6 + Math.cos(px * 0.9) * 0.2 + Math.sin(t * 6 + i) * 0.045;
      o.z = Math.cos(i * 4.0) * 0.22;
      setC(o, WARM);
    } else {
      o.x = X;
      o.y = Math.sin(X * 1.8) * 0.6 + Math.cos(X * 0.9) * 0.2;
      o.z = 0;
      setC(o, MUTE);
    }
  } else if (stage === 2) {
    // SIMPLIFY — clean backbone line; the rest drift off, faded.
    const bx = -2.1 + u * 4.2;
    if (u < 0.66) {
      o.x = bx;
      o.y = Math.sin(i * 12.0) * 0.03;
      o.z = 0;
      setC(o, u < 0.5 ? WHITE : COOL);
    } else {
      const a = i * 3.1;
      o.x = bx * 0.82 + Math.cos(a) * 0.5;
      o.y = Math.sin(a * 1.7) * 1.0;
      o.z = Math.sin(a) * 0.45;
      o.a = 0.2;
      setC(o, MUTE);
    }
  } else {
    // DELIVER — a centred, front-facing dashboard (z ≈ 0).
    const W2 = 2.7;
    const H2 = 1.7;
    if (u < 0.12) {
      // Panel frame outline.
      const local = u / 0.12;
      const s = local * 2 - 1;
      const e = i % 4;
      if (e === 0) {
        o.x = s * W2;
        o.y = H2;
      } else if (e === 1) {
        o.x = s * W2;
        o.y = -H2;
      } else if (e === 2) {
        o.x = W2;
        o.y = s * H2;
      } else {
        o.x = -W2;
        o.y = s * H2;
      }
      o.z = 0;
      setC(o, MUTE);
    } else if (u < 0.2) {
      // Top header bar.
      const local = (u - 0.12) / 0.08;
      o.x = -W2 + 0.2 + local * (2 * W2 - 0.4);
      o.y = H2 - 0.34;
      o.z = 0;
      setC(o, WHITE);
      o.a = 0.85;
    } else if (u < 0.3) {
      // Left sidebar menu column.
      const local = (u - 0.2) / 0.1;
      o.x = -W2 + 0.4;
      o.y = H2 - 0.9 - local * (2 * H2 - 1.4);
      o.z = 0;
      setC(o, COOL);
    } else if (u < 0.42) {
      // Three KPI stat tiles.
      const local = (u - 0.3) / 0.12;
      const tile = i % 3;
      const side = Math.floor(i / 3) % 4;
      const s = local * 2 - 1;
      const cxk = -1.3 + tile * 1.25;
      const cyk = 0.95;
      const tw = 0.5;
      const th = 0.32;
      if (side === 0) {
        o.x = cxk + s * tw;
        o.y = cyk + th;
      } else if (side === 1) {
        o.x = cxk + s * tw;
        o.y = cyk - th;
      } else if (side === 2) {
        o.x = cxk + tw;
        o.y = cyk + s * th;
      } else {
        o.x = cxk - tw;
        o.y = cyk + s * th;
      }
      o.z = 0;
      setC(o, COOL);
    } else if (u < 0.66) {
      // Line chart — ordered by u so it can be stroked as a polyline.
      const local = (u - 0.42) / 0.24;
      o.x = -1.5 + local * 3.6;
      o.y =
        0.05 +
        Math.sin(local * Math.PI * 2.2) * 0.42 +
        Math.sin(local * Math.PI * 5.0) * 0.12 +
        Math.sin(t * 1.6 + local * 6) * 0.03;
      o.z = 0;
      setC(o, NEON_YELLOW);
    } else if (u < 0.86) {
      // Bar chart (right of the main area).
      const local = (u - 0.66) / 0.2;
      const g = i % 5;
      const barH = 0.4 + Math.abs(Math.sin(g * 1.6 + t * 1.3)) * 0.7;
      o.x = 1.35 + g * 0.32;
      o.y = -H2 + 0.25 + local * barH;
      o.z = 0;
      setC(o, COOL);
    } else {
      // Content / legend rows (lower-left).
      const row = i % 4;
      o.x = -1.5 + ((i * 0.013) % 1) * 1.7;
      o.y = -0.7 - row * 0.18;
      o.z = 0;
      o.a = 0.6;
      setC(o, WHITE);
    }
  }
}

export function ThinkingParticles({ progress, active = true, reduced }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const wide = window.matchMedia("(min-width: 900px)").matches;
    const small = window.matchMedia("(max-width: 600px)").matches;
    const N = small ? 560 : wide ? 1500 : 880;

    const cur = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const disp = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // Dispersed cloud spread to the screen edges for the convergence.
      const ang = Math.random() * Math.PI * 2;
      const rad = 6 + Math.random() * 5;
      disp[i * 3] = Math.cos(ang) * rad;
      disp[i * 3 + 1] = Math.sin(ang) * rad * 0.72;
      disp[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      cur[i * 3] = disp[i * 3];
      cur[i * 3 + 1] = disp[i * 3 + 1];
      cur[i * 3 + 2] = disp[i * 3 + 2];
    }

    // Chart-line capture buffers (Deliver connecting line).
    const chartStart = Math.floor(0.42 * N);
    const chartEnd = Math.floor(0.66 * N);
    const chartSX = new Float32Array(chartEnd - chartStart);
    const chartSY = new Float32Array(chartEnd - chartStart);

    const fa: Vec = { x: 0, y: 0, z: 0, r: 0, g: 0, b: 0, a: 1 };
    const fb: Vec = { x: 0, y: 0, z: 0, r: 0, g: 0, b: 0, a: 1 };

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

    let spin = 0;
    const focal = 5.2;

    const render = (t: number, dt: number, snap: boolean) => {
      const p = clamp01(progress.get());
      const sf = stageFloat(p);
      const s0 = Math.min(3, Math.floor(sf));
      const s1 = Math.min(3, s0 + 1);
      const frac = sf - s0;
      const emerge = easeOutCubic(clamp01(p / 0.18));
      const exit = 1 - clamp01((p - 0.93) / 0.07);
      const gAlpha = emerge * exit;

      const spinW = clamp01(1 - sf);
      spin += dt * (0.12 * spinW);
      const rotXb = lerp(ROT_X[s0], ROT_X[s1], frac);
      const rotYb = lerp(ROT_Y[s0], ROT_Y[s1], frac);
      const rotY = rotYb + spin * spinW;
      const rotX = rotXb;
      const cyR = Math.cos(rotY);
      const syR = Math.sin(rotY);
      const cxR = Math.cos(rotX);
      const sxR = Math.sin(rotX);

      // Desktop: biased into the gap between the side copy columns.
      // Mobile (stacked): centred horizontally, lifted up so it sits
      // above the copy rather than over it.
      const cx = wide ? W * 0.57 : W * 0.5;
      const cyc = wide ? H * 0.52 : H * 0.36;
      const zoom = Math.min(W, H) * (wide ? 0.108 : small ? 0.085 : 0.095);
      const baseSize = Math.max(1.1, Math.min(W, H) * 0.0016);
      const deliverW = clamp01(sf - 2);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < N; i++) {
        form(fa, s0, i, N, t);
        let tx = fa.x;
        let ty = fa.y;
        let tz = fa.z;
        let cr = fa.r;
        let cg = fa.g;
        let cb = fa.b;
        let ta = fa.a;
        if (frac > 0.0001) {
          form(fb, s1, i, N, t);
          tx = lerp(tx, fb.x, frac);
          ty = lerp(ty, fb.y, frac);
          tz = lerp(tz, fb.z, frac);
          cr = lerp(cr, fb.r, frac);
          cg = lerp(cg, fb.g, frac);
          cb = lerp(cb, fb.b, frac);
          ta = lerp(ta, fb.a, frac);
        }

        // Converge from the dispersed edge cloud during emergence.
        tx = lerp(disp[i * 3], tx, emerge);
        ty = lerp(disp[i * 3 + 1], ty, emerge);
        tz = lerp(disp[i * 3 + 2], tz, emerge);

        const j = i * 3;
        if (snap) {
          cur[j] = tx;
          cur[j + 1] = ty;
          cur[j + 2] = tz;
          col[j] = cr;
          col[j + 1] = cg;
          col[j + 2] = cb;
        } else {
          cur[j] += (tx - cur[j]) * 0.09;
          cur[j + 1] += (ty - cur[j + 1]) * 0.09;
          cur[j + 2] += (tz - cur[j + 2]) * 0.09;
          col[j] += (cr - col[j]) * 0.06;
          col[j + 1] += (cg - col[j + 1]) * 0.06;
          col[j + 2] += (cb - col[j + 2]) * 0.06;
        }

        const x = cur[j];
        const y = cur[j + 1];
        const z = cur[j + 2];
        const rx = x * cyR + z * syR;
        const rz = -x * syR + z * cyR;
        const ry = y * cxR - rz * sxR;
        const rz2 = y * sxR + rz * cxR;
        const scale = focal / (focal + rz2);
        const sx = cx + rx * zoom * scale;
        const sy = cyc - ry * zoom * scale;

        if (i >= chartStart && i < chartEnd) {
          chartSX[i - chartStart] = sx;
          chartSY[i - chartStart] = sy;
        }

        const depthA = clamp01(0.35 + scale * 0.6);
        const alpha = ta * depthA * gAlpha;
        if (alpha <= 0.01) continue;
        const size = baseSize * scale;
        const fill = `rgba(${col[j] | 0},${col[j + 1] | 0},${col[j + 2] | 0},`;
        ctx.fillStyle = fill + alpha * 0.22 + ")";
        ctx.beginPath();
        ctx.arc(sx, sy, size * 2.4, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = fill + alpha + ")";
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, 6.2832);
        ctx.fill();
      }

      // Deliver connecting line — a glowing neon chart polyline.
      if (deliverW > 0.02 && gAlpha > 0.02) {
        ctx.strokeStyle = `rgba(242,255,77,${0.5 * deliverW * gAlpha})`;
        ctx.lineWidth = 1.4;
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(242,255,77,0.7)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(chartSX[0], chartSY[0]);
        for (let k = 1; k < chartSX.length; k++) ctx.lineTo(chartSX[k], chartSY[k]);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.globalCompositeOperation = "source-over";
    };

    if (reduced) {
      const draw = () => render(0, 0, true);
      const unsub = progress.on("change", draw);
      draw();
      return () => {
        unsub();
        ro.disconnect();
      };
    }

    let raf = 0;
    let last = performance.now();
    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      render(now / 1000, dt, false);
      raf = activeRef.current ? requestAnimationFrame(loop) : 0;
    };

    // Start/stop the loop with section visibility (driven by the prop).
    let mounted = true;
    const ensureRunning = () => {
      if (activeRef.current && !raf && mounted) {
        last = performance.now();
        loop();
      } else if (!activeRef.current && !raf) {
        ctx.clearRect(0, 0, W, H);
      }
    };
    const poll = setInterval(ensureRunning, 200);
    ensureRunning();

    return () => {
      mounted = false;
      clearInterval(poll);
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [progress, reduced]);

  return <canvas ref={canvasRef} className="approach-canvas" aria-hidden />;
}
