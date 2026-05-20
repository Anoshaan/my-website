import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const items = [
  {
    quote:
      "Anoshaan understood our trading floor better than half our PM team. The redesign cut alarm fatigue by 30% and shipped in eight weeks.",
    name: "Maya Chen",
    role: "Director of Product · Lumina",
  },
  {
    quote:
      "Calm in deep work, sharp in critique. The kind of designer you want on the team three months before launch, not three weeks.",
    name: "Sara Lindqvist",
    role: "CTO · Mira Health",
  },
  {
    quote:
      "He pushed back on three of our six requirements and was right every time. The product is better for it and the team learned a lot.",
    name: "Ines Vidal",
    role: "Product Lead · Northwind",
  },
  {
    quote:
      "Rare to find someone who can speak design tokens with engineers and motion language with the marketing team in the same meeting.",
    name: "Jonas Krueger",
    role: "Founder & CEO · Aurora Labs",
  },
  {
    quote:
      "He treats motion as architecture, not decoration. Every transition has a reason and the product feels measurably calmer to use.",
    name: "Priya Reddy",
    role: "Head of Design · Vector",
  },
  {
    quote:
      "Quiet, precise, and faster than you'd expect. Delivered a token system and motion library that's still our reference twelve months later.",
    name: "Aya Tanaka",
    role: "Chief Designer · Praxis",
  },
];

export function Testimonials() {
  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Testimonials"
          title="Trusted by founders, design leads, and engineering teams."
          intro="Selected words from the people I've shipped product with over the last several years."
        />
        <StaggerContainer className="grid gap-6 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <StaggerItem key={t.name}>
              <Card>
                <p className="text-body text-white/75 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto pt-6 border-t border-white/[0.06] flex flex-col gap-1">
                  <span className="text-supporting font-semibold text-white">
                    {t.name}
                  </span>
                  <span className="text-supporting text-white/50">{t.role}</span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
