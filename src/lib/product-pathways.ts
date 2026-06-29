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
  | "Branding & Design Systems"
  | "Motion, Video & Lottie Systems"
  | "Product Handoff";

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
  /** Compact label for the vertical rail where horizontal space is tight. */
  short: string;
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
  { label: "All Pathways", short: "All Work", icon: "compass", accent: "#C9B79C", softBg: "#F4EEE3", border: "#E6DAC8" },
  { label: "Product Platforms & Dashboards", short: "Dashboards", icon: "dashboard", accent: "#8FB8FF", softBg: "#EEF5FF", border: "#C9DCFF" },
  { label: "Mobile App Experiences", short: "Mobile Apps", icon: "smartphone", accent: "#7DD3FC", softBg: "#ECFAFF", border: "#BDEFFF" },
  { label: "Web & CMS Platforms", short: "Web & CMS", icon: "globe", accent: "#6EE7B7", softBg: "#ECFDF5", border: "#A7F3D0" },
  { label: "Commerce & Marketplace", short: "Commerce", icon: "shoppingBag", accent: "#FFB86B", softBg: "#FFF4E8", border: "#FFD9AD" },
  { label: "AI & Automation UX", short: "AI & Automation", icon: "sparkles", accent: "#B69CFF", softBg: "#F4F0FF", border: "#D9CCFF" },
  { label: "Branding & Design Systems", short: "Branding", icon: "palette", accent: "#F0ABFC", softBg: "#FDF4FF", border: "#F5D0FE" },
  { label: "Motion, Video & Lottie Systems", short: "Motion & Video", icon: "clapperboard", accent: "#FCA5A5", softBg: "#FEF2F2", border: "#FECACA" },
  { label: "Product Handoff", short: "Handoff", icon: "component", accent: "#94A3B8", softBg: "#F1F5F9", border: "#E2E8F0" },
];

export const CATEGORIES: readonly PathwayCategory[] = CATEGORY_META.map((c) => c.label);

export const getCategoryMeta = (category: PathwayCategory): CategoryMeta =>
  CATEGORY_META.find((c) => c.label === category) ?? CATEGORY_META[0];

export interface ExternalLink {
  label: string;
  url: string;
}

export interface ProductPathway {
  // Existing structural/visual properties
  id: number;
  priority: number;
  accentColor: string;
  accentSoftBg: string;
  accentBorder: string;
  mockupType: MockupType;
  externalLinks?: ExternalLink[];
  status?: "placeholder";
  imageUrl?: string;

  // New properties from UX Overhaul
  title: string;
  primaryCategory: PathwayCategory;
  /**
   * Every category this pathway belongs to (including its primary). A card can
   * live in several categories at once, so it counts and appears in each. When
   * omitted, the card belongs only to `primaryCategory`.
   */
  categories?: PathwayCategory[];
  domain?: string;
  previewTitle: string;
  previewDescription: string;
  previewProblem: string;
  previewOutcome: string;
  tags: string[];
  uniqueCTA: string;
  detailHero: string;
  productStory: string;
  problem: string;
  users: string[];
  constraints?: string[];
  solution: string;
  keyFeatures: string[];
  uxDecisions: string[];
  motionDirection: string[];
  visualSuggestions: string[];
}

export const PRODUCT_PATHWAYS: ProductPathway[] = [
  {
    "id": 1,
    "title": "Workforce Time & Resource Management Platform",
    "primaryCategory":   "Product Platforms & Dashboards" as PathwayCategory,
    "mockupType": "dashboard",
    "accentColor": "#7BCDBA",
    "accentSoftBg": "#E8F8F4",
    "accentBorder": "#B9E6DC",
    "priority": 1,
    "imageUrl": "/case-studies/1.html",
    "previewTitle": "Workforce Time & Resource Management",
    "previewDescription": "A workforce operations platform designed to help teams track time, understand workload, manage project activity, and reduce operational noise across departments.",
    "previewProblem": "Teams were spending too much time switching between timesheets, project updates, approvals, and activity tracking.",
    "previewOutcome": "The experience was shaped into a role-based dashboard where each user sees the right work, the right status, and the next action without digging through unnecessary screens.",
    "tags": [
      "Workforce OS",
      "Timesheets",
      "Resource Planning",
      "Project Dashboard",
      "Enterprise UX"
    ],
    "uniqueCTA": "Explore Workforce Flow",
    "detailHero": "From scattered work activity to one clear operational command center.",
    "productStory": "The client needed a platform that could support daily workforce visibility without turning the product into another heavy admin system. The idea started with time tracking, but the real product problem was bigger: managers needed to understand capacity, employees needed a simple way to log work, and operations teams needed reliable project-level visibility.",
    "problem": "Workforce tools often become overloaded because every department wants to see everything. Employees only need their assigned work and time actions. Managers need team-level visibility. Finance or operations need billable and non-billable breakdowns. The challenge was to design one product that could serve different roles without showing the same complexity to everyone.",
    "users": [
      "Employees logging work and viewing assigned tasks",
      "Managers reviewing team activity and capacity",
      "Operations teams checking project health",
      "Admins managing teams, clients, and permissions"
    ],
    "solution": "Create a role-based workforce dashboard with progressive disclosure. The first screen gives immediate clarity: today’s work, tracked time, project status, approvals, and recent activity. Deeper data is available only when needed through drill-down panels, filters, and contextual cards.",
    "keyFeatures": [
      "Role-based dashboard views",
      "Smart timesheet entry",
      "Active project timeline",
      "Team capacity overview",
      "Approval and exception states",
      "Billable vs non-billable breakdown",
      "Project activity feed",
      "Admin permission layers",
      "Weekly workload chart",
      "Export-ready reports"
    ],
    "uxDecisions": [
      "Keep employee screens focused on daily action, not management data.",
      "Use manager dashboards for patterns, exceptions, and workload risk.",
      "Use color only for status and priority, not decoration.",
      "Group time, project, and activity around user intent instead of database structure.",
      "Make filters feel like a product tool, not a spreadsheet control."
    ],
    "motionDirection": [
      "Animate time counters when the detail page opens.",
      "Use animated weekly bar charts for logged hours.",
      "Add soft pulse states for active tasks.",
      "Use a small timeline animation showing task movement from assigned to in progress to submitted to approved.",
      "On hover, project cards should lift slightly and reveal workload percentage.",
      "Add floating mini status chips around the dashboard mockup to show live work activity."
    ],
    "visualSuggestions": [
      "Dashboard mockup with left navigation, time tracker, project graph, activity feed, and approval queue.",
      "Animated workload chart.",
      "Role switcher animation showing Employee, Manager, Admin.",
      "Mini timeline showing the product flow from task assignment to timesheet approval."
    ]
  },
  {
    "id": 2,
    "title": "Enterprise Operations Command Center",
    "primaryCategory":   "Product Platforms & Dashboards" as PathwayCategory,
    "mockupType": "admin",
    "accentColor": "#FFD166",
    "accentSoftBg": "#FFF8E6",
    "accentBorder": "#FFE5A3",
    "priority": 2,
    "imageUrl": "/case-studies/2.html",
    "previewTitle": "Enterprise Operations Command Center",
    "previewDescription": "A centralized operations dashboard for tracking requests, approvals, internal actions, team ownership, and business-critical status changes.",
    "previewProblem": "Operational teams were losing context because requests lived across emails, spreadsheets, chats, and disconnected tools.",
    "previewOutcome": "The product was structured as a command center where priority, ownership, progress, and next steps could be understood from one screen.",
    "tags": [
      "Admin UX",
      "Enterprise Workflow",
      "Operations",
      "Approval Flow",
      "Status Systems"
    ],
    "uniqueCTA": "Open Ops Console",
    "detailHero": "A dashboard that turns operational noise into visible action.",
    "productStory": "The client came with an internal workflow problem. Work was moving, but nobody could clearly see where things were stuck. The product direction became less about building another admin panel and more about designing a decision layer for operations teams.",
    "problem": "Operations teams deal with many moving parts: approvals, internal requests, escalations, documents, assigned owners, and service-level expectations. Without a central view, teams react late and managers rely on manual follow-ups.",
    "users": [
      "Operations managers",
      "Internal request owners",
      "Admin teams",
      "Department leads",
      "Support coordinators"
    ],
    "solution": "Design a command center that organizes work by urgency, ownership, and state. Instead of forcing users into long tables, the interface uses status lanes, exception cards, and a focused detail drawer for quick action.",
    "keyFeatures": [
      "Status-based work lanes",
      "Priority queue",
      "SLA/risk indicators",
      "Owner assignment",
      "Approval drawer",
      "Request detail timeline",
      "Internal notes",
      "Search and saved filters",
      "Escalation state",
      "Activity history"
    ],
    "uxDecisions": [
      "Show urgent work first, not newest work first.",
      "Keep the detail view in a side drawer so users never lose their place.",
      "Use status language that non-technical teams understand.",
      "Separate system status from human action required.",
      "Use empty states to explain what should happen next."
    ],
    "motionDirection": [
      "Animate queue cards sliding into status lanes.",
      "Use small attention pulses for blocked or high-priority items.",
      "Show approval progress through an animated stepper.",
      "Add a detail drawer transition that feels quick and smooth.",
      "Animate SLA risk bars from calm to warning state."
    ],
    "visualSuggestions": [
      "Kanban-like operations board.",
      "Right-side request detail drawer.",
      "Animated approval stepper.",
      "Mini risk indicator cards.",
      "Status filter chips with smooth active-state movement."
    ]
  },
  {
    "id": 3,
    "title": "SaaS Analytics & Reporting Suite",
    "primaryCategory":   "Product Platforms & Dashboards" as PathwayCategory,
    "mockupType": "dashboard",
    "accentColor": "#8FB8FF",
    "accentSoftBg": "#EEF5FF",
    "accentBorder": "#C9DCFF",
    "priority": 3,
    "imageUrl": "/case-studies/3.html",
    "previewTitle": "SaaS Analytics & Reporting Suite",
    "previewDescription": "A reporting experience that helps product and business teams read performance data without needing to understand raw analytics structures.",
    "previewProblem": "Users had access to data, but they could not quickly understand what changed, why it mattered, or what action to take next.",
    "previewOutcome": "The dashboard was shaped around insight cards, trend comparisons, saved views, and guided reporting instead of static charts.",
    "tags": [
      "SaaS Analytics",
      "Reporting UX",
      "Insight Cards",
      "Product Metrics",
      "Dashboard Design"
    ],
    "uniqueCTA": "Reveal Insight Layer",
    "detailHero": "Making data feel readable, actionable, and less intimidating.",
    "productStory": "The client had multiple reporting needs across business, product, and admin teams. The early idea was to create a dashboard with charts, but the product needed a stronger information hierarchy. The main design challenge was turning raw metrics into confident decision-making.",
    "problem": "Dashboards often show too many charts without explaining what matters. Users can see numbers but still feel unsure. The product needed to answer three questions quickly: what changed, why it changed, and what should I check next?",
    "users": [
      "Product owners",
      "Founders",
      "Admin users",
      "Marketing teams",
      "Operations leads"
    ],
    "solution": "Create an insight-led analytics suite. Instead of placing charts everywhere, use summary cards, change indicators, comparison states, and guided drill-downs. The interface should help users move from overview to detail without losing context.",
    "keyFeatures": [
      "KPI overview cards",
      "Trend comparison charts",
      "Saved report views",
      "Date range controls",
      "Segment filters",
      "Insight explanation cards",
      "Exportable reports",
      "Alert states",
      "Drill-down panels",
      "Team-accessible dashboards"
    ],
    "uxDecisions": [
      "Use plain-language labels instead of analytics jargon.",
      "Group metrics by business question.",
      "Use comparison states like 'up from last period' only where useful.",
      "Make charts readable at a glance with strong spacing and hierarchy.",
      "Show recommended next action beside important metric changes."
    ],
    "motionDirection": [
      "Animate KPI counters on load.",
      "Use line chart draw-in animation.",
      "Add soft graph transitions when filters change.",
      "Animate insight cards appearing one by one.",
      "Use hover states that reveal small explanations."
    ],
    "visualSuggestions": [
      "Analytics dashboard hero mockup.",
      "Animated KPI cards.",
      "Line chart drawing from left to right.",
      "Report export animation.",
      "Insight card stack."
    ]
  },
  {
    "id": 4,
    "title": "Smart Agriculture Control Dashboard",
    "primaryCategory":   "Product Platforms & Dashboards" as PathwayCategory,
    "mockupType": "dashboard",
    "accentColor": "#9AD29A",
    "accentSoftBg": "#F0FAF0",
    "accentBorder": "#C7EBC7",
    "priority": 4,
    "imageUrl": "/case-studies/4.html",
    "previewTitle": "Smart Agriculture Control Dashboard",
    "previewDescription": "A farm monitoring concept for tracking plant batches, water levels, nutrients, environment status, and harvest readiness in a controlled growing setup.",
    "previewProblem": "Growers needed a simple way to understand plant health and system activity without manually checking every part of the growing setup.",
    "previewOutcome": "The dashboard brings batch status, nutrient levels, water activity, and harvest planning into one clear monitoring view.",
    "tags": [
      "Smart Agriculture",
      "Farm Dashboard",
      "Monitoring UX",
      "Batch Tracking",
      "IoT Concept"
    ],
    "uniqueCTA": "View Farm Control Logic",
    "detailHero": "A calm control system for growing, tracking, and harvesting with confidence.",
    "productStory": "This concept is built around controlled growing environments where freshness, timing, and system consistency matter. The product direction is to help a grower understand what needs attention now, what is growing well, and what is ready to harvest soon.",
    "problem": "Small growing systems can become difficult to monitor when plant batches, water levels, nutrient cycles, and harvest timing are managed separately. The system needed to feel simple enough for daily use but detailed enough to support better growing decisions.",
    "users": [
      "Small farm owners",
      "Hydroponic/aeroponic growers",
      "Operations assistants",
      "Delivery/harvest planners"
    ],
    "solution": "Create a monitoring dashboard that focuses on batch health and daily action. The system should show plant stages, environment alerts, nutrient activity, and harvest readiness through clear visual cards.",
    "keyFeatures": [
      "Batch health cards",
      "Water level indicator",
      "Nutrient status",
      "Harvest readiness timeline",
      "Plant stage tracker",
      "Alert panel",
      "Daily task checklist",
      "Sensor-style readings",
      "Delivery planning view",
      "Freshness status marker"
    ],
    "uxDecisions": [
      "Use calm colors and clear alert hierarchy.",
      "Avoid technical overload on the main dashboard.",
      "Make harvest readiness visual and easy to understand.",
      "Use batch cards instead of long data tables.",
      "Bring daily tasks to the top."
    ],
    "motionDirection": [
      "Animate water level indicators.",
      "Use soft plant-growth timeline animations.",
      "Add pulsing alert states for low water or nutrient warnings.",
      "Animate batch cards as living cards with subtle floating movement.",
      "Use a progress ring for harvest readiness."
    ],
    "visualSuggestions": [
      "Farm system dashboard mockup.",
      "Animated water container indicator.",
      "Plant batch grid.",
      "Harvest timeline.",
      "Sensor reading cards."
    ]
  },
  {
    "id": 5,
    "title": "Mobile Booking & Service Flow",
    "primaryCategory":   "Mobile App Experiences" as PathwayCategory,
    "mockupType": "booking",
    "accentColor": "#FDBA74",
    "accentSoftBg": "#FFF7ED",
    "accentBorder": "#FED7AA",
    "priority": 5,
    "imageUrl": "/case-studies/5.html",
    "previewTitle": "Mobile Booking & Service Flow",
    "previewDescription": "A mobile-first booking experience for helping users find a service, choose a time, confirm details, and complete the request with confidence.",
    "previewProblem": "Users often drop off when booking flows ask too many questions before giving clarity on availability, cost, or next steps.",
    "previewOutcome": "The flow was structured into simple decision moments with clear progress, service comparison, and confirmation states.",
    "tags": [
      "Mobile UX",
      "Booking Flow",
      "Service UX",
      "Conversion Flow",
      "Appointment Design"
    ],
    "uniqueCTA": "Walk Through Booking Flow",
    "detailHero": "A booking experience that reduces guessing and keeps the user moving.",
    "productStory": "The client idea started as a simple service booking app, but the UX challenge was around confidence. Users needed to know what they were choosing, when it was available, what would happen next, and whether they could change it later.",
    "problem": "Booking products often overload users with forms too early. When availability, price, or service difference is unclear, users hesitate or leave.",
    "users": [
      "First-time customers",
      "Returning customers",
      "Service providers",
      "Admin users managing bookings"
    ],
    "solution": "Design a step-by-step mobile flow that gives clarity before commitment. The user first understands the service, then sees availability, then confirms details, then receives a clear next-step state.",
    "keyFeatures": [
      "Service selection cards",
      "Availability calendar",
      "Time slot picker",
      "Booking summary",
      "Customer detail step",
      "Confirmation screen",
      "Reschedule/cancel states",
      "Provider notes",
      "Reminder state",
      "Admin booking overview"
    ],
    "uxDecisions": [
      "Show progress without making the flow feel long.",
      "Use short labels and plain language.",
      "Keep confirmation details visible before submit.",
      "Show trust points near decision moments.",
      "Make empty states useful when no slots are available."
    ],
    "motionDirection": [
      "Animate step progress between booking stages.",
      "Use selected service card expansion.",
      "Add calendar date selection micro-interactions.",
      "Animate final confirmation with a checkmark and soft confetti.",
      "Use bottom-sheet transitions for mobile details."
    ],
    "visualSuggestions": [
      "Mobile screens in a horizontal flow.",
      "Animated stepper.",
      "Calendar/time picker interaction.",
      "Confirmation card."
    ]
  },
  {
    "id": 6,
    "title": "Marketplace Mobile Experience",
    "primaryCategory":   "Commerce & Marketplace" as PathwayCategory,
    "mockupType": "marketplace",
    "accentColor": "#F9A8D4",
    "accentSoftBg": "#FDF2F8",
    "accentBorder": "#FBCFE8",
    "priority": 6,
    "imageUrl": "/case-studies/6.html",
    "previewTitle": "Marketplace Mobile Experience",
    "previewDescription": "A mobile marketplace journey designed around discovery, trust, seller clarity, product comparison, and faster buyer decisions.",
    "previewProblem": "Users needed to browse quickly while still feeling confident about seller credibility, item quality, and purchase/contact steps.",
    "previewOutcome": "The experience was built around clean product discovery, trust signals, saved items, and clear seller actions.",
    "tags": [
      "Marketplace UX",
      "Mobile Commerce",
      "Buyer Flow",
      "Seller Trust",
      "Product Discovery"
    ],
    "uniqueCTA": "Browse Marketplace Path",
    "detailHero": "Helping buyers move from discovery to confidence faster.",
    "productStory": "The product idea was a local marketplace where users could browse items, compare options, contact sellers, and save products. The design challenge was balancing visual discovery with trust-building.",
    "problem": "Marketplace users make decisions with incomplete information. If seller details, item condition, contact method, or location feels unclear, users hesitate.",
    "users": [
      "Buyers browsing products",
      "Sellers listing products",
      "Returning users saving items",
      "Admins reviewing listings"
    ],
    "solution": "Create a mobile marketplace experience where trust cues are visible early. Product cards, seller details, location, item condition, and call-to-action hierarchy should help the user decide without friction.",
    "keyFeatures": [
      "Product feed",
      "Category filters",
      "Search and sorting",
      "Product detail page",
      "Seller trust card",
      "Save/favorite state",
      "Contact seller CTA",
      "Similar items",
      "Listing creation flow",
      "Admin review state"
    ],
    "uxDecisions": [
      "Put product image and key details first.",
      "Show seller trust signals before contact.",
      "Make filters fast and thumb-friendly.",
      "Use progressive details instead of long descriptions.",
      "Keep primary CTA fixed near the thumb zone."
    ],
    "motionDirection": [
      "Animate product cards into the feed.",
      "Use saved-item heart animation.",
      "Add filter chip sliding interactions.",
      "Use image gallery swipe motion.",
      "Animate seller trust badge reveal."
    ],
    "visualSuggestions": [
      "Product feed mobile mockup.",
      "Product detail screen.",
      "Seller profile card.",
      "Listing creation flow."
    ]
  },
  {
    "id": 7,
    "title": "Health Habit Companion App",
    "primaryCategory":   "Mobile App Experiences" as PathwayCategory,
    "mockupType": "mobile",
    "accentColor": "#6EE7B7",
    "accentSoftBg": "#ECFDF5",
    "accentBorder": "#A7F3D0",
    "priority": 7,
    "imageUrl": "/case-studies/7.html",
    "previewTitle": "Health Habit Companion App",
    "previewDescription": "A gentle habit-tracking mobile experience focused on daily routines, progress visibility, reminders, and supportive feedback.",
    "previewProblem": "Health and habit apps can feel too strict, making users feel like they failed instead of helping them restart.",
    "previewOutcome": "The app was shaped around small progress, supportive reminders, and simple daily check-ins.",
    "tags": [
      "HealthTech UX",
      "Habit Design",
      "Mobile App",
      "Progress Tracking",
      "Supportive UX"
    ],
    "uniqueCTA": "See Daily Care Journey",
    "detailHero": "A habit app that encourages progress without pressure.",
    "productStory": "The product direction was to support users in building healthier routines without creating guilt. Instead of making the app feel like a strict tracker, the experience should feel like a calm daily companion.",
    "problem": "Users often abandon habit apps when the experience becomes too demanding, judgmental, or complex. The product needed to make progress visible while also making restarts feel normal.",
    "users": [
      "Everyday users building routines",
      "Users tracking small wellness actions",
      "Coaches or support teams if needed",
      "Admins reviewing non-sensitive engagement patterns"
    ],
    "solution": "Design a gentle daily check-in system with progress rings, routine cards, flexible reminders, and supportive empty states. The app focuses on momentum rather than perfection.",
    "keyFeatures": [
      "Daily check-in card",
      "Habit streaks without guilt messaging",
      "Progress ring",
      "Reminder settings",
      "Weekly reflection",
      "Supportive insights",
      "Routine library",
      "Custom habit creation",
      "Restart flow",
      "Simple profile view"
    ],
    "uxDecisions": [
      "Use supportive language instead of failure language.",
      "Avoid overwhelming dashboards.",
      "Make missed days recoverable.",
      "Keep progress visual but not stressful.",
      "Let users adjust reminders easily."
    ],
    "motionDirection": [
      "Animate progress rings softly.",
      "Use gentle check-in completion states.",
      "Add calm card transitions.",
      "Use microcopy fade-ins for supportive feedback.",
      "Avoid aggressive gamification."
    ],
    "visualSuggestions": [
      "Mobile daily dashboard.",
      "Progress ring animation.",
      "Habit card completion.",
      "Weekly reflection screen."
    ]
  },
  {
    "id": 8,
    "title": "EdTech Learning Mobile App",
    "primaryCategory":   "Mobile App Experiences" as PathwayCategory,
    "mockupType": "mobile",
    "accentColor": "#7DD3FC",
    "accentSoftBg": "#ECFAFF",
    "accentBorder": "#BDEFFF",
    "priority": 8,
    "imageUrl": "/case-studies/8.html",
    "previewTitle": "EdTech Learning Mobile App",
    "previewDescription": "A learning app experience designed to help students understand progress, continue lessons, complete tasks, and stay motivated.",
    "previewProblem": "Learners often lose track of where they stopped, what matters next, and how much progress they are making.",
    "previewOutcome": "The product was structured around continue-learning actions, lesson clarity, progress visibility, and lightweight motivation.",
    "tags": [
      "EdTech UX",
      "Learning Flow",
      "Mobile UX",
      "Progress Design",
      "Student Experience"
    ],
    "uniqueCTA": "Trace Learning Flow",
    "detailHero": "A learning journey that makes the next step obvious.",
    "productStory": "The client wanted a mobile learning experience that could support courses, lessons, tasks, and progress tracking. The real UX challenge was not only content access; it was helping learners continue without confusion.",
    "problem": "Learning apps can become content libraries instead of guided experiences. If students cannot quickly understand what to continue, what is completed, and what is next, motivation drops.",
    "users": [
      "Students",
      "Instructors",
      "Course admins",
      "Parents or guardians if needed"
    ],
    "solution": "Create a guided learning home screen with continue-learning cards, lesson milestones, progress indicators, and task reminders. The app should reduce decision-making and help students move forward.",
    "keyFeatures": [
      "Continue lesson card",
      "Course progress",
      "Lesson detail page",
      "Quiz/task flow",
      "Completion state",
      "Learning streak",
      "Download/offline state",
      "Instructor notes",
      "Notification reminders",
      "Course library"
    ],
    "uxDecisions": [
      "Put 'continue learning' first.",
      "Show progress in human terms, not only percentages.",
      "Make lessons feel bite-sized.",
      "Use visual states for completed, active, and locked content.",
      "Make quiz feedback clear and encouraging."
    ],
    "motionDirection": [
      "Animate lesson progress bars.",
      "Use completion badge animation.",
      "Add smooth course card transitions.",
      "Animate quiz result feedback.",
      "Use timeline motion for course modules."
    ],
    "visualSuggestions": [
      "Mobile course home.",
      "Continue lesson card.",
      "Progress module timeline.",
      "Quiz result screen."
    ]
  },
  {
    "id": 9,
    "title": "Service Business Website + CMS",
    "primaryCategory":   "Web & CMS Platforms" as PathwayCategory,
    "mockupType": "website",
    "accentColor": "#C7A7FF",
    "accentSoftBg": "#F5F0FF",
    "accentBorder": "#DECFFF",
    "priority": 9,
    "imageUrl": "/case-studies/aeturnum.png",
    "externalLinks": [
      {
        "label": "Visit Aeturnum",
        "url": "https://www.aeturnum.com/"
      }
    ],
    "previewTitle": "Service Business Website + CMS",
    "previewDescription": "A website and lightweight CMS structure for helping a local service business present services, build trust, capture leads, and update content easily.",
    "previewProblem": "The business needed a professional web presence but did not need a heavy product platform.",
    "previewOutcome": "The site was shaped around clear service storytelling, contact conversion, reusable sections, and easy content updates.",
    "tags": [
      "Website UX",
      "CMS",
      "Service Business",
      "Lead Generation",
      "Content System"
    ],
    "uniqueCTA": "Open Website Structure",
    "detailHero": "A simple website system that turns business information into clear action.",
    "productStory": "The client came with a business idea and scattered service information. The goal was to create a web presence that explains the offer quickly, builds trust, and makes it easy for customers to contact the business.",
    "problem": "Small business websites often either look too generic or become too hard to maintain. The challenge was to keep the experience premium, simple, and editable.",
    "users": [
      "Small business owners",
      "Marketing teams",
      "Sales teams",
      "Content creators"
    ],
    "solution": "Developed a modular website using Webflow and a custom CMS. Designed reusable content blocks for services, case studies, and blog posts, allowing the marketing team to build new pages without developer assistance.",
    "keyFeatures": [
      "Clear homepage story",
      "Service cards",
      "CMS-managed content",
      "Contact/WhatsApp CTA",
      "FAQ section",
      "Gallery/testimonials",
      "SEO-friendly structure",
      "Mobile-first layout",
      "Reusable components",
      "Admin editing flow"
    ],
    "uxDecisions": [
      "Make the first screen answer what the business does and why it matters.",
      "Keep CTAs visible but not aggressive.",
      "Use CMS fields that match how the owner thinks.",
      "Design sections as reusable blocks.",
      "Keep mobile contact actions easy to reach."
    ],
    "motionDirection": [
      "Animate service cards on scroll.",
      "Use subtle hero text reveal.",
      "Add contact CTA hover glow.",
      "Use image reveal masks.",
      "Animate FAQ accordion states."
    ],
    "visualSuggestions": [
      "Website homepage mockup.",
      "CMS editing panel mockup.",
      "Service card component.",
      "Mobile contact section."
    ]
  },
  {
    "id": 10,
    "title": "E-Commerce Product Catalog",
    "primaryCategory":   "Commerce & Marketplace" as PathwayCategory,
    "mockupType": "commerce",
    "accentColor": "#FFB86B",
    "accentSoftBg": "#FFF4E8",
    "accentBorder": "#FFD9AD",
    "priority": 10,
    "previewTitle": "E-Commerce Product Catalog",
    "previewDescription": "A product catalog and shopping journey designed around browsing, comparison, product clarity, and faster purchase decisions.",
    "previewProblem": "Customers needed to understand product differences quickly before reaching checkout.",
    "previewOutcome": "The experience improved product discovery through category structure, filter logic, detail pages, and clear purchase actions.",
    "tags": [
      "E-Commerce UX",
      "Product Catalog",
      "Checkout Flow",
      "Filter UX",
      "Web Platform"
    ],
    "uniqueCTA": "View Commerce Journey",
    "detailHero": "A shopping experience built for clarity before checkout.",
    "productStory": "The client needed an online catalog that could grow into a stronger e-commerce experience. The first product challenge was not checkout; it was helping customers understand what to buy.",
    "problem": "When product catalogs are hard to scan, customers compare items manually or leave. The product needed better category logic, product cards, filtering, and detail hierarchy.",
    "users": [
      "Online shoppers",
      "Returning customers",
      "Store owner",
      "Inventory/admin team"
    ],
    "solution": "Create a catalog-first commerce experience with strong product cards, helpful filters, comparison-ready layouts, and a clear product detail page.",
    "keyFeatures": [
      "Product grid",
      "Category filters",
      "Search and sorting",
      "Product detail page",
      "Variant selection",
      "Wishlist/save state",
      "Cart preview",
      "Checkout entry",
      "Stock/availability states",
      "Admin product structure"
    ],
    "uxDecisions": [
      "Make product differences visible in the card.",
      "Keep filters useful but not too many.",
      "Use sticky purchase actions on product detail pages.",
      "Show availability clearly.",
      "Create empty filter states that help users recover."
    ],
    "motionDirection": [
      "Animate product filtering smoothly.",
      "Add product image hover movement.",
      "Use cart add micro-interaction.",
      "Animate variant selection.",
      "Use skeleton loading for product grid."
    ],
    "visualSuggestions": [
      "Product grid mockup.",
      "Product detail page.",
      "Filter sidebar/mobile filter sheet.",
      "Cart preview animation."
    ]
  },
  {
    "id": 11,
    "title": "AI + Figma MCP Design Workflow",
    "primaryCategory":   "AI & Automation UX" as PathwayCategory,
    "mockupType": "ai",
    "accentColor": "#B69CFF",
    "accentSoftBg": "#F4F0FF",
    "accentBorder": "#D9CCFF",
    "priority": 11,
    "previewTitle": "AI + Figma MCP Design Workflow",
    "previewDescription": "An AI-assisted workflow showing how design context can move between Figma, AI tools, and code without losing designer control.",
    "previewProblem": "AI can generate fast, but without structure it creates messy output, repeated tokens, and inconsistent UI.",
    "previewOutcome": "The workflow keeps Figma as the source of truth while AI assists with layout exploration, code translation, component cleanup, and iteration.",
    "tags": [
      "AI UX",
      "Figma MCP",
      "Design-to-Code",
      "Claude Code",
      "Workflow Automation"
    ],
    "uniqueCTA": "Open MCP Workflow",
    "detailHero": "Using AI for speed while keeping design control human.",
    "productStory": "This pathway is not a single product. It shows how I use AI as part of a design and production workflow. The goal is to reduce repetitive production time while keeping the design system, layout intent, and UX decision-making under control.",
    "problem": "AI tools can produce quick UI, but they often miss design intent, component structure, spacing rules, and responsive behavior. Without a controlled workflow, designers spend more time cleaning output than creating better experiences.",
    "users": [
      "Product designers",
      "Front-end developers",
      "Product owners",
      "Startup teams",
      "Client teams that need fast prototypes"
    ],
    "solution": "Use a structured AI workflow where Figma, AI tools, and code work together. Figma stays as the visual and system source. AI helps generate, refactor, document, and test. The designer reviews every output before it becomes final.",
    "keyFeatures": [
      "Figma-to-code context flow",
      "AI-assisted layout exploration",
      "Component reuse guidance",
      "Token-aware styling",
      "Human review checkpoints",
      "Prompt library",
      "Design QA pass",
      "Code cleanup pass",
      "Responsive testing",
      "Figma update loop"
    ],
    "uxDecisions": [
      "Do not let AI decide final UX direction alone.",
      "Use AI for speed, not for replacing judgment.",
      "Keep components editable.",
      "Keep naming clean and production-friendly.",
      "Make every AI output pass a human review gate."
    ],
    "motionDirection": [
      "Animated workflow diagram: Figma → AI Agent → Code → QA → Figma update.",
      "Moving connection lines between tools.",
      "Token cards floating into components.",
      "Before/after UI cleanup animation.",
      "Small 'human review' checkpoint animation."
    ],
    "visualSuggestions": [
      "AI workflow diagram.",
      "Figma canvas mockup.",
      "Code panel mockup.",
      "Component/token cards.",
      "Review checkpoint timeline."
    ]
  },
  {
    "id": 12,
    "title": "AI Website Production Sprint",
    "primaryCategory":   "AI & Automation UX" as PathwayCategory,
    "mockupType": "ai",
    "accentColor": "#B69CFF",
    "accentSoftBg": "#F4F0FF",
    "accentBorder": "#D9CCFF",
    "priority": 12,
    "previewTitle": "AI Website Production Sprint",
    "previewDescription": "A fast website production workflow using AI for first drafts, layout exploration, copy structure, component generation, and responsive QA.",
    "previewProblem": "Small businesses need websites quickly, but rushed work often leads to weak structure, poor content, and inconsistent UI.",
    "previewOutcome": "The workflow turns client notes into a structured website direction, then uses AI to speed up production while keeping design quality controlled.",
    "tags": [
      "AI Workflow",
      "Website Sprint",
      "Rapid Prototyping",
      "UI Production",
      "Responsive QA"
    ],
    "uniqueCTA": "See AI Website Sprint",
    "detailHero": "From scattered client notes to a launch-ready website direction.",
    "productStory": "A client comes with a business idea, a few references, service information, and urgency. The goal is to create a strong first website without spending weeks on early exploration.",
    "problem": "Fast website projects can easily become generic. The challenge is to move quickly while still creating a clear story, clean layout, useful sections, responsive behavior, and a professional finish.",
    "users": [
      "Local business owners",
      "Startup founders",
      "Service teams",
      "Customers visiting the website"
    ],
    "solution": "Build a repeatable AI-assisted production sprint. First organize the client idea, then create the information architecture, then generate layout directions, then manually refine the experience, then QA the responsive result.",
    "keyFeatures": [
      "Client idea intake",
      "Sitemap generation",
      "Section structure",
      "Hero copy exploration",
      "AI-assisted layout drafts",
      "Component cleanup",
      "Mobile QA",
      "Contact CTA optimization",
      "Launch checklist",
      "Content handoff"
    ],
    "uxDecisions": [
      "Start with the business goal before visual style.",
      "Use AI to explore, not finalize.",
      "Keep the first screen clear and conversion-focused.",
      "Make every section answer a user question.",
      "Prioritize mobile layout early."
    ],
    "motionDirection": [
      "Animated website section builder.",
      "Cards stacking into a page.",
      "Mobile/desktop preview switch.",
      "CTA glow interaction.",
      "Launch checklist progress animation."
    ],
    "visualSuggestions": [
      "Website sprint timeline.",
      "Client notes transforming into sitemap.",
      "Desktop/mobile mockups.",
      "Launch checklist card."
    ]
  },
  {
    "id": 13,
    "title": "Mobile UX Wireframe + Wireflow Sprint",
    "primaryCategory":   "AI & Automation UX" as PathwayCategory,
    "mockupType": "mobile",
    "accentColor": "#A8B5C8",
    "accentSoftBg": "#F2F5F8",
    "accentBorder": "#D5DDE8",
    "priority": 13,
    "previewTitle": "Mobile UX Wireframe + Wireflow Sprint",
    "previewDescription": "A wireframe-only pathway showing how a mobile product idea can move from client conversation into screens, flows, user decisions, and product structure.",
    "previewProblem": "Early product ideas often jump into visual design before the core flow is understood.",
    "previewOutcome": "The UX wireflow clarified the product logic, screen sequence, user decisions, and MVP scope before high-fidelity design started.",
    "tags": [
      "UX Wireframe",
      "Mobile Flow",
      "Wireflow",
      "MVP UX",
      "Product Strategy"
    ],
    "uniqueCTA": "Trace Mobile Wireflow",
    "detailHero": "Designing the product logic before designing the interface.",
    "productStory": "A client brings a mobile app idea and a business model, but the product flow is still unclear. Before designing polished screens, the work begins with wireframes and wireflows to understand how users move through the product.",
    "problem": "When product ideas skip wireframes, the team may design beautiful screens that do not connect properly. This creates confusion during development and often increases rework.",
    "users": [
      "Startup founder",
      "Product owner",
      "End user",
      "Development team"
    ],
    "solution": "Create a mobile UX wireframe system that maps the main user path, decision points, edge cases, and MVP screens. The wireflow becomes a shared product map for client, design, and development.",
    "keyFeatures": [
      "User journey map",
      "Low-fidelity mobile screens",
      "Wireflow connectors",
      "Entry and exit states",
      "MVP scope map",
      "Edge case screens",
      "Empty/error states",
      "Feature priority notes",
      "Developer handoff notes",
      "Client review checkpoints"
    ],
    "uxDecisions": [
      "Focus on user action before UI style.",
      "Keep wireframes intentionally low-fidelity.",
      "Use labels to explain decisions.",
      "Show alternate paths and edge cases.",
      "Separate MVP flow from future features."
    ],
    "motionDirection": [
      "Animate wireframe screens connecting with lines.",
      "Use moving dots to show user flow.",
      "Reveal screen groups section by section.",
      "Add small labels that fade in on hover.",
      "Use grayscale wireframe style with one accent color."
    ],
    "visualSuggestions": [
      "Mobile wireflow board.",
      "Low-fidelity phone screens.",
      "Connector lines.",
      "MVP scope cluster."
    ]
  },
  {
    "id": 14,
    "title": "Desktop SaaS Wireframe System",
    "primaryCategory":   "AI & Automation UX" as PathwayCategory,
    "mockupType": "dashboard",
    "accentColor": "#A8B5C8",
    "accentSoftBg": "#F2F5F8",
    "accentBorder": "#D5DDE8",
    "priority": 14,
    "previewTitle": "Desktop SaaS Wireframe System",
    "previewDescription": "A desktop wireframe pathway for shaping complex SaaS navigation, dashboard hierarchy, admin flows, and product logic before UI polish.",
    "previewProblem": "Desktop SaaS products can become confusing when navigation, data hierarchy, and admin actions are not planned early.",
    "previewOutcome": "The wireframe system created a clear product skeleton for dashboard, settings, user roles, data views, and admin workflows.",
    "tags": [
      "Desktop UX",
      "SaaS Wireframe",
      "Admin Flow",
      "IA Design",
      "Product Skeleton"
    ],
    "uniqueCTA": "Open Desktop Skeleton",
    "detailHero": "Structuring the SaaS product before styling the screen.",
    "productStory": "The client needed a desktop product with multiple user roles, dashboards, records, settings, and admin controls. The first phase focused only on structure: what belongs where, how users navigate, and how the product should scale.",
    "problem": "Complex products often fail because navigation and information architecture are treated as visual layout tasks. The real challenge is product structure.",
    "users": [
      "Admins",
      "Managers",
      "Standard users",
      "Support teams",
      "Developers"
    ],
    "solution": "Create a desktop wireframe system covering navigation, page templates, dashboard hierarchy, table behavior, detail panels, and admin settings.",
    "keyFeatures": [
      "Navigation model",
      "Dashboard wireframe",
      "Table/list view",
      "Detail drawer",
      "User role map",
      "Settings structure",
      "Empty/error states",
      "Permission states",
      "Search/filter behavior",
      "Handoff notes"
    ],
    "uxDecisions": [
      "Use consistent page templates.",
      "Keep navigation scalable.",
      "Use drawers for quick detail without context loss.",
      "Plan permission states before UI polish.",
      "Treat tables as decision tools, not data dumps."
    ],
    "motionDirection": [
      "Animated IA map.",
      "Wireframe screen reveal.",
      "Drawer open/close motion.",
      "Navigation highlight movement.",
      "Role-based view switcher animation."
    ],
    "visualSuggestions": [
      "Desktop wireframe board.",
      "IA tree.",
      "Dashboard skeleton.",
      "Admin settings wireframe."
    ]
  },
  {
    "id": 15,
    "title": "Brand Identity + Digital System",
    "primaryCategory":   "Branding & Design Systems" as PathwayCategory,
    "mockupType": "branding",
    "accentColor": "#F0ABFC",
    "accentSoftBg": "#FDF4FF",
    "accentBorder": "#F5D0FE",
    "priority": 15,
    "previewTitle": "Brand Identity + Digital System",
    "previewDescription": "A brand pathway showing how a business idea becomes a visual identity, tone direction, website style, and reusable digital system.",
    "previewProblem": "The brand needed more than a logo. It needed a clear look, voice, layout system, and digital presence that could scale.",
    "previewOutcome": "The identity was shaped into a practical brand system with colors, typography, components, tone, and launch-ready web direction.",
    "tags": [
      "Brand Identity",
      "Visual System",
      "Website Direction",
      "Brand Guidelines",
      "Digital Brand"
    ],
    "uniqueCTA": "See Brand System",
    "detailHero": "Building the brand as a system, not just a logo.",
    "productStory": "The client started with an idea and needed a complete identity direction. The work moved from positioning and visual references into a brand system that could support website, social content, product UI, and launch assets.",
    "problem": "Many early brands focus only on logo design. But once the brand moves into websites, presentations, social content, and product screens, it needs rules, not just visuals.",
    "users": [
      "Business owner",
      "Customers",
      "Marketing team",
      "Designers/developers using the brand"
    ],
    "solution": "Create a brand identity system with logo direction, typography, color, spacing, visual style, tone, and digital usage examples.",
    "keyFeatures": [
      "Brand positioning",
      "Logo direction",
      "Color system",
      "Typography system",
      "Layout rules",
      "Tone of voice",
      "Website style direction",
      "Social template direction",
      "Brand guideline page",
      "Motion behavior notes"
    ],
    "uxDecisions": [
      "Connect brand personality to user trust.",
      "Make guidelines practical, not decorative.",
      "Design for digital use first.",
      "Keep the system flexible for future pages.",
      "Include examples so the team can apply it correctly."
    ],
    "motionDirection": [
      "Logo construction reveal.",
      "Color palette hover animation.",
      "Typography scale animation.",
      "Brand cards sliding into a guideline page.",
      "Before/after brand transformation."
    ],
    "visualSuggestions": [
      "Brand board.",
      "Logo grid.",
      "Color/type system.",
      "Website hero style.",
      "Social template mockups."
    ]
  },
  {
    "id": 16,
    "title": "Product Design System in Figma",
    "primaryCategory":   "Branding & Design Systems" as PathwayCategory,
    "mockupType": "designSystem",
    "accentColor": "#CBD5E1",
    "accentSoftBg": "#F8FAFC",
    "accentBorder": "#E2E8F0",
    "priority": 16,
    "previewTitle": "Product Design System in Figma",
    "previewDescription": "A reusable product design system with tokens, components, variants, layout rules, and documentation to help teams design faster and stay consistent.",
    "previewProblem": "Teams were recreating UI patterns manually, causing inconsistency between screens and slowing down production.",
    "previewOutcome": "The system created a shared foundation for design and development using reusable components, naming rules, and documented decisions.",
    "tags": [
      "Design System",
      "Figma Components",
      "Tokens",
      "UI Library",
      "Product Consistency"
    ],
    "uniqueCTA": "Inspect Design System",
    "detailHero": "A design system that captures decisions, not just components.",
    "productStory": "The product needed a foundation that could support multiple screens, states, and future features. The goal was to create a design system that both designers and developers could understand.",
    "problem": "Without a system, every new screen becomes a new interpretation. This creates visual inconsistency, slower handoff, and more QA issues.",
    "users": [
      "Product designers",
      "Developers",
      "Product owners",
      "QA team",
      "Future contributors"
    ],
    "solution": "Build a Figma design system with tokens, reusable components, variants, states, layout rules, and documentation. The system should make common product decisions reusable.",
    "keyFeatures": [
      "Color tokens",
      "Type scale",
      "Spacing rules",
      "Button components",
      "Form components",
      "Card components",
      "Table/list patterns",
      "Modal/drawer patterns",
      "Component states",
      "Documentation notes"
    ],
    "uxDecisions": [
      "Name components clearly for design and dev.",
      "Include real product states, not only ideal states.",
      "Document usage rules beside components.",
      "Make variants easy to understand.",
      "Build for scalability, not only current screens."
    ],
    "motionDirection": [
      "Animate token cards flowing into components.",
      "Use component variant switch animation.",
      "Show design system layers stacking.",
      "Add hover previews for component states.",
      "Use a mini 'build once, reuse everywhere' animation."
    ],
    "visualSuggestions": [
      "Figma component library mockup.",
      "Token cards.",
      "Component state grid.",
      "Usage documentation panel."
    ]
  },
  {
    "id": 17,
    "title": "AI-Assisted Design System Build",
    "primaryCategory":   "Branding & Design Systems" as PathwayCategory,
    "mockupType": "designSystem",
    "accentColor": "#CBD5E1",
    "accentSoftBg": "#F8FAFC",
    "accentBorder": "#E2E8F0",
    "priority": 17,
    "previewTitle": "AI-Assisted Design System Build",
    "previewDescription": "A workflow for using AI to speed up design system documentation, component cleanup, naming, and design-to-code alignment.",
    "previewProblem": "Design systems take time to document and maintain, especially when product teams move quickly.",
    "previewOutcome": "AI was used to speed up repetitive system work while final design decisions stayed human-reviewed and editable.",
    "tags": [
      "AI Design System",
      "Documentation",
      "Component Cleanup",
      "Figma Workflow",
      "Design Ops"
    ],
    "uniqueCTA": "View AI System Build",
    "detailHero": "Using AI to speed up system work without losing design quality.",
    "productStory": "This pathway shows how AI can support design system production. The goal is not to let AI own the system, but to use it for repetitive tasks like naming, documentation drafts, variant checks, and code alignment.",
    "problem": "Design system maintenance can become slow when every component needs documentation, naming cleanup, and usage rules. Teams often skip documentation because delivery pressure is high.",
    "users": [
      "Designers",
      "Developers",
      "Product teams",
      "QA/review teams"
    ],
    "solution": "Use AI as a system assistant. It can help generate documentation drafts, detect inconsistencies, suggest naming patterns, and support code handoff. Human review keeps the system accurate.",
    "keyFeatures": [
      "Component naming audit",
      "Documentation draft generation",
      "Token reference cleanup",
      "Usage rule suggestions",
      "Variant checklist",
      "Code mapping notes",
      "Design QA checklist",
      "Prompt library",
      "Handoff documentation",
      "Human approval step"
    ],
    "uxDecisions": [
      "Use AI for repetitive structure, not final judgment.",
      "Keep source of truth in Figma/system files.",
      "Require human review before publishing.",
      "Make documentation short and useful.",
      "Keep design and code naming aligned."
    ],
    "motionDirection": [
      "AI assistant panel animation.",
      "Component audit checklist filling in.",
      "Token-to-component mapping animation.",
      "Human approval stamp.",
      "Documentation card reveal."
    ],
    "visualSuggestions": [
      "Design system audit screen.",
      "AI prompt panel.",
      "Documentation cards.",
      "Component naming checklist."
    ]
  },
  {
    "id": 18,
    "title": "Podcast Production & Video Editing",
    "primaryCategory":   "Motion, Video & Lottie Systems" as PathwayCategory,
    "mockupType": "video",
    "accentColor": "#FCA5A5",
    "accentSoftBg": "#FEF2F2",
    "accentBorder": "#FECACA",
    "priority": 18,
    "previewTitle": "Podcast Production & Video Editing",
    "previewDescription": "A video production pathway covering podcast editing, pacing, audio cleanup, visual structure, branded cuts, and platform-ready delivery.",
    "previewProblem": "Long-form podcast content needed to feel polished, structured, and easier to watch without losing the natural conversation.",
    "previewOutcome": "The final edit improved pacing, clarity, visual flow, and content presentation for digital publishing.",
    "imageUrl": "/case-studies/podcast.png",
    "tags": [
      "Podcast Editing",
      "Video Production",
      "Motion Graphics",
      "Content Design",
      "Social Cuts"
    ],
    "uniqueCTA": "Watch Production Path",
    "detailHero": "Turning raw conversation into a polished content experience.",
    "productStory": "This pathway focuses on podcast/video production work. The goal was to take long-form recorded content and shape it into a cleaner, more watchable output with better pacing, branded presentation, and platform-ready structure.",
    "problem": "Podcast videos can feel slow or unstructured when raw footage is uploaded without pacing, visual hierarchy, audio cleanup, and branded moments. The challenge was to keep the conversation natural while improving clarity and polish.",
    "users": [
      "Podcast viewers",
      "Social media audience",
      "Client/brand team",
      "Host and guest"
    ],
    "solution": "Edit the podcast into a more intentional viewing experience using pacing cuts, audio cleanup, branded intros/outros, lower thirds, visual balance, and platform-specific exports.",
    "keyFeatures": [
      "Timeline cleanup",
      "Audio balancing",
      "Jump cut refinement",
      "Lower thirds",
      "Intro/outro sequence",
      "Branded visual frame",
      "Caption/social cut options",
      "YouTube-ready export",
      "Short-form clip structure",
      "Thumbnail direction"
    ],
    "uxDecisions": [
      "Treat video like a user experience: reduce friction, guide attention, and keep the viewer engaged.",
      "Use motion only where it supports clarity.",
      "Keep cuts natural so the speaker still feels authentic.",
      "Design lower thirds and titles to match the brand tone.",
      "Prepare content for multiple platforms when needed."
    ],
    "motionDirection": [
      "Animated lower thirds.",
      "Intro title reveal.",
      "Audio waveform animation.",
      "Timeline scrub preview.",
      "Social clip crop animation.",
      "YouTube frame-to-short-form transformation."
    ],
    "visualSuggestions": [
      "Video editing timeline mockup.",
      "Podcast frame preview.",
      "Animated lower-third example.",
      "Before/after pacing comparison."
    ],
    "externalLinks": [
      {
        "label": "AI-Powered Productivity: How Automation Is Redefining the Future of Work | Aeturnum Insights",
        "url": "https://www.youtube.com/watch?v=cauWpirDw9w"
      },
      {
        "label": "AI Transformation: Technology, Innovation & Business Value",
        "url": "https://www.youtube.com/watch?v=6XAW9OmWaIY"
      }
    ]
  },
  {
    "id": 19,
    "title": "Lottie Micro Interaction System",
    "primaryCategory":   "Motion, Video & Lottie Systems" as PathwayCategory,
    "mockupType": "video",
    "accentColor": "#FCA5A5",
    "accentSoftBg": "#FEF2F2",
    "accentBorder": "#FECACA",
    "priority": 19,
    "previewTitle": "Lottie Micro Interaction System",
    "previewDescription": "A motion system for lightweight UI animations, loading states, empty states, confirmation moments, and product feedback.",
    "previewProblem": "The product needed feedback moments that felt alive without slowing down the interface.",
    "previewOutcome": "A reusable Lottie/motion set was shaped for consistent product feedback across key UI interactions.",
    "imageUrl": "/case-studies/lottie-micro.html",
    "tags": [
      "Lottie",
      "Micro Interactions",
      "UI Animation",
      "Motion System",
      "Feedback States"
    ],
    "uniqueCTA": "View Motion Set",
    "detailHero": "Bringing product feedback to life without slowing the interface.",
    "productStory": "This pathway focused on building a library of micro-interactions using Lottie. The goal was to enhance the product feel through motion without compromising performance or causing visual distraction.",
    "problem": "Static feedback (like basic loaders or plain success messages) can feel dull, but heavy animations slow down the app. The system needed lightweight, consistent motion for standard interactions.",
    "users": [
      "Product end users",
      "Product designers",
      "Front-end developers implementing motion"
    ],
    "solution": "Design a standardized set of Lottie animations for common UI states (loading, success, error, empty state, data refresh). Ensure files are optimized for fast loading and easy integration.",
    "keyFeatures": [
      "Loading spinners & skeletons",
      "Success & error indicators",
      "Empty state illustrations",
      "Pull-to-refresh animations",
      "Button micro-interactions",
      "Navigation transitions",
      "JSON optimization",
      "Developer integration guide",
      "Motion design tokens"
    ],
    "uxDecisions": [
      "Keep animations under 2 seconds to avoid frustrating users.",
      "Use motion to explain state changes, not just for decoration.",
      "Ensure all animations match the brand's visual tone.",
      "Provide scalable vector formats (Lottie JSON).",
      "Support reduced-motion preferences at the implementation level."
    ],
    "motionDirection": [
      "Smooth easing curves (ease-in-out).",
      "Looping states for loaders.",
      "One-shot playback for success/error.",
      "Subtle idle floating for empty states.",
      "Synchronized motion across components."
    ],
    "visualSuggestions": [
      "Lottie animation grid.",
      "Before/after UI motion examples.",
      "Developer handoff snippets.",
      "Animation timing charts."
    ]
  },
  {
    "id": 20,
    "title": "Design-to-Development Handoff System",
    "primaryCategory": "Product Handoff" as PathwayCategory,
    "mockupType": "documentation",
    "accentColor": "#94A3B8",
    "accentSoftBg": "#F1F5F9",
    "accentBorder": "#E2E8F0",
    "priority": 20,
    "previewTitle": "Design-to-Development Handoff System",
    "previewDescription": "A structured handoff process that translates Figma designs into build-ready documentation with clear responsive rules and developer notes.",
    "previewProblem": "Development was stalling due to unclear spacing, missing responsive states, and undefined interactions in Figma.",
    "previewOutcome": "The handoff system reduced back-and-forth by delivering a clear technical specification alongside the visual design.",
    "tags": [
      "Figma Handoff",
      "Developer Notes",
      "Responsive Review",
      "Technical Spec",
      "Process"
    ],
    "uniqueCTA": "View Handoff Specs",
    "detailHero": "Bridging the gap between design intent and development reality.",
    "productStory": "The team was struggling with the transition from design to code. Designs looked great in Figma but broke during implementation because states and behaviors weren't defined. The goal was to build a handoff system that developers could actually trust.",
    "problem": "Without a clear handoff, developers have to guess responsive behaviors, empty states, and interaction timings, leading to QA friction and rework.",
    "users": [
      "Front-end developers",
      "QA engineers",
      "Product managers",
      "Designers"
    ],
    "solution": "Create a standardized handoff format inside Figma and external documentation. Include redlines, token mappings, state definitions, and clear responsive breakpoint rules.",
    "keyFeatures": [
      "Component state matrices",
      "Responsive breakpoint rules",
      "Design token mapping",
      "Micro-interaction timing specs",
      "Accessibility requirements",
      "Empty and error state definitions",
      "Asset export guidelines",
      "Implementation checklist"
    ],
    "uxDecisions": [
      "Use developer-friendly language for spacing and typography.",
      "Never leave responsive behavior to interpretation.",
      "Keep annotations visually separated from the design.",
      "Provide direct links to design system components."
    ],
    "motionDirection": [
      "Diagram showing the flow from Figma to code.",
      "Highlighting token mapping."
    ],
    "visualSuggestions": [
      "Figma handoff file mockup.",
      "Redline specification examples.",
      "State matrix."
    ]
  },
  {
    "id": 21,
    "title": "Product Owner Delivery Pack",
    "primaryCategory": "Product Handoff" as PathwayCategory,
    "mockupType": "documentation",
    "accentColor": "#94A3B8",
    "accentSoftBg": "#F1F5F9",
    "accentBorder": "#E2E8F0",
    "priority": 21,
    "previewTitle": "Product Owner Delivery Pack",
    "previewDescription": "A comprehensive delivery package designed to align product owners, stakeholders, and engineering on MVP scope and user stories.",
    "previewProblem": "Product requirements were scattered across different docs, leading to scope creep and misaligned expectations.",
    "previewOutcome": "The delivery pack centralized user stories, acceptance criteria, and feature prioritization to ensure everyone built the same product.",
    "tags": [
      "Product Delivery",
      "MVP Scope",
      "User Stories",
      "Agile Workflow",
      "Documentation"
    ],
    "uniqueCTA": "Review Delivery Pack",
    "detailHero": "Creating clarity for product owners and engineering teams.",
    "productStory": "To ensure a successful build phase, the product owner needed a single source of truth that connected the approved designs to actionable development tasks. We built a delivery pack to translate UX into user stories.",
    "problem": "When UX design finishes, there is often a gap before engineering starts. Without clear user stories and MVP scope definition, the project risks delays and feature bloat.",
    "users": [
      "Product owners",
      "Scrum masters",
      "Engineering leads",
      "Stakeholders"
    ],
    "solution": "Develop a product delivery pack that breaks down the design into prioritized epics, user stories, and acceptance criteria, defining exactly what is in the MVP.",
    "keyFeatures": [
      "Epic and feature breakdown",
      "Detailed user stories",
      "Clear acceptance criteria",
      "MVP scope definition",
      "Phase 2 feature backlog",
      "Risk and dependency mapping",
      "Design-to-ticket linking"
    ],
    "uxDecisions": [
      "Write acceptance criteria from the user's perspective.",
      "Clearly label out-of-scope items.",
      "Link every story directly to its Figma screen.",
      "Group features by user journey, not just technical architecture."
    ],
    "motionDirection": [
      "Card sorting animation for feature prioritization.",
      "User story checklist progression."
    ],
    "visualSuggestions": [
      "Jira/Linear board mockup.",
      "User story documentation format.",
      "MVP scope matrix."
    ]
  },
  {
    "id": 22,
    "title": "Landing Page Launch Pack",
    "primaryCategory": "Product Handoff" as PathwayCategory,
    "mockupType": "documentation",
    "accentColor": "#94A3B8",
    "accentSoftBg": "#F1F5F9",
    "accentBorder": "#E2E8F0",
    "priority": 22,
    "previewTitle": "Landing Page Launch Pack",
    "previewDescription": "A complete set of assets, copy, and technical guidelines delivered to the client for a smooth marketing landing page launch.",
    "previewProblem": "The client had a great design but struggled to implement it across their CMS, social channels, and email marketing.",
    "previewOutcome": "The launch pack provided everything needed for a coordinated go-live, from web assets to post-design implementation support.",
    "tags": [
      "Launch Pack",
      "Client Delivery",
      "Asset Handoff",
      "Marketing Setup",
      "CMS Implementation"
    ],
    "uniqueCTA": "Explore Launch Pack",
    "detailHero": "Everything needed to take a landing page from design to live.",
    "productStory": "Designing the landing page is only half the battle. The client needed to know how to use the assets, populate their CMS, and coordinate their marketing launch. The launch pack bridged that gap.",
    "problem": "Clients often receive a Figma file and don't know what to do next. They need optimized images, finalized copy, social sharing cards, and clear instructions for their developers or CMS editors.",
    "users": [
      "Marketing teams",
      "Content editors",
      "Client stakeholders",
      "Web developers"
    ],
    "solution": "Package the final design with all necessary implementation assets: optimized images, SVG icons, finalized copy docs, SEO metadata, and a guide for CMS integration.",
    "keyFeatures": [
      "Optimized web asset folder",
      "Finalized copy document",
      "SEO metadata and OG image",
      "Social media promo templates",
      "CMS content mapping guide",
      "Post-design support plan",
      "Analytics tracking recommendations"
    ],
    "uxDecisions": [
      "Organize assets logically by page section.",
      "Provide copy in a format that's easy to paste into a CMS.",
      "Ensure all images are pre-optimized for web performance.",
      "Include clear instructions for OG image setup."
    ],
    "motionDirection": [
      "Assets compiling into a neat folder structure.",
      "Social sharing card preview."
    ],
    "visualSuggestions": [
      "Folder structure visual.",
      "Copy and asset delivery document.",
      "Social sharing preview (OG image)."
    ]
  },
  {
    "id": 23,
    "title": "QA & Launch Readiness Checklist",
    "primaryCategory": "Product Handoff" as PathwayCategory,
    "mockupType": "documentation",
    "accentColor": "#94A3B8",
    "accentSoftBg": "#F1F5F9",
    "accentBorder": "#E2E8F0",
    "priority": 23,
    "previewTitle": "QA & Launch Readiness Checklist",
    "previewDescription": "A rigorous pre-launch review process that covers responsive testing, design QA, accessibility, and performance before a product goes live.",
    "previewProblem": "Products were launching with broken responsive layouts, missed design details, and unhandled error states.",
    "previewOutcome": "The QA checklist created a systematic way to verify implementation against the design, ensuring a high-quality launch.",
    "tags": [
      "QA Checklist",
      "Launch Readiness",
      "Responsive QA",
      "Design Review",
      "Testing"
    ],
    "uniqueCTA": "View QA Process",
    "detailHero": "Ensuring the final build matches the original design intent.",
    "productStory": "Before popping the champagne, the product needs to be tested in the real world. We implemented a design QA process to catch layout bugs, interaction glitches, and missing states before users did.",
    "problem": "Developers focus on functionality, sometimes missing subtle design details like spacing, font weights, or hover states. A structured design QA process is needed to catch these visual regressions.",
    "users": [
      "QA engineers",
      "Designers",
      "Developers",
      "Project managers"
    ],
    "solution": "Implement a launch readiness checklist that includes cross-browser testing, responsive review, accessibility checks, and a visual comparison against the Figma files.",
    "keyFeatures": [
      "Visual regression checklist",
      "Responsive breakpoint testing",
      "Interactive state verification",
      "Accessibility (a11y) audit",
      "Performance and loading state checks",
      "Error handling review",
      "Bug reporting format"
    ],
    "uxDecisions": [
      "Log visual bugs with clear screenshots and expected vs. actual results.",
      "Prioritize bugs by impact on user experience.",
      "Verify on actual devices, not just browser emulators.",
      "Check empty and error states, not just the happy path."
    ],
    "motionDirection": [
      "Checklist items being ticked off.",
      "Responsive resize animation showing layout adapting."
    ],
    "visualSuggestions": [
      "QA checklist document.",
      "Bug report ticket mockup.",
      "Responsive testing grid."
    ]
  },
  {
    "id": 24,
    "title": "FinTech Account & Activity Flow",
    "primaryCategory": "Mobile App Experiences" as PathwayCategory,
    "categories": ["Mobile App Experiences", "Commerce & Marketplace"],
    "mockupType": "fintech",
    "accentColor": "#5B8DEF",
    "accentSoftBg": "#EEF3FF",
    "accentBorder": "#C9DAFF",
    "priority": 24,
    "previewTitle": "FinTech Account & Activity Flow",
    "previewDescription": "A mobile banking-style UX flow focused on account overview, transaction clarity, status feedback, and secure action confirmation.",
    "previewProblem": "Users needed a clear way to review account activity, understand transaction status, and move through financial actions without confusion.",
    "previewOutcome": "The experience was structured around quick scanning, clear transaction states, confirmation screens, and reduced uncertainty during key financial actions.",
    "tags": [
      "FinTech UX",
      "Mobile App",
      "Account Flow",
      "Transaction UX",
      "Status Design"
    ],
    "uniqueCTA": "View FinTech Flow",
    "detailHero": "Helping people read their money at a glance and act with confidence.",
    "productStory": "Money apps live or die on trust. The goal here was to make account activity feel calm and readable, so a user can open the app, understand where their balance stands, and complete a payment or transfer without second-guessing what just happened.",
    "problem": "Financial flows often hide status. A payment is sent but the user is unsure if it cleared. A balance updates but the recent activity does not explain why. That uncertainty is where people lose confidence and start contacting support.",
    "users": [
      "Everyday account holders checking balances",
      "Users sending or scheduling payments",
      "Support teams reducing repeat questions",
      "Product owners tracking activation"
    ],
    "solution": "Design a mobile flow built around scanning first and acting second. The account view answers what changed, the activity list explains every state in plain language, and each money action ends with a clear confirmation the user can trust.",
    "keyFeatures": [
      "Account overview summary",
      "Plain-language transaction states",
      "Pending vs completed clarity",
      "Secure action confirmation",
      "Recent activity timeline",
      "Quick action shortcuts",
      "Receipt and detail view",
      "Empty and error states"
    ],
    "uxDecisions": [
      "Show status before showing numbers.",
      "Use clear words like pending, sent, and received instead of codes.",
      "Confirm every money action with a calm review step.",
      "Keep balances and activity on one readable surface."
    ],
    "motionDirection": [
      "Animate balance counters on open.",
      "Use soft state transitions from pending to completed.",
      "Add a confirmation checkmark for completed actions.",
      "Use bottom-sheet transitions for action details."
    ],
    "visualSuggestions": [
      "Mobile account home screen.",
      "Transaction activity list with states.",
      "Payment confirmation screen.",
      "Receipt detail view."
    ]
  },
  {
    "id": 25,
    "title": "Portfolio Website + AI Rapid Production",
    "primaryCategory": "Web & CMS Platforms" as PathwayCategory,
    "categories": ["Web & CMS Platforms", "AI & Automation UX", "Branding & Design Systems"],
    "mockupType": "website",
    "accentColor": "#6EE7B7",
    "accentSoftBg": "#ECFDF5",
    "accentBorder": "#A7F3D0",
    "priority": 25,
    "previewTitle": "Portfolio Website + AI Rapid Production",
    "previewDescription": "A responsive portfolio website built through a fast AI-assisted production workflow, combining product storytelling, visual experimentation, content structure, and front-end iteration.",
    "previewProblem": "The portfolio needed to be redesigned quickly for job applications while still feeling custom, thoughtful, and different from a standard template.",
    "previewOutcome": "The website became a live portfolio system that shows design range, AI-assisted speed, and the ability to move from concept to polished execution quickly.",
    "tags": [
      "Portfolio UX",
      "AI Workflow",
      "Responsive Web",
      "Creative Direction",
      "UI Production"
    ],
    "uniqueCTA": "Open AI Website Build",
    "detailHero": "From a blank repo to a living portfolio in a fast, controlled sprint.",
    "productStory": "This site is the work and the proof at the same time. The goal was to rebuild the portfolio quickly enough for an active job search, while keeping it personal, crafted, and clearly not a template. AI handled the repetitive production so the time could go into story, layout, and polish.",
    "problem": "A fast portfolio rebuild usually means a generic template. The challenge was to keep speed without losing craft, so the site still reads as a designer's own point of view rather than a starter kit.",
    "users": [
      "Recruiters and hiring managers",
      "Design leads reviewing range",
      "Product teams scanning case studies",
      "The designer maintaining it over time"
    ],
    "solution": "Use an AI-assisted front-end workflow where the design direction, layout intent, and motion stay human-led, and AI accelerates component production, content structure, and iteration. Every screen passes a design review before it ships.",
    "keyFeatures": [
      "Responsive page system",
      "Case study structure",
      "Reusable section components",
      "Motion and reveal layer",
      "Light and dark theming",
      "AI-assisted iteration loop",
      "Content-first information architecture",
      "Performance tuning pass"
    ],
    "uxDecisions": [
      "Keep the design direction human and let AI speed up production.",
      "Make every section answer a hiring question.",
      "Design for range without making every page look the same.",
      "Treat the site itself as a portfolio piece."
    ],
    "motionDirection": [
      "Section reveals on scroll.",
      "Desktop and mobile preview switching.",
      "Card and grid entrance motion.",
      "Subtle hover and CTA states."
    ],
    "visualSuggestions": [
      "Portfolio homepage mockup.",
      "Case study layout.",
      "Responsive desktop and mobile frames.",
      "AI production workflow strip."
    ]
  },
  {
    "id": 26,
    "title": "SaaS Marketing Website + CMS Structure",
    "primaryCategory": "Web & CMS Platforms" as PathwayCategory,
    "categories": ["Web & CMS Platforms", "Product Handoff"],
    "mockupType": "website",
    "accentColor": "#34D399",
    "accentSoftBg": "#ECFDF5",
    "accentBorder": "#A7F3D0",
    "priority": 26,
    "previewTitle": "SaaS Marketing Website + CMS Structure",
    "previewDescription": "A SaaS website structure focused on product positioning, feature storytelling, lead generation, reusable CMS sections, and scalable content blocks.",
    "previewProblem": "A product-led business needed a web presence that explained value clearly while supporting reusable content and future growth.",
    "previewOutcome": "The site structure helped organize product messaging, feature education, trust sections, and conversion points into a reusable CMS-friendly system.",
    "tags": [
      "SaaS Website",
      "CMS UX",
      "Marketing Site",
      "Lead Generation",
      "Web System"
    ],
    "uniqueCTA": "View SaaS Web System",
    "detailHero": "A marketing site that explains the product and stays easy to grow.",
    "productStory": "A product-led company needed a site that could sell the value and keep up with a fast roadmap. The work focused as much on the content system behind the pages as on the pages themselves, so the team could add features and stories without rebuilding layouts.",
    "problem": "SaaS sites go stale fast. New features ship, but the marketing site cannot keep up because every page is hand-built. The structure needed to make updates feel like filling in content, not redesigning.",
    "users": [
      "Prospects evaluating the product",
      "Marketing teams updating content",
      "Sales teams pointing to proof",
      "Founders shaping positioning"
    ],
    "solution": "Build a modular site on reusable CMS blocks: hero, feature stories, social proof, pricing, and conversion sections. Each block is a content type the team can reorder and reuse, so the site scales with the product.",
    "keyFeatures": [
      "Positioning-led homepage",
      "Feature storytelling sections",
      "Reusable CMS content blocks",
      "Pricing and plan layout",
      "Trust and proof sections",
      "Lead capture and CTA system",
      "Blog and resource structure",
      "SEO-ready page templates"
    ],
    "uxDecisions": [
      "Lead with the value, not the feature list.",
      "Design sections as reusable content types.",
      "Keep conversion points visible but calm.",
      "Make the CMS match how the team writes."
    ],
    "motionDirection": [
      "Feature sections revealing on scroll.",
      "Hero message transitions.",
      "Logo and proof marquee.",
      "CTA hover states."
    ],
    "visualSuggestions": [
      "SaaS homepage mockup.",
      "Feature section blocks.",
      "CMS content model diagram.",
      "Pricing layout."
    ]
  },
  {
    "id": 27,
    "title": "Local Service Website + Booking Path",
    "primaryCategory": "Web & CMS Platforms" as PathwayCategory,
    "categories": ["Web & CMS Platforms", "Mobile App Experiences"],
    "mockupType": "website",
    "accentColor": "#10B981",
    "accentSoftBg": "#ECFDF5",
    "accentBorder": "#A7F3D0",
    "priority": 27,
    "previewTitle": "Local Service Website + Booking Path",
    "previewDescription": "A service-business web experience combining service pages, trust-building sections, inquiry paths, contact actions, and lightweight booking logic.",
    "previewProblem": "Small service businesses often need a simple website that builds trust quickly and turns visitors into inquiries without a complex platform.",
    "previewOutcome": "The website was structured to make services easy to understand, reduce friction in the contact journey, and support future content updates.",
    "tags": [
      "Service Website",
      "Booking UX",
      "Local Business",
      "CMS",
      "Lead Flow"
    ],
    "uniqueCTA": "View Service Web Flow",
    "detailHero": "Turning a local service into clear pages and an easy way to get in touch.",
    "productStory": "A local service business does not need a heavy platform. It needs to look credible, explain what it does, and make booking or contact effortless on a phone. The work focused on trust and a short path from interest to inquiry.",
    "problem": "Service sites often bury the offer and the contact action. Visitors cannot quickly tell what the business does or how to book, so they leave before reaching out.",
    "users": [
      "People searching for a local service",
      "Returning customers rebooking",
      "Business owners updating content",
      "Mobile visitors on the go"
    ],
    "solution": "Design a focused site with clear service pages, trust sections, and a short booking or inquiry path. The contact action stays within reach on mobile, and content stays editable for the owner.",
    "keyFeatures": [
      "Clear service pages",
      "Trust and review sections",
      "Lightweight booking path",
      "Mobile-first contact actions",
      "Inquiry and quote form",
      "Gallery or work samples",
      "FAQ section",
      "Editable CMS content"
    ],
    "uxDecisions": [
      "Make the offer obvious on the first screen.",
      "Keep the contact action one tap away on mobile.",
      "Use trust signals near decision points.",
      "Keep booking light, not a heavy platform."
    ],
    "motionDirection": [
      "Service cards revealing on scroll.",
      "Booking step transitions.",
      "Sticky mobile contact bar.",
      "Form confirmation state."
    ],
    "visualSuggestions": [
      "Service homepage mockup.",
      "Booking or inquiry flow.",
      "Mobile contact section.",
      "Trust and reviews block."
    ]
  },
  {
    "id": 28,
    "title": "Subscription Plan & Checkout Flow",
    "primaryCategory": "Commerce & Marketplace" as PathwayCategory,
    "categories": ["Commerce & Marketplace", "Product Platforms & Dashboards"],
    "mockupType": "commerce",
    "accentColor": "#FFB86B",
    "accentSoftBg": "#FFF4E8",
    "accentBorder": "#FFD9AD",
    "priority": 28,
    "previewTitle": "Subscription Plan & Checkout Flow",
    "previewDescription": "A subscription checkout journey focused on plan comparison, pricing clarity, add-on selection, confirmation states, and payment confidence.",
    "previewProblem": "Users needed to compare plans, understand what they were paying for, and complete checkout without feeling uncertain.",
    "previewOutcome": "The flow improved decision clarity by making plan differences, costs, selected options, and next steps visible before payment.",
    "tags": [
      "Checkout UX",
      "Subscription Flow",
      "Pricing UX",
      "Commerce",
      "Conversion Design"
    ],
    "uniqueCTA": "View Checkout Flow",
    "detailHero": "Making plan choice and payment feel clear instead of risky.",
    "productStory": "Subscription checkout is where good products lose people. The goal was to help a user compare plans, see exactly what they are paying for, and reach payment without that last-second hesitation that kills conversion.",
    "problem": "When plan differences and total costs are unclear, users stall right before paying. Hidden add-ons and vague summaries make checkout feel like a risk rather than a decision.",
    "users": [
      "New subscribers choosing a plan",
      "Users upgrading or adding options",
      "Billing and growth teams",
      "Support teams handling refunds"
    ],
    "solution": "Design a flow that makes the decision visible. Plans compare side by side, add-ons show their cost impact live, and a clear review step confirms exactly what the user is buying before payment.",
    "keyFeatures": [
      "Side-by-side plan comparison",
      "Transparent pricing breakdown",
      "Add-on selection with live totals",
      "Order review step",
      "Confirmation and receipt states",
      "Payment method clarity",
      "Trust and security cues",
      "Error and retry handling"
    ],
    "uxDecisions": [
      "Show the total cost before the payment step.",
      "Make plan differences scannable, not buried.",
      "Confirm the selection before charging.",
      "Keep trust cues near the payment action."
    ],
    "motionDirection": [
      "Animate totals updating with add-ons.",
      "Plan card selection states.",
      "Step progress through checkout.",
      "Confirmation success state."
    ],
    "visualSuggestions": [
      "Plan comparison screen.",
      "Checkout review step.",
      "Pricing breakdown panel.",
      "Confirmation screen."
    ]
  },
  {
    "id": 29,
    "title": "Vendor Onboarding & Listing Flow",
    "primaryCategory": "Commerce & Marketplace" as PathwayCategory,
    "categories": ["Commerce & Marketplace", "Product Handoff"],
    "mockupType": "marketplace",
    "accentColor": "#FB923C",
    "accentSoftBg": "#FFF4E8",
    "accentBorder": "#FFD9AD",
    "priority": 29,
    "previewTitle": "Vendor Onboarding & Listing Flow",
    "previewDescription": "A seller-side marketplace flow covering onboarding, listing creation, product detail entry, verification, and publishing readiness.",
    "previewProblem": "Marketplace sellers needed a guided way to create profiles, add listings, manage product details, and understand approval status.",
    "previewOutcome": "The seller experience was structured into clear steps so vendors could publish complete, trustworthy listings with fewer mistakes.",
    "tags": [
      "Marketplace UX",
      "Seller Flow",
      "Onboarding",
      "Listing UX",
      "Admin Tools"
    ],
    "uniqueCTA": "Open Seller Flow",
    "detailHero": "Guiding sellers from sign-up to a complete, publish-ready listing.",
    "productStory": "A marketplace is only as good as its listings. The work focused on the seller side: making onboarding and listing creation feel guided, so vendors publish complete, trustworthy products instead of half-finished ones that hurt buyer confidence.",
    "problem": "Sellers drop off when onboarding is long and listing forms are confusing. Incomplete listings and unclear approval status create friction for both vendors and the marketplace team.",
    "users": [
      "New sellers setting up shop",
      "Vendors managing listings",
      "Marketplace review and admin teams",
      "Buyers who benefit from complete listings"
    ],
    "solution": "Break the seller journey into clear steps: profile setup, listing creation, product detail entry, verification, and a readiness check before publishing. Status is visible at every stage so sellers always know what is left.",
    "keyFeatures": [
      "Guided onboarding steps",
      "Listing creation wizard",
      "Product detail entry",
      "Media and pricing inputs",
      "Verification and approval status",
      "Publish readiness checklist",
      "Draft and saved states",
      "Seller dashboard overview"
    ],
    "uxDecisions": [
      "Break long forms into clear, savable steps.",
      "Show what a complete listing needs up front.",
      "Make approval status visible at all times.",
      "Reduce mistakes with inline guidance."
    ],
    "motionDirection": [
      "Step progress through onboarding.",
      "Listing completeness meter.",
      "Status transitions from draft to live.",
      "Inline validation feedback."
    ],
    "visualSuggestions": [
      "Seller onboarding steps.",
      "Listing creation wizard.",
      "Approval status view.",
      "Seller dashboard."
    ]
  },
  {
    "id": 30,
    "title": "Startup Brand + Launch Identity",
    "primaryCategory": "Branding & Design Systems" as PathwayCategory,
    "categories": ["Branding & Design Systems", "Web & CMS Platforms"],
    "mockupType": "branding",
    "accentColor": "#F0ABFC",
    "accentSoftBg": "#FDF4FF",
    "accentBorder": "#F5D0FE",
    "priority": 30,
    "previewTitle": "Startup Brand + Launch Identity",
    "previewDescription": "A brand identity pathway covering logo direction, color system, typography, graphic language, social templates, and digital launch assets.",
    "previewProblem": "A new business needed more than a logo. It needed a practical identity system that could work across web, social, packaging, and pitch materials.",
    "previewOutcome": "The identity was turned into a usable launch system with clear visual rules, reusable assets, and a consistent digital presence.",
    "tags": [
      "Brand Identity",
      "Visual System",
      "Launch Kit",
      "Graphic Design",
      "Digital Brand"
    ],
    "uniqueCTA": "View Brand Launch Kit",
    "detailHero": "Building a startup brand that holds up the moment it goes live.",
    "productStory": "A new business needs a brand that works on day one, across a website, a pitch deck, and social. The work moved past a single logo into a practical identity system the team could actually apply without a designer in the room for every asset.",
    "problem": "Early brands often stop at a logo. Then the website, deck, and social posts all look different because there are no rules. The identity needed to be a system, not a single file.",
    "users": [
      "Founders launching the business",
      "Early customers forming a first impression",
      "Marketing and content creators",
      "Designers applying the brand"
    ],
    "solution": "Create a launch-ready identity system: logo direction, color, typography, graphic language, and ready templates for social and web. The system ships with examples so the team can stay consistent as they grow.",
    "keyFeatures": [
      "Logo direction and usage",
      "Color and typography system",
      "Graphic and visual language",
      "Social media templates",
      "Web style direction",
      "Pitch and presentation assets",
      "Brand guideline reference",
      "Reusable launch asset kit"
    ],
    "uxDecisions": [
      "Design the brand as a reusable system.",
      "Ship templates so the team stays consistent.",
      "Make the digital use cases first-class.",
      "Keep rules practical, not decorative."
    ],
    "motionDirection": [
      "Logo construction reveal.",
      "Color and type specimen animation.",
      "Template cards sliding into a kit.",
      "Before and after brand transformation."
    ],
    "visualSuggestions": [
      "Brand board.",
      "Logo and color system.",
      "Social template set.",
      "Launch asset kit."
    ]
  },
  {
    "id": 31,
    "title": "Brand Motion & Social Cutdown System",
    "primaryCategory": "Motion, Video & Lottie Systems" as PathwayCategory,
    "categories": ["Motion, Video & Lottie Systems", "Branding & Design Systems"],
    "mockupType": "video",
    "accentColor": "#FCA5A5",
    "accentSoftBg": "#FEF2F2",
    "accentBorder": "#FECACA",
    "priority": 31,
    "previewTitle": "Brand Motion & Social Cutdown System",
    "previewDescription": "A motion design system for turning brand elements into short animated content, social cutdowns, intros, outros, and reusable motion patterns.",
    "previewProblem": "Static brand assets needed to feel more alive across social content, short videos, and launch materials.",
    "previewOutcome": "The motion system created a more consistent visual rhythm across video content, social edits, and branded digital communication.",
    "tags": [
      "Motion Design",
      "Social Video",
      "Brand Animation",
      "Content System",
      "Visual Editing"
    ],
    "uniqueCTA": "View Motion System",
    "detailHero": "Giving a static brand a consistent voice in motion.",
    "productStory": "A brand that only lives in static assets feels flat on social. The work built a motion system that turns existing brand elements into short animated content, so every clip, intro, and cutdown shares the same rhythm and feels like the same brand.",
    "problem": "Without a motion system, every video is made from scratch and they all feel slightly different. The brand loses consistency the moment it starts moving.",
    "users": [
      "Social and content teams",
      "Brand and marketing leads",
      "Editors producing cutdowns",
      "The audience watching the content"
    ],
    "solution": "Build reusable motion patterns from the brand: animated logo, intros and outros, lower thirds, transitions, and social cutdown templates. Editors assemble on-brand video quickly instead of reinventing each time.",
    "keyFeatures": [
      "Animated logo and bumpers",
      "Intro and outro sequences",
      "Lower thirds and titles",
      "Transition patterns",
      "Social cutdown templates",
      "Reusable motion presets",
      "Aspect ratio variants",
      "Export-ready delivery"
    ],
    "uxDecisions": [
      "Treat motion as part of the brand system.",
      "Make patterns reusable across clips.",
      "Keep timing consistent so it feels familiar.",
      "Prepare variants for each platform."
    ],
    "motionDirection": [
      "Animated logo reveal.",
      "Lower-third entrance patterns.",
      "Transition wipes and cuts.",
      "Social crop and reframe motion."
    ],
    "visualSuggestions": [
      "Motion system overview board.",
      "Intro and outro frames.",
      "Lower-third examples.",
      "Social cutdown templates."
    ]
  },
  {
    "id": 32,
    "title": "Product Explainer UI Animation",
    "primaryCategory": "Motion, Video & Lottie Systems" as PathwayCategory,
    "categories": ["Motion, Video & Lottie Systems", "AI & Automation UX"],
    "mockupType": "video",
    "accentColor": "#F87171",
    "accentSoftBg": "#FEF2F2",
    "accentBorder": "#FECACA",
    "priority": 32,
    "previewTitle": "Product Explainer UI Animation",
    "previewDescription": "A UI animation pathway using product screens, transitions, callouts, and lightweight motion to explain how a digital product works.",
    "previewProblem": "Some product ideas are easier to understand when the interface is shown in motion instead of as static screens.",
    "previewOutcome": "The animation helped communicate product value, flow, and interaction logic in a faster and more engaging way.",
    "tags": [
      "UI Animation",
      "Product Explainer",
      "Motion UX",
      "Prototype",
      "Demo Flow"
    ],
    "uniqueCTA": "Play UI Explainer",
    "detailHero": "Showing how a product works by putting the interface in motion.",
    "productStory": "Some products are hard to explain with static screens. The work turned key flows into a short UI animation, using real product screens, transitions, and callouts so a viewer can understand the value and the interaction logic in seconds.",
    "problem": "Static screenshots cannot show flow. People do not understand how a product moves from one step to the next, so the value gets lost in a wall of images.",
    "users": [
      "Prospects evaluating the product",
      "Sales and demo teams",
      "Product owners pitching the idea",
      "New users learning the flow"
    ],
    "solution": "Animate the product story: real screens move through the core flow, callouts highlight what matters, and lightweight motion keeps the focus on the interaction rather than decoration.",
    "keyFeatures": [
      "Real product screens in motion",
      "Step-by-step flow animation",
      "Callouts and highlights",
      "Cursor and interaction cues",
      "Lightweight transitions",
      "Looping demo option",
      "Aspect ratio variants",
      "Export-ready delivery"
    ],
    "uxDecisions": [
      "Use motion to explain flow, not to decorate.",
      "Highlight one idea at a time.",
      "Keep the pace fast but readable.",
      "Show real interface, not abstract shapes."
    ],
    "motionDirection": [
      "Screen-to-screen flow transitions.",
      "Callout and highlight reveals.",
      "Cursor movement cues.",
      "Looping demo sequence."
    ],
    "visualSuggestions": [
      "Product screen sequence.",
      "Animated callouts.",
      "Flow transition frames.",
      "Looping demo preview."
    ]
  }
];

/** Every category a pathway belongs to (its primary plus any extras). */
export const pathwayCategories = (pathway: ProductPathway): PathwayCategory[] =>
  pathway.categories && pathway.categories.length > 0
    ? pathway.categories
    : [pathway.primaryCategory];

/** True when a pathway belongs to the given category ("All Pathways" matches all). */
export const pathwayInCategory = (pathway: ProductPathway, category: PathwayCategory): boolean =>
  category === "All Pathways" || pathwayCategories(pathway).includes(category);

/**
 * "All Pathways" order. Instead of grouping by category, the view leads with a
 * hand-picked, round-robin sequence so range is obvious immediately (no run of
 * dashboards or same-category cards up top), then interleaves the remaining
 * pathways across categories so the mix continues all the way down.
 */
const ALL_LEAD_ORDER: number[] = [
  1, // Workforce Time & Resource Management — Dashboard
  5, // Mobile Booking & Service Flow — Mobile
  9, // Service Business Website + CMS — Web/CMS
  11, // AI + Figma MCP Design Workflow — AI
  15, // Brand Identity + Digital System — Branding
  10, // E-Commerce Product Catalog — Commerce
  19, // Lottie Micro Interaction System — Motion/Lottie
  20, // Design-to-Development Handoff System — Handoff
  2, // Enterprise Operations Command Center — Dashboard/Admin
  6, // Marketplace Mobile Experience — Marketplace/Mobile
  25, // Portfolio Website + AI Rapid Production — Web/AI
  18, // Podcast Production & Video Editing — Motion/Video
];

/** Order used to interleave the remaining pathways after the lead sequence. */
const ROUND_ROBIN_CATEGORIES: PathwayCategory[] = CATEGORIES.filter(
  (c) => c !== "All Pathways"
);

const getAllPathwaysOrdered = (): ProductPathway[] => {
  const byId = new Map(PRODUCT_PATHWAYS.map((p) => [p.id, p]));
  const used = new Set<number>();
  const ordered: ProductPathway[] = [];

  // 1. Hand-picked lead sequence.
  for (const id of ALL_LEAD_ORDER) {
    const p = byId.get(id);
    if (p && !used.has(p.id)) {
      ordered.push(p);
      used.add(p.id);
    }
  }

  // 2. Remaining pathways, bucketed by primary category and interleaved
  //    round-robin so adjacent cards keep switching domains.
  const buckets = ROUND_ROBIN_CATEGORIES.map((cat) =>
    PRODUCT_PATHWAYS.filter((p) => !used.has(p.id) && p.primaryCategory === cat).sort(
      (a, b) => a.priority - b.priority
    )
  );

  let added = true;
  while (added) {
    added = false;
    for (const bucket of buckets) {
      const next = bucket.shift();
      if (next && !used.has(next.id)) {
        ordered.push(next);
        used.add(next.id);
        added = true;
      }
    }
  }

  // 3. Safety net: anything not placed yet (shouldn't happen) by priority.
  for (const p of [...PRODUCT_PATHWAYS].sort((a, b) => a.priority - b.priority)) {
    if (!used.has(p.id)) {
      ordered.push(p);
      used.add(p.id);
    }
  }

  return ordered;
};

/**
 * Pathways for a category. "All Pathways" uses the mixed round-robin order;
 * a specific category filters to its members, ordered by priority.
 */
export const getPathwaysForCategory = (category: PathwayCategory): ProductPathway[] =>
  category === "All Pathways"
    ? getAllPathwaysOrdered()
    : PRODUCT_PATHWAYS.filter((p) => pathwayInCategory(p, category)).sort(
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
