import { QueryClient } from "@tanstack/react-query";
import { StandardizedError } from "../errors";
import { getRecentNotes } from "@/src/db/idb/actions/getRecentNotes";
import { getNote } from "@/src/db/idb/actions/getNote";
import { getNotes } from "@/src/db/idb/actions/getNotes";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error) => {
        if (error instanceof StandardizedError) {
          const status = error?.status;

          if (status === 404) {
            return false;
          }
        }

        return count < 3;
      },
    },
  },
});

export const queries = {
  notes: {
    note: (id: string) => {
      return {
        queryKey: ["notes", id],
        queryFn: () => getNote(id),
      };
    },
    all: () => {
      return {
        queryKey: ["notes"],
        queryFn: () => getNotes(),
      };
    },
    recents: () => {
      return {
        queryKey: ["notes", "recents"],
        queryFn: getRecentNotes,
      };
    },
  },
} as const;
