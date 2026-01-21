import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";
import type { User } from "@/types";

export async function fetchStargate(userId: string) {
  if (!userId) {
    throw new Error("Invalid userId");
  }

  const userWithStargate: User = await fetchWithRefresh(
    `${API_SERVER_URL}/user/${userId}/stargate`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  console.log(userWithStargate);

  return userWithStargate;
}

export async function updateAvatarImage(image: File): Promise<User> {
  const formData = new FormData();

  formData.append("image", image);
  const userWithStargate = await fetchWithRefresh(
    `${API_SERVER_URL}/stargate/image/avatar`,
    {
      method: "PATCH",
      body: formData,
      credentials: "include",
    }
  );

  return userWithStargate;
}

export async function updateCoverImage(image: File): Promise<User> {
  const formData = new FormData();

  formData.append("image", image);
  const userWithStargate = await fetchWithRefresh(
    `${API_SERVER_URL}/stargate/image/cover`,
    {
      method: "PATCH",
      body: formData,
      credentials: "include",
    }
  );

  return userWithStargate;
}

export async function uploadStargateAvatarImage() {}
