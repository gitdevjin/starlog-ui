import { API_SERVER_URL } from "@/lib/const";

let refreshing: Promise<void> | null = null;

export async function fetchWithRefresh(url: string, options: RequestInit = {}) {
  let res = await fetch(url, { ...options, credentials: "include" });

  if (res.status === 401) {
    if (!refreshing) {
      // Start the refresh request only once
      refreshing = (async () => {
        const refreshRes = await fetch(`${API_SERVER_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) {
          refreshing = null;
          throw new Error("Refresh token expired"); // don’t redirect here
        }
      })();
    }

    // Wait for the refresh to finish
    await refreshing;
    refreshing = null;

    // Retry original request after refresh
    res = await fetch(url, { ...options, credentials: "include" });
  }

  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}
