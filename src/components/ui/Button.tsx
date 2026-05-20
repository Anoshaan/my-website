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
  /** Show animated rainbow gradient halo under the button. Default true for primary. */
  rainbow?: boolean;
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
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] min-h-[44px] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "btn-glass",
  ghost: "btn-glass-ghost",
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

    // Rainbow is default-on for primary, default-off for ghost
    const showRainbow = rainbow ?? variant === "primary";

    const icon = trailingIcon !== undefined ? trailingIcon : <ArrowIcon />;

    const finalClassName = cn(
      "group",
      base,
      variants[variant],
      showRainbow && "rainbow-shadow",
      className
    );

    if ("href" in props && props.href) {
      return (
        <Link
          href={props.href}
          target={props.target}
          className={finalClassName}
        >
          {children}
          {icon}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={finalClassName}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
        {icon}
      </button>
    );
  }
);
