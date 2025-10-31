"use client";

import { useDeleteNote } from "@/src/db/idb/hooks/useDeleteNote";
import { Note } from "@/src/db/idb/schema/note";
import {
  ContextMenuCheckboxItem,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/src/ui/shadcn/components/ui/context-menu";
import Link from "next/link";

const NoteCardContextMenu = ({ note }: { note: Note }) => {
  const { mutate: deleteNote, isPending: isDeletingNote } = useDeleteNote();

  return (
    <>
      <ContextMenuItem inset asChild>
        <Link href={`/dashboard/artifacts/${note.id}`}>Open Note</Link>
      </ContextMenuItem>

      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked disabled>
        Pinned
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem checked disabled>
        Archived
      </ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-44">
          <ContextMenuItem disabled>Rename Title</ContextMenuItem>
          <ContextMenuItem disabled>Edit Icon</ContextMenuItem>
          <ContextMenuItem disabled>Edit Thumbnail</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuItem
        inset
        variant="destructive"
        onClick={() => {
          if (isDeletingNote) return;
          deleteNote(note.id);
        }}
        disabled={isDeletingNote}
      >
        Delete
      </ContextMenuItem>
    </>
  );
};

export default NoteCardContextMenu;
