import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHead } from "@/components/ui/PageHead";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

type CraftEffect =
  | "scroll-sweep"
  | "parallax-depth"
  | "soft-float"
  | "pulse-glow"
  | "shimmer"
  | "silk-flow";

type Sketch = {
  tag: string;
  title: string;
  note: string;
  image: string;
  effect: CraftEffect;
};

const sketches: Sketch[] = [
  {
    tag: "Motion",
    title: "GSAP & Lottie Experiences",
    note: "Advanced motion systems using GSAP and Lottie for scroll-triggered storytelling, smooth transitions, and interactive digital experiences.",
    image: "/craft-lab/1.png",
    effect: "scroll-sweep",
  },
  {
    tag: "3D",
    title: "Immersive 3D Web Design",
    note: "Exploring cinematic web experiences with depth, 3D environments, spatial layouts, and modern interactive visuals.",
    image: "/craft-lab/2.png",
    effect: "parallax-depth",
  },
  {
    tag: "UX",
    title: "Minimal UX, Maximum Clarity",
    note: "Designing interfaces focused on simplicity, clarity, and intentional user experiences without unnecessary complexity.",
    image: "/craft-lab/3.png",
    effect: "soft-float",
  },
  {
    tag: "Behavior",
    title: "Behavior-Driven Interfaces",
    note: "Using psychology, attention flow, and interaction behavior to craft intuitive and emotionally engaging experiences.",
    image: "/craft-lab/4.png",
    effect: "pulse-glow",
  },
  {
    tag: "AI",
    title: "AI-Powered User Experiences",
    note: "Blending AI assistance, personalization, and adaptive workflows into seamless modern interfaces.",
    image: "/craft-lab/5.png",
    effect: "shimmer",
  },
  {
    tag: "Storytelling",
    title: "Motion-Led Product Storytelling",
    note: "Creating emotionally engaging product experiences through motion design, transitions, and cinematic interaction systems.",
    image: "/craft-lab/6.png",
    effect: "silk-flow",
  },
];

export default function CraftPage() {
  return (
    <>
      <PageHead
        title="Sketches, studies, and"
        shineWords="experiments."
        intro="Work-in-progress explorations, design fragments, and ideas that haven't made it into shipped products yet."
      />

      <section className="pb-24">
        <Container>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sketches.map((s) => (
              <StaggerItem key={s.title}>
                <Card>
                  <div
                    className={`craft-thumb craft-thumb--${s.effect} aspect-[4/3] rounded-[18px] overflow-hidden border border-white/[0.08] bg-[#0a0a0c]`}
                  >
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="craft-thumb__img object-cover"
                    />
                    <span className="craft-thumb__fx" aria-hidden />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-eyebrow eyebrow-strong text-white/60">
                      {s.tag}
                    </span>
                    <h3 className="text-card-title text-white">{s.title}</h3>
                    <p className="text-supporting text-white/65">{s.note}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
