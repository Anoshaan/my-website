import React from "react";
import { PhoneMockup } from "../../primitives/PhoneMockup";

export function MobileKPISummary() {
  return (
    <PhoneMockup bodyClassName="bg-[var(--color-bg)]">
      <div className="px-5 py-4 flex items-center justify-between shrink-0">
        <div className="h-5 w-24 bg-[var(--color-fg)] rounded-sm opacity-90" />
        <div className="w-8 h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center">
           <div className="w-3 h-3 border-2 border-[var(--color-fg)] rounded-full opacity-60" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {/* Main KPI */}
        <div className="bg-blue-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl" />
          <div className="h-3 w-20 bg-white/60 rounded-sm mb-4" />
          <div className="h-8 w-32 bg-white rounded-sm mb-4 opacity-90" />
          <div className="flex justify-between items-end">
            <div className="flex gap-2 items-center">
              <div className="h-4 w-12 bg-white/20 rounded-sm flex justify-center items-center"><div className="w-2 h-2 rounded-full bg-white opacity-80" /></div>
              <div className="h-2 w-16 bg-white/40 rounded-sm" />
            </div>
          </div>
        </div>
        
        <div className="h-3 w-28 bg-[var(--color-fg)] rounded-sm opacity-60 mt-2 mb-1" />
        
        {/* Sub KPIs */}
        <div className="grid grid-cols-2 gap-3">
           {[
             { color: "emerald", val: "24", trend: "up" },
             { color: "purple", val: "16", trend: "up" },
             { color: "red", val: "10", trend: "down" },
             { color: "amber", val: "42", trend: "up" }
           ].map((item, i) => (
             <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-4 flex flex-col gap-3">
               <div className="h-2 w-16 bg-[var(--color-line)] rounded-sm opacity-80" />
               <div className="h-6 w-12 bg-[var(--color-fg)] rounded-sm opacity-90" />
               <div className="flex items-center gap-1.5">
                 <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500`} />
                 <div className="h-1.5 w-10 bg-[var(--color-line)] rounded-sm opacity-60" />
               </div>
             </div>
           ))}
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="h-16 border-t border-[var(--color-line)] bg-[var(--color-surface)] flex items-center justify-around shrink-0 px-2">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className="flex flex-col items-center gap-1">
             <div className={`w-6 h-6 rounded-md ${i === 1 ? 'bg-blue-500' : 'bg-[var(--color-line)]'} opacity-80`} />
             <div className={`h-1 w-8 rounded-full ${i === 1 ? 'bg-blue-500' : 'bg-transparent'}`} />
           </div>
         ))}
      </div>
    </PhoneMockup>
  );
}
