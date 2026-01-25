import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface BentoSkeletonProps {
  title?: boolean;
}

export function BentoSkeleton({ title = true }: BentoSkeletonProps) {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-1 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
      )}

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
        <div className="col-span-2 row-span-2 aspect-square animate-pulse rounded-lg bg-card">
          <div className="absolute inset-x-0 bottom-0 p-2 space-y-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="col-span-1 aspect-[3/4] animate-pulse rounded-lg bg-card" />
        ))}
      </div>
    </div>
  );
}
