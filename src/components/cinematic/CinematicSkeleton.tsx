import { cn } from "@/lib/utils";

interface CinematicSkeletonProps {
  className?: string;
  variant?: "text" | "card" | "chart" | "avatar" | "stat";
}

const CinematicSkeleton = ({ className, variant = "text" }: CinematicSkeletonProps) => {
  const base = "relative overflow-hidden rounded-lg";
  const shimmer =
    "after:absolute after:inset-0 after:translate-x-[-100%] after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-[hsl(217_91%_60%/0.06)] after:to-transparent";

  if (variant === "card") {
    return (
      <div className={cn(base, shimmer, "glass-panel p-6 space-y-4", className)}>
        <div className="h-4 w-2/3 rounded bg-muted/60" />
        <div className="h-3 w-full rounded bg-muted/40" />
        <div className="h-3 w-4/5 rounded bg-muted/40" />
        <div className="h-24 w-full rounded-lg bg-muted/30 mt-2" />
      </div>
    );
  }

  if (variant === "stat") {
    return (
      <div className={cn(base, shimmer, "glass-panel p-6 space-y-3", className)}>
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-muted/50" />
          <div className="h-8 w-8 rounded-lg bg-muted/40" />
        </div>
        <div className="h-8 w-24 rounded bg-muted/60" />
        <div className="h-2 w-16 rounded bg-muted/30" />
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <div className={cn(base, shimmer, "glass-panel p-6", className)}>
        <div className="h-4 w-32 rounded bg-muted/50 mb-4" />
        <div className="flex items-end gap-2 h-32">
          {[40, 65, 35, 80, 55, 70, 45, 60, 75, 50].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-muted/30"
              style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className={cn(base, shimmer, "h-10 w-10 rounded-full bg-muted/50")} />
        <div className="space-y-2 flex-1">
          <div className={cn(base, shimmer, "h-3 w-24 rounded bg-muted/50")} />
          <div className={cn(base, shimmer, "h-2 w-16 rounded bg-muted/30")} />
        </div>
      </div>
    );
  }

  // Default text
  return (
    <div className={cn(base, shimmer, "space-y-3", className)}>
      <div className="h-3 w-full rounded bg-muted/50" />
      <div className="h-3 w-4/5 rounded bg-muted/40" />
      <div className="h-3 w-3/5 rounded bg-muted/30" />
    </div>
  );
};

/** Full-page loading skeleton for dashboard-style pages */
const DashboardSkeleton = () => (
  <div className="space-y-6 p-6">
    {/* Header */}
    <div className="relative overflow-hidden rounded-2xl p-8 after:absolute after:inset-0 after:translate-x-[-100%] after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-[hsl(217_91%_60%/0.06)] after:to-transparent">
      <div className="h-8 w-64 rounded bg-muted/50 mb-3" />
      <div className="h-4 w-96 rounded bg-muted/30" />
    </div>

    {/* Stat cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <CinematicSkeleton key={i} variant="stat" />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CinematicSkeleton variant="chart" />
      <CinematicSkeleton variant="chart" />
    </div>

    {/* List */}
    <CinematicSkeleton variant="card" />
  </div>
);

export { CinematicSkeleton, DashboardSkeleton };
