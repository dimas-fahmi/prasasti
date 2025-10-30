import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { insertNote } from "../actions/insertNote";
import { Note } from "../schema/note";
import { useRouter } from "next/navigation";

export const useInsertNote = <TContext>(
  options?: Omit<
    UseMutationOptions<string, Error, Note, TContext>,
    "mutationFn"
  >
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: insertNote,
    ...(options || {}),
    onSuccess: (data) => {
      router.push(`/dashboard/artifacts/${data}`);
    },
  });
};
