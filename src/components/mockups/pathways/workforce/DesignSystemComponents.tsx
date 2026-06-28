import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function DesignSystemComponents() {
  return (
    <MockupFrame className="max-w-3xl aspect-[4/3]" bodyClassName="bg-[var(--color-bg)] p-8 overflow-y-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="h-4 w-32 bg-[var(--color-fg)] rounded-sm opacity-90" />
          <div className="flex gap-4">
            <div className="h-10 w-28 bg-[var(--color-fg)] rounded-md flex items-center justify-center">
              <div className="h-2 w-16 bg-[var(--color-bg)] rounded-sm opacity-90" />
            </div>
            <div className="h-10 w-28 bg-[var(--color-surface-2)] border border-[var(--color-line)] rounded-md flex items-center justify-center">
              <div className="h-2 w-16 bg-[var(--color-fg)] rounded-sm opacity-60" />
            </div>
            <div className="h-10 w-28 bg-transparent border border-transparent rounded-md flex items-center justify-center">
              <div className="h-2 w-16 bg-[var(--color-fg)] rounded-sm opacity-40" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 bg-[var(--color-fg)] rounded-sm opacity-90" />
          <div className="flex gap-3">
            <div className="h-6 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <div className="h-1.5 w-10 bg-emerald-500 opacity-80 rounded-sm" />
            </div>
            <div className="h-6 w-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <div className="h-1.5 w-10 bg-blue-500 opacity-80 rounded-sm" />
            </div>
            <div className="h-6 w-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <div className="h-1.5 w-10 bg-amber-500 opacity-80 rounded-sm" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="h-4 w-32 bg-[var(--color-fg)] rounded-sm opacity-90" />
          <div className="h-12 w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md flex items-center px-4">
            <div className="w-4 h-4 rounded-full border border-[var(--color-line)] mr-3 opacity-40" />
            <div className="h-2 w-32 bg-[var(--color-line)] rounded-sm opacity-60" />
          </div>
          <div className="h-24 w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md p-4 flex flex-col gap-2">
            <div className="h-2 w-full bg-[var(--color-line)] rounded-sm opacity-40" />
            <div className="h-2 w-full bg-[var(--color-line)] rounded-sm opacity-40" />
            <div className="h-2 w-1/2 bg-[var(--color-line)] rounded-sm opacity-40" />
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
