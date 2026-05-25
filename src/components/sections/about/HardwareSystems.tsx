"use client";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";

/**
 * About — Section 5. Hardware-aware thinking.
 * Bridges the software work with physical systems — IoT,
 * sensors, automation, and end-to-end connected systems.
 * Two-column layout: framing paragraph on the left,
 * a compact grid of capability tiles on the right.
 */

type Capability = {
  icon: AnimatedIconName;
  title: string;
  body: string;
};

const capabilities: Capability[] = [
  {
    icon: "network",
    title: "Connected Devices",
    body:
      "Building and instrumenting IoT systems — sensors, microcontrollers, and the small protocols that link them.",
  },
  {
    icon: "flow",
    title: "Automation Logic",
    body:
      "Sensor-driven automation — feedback loops, state machines, and rules that keep a physical system in balance.",
  },
  {
    icon: "scan",
    title: "Sensors & Telemetry",
    body:
      "Reading the real world cleanly — humidity, motion, signal, temperature — and turning it into a usable stream.",
  },
  {
    icon: "structure",
    title: "End-to-End Systems",
    body:
      "Hardware, firmware, software, interface — designed as one coherent system rather than four separate concerns.",
  },
];

export function HardwareSystems() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-[clamp(48px,6vw,96px)]">
          <SectionTitle
            title="Hardware-aware thinking."
            intro="My work doesn't end at the screen. I think about systems the way a hardware engineer thinks about a circuit — inputs, state, behavior, and the connection between what a user does and what a system actually does in response."
            className="lg:sticky lg:top-28"
          />

          <StaggerContainer className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <StaggerItem
                key={c.title}
                className={i % 2 === 1 ? "sm:mt-10" : undefined}
              >
                <Reveal variant="fade" duration={0.9}>
                  <div className="hw-tile">
                    <AnimatedIcon name={c.icon} size="md" />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-card-title text-white">
                        {c.title}
                      </h3>
                      <p className="text-supporting text-white/58">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
