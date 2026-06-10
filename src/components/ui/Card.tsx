"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Adds a lift on hover. */
  lift?: boolean;
  /** Padding scale. */
  size?: "default" | "large" | "compact";
};

/**
 * Card — a floating glass panel with pointer-tracked 3D tilt.
 *
 * On pointer move it writes --rx / --ry (rotation) and --mx / --my
 * (sheen position) so the panel reads as a real surface lifting off
 * the page. Reduced-motion / touch users get a flat, static card
 * (handled in CSS). Shared primitive — systems, craft, and the about
 * timeline all inherit this behaviour.
 */
export function Card({
  children,
  className,
  innerClassName,
  lift = true,
  size = "default",
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const padding =
    size === "large"
      ? "p-7 md:p-9"
      : size === "compact"
      ? "p-5 md:p-6"
      : "p-6 md:p-7";

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "card-surface h-full flex flex-col gap-4",
        padding,
        lift && "card-lift",
        className,
        innerClassName
      )}
    >
      <span className="card-sheen" aria-hidden />
      <div className="card-inner">{children}</div>
    </div>
  );
}
