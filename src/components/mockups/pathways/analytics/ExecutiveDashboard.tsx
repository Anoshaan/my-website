import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function ExecutiveDashboard() {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-surface-2)] flex flex-col">
      <div className="h-14 border-b border-[var(--color-line)] bg-[var(--color-surface)] flex items-center px-6 justify-between shrink-0">
        <div className="flex gap-4 items-center">
          <div className="h-4 w-24 bg-[var(--color-fg)] rounded-sm opacity-90" />
          <div className="flex gap-2 border-l border-[var(--color-line)] pl-4">
            <div className="h-3 w-16 bg-[var(--color-fg)] rounded-sm opacity-40" />
            <div className="h-3 w-16 bg-[var(--color-fg)] rounded-sm opacity-40" />
            <div className="h-3 w-16 bg-[var(--color-fg)] rounded-sm opacity-80" />
          </div>
        </div>
        <div className="flex gap-3">
           <div className="h-8 w-8 bg-[var(--color-surface-2)] rounded-full border border-[var(--color-line)]" />
           <div className="h-8 w-8 bg-blue-500 rounded-full" />
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-line)] p-4 flex flex-col gap-3 shadow-sm">
               <div className="flex justify-between items-center">
                 <div className="h-3 w-16 bg-[var(--color-line)] rounded-sm opacity-80" />
                 <div className="h-4 w-4 bg-[var(--color-line)] rounded-full opacity-40" />
               </div>
               <div className="h-8 w-24 bg-[var(--color-fg)] rounded-sm opacity-90" />
               <div className="h-2 w-32 bg-emerald-500 rounded-sm opacity-20 relative overflow-hidden">
                 <div className="absolute left-0 inset-y-0 bg-emerald-500 w-[60%]" />
               </div>
             </div>
           ))}
        </div>
        
        <div className="flex gap-4 flex-1 min-h-[250px]">
          <div className="flex-[2] bg-[var(--color-surface)] rounded-xl border border-[var(--color-line)] p-5 flex flex-col shadow-sm">
             <div className="h-4 w-32 bg-[var(--color-fg)] rounded-sm opacity-80 mb-6" />
             <div className="flex-1 border-b border-l border-[var(--color-line)] relative flex items-end justify-between px-4 pb-0 pt-8">
               {/* Grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                 <div className="border-t border-[var(--color-line)] w-full opacity-30" />
                 <div className="border-t border-[var(--color-line)] w-full opacity-30" />
                 <div className="border-t border-[var(--color-line)] w-full opacity-30" />
                 <div className="border-t border-[var(--color-line)] w-full opacity-30" />
               </div>
               {/* Bars */}
               {[40, 60, 30, 80, 50, 90, 70, 40, 85].map((h, i) => (
                 <div key={i} className="w-10 bg-blue-500 rounded-t-sm z-10" style={{ height: `${h}%` }} />
               ))}
             </div>
          </div>
          <div className="flex-[1] bg-[var(--color-surface)] rounded-xl border border-[var(--color-line)] p-5 flex flex-col gap-4 shadow-sm">
             <div className="h-4 w-24 bg-[var(--color-fg)] rounded-sm opacity-80" />
             <div className="flex-1 rounded-full border-[16px] border-[var(--color-line)] relative flex items-center justify-center">
                <div className="absolute inset-0 border-[16px] border-blue-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)' }} />
                <div className="absolute inset-0 border-[16px] border-purple-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0 100%, 0 0)' }} />
             </div>
             <div className="flex gap-2 flex-col mt-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><div className="h-2 w-20 bg-[var(--color-fg)] opacity-60 rounded-sm" /></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /><div className="h-2 w-16 bg-[var(--color-fg)] opacity-60 rounded-sm" /></div>
             </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
