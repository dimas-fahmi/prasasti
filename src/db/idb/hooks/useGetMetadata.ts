import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getMetadata } from "../actions/getMetadata";
import { PrasastiMetadata } from "../schema/metadata";
import { StandardizedError } from "@/src/lib/errors";

export const useGetMetadata = (
  options?: Omit<
    QueryOptions<
      PrasastiMetadata,
      StandardizedError,
      PrasastiMetadata,
      string[]
    >,
    "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["metadata"],
    ...(options || {}),
    queryFn: getMetadata,
  });
};
