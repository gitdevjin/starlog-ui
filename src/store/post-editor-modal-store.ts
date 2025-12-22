import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

type EditMode = {
  isOpen: true;
  type: "Edit";
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type CreateMode = {
  isOpen: true;
  type: "Create";
};

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
  type: "None";
};

const initialState = {
  isOpen: false,
  type: "None",
} as State;

type State = OpenState | CloseState;

const postEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({ isOpen: true, type: "Create" });
          console.log("OpenStore Run");
        },
        openEdit: () => {},
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    {
      name: "PostEditorModalStore",
    }
  )
);

export const usePostModalEditorState = () => {
  const isOpen = postEditorModalStore((store) => store.isOpen);
  const type = postEditorModalStore((store) => store.type);
  return { isOpen, type };
};

export const usePostModalActions = () => {
  const actions = postEditorModalStore((store) => store.actions);
  return actions;
};

export const usePostEditorModalStore = () => {
  const store = postEditorModalStore();
  return store as typeof store & State;
};
