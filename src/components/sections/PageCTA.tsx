import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

type PageCTAProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  buttonLabel: string;
  href: string;
};

/**
 * Shared closing CTA for inner pages (Systems, Brand). Mirrors the
 * About / Next Mission closing rhythm: centered, calm, one button.
 */
export function PageCTA({ eyebrow, title, lead, buttonLabel, href }: PageCTAProps) {
  return (
    <section className="section-pad border-t border-white/[0.06] text-center">
      <Container size="narrow" className="flex flex-col items-center gap-6">
        {eyebrow && (
          <Reveal>
            <span className="section-label">{eyebrow}</span>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h2 className="text-section text-white heading-sheen">{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.16}>
            <p className="text-body text-white/60 max-w-[52ch]">{lead}</p>
          </Reveal>
        )}
        <Reveal delay={0.24}>
          <div className="mt-2">
            <Button href={href} rainbow>
              {buttonLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
