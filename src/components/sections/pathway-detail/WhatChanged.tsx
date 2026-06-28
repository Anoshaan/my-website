import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

interface WhatChangedProps {
  items: string[];
}

export function WhatChanged({ items }: WhatChangedProps) {
  return (
    <section className="py-20 md:py-32 bg-[var(--background)]">
      <Container size="narrow">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">What Changed</h2>
          </div>
        </Reveal>
        
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={0.1 * idx}>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl font-medium opacity-90 leading-relaxed pt-1">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
