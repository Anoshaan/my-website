"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Shows a pulsing online/offline indicator based on navigator.onLine.
 * Updates in real time via the browser's online/offline events.
 */
export function PCStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-tight select-none transition-colors duration-500",
        "bg-black/65 backdrop-blur-[24px] saturate-[140%] border shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        online
          ? "border-white/[0.10] text-white/70"
          : "border-white/[0.06] text-white/40"
      )}
      title={online ? "PC connected" : "PC offline"}
    >
      <span className="relative flex h-2 w-2">
        {online && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            online ? "bg-emerald-400" : "bg-white/25"
          )}
        />
      </span>
      {online ? "Online" : "Offline"}
    </div>
  );
}
