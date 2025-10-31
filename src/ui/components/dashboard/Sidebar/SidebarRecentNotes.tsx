import { motion } from "motion/react";
import NoteButton from "./NoteButton";
import { queries } from "@/src/lib/queries";
import { useQuery } from "@tanstack/react-query";

const SidebarRecentNotes = () => {
  const recentQuery = queries.notes.recents();
  const { data: notes } = useQuery({ ...recentQuery });
  const isValid = !!notes && Array.isArray(notes) && !!notes.length;

  return (
    isValid &&
    notes.slice(0, 3).map((item) => (
      <motion.div
        key={item.id}
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
        <NoteButton note={item} />
      </motion.div>
    ))
  );
};

export default SidebarRecentNotes;
