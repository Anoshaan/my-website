import { labsProjects } from "./labs-projects";

/**
 * Data-driven content for the detailed Labs case study overlays.
 *
 * Every detailed case study is described here as plain data — an editorial
 * hero plus an ordered list of sections, each pairing copy with a typed
 * `Visual` directive. A single renderer (`CaseStudyArticle`) reads this and
 * draws the same premium layout for all studies, so adding a new one is just
 * a new entry in `caseStudies` (and a registry line in `case-study-details`).
 *
 * The accent colour is NOT redefined here — it is read from the matching
 * `labsProjects` entry so each overlay stays visually tied to its Labs row.
 */

/* ------------------------------------------------------------------ icons */
export type IconName =
  | "director"
  | "pm"
  | "teamLead"
  | "employee"
  | "clock"
  | "report"
  | "eyeFilter"
  | "nodes"
  | "focus"
  | "chartUp"
  | "search"
  | "bolt"
  | "compass"
  | "layers"
  | "shield"
  | "cart"
  | "tag"
  | "badge"
  | "sparkle"
  | "menu";

/* ----------------------------------------------------------------- visuals */
export type FlowNode = { label: string; sub?: string; icon: IconName };
export type RolePreview = "stats" | "bars" | "list";
export type RoleCard = {
  role: string;
  need: string;
  icon: IconName;
  preview: RolePreview;
};
export type Layer = {
  label: string;
  chips: number;
  sharp?: boolean;
  focus?: boolean;
};
export type StepKind =
  | "project"
  | "tasks"
  | "team"
  | "filter"
  | "time"
  | "report";
export type Step = { label: string; kind: StepKind };
export type CollageMock =
  | "mgr"
  | "emp"
  | "time"
  | "res"
  | "rep"
  | "kpi"
  | "trend"
  | "anomaly"
  | "bars"
  | "list"
  | "page"
  | "menu"
  | "product"
  | "cart"
  | "detail";
export type CollageCard = { mock: CollageMock; caption: string; span?: boolean };
export type MotionGlyph =
  | "assign"
  | "clock"
  | "warn"
  | "approve"
  | "sync"
  | "drop"
  | "loader"
  | "prog"
  | "line"
  | "reveal"
  | "cart"
  | "badge";
export type MotionTile = { label: string; glyph: MotionGlyph };
export type InsightPanel = { label: string; body: string };

export type Visual =
  | {
      kind: "flow";
      nodes: FlowNode[];
      legend?: { down: string; up?: string };
    }
  | { kind: "roles"; cards: RoleCard[] }
  | { kind: "layers"; layers: Layer[]; caption?: string }
  | { kind: "steps"; steps: Step[] }
  | { kind: "collage"; cards: CollageCard[] }
  | {
      kind: "ai";
      title: string;
      message: string;
      confidence: number;
      reasons: string[];
      features: string[];
      applyLabel: string;
    }
  | { kind: "motion"; tiles: MotionTile[] }
  | { kind: "insight"; panels: InsightPanel[] }
  | { kind: "beforeAfter"; before: string; after: string }
  | { kind: "timeline"; steps: string[] }
  | { kind: "balance"; left: string; right: string; center: string }
  | { kind: "mobileFlow"; steps: string[] };

/* ---------------------------------------------------------------- sections */
export type CaseSection = {
  heading: string;
  /** Optional large lead question shown above the body copy. */
  question?: string;
  paragraphs?: string[];
  /** Emphasized single line under the copy (e.g. a key message). */
  lead?: string;
  /** Small mono caption under the visual. */
  note?: string;
  visual?: Visual;
};

export type CaseStudyContent = {
  num: string;
  title: string;
  challenge: string;
  intro: string;
  tags: string[];
  /** Resolved from the matching Labs project — never hand-authored. */
  accent: string;
  sections: CaseSection[];
  takeaway: { quote: string[]; closing: string };
};

const accentOf = (num: string) =>
  labsProjects.find((p) => p.num === num)?.accent ?? "#b3a4d6";

/* ================================================================ CONTENT */

const workforce: CaseStudyContent = {
  num: "01",
  title: "Workforce Time & Resource Management Platform",
  challenge: "How do you reduce noise across large teams?",
  intro:
    "A workforce operations platform designed to connect planning, project allocation, and time tracking while helping employees focus only on the work relevant to them.",
  tags: [
    "Enterprise SaaS",
    "Workforce Management",
    "Resource Planning",
    "Time Tracking",
    "Internal Operations",
  ],
  accent: accentOf("01"),
  sections: [
    {
      heading: "The business problem",
      paragraphs: [
        "Large organizations manage multiple teams, projects, and billable resources at the same time. Directors need visibility across operations, project managers need control over delivery, and employees need a fast way to understand what they are responsible for today.",
        "The problem was not collecting more data. The problem was reducing the noise between planning and execution.",
      ],
      visual: {
        kind: "flow",
        nodes: [
          { label: "Directors", sub: "Strategy and oversight", icon: "director" },
          { label: "Project Managers", sub: "Planning and delivery", icon: "pm" },
          { label: "Team Leads", sub: "Coordination", icon: "teamLead" },
          { label: "Employees", sub: "Assigned work", icon: "employee" },
          { label: "Time Logs", sub: "Hours recorded", icon: "clock" },
          { label: "Reporting", sub: "Utilization back up", icon: "report" },
        ],
        legend: { down: "Planning flows down", up: "Reporting flows up" },
      },
    },
    {
      heading: "The UX challenge",
      question: "How do you design one system for many levels of responsibility?",
      paragraphs: [
        "One system could not show the same level of information to every user. The interface needed to adapt based on responsibility, context, and the decision each role needed to make.",
      ],
      visual: {
        kind: "roles",
        cards: [
          {
            role: "Director",
            need: "Needs portfolio-level visibility.",
            icon: "director",
            preview: "stats",
          },
          {
            role: "Project Manager",
            need: "Needs allocation and delivery control.",
            icon: "pm",
            preview: "bars",
          },
          {
            role: "Employee",
            need: "Needs focused task visibility and fast time entry.",
            icon: "employee",
            preview: "list",
          },
        ],
      },
    },
    {
      heading: "Designing around responsibility, not hierarchy",
      paragraphs: [
        "The product was structured around what each user needed to act on, not simply where they sat in the organization.",
        "Managers could see broader operational context. Employees saw a focused task view that removed irrelevant projects, teams, and administrative noise.",
      ],
      visual: {
        kind: "layers",
        layers: [
          { label: "Organization", chips: 6 },
          { label: "Projects", chips: 5 },
          { label: "Teams", chips: 4 },
          { label: "Assigned Work", chips: 3, sharp: true },
          { label: "Time Entry", chips: 2, focus: true },
        ],
        caption:
          "Noise is filtered at every level before it reaches the employee.",
      },
    },
    {
      heading: "From planning to execution",
      paragraphs: [
        "Planning, allocation, time tracking, and reporting were treated as connected parts of one workflow rather than separate tools.",
      ],
      visual: {
        kind: "steps",
        steps: [
          { label: "Project created", kind: "project" },
          { label: "Tasks assigned", kind: "tasks" },
          { label: "Team members mapped", kind: "team" },
          { label: "Dashboard filtered", kind: "filter" },
          { label: "Time recorded", kind: "time" },
          { label: "Reports updated", kind: "report" },
        ],
      },
    },
    {
      heading: "Where AI supports the workflow",
      paragraphs: [
        "AI should not replace decision-making. It should reduce operational overhead by surfacing useful signals, explaining recommendations, and keeping users in control.",
      ],
      lead: "Trust matters more than intelligence.",
      visual: {
        kind: "ai",
        title: "AI suggestion",
        message: "3 team members may exceed planned capacity this week.",
        confidence: 82,
        reasons: [
          "Active tasks across 3 members",
          "Planned hours exceed availability",
          "Current utilization trending up",
        ],
        features: [
          "Suggest missing time entries",
          "Detect workload conflicts",
          "Recommend task categorization",
          "Highlight resource risks",
          "Summarize weekly utilization",
        ],
        applyLabel: "Apply suggestion",
      },
    },
    {
      heading: "Motion, icons, and visual feedback",
      paragraphs: [
        "Motion helped communicate state changes, hierarchy, progress, and successful actions. Small interactions made the system feel responsive while keeping the experience calm and enterprise-ready.",
      ],
      note: "Motion explains state changes. It does not decorate.",
      visual: {
        kind: "motion",
        tiles: [
          { label: "Task assigned", glyph: "assign" },
          { label: "Time saved", glyph: "clock" },
          { label: "Resource warning", glyph: "warn" },
          { label: "Timesheet approved", glyph: "approve" },
          { label: "Reporting synced", glyph: "sync" },
          { label: "Dropdown filter", glyph: "drop" },
          { label: "Loading to complete", glyph: "loader" },
          { label: "Progress updated", glyph: "prog" },
        ],
      },
    },
  ],
  takeaway: {
    quote: ["Users don't need more visibility.", "They need relevant visibility."],
    closing:
      "The strongest design decision was not adding more information. It was deciding what each user did not need to see.",
  },
};

const analytics: CaseStudyContent = {
  num: "02",
  title: "Analytics Intelligence Platform",
  challenge: "How do you turn data into action?",
  intro:
    "An analytics experience designed to help teams move beyond passive reporting and understand what needs attention, what has changed, and where decisions should be made.",
  tags: [
    "Analytics",
    "Business Intelligence",
    "Data Visualization",
    "Decision Support",
    "Enterprise Reporting",
  ],
  accent: accentOf("02"),
  sections: [
    {
      heading: "The business problem",
      paragraphs: [
        "Teams often have access to more data than they can meaningfully use. Dashboards show charts, reports, and metrics, but users still have to decide what matters.",
        "The challenge was turning information into signals that could support faster, clearer decision-making.",
      ],
      note: "From data volume to decision clarity.",
      visual: {
        kind: "collage",
        cards: [
          { mock: "kpi", caption: "Revenue change", span: true },
          { mock: "anomaly", caption: "Anomaly detected" },
          { mock: "trend", caption: "Action required", span: true },
          { mock: "bars", caption: "Segment performance" },
        ],
      },
    },
    {
      heading: "The UX challenge",
      paragraphs: [
        "The interface needed to help users understand priority, not just performance. It had to guide attention without removing analytical depth.",
      ],
      visual: {
        kind: "layers",
        layers: [
          { label: "Raw metrics", chips: 6 },
          { label: "Grouped signals", chips: 5 },
          { label: "Monitor", chips: 4 },
          { label: "Investigate", chips: 3, sharp: true },
          { label: "Act", chips: 2, focus: true },
        ],
        caption: "Raw metrics resolve into a clear order of attention.",
      },
    },
    {
      heading: "Designing for decision support",
      paragraphs: [
        "The experience was structured around questions users were already asking: what changed, why did it change, and what should I look at next.",
      ],
      visual: {
        kind: "insight",
        panels: [
          {
            label: "What changed?",
            body: "Conversion from returning users dropped 12% week over week.",
          },
          {
            label: "Why it matters",
            body: "Returning users drive the majority of repeat revenue.",
          },
          {
            label: "Recommended next step",
            body: "Review checkout completion by device and traffic source.",
          },
        ],
      },
    },
    {
      heading: "Dashboard UI system",
      paragraphs: [
        "The UI combined high-density reporting with clearer hierarchy, progressive detail, and contextual summaries.",
      ],
      visual: {
        kind: "collage",
        cards: [
          { mock: "kpi", caption: "KPI cards", span: true },
          { mock: "trend", caption: "Trend chart" },
          { mock: "anomaly", caption: "Anomaly alert" },
          { mock: "bars", caption: "Segment comparison", span: true },
          { mock: "list", caption: "Decision summary" },
        ],
      },
    },
    {
      heading: "AI-assisted insight layer",
      paragraphs: [
        "AI was positioned as an analyst assistant, not a replacement for interpretation. It helped summarize changes, explain anomalies, and suggest where to investigate.",
      ],
      lead: "An assistant for interpretation, never a replacement for it.",
      visual: {
        kind: "ai",
        title: "AI insight",
        message: "Unusual drop detected in conversion from returning users.",
        confidence: 78,
        reasons: [
          "Compared with last 4-week baseline",
          "Most change comes from mobile checkout",
          "Returning-user segment only",
        ],
        features: [
          "Summarize what changed",
          "Explain detected anomalies",
          "Compare against baseline",
          "Suggest where to investigate",
          "Draft the decision summary",
        ],
        applyLabel: "View breakdown",
      },
    },
    {
      heading: "Visual and motion craft",
      paragraphs: [
        "Motion was used to reveal change over time, show relationships between metrics, and reduce the feeling of static reporting.",
      ],
      visual: {
        kind: "motion",
        tiles: [
          { label: "Line chart draw", glyph: "line" },
          { label: "KPI delta update", glyph: "prog" },
          { label: "Filter chip applied", glyph: "drop" },
          { label: "Anomaly pulse", glyph: "warn" },
          { label: "Forecast reveal", glyph: "reveal" },
          { label: "Report sync", glyph: "sync" },
        ],
      },
    },
  ],
  takeaway: {
    quote: ["Data is only valuable", "when it changes a decision."],
    closing:
      "The design goal was not to show everything. It was to help users understand what deserved attention.",
  },
};

const website: CaseStudyContent = {
  num: "03",
  title: "Enterprise Software Website Experience",
  challenge: "How do you explain complex products simply?",
  intro:
    "A B2B website experience designed to help enterprise buyers understand product value before getting lost in features, modules, and technical detail.",
  tags: [
    "B2B SaaS",
    "Enterprise Website",
    "Information Architecture",
    "Product Storytelling",
    "Conversion Strategy",
  ],
  accent: accentOf("03"),
  sections: [
    {
      heading: "The business problem",
      paragraphs: [
        "Enterprise software is often difficult to explain because the product serves multiple teams, use cases, and decision makers. Visitors need to understand value quickly before they are willing to explore deeper.",
        "The challenge was creating a website that communicates outcomes first, then supports deeper evaluation.",
      ],
      visual: {
        kind: "flow",
        nodes: [
          { label: "First impression", sub: "Value in seconds", icon: "sparkle" },
          { label: "Problem recognition", sub: "This is my problem", icon: "focus" },
          { label: "Use case exploration", sub: "How it applies", icon: "compass" },
          { label: "Feature validation", sub: "Proof and depth", icon: "layers" },
          { label: "Conversion", sub: "Book a demo", icon: "bolt" },
        ],
        legend: { down: "A visitor moves through the journey" },
      },
    },
    {
      heading: "The UX challenge",
      paragraphs: [
        "Different users arrive with different levels of awareness. Some want a quick explanation, others need proof, and others need technical depth.",
      ],
      visual: {
        kind: "roles",
        cards: [
          {
            role: "Executive buyer",
            need: "Needs business value.",
            icon: "director",
            preview: "stats",
          },
          {
            role: "Product evaluator",
            need: "Needs feature clarity.",
            icon: "pm",
            preview: "list",
          },
          {
            role: "Technical stakeholder",
            need: "Needs integration confidence.",
            icon: "nodes",
            preview: "bars",
          },
        ],
      },
    },
    {
      heading: "Information architecture",
      paragraphs: [
        "The website was structured around business outcomes, use cases, product capabilities, and proof points instead of listing features without context.",
      ],
      visual: {
        kind: "layers",
        layers: [
          { label: "Hero value proposition", chips: 2, focus: true },
          { label: "Use cases", chips: 3, sharp: true },
          { label: "Platform capabilities", chips: 4 },
          { label: "Proof points", chips: 3 },
          { label: "Integrations", chips: 5 },
          { label: "Contact / demo path", chips: 2 },
        ],
        caption: "Content reorganizes from feature-first to outcome-first.",
      },
    },
    {
      heading: "UI and page design",
      paragraphs: [
        "The visual system needed to feel premium, trustworthy, and easy to scan. The page layout focused on clear messaging, modular sections, and strong conversion paths.",
      ],
      visual: {
        kind: "collage",
        cards: [
          { mock: "page", caption: "Outcome-first landing page", span: true },
          { mock: "kpi", caption: "Proof points" },
          { mock: "list", caption: "Use case block" },
        ],
      },
    },
    {
      heading: "Messaging system",
      paragraphs: [
        "The content strategy focused on translating complex software capabilities into plain business outcomes.",
      ],
      visual: {
        kind: "beforeAfter",
        before: "Advanced multi-module operational workflow enablement.",
        after: "Connect teams, workflows, and reporting in one place.",
      },
    },
    {
      heading: "Motion and visual craft",
      paragraphs: [
        "Motion was used to guide attention through the product story without distracting from the message.",
      ],
      visual: {
        kind: "motion",
        tiles: [
          { label: "Hero reveal", glyph: "reveal" },
          { label: "Feature card hover", glyph: "assign" },
          { label: "Use case transition", glyph: "sync" },
          { label: "Integration carousel", glyph: "drop" },
          { label: "CTA focus state", glyph: "prog" },
        ],
      },
    },
  ],
  takeaway: {
    quote: ["People buy outcomes,", "not functionality."],
    closing:
      "The best enterprise websites do not explain every feature first. They help people understand why the product matters.",
  },
};

const food: CaseStudyContent = {
  num: "04",
  title: "Smart Food Ordering Platform",
  challenge: "How do you help people decide faster?",
  intro:
    "A food ordering experience designed for fast-paced environments where users need to browse, customize, and checkout with minimal friction.",
  tags: ["Food Ordering", "Mobile UX", "Commerce", "Checkout Flow", "Service Design"],
  accent: accentOf("04"),
  sections: [
    {
      heading: "The business problem",
      paragraphs: [
        "Food ordering often happens when users are distracted, hungry, or short on time. Too many options, unclear customization, and slow checkout can quickly create friction.",
        "The challenge was helping users move from choice to order with confidence.",
      ],
      visual: {
        kind: "mobileFlow",
        steps: [
          "Menu",
          "Popular items",
          "Item selected",
          "Customize",
          "Order summary",
          "Checkout",
        ],
      },
    },
    {
      heading: "The UX challenge",
      paragraphs: [
        "The interface needed to support quick decisions while still allowing users to customize meals, review selections, and understand order status.",
      ],
      visual: {
        kind: "flow",
        nodes: [
          { label: "Browse", sub: "Scan the menu", icon: "menu" },
          { label: "Choose", sub: "Pick an item", icon: "focus" },
          { label: "Customize", sub: "Make it yours", icon: "tag" },
          { label: "Confirm", sub: "Review the order", icon: "cart" },
          { label: "Track", sub: "Follow status", icon: "clock" },
        ],
        legend: { down: "A user moves from choice to order" },
      },
    },
    {
      heading: "Menu and discovery design",
      paragraphs: [
        "The menu was structured to reduce scanning effort by grouping items clearly and surfacing common choices without hiding variety.",
      ],
      visual: {
        kind: "collage",
        cards: [
          { mock: "menu", caption: "Menu and categories", span: true },
          { mock: "product", caption: "Item detail" },
        ],
      },
    },
    {
      heading: "Customization and checkout",
      paragraphs: [
        "Customization needed to feel flexible without slowing down the ordering process.",
      ],
      visual: {
        kind: "collage",
        cards: [
          { mock: "product", caption: "Customization" },
          { mock: "cart", caption: "Cart and checkout", span: true },
        ],
      },
    },
    {
      heading: "Order status and feedback",
      paragraphs: [
        "After checkout, the experience needed to reassure users that their order was received, being prepared, and ready for pickup or delivery.",
      ],
      visual: {
        kind: "timeline",
        steps: ["Order received", "Preparing", "Ready", "Completed"],
      },
    },
    {
      heading: "Motion and visual craft",
      paragraphs: [
        "Motion helped make the ordering flow feel responsive, confirming each action without slowing the user down.",
      ],
      visual: {
        kind: "motion",
        tiles: [
          { label: "Add to cart", glyph: "cart" },
          { label: "Price update", glyph: "prog" },
          { label: "Checkout confirmation", glyph: "approve" },
          { label: "Order status change", glyph: "sync" },
          { label: "Menu filter transition", glyph: "drop" },
          { label: "Pickup notification", glyph: "badge" },
        ],
      },
    },
  ],
  takeaway: {
    quote: ["Hungry users don't explore.", "They choose."],
    closing:
      "The interface needed to reduce hesitation and help users move confidently through the order.",
  },
};

const cannabis: CaseStudyContent = {
  num: "05",
  title: "Cannabis Commerce Platform",
  challenge: "How do you build trust in regulated industries?",
  intro:
    "A regulated commerce experience designed to balance product discovery, compliance, transparency, and user confidence without overwhelming the shopping journey.",
  tags: [
    "Regulated Commerce",
    "E-Commerce",
    "Trust Design",
    "Compliance UX",
    "Product Discovery",
  ],
  accent: accentOf("05"),
  sections: [
    {
      heading: "The business problem",
      paragraphs: [
        "Regulated commerce requires more than a simple shopping flow. Users need clear product information, compliance guidance, trust signals, and safe purchase paths.",
        "The challenge was creating an experience that felt approachable while still respecting regulatory requirements.",
      ],
      visual: {
        kind: "flow",
        nodes: [
          { label: "Eligibility check", sub: "Age verification", icon: "shield" },
          { label: "Product discovery", sub: "Browse safely", icon: "compass" },
          { label: "Product education", sub: "Understand options", icon: "layers" },
          { label: "Compliance notice", sub: "Clear guidance", icon: "badge" },
          { label: "Checkout", sub: "Confident purchase", icon: "cart" },
        ],
        legend: { down: "Each trust step activates before the next" },
      },
    },
    {
      heading: "The UX challenge",
      paragraphs: [
        "Compliance information can easily interrupt the shopping experience. The interface needed to make important information visible without making the product feel difficult to buy.",
      ],
      visual: {
        kind: "balance",
        left: "Compliance requirements",
        right: "User confidence",
        center: "One clear guided experience",
      },
    },
    {
      heading: "Product discovery",
      paragraphs: [
        "The discovery experience focused on filters, product education, and clear categorization so users could compare options with confidence.",
      ],
      visual: {
        kind: "collage",
        cards: [
          { mock: "list", caption: "Filtered product list", span: true },
          { mock: "product", caption: "Product card" },
        ],
      },
    },
    {
      heading: "Product detail and education",
      paragraphs: [
        "Product pages needed to explain what the item was, how it differed from other options, and what users should understand before purchasing.",
      ],
      visual: {
        kind: "collage",
        cards: [
          { mock: "detail", caption: "Product detail and education", span: true },
          { mock: "product", caption: "Related products" },
        ],
      },
    },
    {
      heading: "Checkout and compliance",
      paragraphs: [
        "Checkout needed to feel safe, clear, and guided while collecting required information without unnecessary anxiety.",
      ],
      visual: {
        kind: "timeline",
        steps: ["Cart", "Verification", "Delivery details", "Review", "Confirmation"],
      },
    },
    {
      heading: "Motion and visual craft",
      paragraphs: [
        "Motion helped communicate trust, progress, and completion without making compliance feel heavy.",
      ],
      visual: {
        kind: "motion",
        tiles: [
          { label: "Verified badge", glyph: "badge" },
          { label: "Compliance check", glyph: "approve" },
          { label: "Filter applied", glyph: "drop" },
          { label: "Product comparison", glyph: "line" },
          { label: "Checkout progress", glyph: "prog" },
          { label: "Order confirmed", glyph: "approve" },
        ],
      },
    },
  ],
  takeaway: {
    quote: ["Clarity creates", "confidence."],
    closing:
      "In regulated products, trust is not a visual style. It is the result of clear information, predictable steps, and honest guidance.",
  },
};

export const caseStudies: Record<string, CaseStudyContent> = {
  "01": workforce,
  "02": analytics,
  "03": website,
  "04": food,
  "05": cannabis,
};
