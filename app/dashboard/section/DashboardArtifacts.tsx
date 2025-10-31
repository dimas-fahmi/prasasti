"use client";

import { queries } from "@/src/lib/queries";
import {
  NoteCard,
  NoteCardSkeleton,
} from "@/src/ui/components/dashboard/NoteCard";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

const DashboardArtifacts = () => {
  const notesQuery = queries.notes.all();
  const { data: notes, isPending } = useQuery({
    ...notesQuery,
  });

  const isValid = !!notes && Array.isArray(notes) && !!notes.length;

  return isPending ? (
    <div className="pt-6 space-y-4 dashboard-padding">
      <h1 className="text-4xl font-bold">Notes</h1>

      {/* Artifacts */}
      <div className="space-y-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        {isPending &&
          Array(9)
            .fill("")
            .map((_item, index) => <NoteCardSkeleton key={index} />)}
      </div>
    </div>
  ) : (
    isValid && (
      <div className="pt-6 space-y-4 dashboard-padding">
        <h1 className="text-4xl font-bold">Notes</h1>

        {/* Artifacts */}
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          {isValid &&
            !isPending &&
            notes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              >
                <NoteCard note={note} />
              </motion.div>
            ))}
        </div>
      </div>
    )
  );
};

export default DashboardArtifacts;
