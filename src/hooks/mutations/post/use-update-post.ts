import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/const";
import type { MutationCallbacks, PostEntity } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<PostEntity>(
        QUERY_KEYS.post.byId(updatedPost.id),
        (prevPost) => {
          if (!prevPost)
            throw new Error(
              `${updatedPost.id} Post Doesn't exist in Cache Data`
            );
          return { ...prevPost, ...updatedPost };
        }
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
