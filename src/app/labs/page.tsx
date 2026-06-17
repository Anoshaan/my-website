import { LabsHero } from "@/components/sections/labs/LabsHero";
import { LabsShowcase } from "@/components/sections/labs/LabsShowcase";

export const metadata = {
  title: "Design Labs",
  description:
    "A collection of product challenges, design decisions, and lessons learned across enterprise systems, analytics platforms, commerce, and emerging technologies.",
};

export default function LabsPage() {
  return (
    <>
      <LabsHero />

      <LabsShowcase />
    </>
  );
}
