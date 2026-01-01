import { useOpenAlertModal } from "@/store/alert-modal-store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useDeletePlanet } from "@/hooks/mutations/planet/use-delete-planet";

export default function DeletePlanetButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();

  const { mutate: deletePlanet, isPending: isDeletePlanetPending } =
    useDeletePlanet({
      onSuccess: () => {
        const pathname = window.location.pathname;
        if (pathname.startsWith(`/planet/${id}`)) {
          navigate("/", { replace: true });
        }
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });

  const handleDelete = () => {
    openAlertModal({
      title: "Delete Post",
      description:
        "Deleted posts cannot be restored. Are you sure you want to delete this post??",
      onPositive: () => {
        deletePlanet(id);
      },
    });
  };

  return (
    <Button
      disabled={isDeletePlanetPending}
      onClick={handleDelete}
      className="cursor-pointer text-xs"
      variant={"ghost"}
    >
      Delete
    </Button>
  );
}
