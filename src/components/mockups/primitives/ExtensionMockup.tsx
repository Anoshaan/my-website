import React from "react";
import { cn } from "@/lib/utils";

interface ExtensionMockupProps {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  extensionName?: string;
}

export function ExtensionMockup({ children, className, bodyClassName, extensionName = "Extension" }: ExtensionMockupProps) {
  return (
    <div className={cn("w-[280px] rounded-xl border border-[var(--color-line)] shadow-xl bg-[var(--color-surface)] flex flex-col overflow-hidden mx-auto absolute right-4 top-4", className)}>
      {/* Extension Header */}
      <div className="h-10 px-3 border-b border-[var(--color-line)] flex items-center justify-between bg-[var(--color-surface-2)]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-black/10 dark:bg-white/10 flex items-center justify-center text-[8px] font-bold">
            E
          </div>
          <span className="text-xs font-medium tracking-tight">{extensionName}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
        </div>
      </div>
      
      {/* Content Area */}
      <div className={cn("p-4 relative", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
