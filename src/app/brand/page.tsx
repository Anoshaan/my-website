import { BrandHero } from "@/components/sections/brand/BrandHero";
import { BrandAsExperience } from "@/components/sections/brand/BrandAsExperience";
import { BrandCapabilities } from "@/components/sections/brand/BrandCapabilities";
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
      <BrandCapabilities />
      <BrandJourney />
      <IdentitySystem />
      <ProductAsBrand />
      <MotionDepth />
      <LaunchAssets />
      <BrandSupport />
      <PageCTA
        title="Have a brand idea? Let's shape it properly."
        lead="Whether you're starting from scratch or improving an existing brand, I can help turn the idea into a clear digital experience."
        buttonLabel="Start a Brand Conversation"
        href="mailto:hello@anoshaan.com"
      />
    </>
  );
}
