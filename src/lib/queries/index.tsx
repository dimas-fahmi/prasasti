import { QueryClient, UseQueryOptions } from "@tanstack/react-query";
import { StandardizedError } from "../errors";
import { getRecentNotes } from "@/src/db/idb/actions/getRecentNotes";
import { getNote } from "@/src/db/idb/actions/getNote";
import { getNotes } from "@/src/db/idb/actions/getNotes";
import { Note } from "@/src/db/idb/schema/note";

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

export const handle404 = (
  queryClient: QueryClient,
  queryKey: string[],
  resetTo?: unknown
) => {
  queryClient.setQueryData(queryKey, resetTo || null);
};

export const handleRetry = (
  count: number,
  error: unknown,
  queryKey: string[]
) => {
  if (error instanceof StandardizedError) {
    if (error?.status === 404) {
      handle404(queryClient, queryKey);
    }
  }

  return count < 3;
};

export const queries = {
  notes: {
    note: (id: string) => {
      return {
        queryKey: ["notes", id],
        queryFn: () => getNote(id),
      };
    },
    all: (): UseQueryOptions<Note[], StandardizedError> => {
      const queryKey = ["notes"];
      return {
        queryKey,
        queryFn: () => getNotes(),
        retry: (count, error) => {
          return handleRetry(count, error, queryKey);
        },
      };
    },
    recents: (): UseQueryOptions<Note[], StandardizedError> => {
      const queryKey = ["notes", "recents"];
      return {
        queryKey,
        queryFn: getRecentNotes,
        retry: (count, error) => {
          return handleRetry(count, error, queryKey);
        },
      };
    },
  },
} as const;
