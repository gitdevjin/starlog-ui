import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";
import type { UserEntity } from "@/types";

export async function FetchMe() {
  const user: UserEntity = await fetchWithRefresh(`${API_SERVER_URL}/user/me`, {
    method: "GET",
  });

  return user;
}
