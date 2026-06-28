import React from "react";
import { notFound } from "next/navigation";
import { MAIN_PATHWAYS } from "@/lib/product-pathways";
import { DetailHero } from "@/components/sections/pathway-detail/DetailHero";
import { ProductSnapshot } from "@/components/sections/pathway-detail/ProductSnapshot";
import { TimelineProcess } from "@/components/sections/pathway-detail/TimelineProcess";
import { ScreenShowcase } from "@/components/sections/pathway-detail/ScreenShowcase";
import { WhatChanged } from "@/components/sections/pathway-detail/WhatChanged";
import { KeyInsight } from "@/components/sections/pathway-detail/KeyInsight";
import { DetailClosing } from "@/components/sections/pathway-detail/DetailClosing";

export function generateStaticParams() {
  return MAIN_PATHWAYS.map((pathway) => ({
    slug: pathway.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pathway = MAIN_PATHWAYS.find((p) => p.slug === slug);
  
  if (!pathway) {
    return { title: "Not Found" };
  }
  
  return {
    title: `${pathway.title} | Product Pathway`,
    description: pathway.summary,
  };
}

export default async function PathwayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pathway = MAIN_PATHWAYS.find((p) => p.slug === slug);
  
  if (!pathway) {
    notFound();
  }

  return (
    <article 
      className="min-h-screen relative"
      style={{
        '--card-accent': pathway.accentColor,
        '--card-soft-bg': pathway.softAccentColor,
      } as React.CSSProperties}
    >
      <DetailHero pathway={pathway} />
      <ProductSnapshot pathway={pathway} />
      <TimelineProcess steps={pathway.ideaToLaunchSteps} />
      <ScreenShowcase items={pathway.screenShowcaseItems} />
      <WhatChanged items={pathway.whatChanged} />
      <KeyInsight insight={pathway.keyInsight} />
      <DetailClosing currentSlug={pathway.slug} />
    </article>
  );
}
