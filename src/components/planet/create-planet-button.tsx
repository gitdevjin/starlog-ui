import { usePlanetModalActions } from "@/store/planet-editor-modal-store";
import { PlusCircleIcon } from "lucide-react";
import planet from "@/assets/planet.png";

export default function CreatePlanetButton() {
  const openCreatePlanetModal = usePlanetModalActions();
  return (
    <div
      onClick={openCreatePlanetModal.openCreate}
      className="bg-muted text-muted-foreground mt-4 cursor-pointer rounded-xl px-8 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Create a New Planet</span>
          <img className="h-5" src={planet} alt="Logo of StarLog" />
        </div>

        <PlusCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
