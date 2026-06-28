import React from "react";
import { MockupFrame } from "../../primitives/MockupFrame";

export function DesktopDashboard() {
  return (
    <MockupFrame className="max-w-4xl w-full aspect-[16/10]" bodyClassName="bg-[var(--color-bg)] flex">
      {/* Sidebar */}
      <div className="w-48 sm:w-56 h-full border-r border-[var(--color-line)] bg-[var(--color-surface)] flex flex-col p-4 shrink-0 hidden sm:flex">
        <div className="text-sm font-bold text-[var(--color-fg)] mb-8 flex items-center gap-2">
          <div className="w-5 h-5 bg-[#7BCDBA] rounded-md shrink-0"></div>
          Workforce OS
        </div>
        <div className="flex flex-col gap-1">
          <div className="py-2 px-3 bg-[#E8F8F4] text-[#2C7A6A] dark:bg-[rgba(123,205,186,0.15)] dark:text-[#7BCDBA] rounded-md text-sm font-medium">Dashboard</div>
          <div className="py-2 px-3 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-2)] rounded-md text-sm font-medium transition-colors">Projects</div>
          <div className="py-2 px-3 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-2)] rounded-md text-sm font-medium transition-colors">Timesheets</div>
          <div className="py-2 px-3 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-2)] rounded-md text-sm font-medium transition-colors">Reports</div>
        </div>
      </div>
      
      {/* Main Area */}
      <div className="flex-1 h-full flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="h-14 border-b border-[var(--color-line)] flex items-center justify-between px-6 shrink-0 bg-[var(--color-surface)]">
          <div className="text-sm font-medium text-[var(--color-fg)]">Overview</div>
          <div className="flex gap-4 items-center text-[var(--color-fg-muted)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <div className="w-7 h-7 rounded-full bg-[var(--color-line)] overflow-hidden">
              <div className="w-full h-full bg-[#8FC8E8] opacity-50"></div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-4 flex flex-col gap-1">
              <div className="text-xs font-medium text-[var(--color-fg-muted)]">Active Projects</div>
              <div className="text-2xl font-semibold text-[var(--color-fg)]">12</div>
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-4 flex flex-col gap-1">
              <div className="text-xs font-medium text-[var(--color-fg-muted)]">Team Members</div>
              <div className="text-2xl font-semibold text-[var(--color-fg)]">48</div>
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-4 flex flex-col gap-1">
              <div className="text-xs font-medium text-[var(--color-fg-muted)]">Pending Approvals</div>
              <div className="text-2xl font-semibold text-[var(--color-fg)]">4</div>
            </div>
          </div>
          
          {/* Active Projects Table */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[var(--color-line)] flex items-center justify-between">
              <div className="text-sm font-semibold text-[var(--color-fg)]">Recent Activity</div>
              <div className="text-xs font-medium text-[#7BCDBA]">View All</div>
            </div>
            <div className="flex flex-col">
              {[
                { name: "Project Alpha", type: "Web App", progress: 65, status: "In Progress" },
                { name: "Project Beta", type: "Mobile App", progress: 30, status: "Planning" },
                { name: "Project Gamma", type: "Dashboard", progress: 90, status: "Review" },
                { name: "Project Delta", type: "Marketing Site", progress: 15, status: "Blocked" }
              ].map((proj, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-[var(--color-line)] last:border-0 hover:bg-[var(--color-surface-2)] transition-colors">
                  <div className="flex items-center gap-3 w-1/3">
                    <div className="w-8 h-8 rounded bg-[#E8F8F4] dark:bg-[rgba(123,205,186,0.15)] flex items-center justify-center text-[#7BCDBA] text-xs font-bold">
                      {proj.name.charAt(8)}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-[var(--color-fg)]">{proj.name}</div>
                      <div className="text-xs text-[var(--color-fg-muted)]">{proj.type}</div>
                    </div>
                  </div>
                  <div className="w-1/3 px-4 flex items-center gap-3">
                    <div className="h-1.5 flex-1 bg-[var(--color-line)] rounded-full overflow-hidden">
                      <div className="h-full bg-[#7BCDBA] rounded-full" style={{ width: `${proj.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-[var(--color-fg-muted)] w-8">{proj.progress}%</span>
                  </div>
                  <div className="w-1/4 flex justify-end">
                    <div className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-full text-xs font-medium text-[var(--color-fg-muted)]">
                      {proj.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
