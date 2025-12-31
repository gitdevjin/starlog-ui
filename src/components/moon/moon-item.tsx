import { useDeleteMoon } from "@/hooks/mutations/moon/use-delete-moon";
import { useOpenAlertModal } from "@/store/alert-modal-store";
import { useUser } from "@/store/user-store";
import type { NestedMoon } from "@/types";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import defaultAvatar from "@/assets/default-avatar.jpg";
import MoonEditor from "./moon-editor";
import { formatTimeAgo } from "@/lib/time";

export default function MoonItem(props: NestedMoon) {
  const user = useUser();

  if (!user) throw new Error("Current User not found");
  const isMine = user.id === props.creatorId;

  const openAlertModal = useOpenAlertModal();

  const { mutate: deleteMoon, isPending: isDeleteMoonPending } = useDeleteMoon({
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isReply, setIsRepy] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const toggleIsReply = () => {
    setIsRepy(!isReply);
  };

  const handleDeleteClick = () => {
    openAlertModal({
      title: "Delete Moon",
      description: "Deleted Moon cannot be restored",
      onPositive: () => {
        deleteMoon(props.id);
      },
    });
  };

  const isRootMoon = props.parentMoonId === null;
  const isNestedTwice = props.parentMoonId !== props.rootMoonId;

  return (
    <div
      className={`flex flex-col gap-8 pb-5 ${isRootMoon ? "border-b" : "ml-6"}`}
    >
      <div className="flex items-start gap-4">
        <Link to={"#"}>
          <div className="flex h-full flex-col">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={props.creator?.stargate?.avatarUrl || defaultAvatar}
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="text-sm font-semibold">
              {props.creator?.stargate?.starname}
            </div>
            <div className="bg-border h-3 w-0.5"></div>
            <div className="text-muted-foreground text-xs">
              {formatTimeAgo(props.createdAt)}
            </div>
          </div>

          {isEditing ? (
            <MoonEditor
              type={"EDIT"}
              moonId={props.id}
              initialContent={props.content}
              onClose={toggleIsEditing}
            />
          ) : (
            <div>
              {isNestedTwice && (
                <span className="text-xs font-semibold text-blue-500">
                  @{props.parentMoon?.creator?.stargate?.starname}&nbsp;&nbsp;
                </span>
              )}
              <span className="text-foreground/90 text-sm">
                {props.content}
              </span>
            </div>
          )}

          <div className="text-muted-foreground flex justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                onClick={toggleIsReply}
                className="cursor-pointer hover:underline"
              >
                Reply
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isMine && (
                <>
                  <div
                    onClick={toggleIsEditing}
                    className="cursor-pointer hover:underline"
                  >
                    edit
                  </div>
                  <div className="bg-border h-[13px] w-0.5"></div>
                  <div
                    onClick={handleDeleteClick}
                    className="cursor-pointer hover:underline"
                  >
                    delete
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isReply && (
        <MoonEditor
          type={"REPLY"}
          planetId={props.planetId}
          parentMoonId={props.id}
          onClose={toggleIsReply}
        />
      )}

      {props.children.map((moon) => (
        <MoonItem key={moon.id} {...moon} />
      ))}
    </div>
  );
}
