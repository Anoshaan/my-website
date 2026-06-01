"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

type CategoryName =
  | "Founder"
  | "UX Lead"
  | "Dev"
  | "PM"
  | "HR"
  | "Client";

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

/** Category order in the nav and in playback. */
const CATEGORY_ORDER: CategoryName[] = [
  "Founder",
  "UX Lead",
  "Dev",
  "PM",
  "HR",
  "Client",
];

const testimonials: Testimonial[] = [
  {
    category: "Founder",
    quote:
      "Anoshaan is an incredibly talented, technically savvy engineer who tackled everything from UI/UX revamps to podcast production with total dedication. If you want someone creative who you can always rely on to deliver, he's your guy.",
    name: "Menuke de Silva",
    role: "CEO · Aeturnum",
    initials: "MD",
    image: "/testimonials/menuke-de-silva.jpg",
    linkedIn: "https://www.linkedin.com/in/menuke/",
    avatarA: "#cfd9ff",
    avatarB: "#a8b8ff",
  },
  {
    category: "UX Lead",
    quote:
      "Anoshaan consistently delivers high-quality UX/UI work with strong creativity, ownership, and attention to detail.",
    name: "Andre Perera",
    role: "Associate UI Architect · Aeturnum",
    initials: "AP",
    image: "/testimonials/image1.webp",
    linkedIn: "https://www.linkedin.com/in/andre-perera/",
    avatarA: "#cfd9ff",
    avatarB: "#8aa6ff",
  },
  {
    category: "UX Lead",
    quote:
      "His strong UI/UX thinking and ability to simplify complex ideas made collaboration seamless and effective.",
    name: "Ayesh Dilan",
    role: "Lead UI/UX Designer · Elegant Media Australia",
    initials: "AD",
    image: "/testimonials/image2.webp",
    linkedIn: "https://www.linkedin.com/in/ayeshdilan/",
    avatarA: "#c8b8ff",
    avatarB: "#a78bfa",
  },
  {
    category: "Dev",
    quote:
      "One of the most creative and hardworking UI/UX engineers I've worked with across multiple projects.",
    name: "Chandima Dasanayaka",
    role: "Associate Technical Lead · Aeturnum",
    initials: "CD",
    image: "/testimonials/image3.jpeg",
    linkedIn: "https://www.linkedin.com/in/chandima-dasanayaka-b2470bb0/",
    avatarA: "#ffd1a8",
    avatarB: "#ffb89a",
  },
  {
    category: "Dev",
    quote:
      "He consistently delivered clean, scalable, and user-focused UI/UX solutions.",
    name: "Banujan Balendrakumar",
    role: "Senior Lead Engineer · IFS",
    initials: "BB",
    image: "/testimonials/image4.webp",
    linkedIn: "https://www.linkedin.com/in/banujanb/",
    avatarA: "#b8d6ff",
    avatarB: "#7dd3fc",
  },
  {
    category: "Dev",
    quote:
      "He delivered high-quality work with great attention to detail and a collaborative mindset.",
    name: "Nisala Thalagala",
    role: "Associate Tech Lead",
    initials: "NT",
    image: "/testimonials/image5.webp",
    linkedIn: "https://www.linkedin.com/in/nisala-thalagala-b22b94137/",
    avatarA: "#d6c8ff",
    avatarB: "#9f7aea",
  },
  {
    category: "PM",
    quote:
      "Anoshaan is highly collaborative, dependable, and brings strong UI/UX thinking into every project.",
    name: "Chandana Wijesuriya",
    role: "Senior Software Project Manager",
    initials: "CW",
    image: "/testimonials/image6.jpeg",
    linkedIn: "https://www.linkedin.com/in/chandana-wijesuriya-328a5b41/",
    avatarA: "#a8e0d0",
    avatarB: "#7fd1c0",
  },
  {
    category: "PM",
    quote:
      "He works effectively across teams and brings thoughtful UI/UX solutions to product experiences.",
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
      "Anoshaan consistently demonstrated professionalism, creativity, and a strong commitment to quality work.",
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
      "He is a committed professional with a positive attitude, strong work ethic, and collaborative mindset.",
    name: "Hiruni Withanage",
    role: "Senior Human Resources Executive",
    initials: "HW",
    image: "/testimonials/image9.jpeg",
    linkedIn: "https://www.linkedin.com/in/hiruni-withanage-42924a105/",
    avatarA: "#cfe0ff",
    avatarB: "#9fc0f5",
  },
  {
    category: "Client",
    quote:
      "His UI/UX work is intuitive, visually consistent, and strongly focused on user experience.",
    name: "Wije Niroshan",
    role: "Creative Lead",
    initials: "WN",
    image: "/testimonials/image10.webp",
    linkedIn: "https://www.linkedin.com/in/wije-niroshan/",
    avatarA: "#ffe4b8",
    avatarB: "#f5d28a",
  },
];

type CategoryMeta = {
  name: CategoryName;
  start: number | undefined;
  indices: number[];
};

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

function PortraitImage({ t }: { t: Testimonial }) {
  // The wrapper hosts the animated halo (radial glow + slow rotating
  // accent ring) so the glow can bleed BEYOND the circle's overflow
  // clip. The inner `.testimonial-portrait` is the clipped circle.
  return (
    <div className="testimonial-portrait-wrap">
      {t.image ? (
        <div className="testimonial-portrait">
          <Image
            src={t.image}
            alt={t.name}
            width={520}
            height={520}
            sizes="(min-width: 1024px) 240px, 180px"
            priority={false}
          />
        </div>
      ) : (
        <div
          className="testimonial-portrait"
          style={{
            background: `linear-gradient(135deg, ${t.avatarA}, ${t.avatarB})`,
            color: "rgba(0,0,0,0.75)",
            display: "grid",
            placeItems: "center",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 500,
          }}
        >
          {t.initials}
        </div>
      )}
    </div>
  );
}

function quoteSizeFor(len: number) {
  // Reduced one notch — short quotes used to read at ~26px; that felt
  // shouty next to the heading and the name/role. Cap held at 21px.
  if (len > 360) return "clamp(14px, 1vw, 16px)";
  if (len > 260) return "clamp(15px, 1.1vw, 17px)";
  if (len > 160) return "clamp(16px, 1.2vw, 19px)";
  return "clamp(17px, 1.3vw, 21px)";
}

/**
 * Featured testimonial — fully center-aligned column. Portrait sits at
 * the top, the quote below, and the meta row (name, role, LinkedIn) at
 * the bottom, all centered horizontally.
 */
function FeaturedCard({ index }: { index: number }) {
  const t = testimonials[index];
  const quoteSize = useMemo(
    () => (t ? quoteSizeFor(t.quote.length) : "clamp(18px, 1.4vw, 21px)"),
    [t]
  );

  if (!t) {
    return (
      <div
        className="featured-testimonial is-centered"
        tabIndex={0}
        aria-live="polite"
      >
        <p className="text-body text-white/45 text-center">
          Testimonials for this group are coming soon.
        </p>
      </div>
    );
  }

  return (
    <div
      className="featured-testimonial is-centered"
      tabIndex={0}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -10,
            transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="featured-inner is-centered"
        >
          {/* 1. Portrait */}
          <PortraitImage t={t} />

          {/* 2. Name + role */}
          <div className="featured-name-block">
            <span className="featured-name">{t.name}</span>
            <span className="featured-role">{t.role}</span>
          </div>

          {/* 3. Quote */}
          <p
            className="featured-quote is-centered"
            style={{ fontSize: quoteSize }}
          >
            <span className="featured-quote-mark-inline" aria-hidden>
              &ldquo;
            </span>
            {t.quote}
          </p>

          {/* 4. LinkedIn — bottom of the card. */}
          <a
            href={t.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${t.name}'s LinkedIn profile`}
            data-cursor-precise
            className="featured-linkedin"
          >
            <LinkedInIcon size={14} />
            <span>LinkedIn Profile</span>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Category nav — typography tabs with a thin progress bar under each
 * one. The active tab's bar fills from left to right over the duration
 * of that category's testimonials, so the bar doubles as a playback
 * timeline indicator.
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
        const isEmpty = indices.length === 0;
        const fillMs = indices.length * PLAY_MS;
        return (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={isEmpty || undefined}
            disabled={isEmpty}
            data-cursor-precise
            className={`cat-nav-item ${isActive ? "is-active" : ""} ${
              isEmpty ? "is-empty" : ""
            }`}
            onClick={(e) => {
              if (isEmpty) return;
              if (isActive) {
                const sweep = e.currentTarget.querySelector<HTMLElement>(
                  ".cat-nav-label-sweep"
                );
                const bar = e.currentTarget.querySelector<HTMLElement>(
                  ".cat-nav-progress-fill"
                );
                if (sweep) {
                  sweep.style.animation = "none";
                  void sweep.offsetWidth;
                  sweep.style.animation = "";
                }
                if (bar) {
                  bar.style.animation = "none";
                  void bar.offsetWidth;
                  bar.style.animation = "";
                }
              }
              onSelect(name);
            }}
          >
            <span className="cat-nav-label">
              <span className="cat-nav-label-base">{name}</span>
              {!isEmpty && (
                <span
                  className="cat-nav-label-sweep"
                  aria-hidden="true"
                  style={
                    { "--seg-duration": `${fillMs}ms` } as React.CSSProperties
                  }
                >
                  {name}
                </span>
              )}
            </span>
            <span
              className="cat-nav-progress"
              aria-hidden="true"
              style={
                { "--seg-duration": `${fillMs}ms` } as React.CSSProperties
              }
            >
              <span className="cat-nav-progress-fill" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Start at the first category that has testimonials.
  useEffect(() => {
    if (hasStarted) return;
    const firstWithData = categoryMeta.find((m) => m.start !== undefined);
    if (firstWithData && firstWithData.start !== undefined) {
      setIndex(firstWithData.start);
      setHasStarted(true);
    }
  }, [hasStarted]);

  // Autoplay — advance one testimonial every PLAY_MS. Reset by clicks
  // (which re-set `index` and therefore re-run this effect).
  useEffect(() => {
    if (!hasStarted) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      PLAY_MS
    );
    return () => clearTimeout(id);
  }, [index, hasStarted]);

  const activeMeta = metaForIndex(index);

  const jumpToCategory = useCallback((name: CategoryName) => {
    const meta = categoryMeta.find((m) => m.name === name);
    if (meta && meta.start !== undefined) setIndex(meta.start);
  }, []);

  return (
    <section className="testimonials-section py-[clamp(80px,10vw,140px)] relative">
      <Container>
        <div className="testimonials-layout">
          {/* LEFT — heading + body + category nav */}
          <div className="testimonials-heading-col">
            <Reveal>
              <h2 className="text-section text-white max-w-[18ch] heading-sheen">
                Trusted by founders, design leads, and engineering teams.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-body text-white/60 max-w-[44ch] mt-6">
                Selected words from the people I&apos;ve shipped product with
                over the last several years.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="testimonials-cat-nav-wrap">
                <CategoryNav
                  activeCategory={activeMeta.name}
                  onSelect={jumpToCategory}
                />
              </div>
            </Reveal>
          </div>

          {/* RIGHT — featured testimonial card */}
          <Reveal className="testimonials-card-col">
            <FeaturedCard index={index} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
