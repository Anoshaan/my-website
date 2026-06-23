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
  const [src, setSrc] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(prefersReduced);
    if (prefersReduced) return;

    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari =
      /safari/i.test(ua) &&
      !/chrome|chromium|crios|android|edg|fxios|opr/i.test(ua);

    setSrc(
      isIOS || isSafari
        ? "/videos/about-character-fallback.mp4"
        : "/videos/about-character-alpha.webm"
    );
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (v && src) {
      // Autoplay can be rejected silently on some setups; ignore the promise.
      v.play().catch(() => {});
    }
  }, [src]);

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
      src={reduced ? undefined : src ?? undefined}
    />
  );
}
