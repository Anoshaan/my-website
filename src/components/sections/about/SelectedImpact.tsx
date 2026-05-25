"use client";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

/**
 * About — Section 7. Selected impact.
 * A compact, calm summary of the body of work — clean,
 * spacious, and intentionally under-crowded. Sits near the
 * bottom of the page as a quiet statement of scale.
 */

type Impact = {
  icon: AnimatedIconName;
  value: string;
  label: string;
};

const impact: Impact[] = [
  {
    icon: "motion",
    value: "8+ Years",
    label: "Across enterprise product, design systems, and motion craft.",
  },
  {
    icon: "structure",
    value: "200+ Projects",
    label: "Shipped across fintech, healthcare, AI, and emerging-tech.",
  },
  {
    icon: "scale",
    value: "Enterprise Systems",
    label: "Large-surface product platforms used by real operational teams.",
  },
  {
    icon: "vector",
    value: "Motion Frameworks",
    label: "Interaction and motion systems that hold up across products.",
  },
  {
    icon: "brain",
    value: "AI-Assisted Workflows",
    label: "Integrating AI into how design and production actually ship.",
  },
  {
    icon: "collaborate",
    value: "Cross-Functional",
    label: "Working directly with product, engineering, and leadership.",
  },
];

export function SelectedImpact() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          title="Selected impact."
          intro="A quieter view of the work — the scale, the shape, and the kind of problems it tends to live inside."
        />

        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {impact.map((item) => (
            <StaggerItem key={item.value}>
              <Card className="gap-5">
                <AnimatedIcon name={item.icon} size="md" />
                <div className="flex flex-col gap-2">
                  <h3 className="stat-text">{item.value}</h3>
                  <p className="stat-label">{item.label}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
