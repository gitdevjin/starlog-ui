import { useUpdateAvatar } from "@/hooks/mutations/stargate/use-update-avatar";
import ImageEditor from "./image-editor";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { toast } from "sonner";
import { useSession } from "@/hooks/queries/use-session";
export default function AvatarImageEditor() {
  const { data: currentUser } = useSession();
  const { mutate: updateAvatarImage, isPending: isUpdateAvatarImagePending } =
    useUpdateAvatar({
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
    <div className="h-20 w-20 overflow-hidden rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24">
      <ImageEditor
        aspect={1}
        cropShape="round"
        placeholder={currentUser?.stargate?.avatarUrl || defaultAvatar}
        onSave={updateAvatarImage}
      />
    </div>
  );
}
