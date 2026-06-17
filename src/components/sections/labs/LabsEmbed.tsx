"use client";

import { useEffect, useRef, useState } from "react";

/** Logical design size of the embedded HTML mockups (desktop, 4:3). */
export const EMBED_W = 1440;
export const EMBED_H = 1080;

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

  return (
    <div ref={hostRef} className="labs-embed" aria-hidden>
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
    </div>
  );
}
