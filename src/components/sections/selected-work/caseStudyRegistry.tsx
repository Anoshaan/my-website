import React from "react";
import { ProductPathway } from "@/lib/product-pathways";
import { WorkforceCaseStudy } from "./WorkforceCaseStudy";
// Product Platforms & Dashboards
import { EnterpriseOpsCaseStudy } from "./studies/EnterpriseOpsCaseStudy";
import { SaasAnalyticsCaseStudy } from "./studies/SaasAnalyticsCaseStudy";
import { SmartAgricultureCaseStudy } from "./studies/SmartAgricultureCaseStudy";
import { DesktopWireframeCaseStudy } from "./studies/DesktopWireframeCaseStudy";
// Mobile App Experiences
import { BookingFlowCaseStudy } from "./studies/BookingFlowCaseStudy";
import { HealthHabitCaseStudy } from "./studies/HealthHabitCaseStudy";
import { EdTechCaseStudy } from "./studies/EdTechCaseStudy";
import { MobileWireflowCaseStudy } from "./studies/MobileWireflowCaseStudy";
import { FinTechCaseStudy } from "./studies/FinTechCaseStudy";
// Web & CMS Platforms
import { ServiceWebsiteCaseStudy } from "./studies/ServiceWebsiteCaseStudy";
import { SaasWebsiteCaseStudy } from "./studies/SaasWebsiteCaseStudy";
import { LocalServiceCaseStudy } from "./studies/LocalServiceCaseStudy";
import { PortfolioAiCaseStudy } from "./studies/PortfolioAiCaseStudy";
import { AiSprintCaseStudy } from "./studies/AiSprintCaseStudy";
// Commerce & Marketplace
import { EcommerceCaseStudy } from "./studies/EcommerceCaseStudy";
import { MarketplaceMobileCaseStudy } from "./studies/MarketplaceMobileCaseStudy";
import { SubscriptionCaseStudy } from "./studies/SubscriptionCaseStudy";
import { VendorOnboardingCaseStudy } from "./studies/VendorOnboardingCaseStudy";

/**
 * Registry of bespoke case-study modal bodies, keyed by pathway id. Each entry
 * is a hand-built, visual-first story with its own layout, rhythm, and the
 * pathway's assigned accent colour. Ids not listed here fall back to the
 * generic data-driven layout in PathwayModalContent.
 */
export const CASE_STUDY_COMPONENTS: Record<number, React.ComponentType<{ pathway: ProductPathway }>> = {
  1: WorkforceCaseStudy,
  // Product Platforms & Dashboards
  2: EnterpriseOpsCaseStudy,
  3: SaasAnalyticsCaseStudy,
  4: SmartAgricultureCaseStudy,
  14: DesktopWireframeCaseStudy,
  // Mobile App Experiences
  5: BookingFlowCaseStudy,
  7: HealthHabitCaseStudy,
  8: EdTechCaseStudy,
  13: MobileWireflowCaseStudy,
  24: FinTechCaseStudy,
  // Web & CMS Platforms
  9: ServiceWebsiteCaseStudy,
  26: SaasWebsiteCaseStudy,
  27: LocalServiceCaseStudy,
  25: PortfolioAiCaseStudy,
  12: AiSprintCaseStudy,
  // Commerce & Marketplace
  10: EcommerceCaseStudy,
  6: MarketplaceMobileCaseStudy,
  28: SubscriptionCaseStudy,
  29: VendorOnboardingCaseStudy,
};
