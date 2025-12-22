import {
  usePostEditorModalStore,
  usePostModalEditorState,
} from "@/store/post-editor-modal-store";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useOpenAlertModal } from "@/store/alert-modal-store";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const postEditorModalStore = usePostEditorModalStore();
  const openAlertModal = useOpenAlertModal();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModalStore.actions.close();
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModalStore.actions.close();
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    // Release Memory of Images
    if (!postEditorModalStore.isOpen) {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }

    if (postEditorModalStore.type === "Create") {
      setContent(""); // Reset Content when modal is closed
      setImages([]);
    } else {
      setContent(postEditorModalStore.content);
      setImages([]);
    }

    textareaRef?.current?.focus();
  }, [postEditorModalStore.isOpen]);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter(
        (prevImage) => prevImage.previewUrl !== image.previewUrl
      )
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  const handleCloseModal = () => {
    if (content.trim() !== "" || images.length !== 0) {
      openAlertModal({
        title: "Are you sure you want to leave?",
        description: "You’ll lose any content you’ve been writing",
        onPositive: () => {
          postEditorModalStore.actions.close();
        },
      });

      return;
    }
    postEditorModalStore.actions.close();
  };

  const handleSavePost = () => {
    if (content.trim() === "") return;
    if (!postEditorModalStore.isOpen) return;

    if (postEditorModalStore.type === "Create") {
      createPost({
        content,
        images: images.map((image) => image.file),
      });
    } else {
      if (content.trim() === postEditorModalStore.content) return;
      updatePost({
        postId: postEditorModalStore.postId,
        content,
      });
    }
  };

  return (
    <Dialog open={postEditorModalStore.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh] sm:max-w-lg">
        <DialogTitle>{`${postEditorModalStore.type} Post`}</DialogTitle>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-80 sm:min-h-50 min-h-30 bg-secondary focus:outline-none rounded-lg p-2"
          placeholder="Share your story"
        />
        <input
          onChange={handleSelectImage}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
        />

        {postEditorModalStore.isOpen &&
          postEditorModalStore.type === "Edit" && (
            <Carousel className="m-auto w-[88%] self-center">
              <CarouselContent>
                {postEditorModalStore.imageUrls?.map((url) => (
                  <CarouselItem key={url} className="basis-2/5">
                    <div className="relative">
                      <img
                        src={url}
                        alt=""
                        className="h-full w-full rounded-sm object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}

        {images.length > 0 && (
          <Carousel className="m-auto w-[88%] self-center">
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.previewUrl} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      alt=""
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {postEditorModalStore.isOpen &&
          postEditorModalStore.type === "Create" && (
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
        <Button onClick={handleSavePost} className="cursor-pointer">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
