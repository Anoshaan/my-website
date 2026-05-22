import { PageHead } from "@/components/ui/PageHead";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { CareerTimeline } from "@/components/sections/about/CareerTimeline";
import { Experiments } from "@/components/sections/about/Experiments";
import { SelectedImpact } from "@/components/sections/about/SelectedImpact";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      {/* Hero — unchanged. */}
      <PageHead
        title="Behavioral UX, motion craft,"
        shineWords="and systems."
        intro="I'm Anoshaan — a Lead UX Engineer and Senior Product Experience Designer with 8+ years across enterprise platforms, fintech, AI products, and design systems."
      />

      <AboutIntro />
      <CareerTimeline />
      <Experiments />
      <SelectedImpact />
      <AboutCTA />
    </>
  );
}
