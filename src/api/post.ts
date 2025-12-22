import { API_SERVER_URL } from "@/lib/const";
import { fetchWithRefresh } from "./fetch-with-refresh";
import type { PostEntity } from "@/types";

export async function createPostWithImage({
  content,
  images,
}: {
  content: string;
  images: File[];
}) {
  const formData = new FormData();

  formData.append("content", content);

  images.forEach((image) => {
    formData.append("images", image); // same key for multiple files
  });

  const post = await fetchWithRefresh(`${API_SERVER_URL}/post`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return post;
}

export async function updatePost({
  postId,
  content,
}: {
  postId: number;
  content: string;
}): Promise<PostEntity> {
  const post = await fetchWithRefresh(`${API_SERVER_URL}/post/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
    credentials: "include",
  });

  return post;
}
