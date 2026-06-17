import { AboutHero } from "@/components/sections/about/AboutHero";
import { BehaviorOrigin } from "@/components/sections/about/BehaviorOrigin";
import { CareerTimeline } from "@/components/sections/about/CareerTimeline";
import { SystemsOffScreen } from "@/components/sections/about/SystemsOffScreen";
import { HardwareLoop } from "@/components/sections/about/HardwareLoop";
import { OffScreenDiscipline } from "@/components/sections/about/OffScreenDiscipline";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata = {
  title: "About",
  description:
    "Anoshaan, a product designer working across behavioral UX, interface design, motion, design systems, AI, and technology. The person, the path, and the systems behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BehaviorOrigin />
      <CareerTimeline />
      <SystemsOffScreen />
      <HardwareLoop />
      <OffScreenDiscipline />
      <AboutCTA />
    </>
  );
}
