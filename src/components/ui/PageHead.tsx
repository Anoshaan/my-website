import ShinyText from "@/components/animations/ShinyText";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

type PageHeadProps = {
  /**
   * @deprecated Eyebrows are no longer rendered for the cleaner page hierarchy.
   * Prop kept for API compatibility across existing pages.
   */
  eyebrow?: string;
  title: string;
  shineWords?: string;
  intro?: string;
};

export function PageHead({ title, shineWords, intro }: PageHeadProps) {
  return (
    <section className="pt-[clamp(140px,16vw,200px)] pb-[clamp(96px,12vw,160px)]">
      <Container>
        <div className="flex flex-col gap-7 max-w-[920px]">
          <Reveal delay={0.1}>
            <h1 className="text-hero text-white">
              <ShinyText
                text={shineWords ? `${title} ${shineWords}` : title}
                color="#d6d6da"
                shineColor="#ffffff"
                speed={6}
                spread={115}
                delay={1.6}
              />
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.2}>
              <p className="text-body text-white/65 max-w-[64ch]">{intro}</p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
