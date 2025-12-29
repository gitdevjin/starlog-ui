import { togglePlanetGravity } from "@/api/planet";
import { QUERY_KEYS } from "@/lib/const";
import type { MutationCallbacks, Planet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePlanetGravity(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: togglePlanetGravity,
    onMutate: async (planetId) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.planet.byId(planetId),
      });

      const prevPlanet = queryClient.getQueryData<Planet>(
        QUERY_KEYS.planet.byId(planetId)
      );

      queryClient.setQueryData<Planet>(
        QUERY_KEYS.planet.byId(planetId),
        (planet) => {
          if (!planet) throw new Error("Planet doesn't exist in cache");
          return {
            ...planet,
            isGravityOn: !planet.isGravityOn,
            gravityCount: planet.isGravityOn
              ? planet.gravityCount - 1
              : planet.gravityCount + 1,
          };
        }
      );
      return { prevPlanet };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      if (context && context.prevPlanet)
        queryClient.setQueryData(
          QUERY_KEYS.planet.byId(context.prevPlanet.id),
          context.prevPlanet
        );
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
