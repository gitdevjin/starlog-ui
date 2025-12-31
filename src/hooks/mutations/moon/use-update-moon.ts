import { updateMoon } from "@/api/moon";
import { QUERY_KEYS } from "@/lib/const";
import type { Moon, MutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMoon(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMoon,
    onSuccess: (updatedMoon: Moon) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Moon[]>(
        QUERY_KEYS.moon.planet(updatedMoon.planetId),
        (moons) => {
          if (!moons) throw new Error("No moons In Cache");
          return moons.map((moon) => {
            if (moon.id === updatedMoon.id) {
              return { ...moon, updatedMoon };
            }
            return moon;
          });
        }
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
