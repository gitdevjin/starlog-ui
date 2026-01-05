import { fetchStargate } from "@/api/stargate";
import { QUERY_KEYS } from "@/lib/const";
import { useQuery } from "@tanstack/react-query";

export function useStargateQuery(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.stargate.byId(userId),
    queryFn: () => fetchStargate(userId),
    enabled: !!userId,
  });
}
