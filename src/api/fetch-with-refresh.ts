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
