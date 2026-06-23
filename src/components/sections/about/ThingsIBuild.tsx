"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * About — "Things I Build Beyond Work". Three image-led cards (no keyword
 * tags, no decorative labels) where the pictures carry the story. Drop the
 * original photos into /public/about and set `image` on each card; until then
 * a soft themed placeholder stands in. Simple title under each image.
 */

type BuildCard = {
  title: string;
  desc: string;
  /** Image under /public/about — when omitted a soft placeholder is shown. */
  image?: string;
};

const CARDS: BuildCard[] = [
  {
    title: "Signal Systems",
    desc: "Built a small IoT-based NFT test box to explore connected systems, sensors, and controlled experiments beyond screen-based design.",
    image: "/about/signal-systems.jpg",
  },
  {
    title: "Security Experiments",
    desc: "Built small security-focused experiments to understand wireless behavior, vulnerability checking, and how digital systems can be tested, hardened, and protected more thoughtfully.",
    image: "/about/security-experiments.jpg",
  },
  {
    title: "Hardware Builds",
    desc: "Built an aeroponic system with a custom app to automate farming tests, monitor the setup, and improve how the system runs over time.",
    image: "/about/hardware-builds.jpg",
  },
];

export function ThingsIBuild() {
  return (
    <section className="section-pad ab-section border-t border-white/[0.06]">
      <Container>
        <Reveal>
          <h2 className="text-section text-white heading-sheen ab-h2-mt">
            Things I Build Beyond Work
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-body text-white/60 ab-lead ab-lead--wide">
            Outside product work, I like building small technical systems around
            signals, hardware, cybersecurity, and real-world problem solving. I
            keep these experiments simple, practical, and visual. The images tell
            most of the story.
          </p>
        </Reveal>

        <div className="ab-build-grid">
          {CARDS.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1} className="ab-build-card">
              <div className="ab-build-media">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                    className="ab-build-img"
                  />
                ) : (
                  <span className="ab-build-placeholder" aria-hidden />
                )}
              </div>
              <div className="ab-build-text">
                <h3 className="ab-build-title">{c.title}</h3>
                <p className="ab-build-desc">{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
