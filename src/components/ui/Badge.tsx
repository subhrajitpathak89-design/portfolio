import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "accent";
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        variant === "accent"
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
