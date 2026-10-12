import { API_SERVER_URL } from "@/lib/const";
import type { User } from "@/types";

export async function fetchMe(): Promise<User | null> {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("me page token");
  console.log(accessToken);
  if (!accessToken || !refreshToken) {
    return null;
  }

  // 1️⃣ Try with access token
  let res = await fetch(`${API_SERVER_URL}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 2️⃣ Access token expired → refresh
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_SERVER_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!refreshRes.ok) {
      // ❌ refresh failed → logout
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      return null;
    }

    const { accessToken: newAccessToken } = await refreshRes.json();

    if (!newAccessToken) {
      return null;
    }

    // 3️⃣ Save new access token
    localStorage.setItem("accessToken", newAccessToken);

    // 4️⃣ Retry original request
    res = await fetch(`${API_SERVER_URL}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  if (!res.ok) {
    return null;
  }

  return res.json();
}
