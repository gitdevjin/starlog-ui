import { fetchPlanetById } from "@/api/planet";
import { QUERY_KEYS } from "@/lib/const";
import { useQuery } from "@tanstack/react-query";

export function usePlanetByIdQuery({
  planetId,
  type,
}: {
  planetId: number;
  type: "LIST" | "DETAIL";
}) {
  return useQuery({
    queryKey: QUERY_KEYS.planet.byId(planetId),
    queryFn: () => fetchPlanetById(planetId),
    enabled: type === "LIST" ? false : true,
  });
}
