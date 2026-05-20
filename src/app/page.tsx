import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { WhoIAm } from "@/components/sections/WhoIAm";
import { DesignPrinciples } from "@/components/sections/DesignPrinciples";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WhoIAm />
      <DesignPrinciples />
      <Process />
      <Stats />
      <FeaturedWork />
      <Testimonials />
      <Contact />
    </>
  );
}
