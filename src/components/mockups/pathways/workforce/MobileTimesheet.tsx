import React from "react";
import { PhoneMockup } from "../../primitives/PhoneMockup";

export function MobileTimesheet() {
  return (
    <PhoneMockup bodyClassName="bg-[var(--color-bg)]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--color-line)] flex items-center justify-between shrink-0">
        <div className="h-4 w-24 bg-[var(--color-fg)] rounded-sm opacity-80" />
        <div className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center">
          <div className="w-4 h-4 rounded bg-[var(--color-line)] opacity-60" />
        </div>
      </div>
      
      {/* Date Selector */}
      <div className="flex items-center gap-2 overflow-x-auto px-5 py-4 no-scrollbar border-b border-[var(--color-line)] shrink-0">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
          <div key={day} className={`flex flex-col items-center justify-center w-12 h-14 rounded-xl border ${i === 2 ? 'bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)]' : 'bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-fg)]'}`}>
            <span className="text-[10px] font-medium opacity-70 mb-1">{day}</span>
            <span className="text-sm font-semibold">{12 + i}</span>
          </div>
        ))}
      </div>
      
      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider opacity-50">Today's Tasks</span>
          <span className="text-xs font-medium opacity-60">4h 30m</span>
        </div>
        
        {/* Task Item 1 */}
        <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute left-0 inset-y-0 w-1 bg-emerald-500" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1.5">
              <div className="h-3 w-28 bg-[var(--color-fg)] rounded-sm opacity-80" />
              <div className="h-2 w-16 bg-[var(--color-line)] rounded-sm opacity-60" />
            </div>
            <div className="text-sm font-semibold">2h 00m</div>
          </div>
        </div>
        
        {/* Task Item 2 */}
        <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute left-0 inset-y-0 w-1 bg-blue-500" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1.5">
              <div className="h-3 w-24 bg-[var(--color-fg)] rounded-sm opacity-80" />
              <div className="h-2 w-20 bg-[var(--color-line)] rounded-sm opacity-60" />
            </div>
            <div className="text-sm font-semibold">2h 30m</div>
          </div>
        </div>
        
        {/* Add Button */}
        <div className="mt-2 flex items-center justify-center p-3 rounded-xl border-2 border-dashed border-[var(--color-line)] text-[var(--color-fg-muted)]">
          <div className="h-3 w-20 bg-[var(--color-line)] rounded-sm opacity-60" />
        </div>
      </div>
      
      {/* Bottom Submit */}
      <div className="p-5 pt-3 border-t border-[var(--color-line)] bg-[var(--color-surface)] shrink-0">
        <div className="w-full h-12 rounded-full bg-[var(--color-fg)] flex items-center justify-center text-[var(--color-bg)]">
          <div className="h-3 w-24 bg-[var(--color-bg)] rounded-sm opacity-90" />
        </div>
      </div>
    </PhoneMockup>
  );
}
