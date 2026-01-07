import { useStargateEditorModalStore } from "@/store/stargate-editor-modal-store";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useStargateQuery } from "@/hooks/queries/use-stargate-query";
import StargateAvatorEditor from "../stargate/stargate-avator-editor";
import Fallback from "../fallback/fallback";
import Loading from "../fallback/loading";
import { useSession } from "@/hooks/queries/use-session";

export default function StargateEditorModal() {
  const { data: user, isPending: isSessionPending } = useSession();

  const {
    isOpen,
    actions: { open: open, close: close },
  } = useStargateEditorModalStore();

  const {
    data: userWithStargate,
    error: fetchStargateError,
    isPending: isFetchStargatePending,
  } = useStargateQuery(user?.id ?? "");

  if (!isOpen || isSessionPending) return null;
  if (isFetchStargatePending) return <Loading />;
  if (fetchStargateError) return <Fallback />;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogTitle>Stargate Editor</DialogTitle>
        <StargateAvatorEditor userId={userWithStargate!.id} />
        <div>{userWithStargate?.stargate?.starname || "none"}</div>
        <div>{userWithStargate?.stargate?.bio || "no bio"}</div>
      </DialogContent>
    </Dialog>
  );
}
