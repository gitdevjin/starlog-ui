import { QUERY_KEYS } from "@/lib/const";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.user.me,
  });
}
