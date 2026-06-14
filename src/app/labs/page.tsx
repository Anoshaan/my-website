import ShinyText from "@/components/animations/ShinyText";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { LabsShowcase } from "@/components/sections/labs/LabsShowcase";

export const metadata = {
  title: "Design Labs",
  description:
    "A collection of product challenges, design decisions, and lessons learned across enterprise systems, analytics platforms, commerce, and emerging technologies.",
};

export default function LabsPage() {
  return (
    <>
      {/* INTRO — editorial header. Label, large statement heading, and a
          two-paragraph framing of the work + confidentiality note. */}
      <section className="pt-[clamp(140px,16vw,200px)] pb-[clamp(72px,9vw,120px)]">
        <Container>
          <div className="flex flex-col gap-7 max-w-[1000px]">
            <Reveal delay={0.1}>
              <h1 className="labs-intro-title text-white">
                <ShinyText
                  text="Lessons learned through building digital products."
                  color="#d6d6da"
                  shineColor="#ffffff"
                  speed={6}
                  spread={115}
                  delay={1.6}
                />
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="labs-intro-desc">
                <p>
                  Real-world challenges, design decisions, and product thinking
                  across enterprise systems, analytics, commerce, and emerging
                  technology.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <LabsShowcase />
    </>
  );
}
