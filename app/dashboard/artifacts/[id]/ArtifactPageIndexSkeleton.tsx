import { Skeleton } from "@/src/ui/shadcn/components/ui/skeleton";

const ArtifactPageIndexSkeleton = () => {
  return (
    <div className="p-4 md:p-12">
      {/* Title skeleton */}
      <Skeleton className="h-12 w-3/4 mb-2" />

      {/* Note content skeletons */}
      <div className="space-y-3 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        {/* Image skeleton */}
        <div className="py-4">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="py-2" />

        {/* Another image skeleton - smaller */}
        <Skeleton className="h-48 w-2/3 rounded-lg" />

        <div className="py-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        {/* Code block skeleton */}
        <div className="py-3">
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};

export default ArtifactPageIndexSkeleton;
