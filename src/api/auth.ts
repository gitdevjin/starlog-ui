import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";

export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const base64string = btoa(`${email}:${password}`);
  const res = await fetch(`${API_SERVER_URL}/auth/login/email`, {
    method: "POST",
    headers: {
      authorization: `Basic ${base64string}`,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_SERVER_URL}/auth/register/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (!response.ok) {
      const message = Array.isArray(data.message)
        ? data.message[0]
        : data.message;
      throw new Error(message);
    }
    throw new Error(data.message);
  }

  return data;
}

export async function fetchCurrentUser() {
  const data = await fetchWithRefresh(`${API_SERVER_URL}/user/me`, {
    method: "POST",
    credentials: "include",
  });

  return data;
}
