"use client";

import React, { Suspense, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PathwayCategory, MAIN_PATHWAYS, MainProductPathway } from "@/lib/product-pathways";
import { Container } from "@/components/ui/Container";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { Button } from "@/components/ui/Button";
import { PathwayCard } from "./PathwayCard";
import { Reveal } from "@/components/animations/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudyOverlay } from "@/components/sections/labs/CaseStudyOverlay";
import { caseStudyDetails } from "@/lib/case-study-details";

const PATHWAY_TO_NUM: Record<string, string> = {
  "workforce-platform": "01",
  "analytics-intelligence": "02",
  "enterprise-software-website": "03",
  "smart-food-ordering": "04",
  "cannabis-commerce": "05",
};

function PathwaysGridInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category') as PathwayCategory | null;
  
  const activeCategory = categoryParam || "All Pathways";

  const [open, setOpen] = useState(false);
  const [renderNum, setRenderNum] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenPathway = (pathway: MainProductPathway) => {
    const num = PATHWAY_TO_NUM[pathway.slug];
    if (num && caseStudyDetails[num]) {
      setRenderNum(num);
      setOpen(true);
    } else {
      router.push(`/selected-work/${pathway.slug}`);
    }
  };

  const active = renderNum ? caseStudyDetails[renderNum] : null;

  const setActiveCategory = (category: PathwayCategory) => {
    if (category === "All Pathways") {
      router.push('/selected-work', { scroll: false });
    } else {
      router.push(`/selected-work?category=${encodeURIComponent(category)}`, { scroll: false });
    }
  };

  const filteredMain = MAIN_PATHWAYS.filter(pathway => {
    if (activeCategory === "All Pathways") return true;
    return pathway.category === activeCategory;
  });

  return (
    <section className="py-12 md:py-20 relative">
      <Container>
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        
        {/* Main Pathways */}
        {filteredMain.length > 0 && (
          <motion.div layout className="flex flex-col gap-8 md:gap-12 mb-24">
            <AnimatePresence mode="popLayout">
              {filteredMain.map((pathway, idx) => {
                const isFeatured = idx === 0;
                
                if (isFeatured) {
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      key={pathway.slug}
                    >
                      <PathwayCard pathway={pathway} featured={true} onClickPathway={handleOpenPathway} />
                    </motion.div>
                  );
                }
                return null;
              })}
            </AnimatePresence>
            
            {filteredMain.length > 1 && (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <AnimatePresence mode="popLayout">
                  {filteredMain.slice(1).map((pathway, idx) => {
                    const isLastOdd = idx === filteredMain.slice(1).length - 1 && filteredMain.slice(1).length % 2 !== 0;
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.05 * (idx % 2) }}
                        key={pathway.slug} 
                        className={`h-full ${isLastOdd ? 'md:col-span-2' : ''}`}
                      >
                        <PathwayCard pathway={pathway} featured={isLastOdd} onClickPathway={handleOpenPathway} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {filteredMain.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center opacity-60">
            <p>No pathways found for this category.</p>
            <Button 
              onClick={() => setActiveCategory("All Pathways")}
              variant="ghost"
              className="mt-6"
            >
              View all pathways
            </Button>
          </div>
        )}
      </Container>
      
      {active && (
        <CaseStudyOverlay
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setRenderNum(null)}
          title={active.title}
          returnFocusRef={triggerRef}
        >
          <active.Body />
        </CaseStudyOverlay>
      )}
    </section>
  );
}

export function PathwaysGrid() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PathwaysGridInner />
    </Suspense>
  );
}
