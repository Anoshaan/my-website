"use client";
import React from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import "./connect.css";

/**
 * Connect — a minimal, premium contact page. No eyebrow or section label:
 * it opens straight on the statement heading, a short human line, and three
 * clean contact options (WhatsApp, Email, LinkedIn). No form, no backend —
 * each option is a direct link out. Cards use the site's glass language so
 * there are no dark boxes in the light theme.
 */

type Option = {
  label: string;
  /** The clickable handle/value shown under the label. */
  value: string;
  href: string;
  external: boolean;
  icon: React.ReactNode;
  tint: string;
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.19-4.22 9.41-9.42 9.41zM20.52 3.49A11.78 11.78 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.14 1.59 5.94L.07 24l6.33-1.66a11.86 11.86 0 0 0 5.65 1.44h.01c6.54 0 11.87-5.33 11.88-11.88a11.8 11.8 0 0 0-3.42-8.41z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2.4" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.27 2.36 4.27 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.22 0z" />
  </svg>
);

const OPTIONS: Option[] = [
  {
    label: "WhatsApp",
    value: "Anoshaan",
    href: "https://wa.me/94772695809",
    external: true,
    icon: <WhatsAppIcon />,
    tint: "#25d366",
  },
  {
    label: "Email",
    value: "anoshaan@gmail.com",
    href: "mailto:anoshaan@gmail.com?subject=Project%20Inquiry%20from%20Portfolio",
    external: false,
    icon: <EmailIcon />,
    tint: "var(--color-accent)",
  },
  {
    label: "LinkedIn",
    value: "Anoshaan Nagendra Rajah",
    href: "https://www.linkedin.com/in/anoshaan-nagendra-rajah",
    external: true,
    icon: <LinkedInIcon />,
    tint: "#0a66c2",
  },
];

export function ConnectHero() {
  return (
    <section className="connect-section">
      <Container size="narrow" className="connect-inner">
        <Reveal duration={0.9}>
          <h1 className="connect-title">Say something. I&rsquo;ll shape it with you.</h1>
        </Reveal>

        <Reveal delay={0.14} duration={0.9}>
          <p className="connect-lead">
            Have an idea, a product, a brand, or a half-formed thought? Reach out
            in the way that feels easiest.
          </p>
        </Reveal>

        <div className="connect-options">
          {OPTIONS.map((opt, i) => (
            <Reveal key={opt.label} delay={0.24 + i * 0.08} className="connect-reveal">
              <a
                href={opt.href}
                {...(opt.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="connect-link"
                data-cursor-precise
                aria-label={`${opt.label} — ${opt.value}`}
                style={{ ["--tint" as string]: opt.tint }}
              >
                <span className="connect-link-icon" aria-hidden>
                  {opt.icon}
                </span>
                <span className="connect-link-label">{opt.label}</span>
                <span className="connect-link-value">{opt.value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
