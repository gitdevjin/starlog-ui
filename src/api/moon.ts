import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";

export async function fetchMoons(planetId: number) {
  const moons = fetchWithRefresh(`${API_SERVER_URL}/planet/${planetId}/moon`, {
    method: "GET",
    credentials: "include",
  });

  return moons;
}

export async function createMoon({
  planetId,
  content,
  parentMoonId,
}: {
  planetId: number;
  content: string;
  parentMoonId?: number;
}) {
  const moon = await fetchWithRefresh(
    `${API_SERVER_URL}/planet/${planetId}/moon`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, parentMoonId }),
    }
  );

  return moon;
}

export async function updateMoon({
  moonId,
  content,
}: {
  moonId: number;
  content: string;
}) {
  const moon = await fetchWithRefresh(`${API_SERVER_URL}/moon/${moonId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  return moon;
}

export async function deleteMoon(moonId: number) {
  const moon = await fetchWithRefresh(`${API_SERVER_URL}/moon/${moonId}`, {
    method: "DELETE",
    credentials: "include",
  });

  return moon;
}
