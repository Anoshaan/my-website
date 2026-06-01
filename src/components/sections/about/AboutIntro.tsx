"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * About — Section 2. "Beyond Interfaces" — a calm, reflective
 * introduction. The looping intro video anchors the left column;
 * the right column carries a more personal paragraph block and a
 * career snapshot CTA that downloads the resume PDF.
 */

const paragraphs = [
  "I think in systems. Most of what I build — interfaces, motion, the small behaviors that make a product feel intentional — comes from looking at the whole structure, not just the surface.",
  "My interest sits where design meets logic: how people behave inside an experience, how interactions are choreographed, and how a system holds together as it scales. I'm drawn to interfaces that feel quietly intelligent rather than loud.",
  "I work across product, motion, and emerging technology — and I keep experimenting outside the screen so the work on it stays sharp.",
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
            <div className="relative h-full w-full">
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
              <div className="mt-6 pt-6 border-t border-white/[0.07]">
                <h3 className="text-card-title text-white">
                  View My Career Snapshot
                </h3>
                <p className="text-body text-white/60 mt-3 max-w-[54ch]">
                  A complete overview of my experience, product thinking, UI/UX
                  leadership, systems design, and creative direction.
                </p>
                <div className="mt-6">
                  <Button
                    href="/resume/Anoshaan-Resume.pdf"
                    variant="secondary"
                    rainbow={false}
                    trailingIcon={null}
                    download
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
