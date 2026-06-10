"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PCStatus } from "./PCStatus";

const links = [
  { label: "Home", href: "/" },
  { label: "Labs", href: "/labs" },
  { label: "Systems", href: "/systems" },
  { label: "Craft", href: "/craft" },
  { label: "About", href: "/about" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y < 10) setHidden(false);
      else if (y > lastY) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] flex items-center justify-center pt-4 sm:pt-5 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && "-translate-y-[140%]"
      )}
    >
      <div className="absolute right-4 sm:right-6 top-4 sm:top-5">
        <PCStatus />
      </div>
      <nav
        aria-label="Primary"
        className={cn(
          "app-nav flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-full transition-all duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          scrolled
            ? "bg-black/65 backdrop-blur-[24px] saturate-[140%] border border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border border-transparent"
        )}
      >
        {links.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-precise
              className={cn(
                "nav-link group relative inline-flex items-center justify-center px-2.5 sm:px-4 py-1.5 rounded-full text-sm font-medium tracking-tight transition-colors duration-[250ms] min-h-[40px] min-w-[44px]",
                active
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              )}
            >
              <span className="nav-rollover">
                <span className="nav-rollover__top">{link.label}</span>
                <span className="nav-rollover__bottom" aria-hidden="true">
                  {link.label}
                </span>
              </span>
              {active && (
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-px bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
