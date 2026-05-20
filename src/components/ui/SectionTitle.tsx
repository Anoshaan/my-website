import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal as="span" duration={0.6}>
          <span className="text-eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-section text-white">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.15}>
          <p className="text-body text-white/60 max-w-[62ch]">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
