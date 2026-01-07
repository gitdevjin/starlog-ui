import { API_SERVER_URL } from "@/lib/const";
import type { User } from "@/types";

export async function fetchMe(): Promise<User | null> {
  const res = await fetch(`${API_SERVER_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    return null; // logged out is OK
  }

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
