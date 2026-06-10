"use client";

import type { LabVisual } from "@/lib/labs-entries";
import { ChronosMockup } from "@/components/mockups/ChronosMockup";
import { ScrollingImage } from "@/components/mockups/ScrollingImage";
import {
  AIAssistedMockup,
  CannabisCommerceMockup,
  DefenceOpsMockup,
  EnterpriseSiteMockup,
  PredictiveAnalyticsMockup,
  WorkplaceSafetyMockup,
} from "@/components/mockups/studies";

/**
 * Resolves a Labs entry's hero visual. Bespoke animated mockups are keyed
 * by `visual.key`; real screenshots render through ScrollingImage. Each
 * visual pauses itself while off-screen, so all eight can coexist on the
 * page without paying for animation that isn't visible.
 */
const REGISTRY: Record<string, React.ComponentType> = {
  chronos: ChronosMockup,
  analytics: PredictiveAnalyticsMockup,
  enterprise: EnterpriseSiteMockup,
  cannabis: CannabisCommerceMockup,
  defence: DefenceOpsMockup,
  operations: WorkplaceSafetyMockup,
  ai: AIAssistedMockup,
};

export function LabEntryVisual({
  visual,
  title,
}: {
  visual: LabVisual;
  title: string;
}) {
  if (visual.kind === "image") {
    return (
      <ScrollingImage
        src={visual.src}
        alt={title}
        orientation={visual.orientation}
      />
    );
  }

  const Bespoke = REGISTRY[visual.key];
  if (!Bespoke) return null;
  return <Bespoke />;
}
