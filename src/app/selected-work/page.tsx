import { LabsHero } from "@/components/sections/labs/LabsHero";
import { PathwaysGrid } from "@/components/sections/selected-work/PathwaysGrid";
import { ClosingCTA } from "@/components/sections/selected-work/ClosingCTA";

export const metadata = {
  title: "Selected Product Pathways",
  description:
    "A collection of product journeys showing how ideas move from early problem framing to launch-ready experiences.",
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
