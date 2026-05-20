"use client";

import ShinyText from "@/components/animations/ShinyText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[clamp(140px,16vw,220px)] pb-[clamp(96px,12vw,160px)] overflow-hidden"
    >
      {/* Subtle lavender wash, NOT bright mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 38%, rgba(207, 217, 255, 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 -z-10 w-[850px] h-[400px] rounded-full"
        style={{
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.04), transparent)",
          filter: "blur(140px)",
        }}
      />

      <Container size="default" className="flex flex-col items-center text-center">
        <Reveal duration={0.9}>
          <h1 className="text-hero text-white max-w-[22ch] mx-auto">
            Designing Product Experiences That Scale With{" "}
            <ShinyText
              text="Human Behavior"
              color="#ffffff"
              shineColor="#cfd9ff"
              speed={4}
              spread={110}
            />
          </h1>
        </Reveal>

        <Reveal delay={0.18} duration={0.9}>
          <p className="text-body text-white/65 max-w-[58ch] mt-6">
            I design enterprise-grade digital experiences across web, mobile,
            and AI-driven platforms — combining behavioral UX, scalable systems,
            motion, and frontend thinking to create products that feel
            intuitive, fast, and deeply human.
          </p>
        </Reveal>

        <Reveal delay={0.32} duration={0.9}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10">
            <Button href="/labs" variant="primary">
              View Case Studies
            </Button>
            <Button href="/systems" variant="ghost" trailingIcon={null}>
              Explore Systems
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.5} duration={0.9}>
          <p className="text-eyebrow mt-8 text-white/45">
            Enterprise UX • Design Systems • AI Experiences
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
