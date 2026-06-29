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
      return;
    }
    const reveal = () => setInView(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(host);
    // Safety net: IntersectionObserver only delivers while the page is being
    // rendered, so a tab that loads in the background can starve it. Mount
    // anyway after a short delay so a card is never permanently blank — the
    // embeds animate once and settle, so a late mount stays cheap.
    const fallback = window.setTimeout(reveal, 2500);
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
          }}
        />
      )}
    </div>
  );
}
