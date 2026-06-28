import React from "react";
import { ExtensionMockup } from "../../primitives/ExtensionMockup";

export function ExtensionTimer() {
  return (
    <ExtensionMockup extensionName="Tracker" bodyClassName="flex flex-col gap-4">
      <div className="flex flex-col gap-1 items-center justify-center p-4 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-line)]">
        <span className="text-xs opacity-60 font-medium uppercase tracking-widest">Running</span>
        <span className="text-3xl font-light tracking-tight text-emerald-500">01:24:40</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="h-3 w-16 bg-[var(--color-line)] rounded-sm opacity-60" />
        <div className="flex justify-between items-center p-2 rounded bg-[var(--color-bg)] border border-[var(--color-line)]">
          <div className="flex flex-col gap-1">
            <div className="h-2 w-20 bg-[var(--color-fg)] rounded-sm opacity-80" />
            <div className="h-1.5 w-12 bg-[var(--color-line)] rounded-sm opacity-60" />
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
      
      <div className="flex gap-2 mt-2">
        <div className="h-9 flex-1 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-line)] flex items-center justify-center">
          <div className="w-2 h-3 bg-[var(--color-fg)] rounded-[1px] opacity-60 mx-0.5" />
          <div className="w-2 h-3 bg-[var(--color-fg)] rounded-[1px] opacity-60 mx-0.5" />
        </div>
        <div className="h-9 flex-1 rounded-md bg-[var(--color-fg)] flex items-center justify-center">
          <div className="w-3 h-3 rounded-[2px] bg-[var(--color-bg)] opacity-90" />
        </div>
      </div>
    </ExtensionMockup>
  );
}
