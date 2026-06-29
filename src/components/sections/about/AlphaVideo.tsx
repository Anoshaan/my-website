"use client";

import { useEffect, useState } from "react";

/**
 * Transparent looping portrait for the About hero. True transparency on every
 * device, no opaque box behind the character:
 *
 *   Chrome / Edge / Firefox / Android  -> VP9 alpha WebM (<video>).
 *   Safari (desktop) + every iOS browser -> animated WebP with a real alpha
 *     channel (<img>). Safari/WebKit cannot decode alpha in WebM, so the .webm
 *     would otherwise paint the portrait on a solid black box. The animated WebP
 *     keeps full transparency and loops natively.
 *
 * The source is chosen at runtime, so exactly one asset is ever downloaded.
 * Until the browser is known (and under prefers-reduced-motion) the transparent
 * poster frame is shown, so there is never a black-box flash and SSR stays
 * deterministic.
 *
 * Safety net: if the <video> ever fails to load the WebM (any browser, any
 * reason, including a WebKit variant that slips past detection), its onError
 * swaps to the alpha WebP. So there is no path that ends on an opaque box.
 */

type Mode = "pending" | "video" | "image" | "reduced";

export function AlphaVideo() {
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("reduced");
      return;
    }

    const ua = navigator.userAgent;
    // iPhone/iPad (incl. iPadOS reporting as desktop Safari) + any browser that
    // is genuinely Safari/WebKit (Apple vendor, not Chrome/Edge/Firefox on iOS).
    const isIOS =
      /iP(hone|ad|od)/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari =
      /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua) &&
      /apple/i.test(navigator.vendor);

    setMode(isIOS || isSafari ? "image" : "video");
  }, []);

  // Transparent poster frame: shown before detection resolves and for reduced
  // motion. The PNG has its own alpha, so the background stays clear.
  if (mode === "pending" || mode === "reduced") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="about-alpha-video"
        src="/videos/about-character-poster.png"
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (mode === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="about-alpha-video"
        src="/videos/about-master2-alpha.webp"
        alt=""
        aria-hidden="true"
      />
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
      poster="/videos/about-character-poster.png"
      aria-hidden="true"
      // If the WebM cannot load/decode for any reason, fall back to the alpha
      // WebP so we never end up on an opaque box.
      onError={() => setMode("image")}
    >
      <source src="/videos/about-master2.webm" type="video/webm" />
    </video>
  );
}
