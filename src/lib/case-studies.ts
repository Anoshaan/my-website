export type CaseStudy = {
  slug: string;
  title: string;
  /** One-line domain tags shown as eyebrows on the card. */
  tags: string[];
  /** Full domain string for Labs page detail. */
  domain: string;
  /** Short context paragraph for the landing card. */
  summary: string;
  /** Featured project highlights (bullet-friendly). */
  highlights: string[];
  focusAreas: string[];
  /** Recommended featured-on-landing flag. */
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "workforce-time-resource-platform",
    title: "Workforce Time & Resource Management Platform",
    tags: ["Enterprise SaaS", "Workforce Management"],
    domain:
      "Enterprise SaaS · Workforce Management · Resource Planning · Internal Operations",
    summary:
      "An enterprise workforce platform that streamlines time tracking, billable resource monitoring, and project allocation workflows.",
    highlights: [
      "Billable tracking",
      "Multi-role management",
      "Automated project allocation",
      "Team monitoring",
      "Reporting workflows",
    ],
    focusAreas: [
      "Dashboard UX",
      "Workflow Automation",
      "Enterprise Systems",
      "Operational Visibility",
    ],
    featured: true,
  },
  {
    slug: "predictive-analytics-intelligence",
    title: "Predictive Analytics Intelligence Platform",
    tags: ["Analytics", "SaaS"],
    domain:
      "Analytics · SaaS · Enterprise Dashboard · Data Visualization",
    summary:
      "A centralized analytics platform that turns fragmented tracking data into refined business intelligence through real-time dashboards.",
    highlights: [
      "Analytics integration",
      "KPI dashboards",
      "Custom calculations",
      "Reporting workflows",
      "Responsive platform",
    ],
    focusAreas: [
      "Dashboard UX",
      "Data Visualization",
      "Product Workflows",
      "System Scalability",
    ],
    featured: true,
  },
  {
    slug: "enterprise-software-website",
    title: "Enterprise Software Company Website & Lead Experience",
    tags: ["Corporate Website", "CMS"],
    domain: "Corporate Website · SaaS · CMS Platform · Lead Generation",
    summary:
      "A fully custom corporate website for a software company, focused on services, case studies, and lead generation.",
    highlights: [
      "Custom CMS",
      "Conversion-focused UX",
      "Lead routing",
      "Responsive experience",
      "Scalable content structure",
    ],
    focusAreas: [
      "Web Design",
      "CMS Architecture",
      "Conversion UX",
      "Responsive Experience",
    ],
    featured: true,
  },
  {
    slug: "smart-food-court-ordering",
    title: "Smart Food Court Ordering Platform",
    tags: ["Food Tech", "Mobile Commerce"],
    domain:
      "Food Tech · Mobile Commerce · Ordering Platform · Retail Experience",
    summary:
      "A location-aware food ordering platform that simplifies food court experiences through real-time menu discovery and mobile ordering.",
    highlights: [
      "Location-aware discovery",
      "Multi-vendor ordering",
      "Real-time menus",
      "Mobile payments",
      "Vendor system",
    ],
    focusAreas: [
      "Mobile UX",
      "Ordering Flows",
      "Multi-Vendor Systems",
      "Convenience Design",
    ],
    featured: true,
  },
  {
    slug: "cannabis-commerce-wellness",
    title: "Cannabis Commerce & Wellness Platform",
    tags: ["E-Commerce", "Wellness"],
    domain: "E-Commerce · Cannabis · Wellness · Mobile Commerce",
    summary:
      "A modern cannabis commerce platform built for regulated purchasing and seamless mobile-first shopping experiences.",
    highlights: [
      "Compliance purchasing",
      "Product discovery",
      "Medical information",
      "Mobile shopping",
      "Customer reviews",
    ],
    focusAreas: [
      "E-Commerce UX",
      "Mobile Experience",
      "Compliance Workflows",
      "Checkout Flows",
    ],
    featured: true,
  },
  {
    slug: "defence-operations-documentation",
    title: "Defence Operations Documentation Platform",
    tags: ["Defence Tech", "Enterprise Systems"],
    domain:
      "Defence Tech · Enterprise Systems · Secure Documentation · Mobile & Web",
    summary:
      "A secure enterprise platform that streamlines operational aviation documentation across web and mobile environments.",
    highlights: [
      "Secure access",
      "Cross-platform experience",
      "Structured systems",
      "Operational workflows",
      "Enterprise architecture",
    ],
    focusAreas: [
      "Enterprise UX",
      "Secure Systems",
      "Information Architecture",
      "Operational Workflows",
    ],
    featured: true,
  },
  {
    slug: "pet-centric-social",
    title: "Pet-Centric Social Media Platform",
    tags: ["Social Media", "Mobile"],
    domain: "Social Media · Community Platform · Mobile App · Entertainment",
    summary:
      "A mobile-first social networking platform designed for animal lovers to discover and engage with pet-focused content.",
    highlights: [
      "Short-form content",
      "Community engagement",
      "Pet profiles",
      "Content discovery",
      "Social features",
    ],
    focusAreas: [
      "Mobile UX",
      "Community Experience",
      "Content Discovery",
      "Engagement Systems",
    ],
  },
  {
    slug: "equestrian-fitness-wellness",
    title: "Equestrian Fitness & Wellness Platform",
    tags: ["Health & Fitness", "Mobile"],
    domain:
      "Health & Fitness · Wellness · Mobile App · Subscription Platform",
    summary:
      "A mobile wellness platform for equestrian athletes that combines guided workouts and recovery experiences.",
    highlights: [
      "Workout programs",
      "Community engagement",
      "Progress tracking",
      "Subscription access",
      "Lifestyle content",
    ],
    focusAreas: [
      "Mobile UX",
      "Wellness Experience",
      "Subscription Flows",
      "Fitness Workflows",
    ],
  },
  {
    slug: "workplace-safety-retail",
    title: "Workplace Safety & Retail Engagement Platform",
    tags: ["Retail Tech", "Enterprise Mobility"],
    domain:
      "Retail Tech · Workplace Safety · Enterprise Mobility · Utility Platform",
    summary:
      "A mobile-first workplace safety platform that improves customer engagement and product accessibility.",
    highlights: [
      "Retail engagement",
      "Product accessibility",
      "Store locator",
      "Push notifications",
      "Enterprise mobility",
    ],
    focusAreas: [
      "Mobile UX",
      "Retail Experience",
      "Information Architecture",
      "Customer Engagement",
    ],
  },
  {
    slug: "p2p-lending-fintech",
    title: "Peer-to-Peer Lending & Financial Services Platform",
    tags: ["FinTech", "Mobile & Web"],
    domain:
      "FinTech · Digital Lending · Financial Services · Mobile & Web",
    summary:
      "A fintech platform that simplifies peer-to-peer lending and secure digital transaction experiences.",
    highlights: [
      "Digital lending",
      "Secure transactions",
      "User onboarding",
      "Loan management",
      "Financial dashboards",
    ],
    focusAreas: [
      "FinTech UX",
      "Transaction Flows",
      "Dashboard Experience",
      "Financial Accessibility",
    ],
  },
  {
    slug: "educational-learning-revision",
    title: "Educational Learning & Revision Platform",
    tags: ["Education", "Mobile"],
    domain:
      "Education · E-Learning · Mobile App · Student Productivity",
    summary:
      "A mobile learning platform that supports students through structured educational and revision experiences.",
    highlights: [
      "Interactive learning",
      "Revision tools",
      "Flashcards",
      "Exam preparation",
      "Content accessibility",
    ],
    focusAreas: [
      "Mobile UX",
      "Educational Systems",
      "Learning Experience",
      "Student Engagement",
    ],
  },
  {
    slug: "mental-wellness-tracking",
    title: "Mental Wellness & Lifestyle Tracking Platform",
    tags: ["Wellness Tech", "Mobile"],
    domain:
      "Wellness Tech · Mental Health · Lifestyle Tracking · Mobile App",
    summary:
      "A mobile wellness platform that supports emotional wellbeing through mood tracking and lifestyle insights.",
    highlights: [
      "Mood tracking",
      "Lifestyle visualization",
      "Wellness journaling",
      "Behavioral insights",
      "Wellbeing tools",
    ],
    focusAreas: [
      "Mobile UX",
      "Wellness Experience",
      "Behavioral Tracking",
      "Personal Insights",
    ],
  },
  {
    slug: "mindfulness-personal-growth",
    title: "Mindfulness & Personal Growth Platform",
    tags: ["Wellness Tech", "Mobile"],
    domain:
      "Wellness Tech · Mindfulness · Mobile App · Personal Growth",
    summary:
      "A wellness-focused mobile platform that supports mindfulness and emotional wellbeing through guided experiences.",
    highlights: [
      "Mindfulness flows",
      "Habit building",
      "Progress tracking",
      "Interactive assessments",
      "Wellness UX",
    ],
    focusAreas: [
      "Mobile UX",
      "Behavioral Design",
      "Emotional Tracking",
      "Personal Growth",
    ],
  },
  {
    slug: "brand-advocacy-referral",
    title: "Brand Advocacy & Referral Engagement Platform",
    tags: ["Marketing Tech", "Community"],
    domain:
      "Marketing Tech · Community Engagement · Referral Platform · Campaigns",
    summary:
      "A community-driven referral platform that connects brands with ambassadors through campaigns and rewards systems.",
    highlights: [
      "Referral systems",
      "Campaign management",
      "Community participation",
      "Rewards",
      "Interactive onboarding",
    ],
    focusAreas: [
      "Community UX",
      "Engagement Systems",
      "Campaign Workflows",
      "User Retention",
    ],
  },
  {
    slug: "digital-publishing-content",
    title: "Digital Publishing & Content Experience Platform",
    tags: ["Media Tech", "Web Platform"],
    domain:
      "Media Tech · Digital Publishing · Content Management · Web Platform",
    summary:
      "A modern content-driven platform that streamlines editorial publishing and digital content accessibility.",
    highlights: [
      "Editorial publishing",
      "Media management",
      "Information architecture",
      "Content discovery",
      "Responsive ecosystem",
    ],
    focusAreas: [
      "Content UX",
      "Editorial Workflows",
      "Digital Publishing",
      "Platform Scalability",
    ],
  },
  {
    slug: "endless-runner-game",
    title: "Endless Runner Mobile Game Experience",
    tags: ["Gaming", "Mobile"],
    domain:
      "Gaming · Mobile App · Entertainment · Gamification",
    summary:
      "A fast-paced mobile gaming experience inspired by endless runner mechanics and reward-based progression systems.",
    highlights: [
      "Endless gameplay",
      "Character progression",
      "Reward systems",
      "Interactive obstacles",
      "Gamified engagement",
    ],
    focusAreas: [
      "Game UX",
      "Gamification",
      "Player Engagement",
      "Mobile Interaction",
    ],
  },
];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
