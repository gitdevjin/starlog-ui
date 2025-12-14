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

export const usePostModalState = () => {
  const isOpen = postEditorModalStore((store) => store.isOpen);
  const type = postEditorModalStore((store) => store.type);
  return { isOpen, type };
};

export const useOpenCreatePostModal = () => {
  const openCreate = postEditorModalStore((store) => store.actions.openCreate);
  return openCreate;
};

export const useOpenEditPostModal = () => {
  const openEdit = postEditorModalStore((store) => store.actions.openEdit);
  return openEdit;
};
