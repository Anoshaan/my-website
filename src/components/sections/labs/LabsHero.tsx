import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Labs hero — a full-page editorial header. Copy is unchanged. The heading
 * is split into two tones across two lines (clean white + a soft lavender/
 * purple gradient), and the right side carries a full-bleed, space-themed
 * "domain-flow" field.
 *
 * The field streams domain labels straight from right to left (no slant) on
 * a centered vertical band so nothing rides the very top or bottom edge. Word
 * sizes vary (sm / md / lg) for hierarchy and depth: larger labels read as
 * foreground (sharp, brighter), smaller ones recede (dimmer, gently blurred).
 * A separate, sparser set of thin "shooting-star" streaks drifts across on its
 * own lanes — decoupled from the words, so only some lanes carry a line.
 *
 * Pure CSS animation. Negative delays seed several labels mid-travel so the
 * field is never blank on load. Soft left/right gradient masks let labels
 * dissolve smoothly instead of clipping. container-query units keep the travel
 * distance responsive; the field is decorative, hidden on small screens, and
 * frozen to a static spread under prefers-reduced-motion.
 */

/** One drifting domain label riding its own lane. `size` drives the type
 *  hierarchy + depth; `rx` is the static fallback x for reduced motion. */
type DomainLabel = {
  text: string;
  top: string;
  size: "sm" | "md" | "lg";
  dur: string;
  delay: string;
  op: number;
  rx: string;
};

/** A thin shooting-star streak. Sparser than the labels and on its own
 *  lanes, so the lines animate independently of the text. */
type StarLine = {
  top: string;
  dur: string;
  delay: string;
  op: number;
};

/* Twenty domains on a centered vertical band (nothing above 16% or below 83%).
   Two priority levels alternate down the field so a larger main word never sits
   directly above another: `lg` = top-priority main words (bigger, brighter),
   `sm` = secondary words (smaller, lighter, calmer). Negative delays are spread
   so the field is already populated at t=0. */
const DOMAINS: DomainLabel[] = [
  { text: "Product Platforms", top: "16%", size: "lg", dur: "41s", delay: "-5s", op: 0.82, rx: "70cqi" },
  { text: "Dashboards", top: "19.5%", size: "sm", dur: "52s", delay: "-22s", op: 0.54, rx: "36cqi" },
  { text: "Mobile App Experiences", top: "23%", size: "lg", dur: "39s", delay: "-31s", op: 0.84, rx: "84cqi" },
  { text: "Web & CMS", top: "26.5%", size: "sm", dur: "50s", delay: "-12s", op: 0.56, rx: "28cqi" },
  { text: "Commerce", top: "30%", size: "lg", dur: "43s", delay: "-3s", op: 0.8, rx: "58cqi" },
  { text: "Marketplace", top: "33.5%", size: "sm", dur: "54s", delay: "-35s", op: 0.53, rx: "60cqi" },
  { text: "AI & Automation UX", top: "37%", size: "lg", dur: "40s", delay: "-17s", op: 0.85, rx: "20cqi" },
  { text: "Booking Flows", top: "40.5%", size: "sm", dur: "49s", delay: "-8s", op: 0.56, rx: "76cqi" },
  { text: "Branding & Identity", top: "44%", size: "lg", dur: "44s", delay: "-27s", op: 0.8, rx: "46cqi" },
  { text: "Visual Systems", top: "47.5%", size: "sm", dur: "51s", delay: "-41s", op: 0.56, rx: "34cqi" },
  { text: "Motion & Video", top: "51%", size: "lg", dur: "42s", delay: "-14s", op: 0.82, rx: "12cqi" },
  { text: "Lottie Systems", top: "54.5%", size: "sm", dur: "53s", delay: "-2s", op: 0.55, rx: "66cqi" },
  { text: "Design Systems", top: "58%", size: "lg", dur: "40s", delay: "-20s", op: 0.83, rx: "50cqi" },
  { text: "Product Handoff", top: "61.5%", size: "sm", dur: "50s", delay: "-33s", op: 0.53, rx: "24cqi" },
  { text: "FinTech UX", top: "65%", size: "lg", dur: "43s", delay: "-7s", op: 0.84, rx: "80cqi" },
  { text: "Admin Tools", top: "68.5%", size: "sm", dur: "52s", delay: "-19s", op: 0.55, rx: "42cqi" },
  { text: "Documentation", top: "72%", size: "lg", dur: "39s", delay: "-25s", op: 0.82, rx: "64cqi" },
  { text: "Cross-Device", top: "75.5%", size: "sm", dur: "49s", delay: "-10s", op: 0.56, rx: "30cqi" },
  { text: "Component Libraries", top: "79%", size: "lg", dur: "41s", delay: "-38s", op: 0.8, rx: "54cqi" },
  { text: "Resource Planning", top: "82.5%", size: "sm", dur: "53s", delay: "-16s", op: 0.54, rx: "18cqi" },
];

/* Fewer streaks than labels, on their own lanes + speeds. */
const STARS: StarLine[] = [
  { top: "22%", dur: "13s", delay: "-3s", op: 0.55 },
  { top: "37%", dur: "17s", delay: "-9s", op: 0.42 },
  { top: "52%", dur: "11s", delay: "-6s", op: 0.6 },
  { top: "66%", dur: "19s", delay: "-13s", op: 0.4 },
  { top: "80%", dur: "15s", delay: "-1s", op: 0.5 },
];

function DomainFlow() {
  return (
    <div className="labs-hero-flow" aria-hidden>
      <div className="labs-hero-flow-inner">
        {STARS.map((s, i) => (
          <span
            key={`star-${i}`}
            className="labs-domain-line"
            style={
              { top: s.top, "--dur": s.dur, "--delay": s.delay, "--op": s.op } as CSSProperties
            }
          />
        ))}

        {DOMAINS.map((d) => (
          <span
            key={d.text}
            className={`labs-domain is-${d.size}`}
            style={
              {
                top: d.top,
                "--dur": d.dur,
                "--delay": d.delay,
                "--op": d.op,
                "--rx": d.rx,
              } as CSSProperties
            }
          >
            <span className="labs-domain-text">{d.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function LabsHero() {
  return (
    <section className="labs-hero">
      <DomainFlow />

      <Container>
        <div className="labs-hero-content">
          <Reveal delay={0.1}>
            <h1 className="page-hero-title">
              <span className="page-hero-line">Selected</span>
              <span className="page-hero-grad page-hero-grad--purple">
                Product Pathways.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="labs-intro-desc flex flex-col gap-4">
              <p>
                A focused collection of product, AI, brand, motion, and handoff systems showing how ideas move from early client conversations into structured UX, clear interfaces, launch-ready assets, and scalable product experiences.
              </p>
              <p className="text-sm opacity-60">
                Each pathway shows how I think through the problem, shape the user journey, design the interface, guide the handoff, and use motion or AI where it helps the product feel clearer.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
