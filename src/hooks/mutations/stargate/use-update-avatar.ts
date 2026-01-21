import { updateAvatarImage } from "@/api/stargate";
import { QUERY_KEYS } from "@/lib/const";
import type { MutationCallbacks, User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAvatar(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatarImage,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User>(
        QUERY_KEYS.stargate.byId(updatedUser.id),
        updatedUser
      );

      queryClient.setQueryData<User>(QUERY_KEYS.user.me, updatedUser);
      if (callbacks?.onSuccess) callbacks?.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks?.onError(error);
    },
  });
}
