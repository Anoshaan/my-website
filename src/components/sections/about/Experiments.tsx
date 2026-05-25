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
import { ScrambledText } from "@/components/animations/ScrambledText";

/**
 * About — Section 4. Experimental systems.
 * Three mature, technology-focused cards positioning the work
 * I do *beyond* product design — signal experimentation, IoT
 * hardware integration, and cybersecurity / emerging-tech work.
 */

type Experiment = {
  icon: AnimatedIconName;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
};

const experiments: Experiment[] = [
  {
    icon: "radar",
    eyebrow: "Wireless & RF",
    title: "Signal Experimentation Systems",
    body:
      "Localized exploration of wireless behavior — antenna design, propagation testing, and small communication-system builds. Hardware-level curiosity about how signal actually moves through space.",
    tags: ["RF", "Antennas", "Propagation"],
  },
  {
    icon: "network",
    eyebrow: "IoT & Automation",
    title: "IoT Aeroponic System",
    body:
      "A custom aeroponic tower with full IoT instrumentation — humidity, water level, and nutrient sensors feeding a dashboard I built to monitor and automate the grow cycle end-to-end. Hardware, firmware, software, all integrated.",
    tags: ["Sensors", "Dashboard", "Automation", "Hardware"],
  },
  {
    icon: "structure",
    eyebrow: "Cybersecurity & Emerging Tech",
    title: "Security & Systems Research",
    body:
      "Ongoing work in cybersecurity, automation pipelines, and AI-assisted tooling — exploring how software, hardware, and emerging models converge. The questions that pull me forward are usually a generation ahead of the brief.",
    tags: ["Security", "AI Workflows", "Tooling", "Research"],
  },
];

export function Experiments() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          title="Built beyond design."
          intro="A lab of technical work that sits outside traditional product design — wireless systems, IoT, hardware integrations, and emerging-tech research. Curiosity is the through-line."
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
                  <span className="text-eyebrow text-white/45">
                    {e.eyebrow}
                  </span>
                  <h3 className="text-card-title text-white">{e.title}</h3>
                  <p className="text-supporting text-white/58">{e.body}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {e.tags.map((t) => (
                      <span key={t} className="tag">
                        <ScrambledText radius={80} duration={800} speed={38}>
                          {t}
                        </ScrambledText>
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
