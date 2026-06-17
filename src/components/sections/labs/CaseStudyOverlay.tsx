"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type CaseStudyOverlayProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Element to return focus to when the overlay closes (the trigger button). */
  returnFocusRef?: RefObject<HTMLElement | null>;
  /** Fired after the close animation finishes — used to unmount content. */
  onExited?: () => void;
  children: ReactNode;
};

const SHEET_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * CaseStudyOverlay — a premium bottom-sheet that slides up over the Labs
 * page. The page stays mounted and visible behind a blurred, dimmed
 * backdrop; this is a focused reading layer, NOT a route navigation.
 *
 * Behaviour:
 *  - Slide up + fade in, slide down on close (instant for reduced motion).
 *  - Body / Lenis scroll locked while open; original scroll position is
 *    preserved on close.
 *  - Closes on Escape, backdrop click, or the header close button.
 *  - Focus moves into the sheet on open and returns to the trigger on close.
 *  - Background CSS animations are paused via `body.cs-locked` (see CSS).
 */
export function CaseStudyOverlay({
  open,
  onClose,
  title,
  returnFocusRef,
  onExited,
  children,
}: CaseStudyOverlayProps) {
  const reduced = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Escape to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock page scroll while open; preserve + restore scroll position. Lenis
  // (desktop smooth scroll) is paused; body overflow handles native/touch.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const lenis = window.__lenis;
    lenis?.stop();
    const { body } = document;
    body.classList.add("cs-locked");
    body.style.overflow = "hidden";

    return () => {
      body.classList.remove("cs-locked");
      body.style.overflow = "";
      lenis?.start();
      // Restore exact position (overflow toggling can nudge it on some UAs).
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Move focus into the sheet on open; return it to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const prevActive = (returnFocusRef?.current ??
      (document.activeElement as HTMLElement | null)) as HTMLElement | null;
    // Defer so the element is mounted and focusable.
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => {
      window.clearTimeout(id);
      prevActive?.focus?.();
    };
  }, [open, returnFocusRef]);

  // Minimal focus trap — keep Tab cycling within the sheet.
  const onKeyDownTrap = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = sheetRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <div className="cs-overlay" role="presentation">
          <motion.div
            className="cs-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: "easeOut" }}
          />

          <motion.div
            ref={sheetRef}
            className="cs-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onKeyDown={onKeyDownTrap}
            initial={reduced ? { opacity: 0 } : { y: "100%", opacity: 0.6 }}
            animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: "100%", opacity: 0.4 }}
            transition={{
              duration: reduced ? 0.15 : 0.62,
              ease: SHEET_EASE,
            }}
          >
            {/* Subtle top fade for depth as content scrolls under the
                close button. Title is NOT pinned — it lives in the hero. */}
            <div className="cs-sheet-fade" aria-hidden />

            <button
              ref={closeBtnRef}
              type="button"
              className="cs-close"
              onClick={onClose}
              aria-label="Close case study"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              ref={bodyRef}
              className="cs-sheet-body"
              data-lenis-prevent
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
