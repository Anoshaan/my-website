import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export type HeroTone = "purple" | "green" | "gold" | "silver";

type PageHeadProps = {
  /**
   * @deprecated Eyebrows are no longer rendered for the cleaner page hierarchy.
   * Prop kept for API compatibility across existing pages.
   */
  eyebrow?: string;
  /** White statement line — the first of the two hero lines. */
  title: string;
  /** Animated gradient payoff line — the second hero line. */
  shineWords?: string;
  intro?: string;
  /** Per-page gradient colour direction. */
  tone?: HeroTone;
};

/**
 * PageHead — the shared inner-page hero (Systems, Brand/Craft, About). The
 * title always resolves into two left-aligned lines at the unified hero
 * scale: a white statement line plus an animated gradient payoff line whose
 * colour direction is set per page via `tone`. Labs uses the same
 * `.page-hero-*` treatment from its own bespoke hero section.
 */
export function PageHead({
  title,
  shineWords,
  intro,
  tone = "silver",
}: PageHeadProps) {
  return (
    <section className="pt-[clamp(140px,16vw,200px)] pb-[clamp(96px,12vw,160px)]">
      <Container>
        <div className="flex flex-col gap-7">
          <Reveal delay={0.1}>
            <h1 className="page-hero-title">
              <span className="page-hero-line">{title}</span>
              {shineWords && (
                <span className={`page-hero-grad page-hero-grad--${tone}`}>
                  {shineWords}
                </span>
              )}
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.2}>
              <p className="text-body text-white/65 max-w-[58ch]">{intro}</p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
