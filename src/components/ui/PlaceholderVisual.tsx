import React from "react";
import { cn } from "@/lib/utils";
import { MockupRouter } from "../mockups/MockupRouter";

interface PlaceholderVisualProps {
  label: string;
  className?: string;
}

export function PlaceholderVisual({ label, className = "" }: PlaceholderVisualProps) {
  // Delegate to MockupRouter which maps labels to actual components.
  // We keep the old PlaceholderVisual fallback logic inside MockupRouter for unresolved labels.
  return <MockupRouter label={label} className={className} />;
}
