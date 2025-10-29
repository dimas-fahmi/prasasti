import { QueryClient } from "@tanstack/react-query";
import { StandardizedError } from "../errors";

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
