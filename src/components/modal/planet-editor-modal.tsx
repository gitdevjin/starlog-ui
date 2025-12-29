import { usePlanetEditorModalStore } from "@/store/planet-editor-modal-store";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useOpenAlertModal } from "@/store/alert-modal-store";
import { useCreatePlanet } from "@/hooks/mutations/planet/use-create-planet";
import { useUpdatePlanet } from "@/hooks/mutations/planet/use-update-planet";
import { toast } from "sonner";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PlanetEditorModal() {
  const planetEditorModalStore = usePlanetEditorModalStore();
  const openAlertModal = useOpenAlertModal();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createPlanet, isPending: isCreatePlanetPending } =
    useCreatePlanet({
      onSuccess: () => {
        planetEditorModalStore.actions.close();
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });

  const { mutate: updatePlanet, isPending: isUpdatePlanetPending } =
    useUpdatePlanet({
      onSuccess: () => {
        planetEditorModalStore.actions.close();
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
    if (!planetEditorModalStore.isOpen) {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }

    if (planetEditorModalStore.type === "Create") {
      setContent(""); // Reset Content when modal is closed
      setImages([]);
    } else {
      setContent(planetEditorModalStore.content);
      setImages([]);
    }

    textareaRef?.current?.focus();
  }, [planetEditorModalStore.isOpen]);

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
          planetEditorModalStore.actions.close();
        },
      });

      return;
    }
    planetEditorModalStore.actions.close();
  };

  const handleSavePlanet = () => {
    if (content.trim() === "") return;
    if (!planetEditorModalStore.isOpen) return;

    if (planetEditorModalStore.type === "Create") {
      createPlanet({
        content,
        images: images.map((image) => image.file),
      });
    } else {
      if (content.trim() === planetEditorModalStore.content) return;
      updatePlanet({
        planetId: planetEditorModalStore.planetId,
        content,
      });
    }
  };

  return (
    <Dialog
      open={planetEditorModalStore.isOpen}
      onOpenChange={handleCloseModal}
    >
      <DialogContent className="max-h-[90vh] sm:max-w-lg">
        <DialogTitle>{`${planetEditorModalStore.type} Planet`}</DialogTitle>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-80 sm:min-h-50 min-h-30 bg-secondary focus:outline-none rounded-lg p-2"
          placeholder="Share your journey"
        />
        <input
          onChange={handleSelectImage}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
        />

        {planetEditorModalStore.isOpen &&
          planetEditorModalStore.type === "Edit" && (
            <Carousel className="m-auto w-[88%] self-center">
              <CarouselContent>
                {planetEditorModalStore.imageUrls?.map((url) => (
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
        {planetEditorModalStore.isOpen &&
          planetEditorModalStore.type === "Create" && (
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
        <Button onClick={handleSavePlanet} className="cursor-pointer">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
