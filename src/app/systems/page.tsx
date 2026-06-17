import { SystemsHero } from "@/components/sections/systems/SystemsHero";
import { QualityLens } from "@/components/sections/systems/QualityLens";
import { SystemInfrastructure } from "@/components/sections/systems/SystemInfrastructure";
import { HumanAIWorkflow } from "@/components/sections/systems/HumanAIWorkflow";
import { TechRadar } from "@/components/sections/systems/TechRadar";
import { ProductLoop } from "@/components/sections/systems/ProductLoop";
import { PageCTA } from "@/components/sections/PageCTA";

export const metadata = {
  title: "Systems",
  description:
    "Design systems, UX quality, AI-assisted workflows, and technical product thinking that move ideas from interface to implementation.",
};

export default function SystemsPage() {
  return (
    <>
      <SystemsHero />
      <QualityLens />
      <SystemInfrastructure />
      <HumanAIWorkflow />
      <TechRadar />
      <ProductLoop />
      <PageCTA
        title="See how these systems show up in real work."
        lead="Case studies, product decisions, and the systems behind them."
        buttonLabel="View Labs"
        href="/labs"
      />
    </>
  );
}
