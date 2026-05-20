import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /**
   * Container width preset.
   * - narrow: text-heavy sections (~1080px max, smaller on ultrawide)
   * - default: main content (~2100px on ultrawide)
   * - wide: edge-to-edge content (~2400px on ultrawide)
   */
  size?: "default" | "narrow" | "wide";
};

/**
 * Container — fluid max-width that scales to use ultrawide / 2K / 4K space.
 * Uses CSS clamp() so the layout breathes at every viewport.
 */
export function Container({
  children,
  size = "default",
  className,
  ...rest
}: ContainerProps) {
  const widthByPreset: Record<NonNullable<ContainerProps["size"]>, string> = {
    narrow: "clamp(720px, 70vw, 1100px)",
    default: "clamp(1100px, 92vw, 2100px)",
    wide: "clamp(1200px, 95vw, 2400px)",
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
