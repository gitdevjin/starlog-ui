import { deleteMoon } from "@/api/moon";
import { QUERY_KEYS } from "@/lib/const";
import type { Moon, MutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteMoon(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMoon,
    onSuccess: (deletedMoon) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Moon[]>(
        QUERY_KEYS.moon.planet(deletedMoon.planetId),
        (moons) => {
          if (!moons) throw new Error("No moons In Cache");
          return moons.filter((moon) => moon.id !== deletedMoon.id);
        }
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
