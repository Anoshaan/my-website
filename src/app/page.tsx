import { Hero } from "@/components/sections/Hero";
import { Section2Problem } from "@/components/sections/Section2Problem";
import { Section3Approach } from "@/components/sections/Section3Approach";
import { Section4StayAhead } from "@/components/sections/Section4StayAhead";
import { CaseStudyFeature } from "@/components/sections/CaseStudyFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { NextMission } from "@/components/sections/NextMission";
import { ScrollFocusFade } from "@/components/animations/ScrollFocusFade";

/**
 * Landing page — one continuous storytelling journey. The pinned
 * chapters (Hero, Problem, Approach) handle their own scroll-linked
 * exit fades; the flowing chapters below are wrapped in the shared
 * ScrollFocusFade so every section eases out of focus as the next
 * one takes the frame.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Section2Problem />
      <Section3Approach />
      <ScrollFocusFade>
        <Section4StayAhead />
      </ScrollFocusFade>
      <ScrollFocusFade>
        <CaseStudyFeature />
      </ScrollFocusFade>
      <ScrollFocusFade>
        <Testimonials />
      </ScrollFocusFade>
      <ScrollFocusFade exit={false}>
        <NextMission />
      </ScrollFocusFade>
    </>
  );
}
