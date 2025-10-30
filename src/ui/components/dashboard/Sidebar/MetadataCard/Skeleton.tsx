"use client";

import { Ellipsis } from "lucide-react";
import { Skeleton } from "@/src/ui/shadcn/components/ui/skeleton";

const MetadataCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Avatar & Name Skeleton */}
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <Skeleton className="w-14 h-14 rounded-full" />

        {/* Name & Username Skeleton */}
        <div className="space-y-2">
          {/* Name skeleton */}
          <Skeleton className="h-4 w-24" />
          {/* Username skeleton */}
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Popover Button Skeleton */}
      <div>
        <button
          type="button"
          disabled
          className="opacity-50 cursor-not-allowed"
        >
          <Ellipsis />
        </button>
      </div>
    </div>
  );
};

export default MetadataCardSkeleton;
