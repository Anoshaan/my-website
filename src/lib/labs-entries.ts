/**
 * Labs — editorial "design journal" entries. Each entry is a single
 * product challenge framed as: a prompt (the challenge question), the
 * project, a two-paragraph story, then two side-by-side columns —
 * "What Changed" and the "Key Insight" (the memorable takeaway).
 *
 * Visuals resolve through `LabEntryVisual` by `visual.key` (bespoke
 * animated mockups) or by rendering a real screenshot when
 * `visual.kind === "image"`.
 */

export type LabVisual =
  | { kind: "mockup"; key: string }
  | { kind: "image"; src: string; orientation: "web" | "mobile" };

export type LabEntry = {
  /** Two-digit index shown as a quiet kicker ("Lab 01"). */
  index: string;
  /** Accent that themes the visual wash, challenge prompt, and bullets. */
  accent: string;
  /** The prompt — rendered in accent, framed as a question. */
  challenge: string;
  title: string;
  /** Two short paragraphs, maximum. */
  story: string[];
  /** "What Changed" bullets. */
  whatChanged: string[];
  /** "Key Insight" — one or two short lines, visually emphasized. */
  keyInsight: string[];
  visual: LabVisual;
};

export const labEntries: LabEntry[] = [
  {
    index: "01",
    accent: "#8aa6ff",
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
    keyInsight: ["Users don't need more visibility.", "They need relevant visibility."],
    visual: { kind: "mockup", key: "chronos" },
  },
  {
    index: "02",
    accent: "#4dc9c9",
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
    keyInsight: ["Data is only valuable when it changes a decision."],
    visual: { kind: "mockup", key: "analytics" },
  },
  {
    index: "03",
    accent: "#8aa6ff",
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
    keyInsight: ["People buy outcomes, not functionality."],
    visual: { kind: "mockup", key: "enterprise" },
  },
  {
    index: "04",
    accent: "#ff9a6b",
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
    keyInsight: ["Hungry users don't explore.", "They choose."],
    visual: {
      kind: "image",
      src: "/case-studies/smart-food-court-ordering.webp",
      orientation: "mobile",
    },
  },
  {
    index: "05",
    accent: "#5dc287",
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
    keyInsight: ["Clarity creates confidence."],
    visual: { kind: "mockup", key: "cannabis" },
  },
  {
    index: "06",
    accent: "#6fa9d6",
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
    keyInsight: ["Accuracy is a usability feature."],
    visual: { kind: "mockup", key: "defence" },
  },
  {
    index: "07",
    accent: "#ff8a5c",
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
    keyInsight: ["The best workflow is the one users barely notice."],
    visual: { kind: "mockup", key: "operations" },
  },
  {
    index: "08",
    accent: "#9f8aff",
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
    keyInsight: ["Trust matters more than intelligence."],
    visual: { kind: "mockup", key: "ai" },
  },
];
