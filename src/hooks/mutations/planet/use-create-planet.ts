import { createPlanetWithImage } from "@/api/planet";
import { QUERY_KEYS } from "@/lib/const";
import { useUser } from "@/store/user-store";
import type { MutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePlanet(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlanetWithImage,
    onSuccess: (createdPlanet) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.planet.universe,
      });
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.planet.byUser(createdPlanet.creatorId),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
