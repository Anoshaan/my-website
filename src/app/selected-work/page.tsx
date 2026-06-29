import { LabsHero } from "@/components/sections/labs/LabsHero";
import { PathwaysGrid } from "@/components/sections/selected-work/PathwaysGrid";
import { ClosingCTA } from "@/components/sections/selected-work/ClosingCTA";

export const metadata = {
  title: "Selected Product Pathways",
  description:
    "A focused collection of product, AI, brand, motion, and handoff systems showing how ideas move from early client conversations into scalable product experiences.",
};

export default function SelectedWorkPage() {
  return (
    <>
      <LabsHero />
      <PathwaysGrid />
      <ClosingCTA />
    </>
  );
}
