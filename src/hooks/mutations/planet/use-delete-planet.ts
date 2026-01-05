import { deletePlanet } from "@/api/planet";
import { QUERY_KEYS } from "@/lib/const";
import type { MutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePlanet(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlanet,
    onSuccess: async (deletedPlanet) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.planet.universe,
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.planet.byId(deletedPlanet.id),
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.moon.planet(deletedPlanet.id),
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.planet.byUser(deletedPlanet.creatorId),
      });
    },

    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
