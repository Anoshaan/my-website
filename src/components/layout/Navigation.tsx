"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Labs", href: "/labs" },
  { label: "Systems", href: "/systems" },
  { label: "Brand", href: "/brand" },
  { label: "About", href: "/about" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Nav lives at the top of the page only — once the journey starts it
  // stays out of the way (no floating reveal on scroll-up; the footer
  // carries navigation at the end of the story).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 160);
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
      <nav
        aria-label="Primary"
        className={cn(
          "app-nav flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-full transition-all duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          scrolled && "app-nav--scrolled"
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
