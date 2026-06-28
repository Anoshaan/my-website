"use client";

import React from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

export function ClosingCTA() {
  return (
    <section className="py-24 md:py-32 border-t border-black/10 dark:border-white/10 bg-[var(--background)]">
      <Container size="narrow">
        <Reveal>
          <div className="flex flex-col items-center text-center gap-8">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight max-w-2xl">
              Want to see how I think through a product from idea to launch?
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Button href="/process" variant="primary" tone="work">
                Explore My Process
              </Button>
              <Button 
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="ghost"
              >
                View all pathways
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
