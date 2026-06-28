import React from "react";
import { cn } from "@/lib/utils";

interface TabletMockupProps {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function TabletMockup({ children, className, bodyClassName }: TabletMockupProps) {
  return (
    <div className={cn("w-[90%] max-w-[600px] aspect-[4/3] rounded-3xl border-[6px] border-black/10 dark:border-white/10 bg-[var(--color-surface)] shadow-lg mx-auto overflow-hidden relative flex flex-col", className)}>
      {/* Front Camera */}
      <div className="absolute left-0 inset-y-0 flex items-center justify-start z-20 pl-2">
        <div className="w-1.5 h-1.5 bg-black/20 dark:bg-white/20 rounded-full" />
      </div>
      
      {/* Screen Area */}
      <div className={cn("flex-1 overflow-hidden relative flex flex-col", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
