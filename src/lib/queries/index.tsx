import { QueryClient } from "@tanstack/react-query";
import { StandardizedError } from "../errors";
import { getRecentNotes } from "@/src/db/idb/actions/getRecentNotes";

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
    recents: () => {
      return {
        queryKey: ["notes", "recents"],
        queryFn: getRecentNotes,
      };
    },
  },
} as const;
