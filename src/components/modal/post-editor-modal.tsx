import { usePostModalState } from "@/store/post-editor-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useRef } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { ImageIcon } from "lucide-react";

export default function PostEditorModal() {
  const { isOpen, type } = usePostModalState();

  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-h-[90vh] sm:max-w-lg">
        <DialogTitle>{`${type} Post`}</DialogTitle>
        <textarea
          className="max-h-80 sm:min-h-50 min-h-30 bg-secondary focus:outline-none rounded-lg p-2"
          placeholder="Share your story"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
        {isOpen && type === "Create" && (
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            variant={"outline"}
            className="cursor-pointer"
          >
            <ImageIcon />
            Add Image
          </Button>
        )}
        <Button className="cursor-pointer">Save</Button>
      </DialogContent>
    </Dialog>
  );
}
