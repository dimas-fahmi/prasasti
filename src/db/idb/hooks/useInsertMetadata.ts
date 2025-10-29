import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { insertMetadata } from "../actions/insertMetadata";
import { PrasastiMetadata } from "../schema/metadata";

export const useInsertMetadata = <TContext>(
  options?: Omit<
    UseMutationOptions<string, Error, PrasastiMetadata, TContext>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...(options || {}),
    mutationFn: insertMetadata,
  });
};
