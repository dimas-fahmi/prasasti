import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  updateMetadata,
  UpdateMetadataRequest,
} from "../actions/updateMetadata";

export const useUpdateMetadata = <TContext>(
  options?: Omit<
    UseMutationOptions<number, Error, UpdateMetadataRequest, TContext>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...(options || {}),
    mutationFn: updateMetadata,
  });
};
