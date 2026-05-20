"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Animation duration in seconds (lower = faster). */
  duration?: number;
  /** Direction of scroll. */
  direction?: "ltr" | "rtl";
  /** Pause on hover. */
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Marquee — pure CSS infinite scroll.
 * Renders children twice in the track for seamless looping.
 * Pauses on hover for accessibility.
 */
export function Marquee({
  children,
  duration = 60,
  direction = "ltr",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee-row",
        pauseOnHover && "marquee-pause-hover",
        className
      )}
      data-dir={direction}
      style={{ ["--marquee-duration" as never]: `${duration}s` }}
    >
      <div className="marquee-track">
        {children}
        {/* Duplicate for seamless loop */}
        <div aria-hidden className="contents">
          {children}
        </div>
      </div>
    </div>
  );
}
