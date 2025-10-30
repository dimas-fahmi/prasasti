import NoteButton from "./NoteButton";
import { queries } from "@/src/lib/queries";
import { useQuery } from "@tanstack/react-query";

const CollectionRecentNotes = () => {
  const recentQuery = queries.notes.recents();
  const { data: notes, isPending: _isPendingNotes } = useQuery({
    ...recentQuery,
  });

  const isValid = notes && Array.isArray(notes) && notes.length;

  return (
    <>
      {isValid &&
        notes
          .slice(0, 3)
          .map((item) => <NoteButton key={item?.id} note={item} />)}
    </>
  );
};

export default CollectionRecentNotes;
