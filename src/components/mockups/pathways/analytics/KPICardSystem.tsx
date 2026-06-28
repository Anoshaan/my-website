import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function KPICardSystem() {
  return (
    <MockupFrame className="max-w-3xl aspect-[4/3]" bodyClassName="bg-[var(--color-bg)] p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-32 bg-[var(--color-fg)] rounded-sm opacity-90" />
        <div className="h-8 w-24 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { color: "emerald", trend: "up" },
          { color: "blue", trend: "up" },
          { color: "red", trend: "down" },
          { color: "purple", trend: "up" }
        ].map((item, i) => (
          <div key={i} className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-line)] p-5 flex flex-col gap-4 shadow-sm hover:border-black/20 dark:hover:border-white/20 transition-colors">
            <div className="flex justify-between items-start">
              <div className="h-3 w-24 bg-[var(--color-line)] rounded-sm opacity-80" />
              <div className={`w-6 h-6 rounded-full bg-${item.color}-500/10 flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
              </div>
            </div>
            
            <div className="h-10 w-32 bg-[var(--color-fg)] rounded-sm opacity-90" />
            
            <div className="flex items-center gap-2">
              <div className={`h-4 w-12 rounded-sm bg-${item.color}-500/20 text-${item.color}-500 flex items-center justify-center text-[10px] font-bold`}>
                {item.trend === "up" ? "+12%" : "-4%"}
              </div>
              <div className="h-2 w-20 bg-[var(--color-line)] rounded-sm opacity-60" />
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}
