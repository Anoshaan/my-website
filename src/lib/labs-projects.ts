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
  /** One short, practical proof/outcome line shown under the story. */
  proof: string;
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
    proof:
      "Built around role-based clarity, so people see only the work that is theirs while managers keep the full picture.",
    whatChanged: [
      "Simplified task visibility",
      "Reduced information overload",
      "Embedded time tracking into daily workflows",
    ],
    insight: ["Users don't need more visibility.", "They need relevant visibility."],
    accent: "#b3a4d6",
    embed: "/labs/case-study-1.html",
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
    proof:
      "Structured to move users from raw data to the next decision faster.",
    whatChanged: [
      "Improved information hierarchy",
      "Prioritized actionable insights",
      "Reduced cognitive load",
    ],
    insight: ["Data is only valuable", "when it changes a decision."],
    accent: "#93a7bd",
    embed: "/labs/case-study-3.html",
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
    proof:
      "Designed to lead with business value before features, so evaluation feels easier.",
    whatChanged: [
      "Simplified product communication",
      "Improved content structure",
      "Reduced evaluation friction",
    ],
    insight: ["People buy outcomes,", "not functionality."],
    accent: "#a3ba9e",
    embed: "/labs/case-study-2.html",
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
    proof:
      "Designed to reduce decision fatigue and speed up everyday ordering.",
    whatChanged: [
      "Reduced decision fatigue",
      "Streamlined ordering flows",
      "Improved checkout experience",
    ],
    insight: ["Hungry users don't explore.", "They choose."],
    accent: "#cbb39a",
    embed: "/labs/case-study-5.html",
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
    proof:
      "Built to make compliance feel clear, so trust comes before the transaction.",
    whatChanged: [
      "Improved transparency",
      "Simplified compliance communication",
      "Strengthened user confidence",
    ],
    insight: ["Clarity creates", "confidence."],
    accent: "#8fb0a6",
    embed: "/labs/case-study-4.html",
    visualSlug: "cannabis-commerce-wellness",
    icon: "scale",
  },
  {
    num: "06",
    challenge: "How do you design for trust in a marketplace?",
    title: "Pet-Centric Social Media Platform",
    story: [
      "Building a marketplace and social experience requires users to trust each other before transacting or connecting.",
      "This platform focused on building comprehensive profiles and verified interactions to foster a safe, engaged community.",
    ],
    proof:
      "Designed to foster genuine connections while ensuring safe marketplace transactions.",
    whatChanged: [
      "Enhanced user verification",
      "Streamlined marketplace flows",
      "Integrated social discovery",
    ],
    insight: ["Trust is the currency", "of community."],
    accent: "#9aa6c2",
    embed: "/labs/case-study-6.html",
    visualSlug: "pet-centric-social",
    icon: "collaborate",
  },
  {
    num: "07",
    challenge: "How do you build lasting daily habits?",
    title: "Mental Wellness & Lifestyle Tracking Platform",
    story: [
      "Building new health habits is difficult. Users often abandon apps when tracking feels like a chore rather than a supportive experience.",
      "This platform transformed routine tracking into an encouraging companion that adapts to the user's progress and mindset.",
    ],
    proof:
      "Built to encourage positive behavioral change through mindful, low-friction interactions.",
    whatChanged: [
      "Reduced tracking friction",
      "Personalized encouragement",
      "Calming visual feedback",
    ],
    insight: ["Consistency beats", "intensity."],
    accent: "#bdae9d",
    embed: "/labs/case-study-7.html",
    visualSlug: "mental-wellness-tracking",
    icon: "radar",
  },
  {
    num: "08",
    challenge: "How do you keep students engaged?",
    title: "Educational Learning & Revision Platform",
    story: [
      "Students often struggle to maintain focus during long revision sessions, especially when learning material feels static and unengaging.",
      "This platform introduced interactive learning tools and structured revision paths to keep students motivated and focused.",
    ],
    proof:
      "Designed to turn passive reading into active, retentive learning.",
    whatChanged: [
      "Interactive learning modules",
      "Structured revision paths",
      "Gamified progress tracking",
    ],
    insight: ["Engagement drives", "retention."],
    accent: "#bfa6b6",
    embed: "/labs/case-study-8.html",
    visualSlug: "educational-learning-revision",
    icon: "brain",
  },
];
