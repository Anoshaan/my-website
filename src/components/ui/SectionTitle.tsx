import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";

type SectionTitleProps = {
  /**
   * @deprecated Eyebrows are no longer rendered for the cleaner section hierarchy.
   * Prop kept for API compatibility across existing pages.
   */
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  title,
  intro,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal delay={0.05}>
        <h2 className="text-section text-white tracking-tight">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.15}>
          <p className="text-body text-white/60 max-w-[58ch]">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
