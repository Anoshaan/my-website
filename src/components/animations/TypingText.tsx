"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TypingTextProps = {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Whether typing is currently active. When false, text resets. */
  active: boolean;
  /** Delay before typing starts (ms). */
  delay?: number;
  /** Blink cursor after typing completes? */
  blinkAfter?: boolean;
  className?: string;
};

/**
 * Types out a string character by character.
 * Resets to empty when `active` is false; restarts typing when it becomes true.
 * So scrolling away and back triggers the typing again.
 */
export function TypingText({
  text,
  speed = 65,
  active,
  delay = 0,
  blinkAfter = true,
  className,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset when leaving view
    if (!active) {
      setDisplayed("");
      setDone(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // Start typing after optional delay
    timeoutRef.current = window.setTimeout(() => {
      let i = 0;
      setDisplayed("");
      setDone(false);

      intervalRef.current = window.setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      intervalRef.current = null;
      timeoutRef.current = null;
    };
  }, [active, text, speed, delay]);

  return (
    <span className={cn("typing-text", className)}>
      {displayed}
      <span
        className={cn("typing-cursor", blinkAfter && done && "typing-cursor-done")}
        aria-hidden
      >
        |
      </span>
    </span>
  );
}
