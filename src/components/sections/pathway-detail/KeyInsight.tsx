import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

interface KeyInsightProps {
  insight: string;
}

export function KeyInsight({ insight }: KeyInsightProps) {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-surface)] border-y border-[var(--color-line)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--card-accent)] to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--card-accent)] to-transparent opacity-20" />
      
      <Container size="narrow">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-50 bg-[var(--color-bg)] px-4 py-2 rounded-full border border-[var(--color-line)] shadow-sm">
              Key Insight
            </span>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-[var(--card-accent)]">
              &ldquo;{insight}&rdquo;
            </h2>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
