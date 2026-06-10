import { Hero } from "@/components/sections/Hero";
import { Section2Problem } from "@/components/sections/Section2Problem";
import { Section3Approach } from "@/components/sections/Section3Approach";
import { Section4StayAhead } from "@/components/sections/Section4StayAhead";
import { CaseStudyFeature } from "@/components/sections/CaseStudyFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { NextMission } from "@/components/sections/NextMission";
import { SectionFade } from "@/components/animations/SectionFade";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section2Problem />
      <Section3Approach />
      <Section4StayAhead />
      <CaseStudyFeature />
      <SectionFade>
        <Testimonials />
      </SectionFade>
      <SectionFade>
        <NextMission />
      </SectionFade>
    </>
  );
}
