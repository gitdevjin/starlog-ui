import type { User } from "@/types";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  user: User | null;
  isLoaded: boolean;
};

const initialState = {
  user: null,
  isLoaded: false,
} as State;

const userStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setUser: (user: User | null) => {
          set({ user: user });
        },
      },
    })),
    { name: "UserStore" }
  )
);

export const useUser = () => {
  const user = userStore((store) => store.user);
  return user;
};

export const useSetUser = () => {
  const setUser = userStore((store) => store.actions.setUser);
  return setUser;
};

export const useIsUserLoaded = () => {
  const isLoaded = userStore((store) => store.isLoaded);
  return isLoaded;
};
