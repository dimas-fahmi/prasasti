import { Note } from "@/src/db/idb/schema/note";
import { cn } from "@/src/ui/shadcn/lib/utils";
import { Notebook } from "lucide-react";
import Link from "next/link";

const NoteButton = ({ note }: { note: Note }) => {
  return (
    <Link
      href={`/dashboard/artifacts/${note?.id}`}
      type="button"
      className={cn(
        `flex items-center gap-2 text-sm p-2 rounded-md w-full opacity-70 hover:bg-muted`
      )}
    >
      <Notebook className="w-4 h-4" /> {note?.title || "Untitled Note"}
    </Link>
  );
};

export default NoteButton;
