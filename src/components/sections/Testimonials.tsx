"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Marquee } from "@/components/animations/Marquee";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  image?: string;
  linkedIn: string;
  avatarA: string;
  avatarB: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Anoshaan has been a great experience. His attention to detail, creative thinking, and ability to handle multiple tasks under tight timelines truly set him apart. Whether working independently or within a team, he consistently delivers high-quality work. His diverse skill set across UX/UI, web development, and multimedia production adds tremendous value to every project.",
    name: "Andre Perera",
    role: "Associate UI Architect · Aeturnum",
    initials: "AP",
    image: "/testimonials/image1.png",
    linkedIn: "https://www.linkedin.com/in/andre-perera/",
    avatarA: "#cfd9ff",
    avatarB: "#8aa6ff",
  },
  {
    quote:
      "I've worked closely with Anoshaan across multiple projects and companies, and he consistently stands out as a creative and hardworking UI/UX engineer. His communication skills, attention to detail, and ability to turn ideas into exceptional user experiences make him a valuable asset to any team.",
    name: "Chandima Dasanayaka",
    role: "Associate Technical Lead · Aeturnum",
    initials: "CD",
    image: "/testimonials/image2.jpeg",
    linkedIn: "https://www.linkedin.com/in/chandima-dasanayaka-b2470bb0/",
    avatarA: "#ffd1a8",
    avatarB: "#ffb89a",
  },
  {
    quote:
      "Working with Anoshaan was a great experience. His strong UI/UX thinking, attention to detail, and ability to simplify complex ideas into intuitive experiences made collaboration seamless. He consistently brought creativity, ownership, and a strong product mindset to the team.",
    name: "Ayesh Dilan",
    role: "Lead UI/UX Designer · Elegant Media Australia",
    initials: "AD",
    image: "/testimonials/image3.jpeg",
    linkedIn: "https://www.linkedin.com/in/ayeshdilan/",
    avatarA: "#c8b8ff",
    avatarB: "#a78bfa",
  },
  {
    quote:
      "I worked with Anoshaan on several freelance projects, and he consistently delivered clean, minimal, and user-focused UI/UX work. His structured design systems and design tokens greatly improved development efficiency and future scalability.",
    name: "Banujan Balendrakumar",
    role: "Senior Lead Engineer · IFS",
    initials: "BB",
    image: "/testimonials/image4.png",
    linkedIn: "https://www.linkedin.com/in/banujanb/",
    avatarA: "#b8d6ff",
    avatarB: "#7dd3fc",
  },
  {
    quote:
      "Anoshaan delivered clean and well-structured UI/UX solutions with strong attention to usability and detail. His work is visually consistent, intuitive, and focused on creating meaningful user experiences.",
    name: "Wije Niroshan",
    role: "Creative Lead",
    initials: "WN",
    image: "/testimonials/image5.jpeg",
    linkedIn: "https://www.linkedin.com/in/wije-niroshan/",
    avatarA: "#ffe4b8",
    avatarB: "#f5d28a",
  },
  {
    quote:
      "I had the pleasure of working with Anoshaan at Elegant Media Pvt Ltd. He consistently delivered high-quality work with great attention to detail, while maintaining a positive attitude and collaborative approach throughout every project.",
    name: "Don Nisala Nishad Thalagala",
    role: "Associate Tech Lead",
    initials: "DT",
    image: "/testimonials/image6.jpeg",
    linkedIn: "https://www.linkedin.com/in/nisala-thalagala-b22b94137/",
    avatarA: "#d6c8ff",
    avatarB: "#9f7aea",
  },
];

// Short summary cards for the scrolling background marquees.
const summaryRow1: Testimonial[] = [testimonials[0], testimonials[1], testimonials[2]];
const summaryRow2: Testimonial[] = [testimonials[3], testimonials[4], testimonials[5]];
const summaryRow3: Testimonial[] = [testimonials[2], testimonials[0], testimonials[5]];

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.27 2.36 4.27 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.22 0z" />
    </svg>
  );
}

function Avatar({
  t,
  size,
  className,
}: {
  t: Testimonial;
  size: number;
  className?: string;
}) {
  if (t.image) {
    return (
      <span
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
        }}
      >
        <Image
          src={t.image}
          alt={t.name}
          width={size * 2}
          height={size * 2}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          sizes={`${size}px`}
        />
      </span>
    );
  }
  return (
    <span
      className={className}
      style={
        {
          width: size,
          height: size,
          borderRadius: "50%",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          fontWeight: 500,
          color: "rgba(0,0,0,0.75)",
          background: `linear-gradient(135deg, ${t.avatarA}, ${t.avatarB})`,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
          fontSize: size * 0.36,
        } as React.CSSProperties
      }
    >
      {t.initials}
    </span>
  );
}

function MarqueeCard({ t }: { t: Testimonial }) {
  return (
    <article className="testimonial-card">
      <div className="t-quote-mark" aria-hidden>
        &ldquo;
      </div>
      <p className="t-quote">{t.quote}</p>
      <div className="t-person">
        <Avatar t={t} size={40} />
        <div>
          <div className="t-name">{t.name}</div>
          <div className="t-role">{t.role}</div>
        </div>
      </div>
    </article>
  );
}

/**
 * Dynamic quote size — longer quotes get a slightly smaller font so the
 * card height stays fixed. Bucketed so we don't fight the clamp() unit.
 */
function quoteSizeFor(len: number) {
  if (len > 360) return "clamp(15px, 1.18vw, 17px)";
  if (len > 260) return "clamp(16px, 1.32vw, 19px)";
  if (len > 180) return "clamp(17px, 1.46vw, 20px)";
  return "clamp(18px, 1.6vw, 22px)";
}

function FeaturedTestimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6500
    );
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];
  const quoteSize = useMemo(() => quoteSizeFor(t.quote.length), [t.quote]);

  return (
    <div className="featured-testimonial-wrap" aria-live="polite">
      <div className="featured-testimonial" tabIndex={0}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="featured-inner"
          >
            <div className="featured-quote-mark" aria-hidden>
              &ldquo;
            </div>
            <p className="featured-quote" style={{ fontSize: quoteSize }}>
              {t.quote}
            </p>
            <div className="featured-person">
              <Avatar t={t} size={48} />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="featured-name">{t.name}</span>
                <span className="featured-role">{t.role}</span>
              </div>
              <a
                href={t.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${t.name}'s LinkedIn profile`}
                data-cursor-precise
                className="featured-linkedin"
              >
                <LinkedInIcon size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div
          className="featured-dots"
          role="tablist"
          aria-label="Testimonials"
        >
          {testimonials.map((entry, i) => (
            <button
              key={entry.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${entry.name}`}
              onClick={() => setIndex(i)}
              className={`featured-dot ${i === index ? "is-active" : ""}`}
              data-cursor-precise
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="marquee-section py-[clamp(80px,10vw,140px)]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center text-center gap-5 mb-[clamp(56px,6vw,80px)]">
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

      <div className="testimonials-stage">
        <div className="marquee-rows testimonials-rows" aria-hidden="true">
          <Marquee duration={78} direction="ltr" pauseOnHover={false}>
            {summaryRow1.map((t, i) => (
              <MarqueeCard key={`r1-${t.name}-${i}`} t={t} />
            ))}
          </Marquee>
          <Marquee duration={92} direction="rtl" pauseOnHover={false}>
            {summaryRow2.map((t, i) => (
              <MarqueeCard key={`r2-${t.name}-${i}`} t={t} />
            ))}
          </Marquee>
          <Marquee duration={70} direction="ltr" pauseOnHover={false}>
            {summaryRow3.map((t, i) => (
              <MarqueeCard key={`r3-${t.name}-${i}`} t={t} />
            ))}
          </Marquee>
        </div>

        <div className="testimonials-mask" aria-hidden />

        <FeaturedTestimonial />
      </div>
    </section>
  );
}
