import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

type EditMode = {
  isOpen: true;
  type: "Edit";
  planetId: number;
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

const planetEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({ isOpen: true, type: "Create" });
        },
        openEdit: () => {},
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    {
      name: "PlanetEditorModalStore",
    }
  )
);

export const usePlanetModalEditorState = () => {
  const isOpen = planetEditorModalStore((store) => store.isOpen);
  const type = planetEditorModalStore((store) => store.type);
  return { isOpen, type };
};

export const usePlanetModalActions = () => {
  const actions = planetEditorModalStore((store) => store.actions);
  return actions;
};

export const usePlanetEditorModalStore = () => {
  const store = planetEditorModalStore();
  return store as typeof store & State;
};
