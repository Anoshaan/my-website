import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function AIInsightPanel() {
  return (
    <MockupFrame className="max-w-md h-[600px]" bodyClassName="bg-[var(--color-bg)] flex flex-col relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-fg) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      <div className="h-16 border-b border-[var(--color-line)] bg-[var(--color-surface)] flex items-center px-5 shrink-0 z-10 shadow-sm">
        <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center mr-3 border border-blue-500/20">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <div className="h-4 w-32 bg-[var(--color-fg)] rounded-sm opacity-90" />
      </div>
      
      <div className="flex-1 p-5 flex flex-col gap-6 overflow-y-auto z-10">
        {/* Insight Card */}
        <div className="bg-[var(--color-surface)] border border-blue-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          <div className="flex gap-2 mb-4 items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <div className="h-3 w-40 bg-[var(--color-fg)] rounded-sm opacity-80" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-2 w-full bg-[var(--color-line)] rounded-sm opacity-80" />
            <div className="h-2 w-full bg-[var(--color-line)] rounded-sm opacity-80" />
            <div className="h-2 w-3/4 bg-[var(--color-line)] rounded-sm opacity-80" />
          </div>
          
          <div className="mt-5 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg flex justify-between items-center">
            <div className="flex flex-col gap-1.5">
              <div className="h-2 w-24 bg-[var(--color-fg)] rounded-sm opacity-60" />
              <div className="h-4 w-16 bg-[var(--color-fg)] rounded-sm opacity-90 text-blue-500" />
            </div>
            <div className="w-10 h-10 rounded-full border-[3px] border-blue-500/20 border-t-blue-500 flex items-center justify-center" />
          </div>
        </div>
        
        {/* Recommended Actions */}
        <div className="flex flex-col gap-3 mt-2">
           <div className="h-3 w-32 bg-[var(--color-fg)] rounded-sm opacity-70 mb-1" />
           {[1, 2].map(i => (
             <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-lg p-4 flex items-center justify-between hover:border-[var(--color-fg)]/30 transition-colors">
               <div className="flex gap-3 items-center">
                 <div className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center border border-[var(--color-line)]">
                   <div className="w-3 h-3 bg-[var(--color-fg)] opacity-40 rounded-[2px]" />
                 </div>
                 <div className="flex flex-col gap-1">
                   <div className="h-3 w-32 bg-[var(--color-fg)] rounded-sm opacity-80" />
                   <div className="h-2 w-20 bg-[var(--color-line)] rounded-sm opacity-60" />
                 </div>
               </div>
               <div className="h-6 w-16 bg-[var(--color-fg)] rounded-full opacity-10 flex items-center justify-center" />
             </div>
           ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-[var(--color-line)] bg-[var(--color-surface)] shrink-0 z-10">
        <div className="h-10 w-full rounded-full bg-[var(--color-surface-2)] border border-[var(--color-line)] px-4 flex items-center justify-between">
          <div className="h-2 w-32 bg-[var(--color-fg)] rounded-sm opacity-40" />
          <div className="w-6 h-6 rounded-full bg-[var(--color-fg)] opacity-90 flex items-center justify-center" />
        </div>
      </div>
    </MockupFrame>
  );
}
