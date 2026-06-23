import { LabsHero } from "@/components/sections/labs/LabsHero";
import { LabsShowcase } from "@/components/sections/labs/LabsShowcase";

export const metadata = {
  title: "Selected Work",
  description:
    "A curated showcase of real product work across enterprise systems, analytics platforms, commerce, and emerging technologies.",
};

export default function SelectedWorkPage() {
  return (
    <>
      <LabsHero />

      <LabsShowcase />
    </>
  );
}
