import { API_SERVER_URL } from "@/lib/const";
import type { User } from "@/types";

export async function fetchMe(): Promise<User | null> {
  const res = await fetch(`${API_SERVER_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    await fetch(`${API_SERVER_URL}/auth/refresh`, {
      method: "POSt",
      credentials: "include",
    });

    const response = await fetch(`${API_SERVER_URL}/user/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) return null;

    return response.json();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
