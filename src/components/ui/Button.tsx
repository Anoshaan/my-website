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
  /** Show animated rainbow gradient halo under the button. Opt-in only:
   *  to keep the site-wide rule of one rainbow treatment per page, this is
   *  OFF by default and must be set explicitly on a page's single hero CTA. */
  rainbow?: boolean;
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

const ArrowIcon = () => (
  <svg
    viewBox="0 0 14 14"
    width="12"
    height="12"
    aria-hidden="true"
    className="transition-transform duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      children,
      variant = "primary",
      className,
      trailingIcon,
      rainbow,
      ...rest
    } = props;

    // Rainbow is opt-in only (one rainbow per page, site-wide rule).
    const showRainbow = rainbow ?? false;

    const icon = trailingIcon !== undefined ? trailingIcon : <ArrowIcon />;

    const inner = cn("group", base, variants[variant], className);

    const node =
      "href" in props && props.href ? (
        <Link
          href={props.href}
          target={props.target}
          download={props.download}
          className={inner}
        >
          {children}
          {icon}
        </Link>
      ) : (
        <button
          ref={ref}
          className={inner}
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
          {icon}
        </button>
      );

    if (showRainbow) {
      return <span className="rainbow-shadow">{node}</span>;
    }
    return node;
  }
);
