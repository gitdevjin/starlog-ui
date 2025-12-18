import { signInWithEmail } from "@/api/auth";
import type { MutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithEmail(callbacks?: MutationCallbacks) {
  return useMutation({
    mutationFn: signInWithEmail,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
