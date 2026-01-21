import { useStargateEditorModalStore } from "@/store/stargate-editor-modal-store";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Fallback from "../fallback/fallback";
import { useSession } from "@/hooks/queries/use-session";
import AvatarImageEditor from "../editor/avatar-image-editor";
import CoverImageEditor from "../editor/cover-image-editor";
import { Input } from "../ui/input";
import { useState } from "react";
import { Field, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";

export default function StargateEditorModal() {
  const { data: user, isPending: isSessionPending } = useSession();
  const [starname, setStartname] = useState(user?.stargate?.starname);
  const [bio, setBio] = useState(user?.stargate?.bio);
  const [firstName, setFirstName] = useState(user?.stargate?.firstName);
  const [lastName, setLastName] = useState(user?.stargate?.lastName);

  const {
    isOpen,
    actions: { close: close },
  } = useStargateEditorModalStore();

  if (!isOpen || isSessionPending) return null;

  if (!user) return <Fallback />;
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle>Stargate Editor</DialogTitle>
        <div className="flex flex-col items-center gap-2">
          {/* Cover */}
          <CoverImageEditor />
          {/* Avatar */}
          <AvatarImageEditor />
        </div>

        <Field>
          <FieldLabel htmlFor="starname">Starname</FieldLabel>
          <Input
            id="starname"
            type="text"
            value={starname}
            onChange={(e) => setStartname(e.target.value)}
          />
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Input
            id="bio"
            type="text"
            value={bio}
            onChange={(e) => setStartname(e.target.value)}
          />
          <FieldLabel htmlFor="firstname">First Name</FieldLabel>
          <Input
            id="firstname"
            type="text"
            value={firstName}
            onChange={(e) => setStartname(e.target.value)}
          />
          <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
          <Input
            id="lastname"
            type="text"
            value={lastName}
            onChange={(e) => setStartname(e.target.value)}
          />
        </Field>

        <Button className="cursor-pointer">Save</Button>
        <Button variant={"outline"}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
}
