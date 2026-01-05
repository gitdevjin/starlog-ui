import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";
import type { User } from "@/types";

export async function fetchStargate(userId: string) {
  if (!userId) {
    throw new Error("Invalid userId");
  }

  const userWithStargate: User = await fetchWithRefresh(
    `${API_SERVER_URL}/user/${userId}/stargate`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  console.log(userWithStargate);

  return userWithStargate;
}
