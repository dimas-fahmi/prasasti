import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { insertBulkMedia } from "../actions/insertBulkMedia";
import { Media } from "../schema/media";

export const useInsertBulkMedia = (
  options?: UseMutationOptions<string, Error, Media[], unknown>
) => {
  return useMutation({
    mutationFn: insertBulkMedia,
    ...(options || {}),
  });
};
