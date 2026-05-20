import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "default" | "narrow" | "wide";
};

const sizeMap = {
  default: "max-w-[1280px]",
  narrow: "max-w-[920px]",
  wide: "max-w-[1440px]",
};

export function Container({
  children,
  size = "default",
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        sizeMap[size],
        "mx-auto px-6 sm:px-6 md:px-6",
        className
      )}
      style={{ paddingInline: "clamp(20px, 4vw, 24px)" }}
      {...rest}
    >
      {children}
    </div>
  );
}
