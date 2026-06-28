import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function ManagerApproval() {
  return (
    <MockupFrame className="max-w-3xl aspect-video" bodyClassName="bg-[var(--color-bg)] flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-32 bg-[var(--color-fg)] rounded-sm opacity-90" />
          <div className="h-3 w-48 bg-[var(--color-line)] rounded-sm opacity-60" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md" />
          <div className="h-8 w-24 bg-[var(--color-fg)] rounded-md" />
        </div>
      </div>
      
      <div className="flex-1 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl overflow-hidden flex flex-col">
        <div className="h-10 border-b border-[var(--color-line)] bg-[var(--color-surface-2)] flex items-center px-4 gap-4">
          <div className="h-2 w-4 bg-[var(--color-line)] rounded-sm" />
          <div className="h-2 w-32 bg-[var(--color-line)] rounded-sm" />
          <div className="h-2 w-20 bg-[var(--color-line)] rounded-sm ml-auto" />
          <div className="h-2 w-24 bg-[var(--color-line)] rounded-sm" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-[var(--color-line)]">
              <div className="w-4 h-4 rounded border border-[var(--color-line)]" />
              <div className="w-8 h-8 rounded-full bg-[var(--color-line)] opacity-30" />
              <div className="flex flex-col gap-1">
                <div className="h-3 w-24 bg-[var(--color-fg)] rounded-sm opacity-80" />
                <div className="h-2 w-16 bg-[var(--color-line)] rounded-sm opacity-60" />
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="h-3 w-12 bg-[var(--color-fg)] rounded-sm opacity-60" />
                <div className="flex gap-2">
                  <div className="h-7 w-16 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center text-[10px] font-medium border border-red-500/20">Reject</div>
                  <div className="h-7 w-20 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-medium border border-emerald-500/20">Approve</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}
