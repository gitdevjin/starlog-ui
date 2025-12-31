import { FetchMe } from "@/api/user";
import { QUERY_KEYS } from "@/lib/const";
import { useSetUser } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  const setUser = useSetUser();

  return useQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: async () => {
      try {
        const user = await FetchMe();
        setUser(user);
        return user;
      } catch (err) {
        setUser(null);
        throw err;
      }
    },
    staleTime: 60 * 5 * 1000,
    refetchOnMount: false,
    retry: false,
  });
}
