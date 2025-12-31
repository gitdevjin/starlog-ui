import { useCreateMoon } from "@/hooks/mutations/moon/use-create-moon";
import { useUpdateMoon } from "@/hooks/mutations/moon/use-update-moon";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type CreateMode = {
  type: "CREATE";
  planetId: number;
};

type EditMode = {
  type: "EDIT";
  moonId: number;
  initialContent: string;
  onClose: () => void;
};

type ReplyMode = {
  type: "REPLY";
  planetId: number;
  parentMoonId: number;
  onClose: () => void;
};

type Props = CreateMode | EditMode | ReplyMode;

export default function MoonEditor(props: Props) {
  const { mutate: createMoon, isPending: isCreateMoonPending } = useCreateMoon({
    onSuccess: () => {
      setContent("");
      if (props.type === "REPLY") {
        props.onClose();
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const { mutate: updateMoon, isPending: isUpdateMoonPending } = useUpdateMoon({
    onSuccess: () => {
      (props as EditMode).onClose();
      setContent("");
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    if (props.type === "EDIT") {
      setContent(props.initialContent);
    }
  }, []);

  const handleSubmit = () => {
    if (content.trim() === "") return;

    if (props.type === "CREATE") {
      createMoon({ planetId: props.planetId, content });
    } else if (props.type === "REPLY") {
      createMoon({
        planetId: props.planetId,
        content,
        parentMoonId: props.parentMoonId,
      });
    } else {
      updateMoon({ moonId: props.moonId, content });
    }
  };

  const isPending = isCreateMoonPending || isUpdateMoonPending;
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        disabled={isPending}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        {(props.type === "EDIT" || props.type === "REPLY") && (
          <Button
            disabled={isPending}
            className="text-sm"
            variant={"outline"}
            onClick={() => props.onClose()}
          >
            Cancel
          </Button>
        )}
        <Button disabled={isPending} className="text-sm" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
