"use client";

import { useEffect, useState } from "react";

/**
 * Transparent looping portrait for the About hero.
 *
 *   Chrome / Edge / Firefox / Android   -> VP9-alpha WebM (<video>), animated.
 *   Safari (desktop) + every iOS browser -> static transparent PNG (<img>).
 *
 * WebKit cannot decode alpha WebM, and the animated alpha WebP it would
 * otherwise fall back to is too heavy to decode smoothly on iOS (it stutters
 * and renders frame-by-frame) and can composite onto an opaque black box.
 * A smooth transparent VIDEO on Safari/iOS requires HEVC-with-alpha, which
 * can't be encoded on this toolchain, so Apple devices get the clean,
 * guaranteed-transparent still portrait instead: no black box, no stutter,
 * instant. Animation stays on every browser where it plays well.
 *
 * Source selection is runtime-only, so exactly one asset downloads per device.
 * SSR and the first client render both show the transparent PNG, so there is no
 * black-box flash and no hydration mismatch.
 */

type Mode = "pending" | "video" | "png" | "reduced";

const POSTER = "/videos/about-poster-2026-v2.png"; // 720x720 true-RGBA, transparent
const ALPHA_WEBM = "/videos/about-2026-v2.webm"; // VP9 alpha (non-WebKit only)

export function AlphaVideo() {
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("reduced");
      return;
    }

    const ua = navigator.userAgent;
    // iPhone/iPad (incl. iPadOS reporting as desktop Safari) + any genuine
    // Safari/WebKit build (Apple vendor, not Chrome/Edge/Firefox-on-iOS).
    const isIOS =
      /iP(hone|ad|od)/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari =
      /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua) &&
      /apple/i.test(navigator.vendor || "");

    // Apple/WebKit -> guaranteed-transparent static PNG. Everyone else -> WebM.
    setMode(isIOS || isSafari ? "png" : "video");
  }, []);

  // Static transparent portrait: SSR / pre-detection, reduced motion, Apple
  // devices, or a WebM load failure. The PNG carries its own alpha, so the
  // background always stays clear.
  if (mode === "pending" || mode === "reduced" || mode === "png") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- alpha PNG, intentional <img>
      <img className="about-alpha-video" src={POSTER} alt="" aria-hidden="true" />
    );
  }

  return (
    <video
      className="about-alpha-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={POSTER}
      aria-hidden="true"
      // Any WebM load/decode failure falls back to the transparent still.
      onError={() => setMode("png")}
    >
      <source src={ALPHA_WEBM} type="video/webm" />
    </video>
  );
}
