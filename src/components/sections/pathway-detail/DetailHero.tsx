import React from "react";
import { MainProductPathway } from "@/lib/product-pathways";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { BackButton } from "@/components/ui/BackButton";

interface DetailHeroProps {
  pathway: MainProductPathway;
}

export function DetailHero({ pathway }: DetailHeroProps) {
  const tagClass = "px-3 py-1 rounded-full text-xs font-medium bg-[var(--card-soft-bg)] text-neutral-900 border border-black/5 dark:border-black/10";

  return (
    <section 
      className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[var(--background)] relative"
      style={{
        '--card-accent': pathway.accentColor,
        '--card-soft-bg': pathway.softAccentColor,
      } as React.CSSProperties}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col relative">
            <Reveal>
              <div className="mb-8 relative z-10">
                <BackButton />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={tagClass}>
                  {pathway.displayCategory}
                </span>
                {pathway.tags.map(cat => (
                  <span key={cat} className={tagClass}>
                    {cat}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
                {pathway.title}
              </h1>
              
              <h2 className="text-xl md:text-2xl font-medium text-[var(--card-accent)] mb-6 opacity-90">
                {pathway.question}
              </h2>
              
              <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-2xl">
                {pathway.summary}
              </p>
            </Reveal>
          </div>
          
          <div className="w-full aspect-[4/3] lg:aspect-square">
            <Reveal delay={0.2}>
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-line)] shadow-sm">
                <PlaceholderVisual label={pathway.visualComponentName} className="bg-[var(--color-surface)]" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
