import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] mt-24">
      <Container>
        <div className="py-12 md:py-16 grid gap-8 md:grid-cols-3 md:items-start">
          <div className="flex flex-col gap-2">
            <span className="text-white font-semibold tracking-tight">
              Anoshaan
            </span>
            <span className="text-supporting text-white/55 max-w-[36ch]">
              Designing scalable human-centered experiences through UX, systems
              thinking, motion, and emerging technology.
            </span>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-3 text-supporting text-white/65 md:justify-center"
          >
            <Link href="/labs" className="hover:text-white transition-colors duration-[250ms]">
              Labs
            </Link>
            <Link href="/systems" className="hover:text-white transition-colors duration-[250ms]">
              Systems
            </Link>
            <Link href="/craft" className="hover:text-white transition-colors duration-[250ms]">
              Craft
            </Link>
            <Link href="/about" className="hover:text-white transition-colors duration-[250ms]">
              About
            </Link>
          </nav>

          <div className="flex md:justify-end items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-supporting text-white/55 hover:text-white transition-colors duration-[250ms] inline-flex items-center min-h-[44px] px-3"
            >
              X / Twitter
            </a>
          </div>
        </div>

        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-supporting text-white/40">
          <span>© {new Date().getFullYear()} Anoshaan. All rights reserved.</span>
          <a
            href="#top"
            className="hover:text-white transition-colors duration-[250ms] inline-flex items-center gap-2"
          >
            Back to top
            <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
              <path
                d="M7 11V3M3 7L7 3L11 7"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
}
