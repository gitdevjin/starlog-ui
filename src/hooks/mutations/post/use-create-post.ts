import { createPostWithImage } from "@/api/post";
import { QUERY_KEYS } from "@/lib/const";
import type { MutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPostWithImage,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
