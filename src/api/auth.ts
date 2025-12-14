import { API_SERVER_URL } from "@/lib/const";

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
