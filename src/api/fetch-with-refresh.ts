import { API_SERVER_URL } from "@/lib/const";

let refreshing: Promise<void> | null = null;

export async function fetchWithRefresh(url: string, options: RequestInit = {}) {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "ngrok-skip-browser-warning": "true",
    },
    credentials: "include",
  });

  if (res.status === 401) {
    if (!refreshing) {
      // Start the refresh request only once
      refreshing = (async () => {
        const refreshRes = await fetch(`/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) {
          refreshing = null;
          window.location.href = "/sign-in"; // don’t redirect here
        }
      })();
    }

    // Wait for the refresh to finish
    await refreshing;
    refreshing = null;

    // Retry original request after refresh
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "ngrok-skip-browser-warning": "true",
      },
      credentials: "include",
    });
  }

  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

  return res.json();
}
