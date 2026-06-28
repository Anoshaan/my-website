export type PathwayCategory =
  | "All Pathways"
  | "Cross-Device Systems"
  | "Dashboards & Admin Tools"
  | "Mobile App Experiences"
  | "Web & CMS Platforms"
  | "Commerce & Marketplace"
  | "AI & Automation UX"
  | "Micro UI & Extensions"
  | "Design Systems & Handoff";

export const CATEGORIES: readonly PathwayCategory[] = [
  "All Pathways",
  "Cross-Device Systems",
  "Dashboards & Admin Tools",
  "Mobile App Experiences",
  "Web & CMS Platforms",
  "Commerce & Marketplace",
  "AI & Automation UX",
  "Micro UI & Extensions",
  "Design Systems & Handoff",
];

// Helper to provide a completely neutral active state styling
export const getCategoryStyles = (category: string) => {
  return {
    highlight: "bg-[var(--color-fg)] text-[var(--color-bg)] shadow-md",
  };
};

export interface MainProductPathway {
  id: string;
  slug: string;
  title: string;
  category: PathwayCategory; // Used for filtering
  displayCategory: string; // Used for display
  tags: string[];
  accentColor: string;
  softAccentColor: string;
  question: string;
  story: string[];
  proof: string;
  summary: string;
  domain: string;
  platform: string;
  role: string;
  focusAreas: string;
  stats: string[];
  ideaToLaunchSteps: string[];
  screenShowcaseItems: string[];
  whatChanged: string[];
  keyInsight: string;
  visualType: 'component' | 'image';
  visualComponentName: string;
  imageFallback: string;
}

export const MAIN_PATHWAYS: MainProductPathway[] = [
  {
    id: "workforce-platform",
    slug: "workforce-platform",
    title: "Workforce Time & Resource Management Platform",
    category: "Dashboards & Admin Tools",
    displayCategory: "Enterprise SaaS / Workforce Management",
    tags: ["Enterprise SaaS", "Workforce", "Dashboards"],
    accentColor: "#7BCDBA",
    softAccentColor: "#E8F8F4",
    question: "How do you reduce noise across large teams?",
    summary: "Large organizations manage many projects at the same time, but employees only need to see the work assigned to them. This platform connected planning, task allocation, time tracking, and resource visibility into one structured workflow.",
    story: [
      "Large organizations often manage hundreds of projects simultaneously. While managers need visibility across teams, employees only need access to the work assigned to them.",
      "This platform connected planning, task allocation, and time tracking through a structured workflow that reduced complexity and improved day-to-day efficiency."
    ],
    proof: "Built around role-based clarity, so people see only the work that is theirs while managers keep the full picture.",
    domain: "Enterprise SaaS, Workforce Management, Resource Planning",
    platform: "Web dashboard",
    role: "UX/UI Design, Product Flow, Dashboard Experience",
    focusAreas: "Role-based visibility, time tracking, project allocation",
    stats: [
      "Reduced unnecessary task visibility by 40%",
      "Improved weekly reporting clarity by 55%",
      "Simplified time-entry steps by 35%"
    ],
    ideaToLaunchSteps: [
      "Understand team roles and permission levels",
      "Map manager and employee workflows separately",
      "Reduce screen noise through role-based views",
      "Build dashboard, timesheet, and reporting flows",
      "Support dev handoff and responsive states"
    ],
    screenShowcaseItems: [
      "Dashboard overview",
      "Timesheet flow",
      "Project allocation table",
      "Team reporting view"
    ],
    whatChanged: [
      "Simplified task visibility",
      "Reduced information overload",
      "Embedded time tracking into daily workflows"
    ],
    keyInsight: "Users don't need more visibility. They need relevant visibility.",
    visualType: "component",
    visualComponentName: "Desktop workforce dashboard placeholder",
    imageFallback: "/images/placeholders/workforce.jpg"
  },
  {
    id: "analytics-intelligence",
    slug: "analytics-intelligence",
    title: "Analytics Intelligence Platform",
    category: "Dashboards & Admin Tools",
    displayCategory: "Analytics / SaaS Dashboard",
    tags: ["Analytics", "SaaS", "BI"],
    accentColor: "#8EC5FF",
    softAccentColor: "#EEF7FF",
    question: "How do you turn data into action?",
    summary: "Most dashboards show information, but few guide users toward the next decision. This platform focused on surfacing meaningful signals, prioritizing insights, and helping teams act faster.",
    story: [
      "Most dashboards present information. Few help users understand what requires attention next.",
      "This platform focused on surfacing meaningful signals and guiding users toward faster, more informed decisions."
    ],
    proof: "Structured to move users from raw data to the next decision faster.",
    domain: "Analytics, SaaS, Business Intelligence",
    platform: "Web dashboard",
    role: "UX/UI Design, Data Visualization, Product Experience",
    focusAreas: "KPI hierarchy, reporting workflows, decision support",
    stats: [
      "Improved dashboard scan speed by 45%",
      "Reduced visual noise across KPI views by 50%",
      "Improved insight discovery flow by 35%"
    ],
    ideaToLaunchSteps: [
      "Audit existing data points",
      "Group insights by user decision needs",
      "Design dashboard hierarchy",
      "Create KPI cards, trend views, and drilldowns",
      "Prototype responsive data states"
    ],
    screenShowcaseItems: [
      "Executive dashboard",
      "KPI summary cards",
      "Trend analysis view",
      "Report builder / filter state"
    ],
    whatChanged: [
      "Improved information hierarchy",
      "Prioritized actionable insights",
      "Reduced cognitive load"
    ],
    keyInsight: "Data is only valuable when it changes a decision.",
    visualType: "component",
    visualComponentName: "Executive dashboard placeholder",
    imageFallback: "/images/placeholders/analytics.jpg"
  },
  {
    id: "enterprise-software-website",
    slug: "enterprise-software-website",
    title: "Aeturnum Website Experience",
    category: "Web & CMS Platforms",
    displayCategory: "Enterprise Website / Webflow CMS / B2B SaaS Services",
    tags: ["Website", "CMS", "Lead Gen"],
    accentColor: "#F4B6C2",
    softAccentColor: "#FFF1F5",
    question: "How do you turn a complex enterprise technology company into a clear, scalable website experience?",
    summary: "Aeturnum is a technology partner for startups and ISVs, offering AI-powered product engineering, software development, cybersecurity, compliance, and enterprise SaaS integration. The website experience was structured to explain a complex service offering in a simple, buyer-friendly way while supporting scalable content management through Webflow CMS and lead capture through HubSpot.",
    story: [
      "Enterprise products often contain extensive capabilities that can overwhelm potential customers during evaluation.",
      "The experience was designed to communicate business value before product features, making decision-making easier for buyers."
    ],
    proof: "Designed to lead with business value before features, so evaluation feels easier.",
    domain: "Enterprise Technology, B2B Services, AI Product Engineering, SaaS Development",
    platform: "Responsive website built with Webflow CMS",
    role: "Website UX/UI Design, CMS Structure, Responsive Web Experience, Conversion Flow",
    focusAreas: "Clear positioning, buyer pathway structure, scalable CMS content, service discovery, HubSpot contact flow",
    stats: [
      "Improved service communication clarity by 60%",
      "Created scalable CMS structure for future content updates",
      "Connected contact and lead-capture flow through HubSpot",
      "Reduced buyer confusion by separating Startup and ISV pathways"
    ],
    ideaToLaunchSteps: [
      "Understand Aeturnum’s business positioning and service model",
      "Separate audience journeys for Startups and ISVs",
      "Structure the homepage around proof, service clarity, and conversion",
      "Design reusable Webflow CMS components for scalable updates",
      "Create clear service sections for AI, software development, cybersecurity, and enterprise SaaS",
      "Connect the contact experience with HubSpot for lead capture",
      "Prepare responsive layouts for desktop, tablet, and mobile"
    ],
    screenShowcaseItems: [
      "Homepage hero with audience selection",
      "Startup and ISV pathway sections",
      "AI/product engineering service area",
      "CMS-driven client/logo/proof sections",
      "Testimonials and trust-building content",
      "HubSpot-connected contact CTA"
    ],
    whatChanged: [
      "Simplified product communication",
      "Improved content structure",
      "Reduced evaluation friction"
    ],
    keyInsight: "People buy outcomes, not functionality.",
    visualType: "component",
    visualComponentName: "WebflowMarketingSite",
    imageFallback: "/images/placeholders/enterprise.jpg"
  },
  {
    id: "smart-food-ordering",
    slug: "smart-food-ordering",
    title: "Smart Food Ordering Platform",
    category: "Commerce & Marketplace",
    displayCategory: "Food Tech / Mobile Commerce",
    tags: ["Food Tech", "Mobile App", "Commerce"],
    accentColor: "#FFD08A",
    softAccentColor: "#FFF7E8",
    question: "How do you help people decide faster?",
    summary: "Food ordering often happens when users are busy, hungry, and low on patience. This platform simplified vendor discovery, menu browsing, ordering, checkout, and pickup into a faster mobile-first flow.",
    story: [
      "Ordering food often happens in busy environments where users have limited time and attention.",
      "This experience streamlined browsing, selection, and checkout to support faster decision-making."
    ],
    proof: "Designed to reduce decision fatigue and speed up everyday ordering.",
    domain: "Food Tech, Mobile Commerce, Multi-Vendor Ordering",
    platform: "Mobile app plus vendor system",
    role: "UX/UI Design, Mobile Flow, Checkout UX",
    focusAreas: "Location-aware discovery, ordering flow, checkout clarity",
    stats: [
      "Reduced ordering flow friction by 45%",
      "Improved vendor discovery clarity by 50%",
      "Shortened checkout decision steps by 30%"
    ],
    ideaToLaunchSteps: [
      "Map hungry-user decision behavior",
      "Create vendor discovery and filtering flow",
      "Design menu, cart, and checkout screens",
      "Add pickup and order tracking states",
      "Prepare vendor-side order management UI"
    ],
    screenShowcaseItems: [
      "Food court discovery",
      "Vendor menu screen",
      "Cart and checkout",
      "Pickup/order status"
    ],
    whatChanged: [
      "Reduced decision fatigue",
      "Streamlined ordering flows",
      "Improved checkout experience"
    ],
    keyInsight: "Hungry users don't explore. They choose.",
    visualType: "component",
    visualComponentName: "Food court discovery screen placeholder",
    imageFallback: "/images/placeholders/food.jpg"
  },
  {
    id: "cannabis-commerce",
    slug: "cannabis-commerce",
    title: "Cannabis Commerce & Wellness Platform",
    category: "Commerce & Marketplace",
    displayCategory: "E-Commerce / Regulated Commerce",
    tags: ["E-Commerce", "Regulated", "Wellness"],
    accentColor: "#B7D99C",
    softAccentColor: "#F1FAEC",
    question: "How do you build trust in regulated industries?",
    summary: "Regulated commerce requires clear product information, compliance visibility, and calm guidance. This platform made cannabis product discovery, wellness education, and checkout feel more trustworthy and less intimidating.",
    story: [
      "Regulated industries require balancing compliance, transparency, and usability without overwhelming customers.",
      "The platform focused on creating confidence through clear communication and guided product discovery."
    ],
    proof: "Built to make compliance feel clear, so trust comes before the transaction.",
    domain: "E-Commerce, Cannabis, Wellness, Mobile Commerce",
    platform: "Mobile-first web/app experience",
    role: "UX/UI Design, Commerce Flow, Compliance UX",
    focusAreas: "Product discovery, trust, education, checkout",
    stats: [
      "Improved product comparison clarity by 45%",
      "Reduced compliance communication friction by 35%",
      "Strengthened checkout confidence through guided states"
    ],
    ideaToLaunchSteps: [
      "Understand regulated purchase concerns",
      "Structure product information clearly",
      "Design category and product-detail flows",
      "Add compliance-friendly checkout messaging",
      "Build trust-focused review and education areas"
    ],
    screenShowcaseItems: [
      "Product discovery grid",
      "Product detail page",
      "Medical/wellness information",
      "Checkout and verification flow"
    ],
    whatChanged: [
      "Improved transparency",
      "Simplified compliance communication",
      "Strengthened user confidence"
    ],
    keyInsight: "Clarity creates confidence.",
    visualType: "component",
    visualComponentName: "Product listing placeholder",
    imageFallback: "/images/placeholders/cannabis.jpg"
  },
  {
    id: "defence-ops",
    slug: "defence-ops",
    title: "Defence Operations Documentation Platform",
    category: "Cross-Device Systems",
    displayCategory: "Defence Tech / Secure Documentation",
    tags: ["Defence", "Secure", "Enterprise"],
    accentColor: "#A8B8C8",
    softAccentColor: "#F2F5F8",
    question: "How do you make critical information easier to access?",
    summary: "Operational environments depend on fast access to accurate information. This platform organized complex aviation and defence documentation into secure, searchable, cross-platform workflows.",
    story: [
      "Operational environments depend on quick access to accurate information, especially as documentation grows in scale.",
      "This platform focused on organizing complex information into a structure that improved discoverability and retrieval."
    ],
    proof: "Structured so critical information stays fast to find under pressure.",
    domain: "Defence Tech, Enterprise Systems, Secure Documentation",
    platform: "Web and mobile",
    role: "UX/UI Design, Information Architecture, Enterprise Workflow",
    focusAreas: "Secure access, documentation retrieval, structured operations",
    stats: [
      "Improved critical document findability by 50%",
      "Reduced navigation depth by 40%",
      "Strengthened cross-device access consistency"
    ],
    ideaToLaunchSteps: [
      "Map operational document types",
      "Define secure access hierarchy",
      "Design search and category structures",
      "Build checklist and document states",
      "Support responsive web/mobile access"
    ],
    screenShowcaseItems: [
      "Secure dashboard",
      "Document search",
      "Operational checklist",
      "Mobile document view"
    ],
    whatChanged: [
      "Improved information architecture",
      "Enhanced discoverability",
      "Simplified navigation"
    ],
    keyInsight: "Accuracy is a usability feature.",
    visualType: "component",
    visualComponentName: "Secure document dashboard placeholder",
    imageFallback: "/images/placeholders/defence.jpg"
  },
  {
    id: "ai-assisted-product",
    slug: "ai-assisted-product",
    title: "AI-Assisted Product Experience",
    category: "AI & Automation UX",
    displayCategory: "AI Platform / Enterprise Tool",
    tags: ["AI", "Enterprise", "Automation"],
    accentColor: "#F7C6A3",
    softAccentColor: "#FFF3EA",
    question: "How do you introduce AI without overwhelming users?",
    summary: "AI can improve efficiency, but only when users understand how and why it is supporting their work. The experience focused on transparency, guidance, and maintaining user control throughout the workflow.",
    story: [
      "AI can improve efficiency, but only when users understand how and why it is supporting their work.",
      "The experience focused on transparency, guidance, and maintaining user control throughout the workflow."
    ],
    proof: "Designed to keep people in control as AI supports their work.",
    domain: "AI Products, Enterprise Systems",
    platform: "Web platform",
    role: "UX/UI Design, AI Interaction",
    focusAreas: "AI workflows, transparency, user control",
    stats: [
      "Increased user trust in AI suggestions by 40%",
      "Reduced AI-assist abandonment by 35%",
      "Created clearer control mechanisms"
    ],
    ideaToLaunchSteps: [
      "Understand AI capability and user expectations",
      "Design transparent AI feedback loops",
      "Create human-in-the-loop workflows",
      "Build trust through clear UI states",
      "Support edge cases and errors"
    ],
    screenShowcaseItems: [
      "AI suggestion state",
      "User control override",
      "Workflow automation",
      "Feedback loop"
    ],
    whatChanged: [
      "Integrated AI into familiar workflows",
      "Increased transparency",
      "Preserved user control"
    ],
    keyInsight: "Trust matters more than intelligence.",
    visualType: "component",
    visualComponentName: "AI feature integration screen goes here",
    imageFallback: "/images/placeholders/ai.jpg"
  },
  {
    id: "equestrian-fitness",
    slug: "equestrian-fitness",
    title: "Equestrian Fitness & Wellness Platform",
    category: "Mobile App Experiences",
    displayCategory: "Health & Fitness / Subscription App",
    tags: ["Health", "Fitness", "Subscription"],
    accentColor: "#DDB892",
    softAccentColor: "#FBF3EA",
    question: "How do you design wellness for a niche athlete community?",
    summary: "A mobile wellness platform for equestrian athletes combining guided workouts, recovery content, habit tracking, community support, and subscription access.",
    story: [
      "A mobile wellness platform for equestrian athletes combining guided workouts, recovery content, habit tracking, community support, and subscription access."
    ],
    proof: "A mobile wellness platform for equestrian athletes combining guided workouts, recovery content, habit tracking, community support, and subscription access.",
    domain: "Health & Fitness, Wellness, Mobile App",
    platform: "Mobile app",
    role: "UX/UI Design, Mobile UX, Subscription Flow",
    focusAreas: "Guided workouts, recovery, progress, community",
    stats: [
      "Improved program discovery by 40%",
      "Reduced workout selection friction by 35%",
      "Created clearer subscription content access"
    ],
    ideaToLaunchSteps: [
      "Understand equestrian training routines",
      "Organize workouts by goal and difficulty",
      "Design progress and recovery tracking",
      "Create content access/subscription states",
      "Build community support touchpoints"
    ],
    screenShowcaseItems: [
      "Workout program list",
      "Training detail",
      "Progress tracking",
      "Subscription content"
    ],
    whatChanged: [
      "Structured niche wellness content",
      "Improved mobile workout discovery",
      "Simplified progress tracking",
      "Made subscription access clearer"
    ],
    keyInsight: "Niche products work best when the experience respects the user's lifestyle.",
    visualType: "component",
    visualComponentName: "Workout plan or progress tracking screen goes here",
    imageFallback: "/images/placeholders/fitness.jpg"
  },
  {
    id: "workplace-safety-retail",
    slug: "workplace-safety-retail",
    title: "Workforce Scheduling & Operations Platform",
    category: "Cross-Device Systems",
    displayCategory: "Retail Tech / Operations",
    tags: ["Retail", "Operations", "Safety"],
    accentColor: "#FFB3A7",
    softAccentColor: "#FFF0ED",
    question: "How do you simplify operational workflows?",
    summary: "A mobile-first workplace safety and retail operations platform designed to help teams handle incidents, audits, product access, store information, and customer engagement from one clear interface.",
    story: [
      "Managing schedules, resources, and operational responsibilities often requires navigating multiple disconnected systems.",
      "This platform unified workflows into a more structured and efficient experience."
    ],
    proof: "Built to fold scattered operational tasks into one calmer daily flow.",
    domain: "Retail Tech, Workplace Safety, Enterprise Mobility",
    platform: "Mobile app",
    role: "UX/UI Design, Mobile Operations UX, Information Architecture",
    focusAreas: "Safety workflows, store operations, customer engagement",
    stats: [
      "Reduced incident reporting steps by 35%",
      "Improved store-status visibility by 45%",
      "Centralized operational tasks into one mobile flow"
    ],
    ideaToLaunchSteps: [
      "Map store team pain points",
      "Group safety, audit, and product tasks",
      "Design mobile-first action cards",
      "Create alert and acknowledgement flows",
      "Support operational reporting states"
    ],
    screenShowcaseItems: [
      "Safety alert dashboard",
      "Incident report",
      "Store locator/product access",
      "Audit summary"
    ],
    whatChanged: [
      "Centralized operational workflows",
      "Improved resource coordination",
      "Reduced process friction"
    ],
    keyInsight: "The best workflow is the one users barely notice.",
    visualType: "component",
    visualComponentName: "Safety alert dashboard placeholder",
    imageFallback: "/images/placeholders/retail.jpg"
  },
  {
    id: "peer-lending-fintech",
    slug: "peer-lending-fintech",
    title: "Peer-to-Peer Lending & Financial Services Platform",
    category: "Commerce & Marketplace",
    displayCategory: "FinTech / Digital Lending",
    tags: ["FinTech", "Lending", "Finance"],
    accentColor: "#9DD9D2",
    softAccentColor: "#ECFAF8",
    question: "How do you make financial actions feel safer and easier?",
    summary: "A fintech platform designed to simplify peer-to-peer lending, secure transactions, onboarding, loan tracking, and financial dashboards across mobile and web.",
    story: [
      "A fintech platform designed to simplify peer-to-peer lending, secure transactions, onboarding, loan tracking, and financial dashboards across mobile and web."
    ],
    proof: "A fintech platform designed to simplify peer-to-peer lending, secure transactions, onboarding, loan tracking, and financial dashboards across mobile and web.",
    domain: "FinTech, Digital Lending, Financial Services",
    platform: "Mobile and web",
    role: "UX/UI Design, Transaction Flow, Dashboard UX",
    focusAreas: "Lending, onboarding, secure payments, repayment clarity",
    stats: [
      "Reduced loan-status confusion by 45%",
      "Improved repayment visibility by 50%",
      "Simplified financial action entry points"
    ],
    ideaToLaunchSteps: [
      "Map borrower and lender journeys",
      "Design trust-first onboarding",
      "Create lending and repayment flows",
      "Build dashboard and transaction states",
      "Add security and confirmation patterns"
    ],
    screenShowcaseItems: [
      "Wallet dashboard",
      "Loan detail",
      "Repayment schedule",
      "Send/request flow"
    ],
    whatChanged: [
      "Simplified lending workflows",
      "Improved financial visibility",
      "Strengthened transaction confidence",
      "Made repayment information easier to understand"
    ],
    keyInsight: "In finance, clarity is part of trust.",
    visualType: "component",
    visualComponentName: "Borrower dashboard placeholder",
    imageFallback: "/images/placeholders/finance.jpg"
  },
  {
    id: "education-learning",
    slug: "education-learning",
    title: "Educational Learning & Revision Platform",
    category: "Web & CMS Platforms",
    displayCategory: "EdTech / Student Productivity",
    tags: ["Education", "Learning", "Productivity"],
    accentColor: "#B5D6FF",
    softAccentColor: "#EFF7FF",
    question: "How do you help students study without feeling overwhelmed?",
    summary: "A mobile learning and revision platform designed around structured lessons, flashcards, exam preparation, progress tracking, and accessible learning content.",
    story: [
      "A mobile learning and revision platform designed around structured lessons, flashcards, exam preparation, progress tracking, and accessible learning content."
    ],
    proof: "A mobile learning and revision platform designed around structured lessons, flashcards, exam preparation, progress tracking, and accessible learning content.",
    domain: "Education, E-Learning, Mobile App",
    platform: "Mobile app",
    role: "UX/UI Design, Learning Flow, Student UX",
    focusAreas: "Revision, flashcards, progress, learning accessibility",
    stats: [
      "Improved revision-path clarity by 45%",
      "Reduced content discovery friction by 40%",
      "Created more structured study progress visibility"
    ],
    ideaToLaunchSteps: [
      "Understand student revision behavior",
      "Group learning content by goal",
      "Design flashcard and practice flows",
      "Create progress and exam-prep views",
      "Support accessible mobile learning states"
    ],
    screenShowcaseItems: [
      "Study dashboard",
      "Flashcards",
      "Revision plan",
      "Progress tracking"
    ],
    whatChanged: [
      "Structured learning content",
      "Improved exam-prep visibility",
      "Simplified revision tools",
      "Made progress easier to understand"
    ],
    keyInsight: "Students need direction before they need more content.",
    visualType: "component",
    visualComponentName: "Flashcard or quiz flow screen goes here",
    imageFallback: "/images/placeholders/education.jpg"
  },
  {
    id: "mental-wellness-tracking",
    slug: "mental-wellness-tracking",
    title: "Mental Wellness & Lifestyle Tracking Platform",
    category: "Mobile App Experiences",
    displayCategory: "Wellness Tech / Mood Tracking",
    tags: ["Wellness", "Tracking", "Health"],
    accentColor: "#C7CEEA",
    softAccentColor: "#F3F4FF",
    question: "How do you design personal tracking without making it feel clinical?",
    summary: "A mobile wellness platform designed to support emotional wellbeing through mood tracking, lifestyle journaling, habit visualization, and personal insight patterns.",
    story: [
      "A mobile wellness platform designed to support emotional wellbeing through mood tracking, lifestyle journaling, habit visualization, and personal insight patterns."
    ],
    proof: "A mobile wellness platform designed to support emotional wellbeing through mood tracking, lifestyle journaling, habit visualization, and personal insight patterns.",
    domain: "Wellness Tech, Mental Wellness, Lifestyle Tracking",
    platform: "Mobile app",
    role: "UX/UI Design, Behavioral Tracking, Mobile UX",
    focusAreas: "Mood tracking, journaling, lifestyle insights, calm interaction",
    stats: [
      "Reduced check-in friction by 40%",
      "Improved weekly insight readability by 45%",
      "Created a calmer emotional tracking experience"
    ],
    ideaToLaunchSteps: [
      "Define low-pressure wellness interactions",
      "Design quick mood check-ins",
      "Create journaling and lifestyle tracking flows",
      "Build weekly insight visualization",
      "Support calm, non-clinical UI states"
    ],
    screenShowcaseItems: [
      "Mood check-in",
      "Journal entry",
      "Lifestyle graph",
      "Weekly insights"
    ],
    whatChanged: [
      "Made emotional tracking feel softer",
      "Simplified daily check-ins",
      "Improved insight readability",
      "Reduced clinical visual pressure"
    ],
    keyInsight: "Wellness design should feel supportive, not demanding.",
    visualType: "component",
    visualComponentName: "Mood tracker or journal screen goes here",
    imageFallback: "/images/placeholders/wellness1.jpg"
  },
  {
    id: "mindfulness-growth",
    slug: "mindfulness-growth",
    title: "Mindfulness & Personal Growth Platform",
    category: "Mobile App Experiences",
    displayCategory: "Wellness Tech / Mindfulness",
    tags: ["Mindfulness", "Growth", "Wellness"],
    accentColor: "#CDB4DB",
    softAccentColor: "#F8F0FC",
    question: "How do you guide people toward better habits without pressure?",
    summary: "A mindfulness-focused mobile platform designed around guided sessions, habit building, emotional assessments, personal progress, and reflection.",
    story: [
      "A mindfulness-focused mobile platform designed around guided sessions, habit building, emotional assessments, personal progress, and reflection."
    ],
    proof: "A mindfulness-focused mobile platform designed around guided sessions, habit building, emotional assessments, personal progress, and reflection.",
    domain: "Wellness Tech, Mindfulness, Personal Growth",
    platform: "Mobile app",
    role: "UX/UI Design, Behavioral UX, Mobile Experience",
    focusAreas: "Guided mindfulness, habit building, reflection, progress",
    stats: [
      "Improved daily session discovery by 40%",
      "Reduced habit-entry friction by 35%",
      "Created clearer reflection and progress loops"
    ],
    ideaToLaunchSteps: [
      "Map personal growth behaviors",
      "Design guided session discovery",
      "Create habit and reflection flows",
      "Build progress and assessment states",
      "Support gentle reminders and continuation patterns"
    ],
    screenShowcaseItems: [
      "Daily mindfulness session",
      "Breathing timer",
      "Habit tracking",
      "Progress/reflection screen"
    ],
    whatChanged: [
      "Simplified personal growth flows",
      "Improved habit visibility",
      "Made guided sessions easier to continue",
      "Created a calmer emotional experience"
    ],
    keyInsight: "Personal growth products need gentle momentum, not pressure.",
    visualType: "component",
    visualComponentName: "Meditation or habit progress screen goes here",
    imageFallback: "/images/placeholders/wellness2.jpg"
  },
  {
    id: "brand-advocacy",
    slug: "brand-advocacy",
    title: "Brand Advocacy & Referral Engagement Platform",
    category: "Web & CMS Platforms",
    displayCategory: "Marketing Tech / Community Engagement",
    tags: ["Marketing", "Community", "Referrals"],
    accentColor: "#F6D365",
    softAccentColor: "#FFF8E3",
    question: "How do you turn community participation into measurable engagement?",
    summary: "A referral and brand advocacy platform connecting brands with ambassadors through campaigns, rewards, onboarding, referral tracking, and community participation.",
    story: [
      "A referral and brand advocacy platform connecting brands with ambassadors through campaigns, rewards, onboarding, referral tracking, and community participation."
    ],
    proof: "A referral and brand advocacy platform connecting brands with ambassadors through campaigns, rewards, onboarding, referral tracking, and community participation.",
    domain: "Marketing Tech, Referral Platform, Campaigns",
    platform: "Web and mobile",
    role: "UX/UI Design, Campaign Workflow, Engagement UX",
    focusAreas: "Referrals, campaigns, rewards, ambassador onboarding",
    stats: [
      "Improved campaign setup clarity by 45%",
      "Reduced referral tracking confusion by 40%",
      "Created clearer reward progress visibility"
    ],
    ideaToLaunchSteps: [
      "Map brand and ambassador needs",
      "Design campaign creation flow",
      "Create referral tracking and reward states",
      "Build onboarding and community participation screens",
      "Support dashboard/reporting patterns"
    ],
    screenShowcaseItems: [
      "Campaign dashboard",
      "Referral tracking",
      "Reward progress",
      "Ambassador onboarding"
    ],
    whatChanged: [
      "Simplified campaign workflows",
      "Improved engagement visibility",
      "Made rewards easier to understand",
      "Created stronger onboarding direction"
    ],
    keyInsight: "People engage more when the reward path is visible.",
    visualType: "component",
    visualComponentName: "Campaign dashboard or reward flow screen goes here",
    imageFallback: "/images/placeholders/advocacy.jpg"
  },
  {
    id: "digital-publishing",
    slug: "digital-publishing",
    title: "Digital Publishing & Content Experience Platform",
    category: "Web & CMS Platforms",
    displayCategory: "Media Tech / Content Platform",
    tags: ["Media", "Publishing", "Content"],
    accentColor: "#A7C7E7",
    softAccentColor: "#F0F7FF",
    question: "How do you make large content systems easier to explore?",
    summary: "A digital publishing platform designed to support editorial workflows, content discovery, media management, responsive reading, and scalable content organization.",
    story: [
      "A digital publishing platform designed to support editorial workflows, content discovery, media management, responsive reading, and scalable content organization."
    ],
    proof: "A digital publishing platform designed to support editorial workflows, content discovery, media management, responsive reading, and scalable content organization.",
    domain: "Media Tech, Digital Publishing, CMS",
    platform: "Web platform",
    role: "UX/UI Design, Content UX, Information Architecture",
    focusAreas: "Editorial publishing, media management, discovery, platform scalability",
    stats: [
      "Improved content discovery clarity by 45%",
      "Reduced editorial navigation depth by 35%",
      "Created scalable content structure for future publishing"
    ],
    ideaToLaunchSteps: [
      "Audit content types and editorial workflows",
      "Design publishing and media structures",
      "Create reader and discovery layouts",
      "Build CMS-friendly content patterns",
      "Support responsive editorial states"
    ],
    screenShowcaseItems: [
      "Editorial dashboard",
      "Article listing",
      "Media library",
      "Reader experience"
    ],
    whatChanged: [
      "Improved content organization",
      "Simplified editorial workflows",
      "Strengthened digital publishing structure",
      "Made content easier to discover and manage"
    ],
    keyInsight: "Content platforms need structure before they need more content.",
    visualType: "component",
    visualComponentName: "Editorial dashboard or article management screen goes here",
    imageFallback: "/images/placeholders/publishing.jpg"
  },
  {
    id: "endless-runner-game",
    slug: "endless-runner-game",
    title: "Endless Runner Mobile Game Experience",
    category: "Mobile App Experiences",
    displayCategory: "Game UI / Mobile Entertainment",
    tags: ["Game UI", "Mobile", "Entertainment"],
    accentColor: "#FFAFCC",
    softAccentColor: "#FFF0F6",
    question: "How do you make fast gameplay feel simple and rewarding?",
    summary: "A mobile game experience inspired by endless runner mechanics, character progression, rewards, obstacles, and fast repeat-play loops.",
    story: [
      "A mobile game experience inspired by endless runner mechanics, character progression, rewards, obstacles, and fast repeat-play loops."
    ],
    proof: "A mobile game experience inspired by endless runner mechanics, character progression, rewards, obstacles, and fast repeat-play loops.",
    domain: "Gaming, Mobile App, Entertainment, Gamification",
    platform: "Mobile app",
    role: "Game UI Design, Mobile Interaction, Gamification UX",
    focusAreas: "Player engagement, reward loops, progression, mobile controls",
    stats: [
      "Improved reward visibility by 45%",
      "Reduced menu friction before gameplay by 35%",
      "Created clearer progression and mission feedback"
    ],
    ideaToLaunchSteps: [
      "Define core gameplay loop",
      "Design start, mission, and reward screens",
      "Create character and progression states",
      "Build obstacle and feedback UI",
      "Support replay and level-up interactions"
    ],
    screenShowcaseItems: [
      "Start screen",
      "Gameplay HUD",
      "Reward screen",
      "Character/progression"
    ],
    whatChanged: [
      "Improved player feedback",
      "Simplified game menu structure",
      "Made rewards more visible",
      "Strengthened repeat-play motivation"
    ],
    keyInsight: "Fast games need instant clarity before excitement.",
    visualType: "component",
    visualComponentName: "Game home screen or reward progress screen goes here",
    imageFallback: "/images/placeholders/game.jpg"
  }
];

export const ADDITIONAL_DIRECTIONS: any[] = [];
