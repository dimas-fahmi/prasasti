"use client";

import { queries } from "@/src/lib/queries";
import {
  NoteCard,
  NoteCardNew,
  NoteCardSkeleton,
} from "@/src/ui/components/dashboard/NoteCard";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import EmptyPrasasti from "./components/EmptyPrasasti";

const DashboardRecentNotes = () => {
  const recentQuery = queries.notes.recents();

  const { data: notes, isPending } = useQuery({
    ...recentQuery,
  });

  const isValid = !!notes && Array.isArray(notes) && !!notes.length;

  return !isValid && !isPending ? (
    <div className="flex-center min-h-dvh">
      <EmptyPrasasti />
    </div>
  ) : (
    <div className="space-y-4 dashboard-padding pb-6">
      {/* Header */}
      <header>
        <h1 className="dashboard-heading">Recent Notes</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isPending && (
          <>
            <NoteCardSkeleton />
            <NoteCardSkeleton />
            <NoteCardSkeleton />
          </>
        )}

        {!isPending &&
          isValid &&
          notes.slice(0, 3).map((note) => (
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

        {/* New Note Button */}
        <NoteCardNew />
      </div>
    </div>
  );
};

export default DashboardRecentNotes;
