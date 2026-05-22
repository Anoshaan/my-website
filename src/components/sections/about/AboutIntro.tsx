"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About — Section 2. Two-column introduction directly after the hero.
 * Left: a large, looping, web-optimized intro video sized to the
 * viewport height. Right: section label, heading, short paragraphs
 * and floating pills. On desktop the whole section fills one viewport.
 */

const paragraphs = [
  "I lead UX as a product thinker — owning the experience from an ambiguous problem to a production-ready interface, focused on whether the whole system holds together.",
  "Most of my work is systems work: design systems that scale across products, and frontend-aware decisions that survive implementation — increasingly powered by AI-assisted workflows.",
  "I collaborate closely across product, engineering, and leadership, and I do my best work on hard, fuzzy problems where the right structure isn't obvious yet.",
];

const pills = [
  "UX Leadership",
  "Product Thinking",
  "Systems Thinking",
  "Frontend Fluency",
  "AI Workflows",
  "Design Systems",
  "Cross-Functional",
  "Problem Solving",
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

          {/* RIGHT — introduction copy */}
          <div className="flex flex-col lg:min-w-0 lg:flex-1">
            <Reveal>
              <span className="text-eyebrow text-white/45">Introduction</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-section text-white mt-3 heading-sheen">
                Systems thinking, product instinct, and craft that ships.
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
                <span className="text-eyebrow text-white/40">What I bring</span>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {pills.map((pill, i) => (
                    <span
                      key={pill}
                      className="about-float-sm inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-supporting text-white/65 transition-[color,border-color,background-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/[0.16] hover:bg-white/[0.05] hover:text-white"
                      style={{ animationDelay: `${(i % 4) * 0.5 + 0.15}s` }}
                    >
                      {pill}
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
