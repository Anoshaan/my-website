import { AboutHero } from "@/components/sections/about/AboutHero";
import { BehaviorOrigin } from "@/components/sections/about/BehaviorOrigin";
import { CareerTimeline } from "@/components/sections/about/CareerTimeline";
import { ThingsIBuild } from "@/components/sections/about/ThingsIBuild";
import { TeamActivities } from "@/components/sections/about/TeamActivities";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata = {
  title: "About Me",
  description:
    "Anoshaan, a product experience designer working across user experience, interface design, motion, design systems, AI, and technology. The person, the path, and the systems behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BehaviorOrigin />
      <CareerTimeline />
      <ThingsIBuild />
      <TeamActivities />
      <AboutCTA />
    </>
  );
}
