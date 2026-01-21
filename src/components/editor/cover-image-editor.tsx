import { useSession } from "@/hooks/queries/use-session";
import ImageEditor from "./image-editor";
import defaultBackground from "@/assets/default-background.jpg";
import { useUpdateCover } from "@/hooks/mutations/stargate/use-update-cover";
import { toast } from "sonner";

export default function CoverImageEditor() {
  const { data: currentUser } = useSession();

  const { mutate: updateCoverImage, isPending: isUpdateCoverImagePending } =
    useUpdateCover({
      onSuccess: () => {
        toast.info("User Avatar Updated", {
          position: "top-center",
        });
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });

  return (
    <div className="relative w-full overflow-hidden rounded-md">
      <ImageEditor
        aspect={3 / 1}
        cropShape="rect"
        maxSizeMB={8}
        placeholder={currentUser?.stargate?.coverUrl || defaultBackground}
        onSave={updateCoverImage}
      />
    </div>
  );
}
