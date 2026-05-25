import type { CaseStudy } from "@/lib/case-studies";
import { ChronosMockup } from "./ChronosMockup";
import { ScrollingImage } from "./ScrollingImage";
import {
  BrandAdvocacyMockup,
  CannabisCommerceMockup,
  DefenceOpsMockup,
  DigitalPublishingMockup,
  EducationRevisionMockup,
  EndlessRunnerMockup,
  EnterpriseSiteMockup,
  EquestrianFitnessMockup,
  MentalWellnessMockup,
  MindfulnessMockup,
  P2PLendingMockup,
  PetSocialMockup,
  PredictiveAnalyticsMockup,
  WorkplaceSafetyMockup,
} from "./studies";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

/**
 * CaseStudyMedia — dispatcher for what fills a case-study card's media
 * slot. Resolves in priority order:
 *   1. Bespoke animated mockup registered by slug.
 *   2. `media.kind === "image"`  — real screenshot with a slow vertical pan.
 *   3. Fallback placeholder      — gradient + animated glyph + index label.
 */

/** Registry of bespoke per-case-study mockup components, keyed by slug. */
const MOCKUP_REGISTRY: Record<string, React.ComponentType> = {
  "workforce-time-resource-platform": ChronosMockup,
  "predictive-analytics-intelligence": PredictiveAnalyticsMockup,
  "enterprise-software-website": EnterpriseSiteMockup,
  "cannabis-commerce-wellness": CannabisCommerceMockup,
  "defence-operations-documentation": DefenceOpsMockup,
  "pet-centric-social": PetSocialMockup,
  "equestrian-fitness-wellness": EquestrianFitnessMockup,
  "workplace-safety-retail": WorkplaceSafetyMockup,
  "p2p-lending-fintech": P2PLendingMockup,
  "educational-learning-revision": EducationRevisionMockup,
  "mental-wellness-tracking": MentalWellnessMockup,
  "mindfulness-personal-growth": MindfulnessMockup,
  "brand-advocacy-referral": BrandAdvocacyMockup,
  "digital-publishing-content": DigitalPublishingMockup,
  "endless-runner-game": EndlessRunnerMockup,
};

type Props = {
  caseStudy: CaseStudy;
  index: number;
  icon: AnimatedIconName;
};

export function CaseStudyMedia({ caseStudy, index, icon }: Props) {
  const Bespoke = MOCKUP_REGISTRY[caseStudy.slug];
  if (Bespoke) return <Bespoke />;

  if (caseStudy.media?.kind === "image") {
    return (
      <ScrollingImage
        src={caseStudy.media.src}
        alt={caseStudy.title}
        orientation={caseStudy.media.orientation}
      />
    );
  }

  const num = String(index + 1).padStart(2, "0");
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 20%, rgba(207, 217, 255, 0.16), transparent 60%)",
        }}
      />
      <div className="lab-case-media-index" aria-hidden>
        {num}
      </div>
      <span className="lab-case-media-glyph">
        <AnimatedIcon name={icon} size="lg" />
      </span>
      <div className="lab-case-media-label">
        <span>Video / Mockup</span>
        <span aria-hidden>{caseStudy.tags[0]}</span>
      </div>
    </>
  );
}
