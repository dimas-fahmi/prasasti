import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { updateNote } from "../actions/updateNote";
import { UpdateRequest } from "../actions/types";
import { Note } from "../schema/note";

export const useUpdateNote = (
  options?: UseMutationOptions<number, Error, UpdateRequest<Note>, unknown>
) => {
  return useMutation({
    mutationFn: updateNote,
    ...(options || {}),
  });
};
