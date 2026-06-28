import React from "react";
import { MainProductPathway } from "@/lib/product-pathways";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

interface TimelineProcessProps {
  steps: MainProductPathway["ideaToLaunchSteps"];
}

export function TimelineProcess({ steps }: TimelineProcessProps) {
  return (
    <section className="py-20 md:py-32 bg-[var(--background)]">
      <Container size="narrow">
        <Reveal>
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">From Idea to Launch</h2>
          </div>
        </Reveal>
        
        <div className="flex flex-col relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 -translate-x-1/2" />
          
          <div className="flex flex-col gap-16 md:gap-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const num = (idx + 1).toString().padStart(2, '0');
              
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                  {/* Step Dot */}
                  <div className="absolute left-8 md:left-1/2 w-10 h-10 -translate-x-1/2 bg-[var(--background)] border-2 border-black/10 dark:border-white/10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 group-hover:border-black dark:group-hover:border-white">
                    <span className="text-xs font-semibold">{num}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 flex flex-col gap-4 pl-20 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto md:text-left'}`}>
                    <Reveal delay={0.1}>
                      <h3 className="text-lg md:text-xl font-medium tracking-tight leading-relaxed">
                        {step}
                      </h3>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
