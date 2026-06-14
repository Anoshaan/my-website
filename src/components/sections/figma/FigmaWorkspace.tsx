"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./FigmaWorkspace.css";

/**
 * FigmaWorkspace — a self-contained, fixed-size (1100×680) recreation of
 * a dark Figma editor used as the cinematic visual for Section 2. A
 * looping "You" cursor travels the editor making small, believable
 * design edits (resizing the hero title, recolouring the character),
 * driven by Framer Motion so it matches the site's motion system rather
 * than the source HTML's GSAP.
 */

const CARD_W = 1100;
const CARD_H = 680;

type Frame = {
  x: number; // % of card width
  y: number; // % of card height
  dur: number; // ms to hold before advancing
  editing: null | "title" | "size" | "graphic" | "color" | "layer";
  press?: boolean;
  size?: number; // hero title px
  color?: "blue" | "purple";
};

// One full design pass. Travel frames move the cursor; the following
// "click" frame applies the edit so it reads as cause → effect.
const FRAMES: Frame[] = [
  { x: 50, y: 116, dur: 700, editing: null },
  { x: 36, y: 42, dur: 1100, editing: null },
  { x: 36, y: 42, dur: 950, editing: "title", press: true },
  { x: 90, y: 30, dur: 1100, editing: null },
  { x: 90, y: 30, dur: 1000, editing: "size", press: true, size: 52 },
  { x: 60, y: 50, dur: 1200, editing: null },
  { x: 60, y: 50, dur: 950, editing: "graphic", press: true },
  { x: 88, y: 47, dur: 1100, editing: null },
  { x: 88, y: 47, dur: 1100, editing: "color", press: true, color: "purple" },
  { x: 11, y: 40, dur: 1200, editing: null },
  { x: 11, y: 40, dur: 900, editing: "layer", press: true },
  { x: 50, y: 116, dur: 1000, editing: null, size: 40, color: "blue" },
];

const COLORS = {
  blue: { hex: "0D99FF", css: "#0D99FF", core: "#333" },
  purple: { hex: "A020F0", css: "#A020F0", core: "#4A154B" },
};

export function FigmaWorkspace() {
  const reduced = useReducedMotion();
  const [frameIndex, setFrameIndex] = useState(0);
  const [size, setSize] = useState(40);
  const [color, setColor] = useState<"blue" | "purple">("blue");

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const advance = () => {
      const f = FRAMES[i];
      setFrameIndex(i);
      if (f.size !== undefined) setSize(f.size);
      if (f.color !== undefined) setColor(f.color);
      timer = setTimeout(() => {
        i = (i + 1) % FRAMES.length;
        advance();
      }, f.dur);
    };
    advance();
    return () => clearTimeout(timer);
  }, [reduced]);

  const frame = reduced ? null : FRAMES[frameIndex];
  const editing = frame?.editing ?? null;
  const c = COLORS[color];

  return (
    <div className="fw-card" aria-hidden>
      {/* Window titlebar */}
      <div className="fw-titlebar">
        <div className="fw-titlebar-left">
          <span style={{ fontSize: 13 }}>⌂</span>
          <span className="fw-tab">
            <span className="fw-tab-dot">❖</span> Lead UI/UX Portfolio
            <span style={{ fontSize: 9, marginLeft: 6 }}>✕</span>
          </span>
          <span>+</span>
        </div>
        <div className="fw-win-dots">
          <span>‐</span>
          <span>□</span>
          <span>✕</span>
        </div>
      </div>

      {/* Toolbar */}
      <header className="fw-header">
        <div className="fw-header-left">
          <span className="fw-burger">☰</span>
          <div>
            <div className="fw-project-title">
              Portfolio v2.0 <span style={{ fontSize: 9 }}>▼</span>
            </div>
            <div className="fw-project-sub">
              Team project <span className="fw-badge">Pro</span>
            </div>
          </div>
        </div>
        <div className="fw-header-right">
          <span className="fw-avatar">You</span>
          <span style={{ color: "var(--fw-muted)" }}>▷</span>
          <button className="fw-share" type="button">
            Share
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="fw-body">
        {/* Left — layer tree */}
        <aside className="fw-sidebar">
          <div className="fw-sb-section">
            <div className="fw-sb-header">Layers</div>
            <div className="fw-layer">
              <span className="fw-layer-icon">#</span> Desktop Viewport
            </div>
            <div className="fw-layer fw-i1">
              <span className="fw-layer-icon">#</span> Navigation Bar
            </div>
            <div className="fw-layer fw-i2">
              <span className="fw-layer-icon">T</span> Logo Mark
            </div>
            <div className="fw-layer fw-i1 is-active">
              <span className="fw-layer-icon">#</span> Hero Section
            </div>
            <div className="fw-layer fw-i2">
              <span className="fw-layer-icon">≡</span> Content Block
            </div>
            <div className="fw-layer fw-i3">
              <span className="fw-layer-icon">◇</span> Badge Tag
            </div>
            <div className={`fw-layer fw-i3 ${editing === "layer" ? "is-editing" : ""}`}>
              <span className="fw-layer-icon">T</span> &ldquo;Lead UI/UX Engine…&rdquo;
            </div>
            <div className="fw-layer fw-i3">
              <span className="fw-layer-icon">T</span> Description Block
            </div>
            <div className="fw-layer fw-i3">
              <span className="fw-layer-icon">≡</span> Button Auto-Layout
            </div>
            <div className="fw-layer fw-i4">
              <span className="fw-layer-icon">◇</span> Primary CTA
            </div>
            <div className={`fw-layer fw-i2 ${editing === "graphic" ? "is-editing" : ""}`}>
              <span className="fw-layer-icon">#</span> Visual Graphic
            </div>
            <div className="fw-layer fw-i3">
              <span className="fw-layer-icon">⚙</span> Character Component
            </div>
            <div className="fw-layer fw-i4">
              <span className="fw-layer-icon">◐</span> Orbit Ring
            </div>
          </div>
        </aside>

        {/* Center — canvas */}
        <main className="fw-canvas">
          <div className="fw-web">
            <nav className="fw-web-nav">
              <div className="fw-web-logo">ANTIGRAVITY</div>
              <div className="fw-web-links">
                <span className="is-on">Work</span>
                <span>Lab</span>
                <span>Profile</span>
              </div>
            </nav>
            <div className="fw-web-body">
              <div className="fw-web-content">
                <span className="fw-web-tag">M3 &amp; GSAP Integration</span>
                <h2
                  className={`fw-web-title fw-edit ${editing === "title" ? "is-editing" : ""}`}
                  style={{ fontSize: size }}
                >
                  Lead UI/UX
                  <br />
                  Engineer.
                </h2>
                <p className="fw-web-desc fw-edit">
                  <strong>8 years of experience</strong> crafting scalable
                  digital systems, leveraging <strong>AI</strong> and
                  physics-based motion to bridge static design and fluid code.
                </p>
                <div className="fw-btn-group">
                  <span className="fw-btn-primary">View Projects</span>
                  <span className="fw-btn-secondary">Resume</span>
                </div>
              </div>

              <div className={`fw-graphic fw-edit ${editing === "graphic" ? "is-editing" : ""}`}>
                <div className="fw-char">
                  <div className="fw-orbit">
                    <div className="fw-particle" />
                  </div>
                  <div className="fw-char-core" style={{ borderColor: c.core }}>
                    <div className="fw-char-screen">
                      <span
                        className="fw-eye"
                        style={{ background: c.css, boxShadow: `0 0 14px ${c.css}` }}
                      />
                      <span
                        className="fw-eye"
                        style={{ background: c.css, boxShadow: `0 0 14px ${c.css}` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* "You" cursor */}
          {!reduced && frame && (
            <motion.div
              className="fw-cursor"
              animate={{
                x: (frame.x / 100) * CARD_W,
                y: (frame.y / 100) * CARD_H,
                scale: frame.press ? 0.82 : 1,
              }}
              transition={{
                x: { type: "spring", stiffness: 55, damping: 16 },
                y: { type: "spring", stiffness: 55, damping: 16 },
                scale: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path
                  d="M1 1 L1 18 L5.5 13.5 L9 22 L12 20.8 L8.4 12.6 L14 12.6 Z"
                  fill={c.css}
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="fw-cursor-tag" style={{ background: c.css }}>
                You
              </span>
            </motion.div>
          )}
        </main>

        {/* Right — properties */}
        <aside className="fw-sidebar fw-right">
          <div className="fw-tabs-row">
            <span className="is-on">Design</span>
            <span className="is-off">Prototype</span>
          </div>
          <div className="fw-sb-section">
            <div className="fw-prop-row">
              <span className="fw-prop-strong">Text</span>
            </div>
            <div className="fw-prop-row">
              <span className="fw-prop-label">Font</span>
              <span className="fw-box" style={{ width: 120, textAlign: "left" }}>
                Inter
              </span>
            </div>
            <div className="fw-prop-row">
              <span className="fw-prop-label">Size</span>
              <span className={`fw-box ${editing === "size" ? "is-flash" : ""}`} style={{ width: 56 }}>
                {size}
              </span>
            </div>
          </div>
          <div className="fw-sb-section">
            <div className="fw-prop-row">
              <span className="fw-prop-strong">Fill</span>
            </div>
            <div className="fw-prop-row">
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="fw-swatch" style={{ background: c.css }} />
                <span>{c.hex}</span>
              </span>
              <span className={`fw-box ${editing === "color" ? "is-flash" : ""}`} style={{ width: 30 }}>
                100%
              </span>
            </div>
          </div>
          <div className="fw-sb-section">
            <div className="fw-prop-row">
              <span className="fw-prop-strong">Animation</span>
            </div>
            <div className="fw-prop-row">
              <span className="fw-prop-label">Float Y</span>
              <span className="fw-box" style={{ width: 50 }}>
                -14px
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
