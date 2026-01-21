import { getCroppedImg } from "@/lib/cropImage";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardFooter } from "../ui/card";
import Cropper from "react-easy-crop";
import { Button } from "../ui/button";
import { CameraIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageEditorProps = {
  value?: string;
  aspect: number;
  cropShape?: "round" | "rect";
  maxSizeMB?: number;
  placeholder: string;
  onSave: (file: File) => Promise<void> | void;
};

export default function ImageEditor({
  value,
  aspect,
  cropShape = "rect",
  maxSizeMB = 5,
  placeholder,
  onSave,
}: ImageEditorProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(value ?? null);
  const [croppingFile, setCroppingFile] = useState<File | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onDrop = useCallback(
    (files: File[]) => {
      if (!files.length) return;

      const file = files[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validTypes.includes(file.type)) return alert("Invalid image type");

      if (file.size > maxSizeMB * 1024 * 1024)
        return alert(`Max size ${maxSizeMB}MB`);

      setCroppingFile(file);
      setImageSrc(URL.createObjectURL(file));
      setIsCropping(true);
    },
    [maxSizeMB]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onCropComplete = useCallback((_: any, cropped: any) => {
    setCroppedAreaPixels(cropped);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);

    const previewUrl = URL.createObjectURL(croppedFile);
    setImageSrc(previewUrl);
    await onSave(croppedFile);
    setIsCropping(false);
  };

  const handleCancel = () => {
    setImageSrc(value ?? null);
    setCroppingFile(null);
    setIsCropping(false);
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "group relative cursor-pointer overflow-hidden",
          cropShape === "round"
            ? "aspect-square w-full rounded-full"
            : "aspect-3/1 w-full"
        )}
      >
        <input {...getInputProps()} />
        <img
          src={imageSrc || placeholder}
          className="h-full w-full object-cover"
          alt=""
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <CameraIcon className="h-10 w-10 text-white" />
        </div>
      </div>

      {isCropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg p-4">
            <CardContent className="relative h-72">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropShape={cropShape}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
