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
 * About — Section 4. Experimental projects and side builds.
 * A lightly staggered grid of floating glass cards — a creative
 * lab of technical experiments. Cards lift and glow on hover.
 */

type Experiment = {
  icon: AnimatedIconName;
  title: string;
  body: string;
  tags: string[];
};

const experiments: Experiment[] = [
  {
    icon: "motion",
    title: "Live Dashboard Mockups",
    body: "Coded, self-animating product mockups — looping dashboards built in pure CSS and SVG instead of exported video.",
    tags: ["CSS", "SVG", "Motion"],
  },
  {
    icon: "brain",
    title: "Prompt-to-Prototype",
    body: "An AI workflow experiment that turns plain-language prompts into structured, working UI scaffolds.",
    tags: ["Claude API", "Next.js", "Tooling"],
  },
  {
    icon: "structure",
    title: "Token Pipeline",
    body: "A small engine that syncs design tokens straight into production CSS variables — one source of truth.",
    tags: ["Design Tokens", "CSS", "Automation"],
  },
  {
    icon: "network",
    title: "Magnetic Grid",
    body: "An interactive canvas field that warps to pointer, scroll, and device tilt — ambient, GPU-friendly motion.",
    tags: ["Canvas", "RAF", "Interaction"],
  },
  {
    icon: "flow",
    title: "Scroll Choreography",
    body: "Studies in scroll-linked storytelling — pinned scenes, progress-driven reveals, and timeline easing.",
    tags: ["Scroll", "Timeline", "Easing"],
  },
  {
    icon: "vector",
    title: "Cursor & Micro-States",
    body: "A playground of custom cursors, hover physics, and the small feedback moments that make an interface feel alive.",
    tags: ["Micro-UX", "States", "Feedback"],
  },
];

export function Experiments() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          title="Experiments & side builds"
          intro="A running lab of technical experiments — interaction studies, tooling, and creative explorations that feed back into the production work."
        />

        <StaggerContainer className="mt-14 grid items-start gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {experiments.map((e, i) => (
            <StaggerItem
              key={e.title}
              className={i % 3 === 1 ? "lg:mt-12" : undefined}
            >
              <div
                className="about-float h-full"
                style={{ animationDelay: `${(i % 3) * 0.7}s` }}
              >
                <Card className="gap-5">
                  <div className="about-exp-thumb">
                    <AnimatedIcon name={e.icon} size="md" />
                  </div>
                  <h3 className="text-card-title text-white">{e.title}</h3>
                  <p className="text-supporting text-white/58">{e.body}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {e.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
