"use client";

import { queries } from "@/src/lib/queries";
import { NoteCard } from "@/src/ui/components/dashboard/NoteCard";
import { useQuery } from "@tanstack/react-query";

const DashboardArtifacts = () => {
  const notesQuery = queries.notes.all();
  const { data: notes } = useQuery({
    ...notesQuery,
  });

  const isValid = !!notes && Array.isArray(notes) && notes.length;

  return (
    <div className="pt-6 space-y-4">
      <h1 className="text-4xl font-bold">Notes</h1>

      {/* Artifacts */}
      <div className="space-y-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        {isValid && notes.map((note) => <NoteCard key={note.id} note={note} />)}
      </div>
    </div>
  );
};

export default DashboardArtifacts;
