import type { AnimatedIconName } from "@/components/icons/AnimatedIcon";

/**
 * Labs page — an editorial collection of product thinking.
 *
 * Each entry is a "design lesson", not a deliverable. The copy carries
 * half the story (challenge → title → story → what changed → key insight)
 * and the visual carries the other half.
 *
 * `embed` points at a self-contained interactive HTML mockup served from
 * /public/labs and shown in a scaled iframe (the dominant hero visual).
 * When absent, `visualSlug` falls back to the bespoke animated mockup
 * registered in CaseStudyMedia.
 *
 * `insight` is an array so a punchline can break across two lines — the
 * final line is rendered with accent emphasis as the most memorable
 * element of the row.
 */
export type LabsProject = {
  num: string;
  /** Challenge prompt — small accent text above the title. */
  challenge: string;
  /** Project title — the largest heading in the section. */
  title: string;
  /** Short story, max two paragraphs. */
  story: string[];
  whatChanged: string[];
  insight: string[];
  /** Muted per-case accent — drives challenge text, insight punch, markers. */
  accent: string;
  /** Path to a live interactive HTML mockup under /public/labs (preferred). */
  embed?: string;
  /** Fallback: slug of the case study whose bespoke mockup fills the visual. */
  visualSlug: string;
  /** Fallback glyph if neither embed nor slug has a visual. */
  icon: AnimatedIconName;
};

export const labsProjects: LabsProject[] = [
  {
    num: "01",
    challenge: "How do you reduce noise across large teams?",
    title: "Workforce Time & Resource Management Platform",
    story: [
      "Large organizations often manage hundreds of projects simultaneously. While managers need visibility across teams, employees only need access to the work assigned to them.",
      "This platform connected planning, task allocation, and time tracking through a structured workflow that reduced complexity and improved day-to-day efficiency.",
    ],
    whatChanged: [
      "Simplified task visibility",
      "Reduced information overload",
      "Embedded time tracking into daily workflows",
    ],
    insight: ["Users don't need more visibility.", "They need relevant visibility."],
    accent: "#b3a4d6",
    embed: "/labs/workforce-time-resource-platform.html",
    visualSlug: "workforce-time-resource-platform",
    icon: "network",
  },
  {
    num: "02",
    challenge: "How do you turn data into action?",
    title: "Analytics Intelligence Platform",
    story: [
      "Most dashboards present information. Few help users understand what requires attention next.",
      "This platform focused on surfacing meaningful signals and guiding users toward faster, more informed decisions.",
    ],
    whatChanged: [
      "Improved information hierarchy",
      "Prioritized actionable insights",
      "Reduced cognitive load",
    ],
    insight: ["Data is only valuable", "when it changes a decision."],
    accent: "#93a7bd",
    embed: "/labs/analytics-intelligence-platform.html",
    visualSlug: "predictive-analytics-intelligence",
    icon: "scan",
  },
  {
    num: "03",
    challenge: "How do you explain complex products simply?",
    title: "Enterprise Software Website Experience",
    story: [
      "Enterprise products often contain extensive capabilities that can overwhelm potential customers during evaluation.",
      "The experience was designed to communicate business value before product features, making decision-making easier for buyers.",
    ],
    whatChanged: [
      "Simplified product communication",
      "Improved content structure",
      "Reduced evaluation friction",
    ],
    insight: ["People buy outcomes,", "not functionality."],
    accent: "#a3ba9e",
    embed: "/labs/enterprise-software-website.html",
    visualSlug: "enterprise-software-website",
    icon: "structure",
  },
  {
    num: "04",
    challenge: "How do you help people decide faster?",
    title: "Smart Food Ordering Platform",
    story: [
      "Ordering food often happens in busy environments where users have limited time and attention.",
      "This experience streamlined browsing, selection, and checkout to support faster decision-making.",
    ],
    whatChanged: [
      "Reduced decision fatigue",
      "Streamlined ordering flows",
      "Improved checkout experience",
    ],
    insight: ["Hungry users don't explore.", "They choose."],
    accent: "#cbb39a",
    embed: "/labs/smart-food-ordering.html",
    visualSlug: "smart-food-court-ordering",
    icon: "flow",
  },
  {
    num: "05",
    challenge: "How do you build trust in regulated industries?",
    title: "Cannabis Commerce Platform",
    story: [
      "Regulated industries require balancing compliance, transparency, and usability without overwhelming customers.",
      "The platform focused on creating confidence through clear communication and guided product discovery.",
    ],
    whatChanged: [
      "Improved transparency",
      "Simplified compliance communication",
      "Strengthened user confidence",
    ],
    insight: ["Clarity creates", "confidence."],
    accent: "#8fb0a6",
    embed: "/labs/cannabis-commerce.html",
    visualSlug: "cannabis-commerce-wellness",
    icon: "scale",
  },
  {
    num: "06",
    challenge: "How do you make critical information easier to access?",
    title: "Defence Documentation Platform",
    story: [
      "Operational environments depend on quick access to accurate information, especially as documentation grows in scale.",
      "This platform focused on organizing complex information into a structure that improved discoverability and retrieval.",
    ],
    whatChanged: [
      "Improved information architecture",
      "Enhanced discoverability",
      "Simplified navigation",
    ],
    insight: ["Accuracy is", "a usability feature."],
    accent: "#9aa6c2",
    visualSlug: "defence-operations-documentation",
    icon: "radar",
  },
  {
    num: "07",
    challenge: "How do you simplify operational workflows?",
    title: "Workforce Scheduling & Operations Platform",
    story: [
      "Managing schedules, resources, and operational responsibilities often requires navigating multiple disconnected systems.",
      "This platform unified workflows into a more structured and efficient experience.",
    ],
    whatChanged: [
      "Centralized operational workflows",
      "Improved resource coordination",
      "Reduced process friction",
    ],
    insight: ["The best workflow", "is the one users barely notice."],
    accent: "#bdae9d",
    visualSlug: "workplace-safety-retail",
    icon: "collaborate",
  },
  {
    num: "08",
    challenge: "How do you introduce AI without overwhelming users?",
    title: "AI-Assisted Product Experience",
    story: [
      "AI can improve efficiency, but only when users understand how and why it is supporting their work.",
      "The experience focused on transparency, guidance, and maintaining user control throughout the workflow.",
    ],
    whatChanged: [
      "Integrated AI into familiar workflows",
      "Increased transparency",
      "Preserved user control",
    ],
    insight: ["Trust matters more", "than intelligence."],
    accent: "#bfa6b6",
    visualSlug: "p2p-lending-fintech",
    icon: "brain",
  },
];
