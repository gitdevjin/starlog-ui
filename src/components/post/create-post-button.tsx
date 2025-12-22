import { usePostModalActions } from "@/store/post-editor-modal-store";
import { PlusCircleIcon } from "lucide-react";

export default function CreatePostButton() {
  const openCreatePostModal = usePostModalActions();
  return (
    <div
      onClick={openCreatePostModal.openCreate}
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-8 py-3"
    >
      <div className="flex items-center justify-between">
        <div>Share your story</div>
        <PlusCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
