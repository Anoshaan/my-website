"use client";
import React from "react";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Animation duration in seconds (lower = faster). */
  duration?: number;
  /** Direction of scroll. */
  direction?: "ltr" | "rtl";
  /** Pause on hover. */
  pauseOnHover?: boolean;
  /**
   * How many copies of the children to render. Higher = guaranteed
   * coverage on ultra-wide monitors with no empty space.
   * Default 4 — works up to 5K screens with current card widths.
   */
  repeat?: number;
  className?: string;
};

/**
 * Marquee — pure CSS infinite scroll, no empty space.
 *
 * Renders `repeat` copies of the children inline (no wrapper) so they
 * all participate in the flex layout with consistent spacing.
 * Translates by exactly 1/repeat over the duration → seamless loop.
 */
export function Marquee({
  children,
  duration = 60,
  direction = "ltr",
  pauseOnHover = true,
  repeat = 4,
  className,
}: MarqueeProps) {
  const items = Children.toArray(children);
  const translatePercent = -100 / repeat;

  return (
    <div
      className={cn(
        "marquee-row",
        pauseOnHover && "marquee-pause-hover",
        className
      )}
      data-dir={direction}
      style={
        {
          ["--marquee-duration" as never]: `${duration}s`,
          ["--marquee-translate" as never]: `${translatePercent}%`,
        } as React.CSSProperties
      }
    >
      <div className="marquee-track">
        {Array.from({ length: repeat }).flatMap((_, copyIdx) =>
          items.map((child, itemIdx) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                key: `${copyIdx}-${itemIdx}`,
                "aria-hidden": copyIdx === 0 ? undefined : true,
              } as React.HTMLAttributes<HTMLElement> & { key: string });
            }
            return (
              <span key={`${copyIdx}-${itemIdx}`}>{child}</span>
            );
          })
        )}
      </div>
    </div>
  );
}
