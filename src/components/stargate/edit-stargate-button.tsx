import { useStargateEditorModalActions } from "@/store/stargate-editor-modal-store";
import { Button } from "../ui/button";

export default function EditStargateButton() {
  const { open: openStargateEditorModal } = useStargateEditorModalActions();

  return (
    <Button
      onClick={openStargateEditorModal}
      variant={"secondary"}
      className="cursor-pointer"
    >
      Stargate Edit
    </Button>
  );
}
