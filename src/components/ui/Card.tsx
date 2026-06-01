import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Adds a lift on hover. */
  lift?: boolean;
  /** Padding scale (kept for API compatibility; minimal vertical padding now). */
  size?: "default" | "large" | "compact";
};

/**
 * Card — typographic content block. No border, no fill, no shadow.
 * Spacing only. Keeps the same API so callers don't have to change.
 */
export function Card({
  children,
  className,
  innerClassName,
  lift = true,
  size = "default",
}: CardProps) {
  const padding =
    size === "large"
      ? "py-3 md:py-4"
      : size === "compact"
      ? "py-2 md:py-3"
      : "py-2 md:py-3";

  return (
    <div
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
