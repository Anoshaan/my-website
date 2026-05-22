import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { DesignPrinciples } from "@/components/sections/DesignPrinciples";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { SectionFade } from "@/components/animations/SectionFade";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionFade>
        <Intro />
      </SectionFade>
      <SectionFade>
        <DesignPrinciples />
      </SectionFade>
      <SectionFade>
        <Process />
      </SectionFade>
      <SectionFade>
        <Stats />
      </SectionFade>
      <SectionFade>
        <FeaturedWork />
      </SectionFade>
      <SectionFade>
        <Testimonials />
      </SectionFade>
      <SectionFade>
        <Contact />
      </SectionFade>
    </>
  );
}
