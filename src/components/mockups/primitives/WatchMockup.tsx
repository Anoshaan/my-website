import React from "react";
import { cn } from "@/lib/utils";

interface WatchMockupProps {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function WatchMockup({ children, className, bodyClassName }: WatchMockupProps) {
  return (
    <div className={cn("w-[160px] h-[190px] rounded-[2.5rem] border-8 border-black/10 dark:border-white/10 bg-[var(--color-surface)] shadow-xl mx-auto overflow-hidden relative flex flex-col justify-center", className)}>
      <div className={cn("flex-1 overflow-hidden relative flex flex-col p-3", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
