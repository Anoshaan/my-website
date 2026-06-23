"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, motionValue, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

type CategoryName =
  | "Founder"
  | "UI/UX"
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
  "UI/UX",
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
    category: "UI/UX",
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
    category: "UI/UX",
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

/* ----------------------------------------------------------------
   ORBIT FIELD — a slow "solar system" of the testimonial avatars.
   The active avatar sits large in the centre; the rest orbit on
   three rings and are clickable. Selecting one flies it to the
   centre while the previous centre eases back to its orbit slot.
   ---------------------------------------------------------------- */

const ORBIT_SCALE = 0.16; // orbit avatar size relative to the centre avatar — small "planets" against a large central sun

// Ring assignment per testimonial index (3 + 4 + 4 = 11). Larger paths —
// the outer rings are allowed to run past the viewport edge.
const RINGS = [
  { rf: 0.27, dir: 1, spd: 0.9, offset: 0 },
  { rf: 0.39, dir: -1, spd: 0.62, offset: Math.PI / 4 },
  { rf: 0.5, dir: 1, spd: 0.46, offset: Math.PI / 8 },
];
const RING_INDEX = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
const RING_COUNT = [3, 4, 4];
const RING_START = [0, 3, 7];

function baseAngleFor(i: number) {
  const ring = RING_INDEX[i];
  const pos = i - RING_START[ring];
  return (pos / RING_COUNT[ring]) * Math.PI * 2 + RINGS[ring].offset;
}

function OrbitField({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const [nodeSize, setNodeSize] = useState(180);
  const dims = useRef({ radii: [120, 180, 230] });

  // One persistent set of motion values per avatar (no re-render on tick).
  const nodes = useRef(
    testimonials.map(() => ({
      x: motionValue(0),
      y: motionValue(0),
      s: motionValue(ORBIT_SCALE),
    }))
  );
  const curT = useRef(testimonials.map((_, i) => (i === active ? 1 : 0)));

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const S = Math.min(el.clientWidth, el.clientHeight);
      // Featured avatar reads larger; orbit radii scale with the stage.
      setNodeSize(S * 0.36);
      dims.current.radii = RINGS.map((r) => r.rf * S);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const place = (phase: number) => {
      for (let i = 0; i < testimonials.length; i++) {
        const ring = RINGS[RING_INDEX[i]];
        const R = dims.current.radii[RING_INDEX[i]];
        const ang = baseAngleFor(i) + phase * ring.dir * ring.spd;
        const ox = Math.cos(ang) * R;
        const oy = Math.sin(ang) * R;
        const t = curT.current[i];
        nodes.current[i].x.set(ox * (1 - t));
        nodes.current[i].y.set(oy * (1 - t));
        nodes.current[i].s.set(ORBIT_SCALE + (1 - ORBIT_SCALE) * t);
      }
    };

    if (reduced) {
      // Static: snap to targets, no animation loop.
      for (let i = 0; i < testimonials.length; i++) {
        curT.current[i] = i === active ? 1 : 0;
      }
      place(0);
      return;
    }

    let raf = 0;
    let phase = 0;
    let last = performance.now();
    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      phase += dt * 0.16; // slow, premium drift
      for (let i = 0; i < testimonials.length; i++) {
        const target = i === activeRef.current ? 1 : 0;
        curT.current[i] += (target - curT.current[i]) * 0.06;
      }
      place(phase);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [reduced, active]);

  return (
    <div ref={stageRef} className="orbit-stage" style={{ ["--node-size" as string]: `${nodeSize}px` }}>
      {/* Dotted orbital paths — inner strongest, outer most subtle. */}
      {RINGS.map((r, k) => (
        <span
          key={k}
          className={`orbit-ring orbit-ring-${k}`}
          aria-hidden
          style={{ width: `${r.rf * 200}%`, height: `${r.rf * 200}%` }}
        />
      ))}
      {testimonials.map((t, i) => {
        const isActive = i === active;
        return (
          <motion.button
            key={i}
            type="button"
            data-cursor-precise
            aria-label={`Show testimonial from ${t.name}`}
            aria-pressed={isActive}
            onClick={() => onSelect(i)}
            className={`orbit-node is-ring-${RING_INDEX[i]} ${isActive ? "is-active" : ""}`}
            style={{
              x: nodes.current[i].x,
              y: nodes.current[i].y,
              scale: nodes.current[i].s,
              zIndex: isActive ? 40 : 12,
            }}
          >
            {t.image ? (
              <Image
                src={t.image}
                alt={t.name}
                width={300}
                height={300}
                sizes="240px"
                priority={false}
              />
            ) : (
              <span
                className="orbit-node-initials"
                style={{ background: `linear-gradient(135deg, ${t.avatarA}, ${t.avatarB})` }}
              >
                {t.initials}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function quoteSizeFor(len: number) {
  // Scaled up one notch — the quote is the primary reading content of
  // the chapter and earns real presence at the wider measure.
  if (len > 360) return "clamp(16px, 1.15vw, 19px)";
  if (len > 260) return "clamp(17px, 1.3vw, 21px)";
  if (len > 160) return "clamp(18px, 1.45vw, 23px)";
  return "clamp(19px, 1.6vw, 26px)";
}

/**
 * Featured testimonial content — reading order follows the reference:
 * name → designation → quote → LinkedIn button. The portrait lives in
 * the orbit field (centre avatar), so this column is content only.
 * The LinkedIn button uses the site's secondary pill styling with
 * LinkedIn blue kept to the icon accent.
 */
function FeaturedContent({ index }: { index: number }) {
  const t = testimonials[index];
  const quoteSize = useMemo(
    () => (t ? quoteSizeFor(t.quote.length) : "clamp(19px, 1.5vw, 24px)"),
    [t]
  );

  if (!t) {
    return (
      <div className="featured-testimonial" tabIndex={0} aria-live="polite">
        <p className="text-body text-white/45">
          Testimonials for this group are coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="featured-testimonial" tabIndex={0} aria-live="polite">
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
          className="featured-inner"
        >
          {/* Quote leads — it is the substance the visitor came to read. */}
          <p className="featured-quote" style={{ fontSize: quoteSize }}>
            <span className="featured-quote-mark-inline" aria-hidden>
              &ldquo;
            </span>
            {t.quote}
          </p>

          {/* Attribution — name, then role, beneath the quote. */}
          <div className="featured-name-block orbit-name-block">
            <span className="featured-name">{t.name}</span>
            <span className="featured-role">{t.role}</span>
          </div>

          {/* LinkedIn — directly beneath the testimonial text. */}
          <a
            href={t.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${t.name}'s LinkedIn profile`}
            data-cursor-precise
            className="orbit-linkedin-btn"
          >
            <LinkedInIcon size={16} />
            <span>LinkedIn</span>
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
  // Hovering the quote area locks the current testimonial (pauses the
  // auto-advance) while the orbit keeps rotating in the background.
  const [paused, setPaused] = useState(false);

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
  // (which re-set `index` and therefore re-run this effect). Held while the
  // quote area is hovered so the reader can stay on a quote.
  useEffect(() => {
    if (!hasStarted || paused) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      PLAY_MS
    );
    return () => clearTimeout(id);
  }, [index, hasStarted, paused]);

  const activeMeta = metaForIndex(index);

  const jumpToCategory = useCallback((name: CategoryName) => {
    const meta = categoryMeta.find((m) => m.name === name);
    if (meta && meta.start !== undefined) setIndex(meta.start);
  }, []);

  return (
    <section className="testimonials-section relative min-h-[100svh] flex items-center py-[clamp(56px,7vw,104px)]">
      <Container size="wide" className="w-full">
        <div className="orbit-layout">
          {/* LEFT — all the content, left-aligned: label, heading, quote,
              attribution, LinkedIn link, then the category nav + progress. */}
          <div className="orbit-content-col">
            <Reveal duration={0.9}>
              <header className="orbit-header">
                <p className="section-label">Testimonials</p>
                <h2 className="text-section text-white orbit-title">
                  What People Say
                </h2>
              </header>
            </Reveal>

            {/* Hovering the quote pauses the auto-advance (locks this
                testimonial); the orbit keeps rotating. */}
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <FeaturedContent index={index} />
            </div>

            <div className="orbit-nav-wrap">
              <CategoryNav
                activeCategory={activeMeta.name}
                onSelect={jumpToCategory}
              />
            </div>
          </div>

          {/* RIGHT — the orbital system, pushed toward the viewport edge. */}
          <div className="orbit-stage-col">
            <OrbitField active={index} onSelect={setIndex} />
          </div>
        </div>
      </Container>
    </section>
  );
}
