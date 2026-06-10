import type { AnimatedIconName } from "@/components/icons/AnimatedIcon";

/**
 * Labs page — editorial showcase of product thinking.
 *
 * Each entry is a "design lesson", not a deliverable. The copy is the
 * focus (domain → question → story → what changed → key insight); the
 * `visualSlug` only points at the bespoke animated mockup (registered in
 * CaseStudyMedia) that dominates the visual side of the row.
 *
 * `insight` is an array so a punchline can break across two lines — the
 * final line is rendered with accent emphasis.
 */
export type LabsProject = {
  num: string;
  domain: string;
  question: string;
  story: string;
  whatChanged: string[];
  insight: string[];
  /** Slug of the case study whose animated mockup fills the visual side. */
  visualSlug: string;
  /** Fallback glyph if the slug has no bespoke mockup. */
  icon: AnimatedIconName;
  ctaHref: string;
};

const REQUEST = "/#contact";

export const labsProjects: LabsProject[] = [
  {
    num: "01",
    domain: "Workforce Operations",
    question: "How do you reduce noise across large teams?",
    story:
      "Large organizations often manage hundreds of projects simultaneously. While project managers need visibility across initiatives, employees only need access to the work assigned to them. This project focused on redesigning the workflow between planning, task allocation, and time tracking. By structuring information around responsibility rather than hierarchy, teams could focus on relevant work while managers retained visibility across operations.",
    whatChanged: [
      "Simplified task visibility",
      "Structured workflows around responsibility",
      "Embedded time tracking into daily operations",
    ],
    insight: ["Users don't need more visibility.", "They need relevant visibility."],
    visualSlug: "workforce-time-resource-platform",
    icon: "network",
    ctaHref: REQUEST,
  },
  {
    num: "02",
    domain: "Analytics & Intelligence",
    question: "How do you turn data into action?",
    story:
      "Many analytics platforms successfully present information but fail to support decision-making. Users often spend more time interpreting dashboards than acting on them. This project explored ways to surface meaningful signals, prioritize attention, and create experiences that guide users toward informed actions rather than passive observation.",
    whatChanged: [
      "Improved information hierarchy",
      "Highlighted actionable insights",
      "Reduced cognitive overload",
    ],
    insight: ["Data is only valuable", "when it changes a decision."],
    visualSlug: "predictive-analytics-intelligence",
    icon: "scan",
    ctaHref: REQUEST,
  },
  {
    num: "03",
    domain: "Enterprise Software",
    question: "How do you explain complex products simply?",
    story:
      "Enterprise software often contains extensive capabilities that can overwhelm potential customers during evaluation. The challenge was creating a digital experience that communicated value before features. The experience was structured around business outcomes, helping visitors quickly understand how the platform solved real operational problems.",
    whatChanged: [
      "Simplified product communication",
      "Improved content structure",
      "Reduced evaluation friction",
    ],
    insight: ["People buy outcomes,", "not functionality."],
    visualSlug: "enterprise-software-website",
    icon: "structure",
    ctaHref: REQUEST,
  },
  {
    num: "04",
    domain: "Food & Commerce",
    question: "How do you help people decide faster?",
    story:
      "Ordering food should be simple, but crowded menus, competing options, and time pressure can create unnecessary friction. This experience focused on helping users move from browsing to ordering with greater confidence while maintaining flexibility for customization and discovery.",
    whatChanged: [
      "Streamlined ordering flows",
      "Reduced decision fatigue",
      "Improved checkout experience",
    ],
    insight: ["Hungry users don't explore.", "They choose."],
    visualSlug: "smart-food-court-ordering",
    icon: "flow",
    ctaHref: REQUEST,
  },
  {
    num: "05",
    domain: "Regulated Commerce",
    question: "How do you build trust in restricted industries?",
    story:
      "In regulated industries, compliance requirements often compete with usability goals. The challenge was creating a shopping experience that felt approachable while maintaining transparency and regulatory clarity. The solution balanced product discovery, trust signals, and educational content without overwhelming users.",
    whatChanged: [
      "Improved transparency",
      "Simplified compliance communication",
      "Strengthened user confidence",
    ],
    insight: ["Clarity creates confidence."],
    visualSlug: "cannabis-commerce-wellness",
    icon: "scale",
    ctaHref: REQUEST,
  },
  {
    num: "06",
    domain: "Defence Systems",
    question: "How do you make critical information easier to access?",
    story:
      "Operational environments depend on accurate documentation and efficient access to information. As information grows, discoverability becomes just as important as accuracy. This project focused on structuring large volumes of documentation into an experience that improved navigation, comprehension, and retrieval.",
    whatChanged: [
      "Improved information architecture",
      "Enhanced discoverability",
      "Simplified navigation patterns",
    ],
    insight: ["Accuracy is a usability feature."],
    visualSlug: "defence-operations-documentation",
    icon: "radar",
    ctaHref: REQUEST,
  },
  {
    num: "07",
    domain: "Productivity & Workflows",
    question: "How do you remove friction from daily work?",
    story:
      "Teams often spend significant time navigating systems, repeating actions, and managing operational overhead. The challenge was identifying opportunities to simplify recurring workflows without disrupting existing processes. The result was a more focused experience that reduced effort while improving efficiency.",
    whatChanged: [
      "Simplified repetitive workflows",
      "Reduced operational overhead",
      "Improved process efficiency",
    ],
    insight: ["The best workflow", "is the one users barely notice."],
    visualSlug: "workplace-safety-retail",
    icon: "collaborate",
    ctaHref: REQUEST,
  },
  {
    num: "08",
    domain: "AI-Assisted Experiences",
    question: "How do you introduce AI without overwhelming users?",
    story:
      "AI features often promise efficiency but can introduce uncertainty when users lose visibility or control. The challenge was integrating intelligent assistance into existing workflows while maintaining trust and predictability. The solution focused on transparency, guidance, and gradual adoption rather than automation for its own sake.",
    whatChanged: [
      "Integrated AI into familiar workflows",
      "Increased transparency",
      "Preserved user control",
    ],
    insight: ["Trust matters more", "than intelligence."],
    visualSlug: "p2p-lending-fintech",
    icon: "brain",
    ctaHref: REQUEST,
  },
];
