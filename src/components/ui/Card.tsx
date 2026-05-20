"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
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
 * Card — original subtle dark surface with accent hover glow.
 * Tracks pointer to place a soft accent radial glow under the cursor.
 * NO mesh gradients, NO bright colors — matches the source aesthetic.
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
      ? "p-8 md:p-10"
      : size === "compact"
      ? "p-5 md:p-6"
      : "p-6 md:p-8";

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "card-surface h-full flex flex-col gap-4",
        padding,
        lift && "card-lift",
        className,
        innerClassName
      )}
    >
      {children}
    </div>
  );
}
