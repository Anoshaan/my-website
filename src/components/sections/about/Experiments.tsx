"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { ScrambledText } from "@/components/animations/ScrambledText";

/**
 * About — Section 4. Interests beyond design.
 * Three image-led cards covering personal hardware, networking,
 * and IoT projects. Layout is a clean 3-up row on desktop with
 * equal heights and equal vertical alignment — the cards lock
 * to the same baseline so the section reads as one row.
 */

type Experiment = {
  image: { src: string; alt: string };
  title: string;
  body: string;
  tags: string[];
};

const experiments: Experiment[] = [
  {
    image: {
      src: "/interests/rf-jamming.webp",
      alt: "Radio frequency experimentation hardware on a breadboard",
    },
    title: "Radio Frequency (RF) Jamming",
    body:
      "A personal experimental project exploring radio frequency behavior, interference testing, and signal disruption concepts within controlled environments and learning scenarios.",
    tags: ["RF Systems", "Signal Testing", "Antenna Tech", "Wireless Experiments"],
  },
  {
    image: {
      src: "/interests/deauth.webp",
      alt: "Wi-Fi deauthentication research device with antenna and display",
    },
    title: "Protocol Deauthentication (Deauth)",
    body:
      "A cybersecurity-focused networking experiment exploring Wi-Fi protocol behavior, packet communication, and deauthentication testing for educational and research purposes.",
    tags: ["Network Security", "Packet Analysis", "Wi-Fi Testing", "Ethical Hacking"],
  },
  {
    image: {
      src: "/interests/aeroponic.webp",
      alt: "Smart aeroponic tower system growing lettuce on a rooftop",
    },
    title: "Smart Aeroponic Tower System",
    body:
      "A fully self-built aeroponic growing system powered by sensors, automation logic, and software-driven environmental controls designed for efficient and intelligent plant growth.",
    tags: ["IoT Systems", "Sensor Automation", "Smart Farming", "Hardware + Software"],
  },
];

export function Experiments() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          title="Interests Beyond Design."
          intro="Beyond UI/UX and product systems design, I actively explore cybersecurity, ethical hacking, IoT ecosystems, and hardware experimentation. I enjoy building and testing technology-driven systems — from custom servers and network-based projects to sensor-powered automation and intelligent hardware solutions."
        />

        <StaggerContainer className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {experiments.map((e) => (
            <StaggerItem key={e.title} className="h-full">
              <Card className="interest-card h-full gap-5">
                <div className="interest-thumb">
                  <Image
                    src={e.image.src}
                    alt={e.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-card-title text-white">{e.title}</h3>
                <p className="text-supporting text-white/58">{e.body}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {e.tags.map((t) => (
                    <span key={t} className="tag">
                      <ScrambledText radius={80} duration={800} speed={38}>
                        {t}
                      </ScrambledText>
                    </span>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
