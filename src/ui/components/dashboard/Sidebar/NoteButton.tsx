"use client";

import { Note } from "@/src/db/idb/schema/note";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import { cn } from "@/src/ui/shadcn/lib/utils";
import { Notebook } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NoteButton = ({ note }: { note: Note }) => {
  const pathname = usePathname();
  const href = `/dashboard/artifacts/${note?.id}`;
  const isActive = pathname === href;

  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          type="button"
          className={cn(
            `flex items-center gap-2 text-sm p-2 rounded-md w-full`,
            isActive ? "bg-muted" : "hover:bg-muted opacity-70 "
          )}
        >
          <Notebook className="min-w-4 max-w-4 min-h-4 max-h-4" />{" "}
          <span className="truncate text-ellipsis w-full">
            {note?.title || "Untitled Note"}
          </span>
        </Link>
      </TooltipTrigger>
      {note?.title && <TooltipContent>{note.title}</TooltipContent>}
    </Tooltip>
  );
};

export default NoteButton;
