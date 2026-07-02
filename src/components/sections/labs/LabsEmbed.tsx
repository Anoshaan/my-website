"use client";

import { useEffect, useRef, useState } from "react";

/** Logical design size of the embedded HTML mockups (desktop, 16:9). */
export const EMBED_W = 1440;
export const EMBED_H = 810;

/**
 * Live interactive mockup, rendered at full desktop size then scaled to
 * fit its host so it reads as a crisp product screenshot while keeping
 * every GSAP entrance + hover interaction intact.
 *
 * Shared between the Labs showcase rows and the detailed case study
 * overlay hero.
 */
export function LabsEmbed({ src, title }: { src: string; title: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  // Only boot the iframe once its host scrolls near the viewport. Several of
  // these mount on the same page; loading them all at once is what makes the
  // page stutter. Once seen, we keep it mounted (no reload flicker on return).
  const [inView, setInView] = useState(false);
  // Awake = currently near the viewport. Far-away embeds stay mounted but get
  // display:none, so the browser stops rendering them and throttles their
  // rAF-driven GSAP/CSS loops — dozens of live mockups animating at once is
  // what made long pages feel heavy while scrolling. Toggling display on an
  // iframe does NOT reload it, so waking up is instant and flicker-free.
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => setScale(host.clientWidth / EMBED_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      setAwake(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const near = entries.some((e) => e.isIntersecting);
        setAwake(near);
        if (near) setInView(true);
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(host);
    // Safety net: IntersectionObserver only delivers while the page is being
    // rendered, so a tab that loads in the background can starve it. Mount
    // anyway (asleep) after a short delay so the iframe is loaded and ready;
    // the observer wakes it the moment it can actually be seen.
    const fallback = window.setTimeout(() => setInView(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={hostRef} className="labs-embed" aria-hidden>
      {inView && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          style={{
            width: EMBED_W,
            height: EMBED_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            display: awake ? "block" : "none",
          }}
        />
      )}
    </div>
  );
}
