"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  trailingIcon?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] min-h-[44px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 hover:-translate-y-px shadow-[0_8px_24px_rgba(255,255,255,0.08)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.16)]",
  ghost:
    "bg-white/[0.03] text-white border border-white/[0.10] hover:bg-white/[0.06] hover:border-white/[0.20] hover:-translate-y-px",
};

const ArrowIcon = () => (
  <svg
    viewBox="0 0 14 14"
    width="12"
    height="12"
    aria-hidden="true"
    className="transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
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
      ...rest
    } = props;

    const icon = trailingIcon !== undefined ? trailingIcon : <ArrowIcon />;

    if ("href" in props && props.href) {
      return (
        <Link
          href={props.href}
          target={props.target}
          className={cn("group", base, variants[variant], className)}
        >
          {children}
          {icon}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn("group", base, variants[variant], className)}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
        {icon}
      </button>
    );
  }
);
