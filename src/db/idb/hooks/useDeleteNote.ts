import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteNote } from "../actions/deleteNote";
import { StandardizedError } from "@/src/lib/errors";

export const useDeleteNote = (
  options?: Omit<
    UseMutationOptions<number, StandardizedError, string, unknown>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
        exact: false,
      });
    },
    ...(options || {}),
    mutationFn: deleteNote,
  });
};
