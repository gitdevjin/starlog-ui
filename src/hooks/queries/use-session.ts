import { fetchMe } from "@/api/user";
import { QUERY_KEYS } from "@/lib/const";

import { useQuery } from "@tanstack/react-query";

export function useSession() {
  return useQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: async () => {
      const user = await fetchMe(); // returns User | null
      return user;
    },
    staleTime: 60 * 5 * 1000,
    retry: false,
  });
}
