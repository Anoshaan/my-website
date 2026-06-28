import React from "react";
import { MainProductPathway } from "@/lib/product-pathways";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";

interface ScreenShowcaseProps {
  items: MainProductPathway["screenShowcaseItems"];
}

export function ScreenShowcase({ items }: ScreenShowcaseProps) {
  return (
    <section className="py-20 md:py-32 bg-[var(--color-surface)] border-y border-[var(--color-line)]">
      <Container>
        <Reveal>
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Screen Showcase</h2>
          </div>
        </Reveal>
        
        <div className="flex flex-col gap-20 md:gap-32">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-6 md:gap-10">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-sm font-semibold">
                    {idx + 1}
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight">
                    {item}
                  </h3>
                </div>
              </Reveal>
              
              <Reveal delay={0.1}>
                <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-xl border border-[var(--color-line)]">
                  <PlaceholderVisual label={item} className="bg-[var(--color-card)]" />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
