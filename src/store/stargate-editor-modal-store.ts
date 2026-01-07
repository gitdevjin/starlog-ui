import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const stargateEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "StargateEditorModalStore" }
  )
);

export const useStargateEditorModalActions = () => {
  const actions = stargateEditorModalStore().actions;
  return actions;
};

export const useStargateEditorModalStore = () => {
  const store = stargateEditorModalStore();
  return store;
};
