"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import "./ScrollingImage.css";

/**
 * ScrollingImage — frames a real screenshot inside the Labs media slot.
 * The image itself is pinned at the top of the frame — no vertical pan,
 * no scene fade. Interactivity comes from an overlay:
 *
 *   - "web"    : a cursor that travels between two waypoints and clicks.
 *   - "mobile" : a touch ripple that taps a fixed point on the screen.
 *
 * Pauses while off-screen via IntersectionObserver. Respects
 * `prefers-reduced-motion`.
 */

type Props = {
  src: string;
  alt: string;
  orientation: "web" | "mobile";
  /** Cursor travel waypoints (web), as % of frame. Default goes from
   *  lower-left to upper-right, hinting at a click on a CTA / button. */
  cursorFrom?: [number, number];
  cursorTo?: [number, number];
  /** Touch ripple position (mobile), as % of frame. */
  touchAt?: [number, number];
};

export function ScrollingImage({
  src,
  alt,
  orientation,
  cursorFrom = [22, 70],
  cursorTo = [72, 32],
  touchAt = [50, 64],
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-idle", !entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (orientation === "mobile") {
    const style = {
      "--tx": `${touchAt[0]}%`,
      "--ty": `${touchAt[1]}%`,
    } as CSSProperties;
    return (
      <div
        ref={rootRef}
        className="scroll-mock scroll-mock--mobile"
        aria-hidden="true"
      >
        <div className="scroll-mock-stage">
          <div className="scroll-mock-phone">
            <div className="scroll-mock-phone-notch" />
            <div className="scroll-mock-phone-screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scroll-mock-img scroll-mock-img--mobile"
                src={src}
                alt={alt}
                draggable={false}
              />
              <span className="scroll-mock-tap" style={style} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cursorStyle = {
    "--cx1": `${cursorFrom[0]}%`,
    "--cy1": `${cursorFrom[1]}%`,
    "--cx2": `${cursorTo[0]}%`,
    "--cy2": `${cursorTo[1]}%`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="scroll-mock scroll-mock--web"
      aria-hidden="true"
    >
      <div className="scroll-mock-browser">
        <div className="scroll-mock-browser-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="scroll-mock-browser-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="scroll-mock-img scroll-mock-img--web"
            src={src}
            alt={alt}
            draggable={false}
          />
          <div className="scroll-mock-click-host" style={cursorStyle}>
            <span className="scroll-mock-click" />
          </div>
          <div className="scroll-mock-cursor" style={cursorStyle}>
            <svg viewBox="0 0 16 16">
              <path
                d="M3 2.5l10 4.5-4.2 1.5L6.8 12.5z"
                fill="#ffffff"
                stroke="#0a0c12"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
