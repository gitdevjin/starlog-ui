import { API_SERVER_URL } from "@/lib/const";

export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const base64string = btoa(`${email}:${password}`);
  const res = await fetch(`/api/proxy/auth/login/email`, {
    method: "POST",
    headers: {
      authorization: `Basic ${base64string}`,
      "ngrok-skip-browser-warning": "true",
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
  const response = await fetch(`/api/auth/register/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
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
