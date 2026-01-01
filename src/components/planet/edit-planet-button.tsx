import { usePlanetModalActions } from "@/store/planet-editor-modal-store";
import type { Planet } from "@/types";
import { Button } from "../ui/button";

export default function EditPlanetButton(props: Planet) {
  const { openEdit: openEditPlanetModal } = usePlanetModalActions();

  const handleButtonClick = () => {
    openEditPlanetModal({
      planetId: props.id,
      content: props.content,
      imageUrls: props.imageUrls,
    });
  };
  return (
    <Button
      onClick={handleButtonClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      Edit
    </Button>
  );
}
