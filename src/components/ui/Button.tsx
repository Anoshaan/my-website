"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "secondary";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  trailingIcon?: ReactNode;
  /** Optional small icon shown before the label (e.g. a topic glyph). */
  leadingIcon?: ReactNode;
  /** Show animated rainbow gradient halo under the button. Opt-in only:
   *  to keep the site-wide rule of one rainbow treatment per page, this is
   *  OFF by default and must be set explicitly on a page's single hero CTA. */
  rainbow?: boolean;
  /** Glow tone for the primary "river" — "work" (purple, default) or
   *  "brand" (soft orange). Only affects the primary variant. */
  tone?: "work" | "brand";
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  download?: boolean | string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] min-h-[44px] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "btn-glass",
  ghost: "btn-glass-ghost",
  secondary: "btn-secondary",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      children,
      variant = "primary",
      className,
      trailingIcon,
      leadingIcon,
      rainbow,
      tone,
      ...rest
    } = props;

    // Rainbow is opt-in only (one rainbow per page, site-wide rule).
    const showRainbow = rainbow ?? false;

    // No default arrow icon — buttons show only intentional icons
    // (leadingIcon, or an explicit trailingIcon when passed).
    const icon = trailingIcon;

    const inner = cn(
      "group",
      base,
      variants[variant],
      tone === "brand" && "is-brand",
      className
    );

    const node =
      "href" in props && props.href ? (
        <Link
          href={props.href}
          target={props.target}
          download={props.download}
          className={inner}
        >
          {leadingIcon}
          {children}
          {icon}
        </Link>
      ) : (
        <button
          ref={ref}
          className={inner}
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {leadingIcon}
          {children}
          {icon}
        </button>
      );

    // `rainbow` is retained for API compatibility but is now a no-op: the
    // primary variant carries its own built-in animated river glow, so the
    // old bottom-only halo wrapper would only double up.
    void showRainbow;
    return node;
  }
);
