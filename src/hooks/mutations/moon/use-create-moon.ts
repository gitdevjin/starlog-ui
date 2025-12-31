import { createMoon } from "@/api/moon";
import { QUERY_KEYS } from "@/lib/const";
import type { Moon, MutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateMoon(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMoon,
    onSuccess: (newMoon) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Moon[]>(
        QUERY_KEYS.moon.planet(newMoon.planetId),
        (moons) => {
          if (!moons) throw new Error("No moons In Cache");
          return [...moons, newMoon];
        }
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
