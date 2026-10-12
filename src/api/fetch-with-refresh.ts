import { API_SERVER_URL } from "@/lib/const";

export async function fetchWithRefresh(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("accessToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  // Access token expired
  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const refreshRes = await fetch(`${API_SERVER_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!refreshRes.ok) {
      // Refresh failed → force logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw new Error("Session expired");
    }

    const { accessToken: newAccessToken } = await refreshRes.json();
    localStorage.setItem("accessToken", newAccessToken);

    // Retry original request
    res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
