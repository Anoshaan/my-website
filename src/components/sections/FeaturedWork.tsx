"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { featuredCaseStudies } from "@/lib/case-studies";

function ArrowSmall({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg
      viewBox="0 0 14 14"
      width="12"
      height="12"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
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
 * Selected Work — a horizontal slider of compact case study cards.
 *
 * Cards keep the existing landing-card visual identity (border, gradient
 * media block, tags, context, CTA row). The track uses native
 * scroll-snap so it works perfectly with touch / trackpad swipes; the
 * arrow buttons drive `scrollBy` programmatically. The whole section is
 * sized to fit comfortably above the fold on 1080p displays.
 */
export function FeaturedWork() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // Compute how many "pages" (cards visible at once) we have so the dots
  // count is right at every breakpoint.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const recompute = () => {
      const cards = Array.from(
        el.querySelectorAll<HTMLElement>("[data-slide]")
      );
      if (cards.length === 0) return;
      const cardW = cards[0].offsetWidth + 24; // gap = 24px
      const visible = Math.max(1, Math.round(el.clientWidth / cardW));
      const pages = Math.max(1, cards.length - visible + 1);
      setPageCount(pages);
    };

    recompute();
    const onScroll = () => {
      const cards = Array.from(
        el.querySelectorAll<HTMLElement>("[data-slide]")
      );
      if (cards.length === 0) return;
      const cardW = cards[0].offsetWidth + 24;
      setActivePage(Math.round(el.scrollLeft / cardW));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  const scrollByPage = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    if (!card) return;
    const delta = (card.offsetWidth + 24) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const goToPage = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    if (!card) return;
    el.scrollTo({ left: (card.offsetWidth + 24) * i, behavior: "smooth" });
  }, []);

  return (
    <section className="featured-work-section">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10 lg:mb-12">
          <SectionTitle
            title="Selected Work"
            intro="Selected enterprise platforms, AI systems, and digital experiences focused on usability, scalability, and interaction quality."
            className="max-w-[820px]"
          />
          <Reveal delay={0.2}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous"
                data-cursor-precise
                onClick={() => scrollByPage(-1)}
                className="slider-nav-btn"
              >
                <ArrowSmall rotate={-135} />
              </button>
              <button
                type="button"
                aria-label="Next"
                data-cursor-precise
                onClick={() => scrollByPage(1)}
                className="slider-nav-btn"
              >
                <ArrowSmall rotate={45} />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="featured-track-wrap">
          <div ref={trackRef} className="featured-track" aria-label="Selected case studies">
            {featuredCaseStudies.map((c) => (
              <article key={c.slug} data-slide className="featured-slide">
                <Link href="/labs" className="block h-full" data-cursor-precise>
                  <div className="featured-slide-card">
                    <div className="featured-slide-media">
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(80% 60% at 80% 20%, rgba(207, 217, 255, 0.16), transparent 60%)",
                        }}
                      />
                      <div className="featured-slide-media-label">
                        Video / Mockup
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap gap-2 text-eyebrow text-white/55">
                        {c.tags.map((t, i) => (
                          <span key={t}>
                            {t}
                            {i < c.tags.length - 1 && (
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

        <div className="mt-8 lg:mt-10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6">
          <div
            className="featured-dots"
            role="tablist"
            aria-label="Slide pagination"
          >
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activePage}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goToPage(i)}
                className={`featured-dot ${i === activePage ? "is-active" : ""}`}
                data-cursor-precise
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <Button href="/labs" variant="secondary" rainbow={false}>
              View All Works
            </Button>
            <Button href="/labs" variant="secondary" rainbow={false}>
              Go to Labs
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
