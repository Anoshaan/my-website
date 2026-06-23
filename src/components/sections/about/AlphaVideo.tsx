"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Transparent looping portrait for the About hero.
 *
 * Chrome / Edge / Firefox / Android  -> VP9 alpha WebM (true transparency).
 * Safari (desktop) + every iOS browser -> H.264 MP4 with the light page
 *   background baked in. Safari/WebKit cannot render alpha in WebM, so it
 *   would otherwise show the portrait on an opaque black box. Source is
 *   chosen at runtime so exactly one file is ever downloaded.
 *
 * Respects prefers-reduced-motion: when set, nothing autoplays and only the
 * poster frame is shown.
 */
export function AlphaVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(prefersReduced);
  }, []);

  return (
    <video
      ref={ref}
      className="about-alpha-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/videos/about-character-poster.png"
      aria-hidden="true"
    >
      {!reduced && <source src="/videos/about-master2.webm" type="video/webm" />}
    </video>
  );
}
