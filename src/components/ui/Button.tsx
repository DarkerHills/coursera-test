import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary";
type Size = "medium" | "small";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xxs font-body font-bold text-[15px] tracking-[0.15px] leading-6 transition-colors whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-surface-brand text-text-on-brand hover:bg-[#2b2b2b]",
  secondary: "text-text-primary border border-border-primary hover:bg-surface-secondary",
};

const SIZE_CLASSES: Record<Size, string> = {
  medium: "px-3 py-2",
  small: "px-2 py-1 text-[13px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "medium",
  icon,
  children,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${BASE} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "medium",
  icon,
  children,
  className = "",
  external = false,
}: CommonProps & { href: string; external?: boolean }) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {icon}
      {children}
    </Link>
  );
}
