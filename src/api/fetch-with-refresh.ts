import { API_SERVER_URL } from "@/lib/const";

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
    await fetch(`${API_SERVER_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        ...options.headers,
        "ngrok-skip-browser-warning": "true",
      },
      credentials: "include",
    });

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
