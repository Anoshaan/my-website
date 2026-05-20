import ShinyText from "@/components/animations/ShinyText";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

type PageHeadProps = {
  eyebrow?: string;
  title: string;
  shineWords?: string;
  intro?: string;
};

export function PageHead({ eyebrow, title, shineWords, intro }: PageHeadProps) {
  return (
    <section className="pt-[clamp(140px,16vw,200px)] pb-[clamp(60px,8vw,100px)]">
      <Container>
        <div className="flex flex-col gap-6 max-w-[920px]">
          {eyebrow && (
            <Reveal duration={0.6}>
              <span className="text-eyebrow text-white/55">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <h1 className="text-hero text-white">
              {title}
              {shineWords && (
                <>
                  {" "}
                  <ShinyText
                    text={shineWords}
                    color="#ffffff"
                    shineColor="#cfd9ff"
                    speed={4}
                  />
                </>
              )}
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
