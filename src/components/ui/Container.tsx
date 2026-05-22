import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /**
   * Container width preset.
   * - narrow: text-heavy sections
   * - default: main content
   * - wide: edge-to-edge content
   */
  size?: "default" | "narrow" | "wide";
};

/**
 * Container — fluid max-width that scales to use ultrawide / 2K / 4K space.
 *
 * Uses min() (not clamp with high mins) so it NEVER overflows narrower screens.
 * - default: 92vw, capped at 2100px on huge screens
 * - narrow: 72vw, capped at 1100px
 * - wide:   95vw, capped at 2400px
 */
export function Container({
  children,
  size = "default",
  className,
  ...rest
}: ContainerProps) {
  const widthByPreset: Record<NonNullable<ContainerProps["size"]>, string> = {
    narrow: "min(1100px, 72vw)",
    default: "min(2100px, 92vw)",
    wide: "min(2400px, 95vw)",
  };

  return (
    <div
      className={cn("mx-auto w-full", className)}
      style={{
        maxWidth: widthByPreset[size],
        paddingInline: "clamp(20px, 3.5vw, 48px)",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
