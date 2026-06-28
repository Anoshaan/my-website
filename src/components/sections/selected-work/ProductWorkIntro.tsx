import React from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";

const FRAMEWORK_CARDS = [
  { title: "Idea", desc: "What is the product trying to solve?" },
  { title: "Problem", desc: "Where are users or businesses getting stuck?" },
  { title: "Structure", desc: "What needs to exist inside the product?" },
  { title: "UX Flow", desc: "How should people move through it?" },
  { title: "UI System", desc: "How should the product look, feel, and scale?" },
  { title: "Launch Ready", desc: "How does the design become clear for development?" },
];

export function ProductWorkIntro() {
  return (
    <section className="py-20 md:py-32 bg-[var(--background)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                How I frame product work
              </h2>
              <p className="text-lg opacity-70 leading-relaxed">
                I look at product work as a journey, not just a screen design task. Each pathway starts with a product idea, then moves through user problems, structure, UX flows, interface systems, cross-device behavior, and launch handoff.
              </p>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FRAMEWORK_CARDS.map((card, idx) => (
                <Reveal key={card.title} delay={0.1 + (idx * 0.05)}>
                  <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col gap-2 h-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 hover:shadow-sm">
                    <span className="text-xs font-semibold tracking-wider uppercase opacity-50">
                      Step 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-medium">{card.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed mt-1">
                      {card.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
