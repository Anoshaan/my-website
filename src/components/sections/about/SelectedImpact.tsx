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
 * About — Section 5. Selected impact and contributions.
 * Horizontal glass cards focused on outcomes, not a résumé.
 */

type Impact = {
  icon: AnimatedIconName;
  title: string;
  body: string;
};

const impact: Impact[] = [
  {
    icon: "structure",
    title: "Enterprise Systems",
    body: "Shipped enterprise platforms used by trading floors and clinical teams — complex, high-stakes interfaces made calm and usable.",
  },
  {
    icon: "collaborate",
    title: "UX Leadership",
    body: "Led product experience design at high-growth startups and ISVs, setting direction and lifting the craft bar across teams.",
  },
  {
    icon: "flow",
    title: "Workflow Optimization",
    body: "Reworked dense operational workflows into clear, low-friction paths — fewer steps, fewer errors, faster decisions.",
  },
  {
    icon: "scale",
    title: "Design Systems",
    body: "Built design systems that scaled across multiple products without losing visual or behavioral coherence.",
  },
  {
    icon: "network",
    title: "Cross-Functional Collaboration",
    body: "Partnered closely with engineering, product, and leadership — turning intent into shared, shippable decisions.",
  },
  {
    icon: "radar",
    title: "Product Strategy",
    body: "Turned ambiguous product goals into clear interaction strategy, measurable outcomes, and a sequenced path to ship.",
  },
];

export function SelectedImpact() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          title="Selected impact"
          intro="The contributions I'm most proud of — where the right structure, the right system, or the right call changed how a product worked."
        />

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16">
          {impact.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="!flex-row items-start gap-5">
                <AnimatedIcon name={item.icon} size="md" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-card-title text-white">{item.title}</h3>
                  <p className="text-supporting text-white/60">{item.body}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
