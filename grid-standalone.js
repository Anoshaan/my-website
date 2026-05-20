/**
 * =========================================================
 * GLOW GRID — STANDALONE INTERACTIVE MOTION ENGINE
 * =========================================================
 * A high-performance, canvas-based reactive grid with:
 *  - Dynamic cursor-attraction warp fields
 *  - Premium monochrome silver-gray glowing trails
 *  - Stretch-warped leaning coordinate dots (Bezier paths)
 *  - Multi-layered pointer tracking with tapering speed
 *  - Responsive grid-padding and DPR scaling
 *  - Gyroscope & Accelerometer drift support for mobile
 *
 * HOW TO USE:
 * 1. Insert a canvas element into your HTML:
 *    <canvas id="glow-grid-canvas"></canvas>
 * 
 * 2. Add the corresponding CSS to keep it full-screen and behind elements:
 *    #glow-grid-canvas {
 *      position: fixed;
 *      inset: 0;
 *      width: 100vw;
 *      height: 100vh;
 *      z-index: -1;
 *      pointer-events: none;
 *    }
 *
 * 3. Link this script at the bottom of your body tag:
 *    <script src="grid-standalone.js"></script>
 */

(function () {
  const canvas = document.getElementById("glow-grid-canvas");
  if (!canvas) {
    console.warn("GlowGrid: canvas with id 'glow-grid-canvas' not found.");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // --- Design System & Physics Config ---
  const config = {
    cellSize: 42,
    influenceRadius: 125,
    maxPull: 10,
    lineColor: [115, 115, 120],  // Neutral Muted Silver-Gray
    dotColor: [160, 160, 165],   // Neutral Medium Silver-Gray
    glowColor: [240, 240, 243],  // Premium Monochrome Silver/White Glow
    background: "#050505",       // Sleek Deep Gray/Black base
  };

  // --- Dynamic States ---
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

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

  const gyro = {
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    energy: 0,
    targetEnergy: 0,
  };

  let trail = [];
  let width = 0;
  let height = 0;
  let points = [];

  // Depth alpha fades grid transparency if needed (1.0 = solid)
  function depthAlpha(y) {
    return 1;
  }

  function rgba(color, alpha) {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
  }

  // --- Build Coordinate Matrix ---
  function buildGrid() {
    points = [];
    const padding = config.cellSize * 2;
    const cols = Math.ceil((width + padding * 2) / config.cellSize);
    const rows = Math.ceil((height + padding * 2) / config.cellSize);

    for (let row = 0; row <= rows; row++) {
      const line = [];
      for (let col = 0; col <= cols; col++) {
        line.push({
          x: -padding + col * config.cellSize,
          y: -padding + row * config.cellSize,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
        });
      }
      points.push(line);
    }
  }

  // --- Handle DPR and Resize Scaling ---
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    buildGrid();
  }

  // --- Math Warp Physics Field ---
  function warpedPoint(point) {
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
        ox: point.ox,
        oy: point.oy,
        vx: point.vx,
        vy: point.vy,
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
      ox: point.ox,
      oy: point.oy,
      vx: point.vx,
      vy: point.vy,
    };
  }

  // --- segment glow force ---
  function segmentGlow(a, b) {
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const distance = Math.hypot(pointer.x - midX, pointer.y - midY);
    const radius = config.influenceRadius + pointer.energy * 42;
    const fade = (depthAlpha(a.y) + depthAlpha(b.y)) * 0.5;

    return pointer.energy > 0.01
      ? Math.max(0, 1 - distance / radius) * pointer.energy * fade
      : 0;
  }

  // --- render single glowing line segment ---
  function strokeSegment(a, b, glow) {
    const [r, g, bl] = config.glowColor;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineWidth = 1 + glow * 1.1;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${0.18 + glow * 0.72})`;
    ctx.shadowColor = `rgba(${r}, ${g}, ${bl}, ${glow * 0.7})`;
    ctx.shadowBlur = glow * 16;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // --- render smooth line series ---
  function strokeSmoothGridPath(pointsLine) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let index = 0; index < pointsLine.length - 1; index += 1) {
      const start = pointsLine[index];
      const end = pointsLine[index + 1];
      const fade = (depthAlpha(start.y) + depthAlpha(end.y)) * 0.5;

      if (fade > 0.01) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(config.lineColor, 0.22 * fade);
        ctx.stroke();
      }

      const glow = segmentGlow(start, end);
      if (glow > 0.02) {
        strokeSegment(start, end, glow);
      }
    }
  }

  // --- render interactive mouse trail ---
  function drawTrailPath(points, maxWidth, color, alpha, blur) {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowBlur = blur;

    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];

      const t = index / (points.length - 1);
      const taper = t * t;
      const localAlpha = alpha * taper * current.life * current.force;

      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(current.x, current.y);
      ctx.lineWidth = Math.max(0.01, maxWidth * taper);
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.globalAlpha = localAlpha;
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  function drawTrail() {
    trail = trail
      .map((point) => Object.assign({}, point, { life: point.life - 0.065 }))
      .filter((point) => point.life > 0);

    if (trail.length < 2) return;

    const [r, g, b] = config.glowColor;
    const averageLife =
      trail.reduce((sum, point) => sum + point.life * point.force, 0) / trail.length;

    drawTrailPath(trail, 24, `rgba(${r}, ${g}, ${b}, 0.34)`, averageLife, 38);
    drawTrailPath(trail, 10, `rgba(${r}, ${g}, ${b}, 0.82)`, averageLife * 0.95, 20);
    drawTrailPath(trail, 3.2, "rgba(255, 255, 255, 1)", averageLife * 0.9, 8);

    const head = trail[trail.length - 1];
    if (head) {
      ctx.beginPath();
      ctx.arc(head.x, head.y, 3.5 + head.force * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, head.life * head.force)})`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${head.life})`;
      ctx.shadowBlur = 22;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // --- render coordinate dot with Bezier distortion stretch ---
  function drawDot(point) {
    const fade = depthAlpha(point.y);
    if (fade <= 0.01) return;

    const [r, g, b] = config.glowColor;
    const baseRadius = 0.9 + fade * 0.35;
    const glow = point.glow || 0;
    const lean = point.lean || 0;

    if (lean > 0.018) {
      const angle = point.angle;
      const length = 2.3 + lean * 8.5;
      const width = 1.05 + lean * 1.9;

      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(length, 0);
      ctx.bezierCurveTo(width, width, -length * 0.45, width * 0.72, -length * 0.72, 0);
      ctx.bezierCurveTo(-length * 0.45, -width * 0.72, width, -width, length, 0);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(0.12 + glow * 0.5) * fade})`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${glow * 0.65})`;
      ctx.shadowBlur = 6 + glow * 12;
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;
      return;
    }

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(point.x, point.y, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.dotColor, 0.22 * fade);
    ctx.fill();
  }

  // --- Main Animation Core Render ---
  function draw() {
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

    ctx.fillStyle = config.background;
    ctx.fillRect(0, 0, width, height);

    drawTrail();

    const warped = points.map((row) => row.map(warpedPoint));

    for (const row of warped) {
      strokeSmoothGridPath(row);
    }

    for (let col = 0; col < warped[0].length; col += 1) {
      const column = [];
      for (let row = 0; row < warped.length; row += 1) {
        column.push(warped[row][col]);
      }
      strokeSmoothGridPath(column);
    }

    for (const row of warped) {
      for (const point of row) {
        drawDot(point);
      }
    }

    requestAnimationFrame(draw);
  }

  // --- Interactive Interaction Inputs ---
  function setPointer(event) {
    const rect = canvas.getBoundingClientRect();
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
      trail.push({ x, y, life: 1, force: 0.35 + force * 0.65, ox: 0, oy: 0, vx: dx, vy: dy });
      if (trail.length > 24) trail.shift();
    }
  }

  function setGyroFromTilt(event) {
    if (event.gamma == null || event.beta == null) return;

    gyro.tx = Math.max(-1, Math.min(1, event.gamma / 28));
    gyro.ty = Math.max(-1, Math.min(1, event.beta / 34));
    gyro.targetEnergy = Math.max(
      gyro.targetEnergy,
      Math.min((Math.abs(gyro.tx) + Math.abs(gyro.ty)) * 0.45, 0.75)
    );
  }

  function setGyroFromMotion(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const x = acceleration.x || 0;
    const y = acceleration.y || 0;
    const force = Math.min(Math.hypot(x, y) / 18, 0.85);
    gyro.tx = Math.max(-1, Math.min(1, x / 9));
    gyro.ty = Math.max(-1, Math.min(1, y / 9));
    gyro.targetEnergy = Math.max(gyro.targetEnergy, force);
  }

  async function enableMobileMotion() {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      try {
        await DeviceMotionEvent.requestPermission();
      } catch (e) {}
    }
  }

  // --- Initialise Handlers ---
  window.addEventListener("resize", resize);

  if (!isMobile) {
    window.addEventListener("pointermove", setPointer, { passive: true });
    window.addEventListener("pointerdown", function (event) {
      enableMobileMotion();
      setPointer(event);
    }, { passive: true });
    window.addEventListener("pointerleave", function () {
      pointer.active = false;
      pointer.targetEnergy = 0;
    });
    window.addEventListener("deviceorientation", setGyroFromTilt, { passive: true });
    window.addEventListener("devicemotion", setGyroFromMotion, { passive: true });
  }

  resize();
  requestAnimationFrame(draw);
})();
