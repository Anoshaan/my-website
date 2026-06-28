/**
 * Product Pathways — the single source of truth for the Selected Work page.
 *
 * The whole page (cards, filter, counts, modal) renders from `PRODUCT_PATHWAYS`
 * and `CATEGORIES`. There are no hard-coded cards, separate detail routes, or
 * per-card modals: one data array, one card, one modal, one filter.
 */

export type PathwayCategory =
  | "All Pathways"
  | "Product Platforms & Dashboards"
  | "Mobile App Experiences"
  | "Web & CMS Platforms"
  | "Commerce & Marketplace"
  | "AI & Automation UX"
  | "Branding & Visual Identity"
  | "Motion, Video & Lottie Systems"
  | "Design Systems & Product Handoff";

/** Stable icon keys consumed by the filter (see CategoryFilter). */
export type CategoryIconKey =
  | "compass"
  | "dashboard"
  | "smartphone"
  | "globe"
  | "shoppingBag"
  | "sparkles"
  | "palette"
  | "clapperboard"
  | "component";

/** Lightweight placeholder layouts. Real mockups can be restored later. */
export type MockupType =
  | "dashboard"
  | "mobile"
  | "website"
  | "commerce"
  | "documentation"
  | "ai"
  | "admin"
  | "fintech"
  | "booking"
  | "marketplace"
  | "branding"
  | "video"
  | "designSystem";

export interface CategoryMeta {
  label: PathwayCategory;
  icon: CategoryIconKey;
  /** Accent used for the active filter chip + count badge. */
  accent: string;
  softBg: string;
  border: string;
}

/**
 * The final 9-category system. "Product Platforms & Dashboards" merges the old
 * Cross-Device Systems + Dashboard & Admin Tools. Each category gets a unique
 * icon and a distinct pastel accent so active states stay readable.
 */
export const CATEGORY_META: CategoryMeta[] = [
  // "All" uses a warm neutral so it never reads as a coloured/purple filter.
  { label: "All Pathways", icon: "compass", accent: "#C9B79C", softBg: "#F4EEE3", border: "#E6DAC8" },
  { label: "Product Platforms & Dashboards", icon: "dashboard", accent: "#8FB8FF", softBg: "#EEF5FF", border: "#C9DCFF" },
  { label: "Mobile App Experiences", icon: "smartphone", accent: "#7DD3FC", softBg: "#ECFAFF", border: "#BDEFFF" },
  { label: "Web & CMS Platforms", icon: "globe", accent: "#6EE7B7", softBg: "#ECFDF5", border: "#A7F3D0" },
  { label: "Commerce & Marketplace", icon: "shoppingBag", accent: "#FFB86B", softBg: "#FFF4E8", border: "#FFD9AD" },
  { label: "AI & Automation UX", icon: "sparkles", accent: "#B69CFF", softBg: "#F4F0FF", border: "#D9CCFF" },
  { label: "Branding & Visual Identity", icon: "palette", accent: "#F0ABFC", softBg: "#FDF4FF", border: "#F5D0FE" },
  { label: "Motion, Video & Lottie Systems", icon: "clapperboard", accent: "#FCA5A5", softBg: "#FEF2F2", border: "#FECACA" },
  { label: "Design Systems & Product Handoff", icon: "component", accent: "#94A3B8", softBg: "#F1F5F9", border: "#E2E8F0" },
];

export const CATEGORIES: readonly PathwayCategory[] = CATEGORY_META.map((c) => c.label);

export const getCategoryMeta = (category: PathwayCategory): CategoryMeta =>
  CATEGORY_META.find((c) => c.label === category) ?? CATEGORY_META[0];

export interface ExternalLink {
  label: string;
  url: string;
}

export interface ProductPathway {
  id: number;
  title: string;
  shortTitle: string;
  question: string;
  description: string;
  summaryLine: string;
  categories: PathwayCategory[];
  tags: string[];
  whatChanged: string[];
  keyInsight: string;
  accentColor: string;
  accentSoftBg: string;
  accentBorder: string;
  /** Default ordering rank (1 = first). Also used to sort filtered results. */
  priority: number;
  mockupType: MockupType;
  externalLinks?: ExternalLink[];
  status?: "placeholder";
}

export const PRODUCT_PATHWAYS: ProductPathway[] = [
  {
    id: 1,
    title: "Workforce Time & Resource Management Platform",
    shortTitle: "Workforce Time & Resource",
    question: "How do you reduce noise across large teams?",
    description:
      "Large organizations often manage hundreds of projects, schedules, and responsibilities at the same time. This platform connected planning, task allocation, resource visibility, and time tracking into one structured workflow so managers could see the full picture while employees only saw what mattered to them.",
    summaryLine:
      "Built around role-based clarity, so people see only the work that is theirs while managers keep the full picture.",
    categories: ["Product Platforms & Dashboards", "Design Systems & Product Handoff"],
    tags: ["Workforce", "Time Tracking", "Resource Planning"],
    whatChanged: [
      "Simplified task visibility",
      "Reduced information overload",
      "Embedded time tracking into daily workflows",
    ],
    keyInsight: "Users do not need more visibility. They need relevant visibility.",
    accentColor: "#7BCDBA",
    accentSoftBg: "#E8F8F4",
    accentBorder: "#B9E6DC",
    priority: 1,
    mockupType: "dashboard",
    status: "placeholder",
  },
  {
    id: 2,
    title: "Analytics Intelligence Platform",
    shortTitle: "Analytics Intelligence",
    question: "How do you turn data into action?",
    description:
      "Most dashboards show information, but very few help users understand what needs attention next. This platform focused on surfacing meaningful signals, reducing dashboard noise, and guiding users toward faster, more confident decisions.",
    summaryLine: "Structured to move users from raw data to the next decision faster.",
    categories: ["Product Platforms & Dashboards", "AI & Automation UX"],
    tags: ["Analytics", "Business Intelligence", "Decision Support"],
    whatChanged: [
      "Improved information hierarchy",
      "Prioritized actionable insights",
      "Reduced cognitive load",
    ],
    keyInsight: "Data is only valuable when it changes a decision.",
    accentColor: "#8FB8FF",
    accentSoftBg: "#EEF5FF",
    accentBorder: "#C9DCFF",
    priority: 2,
    mockupType: "dashboard",
    status: "placeholder",
  },
  {
    id: 3,
    title: "Enterprise Software Website Experience",
    shortTitle: "Enterprise Software Website",
    question: "How do you explain complex products simply?",
    description:
      "Enterprise products often contain deep capabilities that can overwhelm potential customers during evaluation. This experience was designed to communicate business value before product features, making the buying journey easier to understand.",
    summaryLine: "Designed to lead with business value before features, so evaluation feels easier.",
    categories: ["Web & CMS Platforms", "Branding & Visual Identity"],
    tags: ["Website", "CMS", "B2B"],
    whatChanged: [
      "Simplified product communication",
      "Improved content structure",
      "Reduced evaluation friction",
    ],
    keyInsight: "People buy outcomes, not functionality.",
    accentColor: "#C7A7FF",
    accentSoftBg: "#F5F0FF",
    accentBorder: "#DECFFF",
    priority: 3,
    mockupType: "website",
    status: "placeholder",
  },
  {
    id: 4,
    title: "Smart Food Ordering Platform",
    shortTitle: "Smart Food Ordering",
    question: "How do you help people decide faster?",
    description:
      "Ordering food often happens in busy environments where users have limited time and attention. This product streamlined browsing, item selection, customization, and checkout to support faster everyday decisions.",
    summaryLine: "Designed to reduce decision fatigue and speed up everyday ordering.",
    categories: ["Mobile App Experiences", "Commerce & Marketplace"],
    tags: ["Food Tech", "Mobile", "Checkout"],
    whatChanged: [
      "Reduced decision fatigue",
      "Streamlined ordering flows",
      "Improved checkout experience",
    ],
    keyInsight: "Hungry users do not explore. They choose.",
    accentColor: "#FFB86B",
    accentSoftBg: "#FFF4E8",
    accentBorder: "#FFD9AD",
    priority: 4,
    mockupType: "commerce",
    status: "placeholder",
  },
  {
    id: 5,
    title: "Cannabis Commerce & Wellness Platform",
    shortTitle: "Cannabis Commerce & Wellness",
    question: "How do you build trust in regulated industries?",
    description:
      "Regulated industries require a careful balance between compliance, transparency, product education, and usability. This platform focused on guided product discovery, clear communication, and confidence-building UX.",
    summaryLine: "Built to make compliance feel clear, so trust comes before the transaction.",
    categories: ["Commerce & Marketplace", "Web & CMS Platforms"],
    tags: ["E-Commerce", "Regulated", "Wellness"],
    whatChanged: [
      "Improved transparency",
      "Simplified compliance communication",
      "Strengthened user confidence",
    ],
    keyInsight: "Clarity creates confidence.",
    accentColor: "#9AD29A",
    accentSoftBg: "#F0FAF0",
    accentBorder: "#C7EBC7",
    priority: 5,
    mockupType: "commerce",
    status: "placeholder",
  },
  {
    id: 6,
    title: "Defence Documentation Platform",
    shortTitle: "Defence Documentation",
    question: "How do you make critical information easier to access?",
    description:
      "Operational environments depend on quick access to accurate information, especially when documentation grows in scale. This platform organized complex documentation into a searchable, structured, and more usable system.",
    summaryLine: "Structured so critical information stays fast to find under pressure.",
    categories: ["Product Platforms & Dashboards", "Web & CMS Platforms"],
    tags: ["Defence", "Documentation", "Search"],
    whatChanged: [
      "Improved information architecture",
      "Enhanced discoverability",
      "Simplified navigation",
    ],
    keyInsight: "Accuracy is a usability feature.",
    accentColor: "#A8B5C8",
    accentSoftBg: "#F2F5F8",
    accentBorder: "#D5DDE8",
    priority: 6,
    mockupType: "documentation",
    status: "placeholder",
  },
  {
    id: 7,
    title: "Workforce Scheduling & Operations Platform",
    shortTitle: "Workforce Scheduling & Operations",
    question: "How do you simplify operational workflows?",
    description:
      "Managing schedules, resources, audits, incidents, and daily operations often requires users to move between disconnected systems. This platform unified those operational tasks into a calmer, clearer workflow.",
    summaryLine: "Built to fold scattered operational tasks into one calmer daily flow.",
    categories: ["Product Platforms & Dashboards", "Mobile App Experiences"],
    tags: ["Operations", "Scheduling", "Workflows"],
    whatChanged: [
      "Centralized operational workflows",
      "Improved resource coordination",
      "Reduced process friction",
    ],
    keyInsight: "The best workflow is the one users barely notice.",
    accentColor: "#FFD166",
    accentSoftBg: "#FFF8E6",
    accentBorder: "#FFE5A3",
    priority: 7,
    mockupType: "admin",
    status: "placeholder",
  },
  {
    id: 8,
    title: "AI-Assisted Product Experience",
    shortTitle: "AI-Assisted Product",
    question: "How do you introduce AI without overwhelming users?",
    description:
      "AI can improve efficiency, but only when users understand how and why it is supporting their work. This experience focused on transparency, guidance, and keeping users in control throughout the workflow.",
    summaryLine: "Designed to keep people in control as AI supports their work.",
    categories: ["AI & Automation UX", "Product Platforms & Dashboards"],
    tags: ["AI", "Automation", "Transparency"],
    whatChanged: [
      "Integrated AI into familiar workflows",
      "Increased transparency",
      "Preserved user control",
    ],
    keyInsight: "Trust matters more than intelligence.",
    accentColor: "#B69CFF",
    accentSoftBg: "#F4F0FF",
    accentBorder: "#D9CCFF",
    priority: 8,
    mockupType: "ai",
    status: "placeholder",
  },
  {
    id: 9,
    title: "Cross-Device Product Ecosystem",
    shortTitle: "Cross-Device Ecosystem",
    question: "How do you keep one product feeling consistent across devices?",
    description:
      "Users often move between desktop, tablet, and mobile while completing the same workflow. This product ecosystem focused on consistent interaction patterns, responsive layouts, and device-aware experiences without making every screen feel identical.",
    summaryLine: "Designed so the experience feels connected across devices, not copied across devices.",
    categories: [
      "Product Platforms & Dashboards",
      "Mobile App Experiences",
      "Web & CMS Platforms",
    ],
    tags: ["Responsive", "Cross-Device", "Systems"],
    whatChanged: [
      "Unified patterns across breakpoints",
      "Improved responsive behavior",
      "Reduced context switching between devices",
    ],
    keyInsight: "Consistency is not sameness. It is predictability.",
    accentColor: "#7DD3FC",
    accentSoftBg: "#ECFAFF",
    accentBorder: "#BDEFFF",
    priority: 9,
    mockupType: "dashboard",
    status: "placeholder",
  },
  {
    id: 10,
    title: "Dashboard & Admin Tools System",
    shortTitle: "Dashboard & Admin Tools",
    question: "How do you make admin tools feel less heavy?",
    description:
      "Admin tools often become dense because every function feels important. This system focused on hierarchy, grouped actions, clearer table patterns, reusable dashboard components, and predictable admin workflows.",
    summaryLine: "Built to make complex admin work feel structured, clear, and manageable.",
    categories: ["Product Platforms & Dashboards", "Design Systems & Product Handoff"],
    tags: ["Admin", "Dashboards", "Tables"],
    whatChanged: [
      "Improved dashboard hierarchy",
      "Standardized admin patterns",
      "Reduced dense interface clutter",
    ],
    keyInsight: "Admin users need speed, but they also need calm.",
    accentColor: "#93C5FD",
    accentSoftBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    priority: 10,
    mockupType: "admin",
    status: "placeholder",
  },
  {
    id: 11,
    title: "FinTech Wallet & Lending Experience",
    shortTitle: "FinTech Wallet & Lending",
    question: "How do you make financial actions feel clear and safe?",
    description:
      "Financial products need to communicate balances, loans, repayments, transfers, and risk in a way that feels simple and trustworthy. This experience focused on clear action states, payment visibility, and confidence-building UI.",
    summaryLine: "Designed to make money movement feel simple, visible, and controlled.",
    categories: ["Mobile App Experiences", "Commerce & Marketplace"],
    tags: ["FinTech", "Wallet", "Lending"],
    whatChanged: [
      "Clarified key financial actions",
      "Improved repayment visibility",
      "Strengthened trust through interface clarity",
    ],
    keyInsight: "People do not trust what they cannot understand.",
    accentColor: "#6EE7B7",
    accentSoftBg: "#ECFDF5",
    accentBorder: "#A7F3D0",
    priority: 11,
    mockupType: "fintech",
    status: "placeholder",
  },
  {
    id: 12,
    title: "Booking & Reservation Platform",
    shortTitle: "Booking & Reservation",
    question: "How do you make booking feel effortless?",
    description:
      "Booking flows can quickly become frustrating when users need to compare availability, pricing, choices, and confirmation details. This experience focused on reducing friction from discovery to confirmation.",
    summaryLine: "Designed to help users move from intent to confirmed booking with fewer doubts.",
    categories: [
      "Mobile App Experiences",
      "Commerce & Marketplace",
      "Web & CMS Platforms",
    ],
    tags: ["Booking", "Reservations", "Availability"],
    whatChanged: [
      "Simplified availability selection",
      "Improved confirmation clarity",
      "Reduced booking-step friction",
    ],
    keyInsight: "A booking flow succeeds when users feel certain before they pay.",
    accentColor: "#FDBA74",
    accentSoftBg: "#FFF7ED",
    accentBorder: "#FED7AA",
    priority: 12,
    mockupType: "booking",
    status: "placeholder",
  },
  {
    id: 13,
    title: "Marketplace Mobile App Experience",
    shortTitle: "Marketplace Mobile App",
    question: "How do you help users discover, compare, and choose?",
    description:
      "Marketplace experiences need to balance discovery, trust, product comparison, and transaction confidence. This mobile experience focused on clearer browsing, better item cards, and a smoother path from search to action.",
    summaryLine: "Built to make discovery feel useful instead of overwhelming.",
    categories: ["Mobile App Experiences", "Commerce & Marketplace"],
    tags: ["Marketplace", "Discovery", "Mobile"],
    whatChanged: [
      "Improved product/service discovery",
      "Strengthened comparison patterns",
      "Reduced friction between browsing and action",
    ],
    keyInsight: "Marketplaces work best when choice feels guided.",
    accentColor: "#F9A8D4",
    accentSoftBg: "#FDF2F8",
    accentBorder: "#FBCFE8",
    priority: 13,
    mockupType: "marketplace",
    status: "placeholder",
  },
  {
    id: 14,
    title: "Branding & Visual Identity Case Studies",
    shortTitle: "Branding & Visual Identity",
    question: "How do you make a product or business feel memorable?",
    description:
      "Branding is not only about a logo. It is about creating a visual system that makes a product feel clear, trustworthy, and recognizable across touchpoints. This pathway showcases selected branding, graphic design, identity exploration, and visual direction work.",
    summaryLine:
      "A place to show brand thinking, graphic design, identity systems, and visual storytelling.",
    categories: ["Branding & Visual Identity"],
    tags: ["Branding", "Graphic Design", "Identity"],
    whatChanged: [
      "Created clearer visual direction",
      "Improved brand consistency",
      "Connected graphic design with product communication",
    ],
    keyInsight: "A strong brand makes the product easier to remember.",
    accentColor: "#F0ABFC",
    accentSoftBg: "#FDF4FF",
    accentBorder: "#F5D0FE",
    priority: 15,
    mockupType: "branding",
    status: "placeholder",
  },
  {
    id: 15,
    title: "Aeturnum Insights Podcast Production",
    shortTitle: "Aeturnum Insights Podcast",
    question: "How do you turn recorded conversations into polished content?",
    description:
      "This pathway showcases podcast production, video editing, visual cleanup, pacing, sound-led storytelling, and content presentation work. The two YouTube examples below show the final published output: long-form video edited for pacing, clarity, and presentation.",
    summaryLine:
      "A video and podcast production case study showing editing, pacing, content structure, and final publishing output.",
    categories: ["Motion, Video & Lottie Systems", "Branding & Visual Identity"],
    tags: ["Video Editing", "Podcast", "Pacing"],
    whatChanged: [
      "Edited long-form video content",
      "Improved pacing and presentation",
      "Prepared polished podcast/video output for publishing",
    ],
    keyInsight: "Good editing makes content easier to understand, not just nicer to watch.",
    accentColor: "#FCA5A5",
    accentSoftBg: "#FEF2F2",
    accentBorder: "#FECACA",
    priority: 16,
    mockupType: "video",
    externalLinks: [
      { label: "Watch episode on YouTube", url: "https://www.youtube.com/watch?v=cauWpirDw9w" },
      { label: "Watch episode on YouTube", url: "https://www.youtube.com/watch?v=6XAW9OmWaIY" },
    ],
    status: "placeholder",
  },
  {
    id: 16,
    title: "Design System & Product Handoff Library",
    shortTitle: "Design System & Handoff",
    question: "How do you help teams build faster without losing quality?",
    description:
      "Product teams move faster when patterns, components, documentation, and handoff rules are clear. This pathway showcases reusable UI systems, component logic, design tokens, developer handoff, and consistency across product screens.",
    summaryLine: "Built to reduce repeated design decisions and make product delivery more consistent.",
    categories: ["Design Systems & Product Handoff", "Product Platforms & Dashboards"],
    tags: ["Design System", "Components", "Handoff"],
    whatChanged: [
      "Standardized reusable components",
      "Improved design-to-development handoff",
      "Reduced inconsistency across screens",
    ],
    keyInsight: "A design system is not a file. It is a shared way of working.",
    accentColor: "#CBD5E1",
    accentSoftBg: "#F8FAFC",
    accentBorder: "#E2E8F0",
    priority: 14,
    mockupType: "designSystem",
    status: "placeholder",
  },
];

/** True when a pathway belongs to the given category ("All Pathways" matches all). */
export const pathwayInCategory = (pathway: ProductPathway, category: PathwayCategory): boolean =>
  category === "All Pathways" || pathway.categories.includes(category);

/** Pathways for a category, ordered by priority (strongest first). */
export const getPathwaysForCategory = (category: PathwayCategory): ProductPathway[] =>
  PRODUCT_PATHWAYS.filter((p) => pathwayInCategory(p, category)).sort(
    (a, b) => a.priority - b.priority
  );

/** Live counts per category, derived from the data (never hard-coded). */
export const getCategoryCounts = (): Record<PathwayCategory, number> => {
  const counts = {} as Record<PathwayCategory, number>;
  CATEGORIES.forEach((cat) => {
    counts[cat] = PRODUCT_PATHWAYS.filter((p) => pathwayInCategory(p, cat)).length;
  });
  return counts;
};
