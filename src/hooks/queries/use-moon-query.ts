import { fetchMoons } from "@/api/moon";
import { QUERY_KEYS } from "@/lib/const";
import { useQuery } from "@tanstack/react-query";

export function useMoonQuery(planetId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.moon.planet(planetId),
    queryFn: () => fetchMoons(planetId),
  });
}
