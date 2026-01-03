import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";
import type { Planet } from "@/types";

export type PlanetFeedScope = "universe" | "orbit" | "star";

interface FetchPlanetsOptions {
  from: number;
  to: number;
  scope: PlanetFeedScope;
  creatorId?: string;
}

export async function fetchPlanets(options: FetchPlanetsOptions) {
  const params = new URLSearchParams({
    scope: options.scope,
    from: String(options.from),
    to: String(options.to),
  });

  if (options.scope === "star" && options.creatorId) {
    params.set("creatorId", options.creatorId);
  }

  const planets: Planet[] = await fetchWithRefresh(
    `${API_SERVER_URL}/planet?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return planets;
}

export async function fetchPlanetById(planetId: number) {
  const planet: Planet = await fetchWithRefresh(
    `${API_SERVER_URL}/planet/${planetId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return planet;
}

export async function createPlanetWithImage({
  content,
  images,
}: {
  content: string;
  images: File[];
}) {
  const formData = new FormData();

  formData.append("content", content);

  images.forEach((image) => {
    formData.append("images", image);
  });

  const planet = await fetchWithRefresh(`${API_SERVER_URL}/planet`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return planet;
}

export async function updatePlanet({
  planetId,
  content,
}: {
  planetId: number;
  content: string;
}): Promise<Planet> {
  const planet = await fetchWithRefresh(
    `${API_SERVER_URL}/planet/${planetId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      credentials: "include",
    }
  );

  return planet;
}

export async function deletePlanet(planetId: number) {
  const result: Planet = await fetchWithRefresh(
    `${API_SERVER_URL}/planet/${planetId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  return result;
}

export async function togglePlanetGravity(planetId: number) {
  const result = await fetchWithRefresh(
    `${API_SERVER_URL}/planet/${planetId}/gravity`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return result; // { isGravitated: boolean }
}
