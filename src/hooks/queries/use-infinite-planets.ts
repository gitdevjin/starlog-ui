import { fetchPlanets, type PlanetFeedScope } from "@/api/planet";
import { QUERY_KEYS } from "@/lib/const";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePlanetsQuery({
  scope,
  creatorId,
}: {
  scope: PlanetFeedScope;
  creatorId?: string;
}) {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey:
      scope === "universe"
        ? QUERY_KEYS.planet.universe
        : scope === "orbit"
          ? QUERY_KEYS.planet.orbit
          : QUERY_KEYS.planet.userList(creatorId!),
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const planets = await fetchPlanets({
        from,
        to,
        scope,
        creatorId,
      });

      planets.forEach((planet) =>
        queryClient.setQueryData(QUERY_KEYS.planet.byId(planet.id), planet)
      );
      return planets.map((planet) => planet.id);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    staleTime: Infinity,
  });
}
