import React from "react";
import Link from "next/link";
import { MAIN_PATHWAYS } from "@/lib/product-pathways";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

interface DetailClosingProps {
  currentSlug: string;
}

export function DetailClosing({ currentSlug }: DetailClosingProps) {
  const cards = [
    { title: "Product Thinking", desc: "How the idea became structured." },
    { title: "UX Clarity", desc: "How the flow became easier." },
    { title: "Launch Readiness", desc: "How the design became buildable." },
  ];

  const currentIndex = MAIN_PATHWAYS.findIndex(p => p.slug === currentSlug);
  const nextPathway = currentIndex !== -1 && currentIndex < MAIN_PATHWAYS.length - 1 
    ? MAIN_PATHWAYS[currentIndex + 1] 
    : MAIN_PATHWAYS[0];

  return (
    <section className="py-24 md:py-32 bg-[var(--background)]">
      <Container>
        <div className="flex flex-col items-center text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-12">
              What this pathway shows
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl mx-auto">
            {cards.map((card, idx) => (
              <Reveal key={card.title} delay={0.1 * idx}>
                <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] flex flex-col items-center gap-3 h-full">
                  <h3 className="text-xl font-medium">{card.title}</h3>
                  <p className="text-sm opacity-70">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-20 pt-12 border-t border-[var(--color-line)]">
          <Reveal delay={0.1}>
            <Button 
              href="/selected-work"
              variant="secondary"
              leadingIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              }
            >
              Back to Selected Work
            </Button>
          </Reveal>
          
          <Reveal delay={0.2}>
            <Button 
              href={`/selected-work/${nextPathway.slug}`}
              variant="primary"
              tone="work"
              trailingIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              }
            >
              View Next Product Pathway
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
