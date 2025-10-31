import { generateNote } from "@/src/db/idb/actions/generateNote";
import { useInsertNote } from "@/src/db/idb/hooks/useInsertNote";
import { Note } from "@/src/db/idb/schema/note";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/ui/shadcn/components/ui/empty";
import { NotebookIcon } from "lucide-react";

const EmptyPrasasti = () => {
  const { mutate: insertNote, isPending: isInsertingNote } = useInsertNote();

  return (
    <div>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <NotebookIcon />
          </EmptyMedia>
          <EmptyTitle>No Notes</EmptyTitle>
          <EmptyDescription>{`This prasasti doesn't have any notes, let's create a new one!`}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            onClick={() => {
              const note: Note = generateNote();
              insertNote(note);
            }}
            disabled={isInsertingNote}
          >
            Create A New Note
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptyPrasasti;
