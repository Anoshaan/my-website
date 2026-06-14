import { PageHead } from "@/components/ui/PageHead";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { CareerTimeline } from "@/components/sections/about/CareerTimeline";
import { Experiments } from "@/components/sections/about/Experiments";
import { HardwareSystems } from "@/components/sections/about/HardwareSystems";
import { PersonalInterests } from "@/components/sections/about/PersonalInterests";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <PageHead
        title="Human behavior is"
        shineWords="my design system."
        intro="I'm Anoshaan, a product systems designer working at the intersection of behavioral UX, motion, and technology. I build interfaces, scalable systems, and quietly intelligent experiences for enterprise platforms, AI products, and the layer of things still being figured out."
      />

      <AboutIntro />
      <CareerTimeline />
      <Experiments />
      <HardwareSystems />
      <PersonalInterests />
      <AboutCTA />
    </>
  );
}
