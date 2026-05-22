"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/icons/AnimatedIcon";
import { ChronosMockup } from "@/components/mockups/ChronosMockup";
import { featuredCaseStudies } from "@/lib/case-studies";

/** Case study that renders a live animated mockup in its media slot. */
const CHRONOS_SLUG = "workforce-time-resource-platform";

const BASE_SPEED = 34; // px / second — slow, cinematic drift
const HOVER_SPEED = 11; // px / second — eases down on hover
const COPIES = 3; // render the list 3× for a seamless modulo loop

const cardIcons: AnimatedIconName[] = [
  "structure",
  "scan",
  "network",
  "flow",
  "scale",
  "radar",
];

function ArrowSmall() {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Selected Work — an automatic, continuously looping showcase carousel.
 *
 * The track is translated every frame by requestAnimationFrame and wrapped
 * with a modulo of one list's width, so the loop is seamless with no snap
 * or visible reset. Pointer drag is fully supported (and pauses autoplay);
 * hovering eases the drift speed down. Motion is disabled under
 * prefers-reduced-motion, leaving a static, still-draggable strip.
 */
export function FeaturedWork() {
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const spanRef = useRef(0); // width of exactly one copy of the list
  const speedRef = useRef(BASE_SPEED);
  const targetSpeedRef = useRef(BASE_SPEED);

  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const pointerStartRef = useRef(0);
  const offsetStartRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      targetSpeedRef.current = 0;
      speedRef.current = 0;
    }

    const measure = () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-fw-card]");
      const len = featuredCaseStudies.length;
      if (cards.length > len) {
        spanRef.current = cards[len].offsetLeft - cards[0].offsetLeft;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      // Ease the live speed toward its target for a smooth hover response.
      speedRef.current +=
        (targetSpeedRef.current - speedRef.current) * Math.min(1, dt * 4);
      if (!draggingRef.current && !pausedRef.current) {
        offsetRef.current += speedRef.current * dt;
      }
      const span = spanRef.current;
      if (span > 0) {
        let o = offsetRef.current % span;
        if (o < 0) o += span;
        track.style.transform = `translate3d(${-o}px, 0, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Pause the autoplay rAF entirely when the carousel is off-screen —
    // no point translating an element nobody can see (saves mobile battery).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) {
            last = performance.now();
            raf = requestAnimationFrame(loop);
          }
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(track);

    const onVisibility = () => {
      pausedRef.current = document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    movedRef.current = false;
    pointerStartRef.current = e.clientX;
    offsetStartRef.current = offsetRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - pointerStartRef.current;
    if (Math.abs(dx) > 4) movedRef.current = true;
    offsetRef.current = offsetStartRef.current - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  // Suppress the card's link navigation when the pointer was dragging.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const slides = Array.from({ length: COPIES }).flatMap((_, copy) =>
    featuredCaseStudies.map((c, i) => ({ c, i, key: `${copy}-${c.slug}` }))
  );

  return (
    <section className="featured-work-section">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10 lg:mb-12">
          <SectionTitle
            title="Selected Work"
            intro="Selected enterprise platforms, AI systems, and digital experiences focused on usability, scalability, and interaction quality."
            className="max-w-[680px]"
          />
          <Reveal delay={0.2}>
            <Button href="/labs" variant="secondary" rainbow={false}>
              Go to Labs
            </Button>
          </Reveal>
        </div>
      </Container>

      <Container>
        <div
          className="fw-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onMouseEnter={() => {
            targetSpeedRef.current = HOVER_SPEED;
          }}
          onMouseLeave={() => {
            targetSpeedRef.current = BASE_SPEED;
          }}
        >
          <div
            ref={trackRef}
            className="fw-track"
            aria-label="Selected case studies"
          >
            {slides.map(({ c, i, key }) => (
              <article key={key} data-fw-card className="featured-slide">
                <Link
                  href="/labs"
                  className="block h-full"
                  draggable={false}
                  data-cursor-precise
                  aria-hidden={key.startsWith("0-") ? undefined : true}
                  tabIndex={key.startsWith("0-") ? undefined : -1}
                >
                  <div className="featured-slide-card">
                    <div className="featured-slide-media">
                      {c.slug === CHRONOS_SLUG ? (
                        <ChronosMockup />
                      ) : (
                        <>
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{
                              background:
                                "radial-gradient(80% 60% at 80% 20%, rgba(207, 217, 255, 0.16), transparent 60%)",
                            }}
                          />
                          <span className="featured-slide-glyph">
                            <AnimatedIcon
                              name={cardIcons[i % cardIcons.length]}
                              size="md"
                            />
                          </span>
                          <div className="featured-slide-media-label">
                            Video / Mockup
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap gap-2 text-eyebrow text-white/55">
                        {c.tags.map((t, ti) => (
                          <span key={t}>
                            {t}
                            {ti < c.tags.length - 1 && (
                              <span className="ml-2 opacity-50">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <h3 className="featured-slide-title">{c.title}</h3>
                      <p className="featured-slide-summary">{c.summary}</p>
                      <div className="featured-slide-cta">
                        View Case Study
                        <span className="featured-slide-cta-arrow">
                          <ArrowSmall />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
