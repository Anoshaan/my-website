"use client";

import React from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

const ProcessIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

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
                href="/process"
                variant="secondary"
                leadingIcon={<ProcessIcon />}
              >
                See the Process
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
