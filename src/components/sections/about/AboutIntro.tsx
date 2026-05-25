"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrambledText } from "@/components/animations/ScrambledText";

/**
 * About — Section 2. "Beyond Interfaces" — a calm, reflective
 * introduction. The looping intro video anchors the left column;
 * the right column carries a more personal paragraph block and a
 * row of capsules describing how I think and work.
 */

const paragraphs = [
  "I think in systems. Most of what I build — interfaces, motion, the small behaviors that make a product feel intentional — comes from looking at the whole structure, not just the surface.",
  "My interest sits where design meets logic: how people behave inside an experience, how interactions are choreographed, and how a system holds together as it scales. I'm drawn to interfaces that feel quietly intelligent rather than loud.",
  "I work across product, motion, and emerging technology — and I keep experimenting outside the screen so the work on it stays sharp.",
];

const pills = [
  "Systems Thinking",
  "Behavioral UX",
  "Motion Systems",
  "Interaction Design",
  "Scalable Experiences",
  "AI-Assisted Workflows",
  "Frontend Fluency",
  "Future Interfaces",
];

export function AboutIntro() {
  return (
    <section className="relative pt-[clamp(8px,3vw,48px)] pb-[clamp(72px,9vw,120px)] lg:flex lg:min-h-screen lg:items-center lg:py-10">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[clamp(40px,5vw,84px)]">
          {/* LEFT — large looping intro video, sized to the viewport */}
          <Reveal
            variant="fade"
            duration={1}
            className="mx-auto aspect-square w-full max-w-[460px] lg:mx-0 lg:aspect-auto lg:h-[clamp(380px,62vh,680px)] lg:w-[clamp(380px,62vh,680px)] lg:max-w-none lg:flex-shrink-0"
          >
            <div className="about-float relative h-full w-full">
              <div aria-hidden className="about-video-glow" />
              <div className="about-video h-full w-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/about/intro-poster.jpg"
                >
                  <source src="/about/intro.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — personal introduction */}
          <div className="flex flex-col lg:min-w-0 lg:flex-1">
            <Reveal>
              <span className="text-eyebrow text-white/45">Beyond interfaces</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-section text-white mt-3 heading-sheen">
                The person behind the systems.
              </h2>
            </Reveal>

            <div className="mt-5 flex flex-col gap-3 max-w-[62ch]">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.12 + i * 0.06}>
                  <p className="text-body text-white/62">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.26}>
              <div className="mt-5 pt-5 border-t border-white/[0.07]">
                <span className="text-eyebrow text-white/55 eyebrow-strong">
                  How I think
                </span>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {pills.map((pill, i) => (
                    <span
                      key={pill}
                      className="about-float-sm capsule capsule-scramble"
                      style={{ animationDelay: `${(i % 4) * 0.5 + 0.15}s` }}
                    >
                      <ScrambledText radius={90} duration={900} speed={36}>
                        {pill}
                      </ScrambledText>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
