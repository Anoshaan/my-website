"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive canvas grid background.
 *
 * Desktop (hover + fine pointer): pointer pulls the grid, trailing light tail,
 * device-orientation gyro support — preserved exactly as before.
 *
 * Touch (hover: none + coarse pointer): pointer/gyro paths are disabled.
 * Instead the grid responds with:
 *   - Scroll-reactive ambient drift (parallax-like Y offset based on scroll velocity)
 *   - Soft local ripples on touchstart (radial gaussian wave displacing grid points)
 * Grid visibility is also dimmed slightly for a more atmospheric, less distracting feel.
 *
 * Performance:
 * - DPR capped at 1 (halves pixel work on retina)
 * - Idle-pause: stops the RAF loop entirely when nothing moves
 * - visibility-pause: stops when tab is hidden
 * - Touch path skips trail/glow rendering for cheaper frames
 * - Scroll listener is rAF-throttled and passive
 * - Respects prefers-reduced-motion
 */
export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      return;
    }

    // Touch detection — coarse pointer + no hover signals a tablet/phone.
    // Hybrid devices with both mouse and touch keep the desktop experience.
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const config = {
      cellSize: 48,
      influenceRadius: 125,
      maxPull: 10,
      lineColor: [115, 115, 120] as const,
      dotColor: [160, 160, 165] as const,
      glowColor: [240, 240, 243] as const,
      background: "#050505",
      // Very soft on touch — a static, lightweight backdrop
      lineAlpha: isTouch ? 0.06 : 0.18,
      dotAlpha: isTouch ? 0.08 : 0.22,
    };

    // ---- Touch devices: draw ONE static grid, then stop. ----
    // No animation loop and no pointer / scroll / gyro / touch
    // listeners — the grid is purely a lightweight backdrop so
    // phones and tablets stay cool and scrolling stays smooth.
    if (isTouch) {
      const toRGBA = (c: readonly [number, number, number], a: number) =>
        `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

      const drawStaticGrid = () => {
        const w = canvas!.clientWidth;
        const h = canvas!.clientHeight;
        canvas!.width = w;
        canvas!.height = h;
        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        ctx!.fillStyle = config.background;
        ctx!.fillRect(0, 0, w, h);

        const cell = config.cellSize;
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = toRGBA(config.lineColor, config.lineAlpha);
        ctx!.beginPath();
        for (let x = 0; x <= w; x += cell) {
          ctx!.moveTo(x + 0.5, 0);
          ctx!.lineTo(x + 0.5, h);
        }
        for (let y = 0; y <= h; y += cell) {
          ctx!.moveTo(0, y + 0.5);
          ctx!.lineTo(w, y + 0.5);
        }
        ctx!.stroke();

        ctx!.fillStyle = toRGBA(config.dotColor, config.dotAlpha);
        for (let x = 0; x <= w; x += cell) {
          for (let y = 0; y <= h; y += cell) {
            ctx!.beginPath();
            ctx!.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      };

      drawStaticGrid();

      // Redraw once on resize / orientation change — no continuous loop.
      let resizeRaf = 0;
      const onResizeStatic = () => {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(drawStaticGrid);
      };
      window.addEventListener("resize", onResizeStatic);

      return () => {
        cancelAnimationFrame(resizeRaf);
        window.removeEventListener("resize", onResizeStatic);
      };
    }

    type Point = {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
    };

    type TrailPoint = {
      x: number;
      y: number;
      life: number;
      force: number;
    };

    type Ripple = {
      cx: number;
      cy: number;
      age: number;       // in frames
      duration: number;  // in frames
      maxRadius: number; // px the wavefront expands to
      amplitude: number; // peak displacement in px
    };

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      lastX: window.innerWidth / 2,
      lastY: window.innerHeight / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      energy: 0,
      targetEnergy: 0,
      active: false,
    };

    const gyro = { x: 0, y: 0, tx: 0, ty: 0, energy: 0, targetEnergy: 0 };

    // Touch-only state
    const scrollDrift = {
      y: 0,
      ty: 0,
      lastY: window.scrollY,
      lastTime: performance.now(),
    };
    const ripples: Ripple[] = [];
    let scrollRafQueued = false;

    let trail: TrailPoint[] = [];
    let width = 0;
    let height = 0;
    let points: Point[][] = [];
    let raf = 0;
    let running = true;
    let pageHidden = false;

    const rgba = (c: readonly [number, number, number], a: number) =>
      `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

    function buildGrid() {
      points = [];
      const padding = config.cellSize * 2;
      const cols = Math.ceil((width + padding * 2) / config.cellSize);
      const rows = Math.ceil((height + padding * 2) / config.cellSize);
      for (let r = 0; r <= rows; r++) {
        const line: Point[] = [];
        for (let c = 0; c <= cols; c++) {
          line.push({
            x: -padding + c * config.cellSize,
            y: -padding + r * config.cellSize,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
          });
        }
        points.push(line);
      }
    }

    function resize() {
      // Cap at 1 — huge perf win on retina with minimal visual difference
      // for this kind of grid pattern
      const dpr = 1;
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      wake();
    }

    // Desktop magnetic-field warp — pointer pulls, gyro drifts.
    function warpedPointDesktop(point: Point) {
      const dx = pointer.x - point.x;
      const dy = pointer.y - point.y;
      const distance = Math.hypot(dx, dy);
      const motion = Math.max(pointer.energy, gyro.energy);
      const fieldRadius = Math.max(width, height) * 0.85;
      const localRadius = config.influenceRadius + pointer.energy * 52;

      if (motion < 0.01) {
        point.vx += (0 - point.ox) * 0.045;
        point.vy += (0 - point.oy) * 0.045;
        point.vx *= 0.88;
        point.vy *= 0.88;
        point.ox += point.vx;
        point.oy += point.vy;
        return {
          x: point.x + point.ox,
          y: point.y + point.oy,
          glow: 0,
          lean: 0,
          angle: 0,
        };
      }

      const angle = Math.atan2(dy, dx);
      const fieldFalloff = Math.max(0, 1 - distance / fieldRadius);
      const fieldEase = fieldFalloff * fieldFalloff;
      const localFalloff = Math.max(0, 1 - distance / localRadius);
      const localEase = localFalloff * localFalloff * (3 - 2 * localFalloff);

      const pull = (2.2 * fieldEase + config.maxPull * localEase) * pointer.energy;
      const gyroDriftX = gyro.x * (1.5 + fieldEase * 5.5) * gyro.energy;
      const gyroDriftY = gyro.y * (1.5 + fieldEase * 5.5) * gyro.energy;
      const targetX = Math.cos(angle) * pull + gyroDriftX;
      const targetY = Math.sin(angle) * pull + gyroDriftY;

      point.vx += (targetX - point.ox) * 0.075;
      point.vy += (targetY - point.oy) * 0.075;
      point.vx *= 0.82;
      point.vy *= 0.82;
      point.ox += point.vx;
      point.oy += point.vy;

      return {
        x: point.x + point.ox,
        y: point.y + point.oy,
        glow: Math.max(fieldEase * 0.42, localEase) * motion,
        lean: Math.max(fieldEase * 0.65, localEase) * motion,
        angle,
      };
    }

    // Touch warp — radial ripples (gaussian band around expanding wavefront)
    // plus a subtle global Y drift driven by scroll velocity.
    function warpedPointTouch(point: Point) {
      let dispX = 0;
      let dispY = 0;

      for (let i = 0; i < ripples.length; i++) {
        const r = ripples[i];
        const t = r.age / r.duration;
        if (t >= 1) continue;
        const dx = point.x - r.cx;
        const dy = point.y - r.cy;
        const d = Math.hypot(dx, dy);
        const waveR = r.maxRadius * t;
        const bandwidth = 26;
        const distFromWave = d - waveR;
        const gauss = Math.exp(
          -(distFromWave * distFromWave) / (bandwidth * bandwidth)
        );
        const fade = (1 - t) * (1 - t);
        const force = r.amplitude * gauss * fade;
        if (d > 0.5 && force > 0.02) {
          dispX += (dx / d) * force;
          dispY += (dy / d) * force;
        }
      }

      // Ambient scroll drift — applied globally as a soft Y nudge
      dispY += scrollDrift.y;

      point.vx += (dispX - point.ox) * 0.085;
      point.vy += (dispY - point.oy) * 0.085;
      point.vx *= 0.84;
      point.vy *= 0.84;
      point.ox += point.vx;
      point.oy += point.vy;

      return {
        x: point.x + point.ox,
        y: point.y + point.oy,
        glow: 0,
        lean: 0,
        angle: 0,
      };
    }

    const warpedPoint = isTouch ? warpedPointTouch : warpedPointDesktop;

    type Warped = ReturnType<typeof warpedPointDesktop>;

    function segmentGlow(a: Warped, b: Warped) {
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const distance = Math.hypot(pointer.x - midX, pointer.y - midY);
      const radius = config.influenceRadius + pointer.energy * 42;
      return pointer.energy > 0.01
        ? Math.max(0, 1 - distance / radius) * pointer.energy
        : 0;
    }

    function strokeSegment(a: Warped, b: Warped, glow: number) {
      const [r, g, bl] = config.glowColor;
      ctx!.beginPath();
      ctx!.moveTo(a.x, a.y);
      ctx!.lineTo(b.x, b.y);
      ctx!.lineWidth = 1 + glow * 1.1;
      ctx!.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${0.18 + glow * 0.72})`;
      ctx!.shadowColor = `rgba(${r}, ${g}, ${bl}, ${glow * 0.7})`;
      ctx!.shadowBlur = glow * 16;
      ctx!.stroke();
      ctx!.shadowBlur = 0;
    }

    function strokeLine(line: Warped[]) {
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      for (let i = 0; i < line.length - 1; i++) {
        const a = line[i];
        const b = line[i + 1];
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = rgba(config.lineColor, config.lineAlpha);
        ctx!.stroke();
        // Glow segments only run on desktop (pointer.energy stays 0 on touch)
        if (!isTouch) {
          const glow = segmentGlow(a, b);
          if (glow > 0.02) strokeSegment(a, b, glow);
        }
      }
    }

    function drawTrailPath(
      pts: TrailPoint[],
      maxWidth: number,
      color: string,
      alpha: number,
      blur: number
    ) {
      if (pts.length < 2) return;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.shadowBlur = blur;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const t = i / (pts.length - 1);
        const taper = t * t;
        const localAlpha = alpha * taper * cur.life * cur.force;
        ctx!.beginPath();
        ctx!.moveTo(prev.x, prev.y);
        ctx!.lineTo(cur.x, cur.y);
        ctx!.lineWidth = Math.max(0.01, maxWidth * taper);
        ctx!.strokeStyle = color;
        ctx!.shadowColor = color;
        ctx!.globalAlpha = localAlpha;
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
    }

    function drawTrail() {
      trail = trail
        .map((p) => ({ ...p, life: p.life - 0.065 }))
        .filter((p) => p.life > 0);
      if (trail.length < 2) return;
      const [r, g, b] = config.glowColor;
      const avgLife =
        trail.reduce((s, p) => s + p.life * p.force, 0) / trail.length;
      drawTrailPath(trail, 24, `rgba(${r}, ${g}, ${b}, 0.34)`, avgLife, 38);
      drawTrailPath(trail, 10, `rgba(${r}, ${g}, ${b}, 0.82)`, avgLife * 0.95, 20);
      drawTrailPath(trail, 3.2, "rgba(255, 255, 255, 1)", avgLife * 0.9, 8);
      const head = trail[trail.length - 1];
      if (head) {
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 3.5 + head.force * 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${Math.min(1, head.life * head.force)})`;
        ctx!.shadowColor = `rgba(${r}, ${g}, ${b}, ${head.life})`;
        ctx!.shadowBlur = 22;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    function drawDot(p: Warped) {
      const [r, g, b] = config.glowColor;
      const baseRadius = 1.25;
      const glow = p.glow || 0;
      const lean = p.lean || 0;

      if (lean > 0.018) {
        const angle = p.angle;
        const length = 2.3 + lean * 8.5;
        const w = 1.05 + lean * 1.9;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(angle);
        ctx!.beginPath();
        ctx!.moveTo(length, 0);
        ctx!.bezierCurveTo(w, w, -length * 0.45, w * 0.72, -length * 0.72, 0);
        ctx!.bezierCurveTo(-length * 0.45, -w * 0.72, w, -w, length, 0);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.12 + glow * 0.5})`;
        ctx!.shadowColor = `rgba(${r}, ${g}, ${b}, ${glow * 0.65})`;
        ctx!.shadowBlur = 6 + glow * 12;
        ctx!.fill();
        ctx!.restore();
        ctx!.shadowBlur = 0;
        return;
      }

      ctx!.shadowBlur = 0;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, baseRadius, 0, Math.PI * 2);
      ctx!.fillStyle = rgba(config.dotColor, config.dotAlpha);
      ctx!.fill();
    }

    function isAtRest() {
      if (isTouch) {
        return (
          ripples.length === 0 &&
          Math.abs(scrollDrift.y) < 0.04 &&
          Math.abs(scrollDrift.ty) < 0.04
        );
      }
      return (
        pointer.energy < 0.005 &&
        pointer.targetEnergy < 0.005 &&
        gyro.energy < 0.005 &&
        trail.length === 0 &&
        Math.abs(pointer.tx - pointer.x) < 0.5 &&
        Math.abs(pointer.ty - pointer.y) < 0.5
      );
    }

    let restFrames = 0;

    function draw() {
      if (!running || pageHidden) return;

      if (isTouch) {
        // Ease drift toward target, decay target back to zero when scroll stops
        scrollDrift.y += (scrollDrift.ty - scrollDrift.y) * 0.12;
        scrollDrift.ty *= 0.86;
        // Age ripples; drop expired ones
        for (let i = ripples.length - 1; i >= 0; i--) {
          ripples[i].age++;
          if (ripples[i].age >= ripples[i].duration) ripples.splice(i, 1);
        }
      } else {
        pointer.x += (pointer.tx - pointer.x) * 0.28;
        pointer.y += (pointer.ty - pointer.y) * 0.28;
        pointer.energy *= 0.78;
        pointer.targetEnergy *= 0.9;
        pointer.energy += (pointer.targetEnergy - pointer.energy) * 0.085;
        gyro.x += (gyro.tx - gyro.x) * 0.08;
        gyro.y += (gyro.ty - gyro.y) * 0.08;
        gyro.targetEnergy *= 0.94;
        gyro.energy += (gyro.targetEnergy - gyro.energy) * 0.06;
        pointer.active = pointer.energy > 0.01 || gyro.energy > 0.01;
      }

      ctx!.fillStyle = config.background;
      ctx!.fillRect(0, 0, width, height);

      if (!isTouch) drawTrail();

      const warped: Warped[][] = points.map((row) => row.map(warpedPoint));
      for (const row of warped) strokeLine(row);
      for (let c = 0; c < warped[0].length; c++) {
        const column: Warped[] = [];
        for (let r = 0; r < warped.length; r++) column.push(warped[r][c]);
        strokeLine(column);
      }
      for (const row of warped) for (const p of row) drawDot(p);

      // Idle-pause: if nothing's moving for a few frames, stop the loop
      if (isAtRest()) {
        restFrames++;
        if (restFrames > 30) {
          // settled — pause until next interaction
          running = false;
          return;
        }
      } else {
        restFrames = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    function wake() {
      restFrames = 0;
      if (!running && !pageHidden) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    }

    function setPointer(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dx = x - pointer.lastX;
      const dy = y - pointer.lastY;
      const distance = Math.hypot(dx, dy);
      const force = Math.min(distance / 48, 1);
      pointer.tx = x;
      pointer.ty = y;
      pointer.vx = dx;
      pointer.vy = dy;
      pointer.speed = distance;
      pointer.energy = Math.max(pointer.energy, force);
      pointer.targetEnergy = Math.max(pointer.targetEnergy, force);
      pointer.active = true;
      pointer.lastX = x;
      pointer.lastY = y;
      if (distance > 2) {
        trail.push({ x, y, life: 1, force: 0.35 + force * 0.65 });
        if (trail.length > 24) trail.shift();
      }
      wake();
    }

    function onTilt(event: DeviceOrientationEvent) {
      if (event.gamma == null || event.beta == null) return;
      gyro.tx = Math.max(-1, Math.min(1, event.gamma / 28));
      gyro.ty = Math.max(-1, Math.min(1, event.beta / 34));
      gyro.targetEnergy = Math.max(
        gyro.targetEnergy,
        Math.min((Math.abs(gyro.tx) + Math.abs(gyro.ty)) * 0.45, 0.75)
      );
      wake();
    }

    function onMotion(event: DeviceMotionEvent) {
      const a = event.accelerationIncludingGravity;
      if (!a) return;
      const x = a.x || 0;
      const y = a.y || 0;
      const force = Math.min(Math.hypot(x, y) / 18, 0.85);
      gyro.tx = Math.max(-1, Math.min(1, x / 9));
      gyro.ty = Math.max(-1, Math.min(1, y / 9));
      gyro.targetEnergy = Math.max(gyro.targetEnergy, force);
      wake();
    }

    function onLeave() {
      pointer.active = false;
      pointer.targetEnergy = 0;
    }

    function onScroll() {
      if (scrollRafQueued) return;
      scrollRafQueued = true;
      requestAnimationFrame(() => {
        scrollRafQueued = false;
        const now = performance.now();
        const y = window.scrollY;
        const dt = Math.max(now - scrollDrift.lastTime, 16);
        const dy = y - scrollDrift.lastY;
        // px per ms → scaled to a clamped drift target.
        // Sign: drift opposite the scroll direction for a parallax-like feel.
        const velocity = dy / dt;
        const target = Math.max(-6, Math.min(6, -velocity * 28));
        // Take the larger magnitude so quick flicks don't get smoothed away
        if (Math.abs(target) > Math.abs(scrollDrift.ty)) {
          scrollDrift.ty = target;
        }
        scrollDrift.lastY = y;
        scrollDrift.lastTime = now;
        wake();
      });
    }

    function onTouchStart(event: TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      // changedTouches gives us just the new touch points for this event
      for (let i = 0; i < event.changedTouches.length; i++) {
        const t = event.changedTouches[i];
        ripples.push({
          cx: t.clientX - rect.left,
          cy: t.clientY - rect.top,
          age: 0,
          duration: 42,    // ~700ms at 60fps
          maxRadius: 110,  // small — stays local
          amplitude: 7,    // gentle peak displacement
        });
      }
      // Cap concurrent ripples — old ones decay quickly anyway
      while (ripples.length > 6) ripples.shift();
      wake();
    }

    function onVisibilityChange() {
      pageHidden = document.hidden;
      if (!pageHidden) wake();
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (isTouch) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
    } else {
      window.addEventListener("pointermove", setPointer, { passive: true });
      window.addEventListener("pointerdown", setPointer, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      window.addEventListener("deviceorientation", onTilt, { passive: true });
      window.addEventListener("devicemotion", onMotion, { passive: true });
    }

    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (isTouch) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("touchstart", onTouchStart);
      } else {
        window.removeEventListener("pointermove", setPointer);
        window.removeEventListener("pointerdown", setPointer);
        window.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("deviceorientation", onTilt);
        window.removeEventListener("devicemotion", onMotion);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
    />
  );
}
