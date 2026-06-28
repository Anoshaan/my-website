import React from "react";
import { cn } from "@/lib/utils";

interface MockupFrameProps {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function MockupFrame({ children, className, bodyClassName }: MockupFrameProps) {
  return (
    <div className={cn("w-full flex flex-col rounded-xl overflow-hidden border border-[var(--color-line)] shadow-sm bg-[var(--color-surface)]", className)}>
      {/* Browser Bar */}
      <div className="h-8 flex items-center px-4 border-b border-[var(--color-line)] bg-[var(--color-surface-2)] gap-1.5 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
      </div>
      {/* Content Area */}
      <div className={cn("flex-1 overflow-hidden relative", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
