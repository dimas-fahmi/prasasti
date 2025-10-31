import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { insertMedia } from "../actions/insertMedia";
import { Media } from "../schema/media";

export const useInsertMedia = (
  options?: Omit<
    UseMutationOptions<string, Error, Media, unknown>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["media"],
        exact: false,
      });
    },
    ...(options || {}),
  });
};
