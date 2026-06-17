"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Stagger / sequencing delay in seconds. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  duration?: number;
  as?: ElementType;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * ScrollReveal — plays a single entrance the first time the element
 * scrolls into view, then never reverts (no re-fade on scroll-up, no
 * fade-out while on screen).
 *
 * Uses a plain IntersectionObserver rather than motion's `useInView`,
 * which proved unreliable under Lenis smooth-scroll for some users and
 * left sections stuck invisible. Two guards keep content reachable no
 * matter what: anything already in view on mount reveals immediately,
 * and a hard safety timeout reveals after 1.4s if the observer never
 * fires. Reduced-motion users get the final state with no transition.
 */
export function ScrollReveal({
  children,
  className,
  style,
  delay = 0,
  y = 26,
  duration = 0.8,
  as,
}: ScrollRevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }

    const reveal = () => setShown(true);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Safety net — never let an element stay hidden if the observer
    // silently fails to deliver under smooth-scroll.
    const safety = window.setTimeout(reveal, 1400);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown || reduced ? "none" : `translateY(${y}px)`,
        transition: reduced
          ? undefined
          : `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
