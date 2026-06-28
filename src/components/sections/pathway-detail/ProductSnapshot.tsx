import React from "react";
import { MainProductPathway } from "@/lib/product-pathways";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

interface ProductSnapshotProps {
  pathway: MainProductPathway;
}

export function ProductSnapshot({ pathway }: ProductSnapshotProps) {
  const cards = [
    { title: "Domain", value: pathway.domain },
    { title: "Platform", value: pathway.platform },
    { title: "Role", value: pathway.role },
    { title: "Focus Areas", value: pathway.focusAreas },
  ];

  return (
    <section className="py-12 md:py-20 bg-[var(--color-surface)]">
      <Container>
        <Reveal>
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Product Snapshot</h2>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Metadata Grid */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <Reveal key={card.title} delay={0.1 * idx}>
                <div className="flex flex-col gap-3 p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] h-full shadow-sm">
                  <span className="text-xs uppercase tracking-widest font-semibold opacity-50">
                    {card.title}
                  </span>
                  <p className="text-sm md:text-base font-medium opacity-90 leading-relaxed">
                    {card.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats Section */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
            <Reveal delay={0.3}>
              <div className="p-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-line)] shadow-sm h-full flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest font-semibold opacity-50 mb-6 block">
                  Outcomes
                </span>
                <ul className="flex flex-col gap-4">
                  {pathway.stats.map((stat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base font-medium opacity-90 leading-relaxed">
                        {stat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
