import { generateNote } from "@/src/db/idb/actions/generateNote";
import { useInsertNote } from "@/src/db/idb/hooks/useInsertNote";
import { Note } from "@/src/db/idb/schema/note";
import { AspectRatio } from "@/src/ui/shadcn/components/ui/aspect-ratio";
import { Card, CardContent } from "@/src/ui/shadcn/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/src/ui/shadcn/components/ui/context-menu";
import { ImageIcon, Plus } from "lucide-react";
import Link from "next/link";
import NoteCardContextMenu from "./NoteCardContextMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import getOverview from "@/src/lib/editor/utils/getOverview";

export const NoteCardNew = () => {
  const { mutate: insertNote } = useInsertNote();

  return (
    <button
      className="p-4 rounded-md border-2 border-dashed flex-center group/button hover:border-solid"
      onClick={() => {
        const note: Note = generateNote();
        insertNote(note);
      }}
    >
      <Plus className="opacity-50 w-5 h-5 group-hover/button:opacity-100" />
    </button>
  );
};

export const NoteCardSkeleton = () => {
  return (
    <div className="text-left">
      <Card className="p-0 overflow-hidden space-y-0 gap-0">
        {/* Thumbnail Skeleton */}
        <AspectRatio ratio={16 / 9} className="bg-muted animate-pulse" />

        {/* Content Skeleton */}
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Title Skeleton */}
            <div className="h-5 bg-muted rounded animate-pulse w-3/4" />

            {/* Description Skeleton */}
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const NoteCard = ({ note }: { note: Note }) => {
  const title = note?.title || "Untitled Note";
  const overview = getOverview(note);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          href={`/dashboard/artifacts/${note.id}`}
          className="text-left hover:scale-[1.01] transition-all duration-300"
        >
          <Card className="p-0 overflow-hidden space-y-0 gap-0">
            {/* Thumbnail */}
            <AspectRatio ratio={16 / 9} className="bg-muted flex-center">
              <ImageIcon className="opacity-50" />
            </AspectRatio>

            {/* Content */}
            <CardContent className="p-4">
              <div>
                <Tooltip delayDuration={800}>
                  <TooltipTrigger asChild>
                    <h1 className="font-header mb-1 font-semibold text-nowrap truncate text-ellipsis">
                      {title}
                    </h1>
                  </TooltipTrigger>
                  {note?.title && <TooltipContent>{title}</TooltipContent>}
                </Tooltip>

                <Tooltip delayDuration={800}>
                  <TooltipTrigger asChild>
                    <h1 className="font-header mb-1 font-semibold text-nowrap truncate text-ellipsis">
                      <p className="text-xs font-light opacity-80 text-nowrap truncate text-ellipsis">
                        {overview}
                      </p>
                    </h1>
                  </TooltipTrigger>
                  {overview !== "No content" && (
                    <TooltipContent className="max-w-55">
                      {overview}
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-48">
        <NoteCardContextMenu note={note} />
      </ContextMenuContent>
    </ContextMenu>
  );
};
