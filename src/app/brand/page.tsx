import { BrandHero } from "@/components/sections/brand/BrandHero";
import { BrandAsExperience } from "@/components/sections/brand/BrandAsExperience";
import { BrandJourney } from "@/components/sections/brand/BrandJourney";
import { IdentitySystem } from "@/components/sections/brand/IdentitySystem";
import { ProductAsBrand } from "@/components/sections/brand/ProductAsBrand";
import { MotionDepth } from "@/components/sections/brand/MotionDepth";
import { LaunchAssets } from "@/components/sections/brand/LaunchAssets";
import { BrandSupport } from "@/components/sections/brand/BrandSupport";
import { PageCTA } from "@/components/sections/PageCTA";

export const metadata = {
  title: "Brand",
  description:
    "Identity, product experience, motion, 3D, video, launch assets, and storytelling. Turning ideas into complete digital brands.",
};

export default function BrandPage() {
  return (
    <>
      <BrandHero />
      <BrandAsExperience />
      <BrandJourney />
      <IdentitySystem />
      <ProductAsBrand />
      <MotionDepth />
      <LaunchAssets />
      <BrandSupport />
      <PageCTA
        eyebrow="In practice"
        title="See how brand thinking becomes product work."
        lead="Case studies, product decisions, and the craft behind them."
        buttonLabel="View Labs"
        href="/labs"
      />
    </>
  );
}
