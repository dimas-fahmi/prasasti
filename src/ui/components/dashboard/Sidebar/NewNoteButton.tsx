import { generateNote } from "@/src/db/idb/actions/generateNote";
import { useInsertNote } from "@/src/db/idb/hooks/useInsertNote";
import { Note } from "@/src/db/idb/schema/note";
import { cn } from "@/src/ui/shadcn/lib/utils";
import { Loader, Plus } from "lucide-react";
import React from "react";

const NewNoteButton = () => {
  const { mutate: insertNote, isPending: isInserting } = useInsertNote();

  return (
    <button
      type="button"
      className={cn(
        `flex items-center gap-2 text-sm p-2 rounded-md w-full `,
        isInserting ? "animate-pulse bg-muted" : "hover:bg-muted opacity-70"
      )}
      disabled={isInserting}
      onClick={() => {
        const newNote: Note = generateNote();
        insertNote(newNote);
      }}
    >
      {isInserting ? (
        <>
          <Loader className="w-4 h-4 animate-spin" /> Processing
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" /> New Artifact
        </>
      )}
    </button>
  );
};

export default NewNoteButton;
