import AlertModal from "@/components/modal/alert-modal";
import PlanetEditorModal from "@/components/modal/planet-editor-modal";
import StargateEditorModal from "@/components/modal/stargate-editor-modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <PlanetEditorModal />
          <AlertModal />
          <StargateEditorModal />
        </>,
        document.getElementById("modal-root")!
      )}
      {children}
    </>
  );
}
