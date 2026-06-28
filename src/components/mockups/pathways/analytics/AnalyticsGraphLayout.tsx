import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function AnalyticsGraphLayout() {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/9]" bodyClassName="bg-[var(--color-bg)] p-6">
      <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl h-full flex flex-col p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8">
           <div className="flex flex-col gap-2">
             <div className="h-5 w-40 bg-[var(--color-fg)] rounded-sm opacity-90" />
             <div className="h-3 w-64 bg-[var(--color-line)] rounded-sm opacity-60" />
           </div>
           <div className="flex gap-2">
             <div className="h-8 w-24 bg-[var(--color-surface-2)] border border-[var(--color-line)] rounded-md flex items-center justify-center">
               <div className="h-2 w-12 bg-[var(--color-fg)] rounded-sm opacity-60" />
             </div>
           </div>
        </div>
        
        <div className="flex-1 relative border-b border-l border-[var(--color-line)] flex items-end">
           {/* Grid */}
           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="border-t border-[var(--color-line)] w-full opacity-30" />
             ))}
           </div>
           
           {/* SVG Line Graph */}
           <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
             <path 
               d="M 0,80 Q 50,20 100,50 T 200,40 T 300,90 T 400,20 T 500,60 T 600,10" 
               fill="none" 
               stroke="var(--color-fg)" 
               strokeWidth="3" 
               className="text-blue-500 opacity-80" 
               vectorEffect="non-scaling-stroke"
             />
             <path 
               d="M 0,100 Q 50,60 100,80 T 200,70 T 300,110 T 400,50 T 500,90 T 600,40" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="2" 
               className="text-purple-500 opacity-50" 
               vectorEffect="non-scaling-stroke"
             />
           </svg>
           
           {/* X-Axis labels */}
           <div className="absolute -bottom-6 inset-x-0 flex justify-between px-4">
             {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(m => (
               <div key={m} className="text-[10px] font-medium opacity-40">{m}</div>
             ))}
           </div>
        </div>
      </div>
    </MockupFrame>
  );
}
