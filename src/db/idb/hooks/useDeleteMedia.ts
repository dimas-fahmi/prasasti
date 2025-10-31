import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedia } from "../actions/deleteMedia";

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
    mutationFn: deleteMedia,
  });
};
