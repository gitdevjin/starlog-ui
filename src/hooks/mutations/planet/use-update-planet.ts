import { updatePlanet } from "@/api/planet";
import { QUERY_KEYS } from "@/lib/const";
import type { MutationCallbacks, PlanetEntity } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePlanet(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlanet,
    onSuccess: (updatedPlanet) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<PlanetEntity>(
        QUERY_KEYS.planet.byId(updatedPlanet.id),
        (prevPost) => {
          if (!prevPost)
            throw new Error(
              `${updatedPlanet.id} Post Doesn't exist in Cache Data`
            );
          return { ...prevPost, ...updatedPlanet };
        }
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
