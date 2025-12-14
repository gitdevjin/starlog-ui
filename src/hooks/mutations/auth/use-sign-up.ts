import { signUp } from "@/api/auth";
import type { MutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignUp(callbacks?: MutationCallbacks) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
