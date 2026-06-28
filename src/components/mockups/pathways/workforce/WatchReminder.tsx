import React from "react";
import { WatchMockup } from "../../primitives/WatchMockup";

export function WatchReminder() {
  return (
    <WatchMockup bodyClassName="bg-[var(--color-bg)] flex flex-col justify-between items-center text-center p-4">
      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-emerald-500" />
        </div>
        <div className="h-3 w-20 bg-[var(--color-fg)] rounded-sm opacity-90 mt-1" />
        <div className="h-2 w-16 bg-[var(--color-line)] rounded-sm opacity-60" />
      </div>
      
      <div className="w-full flex flex-col gap-1.5 mt-auto">
        <div className="h-8 w-full rounded-full bg-[var(--color-surface-2)] flex items-center justify-center border border-[var(--color-line)]">
          <div className="h-2 w-12 bg-[var(--color-fg)] rounded-sm opacity-60" />
        </div>
      </div>
    </WatchMockup>
  );
}
