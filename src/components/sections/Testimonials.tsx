import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Marquee } from "@/components/animations/Marquee";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarA: string;
  avatarB: string;
};

const row1: Testimonial[] = [
  {
    quote:
      "Anoshaan understood our trading floor better than half our PM team. The redesign cut alarm fatigue by 30% and shipped in eight weeks.",
    name: "Maya Chen",
    role: "Director of Product · Lumina",
    initials: "MC",
    avatarA: "#cfd9ff",
    avatarB: "#8aa6ff",
  },
  {
    quote:
      "Calm in deep work, sharp in critique. The kind of designer you want on the team three months before launch, not three weeks.",
    name: "Sara Lindqvist",
    role: "CTO · Mira Health",
    initials: "SL",
    avatarA: "#ffd1a8",
    avatarB: "#ffb89a",
  },
  {
    quote:
      "He pushed back on three of our six requirements and was right every time. The product is better for it and the team learned a lot.",
    name: "Ines Vidal",
    role: "Product Lead · Northwind",
    initials: "IV",
    avatarA: "#c8b8ff",
    avatarB: "#a78bfa",
  },
];

const row2: Testimonial[] = [
  {
    quote:
      "Rare to find someone who can speak design tokens with engineers and motion language with the marketing team in the same meeting.",
    name: "Jonas Krueger",
    role: "Founder & CEO · Aurora Labs",
    initials: "JK",
    avatarA: "#b8d6ff",
    avatarB: "#7dd3fc",
  },
  {
    quote:
      "He shipped a motion system that finally made our dashboard feel responsive instead of busy. The data didn't change — the experience did.",
    name: "Tomás Aguirre",
    role: "Principal Designer · Forecast",
    initials: "TA",
    avatarA: "#ffe4b8",
    avatarB: "#f5d28a",
  },
  {
    quote:
      "His prototypes feel like the final thing already shipped. Saved us weeks of clarification meetings with engineering on motion details.",
    name: "Rafe Ostrowski",
    role: "Head of UX · Citadel",
    initials: "RO",
    avatarA: "#d6c8ff",
    avatarB: "#9f7aea",
  },
];

const row3: Testimonial[] = [
  {
    quote:
      "He treats motion as architecture, not decoration. Every transition has a reason and the product feels measurably calmer to use.",
    name: "Priya Reddy",
    role: "Head of Design · Vector",
    initials: "PR",
    avatarA: "#ffc8b8",
    avatarB: "#ff9a78",
  },
  {
    quote:
      "We brought him in for a one-week audit and ended up extending for six months. The detail and rigor are what you pay for.",
    name: "Naomi Okafor",
    role: "Design Director · Halcyon",
    initials: "NO",
    avatarA: "#cfd9ff",
    avatarB: "#a8b8e8",
  },
  {
    quote:
      "Quiet, precise, and faster than you'd expect. Delivered a token system and motion library that's still our reference twelve months later.",
    name: "Aya Tanaka",
    role: "Chief Designer · Praxis",
    initials: "AT",
    avatarA: "#ffd8c0",
    avatarB: "#ffa68a",
  },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <article
      className="testimonial-card"
      style={
        {
          ["--avatar-a" as never]: t.avatarA,
          ["--avatar-b" as never]: t.avatarB,
        } as React.CSSProperties
      }
    >
      <div className="t-quote-mark" aria-hidden>
        &ldquo;
      </div>
      <p className="t-quote">{t.quote}</p>
      <div className="t-person">
        <span className="t-avatar">{t.initials}</span>
        <div>
          <div className="t-name">{t.name}</div>
          <div className="t-role">{t.role}</div>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <section className="marquee-section py-[clamp(80px,10vw,140px)]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center text-center gap-4 mb-[clamp(40px,5vw,64px)]">
            <span className="text-eyebrow text-white/55">Testimonials</span>
            <h2 className="text-section text-white max-w-[22ch]">
              Trusted by founders, design leads, and engineering teams.
            </h2>
            <p className="text-body text-white/60 max-w-[52ch]">
              Selected words from the people I&apos;ve shipped product with
              over the last several years.
            </p>
          </div>
        </Reveal>
      </Container>

      <div className="marquee-rows">
        <Marquee duration={78} direction="ltr">
          {row1.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee duration={92} direction="rtl">
          {row2.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee duration={70} direction="ltr">
          {row3.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
