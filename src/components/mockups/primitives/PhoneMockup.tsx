import React from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function PhoneMockup({ children, className, bodyClassName }: PhoneMockupProps) {
  return (
    <div className={cn("w-[260px] h-[520px] rounded-[2rem] border-4 border-black/10 dark:border-white/10 bg-[var(--color-surface)] shadow-lg mx-auto overflow-hidden relative flex flex-col", className)}>
      {/* Notch / Dynamic Island */}
      <div className="absolute top-0 inset-x-0 flex justify-center z-20">
        <div className="w-[100px] h-6 bg-black/10 dark:bg-white/10 rounded-b-xl" />
      </div>
      
      {/* Phone Screen Area */}
      <div className={cn("flex-1 overflow-hidden relative flex flex-col pt-8", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
