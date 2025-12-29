import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";
import type { User } from "@/types";

export async function FetchMe() {
  const user: User = await fetchWithRefresh(`${API_SERVER_URL}/user/me`, {
    method: "GET",
  });

  return user;
}
