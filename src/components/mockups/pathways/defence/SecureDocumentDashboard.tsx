import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function SecureDocumentDashboard() {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-bg)] flex flex-col font-mono">
      {/* Topbar */}
      <div className="h-12 border-b border-[var(--color-line)] bg-black dark:bg-[#111] text-emerald-500 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase">SECURE_NET_v2.4</span>
        </div>
        <div className="h-4 w-32 bg-emerald-500/20 rounded-sm" />
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "CLEARANCE LEVEL", val: "ALPHA-7", active: true },
            { label: "ACTIVE PROTOCOLS", val: "4", active: false },
            { label: "ENCRYPTION", val: "AES-256", active: false }
          ].map((stat, i) => (
            <div key={i} className="border border-[var(--color-line)] bg-[var(--color-surface)] p-4 flex flex-col gap-2 relative overflow-hidden">
               {stat.active && <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />}
               <span className="text-[10px] text-[var(--color-fg-muted)] tracking-widest uppercase">{stat.label}</span>
               <span className="text-lg font-bold tracking-tight">{stat.val}</span>
            </div>
          ))}
        </div>
        
        <div className="flex-1 border border-[var(--color-line)] bg-[var(--color-surface)] flex flex-col">
          <div className="h-10 border-b border-[var(--color-line)] bg-[var(--color-surface-2)] flex items-center px-4">
             <span className="text-[10px] text-[var(--color-fg)] font-bold tracking-widest uppercase">RECENT_ACCESS_LOGS</span>
          </div>
          <div className="p-4 flex flex-col gap-2">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="flex items-center gap-4 py-2 border-b border-[var(--color-line)]/50 last:border-0 font-mono text-xs">
                 <span className="text-[var(--color-fg-muted)] w-24">{10 + i}:42:0{i}Z</span>
                 <div className="w-20">
                   <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px]">AUTH_OK</span>
                 </div>
                 <div className="h-3 w-48 bg-[var(--color-fg)] opacity-80 rounded-sm" />
                 <div className="ml-auto h-3 w-32 bg-[var(--color-line)] rounded-sm" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
