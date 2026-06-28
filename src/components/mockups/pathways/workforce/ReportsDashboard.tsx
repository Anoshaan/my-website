import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function ReportsDashboard() {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-bg)] flex flex-col">
      <div className="h-14 border-b border-[var(--color-line)] flex items-center px-6 shrink-0 bg-[var(--color-surface)]">
        <div className="h-4 w-32 bg-[var(--color-fg)] rounded-sm opacity-90" />
        <div className="ml-auto flex gap-2">
          <div className="h-8 w-24 bg-[var(--color-surface-2)] border border-[var(--color-line)] rounded-md flex items-center justify-center">
            <div className="h-2 w-12 bg-[var(--color-fg)] rounded-sm opacity-60" />
          </div>
          <div className="h-8 w-20 bg-[var(--color-fg)] rounded-md flex items-center justify-center">
            <div className="h-2 w-10 bg-[var(--color-bg)] rounded-sm opacity-90" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex gap-4 h-48">
          <div className="flex-1 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-5 flex flex-col justify-end gap-2 relative overflow-hidden">
            <div className="absolute top-5 left-5 h-3 w-24 bg-[var(--color-line)] rounded-sm opacity-80" />
            <div className="absolute top-10 left-5 h-6 w-16 bg-[var(--color-fg)] rounded-sm opacity-90" />
            
            <div className="flex items-end gap-2 h-20 w-full mt-auto">
              {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-[var(--color-fg)] opacity-20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="w-1/3 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-5 flex flex-col gap-4">
             <div className="h-3 w-20 bg-[var(--color-line)] rounded-sm opacity-80" />
             <div className="flex-1 rounded-full border-[12px] border-[var(--color-line)] relative overflow-hidden">
                <div className="absolute inset-0 border-[12px] border-emerald-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)' }} />
             </div>
          </div>
        </div>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl flex-1 flex flex-col overflow-hidden min-h-[200px]">
          <div className="p-4 border-b border-[var(--color-line)] flex items-center justify-between">
             <div className="h-3 w-32 bg-[var(--color-fg)] rounded-sm opacity-70" />
             <div className="h-2 w-16 bg-[var(--color-line)] rounded-sm opacity-50" />
          </div>
          <div className="p-4 flex flex-col gap-3">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-10 border-b border-[var(--color-line)] flex items-center justify-between">
                 <div className="h-2 w-24 bg-[var(--color-fg)] rounded-sm opacity-60" />
                 <div className="w-1/2 h-1.5 bg-[var(--color-line)] rounded-full overflow-hidden">
                   <div className="h-full bg-[var(--color-fg)] opacity-40 rounded-full" style={{ width: `${80 - i * 15}%` }} />
                 </div>
                 <div className="h-2 w-12 bg-[var(--color-line)] rounded-sm opacity-60" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
