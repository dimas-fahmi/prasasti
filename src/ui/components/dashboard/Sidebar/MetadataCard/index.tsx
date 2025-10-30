"use client";

import { Ellipsis } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/ui/shadcn/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/ui/shadcn/components/ui/popover";
import MetadataCardPopoverMenu from "./MetadataCardPopoverMenu";
import { useGetMetadata } from "@/src/db/idb/hooks/useGetMetadata";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import MetadataCardSkeleton from "./Skeleton";

const MetadataCard = () => {
  const { data: metadata, isPending: isPendingMetadata } = useGetMetadata();

  return isPendingMetadata ? (
    <MetadataCardSkeleton />
  ) : (
    <div className="flex items-center justify-between">
      {/* Avatar & Name */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={
              "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
            }
            alt="Jane Doe's Avatar"
            className="object-cover"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        {/* Name & Username */}
        <div className="">
          <Tooltip>
            <TooltipTrigger asChild>
              <h1 className="text-base cursor-default font-semibold text-nowrap text-ellipsis truncate max-w-26">
                {metadata?.owner}
              </h1>
            </TooltipTrigger>
            <TooltipContent>{metadata?.owner}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-xs font-light text-nowrap truncate text-ellipsis max-w-26">
                {metadata?.name}
              </p>
            </TooltipTrigger>
            <TooltipContent>{metadata?.name}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Popover Button */}
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button">
              <Ellipsis />
            </button>
          </PopoverTrigger>

          <PopoverContent className="p-2">
            <MetadataCardPopoverMenu />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MetadataCard;
