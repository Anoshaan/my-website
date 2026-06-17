"use client";

/**
 * BrandMark — the "brand mark builder" for the Brand hero. Abstract
 * fragments of an identity (a grid, color chips, type blocks, a UI
 * fragment, a motion path) snap into alignment inside a forming frame.
 * It suggests an identity coming together without ever drawing a fake
 * logo. A couple of elements keep a subtle drift so the composition
 * stays alive. Pure CSS; frozen to its assembled state under reduced
 * motion (see brand.css).
 */
export function BrandMark() {
  return (
    <div className="br-mark" aria-hidden>
      <div className="br-mark-frame">
        {/* Alignment grid that fades up underneath. */}
        <span className="br-mark-grid" />

        {/* Type blocks — a wordmark forming, not real letters. */}
        <span className="br-mark-type br-mark-type--1" />
        <span className="br-mark-type br-mark-type--2" />

        {/* Color chips snapping into a row. */}
        <span className="br-mark-chip br-mark-chip--1" />
        <span className="br-mark-chip br-mark-chip--2" />
        <span className="br-mark-chip br-mark-chip--3" />
        <span className="br-mark-chip br-mark-chip--4" />

        {/* A small UI fragment. */}
        <span className="br-mark-ui">
          <span className="br-mark-ui-bar" />
          <span className="br-mark-ui-dot" />
        </span>

        {/* Floating geometric marks that keep drifting. */}
        <span className="br-mark-shape br-mark-shape--ring" />
        <span className="br-mark-shape br-mark-shape--tri" />

        {/* A motion path that draws across the frame. */}
        <svg className="br-mark-path" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M6 78 C 28 78, 30 40, 52 40 S 78 20, 94 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
