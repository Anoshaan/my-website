"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Marquee } from "@/components/animations/Marquee";

type CategoryName = "UI/UX Leads" | "Devs" | "PMs" | "HR" | "Clients";

type Testimonial = {
  category: CategoryName;
  quote: string;
  name: string;
  role: string;
  initials: string;
  image: string;
  linkedIn: string;
  avatarA: string;
  avatarB: string;
};

/**
 * Category display order — the source of truth, matching the testimonials
 * document. Autoplay walks the flat array below, which is grouped in this
 * same order, so playback flows category by category for free.
 */
const CATEGORY_ORDER: CategoryName[] = [
  "UI/UX Leads",
  "Devs",
  "PMs",
  "HR",
  "Clients",
];

const testimonials: Testimonial[] = [
  {
    category: "UI/UX Leads",
    quote:
      "Working with Anoshaan has been a great experience. His attention to detail, creative thinking, and ability to handle multiple tasks under tight timelines truly set him apart.",
    name: "Andre Perera",
    role: "Associate UI Architect · Aeturnum",
    initials: "AP",
    image: "/testimonials/image1.png",
    linkedIn: "https://www.linkedin.com/in/andre-perera/",
    avatarA: "#cfd9ff",
    avatarB: "#8aa6ff",
  },
  {
    category: "UI/UX Leads",
    quote:
      "His strong UI/UX thinking, attention to detail, and ability to simplify complex ideas into intuitive experiences made collaboration seamless.",
    name: "Ayesh Dilan",
    role: "Lead UI/UX Designer · Elegant Media Australia",
    initials: "AD",
    image: "/testimonials/image2.jpeg",
    linkedIn: "https://www.linkedin.com/in/ayeshdilan/",
    avatarA: "#c8b8ff",
    avatarB: "#a78bfa",
  },
  {
    category: "Devs",
    quote:
      "One of the most creative and hardworking UI/UX engineers I've worked with.",
    name: "Chandima Dasanayaka",
    role: "Associate Technical Lead · Aeturnum",
    initials: "CD",
    image: "/testimonials/image3.jpeg",
    linkedIn: "https://www.linkedin.com/in/chandima-dasanayaka-b2470bb0/",
    avatarA: "#ffd1a8",
    avatarB: "#ffb89a",
  },
  {
    category: "Devs",
    quote:
      "He consistently delivered clean, minimal, and user-focused UI/UX work.",
    name: "Banujan Balendrakumar",
    role: "Senior Lead Engineer · IFS",
    initials: "BB",
    image: "/testimonials/image4.png",
    linkedIn: "https://www.linkedin.com/in/banujanb/",
    avatarA: "#b8d6ff",
    avatarB: "#7dd3fc",
  },
  {
    category: "Devs",
    quote:
      "He consistently delivered high-quality work with great attention to detail.",
    name: "Don Nisala Nishad Thalagala",
    role: "Associate Tech Lead",
    initials: "DT",
    image: "/testimonials/image5.jpeg",
    linkedIn: "https://www.linkedin.com/in/nisala-thalagala-b22b94137/",
    avatarA: "#d6c8ff",
    avatarB: "#9f7aea",
  },
  {
    category: "PMs",
    quote:
      "Highly collaborative, dependable, and proactive in team environments.",
    name: "Chandana Wijesuriya",
    role: "Senior Software Project Manager",
    initials: "CW",
    image: "/testimonials/image6.jpeg",
    linkedIn: "https://www.linkedin.com/in/chandana-wijesuriya-328a5b41/",
    avatarA: "#a8e0d0",
    avatarB: "#7fd1c0",
  },
  {
    category: "PMs",
    quote:
      "He brings thoughtful UI/UX solutions that enhance overall product experiences.",
    name: "Pumudi Vidanagama",
    role: "Senior IT Project Manager · Agile Coach",
    initials: "PV",
    image: "/testimonials/image7.jpeg",
    linkedIn: "https://www.linkedin.com/in/pumudi/",
    avatarA: "#ffc8d6",
    avatarB: "#f5a8be",
  },
  {
    category: "HR",
    quote:
      "He consistently demonstrated professionalism, creativity, and a strong commitment to delivering quality work.",
    name: "Sabry Ashraff",
    role: "Lead HR – Human Resources · Aeturnum",
    initials: "SA",
    image: "/testimonials/image8.jpeg",
    linkedIn: "https://www.linkedin.com/in/sabryashraff/",
    avatarA: "#ffe0a8",
    avatarB: "#f5c87f",
  },
  {
    category: "HR",
    quote:
      "He is a committed professional with a positive attitude and strong work ethic.",
    name: "Hiruni Withanage",
    role: "Senior Human Resources Executive",
    initials: "HW",
    image: "/testimonials/image9.jpeg",
    linkedIn: "https://www.linkedin.com/in/hiruni-withanage-42924a105/",
    avatarA: "#cfe0ff",
    avatarB: "#9fc0f5",
  },
  {
    category: "Clients",
    quote:
      "His work is visually consistent, intuitive, and focused on meaningful user experiences.",
    name: "Wije Niroshan",
    role: "Creative Lead",
    initials: "WN",
    image: "/testimonials/image10.jpeg",
    linkedIn: "https://www.linkedin.com/in/wije-niroshan/",
    avatarA: "#ffe4b8",
    avatarB: "#f5d28a",
  },
];

type CategoryMeta = {
  name: CategoryName;
  start: number;
  indices: number[];
};

/** Flat indices grouped per category — built once, drives nav + playback. */
const categoryMeta: CategoryMeta[] = CATEGORY_ORDER.map((name) => {
  const indices = testimonials.reduce<number[]>((acc, t, i) => {
    if (t.category === name) acc.push(i);
    return acc;
  }, []);
  return { name, start: indices[0], indices };
});

function metaForIndex(index: number): CategoryMeta {
  return categoryMeta.find((m) => m.indices.includes(index)) ?? categoryMeta[0];
}

// Short summary cards for the scrolling background marquees.
const summaryRow1 = [0, 5, 2, 8].map((i) => testimonials[i]);
const summaryRow2 = [3, 9, 1, 6].map((i) => testimonials[i]);
const summaryRow3 = [7, 4, 0, 5].map((i) => testimonials[i]);

const PLAY_MS = 5500;

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
 * card height stays stable. Bucketed so we don't fight the clamp() unit.
 */
function quoteSizeFor(len: number) {
  if (len > 360) return "clamp(15px, 1.18vw, 17px)";
  if (len > 260) return "clamp(16px, 1.32vw, 19px)";
  if (len > 160) return "clamp(17px, 1.46vw, 20px)";
  return "clamp(18px, 1.62vw, 23px)";
}

/* The featured card: testimonial content + person only. No progress UI. */
function FeaturedCard({ index }: { index: number }) {
  const t = testimonials[index];
  const quoteSize = useMemo(() => quoteSizeFor(t.quote.length), [t.quote]);

  return (
    <div className="featured-testimonial" tabIndex={0} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
    </div>
  );
}

/**
 * Secondary card: typography-only category navigation. The active category's
 * text fills with a soft left-to-right gradient whose duration equals the
 * full playback time of that category — so the type itself reads as the
 * progress indicator. Driven entirely by CSS; the only JS touch is
 * restarting the fill when the live category is clicked again.
 */
function CategoryNav({
  activeCategory,
  onSelect,
}: {
  activeCategory: CategoryName;
  onSelect: (name: CategoryName) => void;
}) {
  return (
    <div className="cat-nav" role="tablist" aria-label="Testimonial categories">
      {categoryMeta.map(({ name, indices }) => {
        const isActive = name === activeCategory;
        const fillMs = indices.length * PLAY_MS;
        return (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-cursor-precise
            className={`cat-nav-item ${isActive ? "is-active" : ""}`}
            onClick={(e) => {
              // Re-clicking the already-live category restarts its fill
              // in place (the class doesn't change, so CSS won't replay).
              if (isActive) {
                const sweep = e.currentTarget.querySelector<HTMLElement>(
                  ".cat-nav-label-sweep"
                );
                if (sweep) {
                  sweep.style.animation = "none";
                  void sweep.offsetWidth;
                  sweep.style.animation = "";
                }
              }
              onSelect(name);
            }}
          >
            <span className="cat-nav-label">
              <span className="cat-nav-label-base">{name}</span>
              <span
                className="cat-nav-label-sweep"
                aria-hidden="true"
                style={
                  { "--seg-duration": `${fillMs}ms` } as React.CSSProperties
                }
              >
                {name}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Owns playback state for the whole testimonial player. Testimonials autoplay
 * through the flat array, so they flow category by category automatically.
 * Clicking a category jumps to its first testimonial and playback continues
 * naturally into the categories that follow.
 */
function TestimonialPlayer() {
  const [index, setIndex] = useState(0);

  // setTimeout keyed on `index`: a manual jump re-runs the effect, which
  // clears the pending timer and restarts a full interval from the new spot.
  useEffect(() => {
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      PLAY_MS
    );
    return () => clearTimeout(id);
  }, [index]);

  const activeMeta = metaForIndex(index);

  const jumpToCategory = useCallback((name: CategoryName) => {
    const meta = categoryMeta.find((m) => m.name === name);
    if (meta) setIndex(meta.start);
  }, []);

  return (
    <div className="testimonial-player">
      <FeaturedCard index={index} />
      <CategoryNav activeCategory={activeMeta.name} onSelect={jumpToCategory} />
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="marquee-section py-[clamp(80px,10vw,140px)]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center text-center gap-5 mb-[clamp(56px,6vw,80px)]">
            <h2 className="text-section text-white max-w-[26ch]">
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

        <div className="featured-testimonial-wrap">
          <TestimonialPlayer />
        </div>
      </div>
    </section>
  );
}
