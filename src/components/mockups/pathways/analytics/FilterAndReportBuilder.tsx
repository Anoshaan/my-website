import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function FilterAndReportBuilder() {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/9]" bodyClassName="bg-[var(--color-bg)] flex">
      {/* Sidebar Filter */}
      <div className="w-64 h-full border-r border-[var(--color-line)] bg-[var(--color-surface)] flex flex-col p-5 shrink-0 shadow-sm z-10">
        <div className="h-4 w-32 bg-[var(--color-fg)] rounded-sm opacity-90 mb-6" />
        
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col gap-3">
              <div className="h-3 w-20 bg-[var(--color-fg)] rounded-sm opacity-70" />
              <div className="h-10 w-full bg-[var(--color-surface-2)] border border-[var(--color-line)] rounded-md flex items-center px-3 justify-between">
                <div className="h-2 w-16 bg-[var(--color-fg)] rounded-sm opacity-60" />
                <div className="w-3 h-3 border-b-2 border-r-2 border-[var(--color-line)] transform rotate-45 mr-1" />
              </div>
            </div>
          ))}
          
          <div className="mt-auto h-10 w-full bg-[var(--color-fg)] rounded-md flex items-center justify-center">
            <div className="h-3 w-24 bg-[var(--color-bg)] rounded-sm opacity-90" />
          </div>
        </div>
      </div>
      
      {/* Main Report Area */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
         <div className="flex justify-between items-center mb-2">
            <div className="h-5 w-48 bg-[var(--color-fg)] rounded-sm opacity-90" />
            <div className="h-8 w-24 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md flex items-center justify-center">
              <div className="h-2 w-12 bg-[var(--color-fg)] rounded-sm opacity-60" />
            </div>
         </div>
         
         <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl flex-1 flex flex-col overflow-hidden shadow-sm">
           <div className="h-12 border-b border-[var(--color-line)] bg-[var(--color-surface-2)] flex items-center px-4 gap-4">
             <div className="w-6 h-6 rounded border border-[var(--color-line)] bg-[var(--color-surface)]" />
             <div className="h-2 w-32 bg-[var(--color-line)] rounded-sm" />
             <div className="h-2 w-20 bg-[var(--color-line)] rounded-sm ml-auto" />
             <div className="h-2 w-24 bg-[var(--color-line)] rounded-sm" />
             <div className="h-2 w-16 bg-[var(--color-line)] rounded-sm" />
           </div>
           
           <div className="flex-1 flex flex-col">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="h-14 border-b border-[var(--color-line)] flex items-center px-4 gap-4 hover:bg-[var(--color-surface-2)]">
                 <div className="w-6 h-6 rounded border border-[var(--color-line)]" />
                 <div className="h-3 w-32 bg-[var(--color-fg)] rounded-sm opacity-80" />
                 <div className="h-2 w-20 bg-[var(--color-line)] rounded-sm ml-auto opacity-60" />
                 <div className="h-2 w-24 bg-[var(--color-line)] rounded-sm opacity-60" />
                 <div className="h-2 w-16 bg-emerald-500 rounded-sm opacity-80" />
               </div>
             ))}
           </div>
         </div>
      </div>
    </MockupFrame>
  );
}
