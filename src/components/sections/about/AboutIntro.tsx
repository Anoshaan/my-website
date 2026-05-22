"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About — Section 2. Two-column introduction directly after the hero.
 * Left: a looping, muted, web-optimized intro video in a glass frame.
 * Right: section label, heading, short paragraphs and floating pills.
 */

const paragraphs = [
  "I work as a UX leader and product thinker — owning the experience from an ambiguous problem all the way to a production-ready interface. I care less about isolated screens and more about whether the whole system holds together.",
  "Most of my work lives at the systems level: design systems that scale across products, interaction patterns that stay coherent, and architecture decisions that survive as teams and features grow.",
  "I think in frontend reality — components, state, and performance — so design decisions hold up in implementation. Increasingly that means experimenting with AI-assisted workflows to move from idea to working interface faster.",
  "I collaborate closely across product, engineering, and leadership, and I'm at my best on hard, fuzzy problems — the ones where the right structure isn't obvious yet.",
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
    <section className="pt-[clamp(8px,3vw,48px)] pb-[clamp(76px,9vw,128px)]">
      <Container>
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[minmax(0,420px)_minmax(0,560px)] lg:justify-center">
          {/* LEFT — looping intro video */}
          <Reveal variant="fade" duration={1}>
            <div className="about-float relative mx-auto w-full max-w-[440px] lg:max-w-none">
              <div aria-hidden className="about-video-glow" />
              <div className="about-video aspect-square">
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
          <div className="flex flex-col">
            <Reveal>
              <span className="text-eyebrow text-white/45">Introduction</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-section text-white mt-4">
                Systems thinking, product instinct, and craft that ships.
              </h2>
            </Reveal>

            <div className="mt-6 flex flex-col gap-4 max-w-[58ch]">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.12 + i * 0.06}>
                  <p className="text-body text-white/62">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.22}>
              <div className="mt-8 pt-7 border-t border-white/[0.07]">
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
