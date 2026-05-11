import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-foreground/5 text-muted",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-rose-50 text-rose-600",
  };
  return (
    <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
