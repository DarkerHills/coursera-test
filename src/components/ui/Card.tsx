import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-sm border border-border-secondary bg-surface-primary shadow-card ${padded ? "p-4" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
