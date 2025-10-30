import { cn } from "@/src/ui/shadcn/lib/utils";
import { Notebook } from "lucide-react";

const NoteButton = () => {
  return (
    <button
      type="button"
      className={cn(
        `flex items-center gap-2 text-sm p-2 rounded-md w-full opacity-70 hover:bg-muted`
      )}
    >
      <Notebook className="w-4 h-4" /> Untitled Note
    </button>
  );
};

export default NoteButton;
