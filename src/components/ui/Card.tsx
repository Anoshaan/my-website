import BorderGlow, { type BorderGlowProps } from "@/components/animations/BorderGlow";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = Partial<BorderGlowProps> & {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  size?: "default" | "large";
};

/**
 * Card — standard surface using BorderGlow.
 * Uses unified spacing tokens.
 */
export function Card({
  children,
  className,
  innerClassName,
  size = "default",
  ...glowProps
}: CardProps) {
  const innerPadding =
    size === "large" ? "p-8 md:p-8" : "p-6 md:p-6";

  return (
    <BorderGlow className={cn("h-full", className)} {...glowProps}>
      <div className={cn(innerPadding, "h-full flex flex-col gap-6", innerClassName)}>
        {children}
      </div>
    </BorderGlow>
  );
}
